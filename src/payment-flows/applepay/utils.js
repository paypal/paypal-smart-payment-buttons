/* @flow */

import { COUNTRY } from '@paypal/sdk-constants/src';

import { type DetailedOrderInfo } from '../../api';
import type { ApplePayError, ApplePayPaymentContact, ApplePayMerchantCapabilities, ApplePayPaymentRequest, ApplePaySupportedNetworks, ApplePayShippingMethod, ShippingAddress, ShippingMethod, Shipping_Address } from '../types';

type ValidNetworks = {|
    discover : ApplePaySupportedNetworks,
    visa : ApplePaySupportedNetworks,
    mastercard : ApplePaySupportedNetworks,
    amex : ApplePaySupportedNetworks,
    jcb : ApplePaySupportedNetworks,
    chinaunionpay : ApplePaySupportedNetworks
|};

const validNetworks : ValidNetworks = {
    discover:       'discover',
    visa:           'visa',
    mastercard:     'masterCard',
    amex:           'amex',
    jcb:            'jcb',
    chinaunionpay:  'chinaUnionPay'
};

function getSupportedNetworksFromIssuers(issuers : $ReadOnlyArray<string>) : $ReadOnlyArray<ApplePaySupportedNetworks> {
    if (!issuers || (issuers && issuers.length === 0)) {
        return [];
    }

    const validIssuers = [];
    function validateIssuers(issuer : string) : ?ApplePaySupportedNetworks {
        const network = issuer.toLowerCase().replace(/_/g, '');
        if (Object.keys(validNetworks).indexOf(network) !== -1) {
            validIssuers.push(validNetworks[network]);
        }
    }

    issuers.forEach(validateIssuers);
    return validIssuers;
}

function getShippingContactFromAddress(shippingAddress : ?ShippingAddress) : ApplePayPaymentContact {
    if (!shippingAddress) {
        return {
            givenName:          '',
            familyName:         '',
            addressLines:       [],
            locality:           '',
            administrativeArea: '',
            postalCode:         '',
            country:            ''
        };
    }

    const { firstName, lastName, line1, line2, city, state, postalCode, country } = shippingAddress;

    return {
        givenName:    firstName,
        familyName:   lastName,
        addressLines: [
            line1,
            line2
        ],
        locality:           city,
        administrativeArea: state,
        postalCode,
        country
    };
}

function getApplePayShippingMethods(shippingMethods : ?$ReadOnlyArray<ShippingMethod>) : $ReadOnlyArray<ApplePayShippingMethod> {
    if (!shippingMethods || shippingMethods.length === 0) {
        return [];
    }

    const result = [ ...shippingMethods ].sort(method => {
        return method.selected ? -1 : 0;
    }).map(method => {
        return {
            amount:     method.amount && method.amount.currencyValue ? method.amount.currencyValue : '0.00',
            detail:     '',
            identifier: method.type,
            label:      method.label
        };
    });

    return result;
}

function getMerchantCapabilities(supportedNetworks : $ReadOnlyArray<ApplePaySupportedNetworks>) : $ReadOnlyArray<ApplePayMerchantCapabilities> {
    const merchantCapabilities : Array<ApplePayMerchantCapabilities> = [];
    merchantCapabilities.push('supports3DS');
    merchantCapabilities.push('supportsCredit');
    merchantCapabilities.push('supportsDebit');

    if (supportedNetworks && supportedNetworks.indexOf('chinaUnionPay') !== -1) {
        merchantCapabilities.push('supportsEMV');
    }

    return merchantCapabilities;
}

export function createApplePayRequest(countryCode : $Values<typeof COUNTRY>, order : DetailedOrderInfo) : ApplePayPaymentRequest {
    const {
        allowedCardIssuers,
        cart: {
            amounts: {
                shippingAndHandling: {
                    currencyValue: shippingValue
                },
                tax: {
                    currencyValue: taxValue
                },
                total: {
                    currencyCode,
                    currencyValue: totalValue
                }
            },
            shippingAddress,
            shippingMethods
        }
    } = order.checkoutSession;

    const supportedNetworks = getSupportedNetworksFromIssuers(allowedCardIssuers);
    const shippingContact = getShippingContactFromAddress(shippingAddress);
    const applePayShippingMethods = getApplePayShippingMethods(shippingMethods);
    const merchantCapabilities = getMerchantCapabilities(supportedNetworks);

    const selectedShippingMethod = shippingMethods && shippingMethods.length ? shippingMethods.filter(method => method.selected)[0] : null;

    const result = {
        countryCode,
        currencyCode,
        merchantCapabilities,
        supportedNetworks,
        requiredBillingContactFields: [
            'postalAddress',
            'name',
            'phone'
        ],
        requiredShippingContactFields: [
            'postalAddress',
            'name',
            'phone',
            'email'
        ],
        shippingContact: shippingContact && shippingContact.givenName ? shippingContact : {},
        shippingMethods: applePayShippingMethods && applePayShippingMethods.length ? applePayShippingMethods : [],
        lineItems:       [],
        total:           {
            label:  'Total',
            amount: totalValue,
            type:   'final'
        }
    };

    if (taxValue && taxValue.length) {
        result.lineItems.push({
            label:  'Sales Tax',
            amount: taxValue
        });
    }

    if (shippingValue && shippingValue.length) {
        result.lineItems.push({
            label:  'Shipping',
            amount: shippingValue
        });
    }

    if (selectedShippingMethod && selectedShippingMethod.type === 'PICKUP') {
        result.requiredShippingContactFields = [];
    }

    return result;
}

export function isJSON(json : Object) : boolean {
    try {
        JSON.parse(json);
        return true;
    } catch {
        return false;
    }
}

type ShippingContactValidation = {|
    errors : $ReadOnlyArray<ApplePayError>,
    shipping_address : Shipping_Address
|};

export function validateShippingContact(contact : ApplePayPaymentContact) : ShippingContactValidation {
    const errors = [];

    if (!contact.addressLines || !contact.addressLines.length) {
        errors.push({
            code:           'shippingContactInvalid',
            contactField:   'postalAddress',
            message:        'Address is invalid'
        });
    }
    
    if (!contact.locality) {
        errors.push({
            code:           'shippingContactInvalid',
            contactField:   'postalAddress',
            message:        'City is invalid'
        });
    }

    if (!contact.administrativeArea) {
        errors.push({
            code:           'shippingContactInvalid',
            contactField:   'postalAddress',
            message:        'State is invalid'
        });
    }
    const country_code : ?$Values<typeof COUNTRY> = contact.countryCode ? COUNTRY[contact.countryCode.toUpperCase()] : null;
    if (!country_code) {
        errors.push({
            code:           'shippingContactInvalid',
            contactField:   'postalAddress',
            message:        'Country code is invalid'
        });
    }

    if (!contact.postalCode) {
        errors.push({
            code:           'shippingContactInvalid',
            contactField:   'postalAddress',
            message:        'Postal code is invalid'
        });
    }

    const shipping_address = {
        city:         contact.locality,
        state:        contact.administrativeArea,
        country_code,
        postal_code:  contact.postalCode
    };

    // $FlowFixMe
    return { errors, shipping_address };
}
