import { NgModule } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { Storage } from '@ionic/storage';
import { from } from 'apollo-link';
import { GC_AUTH_TOKEN } from '../constants';

@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLModule {

  constructor(apollo: Apollo, httpLink: HttpLink, storage: Storage) {

    // create link to the backend graphql
    const http = httpLink.create({ uri: 'https://api.graph.cool/simple/v1/cj7d0wq410pal0108z2ct0b4j' });

    const withAuthToken = setContext((request, previousContext) => storage.get(GC_AUTH_TOKEN).then(idToken => {
      let { headers } = previousContext;

      if (!(headers instanceof HttpHeaders)) {
        headers = new HttpHeaders();
      }

      return {
        ...previousContext,
        headers: headers.append('Authorization', `Bearer ${idToken}`),
      };
    }));

    apollo.create({
      link: from([withAuthToken, http]),
      cache: new InMemoryCache()
    });
  }
}
