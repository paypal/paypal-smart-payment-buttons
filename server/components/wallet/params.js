/* @flow */

import { ENV, DEFAULT_COUNTRY, COUNTRY_LANGS } from '@paypal/sdk-constants';

import type { ExpressRequest, ExpressResponse, LocaleType } from '../../types';

function getNonce(res) {
    let nonce = res.locals && res.locals.nonce;
    
    if (!nonce || typeof nonce !== 'string') {
        nonce = '';
    }
    
    return nonce;
}


export function getParams(params, req, res) {
    // adding access token in params for easy development until we have a clear path on how we would be doing access code to access token exchange
    const {
        env,
        clientID,
        orderID,
        accessCode,
        accessToken,
        locale = {},
        debug = false,
        style
    } = params;
    
    const {
        country = DEFAULT_COUNTRY,
        lang = COUNTRY_LANGS[country][0]
    } = locale;
    
    const cspNonce = getNonce(res);
    
    return {
        env,
        clientID,
        orderID,
        accessCode,
        accessToken,
        cspNonce,
        debug,
        locale: { country, lang },
        style
    };
}

