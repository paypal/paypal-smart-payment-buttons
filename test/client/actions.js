/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING, INTENT } from '@paypal/sdk-constants/src';

import { setupButton } from '../../src';

import {
    createButtonHTML,
    getGetOrderApiMock,
    getCaptureOrderApiMock,
    getAuthorizeOrderApiMock,
    getPatchOrderApiMock,
    DEFAULT_FUNDING_ELIGIBILITY,
    mockFunction,
    clickButton,
    getCreateOrderApiMock,
    getCreateSubscriptionIdApiMock,
    getSubscriptionIdToCartIdApiMock,
    getGetSubscriptionApiMock,
    getActivateSubscriptionIdApiMock,
    getReviseSubscriptionIdApiMock,
    getGraphQLApiMock
} from './mocks';

describe('actions cases', () => {

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with actions.order.create', async () => {
        return await wrapPromise(async ({ expect }) => {

            let orderID;
            const payerID = 'YYYYYYYYYY';

            window.xprops.createOrder = expect('createOrder', async (data, actions) => {
                const createOrderMock = getCreateOrderApiMock();
                createOrderMock.expectCalls();
                orderID = await actions.order.create({
                    purchase_units: [ {
                        amount: {
                            value: '0.01'
                        }
                    } ]
                });
                createOrderMock.done();

                if (!orderID) {
                    throw new Error(`Expected orderID to be returned by actions.order.create`);
                }

                return orderID;
            });

            window.xprops.onApprove = expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
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

            createButtonHTML();

            await setupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with actions.order.get', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = 'XXXXXXXXXX';
            const payerID = 'YYYYYYYYYY';

            window.xprops.createOrder = expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            });

            window.xprops.onApprove = expect('onApprove', async (data, actions) => {
                const getOrderMock = getGetOrderApiMock();
                getOrderMock.expectCalls();
                await actions.order.get();
                getOrderMock.done();

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
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

            createButtonHTML();

            await setupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with actions.order.capture', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = 'XXXXXXXXXX';
            const payerID = 'YYYYYYYYYY';

            window.xprops.createOrder = expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            });

            window.xprops.onApprove = expect('onApprove', async (data, actions) => {
                const captureOrderMock = getCaptureOrderApiMock();
                captureOrderMock.expectCalls();
                await actions.order.capture();
                captureOrderMock.done();

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
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

            createButtonHTML();

            await setupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with actions.order.authorize', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = 'XXXXXXXXXX';
            const payerID = 'YYYYYYYYYY';

            window.xprops.intent = INTENT.AUTHORIZE;

            const gqlMock = getGraphQLApiMock({
                data: {
                    data: {
                        checkoutSession: {
                            cart: {
                                intent:  INTENT.AUTHORIZE,
                                amounts: {
                                    total: {
                                        currencyCode: 'USD'
                                    }
                                }
                            }
                        }
                    }
                }
            }).expectCalls();

            window.xprops.createOrder = expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            });

            window.xprops.onApprove = expect('onApprove', async (data, actions) => {
                const authorizeOrderMock = getAuthorizeOrderApiMock();
                authorizeOrderMock.expectCalls();
                await actions.order.authorize();
                authorizeOrderMock.done();

                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
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

            createButtonHTML();

            await setupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);

            gqlMock.done();
        });
    });

    it('should render a button, click the button, and render checkout, then pass onShippingChange callback to the parent with actions.order.patch', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = 'XXXXXXXXXX';
            const payerID = 'YYYYYYYYYY';

            window.xprops.createOrder = expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            });

            window.xprops.onShippingChange = expect('onShippingChange', async (data, actions) => {
                const patchOrderMock = getPatchOrderApiMock();
                patchOrderMock.expectCalls();
                await actions.order.patch();
                patchOrderMock.done();
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

                        return props.onShippingChange({ orderID }, { reject: avoid('reject') }).then(() => {
                            return renderToOriginal(...args);
                        });
                    });
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await setupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a button, click the button, and render checkout, then pass onApprove callback to the parent with actions.order.patch', async () => {
        return await wrapPromise(async ({ expect }) => {

            const orderID = 'XXXXXXXXXX';

            window.xprops.createOrder = expect('createOrder', async () => {
                return ZalgoPromise.try(() => {
                    return orderID;
                });
            });

            window.xprops.onApprove = expect('onApprove', async (data, actions) => {
                const patchOrderMock = getPatchOrderApiMock();
                patchOrderMock.expectCalls();
                await actions.order.patch();
                patchOrderMock.done();
            });

            createButtonHTML();

            await setupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(FUNDING.PAYPAL);
        });
    });

    it('should render a subscription button, click the button, and render checkout, then pass onApprove callback to the parent with actions.subscription.create', async () => {
        return await wrapPromise(async ({ expect }) => {
            const mockSubscriptionID = 'I-CREATESUBSCRIPTIONID';
            const mockCartID = 'CARTIDCREATESUBSFLOW';
            let subscriptionID;
            const payerID = 'YYYYYYYYYY';

            window.xprops.vault = true;
            delete window.xprops.createOrder;
            window.xprops.createSubscription = expect('createSubscription', async (data, actions) => {
                const createSubscriptionIdApiMock = getCreateSubscriptionIdApiMock({}, mockSubscriptionID);
                createSubscriptionIdApiMock.expectCalls();
                subscriptionID = await actions.subscription.create({
                    plan_id: 'P-XXXXXX'
                });
                createSubscriptionIdApiMock.done();
                if (!subscriptionID) {
                    throw new Error(`Expected subscriptionID to be returned by actions.subscription.create`);
                }

                return subscriptionID;
            });

            window.xprops.onApprove = expect('onApprove', async (data, actions) => {

                if (data.subscriptionID !== subscriptionID) {
                    throw new Error(`Expected subscriptionID to be ${ subscriptionID }, got ${ data.subscriptionID }`);
                }

                const getSubscriptionApiMock = getGetSubscriptionApiMock({}, mockSubscriptionID);
                getSubscriptionApiMock.expectCalls();
                const response = await actions.subscription.get();
                if (response.id !== subscriptionID) {
                    throw new Error(`Expected subscriptionID to be ${ subscriptionID }, got ${ response.id } in Get Subscriptions response`);
                }
                getSubscriptionApiMock.done();
                const activateSubscriptionIdApiMock = getActivateSubscriptionIdApiMock({}, mockSubscriptionID);
                activateSubscriptionIdApiMock.expectCalls();
                const activateResponse = await actions.subscription.activate();
                if (JSON.stringify(activateResponse) !== '{}') {
                    throw new Error(`Expected activate response to be 204 NO CONTENT , got ${ JSON.stringify(activateResponse) } in Activate Subscriptions`);
                }
                activateSubscriptionIdApiMock.done();
            });

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID, subscriptionID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    const id = await props.createOrder();
                    
                    if (id !== mockCartID) {
                        throw new Error(`Expected orderID to be ${ subscriptionID }, got ${ id }`);
                    }
                    return renderToOriginal(...args);
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await setupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            const subscriptionIdToCartIdApiMock = getSubscriptionIdToCartIdApiMock({}, mockSubscriptionID, mockCartID);
            subscriptionIdToCartIdApiMock.expectCalls();

            await clickButton(FUNDING.PAYPAL);

            subscriptionIdToCartIdApiMock.done();
        });
    });

    it('should render a revise subscription button, click the button, and render checkout, then pass onApprove callback to the parent with actions.subscription.revise', async () => {
        return await wrapPromise(async ({ expect }) => {
            const mockSubscriptionID = 'I-REVISESUBSCRIPTIONID';
            const mockCartID = 'CARTIDCREATESUBSFLOW';
            let subscriptionID;
            const payerID = 'YYYYYYYYYY';

            window.xprops.vault = true;
            delete window.xprops.createOrder;
            window.xprops.createSubscription = expect('createSubscription', async (data, actions) => {
                const reviseSubscriptionIdApiMock = getReviseSubscriptionIdApiMock({}, mockSubscriptionID);
                reviseSubscriptionIdApiMock.expectCalls();
                subscriptionID = await actions.subscription.revise(mockSubscriptionID, {
                    plan_id: 'P-NEW_PLAN_XXXXXX'
                });
                reviseSubscriptionIdApiMock.done();
                if (!subscriptionID) {
                    throw new Error(`Expected subscriptionID to be returned by actions.subscription.revise`);
                }

                return subscriptionID;
            });

            window.xprops.onApprove = expect('onApprove', async (data, actions) => {

                if (data.subscriptionID !== subscriptionID) {
                    throw new Error(`Expected subscriptionID to be ${ subscriptionID }, got ${ data.subscriptionID }`);
                }

                const getSubscriptionApiMock = getGetSubscriptionApiMock({}, mockSubscriptionID);
                getSubscriptionApiMock.expectCalls();
                const response = await actions.subscription.get();
                if (response.id !== subscriptionID) {
                    throw new Error(`Expected subscriptionID to be ${ subscriptionID }, got ${ response.id } in Get Subscriptions response`);
                }
                getSubscriptionApiMock.done();
            });

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ original: CheckoutOriginal, args: [ props ] }) => {

                mockFunction(props, 'onApprove', expect('onApprove', ({ original: onApproveOriginal, args: [ data, actions ] }) => {
                    return onApproveOriginal({ ...data, payerID, subscriptionID }, actions);
                }));

                const checkoutInstance = CheckoutOriginal(props);

                mockFunction(checkoutInstance, 'renderTo', expect('renderTo', async ({ original: renderToOriginal, args }) => {
                    const id = await props.createOrder();
                    
                    if (id !== mockCartID) {
                        throw new Error(`Expected orderID to be ${ subscriptionID }, got ${ id }`);
                    }
                    return renderToOriginal(...args);
                }));

                return checkoutInstance;
            }));

            createButtonHTML();

            await setupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            const subscriptionIdToCartIdApiMock = getSubscriptionIdToCartIdApiMock({}, mockSubscriptionID, mockCartID);
            subscriptionIdToCartIdApiMock.expectCalls();

            await clickButton(FUNDING.PAYPAL);

            subscriptionIdToCartIdApiMock.done();
        });
    });

});
