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
    
        const gqlBatch = graphQLBatch(req, graphQL);
        const checkoutSessionPromise = resolveCheckoutSession(req, gqlBatch, { logger, accessToken, orderID });
    
        gqlBatch.flush();
        
        const client = await clientPromise;
        const checkoutSession = await checkoutSessionPromise;
        
        // const checkoutSession = result.data.checkoutSession;
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
