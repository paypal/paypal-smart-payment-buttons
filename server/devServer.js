/* @flow */

import { randomBytes } from 'crypto';

import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';

import { WEBPACK_CONFIG_WALLET_LOCAL_DEBUG } from '../webpack.config';

import type { ExpressRequest, ExpressResponse } from './types';
import { getButtonMiddleware, getMenuMiddleware, getWalletMiddleware } from './components';

const app = express();
const PORT = process.env.PORT || 8003;

const buttonMiddleware = getButtonMiddleware({
    graphQL: (req, payload) => {
        // $FlowFixMe
        return Promise.resolve(payload.map(({ query }) => {
            if (query.match(/query GetFundingEligibility/)) {
                return {
                    fundingEligibility: {
                        paypal: {
                            eligible: true
                        }
                    }
                };
            }

            if (query.match(/query GetPersonalization/)) {
                return {
                    checkoutCustomization: {
                        tagline: {
                            text:     'Get $5 off your order!',
                            tracking: {
                                impression: 'http://www.paypal.com/tracking?foo=bar',
                                click:      'http://www.paypal.com/tracking?foo=bar'
                            }
                        },
                        buttonText: {
                            text:     'PAY! {logo:pp} {logo:paypal} {logo:pp}',
                            tracking: {
                                impression: 'http://www.paypal.com/tracking?foo=bar',
                                click:      'http://www.paypal.com/tracking?foo=bar'
                            }
                        }
                    }
                };
            }

            if (query.match(/query NativeEligibility/)) {
                return {
                    mobileSDKEligibility: {
                        eligible: true
                    }
                };
            }

            return {
                data: {}
            };
        }));
    },
    getAccessToken: () => {
        return Promise.resolve('XYZ12345');
    },
    getMerchantID: () => {
        return Promise.resolve('XYZ12345');
    },
    content: {
        US: {
            en: {
                instantlyPayWith:     'Pay instantly with',
                poweredBy:            'Powered by PayPal',
                chooseCardOrShipping: 'Choose card or shipping',
                useDifferentAccount:  'Use different account',
                deleteVaultedAccount: 'Forget this account',
                deleteVaultedCard:    'Forget this card'
            }
        }
    }
});

const walletMiddleware = getWalletMiddleware({
    graphQL: (req, payload) => {
        // $FlowFixMe
        return Promise.resolve(payload.map(({ query }) => {
            if (query.match(/query CreateCheckoutSession/)) {
                return {
                    result: {
                        checkoutSession: {
                            declinedInstruments: [],
                            fundingOptions:      [{
                                "id": "BA-XH7B6GNDFFJV2",
                                "fundingInstrument": {
                                    "id": "BA-XH7B6GNDFFJV2",
                                    "name": "WELLS FARGO BANK NA",
                                    "issuerProductDescription": null,
                                    "type": "BANK_ACCOUNT",
                                    "instrumentSubType": "CHECKING",
                                    "lastDigits": "9673",
                                    "image": null,
                                    "institutionImages": [],
                                    "isPreferred": true,
                                    "attribution": null,
                                    "rewards": null,
                                    "__typename": "FundingInstrument",
                                    "creditFIAdditionalData": null,
                                    "payerDisclaimer": null
                                },
                                "allPlans": [{
                                    "id": "b625839c4e5f8d559b6f78c263a5445b",
                                    "fundingSources": [{
                                        "fundingInstrument": {
                                            "id": "BA-XH7B6GNDFFJV2",
                                            "name": "WELLS FARGO BANK NA",
                                            "type": "BANK_ACCOUNT",
                                            "instrumentSubType": "CHECKING",
                                            "lastDigits": "9673",
                                            "__typename": "FundingInstrument"
                                        },
                                        "fundingMethodType": "INSTANT",
                                        "delayedPaymentDate": null,
                                        "amount": {
                                            "currencyCode": "USD",
                                            "currencyValue": "0.01",
                                            "currencyFormatSymbolISOCurrency": "$0.01 USD",
                                            "currencyFormat": "$0.01",
                                            "__typename": "Amount"
                                        },
                                        "groupedSources": null,
                                        "__typename": "FundingSource"
                                    }],
                                    "isSelected": true,
                                    "backupFundingInstrument": {
                                        "id": "CC-J327ZUEUDE8QL",
                                        "name": "Visa",
                                        "lastDigits": "8558",
                                        "__typename": "FundingInstrument"
                                    },
                                    "currencyConversion": null,
                                    "preAuthorizationData": null,
                                    "__typename": "Plan"
                                }],
                                "__typename": "FundingOption"
                            }, {
                                "id": "BC-5932XGYM5Y3QC",
                                "fundingInstrument": {
                                    "id": "BC-5932XGYM5Y3QC",
                                    "name": "BILL_ME_LATER",
                                    "issuerProductDescription": null,
                                    "type": "PAYPAL_CREDIT",
                                    "instrumentSubType": "PAYPAL",
                                    "lastDigits": null,
                                    "image": null,
                                    "institutionImages": [],
                                    "isPreferred": false,
                                    "attribution": null,
                                    "rewards": null,
                                    "__typename": "FundingInstrument",
                                    "creditFIAdditionalData": null,
                                    "payerDisclaimer": null
                                },
                                "allPlans": [{
                                    "id": "79a8687f3b642b08a5a06ab76a9df2f9",
                                    "fundingSources": [{
                                        "fundingInstrument": {
                                            "id": "BC-5932XGYM5Y3QC",
                                            "name": "BILL_ME_LATER",
                                            "type": "PAYPAL_CREDIT",
                                            "instrumentSubType": "PAYPAL",
                                            "lastDigits": null,
                                            "__typename": "FundingInstrument"
                                        },
                                        "fundingMethodType": "INSTANT",
                                        "delayedPaymentDate": null,
                                        "amount": {
                                            "currencyCode": "USD",
                                            "currencyValue": "0.01",
                                            "currencyFormatSymbolISOCurrency": "$0.01 USD",
                                            "currencyFormat": "$0.01",
                                            "__typename": "Amount"
                                        },
                                        "groupedSources": null,
                                        "__typename": "FundingSource"
                                    }],
                                    "isSelected": false,
                                    "backupFundingInstrument": null,
                                    "currencyConversion": null,
                                    "preAuthorizationData": null,
                                    "__typename": "Plan"
                                }],
                                "__typename": "FundingOption"
                            }, {
                                "id": "CC-J327ZUEUDE8QL",
                                "fundingInstrument": {
                                    "id": "CC-J327ZUEUDE8QL",
                                    "name": "VISA",
                                    "issuerProductDescription": "Wells Fargo Bank",
                                    "type": "CREDIT_CARD",
                                    "instrumentSubType": "DEBIT",
                                    "lastDigits": "8558",
                                    "image": {
                                        "url": {
                                            "href": "https://pics.paypal.com//00/s/OTY5WDE1MzZYUE5H/p/ZTkxNjMyNjAtOTZiYy00YzllLTlmMDQtNDM5MmVkYjJkYjFk/image_0.png",
                                            "__typename": "GenericURL"
                                        },
                                        "width": "96",
                                        "height": "96",
                                        "__typename": "CardImage"
                                    },
                                    "institutionImages": [],
                                    "isPreferred": false,
                                    "attribution": null,
                                    "rewards": null,
                                    "__typename": "FundingInstrument",
                                    "creditFIAdditionalData": null,
                                    "payerDisclaimer": null
                                },
                                "allPlans": [{
                                    "id": "7afea12840ebe9d3c2702228d1b0a9c8",
                                    "fundingSources": [{
                                        "fundingInstrument": {
                                            "id": "CC-J327ZUEUDE8QL",
                                            "name": "VISA",
                                            "type": "CREDIT_CARD",
                                            "instrumentSubType": "DEBIT",
                                            "lastDigits": "8558",
                                            "__typename": "FundingInstrument"
                                        },
                                        "fundingMethodType": "INSTANT",
                                        "delayedPaymentDate": null,
                                        "amount": {
                                            "currencyCode": "USD",
                                            "currencyValue": "0.01",
                                            "currencyFormatSymbolISOCurrency": "$0.01 USD",
                                            "currencyFormat": "$0.01",
                                            "__typename": "Amount"
                                        },
                                        "groupedSources": null,
                                        "__typename": "FundingSource"
                                    }],
                                    "isSelected": false,
                                    "backupFundingInstrument": null,
                                    "currencyConversion": null,
                                    "preAuthorizationData": {
                                        "authType": "FULL",
                                        "amount": {
                                            "currencyFormatSymbolISOCurrency": "$0.01 USD",
                                            "__typename": "Amount"
                                        },
                                        "__typename": "PreAuthorizationData"
                                    },
                                    "__typename": "Plan"
                                }],
                                "__typename": "FundingOption"
                            }, {
                                "id": "CC-WXS325L2PS75E",
                                "fundingInstrument": {
                                    "id": "CC-WXS325L2PS75E",
                                    "name": "VISA",
                                    "issuerProductDescription": "Wells Fargo Platinum Visa Credit Card",
                                    "type": "CREDIT_CARD",
                                    "instrumentSubType": "CREDIT",
                                    "lastDigits": "5335",
                                    "image": {
                                        "url": {
                                            "href": "https://pics.paypal.com//00/s/OTY5WDE1MzhYUE5H/p/Y2IwMTk0Y2YtOTY4OS00ZWMwLWI1NjgtZmI5MDQzOWUyMmZk/image_0.png",
                                            "__typename": "GenericURL"
                                        },
                                        "width": "96",
                                        "height": "96",
                                        "__typename": "CardImage"
                                    },
                                    "institutionImages": [],
                                    "isPreferred": false,
                                    "attribution": null,
                                    "rewards": null,
                                    "__typename": "FundingInstrument",
                                    "creditFIAdditionalData": null,
                                    "payerDisclaimer": null
                                },
                                "allPlans": [{
                                    "id": "eda6e6fe3d7ecaa0d4fc8fc0c84f6c4f",
                                    "fundingSources": [{
                                        "fundingInstrument": {
                                            "id": "CC-WXS325L2PS75E",
                                            "name": "VISA",
                                            "type": "CREDIT_CARD",
                                            "instrumentSubType": "CREDIT",
                                            "lastDigits": "5335",
                                            "__typename": "FundingInstrument"
                                        },
                                        "fundingMethodType": "INSTANT",
                                        "delayedPaymentDate": null,
                                        "amount": {
                                            "currencyCode": "USD",
                                            "currencyValue": "0.01",
                                            "currencyFormatSymbolISOCurrency": "$0.01 USD",
                                            "currencyFormat": "$0.01",
                                            "__typename": "Amount"
                                        },
                                        "groupedSources": null,
                                        "__typename": "FundingSource"
                                    }],
                                    "isSelected": false,
                                    "backupFundingInstrument": null,
                                    "currencyConversion": null,
                                    "preAuthorizationData": {
                                        "authType": "FULL",
                                        "amount": {
                                            "currencyFormatSymbolISOCurrency": "$0.01 USD",
                                            "__typename": "Amount"
                                        },
                                        "__typename": "PreAuthorizationData"
                                    },
                                    "__typename": "Plan"
                                }],
                                "__typename": "FundingOption"
                            }, {
                                "id": "CC-ATXCFBG3VN2GQ",
                                "fundingInstrument": {
                                    "id": "CC-ATXCFBG3VN2GQ",
                                    "name": "VISA",
                                    "issuerProductDescription": "Barclaycard with Apple Rewards",
                                    "type": "CREDIT_CARD",
                                    "instrumentSubType": "CREDIT",
                                    "lastDigits": "3817",
                                    "image": {
                                        "url": {
                                            "href": "https://pics.paypal.com//00/s/OTY5WDE1MzZYUE5H/p/MjA5YzU0OTUtM2JjNi00OGE5LTg3ZjgtMWM0MzA0YjM1NWJk/image_0.png",
                                            "__typename": "GenericURL"
                                        },
                                        "width": "96",
                                        "height": "96",
                                        "__typename": "CardImage"
                                    },
                                    "institutionImages": [],
                                    "isPreferred": false,
                                    "attribution": null,
                                    "rewards": null,
                                    "__typename": "FundingInstrument",
                                    "creditFIAdditionalData": null,
                                    "payerDisclaimer": null
                                },
                                "allPlans": [{
                                    "id": "56bc9e524adcb3c566fdd41e2f6aeacf",
                                    "fundingSources": [{
                                        "fundingInstrument": {
                                            "id": "CC-ATXCFBG3VN2GQ",
                                            "name": "VISA",
                                            "type": "CREDIT_CARD",
                                            "instrumentSubType": "CREDIT",
                                            "lastDigits": "3817",
                                            "__typename": "FundingInstrument"
                                        },
                                        "fundingMethodType": "INSTANT",
                                        "delayedPaymentDate": null,
                                        "amount": {
                                            "currencyCode": "USD",
                                            "currencyValue": "0.01",
                                            "currencyFormatSymbolISOCurrency": "$0.01 USD",
                                            "currencyFormat": "$0.01",
                                            "__typename": "Amount"
                                        },
                                        "groupedSources": null,
                                        "__typename": "FundingSource"
                                    }],
                                    "isSelected": false,
                                    "backupFundingInstrument": null,
                                    "currencyConversion": null,
                                    "preAuthorizationData": {
                                        "authType": "FULL",
                                        "amount": {
                                            "currencyFormatSymbolISOCurrency": "$0.01 USD",
                                            "__typename": "Amount"
                                        },
                                        "__typename": "PreAuthorizationData"
                                    },
                                    "__typename": "Plan"
                                }],
                                "__typename": "FundingOption"
                            }],
                        }
                    }
                };
            }
            return {
                data: {}
            };
        }));
    },
    exchangeAuthCode: () => 'foobar'
});

const menuMiddleware = getMenuMiddleware({});

app.use('/smart/buttons', (req : ExpressRequest, res : ExpressResponse, next) => {
    const nonce = randomBytes(16).toString('base64').replace(/[^a-zA-Z0-9_]/g, '');

    res.locals = res.locals || {};
    res.locals.nonce = nonce;

    res.header('content-security-policy', `style-src self 'nonce-${ nonce }'; script-src self 'nonce-${ nonce }';`);
    
    next();
}, buttonMiddleware);

app.use('/smart/menu', (req : ExpressRequest, res : ExpressResponse, next) => {
    const nonce = randomBytes(16).toString('base64').replace(/[^a-zA-Z0-9_]/g, '');

    res.locals = res.locals || {};
    res.locals.nonce = nonce;

    res.header('content-security-policy', `style-src self 'nonce-${ nonce }'; script-src self 'nonce-${ nonce }';`);

    next();
}, menuMiddleware);

const walletScriptMiddleware = webpackDevMiddleware(webpack(WEBPACK_CONFIG_WALLET_LOCAL_DEBUG), { serverSideRender: true });

app.use('/smart/wallet', (req : ExpressRequest, res : ExpressResponse, next) => {
    const nonce = randomBytes(16).toString('base64').replace(/[^a-zA-Z0-9_]/g, '');
    
    res.locals = res.locals || {};
    res.locals.nonce = nonce;
    
    res.header('content-security-policy', `style-src self 'nonce-${ nonce }'; script-src self 'nonce-${ nonce }';`);

    next();
}, walletScriptMiddleware, walletMiddleware);

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`
        Smart Button server listening
          - http://localhost.paypal.com:${ PORT }/smart/buttons?clientID=alc_client1
          - http://localhost.paypal.com:${ PORT }/smart/menu?clientID=alc_client1
          - http://localhost.paypal.com:${ PORT }/smart/wallet?clientID=alc_client1&orderID=ORDER123&buyerAccessToken=access1234
    
    `);
});
