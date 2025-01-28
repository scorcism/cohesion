import express from 'express';

const authRouter = express.Router();
authRouter.get('/health', () => {});


export default authRouter