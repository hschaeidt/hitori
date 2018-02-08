import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Storage } from '@ionic/storage';
import gql from 'graphql-tag';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {
  CreateUserMutation, CreateUserMutationVariables, GetCurrentUserQuery, SigninUserMutation,
  SigninUserMutationVariables,
} from '../../app/schema';
import { ApolloQueryResult } from 'apollo-client';
import { FetchResult } from 'apollo-link';
import { GC_AUTH_TOKEN } from '../../constants';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider {

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
    }).valueChanges.map(
      ({data}: ApolloQueryResult<GetCurrentUserQuery>) => {
        console.log('value changed', data);
        return data.user;
      }
    );
  }

  public createUser(email: string, password: string): Promise<CreateUserMutation> {
    const createUser = gql`
      mutation CreateUser($email: String!, $password: String!){
        createUser(authProvider: {email: {email: $email, password: $password}}) {
          id
        }
      }
    `;

    const variables: CreateUserMutationVariables = {
      password,
      email,
    };

    return this.apollo.mutate<CreateUserMutation>({
      mutation: createUser,
      variables,
    }).toPromise<CreateUserMutation>();
  }

  public signinUser(email: string, password: string): Promise<string> {
    const signinUser = gql`
      mutation SigninUser($email: String!, $password: String!){
        signinUser(email: {email: $email, password: $password}) {
          token
        }
      }
    `;

    const variables: SigninUserMutationVariables = {
      email,
      password,
    };

    return new Promise((resolve, reject) => {
      this.apollo.mutate<SigninUserMutation>({
        mutation: signinUser,
        variables,
      }).subscribe(({data}: FetchResult<SigninUserMutation>) => {
        this.storage.set(GC_AUTH_TOKEN, data.signinUser.token).then(() => {
          resolve(data.signinUser.token);
        }).catch(errors => reject(errors));
      }, (errors) => {
        reject(errors);
      });
    });
  }

  public logoutUser(): Promise<{}> {
    return new Promise((resolve, reject) => {
      this.storage.remove(GC_AUTH_TOKEN).then(() => {
        return this.apollo.getClient().resetStore();
      }).catch((errors) => {
        reject(errors);
      });
    });
  }

  public hasToken() {
    return this.storage.get(GC_AUTH_TOKEN);
  }
}
