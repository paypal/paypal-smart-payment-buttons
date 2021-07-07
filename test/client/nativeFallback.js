/* @flow */
/* eslint max-nested-callbacks: off, max-lines: off */

import { wrapPromise } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { setupNativeFallback } from '../../src/native/fallback';

describe('Native fallback cases', () => {

    beforeEach(() => {
        delete window.paypal;
        window.location.hash = '';
    });
    
    const parentDomain = 'foo.paypal.com';
    const webCheckoutUrl = 'foo.paypal.com/checkoutnow?fundingSource=venmo&facilitatorAccessToken=ABCDEFGHIJKLMNIOPQRSTUVWXYZ_1234567890&token=1234ABCDE6789ZYXW&useraction=commit&native_xo=1';

    it('should open the native fallback and send a detect web switch message', () => {
        return wrapPromise(({ expect }) => {
            const opener = {};
            
            let detectedWebSwitch = false;

            window.opener = opener;

            window.paypal = {
                postRobot: {
                    send: expect('postRobotSend', (win, event, payload, opts) => {
                        if (win !== opener) {
                            throw new Error(`Expected message to be sent to parent`);
                        }

                        if (!opts || opts.domain !== parentDomain) {
                            throw new Error(`Expected message to be sent to ${ parentDomain }, got ${ opts ? opts.domain : 'undefined' }`);
                        }

                        if (!event) {
                            throw new Error(`Expected event to be passed`);
                        }

                        if (event === 'detectWebSwitch') {
                            detectedWebSwitch = true;

                            return ZalgoPromise.resolve({
                                source: window,
                                origin: window.location.origin,
                                data:   null
                            });
                        }

                        throw new Error(`Unrecognized event: ${ event }`);
                    })
                }
            };
            
            const nativeFallback = setupNativeFallback({ parentDomain, webCheckoutUrl });

            return ZalgoPromise.delay(50).then(() => {
                if (!detectedWebSwitch) {
                    throw new Error(`Expected web switch to be detected`);
                }

                return nativeFallback.destroy();
            });
        });
    });
});
