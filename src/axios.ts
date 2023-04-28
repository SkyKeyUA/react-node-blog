/** @format */

import axios from 'axios';

// Now I don't have to write the whole path
// to the link http://localhost:4444/posts

const instance = axios.create({
  baseURL: 'http://localhost:4444',
});

export default instance;
