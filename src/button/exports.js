/* @flow */


import { ZalgoPromise } from 'zalgo-promise/src';
import { querySelectorAll } from 'belter/src';

import { DATA_ATTRIBUTES } from '../constants';
// eslint-disable-next-line no-unused-vars
import { upgradeFacilitatorAccessToken } from '../api';
import { getBuyerAccessToken } from '../lib';

import type { ButtonProps } from './props';

type ExportsProps = {|
    props : ButtonProps,
    isEnabled : () => boolean,
    facilitatorAccessToken : string
|};

export function setupExports({ props, isEnabled, facilitatorAccessToken } : ExportsProps)  {
    const { createOrder, onApprove, onError, onCancel, onClick, commit, intent, fundingSource, currency, onAuth } = props;

    const fundingSources = querySelectorAll(`[${ DATA_ATTRIBUTES.FUNDING_SOURCE }]`).map(el => {
        return el.getAttribute(DATA_ATTRIBUTES.FUNDING_SOURCE);
    }).filter(Boolean);
    
    window.exports = {
        name:           'smart-payment-buttons',
        commit: {
            commit,
            currency,
            intent
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
                        payerID:      merchantData.payerID,
                        forceRestAPI: merchantData.forceRestAPI || false
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
                // eslint-disable-next-line no-shadow
                upgradeFacilitatorAccessToken: (facilitatorAccessToken, orderID) => {
                    const buyerAccessToken = getBuyerAccessToken() || '';
                    // eslint-disable-next-line no-console
                    console.log('@@@ attempt token upgrade', { buyerAccessToken, facilitatorAccessToken, orderID });

                    return upgradeFacilitatorAccessToken(facilitatorAccessToken, { buyerAccessToken, orderID }).then(result => console.log('success!', result)).catch(error => console.error('fail...', error));
                },
                getFacilitatorAccessToken: () => {
                    return facilitatorAccessToken;
                }
            };
        }
    };
    
}


