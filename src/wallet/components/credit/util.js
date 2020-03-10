/* @flow */
/** @jsx h */

import { h } from 'preact';

import type { CreditPPCOfferType } from '../../types';

import { CreditSubType } from './detailsSubType';

export const getInstallmentsUrl = () => `/credit-presentment/smart/installments${ window.location.search }`;

// eslint-disable-next-line react/jsx-filename-extension
export const getCreditSubType = (offer : CreditPPCOfferType) => <CreditSubType offer={ offer } />;
