/* @flow */
import { uniqueID, wrapPromise } from 'belter/src';
import { CARD, FUNDING, INTENT, WALLET_INSTRUMENT } from '@paypal/sdk-constants/src';

import {
    clickButton,
    createButtonHTML, DEFAULT_FUNDING_ELIGIBILITY,
    generateOrderID, getGraphQLApiMock,
    mockAsyncProp, mockFunction,
    mockSetupButton
} from './mocks';

describe.only('nonce cases', () => {
    it('should pay with a nonce', async () => {
        return await wrapPromise(async ({ expect }) => {
            const orderID = generateOrderID();
            const payerID = uniqueID();
            const nonce = 'nonce';
            window.xprops.paymentMethodNonce = nonce;
            window.xprops.branded = true;


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

            const userIDToken = uniqueID();
            const accessToken = uniqueID();
            const instrumentID = uniqueID();
            const tokenID = uniqueID();
            const paymentMethodID = tokenID;
            const wallet = {
                [FUNDING.CARD]: {
                    instruments: [
                        {
                            type:         WALLET_INSTRUMENT.CARD,
                            instrumentID: [ uniqueID() ],
                            tokenID,
                            branded:      true
                        }
                    ]
                }
            };

            const gqlMock = getGraphQLApiMock({
                extraHandler: ({ headers, data }) => {
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

                    if (data.query.includes('mutation approvePaymentWithNonce')) {
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
            });

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    return props.createOrder().then(id => {
                        if (id !== orderID) {
                            throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                        }

                        return renderToOriginal(...args);
                    });
                }));

                return checkoutInstance;
            }));

            const fundingEligibility = {
                [ FUNDING.PAYPAL ]: {
                    eligible: true
                },
                [ FUNDING.CARD]: {
                    eligible: true,
                    vendors:  {
                        [ CARD.VISA ]: {
                            eligible:           true
                        }
                    }
                }
            };

            createButtonHTML({ fundingEligibility });

            await mockSetupButton({
                merchantID:         [ uniqueID() ],
                wallet,
                fundingEligibility,
                paymentMethodNonce: nonce,
                paymentMethodID
            });

            await clickButton(FUNDING.CARD);
            gqlMock.done();
        });
    });

    // eslint-disable-next-line no-empty-function
    it('something else', async () => {});
});