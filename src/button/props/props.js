/* @flow */

import { COUNTRY } from '@paypal/sdk-constants/src';

import type { FundingEligibilityType, CheckoutFlowType, CardFieldsFlowType, ThreeDomainSecureFlowType, PersonalizationType } from '../../types';
import type { FirebaseConfig } from '../../api';
import { getNonce } from '../dom';

import type { XProps, Props } from './types';
import { getOnInit } from './onInit';
import { getCreateOrder } from './createOrder';
import { getOnApprove } from './onApprove';
import { getOnCancel } from './onCancel';
import { getOnShippingChange } from './onShippingChange';
import { getOnClick } from './onClick';
import { getCreateBillingAgreement } from './createBillingAgreement';
import { getCreateSubscription } from './createSubscription';

export function getProps() : Props {

    const xprops : XProps = window.xprops;

    const {
        env,
        vault,
        commit,
        locale,
        platform,
        sessionID,
        buttonSessionID,
        clientID,
        partnerAttributionID,
        correlationID,
        getParentDomain,
        clientAccessToken,
        getPopupBridge,
        getPrerenderDetails,
        getPageUrl,
        enableThreeDomainSecure,
        enableStandardCardFields,
        enableNativeCheckout = false,
        remember: rememberFunding,
        onError,
        stageHost,
        apiStageHost,
        style,
        getParent,
        currency
    } = xprops;

    const onInit = getOnInit(xprops);
    const merchantDomain = (typeof getParentDomain === 'function') ? getParentDomain() : 'unknown';

    const onClick = getOnClick(xprops);

    if (xprops.createBillingAgreement) {
        if (xprops.createOrder) {
            throw new Error(`Do not pass both createBillingAgreement and createOrder`);
        }

        if (!xprops.vault) {
            throw new Error(`Must pass vault=true to sdk to use createBillingAgreement`);
        }
    }

    if (xprops.createSubscription) {
        if (xprops.createOrder) {
            throw new Error(`Do not pass both createSubscription and createOrder`);
        }

        if (xprops.createOrder) {
            throw new Error(`Do not pass both createSubscription and createBillingAgreement`);
        }

        if (!xprops.vault) {
            throw new Error(`Must pass vault=true to sdk to use createSubscription`);
        }
    }

    const createBillingAgreement = getCreateBillingAgreement(xprops);
    const createSubscription = getCreateSubscription(xprops);
    
    const createOrder = getCreateOrder(xprops, { createBillingAgreement, createSubscription });

    const onApprove = getOnApprove(xprops, { createOrder });
    const onCancel = getOnCancel(xprops, { createOrder });
    const onShippingChange = getOnShippingChange(xprops, { createOrder });

    return {
        env,
        style,

        vault,
        commit,

        clientAccessToken,
        locale,

        sessionID,
        buttonSessionID,
        clientID,
        partnerAttributionID,
        correlationID,
        merchantDomain,
        platform,
        currency,

        getPopupBridge,
        getPrerenderDetails,
        getPageUrl,
        rememberFunding,
        getParent,

        enableThreeDomainSecure,
        enableStandardCardFields,
        enableNativeCheckout,

        onClick,
        onInit,
        onError,
        stageHost,
        apiStageHost,

        createOrder,
        createBillingAgreement,
        createSubscription,
        onApprove,
        onCancel,
        onShippingChange
    };
}

export type Components = {|
    Checkout : CheckoutFlowType,
    CardFields : CardFieldsFlowType,
    ThreeDomainSecure : ThreeDomainSecureFlowType
|};

export function getComponents() : Components {
    const { Checkout, CardFields, ThreeDomainSecure } = window.paypal;
    return { Checkout, CardFields, ThreeDomainSecure };
}

export type Config = {|
    version : string,
    cspNonce : ?string,
    firebase : ?FirebaseConfig
|};

export function getConfig({ serverCSPNonce, firebaseConfig } : { serverCSPNonce : ?string, firebaseConfig : ?FirebaseConfig }) : Config {
    const cspNonce = serverCSPNonce || getNonce();
    const version = window.paypal.version;
    
    return {
        version,
        cspNonce,
        firebase: firebaseConfig
    };
}

export type ServiceData = {|
    merchantID : $ReadOnlyArray<string>,
    buyerCountry : $Values<typeof COUNTRY>,
    fundingEligibility : FundingEligibilityType,
    experiments : {
        cardFields : boolean
    },
    personalization : PersonalizationType
|};

export function getServiceData({ buyerGeoCountry, isCardFieldsExperimentEnabled, fundingEligibility, personalization, serverMerchantID } : { buyerGeoCountry : $Values<typeof COUNTRY>, isCardFieldsExperimentEnabled : boolean, fundingEligibility : FundingEligibilityType, personalization : PersonalizationType, serverMerchantID : $ReadOnlyArray<string> }) : ServiceData {
    return {
        merchantID:   serverMerchantID,
        buyerCountry: buyerGeoCountry || COUNTRY.US,
        experiments:  {
            cardFields: isCardFieldsExperimentEnabled
        },
        fundingEligibility,
        personalization
    };
}
