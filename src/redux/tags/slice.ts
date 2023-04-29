/** @format */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchTags } from './asyncActions';
import { Status, tagsSliceState } from './type';

const initialState: tagsSliceState = {
  tags: [],
  statusTags: Status.LOADING,
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setTags(state, action: PayloadAction<string[]>) {
      state.tags = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTags.pending, (state) => {
      state.tags = [];
      state.statusTags = Status.LOADING;
      console.log('The data is sending');
    });
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.tags = action.payload;
      state.statusTags = Status.SUCCESS;
      console.log(state, 'All Good');
    });
    builder.addCase(fetchTags.rejected, (state) => {
      state.tags = [];
      state.statusTags = Status.ERROR;
      console.log('Was Error');
    });
  },
});

export const { setTags } = tagsSlice.actions;

export default tagsSlice.reducer;
