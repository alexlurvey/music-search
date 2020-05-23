import axios from 'axios';

export const { LASTFM_BASE_URL } = process.env;
export const lastfm = axios.create({ baseURL: LASTFM_BASE_URL })