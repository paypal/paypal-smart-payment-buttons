/* @flow */
/* eslint no-restricted-globals: off, promise/no-native: off, compat/compat: off */

type MockReq = {|
    query : { [string] : string }
|};

export function mockReq(opts : Object = {}) : MockReq {
    return {
        query:   {},
        headers: {
            'user-agent': 'xyz'
        },
        get:   () => undefined,
        ...opts
    };
}

type MockRes = {|
    _status : number,
    _headers : { [string] : string },
    _body? : string,

    status : (number) => MockRes,
    header : (string, string) => MockRes,
    send : (string) => MockRes,

    getStatus : () => number,
    removeHeader : (string) => void,
    getHeader : (string) => ?string,
    getBody : () => ?string
|};

export function mockRes(opts : Object = {}) : MockRes {
    return {
        _status:  200,
        _headers: {},

        status(status : number) : MockRes {
            this._status = status;
            return this;
        },
        header(key : string, value : string) : MockRes {
            this._headers[key] = value;
            return this;
        },
        send(str : string) : MockRes {
            this.body = str;
            return this;
        },
        getStatus() : number {
            return this._status;
        },
        getHeader(name : string) : ?string {
            return this._headers[name];
        },
        removeHeader(name : string) {
            delete this._headers[name];
        },
        getBody() : ?string {
            return this.body;
        },
        ...opts
    };
}

// eslint-disable-next-line require-await
export async function graphQL(req : {}, payload : $ReadOnlyArray<{ query : string, variables : Object }>) : Promise<Object> {
    return Promise.resolve(payload.map(request => {
        if (request.query.match(/FundingEligibility/)) {
            return {
                fundingEligibility: {
                    bancontact: {
                        eligible: false
                    },
                    card: {
                        eligible: true,
                        branded:  true,

                        vendors: {
                            visa: {
                                eligible: true
                            },
                            mastercard: {
                                eligible: true
                            },
                            amex: {
                                eligible: true
                            },
                            discover: {
                                eligible: true
                            },
                            hiper: {
                                eligible: false
                            },
                            elo: {
                                eligible: false
                            },
                            jcb: {
                                eligible: false
                            }
                        }
                    },
                    credit: {
                        eligible: false
                    },
                    sepa: {
                        eligible: false
                    },
                    eps: {
                        eligible: false
                    },
                    giropay: {
                        eligible: false
                    },
                    ideal: {
                        eligible: false
                    },
                    mybank: {
                        eligible: false
                    },
                    p24: {
                        eligible: false
                    },
                    paypal: {
                        eligible: true
                    },
                    sofort: {
                        eligible: false
                    },
                    venmo: {
                        eligible: false
                    },
                    wechatpay: {
                        eligible: false
                    },
                    zimpler: {
                        eligible: false
                    }
                }
            };
        }

        if (request.query.match(/CheckoutCustomization/)) {
            return {
                checkoutCustomization: {
                    buttonText: {
                        text: 'foobar'
                    },
                    tagline: {
                        text: 'foobar'
                    }
                }
            };
        }

        if (request.query.match(/NativeEligibility/)) {
            return {
                mobileSDKEligibility: {
                    eligible: true
                }
            };
        }

        throw new Error(`Unmatched query: ${ request.query }`);
    }));
}

export function getAccessToken() : Promise<string> {
    return Promise.resolve('ABCDEF12345');
}

export function getMerchantID() : Promise<string> {
    return Promise.resolve('ABCDEF12345');
}
