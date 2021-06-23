/* @flow */
/* eslint max-lines: off */

import { $mockEndpoint, patchXmlHttpRequest } from 'sync-browser-mocks/src/xhr';
import { mockWebSocket, patchWebSocket } from 'sync-browser-mocks/src/webSocket';
import { ZalgoPromise } from 'zalgo-promise';
import { values, destroyElement, noop, uniqueID } from 'belter/src';
import { FUNDING } from '@paypal/sdk-constants';
import { INTENT, CURRENCY, CARD, PLATFORM, COUNTRY } from '@paypal/sdk-constants/src';

import { setupButton } from '../../src';
import { loadFirebaseSDK } from '../../src/api';

import { triggerKeyPress } from './util';

export const MOCK_BUYER_ACCESS_TOKEN = 'abc123xxxyyyzzz456';

export function mockAsyncProp(handler : Function) : Function {
    return (...args) => ZalgoPromise.delay(1).then(() => handler(...args));
}

export function cancelablePromise<T>(promise : ZalgoPromise<T>) : ZalgoPromise<T> {
    promise.cancel = noop;
    return promise;
}

export function setupMocks() {
    delete window.navigator.mockUserAgent;

    const body = document.body;

    if (!body) {
        throw new Error(`No document.body found`);
    }

    body.innerHTML = '';

    window.config = {
        urls: {
            baseUrl: '/smart'
        }
    };

    window.meta = {
        headers: {
            'x-csrf-jwt': 'xxxxxxx'
        }
    };

    window.paypal = {
        config:  {
            locale: {
                country: 'US',
                lang:    'en'
            }
        },
        Checkout: (props) => {
            return {
                renderTo: () => {
                    props.onAuth({ accessToken: MOCK_BUYER_ACCESS_TOKEN });

                    return props.createOrder().then(orderID => {
                        return ZalgoPromise.delay(50).then(() => {
                            return props.onApprove({
                                orderID,
                                payerID: 'AAABBBCCC'
                            }).catch(err => {
                                return props.onError(err);
                            });
                        });
                    });
                },
                close: () => {
                    return ZalgoPromise.delay(50).then(() => {
                        if (props.onClose) {
                            return props.onClose();
                        }
                    });
                },
                onError: (err) => {
                    throw err;
                }
            };
        },
        CardFields: (props) => {
            return {
                render: () => {
                    props.onAuth({ accessToken: MOCK_BUYER_ACCESS_TOKEN });

                    return props.createOrder().then(orderID => {
                        return ZalgoPromise.delay(50).then(() => {
                            return props.onApprove({
                                orderID,
                                payerID: 'AAABBBCCC'
                            });
                        });
                    });
                },
                close: () => {
                    return ZalgoPromise.delay(50).then(() => {
                        if (props.onClose) {
                            return props.onClose();
                        }
                    });
                },
                onError: (err) => {
                    throw err;
                }
            };
        },
        postRobot: {
            on:   () => ({ cancel: noop }),
            once: () => cancelablePromise(ZalgoPromise.resolve()),
            send: () => cancelablePromise(ZalgoPromise.resolve())
        }
    };

    window.xprops = {
        clientID:        'xyz123',
        platform:        PLATFORM.DESKTOP,
        intent:          INTENT.CAPTURE,
        currency:        CURRENCY.USD,
        commit:          true,
        env:             'test',
        buttonSessionID: uniqueID(),
        createOrder:     mockAsyncProp(() => {
            return 'XXXXXXXXXX';
        }),
        style: {

        },
        locale: {
            country: 'US',
            lang:    'en'
        },
        onInit:    mockAsyncProp(noop),
        onApprove: mockAsyncProp(noop),
        onCancel:  mockAsyncProp(noop),
        onError:   mockAsyncProp((err) => {
            throw err;
        }),
        remember:                 mockAsyncProp(noop),
        getPrerenderDetails:      mockAsyncProp(noop),
        getPageUrl:               mockAsyncProp(() => 'https://www.merchant.com/foo/bar?baz=1'),
        getPopupBridge:           mockAsyncProp(noop),
        getParent:                () => window,
        getParentDomain:          () => 'https://www.merchant.com',
        merchantID:               [ 'XYZ12345' ],
        enableStandardCardFields: false,
        enableNativeCheckout:     false
    };

    window.Promise.try = (method) => {
        return window.Promise.resolve().then(method);
    };

    const buttonsContainer = document.querySelector('#buttons-container') || document.createElement('div');
    buttonsContainer.id = 'buttons-container';
    destroyElement(buttonsContainer);
    body.appendChild(buttonsContainer);

    const cardContainer = document.querySelector('#card-fields-container') || document.createElement('div');
    cardContainer.id = 'card-fields-container';
    destroyElement(cardContainer);
    body.appendChild(cardContainer);
}

setupMocks();
patchXmlHttpRequest();
patchWebSocket();

export function mockFunction<T, A>(obj : mixed, prop : string, mock : ({ args : $ReadOnlyArray<A>, original : (...args: $ReadOnlyArray<A>) => T }) => T) : { cancel : () => void } {
    // $FlowFixMe
    const original = obj[prop];
    // $FlowFixMe
    obj[prop] = (...args) => {
        return mock({ args, original });
    };
    return {
        cancel: () => {
            // $FlowFixMe
            obj[prop] = original;
        }
    };
}

export async function clickButton(fundingSource? : string = FUNDING.PAYPAL, card? : string = CARD.VISA) : ZalgoPromise<void> {
    let selector = `button[data-funding-source=${ fundingSource }]`;
    if (fundingSource === FUNDING.CARD) {
        selector = `${ selector }[data-card=${ card }]`;
    }
    const button = window.document.querySelector(selector);
    button.click();
    await button.payPromise;
}

export function enterButton(fundingSource? : string = FUNDING.PAYPAL) {
    triggerKeyPress(window.document.querySelector(`button[data-funding-source=${ fundingSource }]`), 13);
}

export const DEFAULT_FUNDING_ELIGIBILITY = {
    [ FUNDING.PAYPAL ]: {
        eligible: true
    }
};

export function createButtonHTML(fundingEligibility? : Object = DEFAULT_FUNDING_ELIGIBILITY) {
    const buttons = [];
    
    for (const fundingSource of values(FUNDING)) {
        const fundingConfig = fundingEligibility[fundingSource];

        if (!fundingConfig || !fundingConfig.eligible) {
            continue;
        }

        buttons.push(`<button data-funding-source="${ fundingSource }"></div>`);

        if (fundingConfig.vaultedInstruments) {
            for (const vaultedInstrument of fundingConfig.vaultedInstruments) {
                buttons.push(`<button data-funding-source="${ fundingSource }" data-payment-method-id="${ vaultedInstrument.id }"></div>`);
            }
        }

        if (fundingSource === FUNDING.CARD) {
            for (const card of values(CARD)) {
                const cardConfig = fundingConfig.vendors[card];

                if (!cardConfig || !cardConfig.eligible) {
                    continue;
                }

                buttons.push(`<button data-funding-source="${ fundingSource }" data-card="${ card }"></div>`);

                if (cardConfig.vaultedInstruments) {
                    for (const vaultedInstrument of cardConfig.vaultedInstruments) {
                        buttons.push(`<button data-funding-source="${ fundingSource }" data-card="${ card }" data-payment-method-id="${ vaultedInstrument.id }"></div>`);
                    }
                }
            }
        }
    }

    const body = document.body;

    if (!body) {
        throw new Error(`No document.body found`);
    }

    body.innerHTML += buttons.join('\n');
}

type MockEndpoint = {|
    listen : () => MockEndpoint,
    expectCalls : () => MockEndpoint,
    done : () => MockEndpoint,
    enable : () => MockEndpoint,
    disable : () => MockEndpoint
|};

export function getCreateAccessTokenMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    '/v1/oauth2/token',
        data:   {
            access_token: 'abc123'
        },
        ...options
    });
}

export function getCreateOrderApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    new RegExp('/v2/checkout/orders'),
        data:   {
            id: 'ABCDEFG0123456789'
        },
        ...options
    });
}

export function getGetOrderApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'GET',
        uri:    new RegExp('/smart/api/order/[^/]+'),
        data:   {
            ack:  'success',
            data: {

            }
        },
        ...options
    });
}

export function getCaptureOrderApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    new RegExp('/smart/api/order/[^/]+/capture'),
        data:   {
            ack:  'success',
            data: {

            }
        },
        ...options
    });
}

export function getAuthorizeOrderApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    new RegExp('/smart/api/order/[^/]+/authorize'),
        data:   {
            ack:  'success',
            data: {

            }
        },
        ...options
    });
}

export function getMapBillingTokenApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    new RegExp('/smart/api/payment/[^/]+/ectoken'),
        data:   {
            ack:  'success',
            data: {
                token: 'ABCDEFG12345'
            }
        },
        ...options
    });
}
export function getPatchOrderApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    new RegExp('/smart/api/order/[^/]+/patch'),
        data:   {
            ack:  'success',
            data: {}
        },
        ...options
    });
}

export function getSubscriptionIdToCartIdApiMock(options : Object = {}, subscriptionID : string = 'I-SUBSCRIPTIONID', cartId : string = 'CARTIDOFSUBSCRIPTIONS') : MockEndpoint {

    return $mockEndpoint.register({
        method: 'POST',
        uri:    `/smart/api/billagmt/subscriptions/${ subscriptionID }/cartid`,
        data:   {
            ack:  'success',
            data: {
                token: cartId
            }
        },
        ...options
    });
}

export function getGetSubscriptionApiMock(options : Object = {}, subscriptionID : string) : MockEndpoint {

    return $mockEndpoint.register({
        method: 'GET',
        uri:    `/smart/api/billagmt/subscriptions/${ subscriptionID }`,
        data:   {
            ack:  'success',
            data: {
                'status':      'APPROVAL_PENDING',
                'id':          subscriptionID,
                'create_time': '2019-05-13T13:50:17Z'
            }
        },
        ...options
    });
}

export function getCreateSubscriptionIdApiMock(options : Object, subscriptionID : string) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    'v1/billing/subscriptions',
        data:   {
            'status':      'APPROVAL_PENDING',
            'id':          subscriptionID,
            'create_time': '2019-05-10T13:50:17Z'
        },
        ...options
    });
}

export function getReviseSubscriptionIdApiMock(options : Object, subscriptionID : string) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    `v1/billing/subscriptions/${ subscriptionID }/revise`,
        data:   {
            'status':      'APPROVAL_PENDING',
            'id':          subscriptionID,
            'create_time': '2019-05-10T13:50:17Z'
        },
        ...options
    });
}

export function getActivateSubscriptionIdApiMock(options : Object = {}, subscriptionID : string) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    `/smart/api/billagmt/subscriptions/${ subscriptionID }/activate`,
        data:   {
            ack:  'success',
            data: {}
        },
        ...options
    });
}

export function getGraphQLApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method:  'POST',
        uri:     '/graphql',
        handler: ({ data }) => {
            if (options.extraHandler) {
                const result = options.extraHandler({ data });
                if (result) {
                    return result;
                }
            }

            if (data.query.includes('query GetCheckoutDetails')) {
                return {
                    data: {
                        checkoutSession: {
                            cart: {
                                intent:  'capture',
                                amounts: {
                                    total: {
                                        currencyCode: 'USD'
                                    }
                                }
                            }
                        }
                    }
                };
            }

            if (data.query.includes('query GetFireBaseSessionToken')) {
                return {
                    data: {
                        firebase: {
                            auth: {
                                sessionUID:   data.variables.sessionUID,
                                sessionToken: 'abc1234'
                            }
                        }
                    }
                };
            }

            return {};
        },
        ...options
    });
}

export function getLoggerApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    '/xoplatform/logger/api/logger',
        data:   {

        },
        ...options
    });
}

export function getValidatePaymentMethodApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'POST',
        uri:    new RegExp('/v2/checkout/orders/[^/]+/validate-payment-method'),
        data:   {
        
        },
        ...options
    });
}

export function getPayeeApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method: 'GET',
        uri:    new RegExp('/smart/api/checkout/[^/]+/payee'),
        data:   {
            ack:  'success',
            data: {
                merchant: {
                    id: 'XYZ12345'
                }
            }
        },
        ...options
    });
}

getCreateAccessTokenMock().listen();
getCreateOrderApiMock().listen();
getGetOrderApiMock().listen();
getCaptureOrderApiMock().listen();
getAuthorizeOrderApiMock().listen();
getMapBillingTokenApiMock().listen();
getPatchOrderApiMock().listen();
getSubscriptionIdToCartIdApiMock().listen();
getGraphQLApiMock().listen();
getLoggerApiMock().listen();
getValidatePaymentMethodApiMock().listen();
getPayeeApiMock().listen();

type NativeMockWebSocket = {|
    expect : () => {|
        done : () => ZalgoPromise<void>
    |},
    // getProps : () => void,
    onApprove : () => void,
    onCancel : () => void,
    onError : () => void,
    fallback : ({ buyerAccessToken : string }) => void
|};

export function getNativeWebSocketMock({ getSessionUID } : { getSessionUID : () => ?string }) : NativeMockWebSocket {
    let props;

    let getPropsRequestID;
    let onApproveRequestID;
    let onCancelRequestID;
    let onErrorRequestID;

    const { send, expect } = mockWebSocket({
        uri:     'wss://127.0.0.1/paypal/native',
        handler: ({ data }) => {
            const {
                request_uid:    requestUID,
                message_type:   messageType,
                message_status: messageStatus,
                message_name:   messageName,
                message_data:   messageData
            } = JSON.parse(data);

            if (messageType === 'response' && messageStatus === 'error') {
                throw new Error(messageData.message);
            }

            if (messageType === 'response' && messageName === 'getProps') {
                if (requestUID !== getPropsRequestID) {
                    throw new Error(`Request uid doest not match for getProps response`);
                }
                props = messageData;
            }

            if (messageType === 'response' && messageName === 'onApprove') {
                if (requestUID !== onApproveRequestID) {
                    throw new Error(`Request uid doest not match for onApprove response`);
                }
            }

            if (messageType === 'response' && messageName === 'onCancel') {
                if (requestUID !== onCancelRequestID) {
                    throw new Error(`Request uid doest not match for onCancel response`);
                }
            }

            if (messageType === 'response' && messageName === 'onError') {
                if (requestUID !== onErrorRequestID) {
                    throw new Error(`Request uid doest not match for onError response`);
                }
            }
        }
    });

    /*

    const getProps = () => {
        getPropsRequestID = uniqueID();

        send(JSON.stringify({
            session_uid:        getSessionUID(),
            source_app:         'paypal_native_checkout_sdk',
            source_app_version: '1.2.3',
            target_app:         'paypal_smart_payment_buttons',
            request_uid:        getPropsRequestID,
            message_uid:        uniqueID(),
            message_type:       'request',
            message_name:       'getProps'
        }));
    };

    */

    const onApprove = () => {
        if (!props) {
            throw new Error(`Can not approve without getting props`);
        }

        onApproveRequestID = uniqueID();

        send(JSON.stringify({
            session_uid:        getSessionUID(),
            source_app:         'paypal_native_checkout_sdk',
            source_app_version: '1.2.3',
            target_app:         'paypal_smart_payment_buttons',
            request_uid:        onApproveRequestID,
            message_uid:        uniqueID(),
            message_type:       'request',
            message_name:       'onApprove',
            message_data:       {
                orderID: props.orderID,
                payerID: 'XXYYZZ123456'
            }
        }));
    };

    const onCancel = () => {
        if (!props) {
            throw new Error(`Can not approve without getting props`);
        }

        onCancelRequestID = uniqueID();

        send(JSON.stringify({
            session_uid:        getSessionUID(),
            source_app:         'paypal_native_checkout_sdk',
            source_app_version: '1.2.3',
            target_app:         'paypal_smart_payment_buttons',
            request_uid:        onCancelRequestID,
            message_uid:        uniqueID(),
            message_type:       'request',
            message_name:       'onCancel',
            message_data:       {
                orderID: props.orderID
            }
        }));
    };

    const onError = () => {
        onErrorRequestID = uniqueID();

        send(JSON.stringify({
            session_uid:        getSessionUID(),
            source_app:         'paypal_native_checkout_sdk',
            source_app_version: '1.2.3',
            target_app:         'paypal_smart_payment_buttons',
            request_uid:        onErrorRequestID,
            message_uid:        uniqueID(),
            message_type:       'request',
            message_name:       'onError',
            message_data:       {
                message: 'Something went wrong'
            }
        }));
    };

    return {
        expect, onApprove, onCancel, onError, fallback: noop
    };
}

export const MOCK_FIREBASE_CONFIG = {
    apiKey:            'AIzaSyAeyii31bJYddKqSHrkyiRKU3EHCvh-owM',
    authDomain:        'testmessaging-63f5d.firebaseapp.com',
    databaseURL:       'https://testmessaging-63f5d.firebaseio.com',
    projectId:         'testmessaging-63f5d',
    storageBucket:     'testmessaging-63f5d.appspot.com',
    messagingSenderId: '330437320943',
    appId:             '1:330437320943:web:c7a8b59c274429d1707b1a',
    measurementId:     'G-6ZYN3ND8X2'
};

type MockFirebase = {|
    send : (string, Object) => void,
    expect : () => {|
        done : () => void
    |}
|};

let firebaseOffline = false;

function mockFirebase({ handler } : { handler : ({ data : Object }) => void }) : MockFirebase {

    let hasCalls = false;

    const messages = {};
    const listeners = {};

    const splitPath = (path : string) => {
        const pathComponents = path.split('/');
        let [ namespace, key ] = [ pathComponents.slice(0, pathComponents.length - 1), pathComponents[pathComponents.length - 1] ];
        namespace = namespace.join('/');
        return { namespace, key };
    };

    const send = (path, data) => {
        const { namespace, key } = splitPath(path);
        messages[namespace] = messages[namespace] || {};
        messages[namespace][key] = data;
        for (const listener of (listeners[namespace] || [])) {
            listener({ val: () => messages[namespace] });
        }
    };

    window.firebase = {
        initializeApp: () => {
            // pass
        },
        auth: () => {
            return {
                signInWithCustomToken: () => {
                    return ZalgoPromise.resolve();
                }
            };
        },
        database: () => {
            return {
                ref: (path) => {
                    return {
                        set: (data) => {
                            if (firebaseOffline) {
                                return;
                            }

                            hasCalls = true;
                            const { namespace } = splitPath(path);
                            send(path, data);
                            handler({
                                data: messages[namespace]
                            });

                        },
                        on: (item, onHandler) => {
                            listeners[path] = listeners[path] || [];
                            listeners[path].push((...args) => {
                                if (!firebaseOffline) {
                                    onHandler(...args);
                                }
                            });
                        }
                    };
                },
                goOffline: () => {
                    firebaseOffline = true;
                },
                goOnline: () => {
                    firebaseOffline = false;
                }
            };
        }
    };

    window.firebase.database.INTERNAL = {
        forceWebSockets: () => {
            // pass
        }
    };

    const expect = () => {
        return {
            done: () => {
                if (!hasCalls) {
                    throw new Error(`Expected calls to firebase`);
                }
            }
        };
    };

    return { send, expect };
}

export function getNativeFirebaseMock({ getSessionUID, extraHandler } : { getSessionUID : () => string, extraHandler? : Function }) : NativeMockWebSocket {
    let props;

    let getPropsRequestID;
    let onApproveRequestID;
    let onCancelRequestID;
    let onErrorRequestID;
    let fallbackRequestID;

    const received = {};
    const waitingForResponse = [];

    const { send, expect: expectFirebase } = mockFirebase({
        // eslint-disable-next-line complexity
        handler: ({ data }) => {
            for (const id of Object.keys(data)) {
                const message = JSON.parse(data[id]);

                const {
                    request_uid:    requestUID,
                    message_uid:    messageUID,
                    message_type:   messageType,
                    message_status: messageStatus,
                    message_name:   messageName,
                    message_data:   messageData
                } = message;

                if (received[messageUID]) {
                    continue;
                }

                received[messageUID] = true;

                if (messageType === 'response' && waitingForResponse.indexOf(requestUID) !== -1) {
                    waitingForResponse.splice(waitingForResponse.indexOf(requestUID), 1);
                }

                if (extraHandler) {
                    extraHandler(message);
                }

                if (messageType === 'request'  && messageName === 'setProps') {
                    const {
                        orderID, facilitatorAccessToken, pageUrl, commit,
                        userAgent, buttonSessionID, env, webCheckoutUrl
                    } = messageData;

                    if (!orderID || !facilitatorAccessToken || !pageUrl || !commit || !userAgent || !buttonSessionID || !env || !webCheckoutUrl) {
                        throw new Error(`Missing props`);
                    }

                    send(`users/${ getSessionUID() }/messages/${ uniqueID() }`, JSON.stringify({
                        session_uid:        getSessionUID(),
                        source_app:         'paypal_native_checkout_sdk',
                        source_app_version: '1.2.3',
                        target_app:         'paypal_smart_payment_buttons',
                        request_uid:        requestUID,
                        message_uid:        uniqueID(),
                        message_type:       'response',
                        message_name:       'setProps',
                        message_status:     'success',
                        message_data:       {}
                    }));


                    props = messageData;
                }

                if (messageType === 'request' && messageName === 'close') {
                    send(`users/${ getSessionUID() }/messages/${ uniqueID() }`, JSON.stringify({
                        session_uid:        getSessionUID(),
                        source_app:         'paypal_native_checkout_sdk',
                        source_app_version: '1.2.3',
                        target_app:         'paypal_smart_payment_buttons',
                        request_uid:        requestUID,
                        message_uid:        uniqueID(),
                        message_type:       'response',
                        message_name:       'close',
                        message_status:     'success',
                        message_data:       {}
                    }));
                }
    
                if (messageType === 'response' && messageStatus === 'error') {
                    if (messageName === 'onError') {
                        throw new Error(messageData.message);
                    }

                    send(`users/${ getSessionUID() }/messages/${ uniqueID() }`, JSON.stringify({
                        session_uid:        getSessionUID(),
                        source_app:         'paypal_native_checkout_sdk',
                        source_app_version: '1.2.3',
                        target_app:         'paypal_smart_payment_buttons',
                        request_uid:        onApproveRequestID,
                        message_uid:        uniqueID(),
                        message_type:       'request',
                        message_name:       'onError',
                        message_data:       {
                            message: messageData.message
                        }
                    }));
                }
    
                if (messageType === 'response' && messageName === 'getProps') {
                    if (requestUID !== getPropsRequestID) {
                        throw new Error(`Request uid doest not match for getProps response`);
                    }
                    props = messageData;
                }
    
                if (messageType === 'response' && messageName === 'onApprove') {
                    if (requestUID !== onApproveRequestID) {
                        throw new Error(`Request uid doest not match for onApprove response`);
                    }
                }
    
                if (messageType === 'response' && messageName === 'onCancel') {
                    if (requestUID !== onCancelRequestID) {
                        throw new Error(`Request uid doest not match for onCancel response`);
                    }
                }
    
                if (messageType === 'response' && messageName === 'onError') {
                    if (requestUID !== onErrorRequestID) {
                        throw new Error(`Request uid doest not match for onError response`);
                    }
                }
            }
        }
    });

    /*

    const getProps = () => {
        getPropsRequestID = `${ uniqueID()  }_getProps`;

        send(`users/${ getSessionUID() }/messages/${ uniqueID() }`, JSON.stringify({
            session_uid:        getSessionUID(),
            source_app:         'paypal_native_checkout_sdk',
            source_app_version: '1.2.3',
            target_app:         'paypal_smart_payment_buttons',
            request_uid:        getPropsRequestID,
            message_uid:        uniqueID(),
            message_type:       'request',
            message_name:       'getProps'
        }));

        waitingForResponse.push(getPropsRequestID);
    };

    */

    const onApprove = () => {
        if (!props) {
            throw new Error(`Can not approve without getting props`);
        }

        onApproveRequestID = `${ uniqueID()  }_onApprove`;

        send(`users/${ getSessionUID() }/messages/${ uniqueID() }`, JSON.stringify({
            session_uid:        getSessionUID(),
            source_app:         'paypal_native_checkout_sdk',
            source_app_version: '1.2.3',
            target_app:         'paypal_smart_payment_buttons',
            request_uid:        onApproveRequestID,
            message_uid:        uniqueID(),
            message_type:       'request',
            message_name:       'onApprove',
            message_data:       {
                orderID: props.orderID,
                payerID: 'XXYYZZ123456'
            }
        }));

        waitingForResponse.push(onApproveRequestID);
    };

    const onCancel = () => {
        if (!props) {
            throw new Error(`Can not approve without getting props`);
        }

        onCancelRequestID = `${ uniqueID()  }_onCancel`;

        send(`users/${ getSessionUID() }/messages/${ uniqueID() }`, JSON.stringify({
            session_uid:        getSessionUID(),
            source_app:         'paypal_native_checkout_sdk',
            source_app_version: '1.2.3',
            target_app:         'paypal_smart_payment_buttons',
            request_uid:        onCancelRequestID,
            message_uid:        uniqueID(),
            message_type:       'request',
            message_name:       'onCancel',
            message_data:       {
                orderID: props.orderID
            }
        }));

        waitingForResponse.push(onCancelRequestID);
    };

    const onError = () => {
        onErrorRequestID = `${ uniqueID()  }_onError`;

        send(`users/${ getSessionUID() }/messages/${ uniqueID() }`, JSON.stringify({
            session_uid:        getSessionUID(),
            source_app:         'paypal_native_checkout_sdk',
            source_app_version: '1.2.3',
            target_app:         'paypal_smart_payment_buttons',
            request_uid:        onErrorRequestID,
            message_uid:        uniqueID(),
            message_type:       'request',
            message_name:       'onError',
            message_data:       {
                message: 'Something went wrong'
            }
        }));

        waitingForResponse.push(onErrorRequestID);
    };

    const fallback = ({ buyerAccessToken } : { buyerAccessToken : string }) => {
        fallbackRequestID = `${ uniqueID() }_fallback`;

        send(`users/${ getSessionUID() }/messages/${ uniqueID() }`, JSON.stringify({
            session_uid:        getSessionUID(),
            source_app:         'paypal_native_checkout_sdk',
            source_app_version: '1.2.3',
            target_app:         'paypal_smart_payment_buttons',
            request_uid:        fallbackRequestID,
            message_uid:        uniqueID(),
            message_type:       'request',
            message_name:       'fallback',
            message_data:       { buyerAccessToken }
        }));

        waitingForResponse.push(onErrorRequestID);
    };

    const expect = () => {
        const { done: firebaseDone } = expectFirebase();

        return {
            done: async () => {
                firebaseDone();

                if (waitingForResponse.length) {
                    await ZalgoPromise.delay(0);
                }

                if (waitingForResponse.length) {
                    throw new Error(`Waiting for responses from firebase: ${  waitingForResponse.join(', ') }`);
                }
            }
        };
    };

    return {
        expect, onApprove, onCancel, onError, fallback
    };
}


const mockScripts = {};

export function mockScript({ src, expect = true, block = true } : { src : string, expect? : boolean, block? : boolean }) : { done : () => void } {
    mockScripts[src] = { expect, block };

    return {
        done: () => {
            if (expect && !mockScripts[src].created) {
                throw new Error(`Expected script with src ${ src } to have been created`);
            }

            delete mockScripts[src];
        }
    };
}

const createElement = document.createElement;
// $FlowFixMe
document.createElement = function mockCreateElement(name : string) : HTMLElement {
    const el = createElement.apply(this, arguments);

    if (name !== 'script') {
        return el;
    }

    const setAttribute = el.setAttribute;
    el.setAttribute = function mockSetAttribute(key : string, value : string) {
        if (key === 'src' && mockScripts[value]) {
            mockScripts[value].created = true;
            const { block } = mockScripts[value];

            if (block) {
                setAttribute.call(this, 'type', 'mock/javascript');
            }

            setAttribute.apply(this, arguments);
        }
    };

    const addEventListener = el.addEventListener;
    el.addEventListener = function mockAddEventListener(eventName : string, handler : () => void) {
        if (eventName === 'load') {
            handler();
            return;
        }

        addEventListener.apply(this, arguments);
    };

    return el;
};

export function mockFirebaseScripts() : { done : () => void } {
    loadFirebaseSDK.reset();

    const mockfirebaseApp = mockScript({
        src:    'https://www.paypalobjects.com/checkout/js/lib/firebase-app.js',
        expect: true,
        block:  true
    });

    const mockfirebaseAuth = mockScript({
        src:    'https://www.paypalobjects.com/checkout/js/lib/firebase-auth.js',
        expect: true,
        block:  true
    });

    const mockfirebaseDatabase = mockScript({
        src:    'https://www.paypalobjects.com/checkout/js/lib/firebase-database.js',
        expect: true,
        block:  true
    });

    return {
        done: () => {
            mockfirebaseApp.done();
            mockfirebaseAuth.done();
            mockfirebaseDatabase.done();
        }
    };
}

export const MOCK_SDK_META = 'abc123';

export async function mockSetupButton(overrides? : Object = {}) : ZalgoPromise<void> {
    await setupButton({
        facilitatorAccessToken:        'QQQ123000',
        merchantID:                    [ 'XYZ12345' ],
        fundingEligibility:            DEFAULT_FUNDING_ELIGIBILITY,
        personalization:               {},
        buyerCountry:                  COUNTRY.US,
        isCardFieldsExperimentEnabled: false,
        firebaseConfig:                MOCK_FIREBASE_CONFIG,
        eligibility:                   {
            cardFields: false,
            native:     false
        },
        sdkMeta: MOCK_SDK_META,
        ...overrides
    });
}
