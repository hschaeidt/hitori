import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import 'rxjs/add/operator/map';

interface User {
  name: string;
  email: string;
}

interface UserQueryResponse {
  user: User;
}

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public apollo: Apollo) {
  }

  public async getCurrentUser(): Promise<User | null> {
    const result = await this.apollo.watchQuery<UserQueryResponse>({
      query: gql`
        query {
          user {
            name
            email
          }
        }
      `
    }).result();

    return result.data.user;
  }

  public async createUser(email: string, name: string, auth0IdToken: string): Promise<boolean> {
    if (await this.getCurrentUser() !== null) {
      return false;
    }

    const createUser = gql`
      mutation ($auth0IdToken: String!, $name: String!, $email: String!){
        createUser(authProvider: {auth0: {idToken: $auth0IdToken}}, name: $name, email: $email) {
          id
        }
      }
    `;

    await this.apollo.mutate({
      mutation: createUser,
      variables: {
        auth0IdToken,
        name,
        email
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
    }, (error) => {
      console.log('there was an error sending the query', error);
    });

    return true;
  }
}
