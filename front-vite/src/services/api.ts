import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL ?? 'https://api.shooter.cwcwcw.ru';

export const api = axios.create({
  baseURL,
});
