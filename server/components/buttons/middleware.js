/* @flow */

import { html } from 'jsx-pragmatic';
import { COUNTRY, LANG } from '@paypal/sdk-constants';

import { clientErrorResponse, htmlResponse, allowFrame, defaultLogger, safeJSON, sdkMiddleware, type ExpressMiddleware, graphQLBatch, type GraphQL, javascriptResponse } from '../../lib';
import { renderFraudnetScript, shouldRenderFraudnet, resolveFundingEligibility, resolveNativeEligibility, resolveMerchantID, type GetWallet, resolveWallet, exchangeIDToken } from '../../service';
import type { LoggerType, CacheType, ExpressRequest, FirebaseConfig, RiskData } from '../../types';
import type { ContentType } from '../../../src/types';

import { getSmartPaymentButtonsClientScript, getPayPalSmartPaymentButtonsRenderScript } from './script';
import { EVENT } from './constants';
import { getParams } from './params';
import { buttonStyle } from './style';

type InlineGuestElmoParams = {|
    merchantID : string,
    buttonSessionID : string,
    locale : {|
        lang : $Values<typeof COUNTRY>,
        country : $Values<typeof LANG>
    |},
    buyerCountry : $Values<typeof COUNTRY>
|};

type ButtonMiddlewareOptions = {|
    logger : LoggerType,
    graphQL : GraphQL,
    getAccessToken : (ExpressRequest, string) => Promise<string>,
    getMerchantID : (ExpressRequest, string) => Promise<string>,
    getInlineGuestExperiment? : (req : ExpressRequest, params : InlineGuestElmoParams) => Promise<boolean>,
    cache : CacheType,
    firebaseConfig? : FirebaseConfig,
    transportRiskData : (ExpressRequest, RiskData) => Promise<void>,
    getWallet : GetWallet,
    content : {
        [$Values<typeof COUNTRY>] : {
            [$Values<typeof LANG>] : ContentType
        }
    },
    tracking : (ExpressRequest) => void
|};

export function getButtonMiddleware({ logger = defaultLogger, content: smartContent, graphQL, getAccessToken, getMerchantID, cache, getInlineGuestExperiment = () => Promise.resolve(false), firebaseConfig, getWallet, transportRiskData, tracking } : ButtonMiddlewareOptions = {}) : ExpressMiddleware {
    return sdkMiddleware({ logger, cache }, {
        app: async ({ req, res, params, meta, logBuffer, sdkMeta }) => {
            logger.info(req, EVENT.RENDER);
            
            tracking(req);

            const { env, clientID, buttonSessionID, cspNonce, debug, buyerCountry, disableFunding, disableCard, userIDToken, amount,
                merchantID: sdkMerchantID, currency, intent, commit, vault, clientAccessToken, basicFundingEligibility, locale, onShippingChange,
                clientMetadataID, riskData, pageSessionID, correlationID, enableBNPL, platform } = getParams(params, req, res);
            
            logger.info(req, `button_params`, { params: JSON.stringify(params) });

            if (!clientID) {
                return clientErrorResponse(res, 'Please provide a clientID query parameter');
            }

            const gqlBatch = graphQLBatch(req, graphQL);

            const content = smartContent[locale.country][locale.lang] || {};

            const facilitatorAccessTokenPromise = getAccessToken(req, clientID);
            const merchantIDPromise = facilitatorAccessTokenPromise.then(facilitatorAccessToken => resolveMerchantID(req, { merchantID: sdkMerchantID, getMerchantID, facilitatorAccessToken }));
            const clientPromise = getSmartPaymentButtonsClientScript({ debug, logBuffer, cache });
            const renderPromise = getPayPalSmartPaymentButtonsRenderScript({ logBuffer, cache });

            const isCardFieldsExperimentEnabledPromise = merchantIDPromise.then(merchantID => getInlineGuestExperiment(req, { merchantID: merchantID[0], locale, buttonSessionID, buyerCountry }));
            
            const sendRiskDataPromise = (riskData && !enableBNPL) ? transportRiskData(req, riskData).catch(err => {
                logger.warn(req, 'risk_data_transport_error', { err: err.stack || err.toString() });
            }) : Promise.resolve();

            const buyerAccessTokenPromise = (userIDToken && clientMetadataID && !enableBNPL) ? sendRiskDataPromise
                .then(() => exchangeIDToken(req, gqlBatch, { logger, userIDToken, clientMetadataID, riskData })) : null;

            const buyerAccessToken = await buyerAccessTokenPromise;

            const nativeEligibilityPromise = resolveNativeEligibility(req, gqlBatch, {
                logger, clientID, merchantID: sdkMerchantID, buttonSessionID, currency, vault,
                buyerCountry, onShippingChange, platform
            });

            const fundingEligibilityPromise = resolveFundingEligibility(req, gqlBatch, {
                logger, clientID, merchantID: sdkMerchantID, buttonSessionID, currency, intent, commit, vault,
                disableFunding, disableCard, clientAccessToken, buyerCountry, basicFundingEligibility, enableBNPL
            });

            const walletPromise = resolveWallet(req, gqlBatch, getWallet, {
                logger, clientID, merchantID: sdkMerchantID, buttonSessionID, currency, intent, commit, vault, amount,
                disableFunding, disableCard, clientAccessToken, buyerCountry, buyerAccessToken, userIDToken, enableBNPL
            });

            gqlBatch.flush();

            let facilitatorAccessToken;

            try {
                facilitatorAccessToken = await facilitatorAccessTokenPromise;
            } catch (err) {
                if (err && err.statusCode && err.statusCode >= 400 && err.statusCode < 500) {
                    return clientErrorResponse(res, 'Invalid clientID');
                }

                throw err;
            }

            const serverRiskData = await sendRiskDataPromise;
            const render = await renderPromise;
            const client = await clientPromise;
            const fundingEligibility = await fundingEligibilityPromise;
            const isCardFieldsExperimentEnabled = await isCardFieldsExperimentEnabledPromise;
            const merchantID = await merchantIDPromise;
            const nativeEligibility = await nativeEligibilityPromise;
            const cardFieldsEligibility = await isCardFieldsExperimentEnabledPromise;
            const wallet = await walletPromise;

            const eligibility = {
                nativeCheckout: nativeEligibility,
                cardFields:     cardFieldsEligibility
            };

            logger.info(req, `button_render_version_${ render.version }`);
            logger.info(req, `button_client_version_${ client.version }`);

            const buttonProps = {
                ...params, nonce: cspNonce, csp: { nonce: cspNonce },
                fundingEligibility, content, wallet
            };

            try {
                if (render.button.validateButtonProps) {
                    render.button.validateButtonProps(buttonProps);
                }
            } catch (err) {
                return clientErrorResponse(res, err.stack || err.message);
            }
            
            const buttonHTML = render.button.Buttons(buttonProps).render(html());

            const setupParams = {
                fundingEligibility, buyerCountry, cspNonce, merchantID, sdkMeta, wallet, buyerAccessToken, correlationID,
                isCardFieldsExperimentEnabled, firebaseConfig, facilitatorAccessToken, eligibility, content, serverRiskData
            };

            const pageHTML = `
                <!DOCTYPE html>
                <head></head>
                <body data-nonce="${ cspNonce }" data-client-version="${ client.version }" data-render-version="${ render.version }">
                    <style nonce="${ cspNonce }">${ buttonStyle }</style>
                    
                    <div id="buttons-container" class="buttons-container">${ buttonHTML }</div>
                    <div id="card-fields-container" class="card-fields-container"></div>

                    ${ meta.getSDKLoader({ nonce: cspNonce }) }
                    <script nonce="${ cspNonce }">${ client.script }</script>
                    <script nonce="${ cspNonce }">spb.setupButton(${ safeJSON(setupParams) })</script>
                    ${ shouldRenderFraudnet({ wallet, enableBNPL }) ? renderFraudnetScript({ id: clientMetadataID || pageSessionID, cspNonce, env }) : '' }
                </body>
            `;

            allowFrame(res);
            return htmlResponse(res, pageHTML);
        },

        script: async ({ req, res, params, logBuffer }) => {
            logger.info(req, EVENT.RENDER);

            const { debug } = getParams(params, req, res);
            const { script } = await getSmartPaymentButtonsClientScript({ debug, logBuffer, cache });

            return javascriptResponse(res, script);
        }
    });
}
