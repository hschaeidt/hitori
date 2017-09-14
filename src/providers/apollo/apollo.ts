import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import 'rxjs/add/operator/map';
import { Subject } from "rxjs/Subject";

/*
  Generated class for the ApolloProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ApolloProvider {
  client: ApolloClient;

  constructor(public storage: Storage) {
    // Paste your endpoint for the Simple API here.
    // Info: https://github.com/graphcool-examples/angular-apollo-instagram-example#2-create-graphql-api-with-graphcool
    this.connect();
  }

  connect() {
    const networkInterface = createNetworkInterface({
      uri: 'https://api.graph.cool/simple/v1/cj7d0wq410pal0108z2ct0b4j'
    });
    const self = this;

    networkInterface.use([{
      applyMiddleware(req, next) {
        if (!req.options.headers) {
          req.options.headers = {};
        }

        // get the authentication token from local storage if it exists
        // TODO: this requires reload after login
        self.storage.get('id_token').then((idToken) => {
          req.options.headers.authorization = `Bearer ${idToken}`;
          next();
        }).catch(() => next());
      }
    }]);

    this.client = new ApolloClient({ networkInterface });
  }

  getClient(): ApolloClient {
    return this.client;
  }
}


