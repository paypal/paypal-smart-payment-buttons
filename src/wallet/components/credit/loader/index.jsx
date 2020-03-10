/* @flow */
/** @jsx h */

import { h, type Node } from 'preact';
import { useEffect } from 'preact/hooks';

import { Style } from '../../style';

import styles from './style.scoped.scss';

type LoaderProps = {|
    to : string
|};

export const Loader = ({ to: url } : LoaderProps) : Node => {
    useEffect(() => {
        if (url) {
            window.location.replace(url);
        }
    }, [ url ]);

    return (
        <Style css={ styles }>
            <div className="loader" />
        </Style>
    );
};
