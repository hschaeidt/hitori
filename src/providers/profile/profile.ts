import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { UserProvider } from '../user/user';
import {
  CreateProfileForUserMutation, CreateProfileForUserMutationVariables,
  GetUserWithProfileQuery, UpdateProfileForUserMutation, UpdateProfileForUserMutationVariables
} from '../../app/schema';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProfileProvider {
  constructor(public apollo: Apollo, public userProvider: UserProvider) {
  }

  public getCurrentUserProfile() {
    return this.apollo.watchQuery<GetUserWithProfileQuery>({
      query: gql`
        query GetUserWithProfile {
          user {
            id
            profile {
              id
              publicName
            }
          }
        }
      `
    }).valueChanges;
  }

  public async createCurrentUserProfile(
    publicName: string
  ) {
    const user = await this.userProvider.getCurrentUser().toPromise();

    const variables: CreateProfileForUserMutationVariables = {
      userId: user.id,
      publicName
    };

    return this.apollo.mutate<CreateProfileForUserMutation>({
      mutation: gql`
        mutation CreateProfileForUser($userId: ID, $publicName: String!) {
          createProfile(userId: $userId, publicName: $publicName) {
            id
          }
        }
      `,
      variables
    });
  }

  public updateCurrentUserProfile(
    id: string,
    publicName: string
  ) {
    const variables: UpdateProfileForUserMutationVariables = {
      id,
      publicName
    };

    return this.apollo.mutate<UpdateProfileForUserMutation>({
      mutation: gql`
        mutation UpdateProfileForUser($id: ID!, $publicName: String!) {
          updateProfile(id: $id, publicName: $publicName) {
            id,
            publicName
          }
        }
      `,
      variables,
      optimisticResponse: {
        __typename: 'Mutation',
        updateProfile: {
          __typename: 'Profile',
          id,
          publicName
        }
      }
    });
  }
}

export interface Profile {
  id?: string;
  publicName?: string;
}
