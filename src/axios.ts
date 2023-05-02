/** @format */

import axios, { AxiosRequestConfig } from 'axios';

// Now I don't have to write the whole path
// to the link http://localhost:4444/posts

const instance = axios.create({
  baseURL: 'http://localhost:4444',
});

// We save the token to our localStorage for later use
instance.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = window.localStorage.getItem('token');
  if (token !== null && config.headers) {
    config.headers.Authorization = token;
  }
  return config;
});

export default instance;
