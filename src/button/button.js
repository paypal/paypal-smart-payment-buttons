/* @flow */

import { onClick as onElementClick, noop, stringifyErrorMessage, stringifyError, preventClickFocus } from 'belter/src';
import { COUNTRY, FPTI_KEY, FUNDING, type FundingEligibilityType } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import type { ContentType, Wallet } from '../types';
import { getLogger } from '../lib';
import { type FirebaseConfig } from '../api';
import { DATA_ATTRIBUTES, BUYER_INTENT } from '../constants';
import { type Payment } from '../payment-flows';

import { getProps, getConfig, getComponents, getServiceData, type ServerRiskData, type ButtonProps } from './props';
import { getSelectedFunding, getButtons, getMenuButton, getWalletButton } from './dom';
import { setupButtonLogger } from './logger';
import { setupRemember } from './remember';
import { setupPaymentFlows, initiatePaymentFlow, initiateMenuFlow, initiateWalletFlow } from './pay';
import { prerenderMenu, clearSmartMenu } from './menu';
import { prerenderWallet, clearSmartWallet } from './wallet';

import { validateProps } from './validation';

type ButtonOpts = {|
    fundingEligibility : FundingEligibilityType,
    buyerCountry : $Values<typeof COUNTRY>,
    cspNonce? : string,
    merchantID : $ReadOnlyArray<string>,
    isCardFieldsExperimentEnabled : boolean,
    firebaseConfig? : FirebaseConfig,
    facilitatorAccessToken : string,
    content : ContentType,
    sdkMeta : string,
    wallet : ?Wallet,
    buyerAccessToken : ?string,
    eligibility : {|
        cardFields : boolean,
        nativeCheckout : {
            [$Values<typeof FUNDING> ] : ?boolean
        }
    |},
    serverRiskData : ?ServerRiskData,
    correlationID? : string
|};

try {
    if (!window.paypal) {
        const script = Array.prototype.slice.call(document.querySelectorAll('script')).find(el => el.getAttribute('data-namespace'));

        if (script) {
            window.paypal = window[script.getAttribute('data-namespace')];
        }
    }
} catch (err) {
    // pass
}

export function setupButton(opts : ButtonOpts) : ZalgoPromise<void> {
    console.log('aliased setup button: ', opts);
    if (!window.paypal) {
        throw new Error(`PayPal SDK not loaded`);
    }

    const { facilitatorAccessToken, eligibility, fundingEligibility, buyerCountry: buyerGeoCountry, sdkMeta, buyerAccessToken, wallet, serverRiskData,
        cspNonce: serverCSPNonce, merchantID: serverMerchantID, isCardFieldsExperimentEnabled, firebaseConfig, content, correlationID: buttonCorrelationID = '' } = opts;

    const clientID = window.xprops.clientID;

    const serviceData = getServiceData({
        eligibility, facilitatorAccessToken, buyerGeoCountry, serverMerchantID, fundingEligibility,
        isCardFieldsExperimentEnabled, sdkMeta, buyerAccessToken, wallet, content, serverRiskData });
    
    console.log('service data: ', serviceData);
    const { merchantID } = serviceData;

    const props = getProps({ facilitatorAccessToken });
    const { env, sessionID, partnerAttributionID, commit, sdkCorrelationID, locale,
        buttonSessionID, merchantDomain, onInit, getPrerenderDetails, rememberFunding,
        style, persistRiskData, fundingSource, intent, createBillingAgreement, createSubscription, enablePWB } = props;
        
    const config = getConfig({ serverCSPNonce, firebaseConfig });
    const { version } = config;
    
    const components = getComponents();

    const { initPromise, isEnabled } = onInit({ correlationID: buttonCorrelationID });

    let paymentProcessing = false;

    function initiatePayment({ payment, props: paymentProps } : {| props : ButtonProps, payment : Payment |}) : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            if (paymentProcessing) {
                return;
            }

            const { win, fundingSource: paymentFundingSource } = payment;
            const { onClick } = paymentProps;

            if (onClick) {
                onClick({ fundingSource: paymentFundingSource });
            }

            if (isEnabled()) {
                paymentProcessing = true;
                console.log('calling initiate payment flow');

                return initiatePaymentFlow({ payment, config, serviceData, components, props: paymentProps }).finally(() => {
                    paymentProcessing = false;
                });
            } else  {
                if (win) {
                    win.close();
                }
            }
        }).catch(err => {
            
            getLogger()
                .info('smart_buttons_payment_error', { err: stringifyError(err) })
                .track({
                    [FPTI_KEY.ERROR_CODE]: 'smart_buttons_payment_error',
                    [FPTI_KEY.ERROR_DESC]: stringifyErrorMessage(err)
                });

            throw err;
        });
    }

    function initiateMenu({ payment } : {| payment : Payment |}) : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            if (paymentProcessing) {
                return;
            }

            if (isEnabled()) {
                return initiateMenuFlow({ payment, config, serviceData, components, props });
            }
        }).catch(err => {
            getLogger()
                .info('smart_buttons_payment_error', { err: stringifyError(err) })
                .track({
                    [FPTI_KEY.ERROR_CODE]: 'smart_buttons_payment_error',
                    [FPTI_KEY.ERROR_DESC]: stringifyErrorMessage(err)
                });

            throw err;
        });
    }
    
    function initiateWallet({ payment }) {
        console.log('initiate wallet');
        return ZalgoPromise.try(() => {
            if (paymentProcessing) {
                return;
            }
            
            const abc = isEnabled();
            console.log('is wallet enabled: ', abc);
        
            if (isEnabled()) {
                console.log('calling initiate wallet flow');
                return initiateWalletFlow({ payment, config, serviceData, components, props });
            }
        }).catch(err => {
            console.log('initiate wallet error: ', err);
            getLogger()
                .info('smart_buttons_initiate_wallet_error', { err: stringifyError(err) })
                .track({
                    [FPTI_KEY.ERROR_CODE]: 'smart_buttons_initiate_wallet_error',
                    [FPTI_KEY.ERROR_DESC]: stringifyErrorMessage(err)
                });
        
            throw err;
        });
    }

    clearSmartMenu();
    
    clearSmartWallet();
    
    getButtons().forEach(button => {
        // console.log('button: ', button);
        const menuToggle = getMenuButton(button);
        
        const pwb = getWalletButton(button);
        const { fundingSource: paymentFundingSource, card, paymentMethodID, instrumentID, instrumentType } = getSelectedFunding(button);

        const payment = { button, menuToggle, fundingSource: paymentFundingSource, card, paymentMethodID, instrumentID, instrumentType, isClick: true, buyerIntent: BUYER_INTENT.PAY };

        preventClickFocus(button);
    
    
        if (pwb) {
            console.log('prerendering pwb');
            prerenderWallet({ props, components });
        
            onElementClick(button, event => {
                console.log('pwb clicked!');
                event.preventDefault();
                event.stopPropagation();
            
                const paymentProps = getProps({ facilitatorAccessToken });
                const payPromise = initiatePayment({ payment, props: paymentProps });
            
                // $FlowFixMe
                button.payPromise = payPromise;
            
                const walletPromise = initiateWallet({ payment });
                button.walletPromise = walletPromise;
            });
        } else {
            onElementClick(button, event => {
                event.preventDefault();
                event.stopPropagation();
        
                const paymentProps = getProps({ facilitatorAccessToken });
                const payPromise = initiatePayment({ payment, props: paymentProps });
        
                // $FlowFixMe
                button.payPromise = payPromise;
            });
        }
        
        
        if (menuToggle) {
            console.log('prerendering menu');
            // Q: why prerendering menu?
            prerenderMenu({ props, components });

            onElementClick(menuToggle, (event) => {
                event.preventDefault();
                event.stopPropagation();
    
                const menuPromise = initiateMenu({ payment });
    
                // $FlowFixMe
                button.menuPromise = menuPromise;
            });
        }
    });

    const setupPrerenderTask = initPromise.then(() => {
        return ZalgoPromise.hash({ prerenderDetails: getPrerenderDetails(), initPromise }).then(({ prerenderDetails }) => {
            if (!prerenderDetails) {
                return;
            }

            const { win, fundingSource: paymentFundingSource, card } = prerenderDetails;
            const button = document.querySelector(`[${ DATA_ATTRIBUTES.FUNDING_SOURCE }=${ paymentFundingSource }]`);

            if (!button) {
                throw new Error(`Can not find button element`);
            }

            const paymentProps = getProps({ facilitatorAccessToken });
            const payment = { win, button, fundingSource: paymentFundingSource, card, buyerIntent: BUYER_INTENT.PAY };
            const payPromise = initiatePayment({ payment, props: paymentProps });

            // $FlowFixMe
            button.payPromise = payPromise;
        });
    });

    const setupRememberTask = setupRemember({ rememberFunding, fundingEligibility });
    const setupButtonLogsTask = setupButtonLogger({
        style, env, version, sessionID, clientID, partnerAttributionID, commit, sdkCorrelationID,
        buttonCorrelationID, locale, merchantID, buttonSessionID, merchantDomain, fundingSource });
    const setupPaymentFlowsTask = setupPaymentFlows({ props, config, serviceData, components });
    const setupPersistRiskDataTask = (persistRiskData && serverRiskData) ? persistRiskData(serverRiskData) : null;
    const validatePropsTask = setupButtonLogsTask.then(() => validateProps({ intent, createBillingAgreement, createSubscription }));

    return ZalgoPromise.hash({
        initPromise, facilitatorAccessToken,
        setupButtonLogsTask, setupPrerenderTask, setupRememberTask,
        setupPaymentFlowsTask, setupPersistRiskDataTask, validatePropsTask
    }).then(noop);
}
