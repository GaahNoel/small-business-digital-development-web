import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

const cache = setupCache({
  maxAge: 5 * 60 * 1000,
});

export const apiCache = axios.create({
  adapter: cache.adapter,
  baseURL: process.env.API_BASE_URL,
});
