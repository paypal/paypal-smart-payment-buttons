/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { memoize } from 'belter/src';
import type {CreateOrder} from './createOrder';
import { getLogger } from '../lib';
import { upgradeFacilitatorAccessToken } from '../api';

export type XOnAuthDataType = {|
    accessToken: string
|};

export type OnAuth = () => ZalgoPromise<void>;

export function getOnAuth({ facilitatorAccessToken, createOrder } : {| facilitatorAccessToken : string, createOrder: CreateOrder |}) : OnAuth | void {

    return ({ accessToken }) => {
        getLogger().info(`spb_onauth_access_token_${ (accessToken || buyerAccessToken)  ? 'present' : 'not_present' }`);

        if (accessToken) {
            return ZalgoPromise.try(() => {
               // if (experiment) {
               //     do the thing
               // }

               return createOrder().then(orderID => upgradeFacilitatorAccessToken(facilitatorAccessToken, {buyerAccessToken: accessToken, orderID}));
            }).then(() => {
                return accessToken;
            });
        }
    };
}
