/* @flow */
/** @jsx node */

import { COUNTRY, CURRENCY, INTENT, COMMIT, VAULT } from '@paypal/sdk-constants';
import { node, type ComponentFunctionType } from 'jsx-pragmatic';
import { LOGO_COLOR, PPLogo, PayPalLogo } from '@paypal/sdk-logos';

import { placeholderToJSX, type GraphQLBatchCall } from '../lib';
import type { ExpressRequest, LocaleType, LoggerType } from '../types';

type PersonalizationComponentProps = {|
   logoColor : $Values<typeof LOGO_COLOR>,
   period : ?number
|};

type Personalization = {|
    buttonText? : {|
        text : string,
        Component : ?ComponentFunctionType<PersonalizationComponentProps>,
        tracking : {|
            impression : string,
            click : string
        |}
    |},
    tagline? : {|
        text : string,
        Component : ?ComponentFunctionType<PersonalizationComponentProps>,
        tracking : {|
            impression : string,
            click : string
        |}
    |}
|};

const PERSONALIZATION_QUERY = `
    query GetPersonalization(
        $clientID: String,
        $buyerCountry: CountryCodes,
        $ip: String,
        $cookies: String,
        $currency: SupportedCountryCurrencies,
        $intent: FundingEligibilityIntent,
        $commit: Boolean,
        $vault: Boolean,
        $merchantID: [String],
        $buttonSessionID: String,
        $userAgent: String,
        $locale: LocaleInput!,
        $label: ButtonLabels,
        $period: String
    ) {
        checkoutCustomization(
            clientId: $clientID,
            merchantId: $merchantID,
            currency: $currency,
            commit: $commit,
            intent: $intent,
            vault: $vault,
            buyerCountry: $buyerCountry,
            ip: $ip,
            cookies: $cookies,
            buttonSessionId: $buttonSessionID,
            userAgent: $userAgent,
            locale: $locale,
            buttonLabel: $label,
            installmentPeriod: $period
        ) {
            tagline {
                text
                tracking {
                    impression
                    click
                }
            }
            buttonText {
                text
                tracking {
                    impression
                    click
                }
            }
        }
    }
`;

export type PersonalizationOptions = {|
    logger : LoggerType,
    clientID : string,
    merchantID : ?$ReadOnlyArray<string>,
    locale : LocaleType,
    buyerCountry : $Values<typeof COUNTRY>,
    buttonSessionID : string,
    currency : $Values<typeof CURRENCY>,
    intent : $Values<typeof INTENT>,
    commit : $Values<typeof COMMIT>,
    vault : $Values<typeof VAULT>,
    label : string,
    period : ?number
|};

function getDefaultPersonalization() : Personalization {
    // $FlowFixMe
    return {};
}

const CLASS = {
    TEXT: ('paypal-button-text' : 'paypal-button-text')
};

function contentToJSX(content : string) : ComponentFunctionType<PersonalizationComponentProps> {
    content = content.replace(/\{logo:/g, '{');

    return ({ logoColor, period } : PersonalizationComponentProps = {}) => {
        try {
            return placeholderToJSX(content, {
                text:   (token) => <span class={ CLASS.TEXT }>{token}</span>,
                pp:     () => <PPLogo logoColor={ logoColor } />,
                paypal: () => <PayPalLogo logoColor={ logoColor } />,
                br:     () => <br />,
                period: () => { return period ? period.toString() : null; }
            });
        } catch (err) {
            return null;
        }
    };
}

export async function resolvePersonalization(req : ExpressRequest, gqlBatch : GraphQLBatchCall, personalizationOptions : PersonalizationOptions) : Promise<Personalization> {
    let { logger, clientID, merchantID, locale, buyerCountry, buttonSessionID, currency,
        intent, commit, vault, label, period } = personalizationOptions;

    const ip = req.ip;
    const cookies = req.get('cookie') || '';
    const userAgent = req.get('user-agent') || '';

    intent = intent ? intent.toUpperCase() : intent;
    label = label ? label.toUpperCase() : label;

    try {
        const result = await gqlBatch({
            query:     PERSONALIZATION_QUERY,
            variables: {
                clientID, merchantID, locale, buyerCountry, currency, intent, commit, vault, ip, cookies, userAgent,
                buttonSessionID, label, period
            }
        });

        const personalization = result.checkoutCustomization;

        if (personalization && personalization.tagline && personalization.tagline.text) {
            personalization.tagline.Component = contentToJSX(personalization.tagline.text);
        }

        if (personalization && personalization.buttonText && personalization.buttonText.text) {
            personalization.buttonText.Component = contentToJSX(personalization.buttonText.text);
        }

        return personalization;

    } catch (err) {
        logger.error(req, 'personalization_error_fallback', { err: err.stack ? err.stack : err.toString() });
        return getDefaultPersonalization();
    }
}
