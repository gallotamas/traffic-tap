import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

export function configureApolloClient({ basePath }: { basePath: string }) {
    // Create an http link
    const httpLink = new HttpLink({
        uri: `${window.location.origin}${basePath}`,
    });

    // Create a websocket link
    const wsLink = new WebSocketLink({
        uri: `ws://${window.location.host}${basePath}`,
        options: {
            reconnect: true,
            lazy: true,
        }
    });

    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    const link = split(
        // split based on operation type
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        wsLink,
        httpLink,
    );

    return new ApolloClient({
        link: ApolloLink.from([
            onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
                graphQLErrors.forEach(({ message, locations, path }) =>
                console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
                );
            if (networkError) console.log(`[Network error]: ${networkError}`);
            }),
            link,
        ]),
        cache: new InMemoryCache()
    });
}
