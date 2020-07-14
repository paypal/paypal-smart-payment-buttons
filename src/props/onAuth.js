/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { memoize } from 'belter/src';
import type { CreateOrder } from './createOrder';
import { getLogger } from '../lib';
import { upgradeFacilitatorAccessToken } from '../api';

export type XOnAuthDataType = {|
    accessToken: string
|};

export type OnAuth = () => ZalgoPromise<void>;

export function getOnAuth({ facilitatorAccessToken, createOrder, isLSATExperiment } : {| facilitatorAccessToken : string, createOrder: CreateOrder, isLSATExperiment: boolean |}) : OnAuth | void {

    return ({ accessToken }) => {
        getLogger().info(`spb_onauth_access_token_${ accessToken ? 'present' : 'not_present' }`);

        return ZalgoPromise.try(() => {
            if (accessToken) {
                if (isLSATExperiment) {
                    return createOrder()
                        .then(orderID => upgradeFacilitatorAccessToken(facilitatorAccessToken, { buyerAccessToken: accessToken, orderID }))
                        .then(() => {
                            getLogger().info('upgrade_lsat_success');

                            return accessToken;
                        })
                        .catch(err => {
                            getLogger().warn('upgrade_lsat_failure', { error: err });
                        });
                }
                return accessToken
            }
        });
    };
}
