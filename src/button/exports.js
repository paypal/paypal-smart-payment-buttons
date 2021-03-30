/* @flow */


import { ZalgoPromise } from 'zalgo-promise/src';
import { querySelectorAll } from 'belter/src';

import { DATA_ATTRIBUTES } from '../constants';
import { upgradeFacilitatorAccessToken } from '../api';

import type { ButtonProps } from './props';

type ExportsProps = {|
    props : ButtonProps,
    isEnabled : () => boolean
|};

export function setupExports({ props, isEnabled } : ExportsProps)  {
    const { createOrder, onApprove, onError, onCancel, onClick, commit, intent, fundingSource, currency } = props;

    const fundingSources = querySelectorAll(`[${ DATA_ATTRIBUTES.FUNDING_SOURCE }]`).map(el => {
        return el.getAttribute(DATA_ATTRIBUTES.FUNDING_SOURCE);
    }).filter(Boolean);
    
    window.exports = {
        name:           'smart-payment-buttons',
        commit: {
            commit,
            intent,
            currency
        },
        paymentSession: () => {
            return {
                getAvailableFundingSources: () => fundingSources,
                createOrder:                () => {

                    if (!isEnabled()) {
                        throw new Error('Error occurred. Button not enabled.');
                    }

                    return ZalgoPromise.hash({
                        valid: onClick && fundingSource ? onClick({ fundingSource }) : true
                    }).then(({ valid }) => {
                        if (!valid) {
                            throw new Error('Error occurred during async validation');
                        } else {
                            return createOrder();
                        }
                    });


                },
                onApprove: (merchantData) => {
                    const data = {
                        payerID: merchantData.payerID
                    };

                    const actions = {
                        restart: () => {
                            throw new Error('Action unimplemented');
                        }
                    };

                    return onApprove(data, actions);
                },
                onCancel,
                onError,
                upgradeFacilitatorAccessToken: (facilitatorAccessToken, orderID) => {
                    // TODO: Preferred way to store buyerAccessToken?
                    upgradeFacilitatorAccessToken(facilitatorAccessToken, { buyerAccessToken, orderID });
                }
            };
        }
    };
    
}


