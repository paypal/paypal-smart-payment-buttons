/* @flow */
/** @jsx h */

import { h, type Node } from 'preact';

import type { CheckoutSession, FundingOptionType } from '../../types';
import { CreditBanner } from '../credit';
import { Wallet } from '../wallet';
import { Style } from '../style';

import styles from './style.scss';

type PageProps = {|
    checkoutSession : CheckoutSession,
    selectedWalletItem : FundingOptionType,
    setSelectedWalletItem : (fi : FundingOptionType) => void
|};

export const Page = ({ checkoutSession, selectedWalletItem, setSelectedWalletItem } : PageProps) : Node => (
    <Style css={ styles }>
        <Wallet checkoutSession={ checkoutSession } selectedWalletItem={ selectedWalletItem } setSelectedWalletItem={ setSelectedWalletItem } />
        <CreditBanner checkoutSession={ checkoutSession } />
    </Style>
);
