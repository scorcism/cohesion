import cors from 'cors';
import express, { Request, Response } from 'express';
import { Server } from 'http';
import httpStatus from 'http-status';
import passport from 'passport';
import routerV1 from './api/route/v1';
import { errorConverter, errorHandler } from './middleware/error.middleware';
import { ApiError } from './utils/ApiError';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
let server: Server | null = null;

app.use(cors());
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req: Request, res: Response) => {
    res.send('Cohesion Working Fine');
});

app.use('/api/v1', routerV1);

app.use('*', (req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);

app.use(errorHandler);

server = app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

const gracefulShutdown = (error?: Error) => {
    if (server) {
        server.close(() => {
            console.log('Server closed.');
            process.exit(error ? 1 : 0);
        });
    } else {
        process.exit(error ? 1 : 0);
    }
};

process.on('uncaughtException', gracefulShutdown);
process.on('unhandledRejection', gracefulShutdown);
process.on('SIGTERM', () => gracefulShutdown());
