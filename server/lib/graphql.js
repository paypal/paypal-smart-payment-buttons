/* @flow */

import type { ExpressRequest } from '../types';
import { HTTP_HEADER } from '../config';

// $FlowFixMe
export type GraphQL = <V, R>(ExpressRequest, $ReadOnlyArray<{| query : string, variables : V |}>) => Promise<R>; // eslint-disable-line no-undef

// eslint-disable-next-line flowtype/require-exact-type
export type GraphQLBatch = {
    // eslint-disable-next-line no-undef
    <V, R>({| query : string, variables : V, accessToken? : ?string, clientMetadataID? : string |}) : Promise<R>,
    flush : () => void
};

export function graphQLBatch(req : ExpressRequest, graphQL : GraphQL) : GraphQLBatch {
    let batch = [];
    let accessToken;
    let clientMetadataID = req.get(HTTP_HEADER.CLIENT_METADATA_ID);
    let timer;

    const batchedGraphQL = async ({ query, variables, accessToken: callerAccessToken, clientMetadataID: callerClientMetadataID }) => {
        return await new Promise((resolve, reject) => {
            if (callerAccessToken) {
                if (accessToken && callerAccessToken !== accessToken) {
                    throw new Error(`Access token for graphql call already set`);
                }

                accessToken = callerAccessToken;
            }

            if (callerClientMetadataID) {
                if (clientMetadataID && callerClientMetadataID !== clientMetadataID) {
                    throw new Error(`Client Metadata id for graphql call already set`);
                }

                clientMetadataID = callerClientMetadataID;
            }

            batch.push({ query, variables, resolve, reject });

            timer = setTimeout(() => {
                batchedGraphQL.flush();
            }, 0);
        });
    };

    batchedGraphQL.flush = async () => {
        clearTimeout(timer);

        const payload = batch.map(({ query, variables }) => {
            return { query, variables };
        });

        let response : $ReadOnlyArray<Object>;
        let gqlError;

        try {
            response = await graphQL(req, payload, { accessToken, clientMetadataID });
        } catch (err) {
            gqlError = err;
        }
        
        for (let i = 0; i < batch.length; i++) {
            const { resolve, reject } = batch[i];

            if (gqlError) {
                reject(gqlError);
                continue;
            }

            const batchItem = response && response[i];

            if (!batchItem) {
                reject(new Error(`No response from gql`));
                continue;
            }

            const { result, error } = batchItem;

            if (gqlError || error) {
                reject(gqlError || error);
            } else {
                resolve(result);
            }
        }

        // eslint-disable-next-line require-atomic-updates
        batch = [];
    };

    return batchedGraphQL;
}
