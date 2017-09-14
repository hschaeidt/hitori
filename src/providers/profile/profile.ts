import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import * as _ from 'lodash';
import { UserProvider } from "../user/user";

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProfileProvider {
  profile: Profile = null;

  constructor(public apollo: Apollo, public userProvider: UserProvider) {
  }

  public getCurrentUserProfile() {
    return this.apollo.watchQuery<ProfileQueryResponse>({
      query: gql`
        query {
          user {
            id
            profile {
              id
              publicName
            }
          }
        }
      `
    });
  }

  public async createCurrentUserProfile(
    publicName: string
  ) {
    const user = await this.userProvider.getCurrentUser();

    return this.apollo.mutate<CreateProfileQueryResponse>({
      mutation: gql`
        mutation CreateProfileForUser($userId: ID, $publicName: String!) {
          createProfile(userId: $userId, publicName: $publicName) {
            id
          }
        }
      `,
      variables: {
        userId: user.id,
        publicName
      }
    });
  }

  public updateCurrentUserProfile(
    id: string,
    publicName: string
  ) {
    return this.apollo.mutate<UpdateProfileQueryResponse>({
      mutation: gql`
        mutation UpdateProfileForUser($id: ID!, $publicName: String!) {
          updateProfile(id: $id, publicName: $publicName) {
            id,
            publicName
          }
        }
      `,
      variables: {
        id,
        publicName
      },
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

export interface CreateProfileQueryResponse {
  createProfile: Profile;
}

export interface UpdateProfileQueryResponse {
  updateProfile: Profile;
}

export interface ProfileQueryResponse {
  user: {
    profile: Profile;
  }
}
