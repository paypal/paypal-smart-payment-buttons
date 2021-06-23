/* @flow */

import { join } from 'path';

import pkg from '../../package.json';

export const MODULE_POLL_INTERVAL = 10 * 60;

export const FNCLS = 'fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99';
export const FRAUDNET_ID = 'SMART_PAYMENT_BUTTONS';

export const MODULE_DIR = join(__dirname, '..');

export const BUTTON_RENDER_MODULE = '@paypal/checkout-components';
export const BUTTON_CLIENT_MODULE = pkg.name;

export const BUTTON_RENDER_JS = 'dist/button.js';
export const BUTTON_CLIENT_JS = 'dist/smart-payment-buttons.js';
export const BUTTON_CLIENT_MIN_JS = 'dist/smart-payment-buttons.min.js';
