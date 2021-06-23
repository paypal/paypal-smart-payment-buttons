/* @flow */

import type { CrossDomainWindowType } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import type { ThreeDomainSecureFlowType } from '../types';
import { validatePaymentMethod, type ValidatePaymentMethodResponse, createAccessToken } from '../api';
import type { CreateOrder, Props, Components } from '../button/props';
import { TARGET_ELEMENT } from '../constants';

import type { PaymentFlow, PaymentFlowInstance, Payment } from './types';

function setupVaultCapture() {
    // pass
}

function isVaultCaptureEligible({ props, payment } : { props : Props, payment : Payment }) : boolean {
    const { win, paymentMethodID } = payment;
    const { onShippingChange } = props;

    if (win) {
        return false;
    }
    
    if (!paymentMethodID) {
        return false;
    }

    if (onShippingChange) {
        return false;
    }

    return true;
}

type ThreeDomainSecureProps = {|
    ThreeDomainSecure : ThreeDomainSecureFlowType,
    createOrder : CreateOrder,
    getParent : () => CrossDomainWindowType
|};

function handleThreeDomainSecure({ ThreeDomainSecure, createOrder, getParent } : ThreeDomainSecureProps) : ZalgoPromise<void> {
    
    const promise = new ZalgoPromise();
    const instance = ThreeDomainSecure({
        createOrder,
        onSuccess: () => promise.resolve(),
        onCancel:  () => promise.reject(new Error(`3DS cancelled`)),
        onError:   (err) => promise.reject(err)
    });

    return instance.renderTo(getParent(), TARGET_ELEMENT.BODY)
        .then(() => promise)
        .finally(instance.close);
}

type HandleValidateResponse = {|
    ThreeDomainSecure : ThreeDomainSecureFlowType,
    status : number,
    body : ValidatePaymentMethodResponse,
    createOrder : CreateOrder,
    getParent : () => CrossDomainWindowType
|};

function handleValidateResponse({ ThreeDomainSecure, status, body, createOrder, getParent } : HandleValidateResponse) : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {
        if (status === 422 && body.links && body.links.some(link => link.rel === '3ds-contingency-resolution')) {
            return handleThreeDomainSecure({ ThreeDomainSecure, createOrder, getParent });
        }

        if (status !== 200) {
            throw new Error(`Validate payment failed with status: ${ status }`);
        }
    });
}

function initVaultCapture({ props, components, payment } : { props : Props, components : Components, payment : Payment }) : PaymentFlowInstance {
    const { clientID, createOrder, onApprove, clientAccessToken,
        enableThreeDomainSecure, buttonSessionID, partnerAttributionID, getParent } = props;
    const { ThreeDomainSecure } = components;
    const { paymentMethodID } = payment;

    if (!paymentMethodID) {
        throw new Error(`Payment method id required for vault capture`);
    }

    if (!clientAccessToken) {
        throw new Error(`Client access token required for vault capture`);
    }

    const restart = () => {
        return ZalgoPromise.try(() => {
            throw new Error(`Vault capture restart not implemented`);
        });
    };

    const start = () => {
        const facilitatorAccessTokenPromise = createAccessToken(clientID);

        return ZalgoPromise.try(() => {
            return createOrder();
        }).then((orderID) => {
            return validatePaymentMethod({ clientAccessToken, orderID, paymentMethodID, enableThreeDomainSecure, buttonSessionID, partnerAttributionID });
        }).then(({ status, body }) => {
            return handleValidateResponse({ ThreeDomainSecure, status, body, createOrder, getParent });
        }).then(() => {
            return facilitatorAccessTokenPromise.then(facilitatorAccessToken => {
                return onApprove({ facilitatorAccessToken }, { restart });
            });
        });
    };

    return {
        start,
        close:        () => ZalgoPromise.resolve(),
        triggerError: err => {
            throw err;
        }
    };
}

export const vaultCapture : PaymentFlow = {
    setup:      setupVaultCapture,
    isEligible: isVaultCaptureEligible,
    init:       initVaultCapture,
    spinner:    true,
    inline:     true
};
