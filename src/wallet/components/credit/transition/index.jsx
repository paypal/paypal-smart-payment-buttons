/* @flow */
/** @jsx h */

import { h, type Node } from 'preact';
import { useEffect } from 'preact/hooks';

import type { FundingOptionType, CreditPPCOfferType } from '../../../types';
import { Style } from '../../style';

import styles from './style.scoped.scss';

type TransitionProps = {|
    children : Node,
    fundingOption : FundingOptionType,
    creditPPCOffer : CreditPPCOfferType
|};

export const Transition = ({ children, fundingOption, creditPPCOffer } : TransitionProps) : Node => {
    const willTransition = fundingOption.fundingInstrument.instrumentSubType === 'PAYPAL' && creditPPCOffer.content.OfferType === 'PALA';

    useEffect(() => {
        if (willTransition) {
            window.location.replace(`/credit-presentment/smart/installments${ window.location.search }`);
        }
    }, [ fundingOption.id ]);

    return willTransition ? (
        <Style css={ styles }>
            <div className="transition" />
        </Style>
    ) : children;
};
