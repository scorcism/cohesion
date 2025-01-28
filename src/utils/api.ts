import axios from 'axios';
import { config } from './config.js';

const api = axios.create({
  baseURL: config.OLLAMA_URL,
  timeout: 1000,
});

export { api };
