/** @format */

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface tagsSliceState {
  tags: string[];
  statusTags: Status;
}
