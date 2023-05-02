/** @format */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchAuth, fetchAuthMe } from './asyncActions';
import { Status } from './type';

const initialState = {
  data: null,
  status: Status.LOADING,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state) => {
      state.data = null;
      state.status = Status.LOADING;
      console.log('The data is sending');
    });
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = Status.SUCCESS;
      console.log(state, 'All Good');
    });
    builder.addCase(fetchAuth.rejected, (state) => {
      state.data = null;
      state.status = Status.ERROR;
      console.log('Was Error');
    });
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.data = null;
      state.status = Status.LOADING;
      console.log('The data is sending');
    });
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = Status.SUCCESS;
      console.log(state, 'All Good');
    });
    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.data = null;
      state.status = Status.ERROR;
      console.log('Was Error');
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
