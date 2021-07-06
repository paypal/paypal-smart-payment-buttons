/* @flow */

import { stringifyError, noop, once } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FPTI_KEY, FUNDING } from '@paypal/sdk-constants/src';
import { type CrossDomainWindowType, onCloseWindow } from 'cross-domain-utils/src';

import { getNativeEligibility } from '../../api';
import { getLogger, isAndroidChrome, unresolvedPromise } from '../../lib';
import { FPTI_STATE, FPTI_TRANSITION, FPTI_CUSTOM_KEY } from '../../constants';
import type { ButtonProps, ServiceData, Config } from '../../button/props';

import { isNativeOptedIn } from './eligibility';
import { getNativeUrl, getNativePopupUrl, getNativeDomain, getNativePopupDomain, getNativeFallbackUrl } from './url';
import { onPostMessage } from './util';

const POST_MESSAGE = {
    AWAIT_REDIRECT:     'awaitRedirect',
    DETECT_APP_SWITCH:  'detectAppSwitch',
    DETECT_WEB_SWITCH:  'detectWebSwitch',
    ON_APPROVE:         'onApprove',
    ON_CANCEL:          'onCancel',
    ON_FALLBACK:        'onFallback',
    ON_COMPLETE:        'onComplete',
    ON_ERROR:           'onError'
};

type AppDetect = {|
    installed : boolean,
    [ string ] : string
|};

function logDetectedApp(app : AppDetect) {
    if (app) {
        Object.keys(app).forEach(key => {
            getLogger().info(`native_app_${ app.installed ? 'installed' : 'not_installed' }_${ key }`, { [key]: app[key] })
                .track({
                    [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                    [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_APP_INSTALLED,
                    [FPTI_CUSTOM_KEY.INFO_MSG]: `native_app_${ app.installed ? 'installed' : 'not_installed' }_${ key }: ${ app[key].toString() }`
                })
                .flush();
        });
    }
}

type EligibilityOptions = {|
    props : ButtonProps,
    serviceData : ServiceData,
    fundingSource : $Values<typeof FUNDING>,
    sfvc : boolean,
    validatePromise : ZalgoPromise<boolean>,
    stickinessID : string,
    appDetect : AppDetect
|};

function getEligibility({ fundingSource, props, serviceData, sfvc, validatePromise, stickinessID, appDetect } : EligibilityOptions) : ZalgoPromise<boolean> {
    const { createOrder, onShippingChange, vault, platform, clientID, currency, buttonSessionID, enableFunding, merchantDomain } = props;
    const { buyerCountry, cookies, merchantID } = serviceData;
    const shippingCallbackEnabled = Boolean(onShippingChange);

    return validatePromise.then(valid => {
        if (!valid) {
            return false;
        }

        if (appDetect && !appDetect.installed) {
            return false;
        }

        if (isNativeOptedIn({ props })) {
            return true;
        }

        if (sfvc) {
            return false;
        }

        return createOrder().then(orderID => {
            return getNativeEligibility({ vault, platform, shippingCallbackEnabled,
                clientID, buyerCountry, currency, buttonSessionID, cookies, orderID, enableFunding, stickinessID,
                merchantID:   merchantID[0],
                domain:       merchantDomain
            }).then(eligibility => {
                if (!eligibility || !eligibility[fundingSource] || !eligibility[fundingSource].eligibility) {
                    getLogger().info(`native_appswitch_ineligible`, { orderID })
                        .track({
                            [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                            [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_APP_SWITCH_INELIGIBLE
                        }).flush();

                    return false;
                }
                return true;
            });
        });
    });
}

type NativePopupOptions = {|
    props : ButtonProps,
    serviceData : ServiceData,
    config : Config,
    fundingSource : $Values<typeof FUNDING>,
    sessionUID : string,
    callbacks : {|
        onDetectWebSwitch : ({|
            win : CrossDomainWindowType
        |}) => ZalgoPromise<void>,
        onDetectAppSwitch : ({|
            sessionUID : string
        |}) => ZalgoPromise<void>,
        onApprove : ({|
            data : {|
                payerID : string,
                paymentID? : string,
                billingToken? : string
            |}
        |}) => ZalgoPromise<{|
            buttonSessionID : string
        |}>,
        onCancel : () => ZalgoPromise<{|
            buttonSessionID : string
        |}>,
        onError : ({|
            data : {|
                message : string
            |}
        |}) => ZalgoPromise<{|
            buttonSessionID : string
        |}>,
        onFallback : ({|
            data? : {|
                type? : string,
                skip_native_duration? : number,
                win? : CrossDomainWindowType
            |}
        |}) => ZalgoPromise<{|
            buttonSessionID : string
        |}>,
        onClose : () => ZalgoPromise<void>,
        onDestroy : () => ZalgoPromise<void>
    |}
|};

type NativePopup = {|
    close : () => void,
    cancel : () => ZalgoPromise<void>
|};

export function openNativePopup({ props, serviceData, config, fundingSource, sessionUID, callbacks } : NativePopupOptions) : NativePopup {
    const { onClick, createOrder } = props;
    const { firebase: firebaseConfig } = config;
    let { onDetectAppSwitch, onDetectWebSwitch, onApprove, onCancel, onError, onFallback, onClose, onDestroy } = callbacks;

    onDetectAppSwitch = once(onDetectAppSwitch);
    onDetectWebSwitch = once(onDetectWebSwitch);

    if (!firebaseConfig) {
        throw new Error(`Can not load popup without firebase config`);
    }

    const nativePopupWin = window.open(getNativePopupUrl({ props, serviceData, fundingSource }));
    const nativePopupDomain = getNativePopupDomain({ props });

    getLogger().info(`native_attempt_appswitch_popup_shown`)
        .track({
            [FPTI_KEY.STATE]:      FPTI_STATE.BUTTON,
            [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_POPUP_SHOWN
        }).flush();

    const closeListener = onCloseWindow(nativePopupWin, () => {
        getLogger().info(`native_popup_closed`).track({
            [FPTI_KEY.STATE]:       FPTI_STATE.BUTTON,
            [FPTI_KEY.TRANSITION]:  FPTI_TRANSITION.NATIVE_POPUP_CLOSED
        }).flush();
        onClose();
    }, 500);

    const closePopup = (event : string) => {
        getLogger().info(`native_closing_popup_${ event }`).track({
            [FPTI_KEY.STATE]:       FPTI_STATE.BUTTON,
            [FPTI_KEY.TRANSITION]:  event ? `${ FPTI_TRANSITION.NATIVE_CLOSING_POPUP }_${ event }` : FPTI_TRANSITION.NATIVE_CLOSING_POPUP
        }).flush();
        closeListener.cancel();
        nativePopupWin.close();
    };

    const redirectListenerTimeout = setTimeout(() => {
        getLogger().info(`native_popup_load_timeout`).flush();
    }, 5 * 1000);

    const validatePromise = ZalgoPromise.try(() => {
        return onClick ? onClick({ fundingSource }) : true;
    }).then(valid => {
        if (!valid) {
            getLogger().info(`native_onclick_invalid`).track({
                [FPTI_KEY.STATE]:       FPTI_STATE.BUTTON,
                [FPTI_KEY.TRANSITION]:  FPTI_TRANSITION.NATIVE_ON_CLICK_INVALID
            }).flush();
        }

        return valid;
    });

    const orderPromise = validatePromise.then(valid => {
        if (valid) {
            return createOrder();
        }

        return unresolvedPromise();
    });

    const awaitRedirectListener = onPostMessage(nativePopupWin, nativePopupDomain, POST_MESSAGE.AWAIT_REDIRECT, ({ data: { app: appDetect, pageUrl, sfvc, stickinessID } }) => {
        clearTimeout(redirectListenerTimeout);
        getLogger().info(`native_post_message_await_redirect`).flush();
        logDetectedApp(appDetect);

        getLogger().addTrackingBuilder(() => {
            return {
                [FPTI_KEY.STICKINESS_ID]: stickinessID
            };
        });

        return ZalgoPromise.hash({
            valid:      validatePromise,
            eligible:   getEligibility({ fundingSource, props, serviceData, sfvc, validatePromise, stickinessID, appDetect })
        }).then(({ valid, eligible }) => {

            if (!valid) {
                nativePopupWin.close();
                return onDestroy();
            }

            if (!eligible) {
                return orderPromise.then(orderID => {
                    return {
                        redirect:    true,
                        appSwitch:   false,
                        redirectUrl: getNativeFallbackUrl({
                            props, serviceData, config, fundingSource, sessionUID, pageUrl, orderID, stickinessID
                        })
                    };
                });
            }

            return orderPromise.then(orderID => {
                const nativeUrl = getNativeUrl({ props, serviceData, config, fundingSource, sessionUID, pageUrl, orderID, stickinessID });

                getLogger().info(`native_attempt_appswitch_url_popup`, { url: nativeUrl })
                    .track({
                        [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                        [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_ATTEMPT_APP_SWITCH,
                        [FPTI_CUSTOM_KEY.INFO_MSG]: nativeUrl
                    }).flush();

                if (isAndroidChrome()) {
                    const appSwitchCloseListener = onCloseWindow(nativePopupWin, () => onDetectAppSwitch({ sessionUID }));
                    setTimeout(appSwitchCloseListener.cancel, 1000);
                }

                return {
                    redirect:    true,
                    appSwitch:   true,
                    redirectUrl: nativeUrl
                };
            });

        }).catch(err => {
            getLogger().info(`native_attempt_appswitch_url_popup_errored`)
                .track({
                    [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                    [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_ATTEMPT_APP_SWITCH_ERRORED,
                    [FPTI_CUSTOM_KEY.ERR_DESC]: stringifyError(err)
                }).flush();

            return orderPromise.then(orderID => {
                return {
                    redirect:    true,
                    appSwitch:   false,
                    redirectUrl: getNativeFallbackUrl({
                        props, serviceData, config, fundingSource, sessionUID, pageUrl, orderID, stickinessID
                    })
                };
            });
        }).catch(err => {
            nativePopupWin.close();

            return onDestroy().then(() => {
                return onError({ data: { message: stringifyError(err) } });
            });
        });
    });

    const detectAppSwitchListener = onPostMessage(nativePopupWin, nativePopupDomain, POST_MESSAGE.DETECT_APP_SWITCH, () => {
        getLogger().info(`native_post_message_detect_app_switch`).flush();
        return onDetectAppSwitch({ sessionUID });
    });

    const detectWebSwitchListener = onPostMessage(nativePopupWin, getNativeDomain({ props }), POST_MESSAGE.DETECT_WEB_SWITCH, () => {
        getLogger().info(`native_post_message_detect_web_switch`).flush();
        return onDetectWebSwitch({ win: nativePopupWin });
    });

    const onApproveListener = onPostMessage(nativePopupWin, nativePopupDomain, POST_MESSAGE.ON_APPROVE, (data) => {
        onApprove(data);
        closePopup('onApprove');
    });

    const onCancelListener = onPostMessage(nativePopupWin, nativePopupDomain, POST_MESSAGE.ON_CANCEL, () => {
        onCancel();
        closePopup('onCancel');
    });

    const onFallbackListener = onPostMessage(nativePopupWin, nativePopupDomain, POST_MESSAGE.ON_FALLBACK, (data) => {
        getLogger().info(`native_message_onfallback`)
            .track({
                [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_ON_FALLBACK
            }).flush();
        const { type, skip_native_duration } = data;
        onFallback({ data: { win: nativePopupWin, type, skip_native_duration } });
    });

    const onCompleteListener = onPostMessage(nativePopupWin, nativePopupDomain, POST_MESSAGE.ON_COMPLETE, () => {
        getLogger().info(`native_post_message_on_complete`)
            .track({
                [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_ON_COMPLETE
            }).flush();
        closePopup('onComplete');
    });

    const onErrorListener = onPostMessage(nativePopupWin, nativePopupDomain, POST_MESSAGE.ON_ERROR, (data) => {
        onError(data);
        closePopup('onError');
    });

    window.addEventListener('pagehide', () => closePopup('pagehide'));
    window.addEventListener('unload', () => closePopup('unload'));

    const cancel = () => {
        return ZalgoPromise.all([
            awaitRedirectListener.cancel,
            detectAppSwitchListener.cancel,
            onApproveListener.cancel,
            onCancelListener.cancel,
            onFallbackListener.cancel,
            onCompleteListener.cancel,
            onErrorListener.cancel,
            detectWebSwitchListener.cancel,
            closeListener.cancel
        ]).then(noop);
    };

    const close = () => {
        nativePopupWin.close();
    };

    return {
        cancel,
        close
    };
}
