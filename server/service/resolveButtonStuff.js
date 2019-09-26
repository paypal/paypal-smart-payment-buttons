/* @flow */
import { COUNTRY, CURRENCY, INTENT, COMMIT, VAULT, CARD, FUNDING } from '@paypal/sdk-constants';

import type { ExpressRequest, LoggerType, LocaleType } from '../types';

type VaultedInstrument = {|

|};

type VaultedInstruments = $ReadOnlyArray<VaultedInstrument>;

export type FundingEligibility = {|
    paypal : {
        eligible : boolean,
        vaultedInstruments ? : VaultedInstruments
    },
    venmo ? : {
        eligible : boolean,
        vaultedInstruments? : VaultedInstruments
    },
    itau ? : {
        eligible : boolean,
        vaultedInstruments? : VaultedInstruments
    },
    card : {
        vendors : {
            visa : {
                vaultedInstruments ? : VaultedInstruments
            },
            mastercard : {
                vaultedInstruments ? : VaultedInstruments
            },
            amex : {
                vaultedInstruments ? : VaultedInstruments
            },
            discover ? : {
                vaultedInstruments? : VaultedInstruments
            }
        }
    }
|};
export type CheckoutCustomization = {|
    buttonText : ?{
        text : string,
        tracking : {
            impression : string,
            click : string
        }
    },
    tagline : ?{
        text : string,
        tracking : {
            impression : string,
            click : string
        }
    }
|};
export type GQLResponse = {|
    fundingEligibility : FundingEligibility,
    checkoutCustomization? : ?CheckoutCustomization
|};

export type GetButtonStuff = (
        req : ExpressRequest, {
        clientId : string,
        merchantId : ?$ReadOnlyArray<string>,
        buttonSessionId : string,
        buyerCountry : ?$Values<typeof COUNTRY>,
        cookies : string,
        ip : string,
        currency : $Values<typeof CURRENCY>,
        intent : $Values<typeof INTENT>,
        commit : $Values<typeof COMMIT>,
        vault : $Values<typeof VAULT>,
        disableFunding : $ReadOnlyArray<?$Values<typeof FUNDING>>,
        disableCard : $ReadOnlyArray<?$Values<typeof CARD>>,
        userAgent : string,
        clientAccessToken : ?string,
        locale : LocaleType,
        buttonLabel : ?string,
        installmentPeriod : ?string
}) => Promise<GQLResponse>;

export type GQLArgumentsOptions = {|
    getButtonStuff : GetButtonStuff,
    logger : LoggerType,
    clientID : string,
    merchantID : ?$ReadOnlyArray<string>,
    buttonSessionID : string,
    currency : $Values<typeof CURRENCY>,
    intent : $Values<typeof INTENT>,
    commit : $Values<typeof COMMIT>,
    vault : $Values<typeof VAULT>,
    disableFunding : $ReadOnlyArray<?$Values<typeof FUNDING>>,
    disableCard : $ReadOnlyArray<?$Values<typeof CARD>>,
    clientAccessToken : ?string,
    buyerCountry : ?$Values<typeof COUNTRY>,
    locale : LocaleType,
    defaultFundingEligibility : FundingEligibility,
    buttonLabel : ?string,
    installmentPeriod : ?string
|};

export async function resolveButtonStuff(req : ExpressRequest, { getButtonStuff, logger, clientID: clientId, merchantID: merchantId, buttonSessionID: buttonSessionId, currency, intent, commit, vault, disableFunding, disableCard, clientAccessToken, buyerCountry, locale, defaultFundingEligibility, buttonLabel, installmentPeriod } : GQLArgumentsOptions) : Promise<GQLResponse> {
    try {
        const ip = req.ip;
        const cookies = req.get('cookie') || '';
        const userAgent = req.get('user-agent') || '';
        
        return await getButtonStuff(req, {
            clientId, merchantId, buyerCountry, cookies, ip, currency, intent, commit,
            vault, disableFunding, disableCard, userAgent, buttonSessionId, clientAccessToken, locale,
            buttonLabel, installmentPeriod });
        
    } catch (err) {
        logger.error(req, 'spb_gql_query_error_fallback', { err: err.stack ? err.stack : err.toString() });
        return {
            fundingEligibility:    defaultFundingEligibility
        };
    }
}
