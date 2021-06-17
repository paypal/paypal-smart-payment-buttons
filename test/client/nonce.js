/* @flow */
import { uniqueID, wrapPromise } from 'belter/src';
import {
    CARD,
    FUNDING,
    INTENT,
    WALLET_INSTRUMENT
} from '@paypal/sdk-constants/src';

import {
    clickButton,
    createButtonHTML,
    generateOrderID,
    getGraphQLApiMock,
    mockAsyncProp,
    mockSetupButton
} from './mocks';

describe('nonce cases', () => {
    it('should pay with a nonce when wallet is present', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = generateOrderID();
            const userIDToken = uniqueID();
            const tokenID = uniqueID();
            const accessToken = uniqueID();
            const instrumentID = tokenID;
            const paymentMethodID = tokenID;
            const payerID = 'payerID';

            window.xprops.userIDToken = userIDToken;
            window.xprops.paymentMethodID = 'test';
            window.xprops.paymentMethodNonce = paymentMethodID;
            window.xprops.branded = true;

            const wallet = {
                [FUNDING.CARD]: {
                    instruments: [
                        {
                            type:      WALLET_INSTRUMENT.CARD,
                            instrumentID,
                            tokenID,
                            branded:   true,
                            oneClick:  true,
                            paymentMethodID,
                            accessToken
                        }
                    ]
                }
            };

            const fundingEligibility = {
                [FUNDING.CARD]: {
                    eligible: true,
                    vendors:  {
                        [CARD.VISA]: {
                            eligible:  true,
                            type:      WALLET_INSTRUMENT.CARD,
                            instrumentID,
                            tokenID,
                            branded:   true,
                            oneClick:  true,
                            paymentMethodID,
                            accessToken
                        }
                    }
                }
            };

            window.xprops.createOrder = mockAsyncProp(
                expect('createOrder', () => {
                    return orderID;
                })
            );

            window.xprops.onApprove = mockAsyncProp(
                expect('onApprove', data => {
                    if (data.orderID !== orderID) {
                        throw new Error(
                            `Expected orderID to be ${ orderID }, got ${ data.orderID }`
                        );
                    }

                    if (data.payerID !== payerID) {
                        throw new Error(
                            `Expected payerID to be ${ payerID }, got ${ data.payerID }`
                        );
                    }
                })
            );

            const gqlMock = getGraphQLApiMock({
                extraHandler: ({ data }) => {
                    if (data.query.includes('query GetSmartWallet')) {
                        if (data.variables.userIDToken !== userIDToken) {
                            throw new Error(`Expected correct userIdToken`);
                        }

                        return {
                            data: {
                                smartWallet: {
                                    ...wallet
                                }
                            }
                        };
                    }

                    if (data.query.includes('query GetCheckoutDetails')) {
                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  INTENT.CAPTURE,
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        },
                                        shippingAddress: {
                                            isFullAddress: false
                                        }
                                    },
                                    flags: {
                                        isChangeShippingAddressAllowed: false
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:      {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }

                    if (data.query.includes('mutation ApprovePaymentWithNonce')) {
                        return {
                            data: {
                                approvePaymentWithNonce: {
                                    buyer: {
                                        userId: payerID
                                    }
                                }
                            }
                        };
                    }
                }
            }).expectCalls();

            createButtonHTML({ wallet, fundingEligibility });
            await mockSetupButton({
                merchantID:         [ uniqueID() ],
                wallet,
                fundingEligibility
            });

            await clickButton(FUNDING.CARD);
            gqlMock.done();
        });
    });

    it('should fallback to Checkout when wallet is not present', async () => {
        return await wrapPromise(async ({ expect }) => {
            const orderID = generateOrderID();
            const nonce = 'nonce';
            const userIDToken = uniqueID();
            const tokenID = uniqueID();
            const accessToken = uniqueID();
            const instrumentID = tokenID;
            const paymentMethodID = tokenID;

            window.xprops.userIDToken = userIDToken;
            window.xprops.paymentMethodID = 'test';
            window.xprops.paymentMethodNonce = nonce;
            window.xprops.branded = true;

            const wallet = {};

            const fundingEligibility = {
                [FUNDING.CARD]: {
                    eligible: true,
                    vendors:  {
                        [CARD.VISA]: {
                            eligible:  true,
                            type:      WALLET_INSTRUMENT.CARD,
                            instrumentID,
                            tokenID,
                            branded:   true,
                            oneClick:  true,
                            paymentMethodID,
                            accessToken
                        }
                    }
                }
            };

            window.xprops.createOrder = mockAsyncProp(
                expect('createOrder', () => {
                    return orderID;
                })
            );

            window.paypal.Checkout = expect('Checkout', window.paypal.Checkout);

            const gqlMock = getGraphQLApiMock({
                extraHandler: ({ data }) => {
                    if (data.query.includes('query GetSmartWallet')) {
                        if (data.variables.userIDToken !== userIDToken) {
                            throw new Error(`Expected correct userIdToken`);
                        }

                        return {
                            data: {
                                smartWallet: {
                                    ...wallet
                                }
                            }
                        };
                    }

                    if (data.query.includes('query GetCheckoutDetails')) {
                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  INTENT.CAPTURE,
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        },
                                        shippingAddress: {
                                            isFullAddress: false
                                        }
                                    },
                                    flags: {
                                        isChangeShippingAddressAllowed: false
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:      {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }
                }
            }).expectCalls();

            createButtonHTML({ wallet, fundingEligibility });
            await mockSetupButton({
                merchantID:         [ uniqueID() ],
                wallet,
                fundingEligibility
            });

            await clickButton(FUNDING.CARD);
            gqlMock.done();
        });
    });

    it('should fallback to Checkout when paymentMethodNonce is not present', async () => {
        return await wrapPromise(async ({ expect }) => {
            const orderID = generateOrderID();
            const userIDToken = uniqueID();
            const tokenID = uniqueID();
            const accessToken = uniqueID();
            const instrumentID = tokenID;
            const paymentMethodID = tokenID;

            const wallet = {};

            const fundingEligibility = {
                [FUNDING.CARD]: {
                    eligible: true,
                    vendors:  {
                        [CARD.VISA]: {
                            eligible:  true,
                            type:      WALLET_INSTRUMENT.CARD,
                            instrumentID,
                            tokenID,
                            branded:   true,
                            oneClick:  true,
                            paymentMethodID,
                            accessToken
                        }
                    }
                }
            };

            window.xprops.createOrder = mockAsyncProp(
                expect('createOrder', () => {
                    return orderID;
                })
            );

            window.paypal.Checkout = expect('Checkout', window.paypal.Checkout);

            const gqlMock = getGraphQLApiMock({
                extraHandler: ({ data }) => {
                    if (data.query.includes('query GetSmartWallet')) {
                        if (data.variables.userIDToken !== userIDToken) {
                            throw new Error(`Expected correct userIdToken`);
                        }

                        return {
                            data: {
                                smartWallet: {
                                    ...wallet
                                }
                            }
                        };
                    }

                    if (data.query.includes('query GetCheckoutDetails')) {
                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  INTENT.CAPTURE,
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        },
                                        shippingAddress: {
                                            isFullAddress: false
                                        }
                                    },
                                    flags: {
                                        isChangeShippingAddressAllowed: false
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:      {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }
                }
            }).expectCalls();

            createButtonHTML({ wallet, fundingEligibility });
            await mockSetupButton({
                merchantID:         [ uniqueID() ],
                wallet,
                fundingEligibility
            });

            await clickButton(FUNDING.CARD);
            gqlMock.done();
        });
    });

    it('should skip nonce payment when wallet doesnt have a matching instrument', async () => {
        return await wrapPromise(async ({ expect }) => {
            const orderID = generateOrderID();
            const userIDToken = uniqueID();
            const tokenID = uniqueID();
            const accessToken = uniqueID();
            const instrumentID = uniqueID();
            const paymentMethodID = uniqueID();
            const nonce = 'nonce';

            window.xprops.userIDToken = userIDToken;
            window.xprops.paymentMethodID = 'test';
            window.xprops.paymentMethodNonce = nonce;
            window.xprops.branded = true;

            const wallet = {
                [FUNDING.CARD]: {
                    instruments: [
                        {
                            type:      WALLET_INSTRUMENT.CARD,
                            instrumentID,
                            tokenID,
                            branded:   true,
                            oneClick:  true,
                            paymentMethodID,
                            accessToken
                        }
                    ]
                }
            };


            const fundingEligibility = {
                [FUNDING.CARD]: {
                    eligible: true,
                    vendors:  {
                        [CARD.VISA]: {
                            eligible:  true,
                            type:      WALLET_INSTRUMENT.CARD,
                            instrumentID,
                            tokenID,
                            branded:   true,
                            oneClick:  true,
                            paymentMethodID,
                            accessToken
                        }
                    }
                }
            };

            window.xprops.createOrder = mockAsyncProp(
                expect('createOrder', () => {
                    return orderID;
                })
            );

            const gqlMock = getGraphQLApiMock({
                extraHandler: ({ data }) => {
                    if (data.query.includes('query GetSmartWallet')) {
                        if (data.variables.userIDToken !== userIDToken) {
                            throw new Error(`Expected correct userIdToken`);
                        }

                        return {
                            data: {
                                smartWallet: {
                                    ...wallet
                                }
                            }
                        };
                    }

                    if (data.query.includes('query GetCheckoutDetails')) {
                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  INTENT.CAPTURE,
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        },
                                        shippingAddress: {
                                            isFullAddress: false
                                        }
                                    },
                                    flags: {
                                        isChangeShippingAddressAllowed: false
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:      {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }
                }
            }).expectCalls();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove'));


            createButtonHTML({ wallet, fundingEligibility });
            await mockSetupButton({
                merchantID:         [ uniqueID() ],
                wallet,
                fundingEligibility
            });

            await clickButton(FUNDING.CARD);
            gqlMock.done();
        });
    });


    it('should invoke onError when mutation throws an error and avoid onApprove', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = generateOrderID();
            const userIDToken = uniqueID();
            const tokenID = uniqueID();
            const accessToken = uniqueID();
            const instrumentID = tokenID;
            const paymentMethodID = tokenID;

            window.xprops.userIDToken = userIDToken;
            window.xprops.paymentMethodID = 'test';
            window.xprops.paymentMethodNonce = paymentMethodID;
            window.xprops.branded = true;

            const wallet = {
                [FUNDING.CARD]: {
                    instruments: [
                        {
                            type:      WALLET_INSTRUMENT.CARD,
                            instrumentID,
                            tokenID,
                            branded:   true,
                            oneClick:  true,
                            paymentMethodID,
                            accessToken
                        }
                    ]
                }
            };

            const fundingEligibility = {
                [FUNDING.CARD]: {
                    eligible: true,
                    vendors:  {
                        [CARD.VISA]: {
                            eligible:  true,
                            type:      WALLET_INSTRUMENT.CARD,
                            instrumentID,
                            tokenID,
                            branded:   true,
                            oneClick:  true,
                            paymentMethodID,
                            accessToken
                        }
                    }
                }
            };

            const gqlMock = getGraphQLApiMock({
                extraHandler: ({ data }) => {
                    if (data.query.includes('query GetSmartWallet')) {
                        if (data.variables.userIDToken !== userIDToken) {
                            throw new Error(`Expected correct userIdToken`);
                        }

                        return {
                            data: {
                                smartWallet: {
                                    ...wallet
                                }
                            }
                        };
                    }

                    if (data.query.includes('query GetCheckoutDetails')) {
                        return {
                            data: {
                                checkoutSession: {
                                    cart: {
                                        intent:  INTENT.CAPTURE,
                                        amounts: {
                                            total: {
                                                currencyCode: 'USD'
                                            }
                                        },
                                        shippingAddress: {
                                            isFullAddress: false
                                        }
                                    },
                                    flags: {
                                        isChangeShippingAddressAllowed: false
                                    },
                                    payees: [
                                        {
                                            merchantId: 'XYZ12345',
                                            email:      {
                                                stringValue: 'xyz-us-b1@paypal.com'
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    }

                    if (data.query.includes('mutation ApprovePaymentWithNonce')) {
                        return {
                            errors: [
                                {
                                    message: 'PAY_WITH_DIFFERENT_CARD'
                                }
                            ]
                        };
                    }
                }
            }).expectCalls();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            window.xprops.onApprove = avoid('onApprove');
            window.xprops.onError = mockAsyncProp(expect('onError'));


            createButtonHTML({ wallet, fundingEligibility });
            await mockSetupButton({
                merchantID:         [ uniqueID() ],
                fundingEligibility,
                wallet
            });


            await clickButton(FUNDING.CARD).catch(err => err);
            gqlMock.done();
        });
    });
});
