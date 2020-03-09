/* @flow */
/** @jsx h */

import { h } from 'preact';

import type { CreditPPCOfferType } from '../../../types';
import { Style } from '../../style';

import styles from './style.scoped.scss';

type CreditSubTypeProps = {|
    offer : CreditPPCOfferType
|};

export const CreditSubType = ({ offer } : CreditSubTypeProps) => {
    const handleTermsClick = event => {
        // PALA will open up installments component to show terms
        if (offer.content.OfferType !== 'PALA') {
            event.preventDefault();
            event.stopPropagation();
            window.open(offer.content.TermsLink, '_blank');
        }
    };

    // TODO: This content is hardcoded in property files in Hermes. Should this be added to the MORS banner content?
    const detail = (() => {
        switch (offer.content.OfferType) {
        case 'PALA':
            return (
                <span>
                    Enjoy special financing for your purchase.{' '}
                    <a className="link" onClick={ handleTermsClick }>See offers</a>
                </span>
            );
        case 'NI':
            return (
                <span>
                    No interest if paid in full in 6 months.{' '}
                    <a className="link" onClick={ handleTermsClick }>{ offer.content.TermsLinkText }</a>
                </span>
            );
        case 'CORE':
        default:
            return (
                <span>
                    Pay over time for your purchase.{' '}
                    <a className="link" onClick={ handleTermsClick }>{ offer.content.TermsLinkText }</a>
                </span>
            );
        }
    })();

    return (
        <Style css={ styles }>
            {detail}
        </Style>
    );
};
