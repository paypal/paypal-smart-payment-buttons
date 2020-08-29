/* @flow */

import { ZalgoPromise } from 'zalgo-promise';
import { ENV } from '@paypal/sdk-constants/src';

import { getBody } from '../lib';

const FRAUDNET_URL = {
    [ ENV.LOCAL ]:      'https://www.msmaster.qa.paypal.com/en_US/m/fb-raw.js',
    [ ENV.STAGE ]:      'https://www.msmaster.qa.paypal.com/en_US/m/fb-raw.js',
    [ ENV.SANDBOX ]:    'https://c.paypal.com/da/r/fb.js',
    [ ENV.PRODUCTION ]: 'https://c.paypal.com/da/r/fb.js',
    [ ENV.TEST ]:       'https://c.paypal.com/da/r/fb.js'
};

export const FRAUDNET_FNCLS = 'fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99';
export const FRAUDNET_APP_NAME = 'SMART_PAYMENT_BUTTONS';

type FraudnetOptions = {|
    env : $Values<typeof ENV>,
    clientMetadataID : string,
    cspNonce? : ?string,
    timeout? : number
|};

type FraudnetConfig = {|
    f : string,
    s : string,
    cb1 : string,
    sandbox? : boolean
|};

export function loadFraudnet({ env, clientMetadataID, cspNonce, timeout = 1000 } : FraudnetOptions) : ZalgoPromise<void> {
    return new ZalgoPromise(resolve => {
        const config : FraudnetConfig = {
            f:   clientMetadataID,
            s:   FRAUDNET_APP_NAME,
            cb1: 'fnCallback'
        };

        if (env === ENV.SANDBOX) {
            config.sandbox = true;
        }

        const configScript = document.createElement('script');
        configScript.setAttribute('nonce', cspNonce || '');
        configScript.setAttribute('type', 'application/json');
        configScript.setAttribute('id', 'fconfig');
        configScript.setAttribute('fncls', FRAUDNET_FNCLS);
        configScript.textContent = JSON.stringify(config);

        const fraudnetScript = document.createElement('script');
        fraudnetScript.setAttribute('nonce', cspNonce || '');
        fraudnetScript.setAttribute('src', FRAUDNET_URL[env]);
        fraudnetScript.addEventListener('error', resolve);

        window.fnCallback = resolve;
        setTimeout(resolve, timeout);

        const body = getBody();
        body.appendChild(configScript);
        body.appendChild(fraudnetScript);
        console.log('end of loadfraudnet script');
    });
}
