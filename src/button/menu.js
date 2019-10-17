/* @flow */

import { onClick as onElementClick, destroyElement, memoize } from 'belter/src';
import { FUNDING } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { renderSmartMenu } from '../menu/interface';
import { CHECKOUT_POPUP_DIMENSIONS, type Payment } from '../payment-flows';
import { deleteVault, validatePaymentMethod } from '../api';
import { DATA_ATTRIBUTES } from '../constants';

import { type Props } from './props';
import { enableLoadingSpinner, disableLoadingSpinner } from './dom';

const MENU_CHOICE = {
    DELETE_VAULT:            'DELETE_VAULT',
    SELECT_FUNDING_SHIPPING: 'SELECT_FUNDING_SHIPPING',
    CHANGE_ACCOUNT:          'CHANGE_ACCOUNT'
};

const popup = {
    width:  CHECKOUT_POPUP_DIMENSIONS.WIDTH,
    height: CHECKOUT_POPUP_DIMENSIONS.HEIGHT
};

const PAYPAL_CHOICES = [
    {
        id:    MENU_CHOICE.SELECT_FUNDING_SHIPPING,
        label: 'Choose card or shipping address',
        popup
    },
    {
        id:    MENU_CHOICE.CHANGE_ACCOUNT,
        label: 'Use a different account',
        popup
    },
    {
        id:    MENU_CHOICE.DELETE_VAULT,
        label: 'Unlink your saved account'
    }
];

const CARD_CHOICES = [
    {
        id:    MENU_CHOICE.DELETE_VAULT,
        label: 'Unlink your saved card'
    }
];

type ButtonDropdownProps = {|
    payment : Payment,
    props : Props,
    handlePaymentClick : ({ payment : Payment }) => ZalgoPromise<void>
|};

let smartMenu;

export function renderButtonDropdown({ props, payment, handlePaymentClick } : ButtonDropdownProps) {
    const { clientID, clientAccessToken, enableThreeDomainSecure, buttonSessionID, partnerAttributionID } = props;
    const { button, fundingSource, paymentMethodID } = payment;
    const menuToggle = button.querySelector(`[${ DATA_ATTRIBUTES.MENU }]`);

    if (clientID && menuToggle && paymentMethodID && clientAccessToken) {
        smartMenu = smartMenu || renderSmartMenu({ clientID });

        onElementClick(menuToggle, event => {
            event.preventDefault();
            event.stopPropagation();

            const choices = (fundingSource === FUNDING.PAYPAL)
                ? PAYPAL_CHOICES
                : CARD_CHOICES;

            const verticalOffset = button.getBoundingClientRect().bottom;
            const loadingTimeout = setTimeout(() => enableLoadingSpinner(button), 50);

            smartMenu.display({
                choices,
                verticalOffset,
                onChoose: ({ id, win }) => {
                    if (id === MENU_CHOICE.CHANGE_ACCOUNT) {
                        return handlePaymentClick({ payment: { ...payment, win } });

                    } else if (id === MENU_CHOICE.DELETE_VAULT) {
                        if (!clientAccessToken || !paymentMethodID) {
                            throw new Error(`Can not delete vault without client access token and payment method id`);
                        }

                        enableLoadingSpinner(button);
                        return deleteVault({ paymentMethodID, clientAccessToken }).then(() => {
                            disableLoadingSpinner(button);
                            destroyElement(button);
                        });

                    } else if (id === MENU_CHOICE.SELECT_FUNDING_SHIPPING) {
                        if (!clientAccessToken || !paymentMethodID) {
                            throw new Error(`Can not change funding or shipping without client access token and payment method id`);
                        }

                        const decorateCreateOrder = (createOrder) => {
                            return memoize(() => {
                                return createOrder().then(orderID => {
                                    return validatePaymentMethod({
                                        clientAccessToken, orderID, paymentMethodID, enableThreeDomainSecure, buttonSessionID, partnerAttributionID
                                    }).then(({ status }) => {
                                        if (status !== 200) {
                                            throw new Error(`Validate payment failed with status: ${ status }`);
                                        }

                                        return orderID;
                                    });
                                });
                            });
                        };

                        return handlePaymentClick({ payment: { ...payment, win, decorateCreateOrder } });
                    }
                }
            }).then(() => {
                clearTimeout(loadingTimeout);
                disableLoadingSpinner(button);
            });
        });
    }
}
