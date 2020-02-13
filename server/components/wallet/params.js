/* @flow */

import { ENV, DEFAULT_COUNTRY, COUNTRY_LANGS } from '@paypal/sdk-constants';

import type { ExpressRequest, ExpressResponse, LocaleType } from '../../types';

function getNonce(res : ExpressResponse) : string {
    let nonce = res.locals && res.locals.nonce;
    
    if (!nonce || typeof nonce !== 'string') {
        nonce = '';
    }
    
    return nonce;
}

type StyleType = {|
    height : number
|};

type ParamsType = {|
    env : $Values<typeof ENV>,
    clientID : ?string,
    orderID : ?string,
    buyerAuthCode : ?string,
    buyerAccessToken : ?string,
    locale? : LocaleType,
    debug? : boolean,
    style : StyleType
|};

type RequestParams = {|
    env : $Values<typeof ENV>,
    buyerAuthCode : ?string,
    buyerAccessToken : ?string,
    clientID : ?string,
    orderID : ?string,
    cspNonce : string,
    locale : LocaleType,
    debug : boolean,
    style : StyleType
|};

export function getParams(params : ParamsType, req : ExpressRequest, res : ExpressResponse) : RequestParams {
    // adding access token in params for easy development until we have a clear path on how we would be doing access code to access token exchange
    const {
        env,
        clientID,
        orderID,
        buyerAuthCode,
        buyerAccessToken,
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
        buyerAuthCode,
        buyerAccessToken,
        cspNonce,
        debug,
        locale: { country, lang },
        style
    };
}

