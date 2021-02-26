/* @flow */

import { FUNDING } from '@paypal/sdk-constants/src/funding';

import { payWithNonce } from '../api';
import { getLogger, promiseNoop } from '../lib';

import type { PaymentFlow, PaymentFlowInstance } from './types';
import { checkout } from './checkout';

function setupNonce() {
// pass
}

function isNonceEligible({ props, serviceData }) : boolean {
    const { paymentMethodNonce } = props;
    const { wallet } = serviceData;

    if (!paymentMethodNonce) {
        return false;
    }

    if (!wallet) {
        return false;
    }

    // Ensure wallet instruments are branded and have a valid tokenID.
    if (wallet.card.instruments.length === 0 ||
        !wallet.card.instruments.some(instrument => (instrument.tokenID && instrument.branded))) {
        return false;
    }

    return true;
}

function isNoncePaymentEligible({ props, payment, serviceData }) : boolean {

    const { branded } = props;
    const { wallet } = serviceData;

    const { fundingSource, paymentMethodID } = payment;

    // $FlowFixMe
    const instrument  = wallet.card.instruments.find(({ tokenID })  => (tokenID === paymentMethodID));
    // $FlowFixMe
    const { tokenID } = instrument;

    if (!instrument) {
        return false;
    }

    if (fundingSource !== FUNDING.CARD) {
        return false;
    }
    // $FlowFixMe
    if (!branded || !instrument.branded) {
        return false;
    }

    if (!tokenID) {
        return false;
    }

    return true;
}

function startPaymentWithNonce({ orderID, paymentMethodNonce, clientID, branded }) : void {
    getLogger().info('nonce_payment_initiated');

    // $FlowFixMe
    return payWithNonce({ orderID, paymentMethodNonce, clientID, branded })
        .catch(error => {
            getLogger().info('nonce_payment_failed');
            // $FlowFixMe
            error.code = 'PAY_WITH_DIFFERENT_CARD';
            throw error;
        });
}

function initNonce({ props, components, payment, serviceData, config }) : PaymentFlowInstance {
    const { createOrder, onApprove, clientID, branded } = props;
    const { wallet } = serviceData;
    const { paymentMethodID } = payment;

    // $FlowFixMe
    const instrument  = wallet.card.instruments.find(({ tokenID })  => (tokenID === paymentMethodID));
    // $FlowFixMe
    const paymentMethodNonce = instrument.tokenID;

    const fallbackToWebCheckout = () => {
        getLogger().info('web_checkout_fallback').flush();
        return checkout.init({
            props, components, serviceData, payment, config
        });
    };

    const restart = () => {
        return fallbackToWebCheckout().start();
    };

    const start = () => {
        return createOrder().then(orderID => {
            getLogger().info(`orderID_in_nonce ${ orderID }`);
            // $FlowFixMe
            return startPaymentWithNonce({ orderID, paymentMethodNonce, clientID, branded }).then(({ payerID }) => {
                return onApprove({ payerID }, { restart });
            });
        });
    };

    return {
        start,
        close: promiseNoop
    };
}


export const nonce : PaymentFlow = {
    name:              'nonce',
    setup:             setupNonce,
    isEligible:        isNonceEligible,
    isPaymentEligible: isNoncePaymentEligible,
    init:              initNonce,
    inline:            true
};
