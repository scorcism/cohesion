import express from 'express';

const chatRoute = express.Router();
chatRoute.get('/health', () => {});


export default chatRoute