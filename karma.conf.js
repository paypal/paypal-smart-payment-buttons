/* @flow */
/* eslint import/no-default-export: off */

import { getKarmaConfig } from 'grumbler-scripts/config/karma.conf';

import { WEBPACK_CONFIG_TEST } from './webpack.config';

export default function configKarma(karma : Object) {

    const karmaConfig = getKarmaConfig(karma, {
        basePath:  __dirname,
        webpack:   WEBPACK_CONFIG_TEST,
        autoWatch: true,
        client:    {
            captureConsole: true,
            mocha:          {
                bail:            true,
                timeout: 10000
            },
            jasmine: {
                timeout:   10000
            }
        }
    });

    karma.set(karmaConfig);
}
