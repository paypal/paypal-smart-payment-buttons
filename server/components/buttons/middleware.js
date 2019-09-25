/* @flow */

import { html } from 'jsx-pragmatic';

import { clientErrorResponse, htmlResponse, allowFrame, defaultLogger, safeJSON, sdkMiddleware, type ExpressMiddleware } from '../../lib';
import type { LoggerType, CacheType, ClientIDToMerchantID, ExpressRequest, FirebaseConfig } from '../../types';
import { renderFraudnetScript, shouldRenderFraudnet, resolveButtonStuff } from '../../service';
import { getSmartPaymentButtonsClientScript, getPayPalSmartPaymentButtonsRenderScript } from './script';
import { EVENT } from './constants';
import { getParams } from './params';
import { buttonStyle } from './style';

type ButtonMiddlewareOptions = {|
    logger? : LoggerType,
    getButtonStuff : Function,
    clientIDToMerchantID : ClientIDToMerchantID,
    getInlineGuestExperiment? : (req : ExpressRequest, params : Object) => Promise<boolean>,
    cache? : CacheType,
    firebaseConfig? : FirebaseConfig
|};

export function getButtonMiddleware({ logger = defaultLogger, cache, getButtonStuff, clientIDToMerchantID, getInlineGuestExperiment = () => Promise.resolve(false), firebaseConfig } : ButtonMiddlewareOptions = {}) : ExpressMiddleware {
    return sdkMiddleware({ logger, cache }, async ({ req, res, params, meta, logBuffer }) => {
        logger.info(req, EVENT.RENDER);
        if (logBuffer) {
            logBuffer.flush(req);
        }

        let { env, clientID, buttonSessionID, cspNonce, debug, buyerCountry, disableFunding, disableCard,
            merchantID, currency, intent, commit, vault, clientAccessToken, defaultFundingEligibility, locale, style } = getParams(params, req, res);

        const [ client, render, isCardFieldsExperimentEnabled ] = await Promise.all([
            getSmartPaymentButtonsClientScript({ debug, logBuffer, cache }),
            getPayPalSmartPaymentButtonsRenderScript({ logBuffer, cache }),
            getInlineGuestExperiment(
                req,
                getParams(params, req, res),
            )
        ]);

        logger.info(req, `button_client_version_${ client.version }`);
        logger.info(req, `button_render_version_${ render.version }`);
        logger.info(req, `button_params`, { params: JSON.stringify(params) });

        if (!clientID) {
            return clientErrorResponse(res, 'Please provide a clientID query parameter');
        }
        
        const { label: buttonLabel, period: installmentPeriod } = style;
        const [ { fundingEligibility, checkoutCustomization: personalization }, clientMerchantID ] = await Promise.all([
            resolveButtonStuff(req, {
                getButtonStuff, logger, clientID, merchantID, buttonSessionID, currency, intent, locale,
                commit, vault, disableFunding, disableCard, clientAccessToken, buyerCountry, defaultFundingEligibility,
                buttonLabel, installmentPeriod
            }),

            merchantID ? null : clientIDToMerchantID(req, clientID)
        ]);

        if (!merchantID && clientMerchantID) {
            merchantID = [ clientMerchantID ];
        }

        const buttonHTML = render.button.Buttons({
            ...params, nonce: cspNonce, csp:   { nonce: cspNonce }, fundingEligibility, personalization
        }).render(html());

        const pageHTML = `
            <!DOCTYPE html>
            <head></head>
            <body data-nonce="${ cspNonce }" data-client-version="${ client.version }" data-render-version="${ render.version }">
                <style nonce="${ cspNonce }">${ buttonStyle }</style>
                
                <div id="buttons-container" class="buttons-container">${ buttonHTML }</div>
                <div id="card-fields-container" class="card-fields-container"></div>

                ${ meta.getSDKLoader({ nonce: cspNonce }) }
                <script nonce="${ cspNonce }">${ client.script }</script>
                <script nonce="${ cspNonce }">spb.setupButton(${ safeJSON({ fundingEligibility, buyerCountry, cspNonce, merchantID, personalization, isCardFieldsExperimentEnabled, firebaseConfig }) })</script>
                ${ shouldRenderFraudnet({ fundingEligibility }) ? renderFraudnetScript({ id: buttonSessionID, cspNonce, env }) : '' }
            </body>
        `;

        allowFrame(res);
        return htmlResponse(res, pageHTML);
    });
}

