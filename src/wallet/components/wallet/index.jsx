/* @flow */
/** @jsx h */

import { h } from 'preact';
import { useState } from 'preact/hooks';

import type { FundingOptionType } from '../../types';
import WalletItem from '../walletItem';

import { Style } from '../style';

import styles from './style.scoped.scss';

export type CheckoutSessionType = {|
    declinedInstruments : [],
    fundingOptions : $ReadOnlyArray<FundingOptionType>
|};

type WalletProps = {|
    checkoutSession : CheckoutSessionType
|};

const Wallet = ({ checkoutSession } : WalletProps) : Node => {
    const
        { fundingOptions } = checkoutSession,
        [listOpen, setListOpen] = useState(false),
        [selectedWalletItem, setSelectedWalletItem] = useState(fundingOptions[0]);

    const renderSelectedWalletItem = () => {
        return (listOpen)
            ? ""
            : <WalletItem
                fundingOption={ selectedWalletItem }
                selectWalletItemHandler={ setSelectedWalletItem }
                listOpen={ listOpen }
                listOpenHandler={ setListOpen }
            />
    }

    console.log("ITEM", selectedWalletItem);

    const renderWalletOptions = () => {
        return (listOpen)
            ? fundingOptions.map((option) => (
                <WalletItem
                    selected={option.id === selectedWalletItem.id}
                    fundingOption={ option }
                    selectWalletItemHandler={ setSelectedWalletItem }
                    listOpen={ listOpen }
                    listOpenHandler={ setListOpen }
                />
            ))
            : ""
    }

    return (
        <Style css={styles}>
            <div className='wallet'>
                { renderSelectedWalletItem() }
                { renderWalletOptions() }
                <div className="drop-arrow"></div>
            </div>
        </Style>
    )
}

export default Wallet;
