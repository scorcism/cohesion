import { ollamaController } from '../../controller/ollama.controller';
import express from 'express';

const ollamaRoute = express.Router();
ollamaRoute.get('/health', () => {});
ollamaRoute.get('/models', ollamaController.getTags);


export default ollamaRoute