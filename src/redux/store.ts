/** @format */

import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './posts/slice';
import { useDispatch } from 'react-redux';
import { tagsReducer } from './tags/slice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    tags: tagsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
