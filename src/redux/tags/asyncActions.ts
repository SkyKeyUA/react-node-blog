/** @format */

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});
