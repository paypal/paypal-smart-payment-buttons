/* @flow */
/** @jsx h */

import { h, type Node } from 'preact';

import type { CheckoutSessionType } from '../../../types';
import { Style } from '../../style';

import styles from './style.scoped.scss';

type CreditBannerProps = {|
    checkoutSession : CheckoutSessionType
|};

// TODO: UED currently exploring banner design
export const CreditBanner = ({ checkoutSession } : CreditBannerProps) : Node => {
    const { creditPPCOffers } = checkoutSession;

    // Only render banner if user does not have Credit in the wallet
    if (creditPPCOffers.length === 0 || creditPPCOffers[0].content.OfferCategory !== 'ACQ') {
        return null;
    }

    const { content, trackingDetails } = creditPPCOffers[0];
    // Prominent banners only have OfferText1
    const headline = content.OfferText2 ? content.OfferText1 : 'Apply for PayPal Credit';
    const body = content.OfferText2 || content.OfferText1;

    const handleBannerClick = () => {
        // TODO: Open CAPE flow and on return redirect into installments component.
        const beacon = new window.Image();
        beacon.src = trackingDetails.clickUrl.href;
    };

    return (
        <Style css={ styles }>
            <button type="button" className={ `banner ${ content.PresentmentStyle === 'Prominent' ? 'prominent' : '' }` } onClick={ handleBannerClick }>
                <div className="icon-wrapper">
                    {/* TODO: Get actual icons from UED */}
                    <img className="icon" src="https://via.placeholder.com/96x60.png?text=PayPal+Credit" alt="" />
                </div>
                <div className="content">
                    <p className="headline">{ headline }</p>
                    <p className="body">{ body }</p>
                    <p className="terms">
                        { content.TermsText }{' '}
                        <a href={ content.TermsLink } target="__blank">{ content.TermsLinkText }</a>
                    </p>
                </div>
            </button>
            <img src={ trackingDetails.impressionUrl.href } />
        </Style>
    );
};
