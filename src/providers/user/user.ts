import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Storage } from '@ionic/storage';
import gql from 'graphql-tag';
import 'rxjs/add/operator/map';

export interface User {
  id: string;
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

  constructor(public apollo: Apollo, public storage: Storage) {
  }

  public async getCurrentUser(): Promise<User | null> {
    const result = await this.apollo.watchQuery<UserQueryResponse>({
      query: gql`
        query {
          user {
            id
          }
        }
      `
    }).result();

    return result.data.user;
  }

  public async createUser(name: string, email: string, password: string): Promise<boolean> {
    if (await this.getCurrentUser() !== null) {
      return false;
    }

    const createUser = gql`
      mutation ($name: String!, $email: String!, $password: String!){
        createUser(authProvider: {email: {email: $email, password: $password}}, name: $name) {
          id
        }
      }
    `;

    await this.apollo.mutate({
      mutation: createUser,
      variables: {
        password,
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

  public signinUser(email: string, password: string): Promise<{}> {
    const signinUser = gql`
      mutation ($email: String!, $password: String!){
        signinUser(email: {email: $email, password: $password}) {
          token
        }
      }
    `;

    return new Promise((resolve, reject) => {
      this.apollo.mutate<SigninUserExecutionResult>({
        mutation: signinUser,
        variables: {
          email,
          password
        }
      }).subscribe(({ data }) => {
        this.storage.set('id_token', data.signinUser.token).then(() => {
          resolve();
        });
      }, (errors) => {
        reject(errors);
      });
    });
  }

  public logoutUser(): Promise<{}> {
    return new Promise((resolve, reject) => {
      this.storage.remove('id_token').then(() => {
        this.apollo.getClient().resetStore().then(() => {
          resolve();
        }).catch((errors) => reject(errors));
      }).catch((errors) => {
        reject(errors);
      })
    });
  }
}

export interface SigninUserExecutionResult {
  signinUser: {
    token: string
  }
}
