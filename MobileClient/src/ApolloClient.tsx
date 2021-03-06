import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

const Client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new BatchHttpLink({
      uri: 'https://48p1r2roz4.sse.codesandbox.io',
      credentials: 'same-origin'
    })
  ]),
  cache: new InMemoryCache(),
});

export default Client;