/** @format */

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type Posts = {
  title: string;
  _id: string;
  text: string;
  tags: string[];
  viewsCount: number;
  createdAt: string;
  user: {
    fullName: string;
    email: string;
    avatarUrl: string;
    createdAt: string;
  };
  imageUrl: string;
};

export interface PostsSliceState {
  posts: Posts[];
  statusPosts: Status;
}
