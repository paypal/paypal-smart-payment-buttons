/* @flow */

import { undotify } from 'belter';
import { unpackSDKMeta } from '@paypal/sdk-client';
import { html } from 'jsx-pragmatic';

import { EVENT } from '../config';
import { serverErrorResponse, clientErrorResponse, htmlResponse, allowFrame, defaultLogger, safeJSON } from '../lib';
import { renderFraudnetScript, shouldRenderFraudnet, resolveFundingEligibility, resolvePersonalization } from '../service';
import type { ExpressRequest, ExpressResponse, LoggerType, ClientIDToMerchantID } from '../types';

import { getSmartButtonClientScript, getSmartButtonRenderScript, startWatchers } from './watcher';
import { getParams } from './params';
import { buttonStyle } from './style';

type ButtonMiddlewareOptions = {|
    logger? : LoggerType,
    getFundingEligibility : Function,
    getPersonalization : Function,
    clientIDToMerchantID : ClientIDToMerchantID,
    getInlineGuestExperiment? : (req : ExpressRequest, params : Object) => Promise<boolean>
|};

export function getButtonMiddleware({ logger = defaultLogger, getFundingEligibility, getPersonalization, clientIDToMerchantID, getInlineGuestExperiment = () => Promise.resolve(false) } : ButtonMiddlewareOptions = {}) : (req : ExpressRequest, res : ExpressResponse) => Promise<void> {
    startWatchers();

    return async function buttonMiddleware(req : ExpressRequest, res : ExpressResponse) : Promise<void> {
        try {
            logger.info(EVENT.RENDER);

            const params = undotify(req.query);
            let { env, clientID, buttonSessionID, cspNonce, debug, buyerCountry, disableFunding, disableCard,
                merchantID, currency, intent, commit, vault, clientAccessToken, defaultFundingEligibility, locale } = getParams(params, req, res);

            const sdkMeta = req.query.sdkMeta || '';
            let meta;

            try {
                if (typeof sdkMeta !== 'string') {
                    throw new TypeError(`Expected sdkMeta to be a string`);
                }

                meta = unpackSDKMeta(req.query.sdkMeta);
            } catch (err) {
                logger.warn(req, 'bad_sdk_meta', { sdkMeta, err: err.stack ? err.stack : err.toString() });
                return clientErrorResponse(res, `Invalid sdk meta: ${ sdkMeta.toString() }`);
            }

            const { getSDKLoader } = meta;

            const [ client, render ] = await Promise.all([
                getSmartButtonClientScript({ debug }),
                getSmartButtonRenderScript()
            ]);

            logger.info(req, `button_client_version_${ client.version }`);
            logger.info(req, `button_render_version_${ render.version }`);
            logger.info(req, `button_params`, { params: JSON.stringify(params) });

            // call inline guest experiment
            const isCardFieldsEnabled = await getInlineGuestExperiment(
                req,
                getParams(params, req, res),
            );

            /*
            
            let fundingEligibility;
            
            try {
                const ip = req.ip;
                const cookies = req.get('cookie');
                const userAgent = req.get('user-agent');
                const clientId = clientID;
                const merchantId = merchantID;
                const buttonSessionId = buttonSessionID;

                fundingEligibility = await getFundingEligibility(req, {
                    clientId, merchantId, buyerCountry, cookies, ip, currency, intent, commit,
                    vault, disableFunding, disableCard, userAgent, buttonSessionId, clientAccessToken });

            } catch (err) {
                logger.error(req, 'gql_errored_for_fundingEligibility', { err: err.stack ? err.stack : err.toString() });
                fundingEligibility = {
                    paypal: {
                        eligible: true
                    },
                    card: {
                        eligible: true,
                        branded:  true,
                        vendors:  {
                            visa: {
                                eligible: true
                            },
                            mastercard: {
                                eligible: true
                            },
                            amex: {
                                eligible: true
                            }
                        }
                    }
                };
            }

            */

            if (!clientID) {
                return clientErrorResponse(res, 'Please provide a clientID query parameter');
            }

            const [ fundingEligibility, personalization, clientMerchantID ] = await Promise.all([
                resolveFundingEligibility(req, { getFundingEligibility, logger, clientID, merchantID, buttonSessionID,
                    currency, intent, commit, vault, disableFunding, disableCard, clientAccessToken, buyerCountry, defaultFundingEligibility }),

                resolvePersonalization(req, { getPersonalization, logger, clientID, merchantID, buyerCountry, locale, buttonSessionID }),

                merchantID ? null : clientIDToMerchantID(req, clientID)
            ]);

            if (!merchantID && clientMerchantID) {
                merchantID = [ clientMerchantID ];
            }

            const buttonHTML = render.button.Buttons({
                ...params, nonce: cspNonce, csp:   { nonce: cspNonce }, fundingEligibility, personalization, isCardFieldsEnabled
            }).render(html());

            const pageHTML = `
                <body data-nonce="${ cspNonce }" data-client-version="${ client.version }" data-render-version="${ render.version }">
                    <style nonce="${ cspNonce }">
                        ${ buttonStyle }
                    </style>
                    <div id="buttons-container" class="buttons-container">
                        ${ buttonHTML }
                    </div>
                    <div id="card-fields-container" class="card-fields-container"></div>
                    ${ getSDKLoader({ nonce: cspNonce }) }
                    <script nonce="${ cspNonce }">${ client.script }</script>
                    <script nonce="${ cspNonce }">spb.setupButton(${ safeJSON({ fundingEligibility, buyerCountry, cspNonce, merchantID, isCardFieldsEnabled }) })</script>
                    ${ shouldRenderFraudnet({ fundingEligibility }) ? renderFraudnetScript({ id: buttonSessionID, cspNonce, env }) : '' }
                </body>
            `;

            allowFrame(res);
            return htmlResponse(res, pageHTML);

        } catch (err) {
            console.error(err.stack ? err.stack : err); // eslint-disable-line no-console
            logger.error(req, EVENT.ERROR, { err: err.stack ? err.stack : err.toString() });
            return serverErrorResponse(res, err.stack ? err.stack : err.toString());
        }
    };
}

