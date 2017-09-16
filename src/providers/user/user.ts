import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Storage } from '@ionic/storage';
import gql from 'graphql-tag';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {
  CreateUserMutation, CreateUserMutationVariables, GetCurrentUserQuery, SigninUserMutation,
  SigninUserMutationVariables
} from "../../app/schema";
import "rxjs/add/operator/mergeMap";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public apollo: Apollo, public storage: Storage) {
  }

  public getCurrentUser() {
    return this.apollo.watchQuery<GetCurrentUserQuery>({
      query: gql`
        query GetCurrentUser {
          user {
            id
          }
        }
      `,
    }).map(
      ({data}) => data.user
    );
  }

  public createUser(email: string, password: string): Promise<CreateUserMutation>  {
    const createUser = gql`
      mutation CreateUser($email: String!, $password: String!){
        createUser(authProvider: {email: {email: $email, password: $password}}) {
          id
        }
      }
    `;

    const variables: CreateUserMutationVariables = {
      password,
      email
    };

    return this.apollo.mutate<CreateUserMutation>({
      mutation: createUser,
      variables
    }).toPromise<CreateUserMutation>();
  }

  public signinUser(email: string, password: string): Promise<{}> {
    const signinUser = gql`
      mutation SigninUser($email: String!, $password: String!){
        signinUser(email: {email: $email, password: $password}) {
          token
        }
      }
    `;

    const variables: SigninUserMutationVariables = {
      email,
      password
    };

    return new Promise((resolve, reject) => {
      this.apollo.mutate<SigninUserMutation>({
        mutation: signinUser,
        variables
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

  public hasToken() {
    return this.storage.get('id_token');
  }
}
