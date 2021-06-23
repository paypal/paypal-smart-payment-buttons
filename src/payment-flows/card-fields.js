/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING, CARD, COUNTRY } from '@paypal/sdk-constants/src';
import { memoize, querySelectorAll, debounce } from 'belter/src';

import { CONTEXT, DATA_ATTRIBUTES } from '../constants';
import type { LocaleType, FundingEligibilityType, ProxyWindow } from '../types';
import { unresolvedPromise, promiseNoop } from '../lib';
import type {
    CreateOrder,
    OnApprove,
    OnCancel,
    OnAuth,
    OnShippingChange,
    OnError,
    CreateBillingAgreement,
    CreateSubscription
} from '../button/props';

import { initCheckout } from './checkout';

let cardFieldsOpen = false;

type CardFieldsProps = {|
    buttonSessionID : string,
    fundingSource : $Values<typeof FUNDING>,
    card : ?$Values<typeof CARD>,
    buyerCountry : $Values<typeof COUNTRY>,
    createOrder : CreateOrder,
    createBillingAgreement : ?CreateBillingAgreement,
    createSubscription : ?CreateSubscription,
    onApprove : OnApprove,
    onCancel : OnCancel,
    onAuth : OnAuth,
    onShippingChange : ?OnShippingChange,
    cspNonce : ?string,
    locale : LocaleType,
    commit : boolean,
    onError : OnError,
    vault : boolean,
    clientAccessToken : ?string,
    fundingEligibility : FundingEligibilityType
|};

type CardFieldsInstance = {|
    start : () => ZalgoPromise<void>,
    close : () => ZalgoPromise<void>,
    triggerError : (mixed) => ZalgoPromise<void>
|};

type CardFieldsEligibleProps = {|
    win : ?ProxyWindow,
    vault : boolean,
    fundingSource : $Values<typeof FUNDING>,
    onShippingChange : ?OnShippingChange,
    isCardFieldsExperimentEnabled? : boolean
|};

export function isCardFieldsEligible({ win, vault, onShippingChange, fundingSource, isCardFieldsExperimentEnabled } : CardFieldsEligibleProps) : boolean {
    if (win) {
        return false;
    }

    if (fundingSource !== FUNDING.CARD) {
        return false;
    }

    if (vault) {
        return false;
    }

    if (onShippingChange) {
        return false;
    }

    // if merchant opt-in inline guest, they will ALWAYS see inline guest guest
    if (window.xprops.enableStandardCardFields === true) {
        return true;
    }

    // if merchant doesn't pass the inline guest flag, they will in the ramp
    if (!window.xprops.enableStandardCardFields) {
        if (!isCardFieldsExperimentEnabled) {
            return false;
        } else {
            return true;
        }
    }

    return true;
}

function highlightCard(card : $Values<typeof CARD>) {
    querySelectorAll(`[${ DATA_ATTRIBUTES.CARD }]`).forEach(el => {
        el.style.opacity = (el.getAttribute(DATA_ATTRIBUTES.CARD) === card) ? '1' : '0.1';
    });
}

function unhighlightCards() {
    querySelectorAll(`[${ DATA_ATTRIBUTES.CARD }]`).forEach(el => {
        el.style.opacity = '1';
    });
}

const getElements = () : { buttonsContainer : HTMLElement, cardButtonsContainer : HTMLElement, cardFieldsContainer : HTMLElement } => {
    const buttonsContainer = document.querySelector('#buttons-container');
    const cardButtonsContainer = document.querySelector(`[data-funding-source="${ FUNDING.CARD }"]`);
    const cardFieldsContainer = document.querySelector('#card-fields-container');

    if (!buttonsContainer || !cardButtonsContainer || !cardFieldsContainer) {
        throw new Error(`Did not find card fields elements`);
    }

    return { buttonsContainer, cardButtonsContainer, cardFieldsContainer };
};

const slideUpButtons = () => {
    const { buttonsContainer, cardButtonsContainer, cardFieldsContainer } = getElements();

    if (!buttonsContainer || !cardButtonsContainer || !cardFieldsContainer) {
        throw new Error(`Required elements not found`);
    }

    cardFieldsContainer.style.minHeight = '0px';
    cardFieldsContainer.style.display = 'block';

    const recalculateMargin = () => {
        buttonsContainer.style.marginTop = `${ buttonsContainer.offsetTop - cardButtonsContainer.offsetTop }px`;
    };

    window.addEventListener('resize', debounce(() => {
        buttonsContainer.style.transitionDuration = '0s';
        recalculateMargin();
    }));

    recalculateMargin();
};

const slideDownButtons = () => {
    const { buttonsContainer } = getElements();

    unhighlightCards();
    buttonsContainer.style.marginTop = `0px`;
};

export function initCardFields(props : CardFieldsProps) : CardFieldsInstance {
    const { fundingSource, card, buyerCountry, createOrder, onApprove, onCancel,
        onAuth, onShippingChange, cspNonce, locale, commit, onError, buttonSessionID } = props;

    if (!card) {
        throw new Error(`Card required to render card fields`);
    }

    if (cardFieldsOpen) {
        highlightCard(card);
        return {
            start:        promiseNoop,
            close:        promiseNoop,
            triggerError: promiseNoop
        };
    }

    const restart = memoize(() : ZalgoPromise<void> =>
        initCheckout({ ...props, context: CONTEXT.IFRAME }).start().finally(unresolvedPromise));

    const onClose = () => {
        cardFieldsOpen = false;
        return onCancel();
    };

    const onCardTypeChange = ({ card: cardType }) => {
        highlightCard(cardType);
    };

    const { render, close: closeCardFields, onError: triggerError } = window.paypal.CardFields({
        createOrder,

        fundingSource,
        card,

        onApprove: ({ payerID, paymentID, billingToken }) => {
            // eslint-disable-next-line no-use-before-define
            return close().then(() => {
                return onApprove({ payerID, paymentID, billingToken }, { restart });
            });
        },

        onCancel,
        onError,
        onAuth,
        onClose,
        onShippingChange,
        onCardTypeChange,

        buttonSessionID,
        buyerCountry,
        locale,
        commit,
        cspNonce
    });

    cardFieldsOpen = true;

    const start = () => {
        cardFieldsOpen = true;
        const renderPromise = render('#card-fields-container');
        slideUpButtons();
        highlightCard(card);
        return renderPromise;
    };

    const close = () => {
        slideDownButtons();
        return closeCardFields();
    };

    return { start, close, triggerError };
}
