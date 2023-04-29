/** @format */

import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import postsSlice from './posts/slice';
import tagsSlice from './tags/slice';
import authSlice from './auth/slice';

export const store = configureStore({
  reducer: {
    posts: postsSlice,
    tags: tagsSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
