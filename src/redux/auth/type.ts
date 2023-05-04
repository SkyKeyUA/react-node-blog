/** @format */

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type Auth = {
  avatarUrl: string;
  createdAt: string;
  email: string;
  fullName: string;
  _id: string;
};

export interface AuthSliceState {
  data: null | Auth[];
  statusAuth: Status;
}
