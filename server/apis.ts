// Base USer APIs

import { BaseUser, Donor } from './types';

export interface LogInRequest {
  email: string;
  password: string;
}

export type LogInResponse = {
  userId: BaseUser['userId'];
};

export type UserIdRequest = {
  userId: BaseUser['userId'];
};

export type GetUserInfoResponse = {
  user: BaseUser;
};

export type GetUserTypeResponse = {
  user: BaseUser['userType'];
};

export type GetUserStatusResponse = {
  user: BaseUser['userStatus'];
};

//Donor APIs
export type GetDonorInfoResponse = {
  donor: Donor;
};
