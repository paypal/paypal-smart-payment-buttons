/* @flow */
/** @jsx h */

import { h, render, Fragment, type Node } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { CLASS } from './constants';
import { Item } from './item';
import { Style } from './style';
import { getBody } from '../lib';

type WalletProps = {|
    cspNonce : string,
    checkoutSession : object,
    style : object
|};

export function Wallet({ cspNonce, checkoutSession, style } : WalletProps) : Node {
    const { fundingOptions } = checkoutSession;
    // TODO: implement logic to select either the preferred one or to the first option available
    const isSelected = fundingOptions[0];
    
    const [ listOpen, setListOpen ] = useState(false);
    const [ selectedWalletItem, setSelectedWalletItem ] = useState(isSelected);
    
    return (
        <Fragment>
            <Style
                nonce={ cspNonce }
                style={ style }
            />
            <div class={ CLASS.WRAPPER }>
                <div class={ CLASS.WALLET_SELECTED_FI }>
                    <Item fundingOption={ selectedWalletItem } selectWalletItemHandler={ setSelectedWalletItem }
                          listOpen={ listOpen } listOpenHandler={ setListOpen }/>
                </div>
                {listOpen && (
                    <div class={ CLASS.WALLET_MENU }>
                        {
                            fundingOptions.map(option => {
                                return (
                                    <Item fundingOption={ option } selectWalletItemHandler={ setSelectedWalletItem }
                                          listOpen={ listOpen } listOpenHandler={ setListOpen }/>
                                );
                            })
                        }
                    </div>
                )}
            </div>
        </Fragment>
    );
}

export function setupWallet({ cspNonce, checkoutSession, style }) {
    render(<Wallet cspNonce={ cspNonce } checkoutSession={ checkoutSession } style={ style }/>, getBody());
}