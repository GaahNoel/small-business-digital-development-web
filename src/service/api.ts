import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://small-business-digital-dev-api.herokuapp.com/api/',
});
