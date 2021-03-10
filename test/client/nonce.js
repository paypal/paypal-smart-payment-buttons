/* @flow */
import { uniqueID, wrapPromise } from 'belter/src';
import { FUNDING, INTENT, WALLET_INSTRUMENT } from '@paypal/sdk-constants/src';

import {
    clickButton,
    createButtonHTML,
    generateOrderID, getGraphQLApiMock,
    mockAsyncProp,
    mockSetupButton
} from './mocks';

describe.only('nonce cases', () => {
    it('should pay with a nonce', async () => {
        return await wrapPromise(async ({ expect }) => {
            const orderID = generateOrderID();
            const payerID = uniqueID();


            window.xprops.createOrder = mockAsyncProp(
                expect('createOrder', () => {
                    return orderID;
                })
            );

            window.xprops.onApprove = mockAsyncProp(
                expect('onApprove',  data => {
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

            const wallet = {
                [FUNDING.CARD]: {
                    instruments: [
                        {
                            type:         WALLET_INSTRUMENT.CARD,
                            instrumentID: [ uniqueID() ],
                            oneClick:     true
                        }
                    ]
                }
            };

            const userIDToken = uniqueID();
            const accessToken = uniqueID();
            const instrumentID = uniqueID();

            const gqlMock = getGraphQLApiMock({
                extraHandler: ({ headers, data }) => {
                    if (data.query.includes('query GetSmartWallet')) {
                        if (data.variables.userIDToken !== userIDToken) {
                            throw new Error(`Expected correct userIdToken`);
                        }

                        return {
                            data: {
                                smartWallet: {
                                    [ FUNDING.PAYPAL ]: {
                                        instruments: [
                                            {
                                                type:     WALLET_INSTRUMENT.CARD,
                                                instrumentID,
                                                accessToken,
                                                oneClick: true
                                            }
                                        ]
                                    }
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

                    if (data.query.includes('mutation OneClickApproveOrder')) {
                        if (headers['x-paypal-internal-euat'] !== accessToken) {
                            throw new Error(`Expected buyer access token to be present in request`);
                        }

                        return {
                            data: {
                                oneClickPayment: {
                                    userId: payerID
                                }
                            }
                        };
                    }
                }
            }).expectCalls();
            
            createButtonHTML({ wallet });
            await mockSetupButton({
                merchantID:         [ uniqueID() ],
                wallet,
                paymentMethodNonce: '46747474',
                branded:            true
            });

            await clickButton(FUNDING.CARD);
            gqlMock.done();
        });
    });

    // eslint-disable-next-line no-empty-function
    it('something else', async () => {});
});
