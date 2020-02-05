/* @flow */

import render from 'preact-render-to-string';

import { clientErrorResponse, htmlResponse, allowFrame, defaultLogger, safeJSON, sdkMiddleware, type ExpressMiddleware, graphQLBatch, type GraphQL } from '../../lib';
import { getParams } from './params';
import { resolveCheckoutSession } from '../../service';
import { EVENT } from './constants';
import { getSmartWalletClientScript } from './script';

export function getWalletMiddleware({ logger, graphQL }) {
    return sdkMiddleware({ logger }, async ({ req, res, params, meta, logBuffer, sdkMeta }) => {
        // logger.info(req, EVENT.RENDER);
        if (logBuffer) {
            logBuffer.flush(req);
        }
    
        const { clientID, orderID, accessToken, cspNonce, debug, style } = getParams(params, req, res);
        const clientPromise = await getSmartWalletClientScript({ debug, logBuffer });
    
        // const gqlBatch = graphQLBatch(req, graphQL);
        // const checkoutSessionPromise = resolveCheckoutSession(req, gqlBatch, { logger, accessToken, orderID });
    
        // gqlBatch.flush();
        
        const client = await clientPromise;
        // const checkoutSession = await checkoutSessionPromise;
        const result = {
            "data": {
                "checkoutSession": {
                    "fundingOptions": [
                        {
                            "id": "CC-RUKPVJL6359RW",
                            "fundingInstrument": {
                                "id": "CC-RUKPVJL6359RW",
                                "name": "VISA",
                                "issuerProductDescription": "The Bank Card Platinum Rewards",
                                "type": "CREDIT_CARD",
                                "instrumentSubType": "CREDIT",
                                "lastDigits": "8558",
                                "image": {
                                    "url": {
                                        "href": "https://msmaster.qa.paypal.com:14870/v1/content/media-containers/PICS/cdn-assets//00/s/MjU2WDI1NlhQTkc/p/MTAzMmFmNmEtNzJlMi00NDg5LWFkM2EtZGY4NzgwNTQyNWQ3/image_0.png"
                                    },
                                    "width": "96",
                                    "height": "96"
                                },
                                "isPreferred": false
                            },
                            "allPlans": [
                                {
                                    "id": "0584975021f6f9a37eaf31971bb52d90",
                                    "fundingSources": [
                                        {
                                            "fundingInstrument": {
                                                "id": "CC-RUKPVJL6359RW",
                                                "name": "VISA",
                                                "type": "CREDIT_CARD",
                                                "instrumentSubType": "CREDIT",
                                                "lastDigits": "8558"
                                            },
                                            "fundingMethodType": "INSTANT",
                                            "delayedPaymentDate": null,
                                            "amount": {
                                                "currencyCode": "USD",
                                                "currencyValue": "0.01",
                                                "currencyFormatSymbolISOCurrency": "$0.01 USD",
                                                "currencyFormat": "$0.01"
                                            },
                                            "groupedSources": null
                                        }
                                    ],
                                    "isSelected": true,
                                    "backupFundingInstrument": null,
                                    "currencyConversion": null,
                                    "preAuthorizationData": {
                                        "authType": "FULL",
                                        "amount": {
                                            "currencyFormatSymbolISOCurrency": "$0.01 USD"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "id": "CC-QMHLG9FE97UNL",
                            "fundingInstrument": {
                                "id": "CC-QMHLG9FE97UNL",
                                "name": "VISA",
                                "issuerProductDescription": "The Bank Card Platinum Rewards",
                                "type": "CREDIT_CARD",
                                "instrumentSubType": "CREDIT",
                                "lastDigits": "8558",
                                "image": {
                                    "url": {
                                        "href": "https://msmaster.qa.paypal.com:14870/v1/content/media-containers/PICS/cdn-assets//00/s/MjU2WDI1NlhQTkc/p/MTAzMmFmNmEtNzJlMi00NDg5LWFkM2EtZGY4NzgwNTQyNWQ3/image_0.png"
                                    },
                                    "width": "96",
                                    "height": "96"
                                },
                                "isPreferred": false
                            },
                            "allPlans": [
                                {
                                    "id": "754f133c14e571ba080c23c9ff068341",
                                    "fundingSources": [
                                        {
                                            "fundingInstrument": {
                                                "id": "CC-QMHLG9FE97UNL",
                                                "name": "VISA",
                                                "type": "CREDIT_CARD",
                                                "instrumentSubType": "CREDIT",
                                                "lastDigits": "8558"
                                            },
                                            "fundingMethodType": "INSTANT",
                                            "delayedPaymentDate": null,
                                            "amount": {
                                                "currencyCode": "USD",
                                                "currencyValue": "0.01",
                                                "currencyFormatSymbolISOCurrency": "$0.01 USD",
                                                "currencyFormat": "$0.01"
                                            },
                                            "groupedSources": null
                                        }
                                    ],
                                    "isSelected": false,
                                    "backupFundingInstrument": null,
                                    "currencyConversion": null,
                                    "preAuthorizationData": {
                                        "authType": "FULL",
                                        "amount": {
                                            "currencyFormatSymbolISOCurrency": "$0.01 USD"
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            },
            "extensions": {
                "developerNotes": [
                    "Please include an 'x-app-name' header with your request that identifies your client.  (Ex: 'x-app-name': 'hermione')"
                ],
                "correlationId": "c7e8f4824f717"
            }
        };
        const checkoutSession = result.data.checkoutSession;
        // const { fundingOptions } = checkoutSession;
        // console.log('the checkout session is: ', checkoutSession);
        
        
        const walletStyle = "";
        
        const spb = require('../../../dist/smart-wallet');
        
        // const Wallet = spb.Wallet({ cspNonce, fundingOptions, style });
        const walletHTML = '';//render(Wallet);
        
        
        const pageHTML = `
            <!DOCTYPE html>
            <head></head>
            <body data-nonce="${ cspNonce }" data-client-version="${ client.version }" data-render-version="${ render.version }">
                <style nonce="${ cspNonce }">${ walletStyle }</style>
                
                <div id="wallet-container" class="wallet-container">${ walletHTML }</div>
                ${ meta.getSDKLoader({ nonce: cspNonce }) }
                <script nonce="${ cspNonce }">${ client.script }</script>
                <script nonce="${ cspNonce }">spb.setupWallet(${ safeJSON({ cspNonce, checkoutSession, style }) })</script>
            </body>
        `;
        return htmlResponse(res, pageHTML);
    })
}
