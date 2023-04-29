/** @format */

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params) => {
  const { data } = await axios.post('/auth/login', params);
  return data;
});
