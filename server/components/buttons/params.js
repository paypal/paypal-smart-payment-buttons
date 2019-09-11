/* @flow */

import { ENV, COUNTRY, CURRENCY, INTENT, COMMIT, VAULT, CARD, FUNDING, DEFAULT_COUNTRY, COUNTRY_LANGS } from '@paypal/sdk-constants';

import { HTTP_HEADER } from '../../config';
import type { FundingEligibility } from '../../service';
import type { ExpressRequest, ExpressResponse, LocaleType } from '../../types';

function getNonce(res : ExpressResponse) : string {
    let nonce = res.locals && res.locals.nonce;

    if (!nonce || typeof nonce !== 'string') {
        nonce = '';
    }

    return nonce;
}

type Enum<T> = {
    [string] : T
};
type ButtonLayoutType = Enum<'horizontal' | 'vertical'>;
type ButtonShapeType = Enum<'horizontal' | 'vertical'>;
type ButtonColorType = Enum<'gold' | 'blue' | 'silver' | 'black' | 'darkblue' | 'transparent' | 'white'>;
type ButtonLabelType = Enum<'paypal' | 'checkout' | 'pay' | 'credit' |
    'card' | 'buynow' | 'installment' | 'venmo' | 'itau' | 'ideal' | 'elv' | 'bancontact' | 'giropay' | 'sofort' | 'eps' | 'mybank' | 'p24' | 'payu' | 'verkkopankki' | 'blik' | 'trustly' | 'maxima' | 'boleto'>;

type ButtonStyleType = {|
    color : ButtonColorType,
    layout : ButtonLayoutType,
    shape : ButtonShapeType,
    label : ButtonLabelType,
    tagline : boolean
|};

type ParamsType = {|
    env : $Values<typeof ENV>,
    clientID : string,
    locale? : LocaleType,
    buyerCountry : ?$Values<typeof COUNTRY>,
    currency : $Values<typeof CURRENCY>,
    intent : $Values<typeof INTENT>,
    commit : $Values<typeof COMMIT>,
    vault : $Values<typeof VAULT>,
    disableFunding : $ReadOnlyArray<?$Values<typeof FUNDING>>,
    disableCard : $ReadOnlyArray<?$Values<typeof CARD>>,
    merchantID? : $ReadOnlyArray<string>,
    buttonSessionID : string,
    clientAccessToken? : string,
    debug? : boolean,
    style? : ButtonStyleType
|};

type RequestParams = {|
    env : $Values<typeof ENV>,
    clientID : ?string,
    buyerCountry : $Values<typeof COUNTRY>,
    currency : $Values<typeof CURRENCY>,
    intent : $Values<typeof INTENT>,
    commit : $Values<typeof COMMIT>,
    vault : $Values<typeof VAULT>,
    disableFunding : $ReadOnlyArray<?$Values<typeof FUNDING>>,
    disableCard : $ReadOnlyArray<?$Values<typeof CARD>>,
    merchantID : ?$ReadOnlyArray<string>,
    buttonSessionID : string,
    clientAccessToken : ?string,
    cspNonce : string,
    defaultFundingEligibility : FundingEligibility,
    locale : LocaleType,
    debug : boolean,
    style? : ButtonStyleType
|};

function getFundingEligibilityParam(req : ExpressRequest) : FundingEligibility {
    const encodedFundingEligibility = req.query.fundingEligibility;

    if (encodedFundingEligibility && typeof encodedFundingEligibility === 'string') {
        return JSON.parse(
            Buffer.from(encodedFundingEligibility, 'base64').toString('utf8')
        );
    }

    // $FlowFixMe
    return {
        [ FUNDING.PAYPAL ]: {
            eligible: true
        }
    };
}

export function getParams(params : ParamsType, req : ExpressRequest, res : ExpressResponse) : RequestParams {
    const {
        env,
        clientID,
        locale = {},
        buyerCountry = (req.get(HTTP_HEADER.PP_GEO_LOC) || COUNTRY.US),
        currency,
        intent,
        commit,
        vault,
        disableFunding,
        disableCard,
        merchantID,
        buttonSessionID,
        clientAccessToken,
        debug = false,
        style
    } = params;

    const {
        country = DEFAULT_COUNTRY,
        lang = COUNTRY_LANGS[country][0]
    } = locale;

    const cspNonce = getNonce(res);

    const defaultFundingEligibility = getFundingEligibilityParam(req);

    return {
        env,
        clientID,
        // $FlowFixMe
        buyerCountry,
        currency,
        intent,
        commit,
        vault,
        disableFunding,
        disableCard,
        merchantID,
        buttonSessionID,
        clientAccessToken,
        defaultFundingEligibility,
        cspNonce,
        debug,
        // $FlowFixMe
        locale: { country, lang },
        style
    };
}
