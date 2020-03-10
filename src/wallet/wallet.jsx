/* @flow */
/** @jsx h */

// eslint-disable-next-line import/no-named-as-default
import renderToString from 'preact-render-to-string';
import { h, render } from 'preact';
import { ZalgoPromise } from 'zalgo-promise/src';
import { useState, useEffect, useRef } from 'preact/hooks';

import { getBody } from '../lib';
import { approveOrder } from '../api';

import type { CheckoutSession, FundingOptionType } from './types';
import { getProps, type WalletProps } from './props';
import { StyleSheet, Page } from './components';

function fallbackToWebCheckout() : ZalgoPromise<void> {
    throw new Error(`Not implemented`);
}

function submitWalletPayment(props : WalletProps, { selectedItem, buyerAccessToken } : { selectedItem : FundingOptionType, buyerAccessToken : string }) : ZalgoPromise<void> {
    const { createOrder, onApprove } = props;
    const planID = selectedItem.allPlans[0].id;
    
    return createOrder().then(orderID => {
        return approveOrder({ orderID, planID, buyerAccessToken });
    }).then(({ payerID }) => {
        return onApprove({ payerID }, { restart: fallbackToWebCheckout });
    });
}

type SetupOptions = {|
    facilitatorAccessToken : string,
    buyerAccessToken : string,
    cspNonce : string,
    checkoutSession : CheckoutSession
|};

type AppProps = {|
    cspNonce : string,
    checkoutSession : CheckoutSession,
    props : WalletProps,
    buyerAccessToken : string
|};

export function useSetup({ props, selectedWalletItem, buyerAccessToken } : { props : WalletProps, selectedWalletItem : FundingOptionType, buyerAccessToken : string }) {
    const walletRef = useRef(selectedWalletItem);
    
    useEffect(() => {
        walletRef.current = selectedWalletItem;
    }, [ selectedWalletItem ]);
    useEffect(() => {
        const { setup } = props;
        if (!props) {
            return;
        }
        const data = {};
        const actions = {
            submit: () => submitWalletPayment(props, { buyerAccessToken, selectedItem: walletRef.current })
        };
        setup(data, actions);
    }, []);
}

export function App({ props, cspNonce, checkoutSession, buyerAccessToken } : AppProps) : Node {
    const { fundingOptions } = checkoutSession;
    const [ selectedWalletItem, setSelectedWalletItem ] = useState(fundingOptions[0]);
    useSetup({ props, selectedWalletItem, buyerAccessToken });
    
    return (
        <StyleSheet cspNonce={ cspNonce }>
            <Page checkoutSession={ checkoutSession } selectedWalletItem={ selectedWalletItem } setSelectedWalletItem={ setSelectedWalletItem } />
        </StyleSheet>
    );
}

export function renderWallet(props : { cspNonce : string, checkoutSession : CheckoutSession }) : string {
    return renderToString(<App { ...props } />);
}

export function setupWallet({ facilitatorAccessToken, buyerAccessToken, cspNonce, checkoutSession } : SetupOptions) {
    const props = getProps({ facilitatorAccessToken });
    
    render(
        <App props={ props } cspNonce={ cspNonce } checkoutSession={ checkoutSession } buyerAccessToken={ buyerAccessToken } />,
        getBody().querySelector('#wallet-container')
    );
}

