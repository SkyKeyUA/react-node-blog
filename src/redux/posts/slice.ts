/** @format */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchPosts } from './asyncActionsPosts';
import { RootState } from '../store';

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

type Posts = {
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

const initialState: PostsSliceState = {
  posts: [],
  statusPosts: Status.LOADING,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Posts[]>) {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.posts = [];
      state.statusPosts = Status.LOADING;
      console.log('The data is sending');
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.statusPosts = Status.SUCCESS;
      console.log(state, 'All Good');
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts = [];
      state.statusPosts = Status.ERROR;
      console.log('Was Error');
    });
  },
});

export const { setPosts } = postsSlice.actions;

export const selectPostsData = (state: RootState) => state.posts;

export const postsReducer = postsSlice.reducer;
