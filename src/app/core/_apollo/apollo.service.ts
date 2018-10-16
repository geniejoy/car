import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { Injectable } from '@angular/core';
import { OperationDefinitionNode } from 'graphql';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { onError } from 'apollo-link-error';
import { split } from 'apollo-link';

const portalGqlBasePath = '/services/console/gql';
const portalGqlSubsBasePath = '/services/console/gqlsub';

@Injectable()
export class ApolloService {
  constructor(private apollo: Apollo, httpLink: HttpLink) {
    const http = httpLink.create({
      uri: portalGqlBasePath
    });

    const wsproto = location.protocol === 'https:' ? 'wss:' : 'ws:';
    const ws = new WebSocketLink({
      uri: `${wsproto}//${location.host}${portalGqlSubsBasePath}`,
      options: {
        reconnect: true
      }
    });
    console.log(`URL:${ws}`);
    /* Apollo create Error Handler*/
    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        );
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    });
    let link = split(
      // split based on operation type
      ({ query }) => {
        const mainDefinition = <OperationDefinitionNode>getMainDefinition(query);
        return mainDefinition.kind === 'OperationDefinition' && mainDefinition.operation === 'subscription';
      },
      ws,
      http
    );
    /*  ErrorLink added */
    link = errorLink.concat(link);
    apollo.create({
      link,
      cache: new InMemoryCache()
    });
  }
  getApollo() {
    return this.apollo;
  }
}
