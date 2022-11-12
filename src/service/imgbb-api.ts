import axios from 'axios';

export const imgbbApi = axios.create({
  baseURL: 'https://api.imgbb.com/1/',
});
