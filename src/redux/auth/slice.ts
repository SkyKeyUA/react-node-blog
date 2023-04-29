/** @format */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchUserData } from './asyncActions';
import { Status } from './type';

const initialState = {
  data: null,
  status: Status.LOADING,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.data = null;
      state.status = Status.LOADING;
      console.log('The data is sending');
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = Status.SUCCESS;
      console.log(state, 'All Good');
    });
    builder.addCase(fetchUserData.rejected, (state) => {
      state.data = null;
      state.status = Status.ERROR;
      console.log('Was Error');
    });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
