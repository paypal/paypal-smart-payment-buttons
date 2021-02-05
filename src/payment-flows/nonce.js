/* @flow */

import { FUNDING } from '@paypal/sdk-constants/src/funding';

import { payWithNonce } from '../api';
import { getLogger, promiseNoop } from '../lib';

import type { PaymentFlow, PaymentFlowInstance } from './types';

function setupNonce() {
// pass
}

function isNonceEligible({ props, serviceData }) : boolean {
    const { paymentMethodNonce } = props;
    // eslint-disable-next-line no-console
    console.log('nonce eligibility check', paymentMethodNonce);

    const { wallet } = serviceData;

    // eslint-disable-next-line no-console
    console.log('wallet', wallet);

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

    if (fundingSource !== FUNDING.CARD) {
        return false;
    }
    // $FlowFixMe
    if (!branded && !instrument.branded) {
        return false;
    }

    if (!tokenID) {
        return false;
    }

    return true;
}

function startPaymentWithNonce(orderID, paymentMethodNonce, clientID, branded) : void {
    getLogger().info('nonce_payment_initiated');

    payWithNonce({ orderID, paymentMethodNonce, clientID, branded })
        .catch(error => {
            getLogger().info('nonce_payment_failed');
            // $FlowFixMe
            error.code = 'PAY_WITH_DIFFERENT_CARD';
            throw error;
        });
}

function initNonce({ props, payment, serviceData }) : PaymentFlowInstance {
    const { createOrder, clientID, branded } = props;
    const { wallet } = serviceData;
    const { paymentMethodID } = payment;

    // $FlowFixMe
    const instrument  = wallet.card.instruments.find(({ tokenID })  => (tokenID === paymentMethodID));
    // $FlowFixMe
    const paymentMethodNonce = instrument.tokenID;

    const start = () => {
        // $FlowFixMe
        getLogger().info(`start_payment_with_nonce ${ paymentMethodNonce }`);
        return createOrder().then(orderID => {
            getLogger().info(`orderID_in_nonce ${ orderID }`);
            return startPaymentWithNonce(orderID, paymentMethodNonce, clientID, branded);
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
