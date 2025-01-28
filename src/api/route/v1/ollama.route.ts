import express from 'express';

const ollamaRoute = express.Router();
ollamaRoute.get('/health', () => {});


export default ollamaRoute