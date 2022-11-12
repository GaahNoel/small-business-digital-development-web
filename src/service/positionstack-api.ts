import axios from 'axios';

export const positionstackApi = axios.create({
  baseURL: 'https://api.positionstack.com/v1/',
});
