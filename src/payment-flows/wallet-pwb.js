/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { stringifyError } from 'belter/src';
import { FUNDING, WALLET_INSTRUMENT, FPTI_KEY } from '@paypal/sdk-constants/src';

import type { MenuChoices, Wallet, WalletInstrument } from '../types';
import { getSupplementalOrderInfo, oneClickApproveOrder, loadFraudnet, getSmartWallet, updateButtonClientConfig } from '../api';
import { BUYER_INTENT, FPTI_TRANSITION } from '../constants';
import { getLogger } from '../lib';

import type { PaymentFlow, PaymentFlowInstance, SetupOptions, IsEligibleOptions, IsPaymentEligibleOptions, InitOptions, MenuOptions, Payment } from './types';
import { checkout, CHECKOUT_POPUP_DIMENSIONS } from './checkout';

function isWalletEligible({ props, serviceData } : IsEligibleOptions) : boolean {
    const { wallet } = serviceData;
    const { onShippingChange } = props;
    
    if (!window.xprops.enablePWB) {
        return false;
    }
    
    if (!wallet) {
        return false;
    }
    
    if (onShippingChange) {
        return false;
    }
    
    console.log('Inline wallet eligible');
    return true;
}

let smartWalletPromise;

// Q: Why do we have this function?
/*
function setupWallet({ props, config, serviceData } : SetupOptions) {
    const { env, sessionID, clientID, currency, amount, userAccessToken, enablePWB, clientMetadataID: cmid } = props;
    const { cspNonce } = config;
    const { merchantID, wallet } = serviceData;
    
    const clientMetadataID = cmid || sessionID;
    
    if (clientID && enablePWB && userAccessToken) {
        smartWalletPromise = loadFraudnet({ env, clientMetadataID, cspNonce }).then(() => {
            return getSmartWallet({ clientID, merchantID, currency, amount, clientMetadataID, userAccessToken });
        }).catch(err => {
            getLogger().warn('load_smart_inline_wallet_error', { err: stringifyError(err) });
            throw err;
        });
    } else if (wallet) {
        smartWalletPromise = ZalgoPromise.resolve(wallet);
    }
}
*/

function getInstrument(wallet : Wallet, fundingSource : $Values<typeof FUNDING>, instrumentID : string) : WalletInstrument {
    
    // $FlowFixMe
    const walletFunding = wallet[fundingSource];
    
    if (!walletFunding) {
        throw new Error(`Wallet has no ${ fundingSource }`);
    }
    
    let instrument;
    for (const inst of walletFunding.instruments) {
        if (inst.instrumentID === instrumentID) {
            instrument = inst;
        }
    }
    
    if (!instrument) {
        throw new Error(`Can not find instrument with id ${ instrumentID }`);
    }
    
    return instrument;
}

function isWalletPaymentEligible({ serviceData, payment } : IsPaymentEligibleOptions) : boolean {
    const { wallet } = serviceData;
    const { win, fundingSource, instrumentID } = payment;
    
    if (win) {
        return false;
    }
    
    if (!wallet) {
        return false;
    }
    
    if (!instrumentID) {
        return false;
    }
    
    try {
        getInstrument(wallet, fundingSource, instrumentID);
    } catch (err) {
        return false;
    }
    
    if (!smartWalletPromise) {
        return false;
    }
    
    return true;
}

function initWallet({ props, components, payment, serviceData, config } : InitOptions) : PaymentFlowInstance {
    const { Wallet } = components;
    const { createOrder, onApprove, clientMetadataID } = props;
    const { fundingSource, instrumentID } = payment;
    const { wallet } = serviceData;
    
    if (!wallet || !smartWalletPromise) {
        throw new Error(`No smart wallet found`);
    }
    
    if (!instrumentID) {
        throw new Error(`Instrument id required for wallet capture`);
    }
    
    const instrument = getInstrument(wallet, fundingSource, instrumentID);
    
    const getWebCheckoutFallback = () => {
        return checkout.init({
            props, components, serviceData, payment: {
                ...payment,
                createAccessToken: () => {
                    return smartWalletPromise.then(smartWallet => {
                        const smartInstrument = getInstrument(smartWallet, fundingSource, instrumentID);
                        
                        if (!smartInstrument) {
                            throw new Error(`Instrument not found`);
                        }
                        
                        if (!smartInstrument.accessToken) {
                            throw new Error(`Instrument access token not found`);
                        }
                        
                        return smartInstrument.accessToken;
                    });
                },
                isClick:       false,
                buyerIntent:   BUYER_INTENT.PAY_WITH_DIFFERENT_FUNDING_SHIPPING,
                fundingSource: (instrument && instrument.type === WALLET_INSTRUMENT.CREDIT) ? FUNDING.CREDIT : fundingSource
            }, config
        });
    };
    
    const fallbackToWebCheckout = () => {
        getLogger().info('web_checkout_fallback').flush();
        return getWebCheckoutFallback().start();
    };
    
    /*
    if (!instrument.oneClick) {
        return getWebCheckoutFallback();
    }
    */
    
    const restart = () => {
        return fallbackToWebCheckout();
    };
    
    const shippingRequired = (orderID) => {
        return getSupplementalOrderInfo(orderID).then(order => {
            const { flags: { isChangeShippingAddressAllowed } } = order.checkoutSession;
            
            if (isChangeShippingAddressAllowed) {
                return true;
            }
            
            return false;
        });
    };
    
    const start = () => {
        return ZalgoPromise.hash({
            orderID:     createOrder(),
            smartWallet: smartWalletPromise
        }).then(({ orderID, smartWallet }) => {
            const { accessToken: buyerAccessToken } = getInstrument(smartWallet, fundingSource, instrumentID);
            
            if (!buyerAccessToken) {
                throw new Error(`No access token available for instrument`);
            }
            
            const instrumentType = instrument.type;
            if (!instrumentType) {
                throw new Error(`Instrument has no type`);
            }
            
            if (!Wallet) {
                console.log('No wallet component');
                throw new Error('No wallet component in window');
            }
            
            return ZalgoPromise.hash({
                requireShipping: shippingRequired(orderID)
                // orderApproval:   oneClickApproveOrder({ orderID, instrumentType, buyerAccessToken, instrumentID, clientMetadataID })
            }).then(({ requireShipping/*, orderApproval*/ }) => {
                if (requireShipping) {
                    console.log('requires shipping');
                    return fallbackToWebCheckout();
                }
                
                // const { payerID } = orderApproval;
                // return onApprove({ payerID }, { restart });
                
            });
        }).catch(err => {
            getLogger().warn('approve_order_error', { err: stringifyError(err) }).flush();
            return fallbackToWebCheckout();
        });
    };
    
    return {
        start,
        close: () => ZalgoPromise.resolve()
    };
}

const POPUP_OPTIONS = {
    width:  CHECKOUT_POPUP_DIMENSIONS.WIDTH,
    height: CHECKOUT_POPUP_DIMENSIONS.HEIGHT
};

function setupWallet({ props, payment, serviceData, components, config } : MenuOptions) : MenuChoices {
    const { createOrder } = props;
    const { fundingSource, instrumentID } = payment;
    const { wallet, content } = serviceData;
    
    if (!wallet) {
        throw new Error(`Can not render wallet menu without wallet`);
    }
    
    if (!instrumentID) {
        throw new Error(`Can not render wallet menu without instrumentID`);
    }
    
    const instrument = getInstrument(wallet, fundingSource, instrumentID);
    
    if (!instrument) {
        throw new Error(`Can not render wallet menu without instrument`);
    }
    
    const updateClientConfig = () => {
        return ZalgoPromise.try(() => {
            return createOrder();
        }).then(orderID => {
            return updateButtonClientConfig({ fundingSource, orderID, inline: false });
        });
    };
    
    const loadCheckout = ({ payment: checkoutPayment } : {| payment : Payment |}) => {
        return checkout.init({
            props, components, serviceData, config, payment: checkoutPayment
        }).start();
    };
    
    const newFundingSource = (instrument.type === WALLET_INSTRUMENT.CREDIT)
        ? FUNDING.CREDIT
        : fundingSource;
    
    const CHOOSE_FUNDING_SHIPPING = {
        label:    content.payWithDifferentMethod,
        popup:    POPUP_OPTIONS,
        onSelect: ({ win }) => {
            
            getLogger().info('click_choose_funding').track({
                [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.CLICK_CHOOSE_FUNDING
            }).flush();
            
            return ZalgoPromise.try(() => {
                return updateClientConfig();
            }).then(() => {
                return loadCheckout({
                    payment: { ...payment, win, buyerIntent: BUYER_INTENT.PAY_WITH_DIFFERENT_FUNDING_SHIPPING, fundingSource: newFundingSource }
                });
            });
        }
    };
    
    const CHOOSE_ACCOUNT = {
        label:    content.payWithDifferentAccount,
        popup:    POPUP_OPTIONS,
        onSelect: ({ win }) => {
            
            getLogger().info('click_choose_account').track({
                [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.CLICK_CHOOSE_ACCOUNT
            }).flush();
            
            return loadCheckout({
                payment: { ...payment, win, buyerIntent: BUYER_INTENT.PAY_WITH_DIFFERENT_ACCOUNT, fundingSource: newFundingSource }
            });
        }
    };
    
    if (fundingSource === FUNDING.PAYPAL || fundingSource === FUNDING.CREDIT) {
        return [
            CHOOSE_FUNDING_SHIPPING,
            CHOOSE_ACCOUNT
        ];
    }
    
    throw new Error(`Can not render menu for ${ fundingSource }`);
}

function updateWalletClientConfig({ orderID, payment }) : ZalgoPromise<void> {
    const { fundingSource } = payment;
    return updateButtonClientConfig({ fundingSource, orderID, inline: true });
}

export const walletPWB : PaymentFlow = {
    name:               'wallet_pwb',
    setup:              setupWallet,
    isEligible:         isWalletEligible,
    isPaymentEligible:  isWalletPaymentEligible,
    init:               initWallet,
    setupWallet:        setupWallet,
    updateClientConfig: updateWalletClientConfig,
    spinner:            true,
    inline:             true
};

