/* @flow */
/* eslint unicorn/prefer-add-event-listener: off, max-lines: off */

import { ZalgoPromise } from 'zalgo-promise/src';
import { uniqueID, noop, memoize } from 'belter/src';

import { FIREBASE_SCRIPTS } from '../config';
import { loadScript } from '../lib/util';

import { getFirebaseSessionToken } from './auth';

const MESSAGE_TYPE = {
    REQUEST:  ('request' : 'request'),
    RESPONSE: ('response' : 'response')
};

const RESPONSE_STATUS = {
    SUCCESS: ('success' : 'success'),
    ERROR:   ('error' : 'error')
};

type RequestMessage<T> = {|
    source_app : string,
    source_app_version : string,
    target_app : string,
    message_type : typeof MESSAGE_TYPE.REQUEST,
    message_uid : string,
    request_uid : string,
    session_uid? : string,
    message_name : string,
    message_data : T
|};

type ResponseMessage<T> = {|
    source_app : string,
    source_app_version : string,
    target_app : string,
    message_type : typeof MESSAGE_TYPE.RESPONSE,
    message_uid : string,
    request_uid : string,
    session_uid? : string,
    message_name : string,
    message_status : string,
    message_data : T
|};

type MessageSocketDriver = {|
    send : (string) => void,
    close : () => void,
    onMessage : ((string) => void) => void,
    onError : ((mixed) => void) => void,
    onOpen : (() => void) => void,
    onClose : ((Error) => void) => void,
    isOpen : () => boolean
|};

export type MessageSocketOptions = {|
    sessionUID : string,
    driver : () => MessageSocketDriver,
    sourceApp : string,
    sourceAppVersion : string,
    targetApp : string,
    retry? : boolean
|};

export type MessageSocket = {|
    on : <T, R>( // eslint-disable-line no-undef
        name : string,
        handler : ({ data : T }) => ZalgoPromise<R> | R, // eslint-disable-line no-undef
        opts? : {|
            requireSessionUID? : boolean
        |}
    ) => void,
    send : <T, R>( // eslint-disable-line no-undef
        name : string,
        data : T, // eslint-disable-line no-undef
        opts? : {|
            timeout? : number,
            requireSessionUID? : boolean
        |}
    ) => ZalgoPromise<R>, // eslint-disable-line no-undef
    reconnect : () => ZalgoPromise<void>,
    close : () => void
|};

export function messageSocket({ sessionUID, driver, sourceApp, sourceAppVersion, targetApp, retry = true } : MessageSocketOptions) : MessageSocket {

    const receivedMessages = {};
    const requestListeners = {};
    const responseListeners = {};
    const activeRequests = [];

    const sendMessage = (socket, data) => {
        const messageUID = uniqueID();
        receivedMessages[messageUID] = true;

        const message = {
            message_uid:        messageUID,
            source_app:         sourceApp,
            source_app_version: sourceAppVersion,
            target_app:         targetApp,
            ...data
        };

        socket.send(JSON.stringify(message));
    };

    const sendResponse = (socket, { messageName, responseStatus, responseData, messageSessionUID, requestUID }) => {
        if (!socket.isOpen()) {
            return;
        }
        
        return sendMessage(socket, {
            session_uid:        messageSessionUID,
            request_uid:        requestUID,
            message_name:       messageName,
            message_status:     responseStatus,
            message_type:       MESSAGE_TYPE.RESPONSE,
            message_data:       responseData
        });
    };

    const onRequest = (socket, { messageSessionUID, requestUID, messageName, messageData }) => {
        const activeRequest = new ZalgoPromise();

        const requestPromise = ZalgoPromise.try(() => {
            const requestListener = requestListeners[messageName];

            if (!requestListener) {
                throw new Error(`No listener found for name: ${ messageName }`);
            }

            const { handler, requireSessionUID } = requestListener;

            if (requireSessionUID && messageSessionUID !== sessionUID) {
                throw new Error(`Incorrect sessionUID: ${ messageSessionUID || 'undefined' }`);
            }

            return handler({ data: messageData });
        }).then(res => {
            sendResponse(socket, { responseStatus: RESPONSE_STATUS.SUCCESS, responseData: res, messageName, messageSessionUID, requestUID  });
        }, err => {
            const res = { message: (err && err.message) ? err.message : 'Unknown error' };
            sendResponse(socket, { responseStatus: RESPONSE_STATUS.ERROR, responseData: res, messageName, messageSessionUID, requestUID });
        }).finally(() => {
            activeRequest.resolve();
        });

        activeRequests.push(activeRequest);
        requestPromise.finally(() => {
            activeRequests.splice(activeRequests.indexOf(requestPromise), 1);
        });

        return requestPromise;
    };

    const onResponse = ({ requestUID, messageSessionUID, responseStatus, messageData }) => {
        const { listenerPromise, requireSessionUID } = responseListeners[requestUID];
        
        if (!listenerPromise) {
            throw new Error(`Could not find response listener with id: ${ requestUID }`);
        }

        if (requireSessionUID && messageSessionUID !== sessionUID) {
            throw new Error(`Incorrect sessionUID: ${ messageSessionUID || 'undefined' }`);
        }
        
        delete responseListeners[requestUID];
        
        if (responseStatus === RESPONSE_STATUS.SUCCESS) {
            listenerPromise.resolve({ data: messageData });
        } else if (responseStatus === RESPONSE_STATUS.ERROR) {
            listenerPromise.reject(new Error(messageData.message));
        } else {
            throw new Error(`Can not handle response status: ${ status || 'undefined' }`);
        }
    };

    const onMessage = <T>(socket, rawData) => {
        let parsedData : RequestMessage<T> | ResponseMessage<T>;

        try {
            parsedData = JSON.parse(rawData);
        } catch (err) {
            throw new Error(`Could not parse socket message: ${ rawData }`);
        }

        if (!parsedData) {
            throw new Error(`No data passed from socket message`);
        }
    
        const {
            session_uid:    messageSessionUID,
            request_uid:    requestUID,
            message_uid:    messageUID,
            message_name:   messageName,
            message_type:   messageType,
            message_data:   messageData,
            message_status: responseStatus,
            target_app:     messageTargetApp
        } = parsedData;

        if (!messageUID || !requestUID || !messageName || !messageType || !messageTargetApp) {
            throw new Error(`Incomplete message: ${ rawData }`);
        }

        if (receivedMessages[messageUID] || messageTargetApp !== sourceApp) {
            return;
        }

        receivedMessages[messageUID] = true;

        if (messageType === MESSAGE_TYPE.REQUEST) {
            return onRequest(socket, { messageSessionUID, requestUID, messageName, messageData });
        } else if (messageType === MESSAGE_TYPE.RESPONSE) {
            return onResponse({ requestUID, messageSessionUID, responseStatus, messageData });
        
        } else {
            throw new Error(`Unhandleable message type: ${ messageType }`);
        }
    };

    let closed = false;
    let retryDelay;

    const updateRetryDelay = () => {
        if (retry) {
            retryDelay = retryDelay ? (retryDelay * 2) : 1;
        }
    };

    let socketPromise;
    let retryPromise;

    const init = () => {
        socketPromise = ZalgoPromise.try(() => {
            if (retryDelay) {
                retryPromise = ZalgoPromise.delay(retryDelay);
                return retryPromise;
            }
        }).then(() => {
            retryPromise = null;
            const instance = driver();

            const connectionPromise = new ZalgoPromise((resolve, reject) => {
                instance.onOpen(() => {
                    closed = false;
                    retryDelay = 0;
                    resolve(instance);
                });

                instance.onClose(err => {
                    closed = true;
                    reject(err || new Error('socket closed'));
                    if (retry) {
                        updateRetryDelay();
                        init();
                    }
                });
        
                instance.onError(err => {
                    reject(err);
                });
            });

            instance.onMessage(rawMessage => {
                return connectionPromise.then(socket => {
                    return onMessage(socket, rawMessage);
                });
            });

            return connectionPromise;
        });
    
        socketPromise.catch(noop);
    };

    init();

    const on = (name, handler, { requireSessionUID = true } = {}) => {
        if (requestListeners[name]) {
            throw new Error(`Listener already registered for name: ${ name }`);
        }

        requestListeners[name] = {
            handler,
            requireSessionUID
        };
    };

    const send = <T, R>(messageName, messageData : T, { requireSessionUID = true, timeout = 0 } = {}) : ZalgoPromise<R> => {
        return socketPromise.then(socket => {
            const requestUID = uniqueID();

            const listenerPromise = new ZalgoPromise();
            responseListeners[requestUID] = {
                listenerPromise,
                requireSessionUID
            };

            sendMessage(socket, {
                request_uid:  requestUID,
                message_name: messageName,
                message_type: MESSAGE_TYPE.REQUEST,
                message_data: messageData
            });

            if (timeout) {
                setTimeout(() => {
                    listenerPromise.reject(new Error(`Timeoued out waiting for ${ messageName } response after ${ timeout }ms`));
                }, timeout);
            }

            return listenerPromise;
        });
    };

    const reconnect = () => {
        return ZalgoPromise.try(() => {
            if (!closed) {
                return socketPromise;
            }
            
            if (retryPromise) {
                retryPromise.resolve();
                return socketPromise;
            }

            retryDelay = 0;
            return init();
        });
    };

    const close = () => {
        retry = false;

        for (const requestUID of Object.keys(responseListeners)) {
            const { listenerPromise } = responseListeners[requestUID];
            listenerPromise.asyncReject(new Error(`Socket closed`));
        }

        ZalgoPromise.all(activeRequests).then(() => {
            return socketPromise.then(
                socket => socket.close(),
                noop
            );
        });
    };

    return { on, send, reconnect, close };
}

type WebSocketOptions = {|
    sessionUID : string,
    url : string,
    sourceApp : string,
    sourceAppVersion : string,
    targetApp : string
|};
 
export function webSocket({ sessionUID, url, sourceApp, sourceAppVersion, targetApp } : WebSocketOptions) : MessageSocket {
    const driver = () => {
        const socket = new WebSocket(url);

        return {
            send: (data) => {
                socket.send(data);
            },
            close: () => {
                socket.close();
            },
            onMessage: (handler) => {
                socket.onmessage = (event) => {
                    const data = event.data;
    
                    if (typeof data !== 'string' || !data) {
                        throw new TypeError(`Expected string data from web socket`);
                    }
    
                    handler(data);
                };
            },
            onError: (handler) => {
                socket.onerror = () => {
                    handler(new Error(`The socket encountered an error`));
                };
            },
            onOpen: (handler) => {
                socket.onopen = () => handler();
            },
            onClose: (handler) => {
                socket.onclose = () => handler(new Error(`Websocket connection closed`));
            },
            isOpen: () => {
                return socket.readyState === WebSocket.OPEN;
            }
        };
    };

    return messageSocket({ sessionUID, driver, sourceApp, sourceAppVersion, targetApp });
}

export type FirebaseConfig = {|
    apiKey : string,
    authDomain : string,
    databaseURL : string,
    projectId : string,
    storageBucket : string,
    messagingSenderId : string,
    appId : string,
    measurementId : string
|};

export type FirebaseSocketOptions = {|
    sessionUID : string,
    config : FirebaseConfig,
    sourceApp : string,
    sourceAppVersion : string,
    targetApp : string
|};

export const loadFirebaseSDK = memoize((config) => {
    return ZalgoPromise.all([
        loadScript(FIREBASE_SCRIPTS.APP),
        loadScript(FIREBASE_SCRIPTS.AUTH),
        loadScript(FIREBASE_SCRIPTS.DATABASE)
    ]).then(() => {
        const firebase = window.firebase;

        if (!firebase) {
            throw new Error(`Firebase failed to load`);
        }

        firebase.initializeApp(config);
        return firebase;
    });
});
        
export function firebaseSocket({ sessionUID, config, sourceApp, sourceAppVersion, targetApp } : FirebaseSocketOptions) : MessageSocket {
    const driver = () => {
        let open = false;
        
        const onMessageHandlers = [];
        const onErrorHandlers = [];
        const onCloseHandlers = [];
        const onOpenHandlers = [];

        const error = (err) => {
            for (const handler of onErrorHandlers) {
                handler(err);
            }
        };

        const databasePromise = ZalgoPromise.all([
            loadFirebaseSDK(config),
            getFirebaseSessionToken(sessionUID)
        ]).then(([ firebase, sessionToken ]) => {
            return firebase.auth().signInWithCustomToken(sessionToken).then(() => {
                const database = firebase.database();
                firebase.database.INTERNAL.forceWebSockets();

                open = true;
    
                for (const handler of onOpenHandlers) {
                    handler();
                }
    
                database.ref(`users/${ sessionUID }/messages`).on('value', (res) => {
                    const messages = res.val() || {};
                    for (const messageID of Object.keys(messages)) {
                        const message = messages[messageID];
                        for (const handler of onMessageHandlers) {
                            handler(message);
                        }
                    }
                });

                database.goOnline();
                return database;
            });
        });

        return {
            send: (data) => {
                databasePromise.then(database => {
                    return database.ref(`users/${ sessionUID }/messages/${ uniqueID() }`).set(data);
                }).catch(error);
            },
            close: () => {
                databasePromise.then(database => {
                    database.goOffline();
                });
            },
            onMessage: (handler) => {
                onMessageHandlers.push(handler);
            },
            onError: (handler) => {
                onErrorHandlers.push(handler);
            },
            onOpen: (handler) => {
                if (open) {
                    handler();
                } else {
                    onOpenHandlers.push(handler);
                }
            },
            onClose: (handler) => {
                onCloseHandlers.push(handler);
            },
            isOpen: () => {
                return open;
            }
        };
    };

    return messageSocket({ sessionUID, driver, sourceApp, sourceAppVersion, targetApp });
}
