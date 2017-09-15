/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type GetUserWithProfileQuery = {
  user:  {
    __typename: "User",
    id: string,
    profile:  {
      __typename: string,
      id: string,
      publicName: string,
    } | null,
  } | null,
};

export type CreateProfileForUserMutationVariables = {
  userId?: string | null,
  publicName: string,
};

export type CreateProfileForUserMutation = {
  createProfile:  {
    __typename: "Profile",
    id: string,
  } | null,
};

export type UpdateProfileForUserMutationVariables = {
  id: string,
  publicName: string,
};

export type UpdateProfileForUserMutation = {
  updateProfile:  {
    __typename: "Profile",
    id: string,
    publicName: string,
  } | null,
};

export type GetCurrentUserQuery = {
  user:  {
    __typename: "User",
    id: string,
  } | null,
};

export type CreateUserMutationVariables = {
  email: string,
  password: string,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    id: string,
  } | null,
};

export type SigninUserMutationVariables = {
  email: string,
  password: string,
};

export type SigninUserMutation = {
  signinUser:  {
    __typename: "undefined",
    token: string | null,
  },
};
/* tslint:enable */
