import axios from 'axios';

/** Ключ из PDF сервиса «Проценка». Свой ключ задаётся через VITE_FAVORIT_API_KEY. */
const API_KEY =
  import.meta.env.VITE_FAVORIT_API_KEY ||
  '00000000-0000-0000-0000-000000000001';

export const apiClient = axios.create({
  baseURL: 'http://api.favorit-parts.ru/hs/hsprice/',
  timeout: 20000
});

export const favoritApiKey = API_KEY;
