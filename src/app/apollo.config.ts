import { NgModule } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { Storage } from '@ionic/storage';


@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLModule {
  headers: HttpHeaders;

  constructor(apollo: Apollo, httpLink: HttpLink, storage: Storage) {
    // init headers
    this.headers = new HttpHeaders();

    // lookup for a  existing auth token and extend the auth header
    Promise.resolve(storage.get('id_token')).then((idToken) => {
      this.headers.set('Authorization', `Bearer ${idToken}`);
    });

    // create link to the backend graphql
    const http = httpLink.create({ uri: 'https://api.graph.cool/simple/v1/cj7d0wq410pal0108z2ct0b4j' });

    const middleware = setContext(() => ({
      headers: this.headers,
    }));

    // use with Apollo.create()
    const link = middleware.concat(http);

    apollo.create({
      link,
      cache: new InMemoryCache()
    });
  }
}
