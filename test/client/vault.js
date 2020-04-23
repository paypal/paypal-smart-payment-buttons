/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise } from 'belter/src';
import { FUNDING, INTENT } from '@paypal/sdk-constants/src';

import { mockSetupButton, mockAsyncProp, createButtonHTML, getValidatePaymentMethodApiMock, clickButton, getGraphQLApiMock, generateOrderID, mockMenu, clickMenu } from './mocks';

describe('vault cases', () => {

    it('should set up a new forced-vaulted funding source', async () => {
        return await wrapPromise(async ({ expect }) => {

            window.xprops.vault = true;
            window.xprops.clientAccessToken = 'abc-123';

            const orderID = generateOrderID();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            let enableVaultCalled = false;

            const gqlMock = getGraphQLApiMock({
                handler: expect('graphqlCall', ({ data }) => {
                    if (!data.query.includes('mutation EnableVault')) {
                        return {};
                    }

                    enableVaultCalled = true;
                    return {};
                })
            }).expectCalls();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async () => {
                gqlMock.done();

                if (!enableVaultCalled) {
                    throw new Error(`Expected graphql call with enableVault mutation`);
                }
            }));

            const fundingEligibility = {
                [FUNDING.PAYPAL]: {
                    eligible:  true,
                    vaultable: true
                }
            };

            createButtonHTML({ fundingEligibility });
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should set up a new forced-vaulted funding source, and fail because paypal is not vaulable', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            window.xprops.vault = true;
            window.xprops.clientAccessToken = 'abc-123';

            const orderID = generateOrderID();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            window.xprops.onApprove = avoid('onApprove');

            const fundingEligibility = {
                [FUNDING.PAYPAL]: {
                    eligible:  true,
                    vaultable: false
                }
            };

            createButtonHTML({ fundingEligibility });
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(FUNDING.PAYPAL).catch(expect('clickCatch'));
        });
    });

    it('should set up a new optionally-vaulted funding source', async () => {
        return await wrapPromise(async ({ expect }) => {

            window.xprops.clientAccessToken = 'abc-123';

            const orderID = generateOrderID();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            let enableVaultCalled = false;

            const gqlMock = getGraphQLApiMock({
                handler: expect('graphqlCall', ({ data }) => {
                    if (!data.query.includes('mutation EnableVault')) {
                        return {};
                    }

                    enableVaultCalled = true;
                    return {};
                })
            }).expectCalls();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async () => {
                gqlMock.done();

                if (!enableVaultCalled) {
                    throw new Error(`Expected graphql call with enableVault mutation`);
                }
            }));

            const fundingEligibility = {
                [FUNDING.PAYPAL]: {
                    eligible:  true,
                    vaultable: true
                }
            };

            createButtonHTML({ fundingEligibility });
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should not set up a new optionally-vaulted funding source when vaulting is not eligible', async () => {
        return await wrapPromise(async ({ expect }) => {

            window.xprops.clientAccessToken = 'abc-123';

            const orderID = generateOrderID();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            let enableVaultCalled = false;

            const gqlMock = getGraphQLApiMock({
                handler: ({ data }) => {
                    if (!data.query.includes('mutation EnableVault')) {
                        return {};
                    }

                    enableVaultCalled = true;
                    return {};
                }
            }).enable();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async () => {
                gqlMock.disable();

                if (enableVaultCalled) {
                    throw new Error(`Expected graphql to not be called with enableVault mutation`);
                }
            }));

            const fundingEligibility = {
                [FUNDING.PAYPAL]: {
                    eligible:  true,
                    vaultable: false
                }
            };

            createButtonHTML({ fundingEligibility });
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should continue with a one time payment for a new optionally-vaulted funding source when enableVault errors out', async () => {
        return await wrapPromise(async ({ expect }) => {

            window.xprops.clientAccessToken = 'abc-123';

            const orderID = generateOrderID();

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            let enableVaultCalled = false;

            const gqlMock = getGraphQLApiMock({
                handler: expect('graphqlCall', ({ data }) => {
                    if (!data.query.includes('mutation EnableVault')) {
                        return {};
                    }

                    enableVaultCalled = true;
                    return {
                        errors: [
                            {
                                message: 'enableVault intentionally failed'
                            }
                        ]
                    };
                })
            }).expectCalls();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async () => {
                gqlMock.done();

                if (!enableVaultCalled) {
                    throw new Error(`Expected graphql call with enableVault mutation`);
                }
            }));

            const fundingEligibility = {
                [FUNDING.PAYPAL]: {
                    eligible:  true,
                    vaultable: true
                }
            };

            createButtonHTML({ fundingEligibility });
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should pay with an existing vaulted paypal account with no shipping required', async () => {
        return await wrapPromise(async ({ expect }) => {

            window.xprops.clientAccessToken = 'abc-123';

            const gqlMock = getGraphQLApiMock({
                data: {
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
                                isShippingAddressRequired: false
                            }
                        }
                    }
                }
            }).expectCalls();

            window.paypal.Menu = expect('Menu', mockMenu);

            const orderID = generateOrderID();
            const paymentMethodID = 'xyz123';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            const vpmCall = getValidatePaymentMethodApiMock().expectCalls();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                vpmCall.done();
            }));

            const fundingEligibility = {
                [ FUNDING.PAYPAL ]: {
                    eligible:           true,
                    vaultedInstruments: [
                        {
                            id:    paymentMethodID,
                            label: {
                                description: 'foo@bar.com'
                            }
                        }
                    ]
                }
            };

            createButtonHTML({ fundingEligibility });
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(FUNDING.PAYPAL);
            gqlMock.done();
        });
    });

    it('should pay with an existing vaulted card with no shipping required', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            window.xprops.clientAccessToken = 'abc-123';

            const gqlMock = getGraphQLApiMock({
                data: {
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
                                isShippingAddressRequired: false
                            }
                        }
                    }
                }
            }).expectCalls();

            const orderID = generateOrderID();
            const paymentMethodID = 'xyz123';

            window.paypal.Menu = expect('Menu', mockMenu);

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            const vpmCall = getValidatePaymentMethodApiMock().expectCalls();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                vpmCall.done();
            }));

            const fundingEligibility = {
                [ FUNDING.PAYPAL ]: {
                    eligible: true
                },
                [ FUNDING.CARD ]: {
                    eligible: true,
                    vendors:  {
                        visa: {
                            eligible:           true,
                            vaultedInstruments: [
                                {
                                    id:    paymentMethodID,
                                    label: {
                                        description: 'Visa x-1234'
                                    }
                                }
                            ]
                        }
                    }
                }
            };

            window.paypal.Checkout = avoid('Checkout', window.paypal.Checkout);

            createButtonHTML({ fundingEligibility });
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(FUNDING.CARD);
            gqlMock.done();
        });
    });

    it('should pay with an existing vaulted paypal account with shipping required but address passed', async () => {
        return await wrapPromise(async ({ expect }) => {

            window.xprops.clientAccessToken = 'abc-123';

            const gqlMock = getGraphQLApiMock({
                data: {
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
                                    isFullAddress: true
                                }
                            },
                            flags: {
                                isShippingAddressRequired: true
                            }
                        }
                    }
                }
            }).expectCalls();

            const orderID = generateOrderID();
            const paymentMethodID = 'xyz123';

            window.paypal.Menu = expect('Menu', mockMenu);

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            const vpmCall = getValidatePaymentMethodApiMock().expectCalls();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                vpmCall.done();
            }));

            const fundingEligibility = {
                [FUNDING.PAYPAL]: {
                    eligible:           true,
                    vaultedInstruments: [
                        {
                            id:    paymentMethodID,
                            label: {
                                description: 'foo@bar.com'
                            }
                        }
                    ]
                }
            };

            createButtonHTML({ fundingEligibility });
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(FUNDING.PAYPAL);
            gqlMock.done();
        });
    });

    it('should pay with an existing vaulted card with shipping required but address passed', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            window.xprops.clientAccessToken = 'abc-123';

            const gqlMock = getGraphQLApiMock({
                data: {
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
                                    isFullAddress: true
                                }
                            },
                            flags: {
                                isShippingAddressRequired: true
                            }
                        }
                    }
                }
            }).expectCalls();

            window.paypal.Menu = expect('Menu', mockMenu);

            const orderID = generateOrderID();
            const paymentMethodID = 'xyz123';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            const vpmCall = getValidatePaymentMethodApiMock().expectCalls();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                vpmCall.done();
            }));

            const fundingEligibility = {
                [FUNDING.PAYPAL]: {
                    eligible: true
                },
                [FUNDING.CARD]: {
                    eligible: true,
                    vendors:  {
                        visa: {
                            eligible:           true,
                            vaultedInstruments: [
                                {
                                    id:    paymentMethodID,
                                    label: {
                                        description: 'Visa x-1234'
                                    }
                                }
                            ]
                        }
                    }
                }
            };

            window.paypal.Checkout = avoid('Checkout', window.paypal.Checkout);

            createButtonHTML({ fundingEligibility });
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(FUNDING.CARD);
            gqlMock.done();
        });
    });

    it('should pay with an existing vaulted paypal account with shipping required and fall back to checkout', async () => {
        return await wrapPromise(async ({ expect }) => {

            window.xprops.clientAccessToken = 'abc-123';
            
            const gqlMock = getGraphQLApiMock({
                data: {
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
                                isShippingAddressRequired: true
                            }
                        }
                    }
                }
            }).expectCalls();

            window.paypal.Menu = expect('Menu', mockMenu);

            const orderID = generateOrderID();
            const paymentMethodID = 'xyz123';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            const vpmCall = getValidatePaymentMethodApiMock().expectCalls();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                vpmCall.done();
            }));

            const fundingEligibility = {
                [FUNDING.PAYPAL]: {
                    eligible:           true,
                    vaultedInstruments: [
                        {
                            id:    paymentMethodID,
                            label: {
                                description: 'foo@bar.com'
                            }
                        }
                    ]
                }
            };

            window.paypal.Checkout = expect('Checkout', window.paypal.Checkout);

            createButtonHTML({ fundingEligibility });
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(FUNDING.PAYPAL);
            gqlMock.done();
        });
    });

    it('should pay with an existing vaulted card with shipping required and error out', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            window.xprops.clientAccessToken = 'abc-123';

            const gqlMock = getGraphQLApiMock({
                data: {
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
                                isShippingAddressRequired: true
                            }
                        }
                    }
                }
            }).expectCalls();

            const orderID = generateOrderID();
            const paymentMethodID = 'xyz123';

            window.paypal.Menu = expect('Menu', mockMenu);

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            const vpmCall = getValidatePaymentMethodApiMock().expectCalls();

            window.xprops.onApprove = mockAsyncProp(avoid('onApprove'));

            const fundingEligibility = {
                [FUNDING.PAYPAL]: {
                    eligible: true
                },
                [FUNDING.CARD]: {
                    eligible: true,
                    vendors:  {
                        visa: {
                            eligible:           true,
                            vaultedInstruments: [
                                {
                                    id:    paymentMethodID,
                                    label: {
                                        description: 'Visa x-1234'
                                    }
                                }
                            ]
                        }
                    }
                }
            };

            window.paypal.Checkout = avoid('Checkout', window.paypal.Checkout);

            createButtonHTML({ fundingEligibility });
            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(FUNDING.CARD).catch(expect('clickButtonCatch'));

            gqlMock.done();
            vpmCall.done();
        });
    });

    it('should pay with an existing vaulted paypal account but change FI using the menu', async () => {
        return await wrapPromise(async ({ expect }) => {

            window.xprops.clientAccessToken = 'abc-123';

            const orderID = generateOrderID();
            const paymentMethodID = 'xyz123';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            const vpmCall = getValidatePaymentMethodApiMock().expectCalls();

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                vpmCall.done();
            }));

            const fundingEligibility = {
                [FUNDING.PAYPAL]: {
                    eligible:           true,
                    vaultedInstruments: [
                        {
                            id:    paymentMethodID,
                            label: {
                                description: 'foo@bar.com'
                            }
                        }
                    ]
                }
            };

            const win = {};
            
            const Checkout = window.paypal.Checkout;
            window.paypal.Checkout = expect('Checkout', (props) => {
                if (!props.window) {
                    throw new Error(`Expected window to be passed`);
                }

                if (props.window !== win) {
                    throw new Error(`Expected correct window to be passed`);
                }

                return Checkout(props);
            });

            const content = {
                chooseCardOrShipping: 'Choose card or shipping'
            };

            window.paypal.Menu = expect('Menu', (initialMenuProps) => {
                if (!initialMenuProps.clientID) {
                    throw new Error(`Expected initial menu props to contain clientID`);
                }

                return {
                    renderTo: expect('menuRender', async (element) => {
                        if (!element) {
                            throw new Error(`Expected element to be passed`);
                        }
                    }),
                    updateProps: expect('menuUpdateProps', async (menuProps) => {
                        if (typeof menuProps.verticalOffset !== 'number') {
                            throw new TypeError(`Expected vertical offset to be passed`);
                        }

                        if (!Array.isArray(menuProps.choices)) {
                            throw new TypeError(`Expected choices array to be passed`);
                        }

                        const choice = menuProps.choices.find(({ label }) => label === content.chooseCardOrShipping);

                        if (!choice) {
                            throw new Error(`Expected to find choose card or shipping button`);
                        }

                        if (!choice.popup || !choice.popup.width || !choice.popup.height) {
                            throw new Error(`Expected popup option to be passed`);
                        }

                        choice.onSelect({ win });
                    }),
                    hide: expect('hide', mockAsyncProp()),
                    show: expect('show', mockAsyncProp())
                };
            });

            createButtonHTML({ fundingEligibility });
            await mockSetupButton({ content, merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickMenu(FUNDING.PAYPAL);
        });
    });

    it('should pay with an existing vaulted paypal account but pay with a different account using the menu', async () => {
        return await wrapPromise(async ({ expect }) => {

            window.xprops.clientAccessToken = 'abc-123';

            const orderID = generateOrderID();
            const paymentMethodID = 'xyz123';

            window.xprops.createOrder = mockAsyncProp(expect('createOrder', async () => {
                return orderID;
            }));

            window.xprops.onApprove = mockAsyncProp(expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }
            }));

            const fundingEligibility = {
                [FUNDING.PAYPAL]: {
                    eligible:           true,
                    vaultedInstruments: [
                        {
                            id:    paymentMethodID,
                            label: {
                                description: 'foo@bar.com'
                            }
                        }
                    ]
                }
            };

            const win = {};

            const Checkout = window.paypal.Checkout;
            window.paypal.Checkout = expect('Checkout', (props) => {
                if (!props.window) {
                    throw new Error(`Expected window to be passed`);
                }

                if (props.window !== win) {
                    throw new Error(`Expected correct window to be passed`);
                }

                return Checkout(props);
            });

            const content = {
                useDifferentAccount: 'Use different account'
            };

            window.paypal.Menu = expect('Menu', (initialMenuProps) => {
                if (!initialMenuProps.clientID) {
                    throw new Error(`Expected initial menu props to contain clientID`);
                }

                return {
                    renderTo: expect('menuRender', async (element) => {
                        if (!element) {
                            throw new Error(`Expected element to be passed`);
                        }
                    }),
                    updateProps: expect('menuUpdateProps', async (menuProps) => {
                        if (typeof menuProps.verticalOffset !== 'number') {
                            throw new TypeError(`Expected vertical offset to be passed`);
                        }

                        if (!Array.isArray(menuProps.choices)) {
                            throw new TypeError(`Expected choices array to be passed`);
                        }

                        const choice = menuProps.choices.find(({ label }) => label === content.useDifferentAccount);

                        if (!choice) {
                            throw new Error(`Expected to find choose card or shipping button`);
                        }

                        if (!choice.popup || !choice.popup.width || !choice.popup.height) {
                            throw new Error(`Expected popup option to be passed`);
                        }

                        choice.onSelect({ win });
                    }),
                    hide: expect('hide', mockAsyncProp()),
                    show: expect('show', mockAsyncProp())
                };
            });

            createButtonHTML({ fundingEligibility });
            await mockSetupButton({ content, merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickMenu(FUNDING.PAYPAL);
        });
    });

    it('should pay with an existing vaulted card but delete using the menu', async () => {
        return await wrapPromise(async ({ expect }) => {

            window.xprops.clientAccessToken = 'abc-123';
            const paymentMethodID = 'xyz123';

            let deleteVaultCalled;

            const gqlMock = getGraphQLApiMock({
                extraHandler: ({ data }) => {
                    if (data.query.includes('mutation DeleteVault')) {
                        if (data.variables.paymentMethodID !== paymentMethodID) {
                            throw new Error(`Incorrect payment method id passed to deleteVault`);
                        }
                        deleteVaultCalled = true;
                    }
                }
            }).expectCalls();

            const fundingEligibility = {
                [FUNDING.PAYPAL]: {
                    eligible: true
                },
                [FUNDING.CARD]: {
                    eligible: true,
                    vendors:  {
                        visa: {
                            eligible:           true,
                            vaultedInstruments: [
                                {
                                    id:    paymentMethodID,
                                    label: {
                                        description: 'Visa x-1234'
                                    }
                                }
                            ]
                        }
                    }
                }
            };

            const content = {
                deleteVaultedCard: 'Unlink card'
            };

            window.paypal.Menu = expect('Menu', (initialMenuProps) => {
                if (!initialMenuProps.clientID) {
                    throw new Error(`Expected initial menu props to contain clientID`);
                }

                return {
                    renderTo: expect('menuRender', async (element) => {
                        if (!element) {
                            throw new Error(`Expected element to be passed`);
                        }
                    }),
                    updateProps: expect('menuUpdateProps', async (menuProps) => {
                        if (typeof menuProps.verticalOffset !== 'number') {
                            throw new TypeError(`Expected vertical offset to be passed`);
                        }

                        if (!Array.isArray(menuProps.choices)) {
                            throw new TypeError(`Expected choices array to be passed`);
                        }

                        const choice = menuProps.choices.find(({ label }) => label === content.deleteVaultedCard);

                        if (!choice) {
                            throw new Error(`Expected to find choose card or shipping button`);
                        }

                        choice.onSelect();
                    }),
                    hide: expect('hide', mockAsyncProp()),
                    show: expect('show', mockAsyncProp())
                };
            });

            createButtonHTML({ fundingEligibility });
            await mockSetupButton({ content, merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickMenu(FUNDING.CARD);

            gqlMock.done();

            if (!deleteVaultCalled) {
                throw new Error(`Expected delete vault to be called`);
            }
        });
    });
});
