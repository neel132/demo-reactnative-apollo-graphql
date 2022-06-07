import React from 'react';

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';

import {enableFlipperApolloDevtools} from 'react-native-flipper-apollo-devtools';

import {Link} from './config';

const httpLink = createHttpLink({
  uri: Link.GRAPHQL_URL,
});

const client = new ApolloClient({
  connectToDevTools: true,
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            merge(existing, incoming) {
              if (existing) {
                return {
                  edges: [...existing.edges, ...incoming.edges],
                  postPageInfo: {
                    cursorNext: incoming?.postPageInfo?.cursorNext,
                    cursorPrevious: existing?.postPageInfo?.cursorPrevious,
                    threshold: existing?.postPageInfo?.threshold,
                  },
                };
              } else {
                return incoming;
              }
            },
            read(existing) {
              if (existing) {
                return existing;
              } else {
                return {
                  edges: [],
                  postPageInfo: {
                    cursorNext: {},
                    cursorPrevious: {},
                  },
                };
              }
            },
          },
        },
      },
    },
  }),
});

// flipper: for Apollo Cache
enableFlipperApolloDevtools(client);

export const BhApolloProvider = ({children}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
