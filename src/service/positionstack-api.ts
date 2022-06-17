import axios from 'axios';

export const positionstackApi = axios.create({
    baseURL: 'http://api.positionstack.com/v1/',
});
