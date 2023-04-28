/** @format */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchPosts } from './asyncActions';
import { RootState } from '../store';

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

type Posts = {
  title: string;
  text: string;
  tags: string[];
  viewsCount: number;
  user: {
    _id: string;
    fullName: string;
    email: string;
    avatarUrl: string;
  };
  imageUrl: string;
};

export interface PostsSliceState {
  items: Posts[];
  status: Status;
}

const initialState: PostsSliceState = {
  items: [],
  status: Status.LOADING,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Posts[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.items = [];
      state.status = Status.LOADING;
      console.log('The data is sending');
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
      console.log(state, 'All Good');
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.items = [];
      state.status = Status.ERROR;
      console.log('Was Error');
    });
  },
});

export const { setItems } = postsSlice.actions;

export const selectPostsData = (state: RootState) => state.posts;

export const postsReducer = postsSlice.reducer;
