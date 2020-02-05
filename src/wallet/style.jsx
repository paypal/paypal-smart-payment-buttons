/* @flow */
/** @jsx h */

import { h, render, type Node } from 'preact';
import { componentStyle } from './styles';


export function Style({ style, cspNonce }) {
    const { height } = style;
    const css = componentStyle({ height });
    
    return (
        <style cspNonce={ cspNonce }>
            { css }
        </style>
    );
}