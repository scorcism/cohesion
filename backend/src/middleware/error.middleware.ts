import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ApiError } from '../utils/ApiError';

const errorConverter = (err: any, req: Request, res: Response, next: NextFunction) => {
    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
        const message = err.message || 'Internal Server Error';
        error = new ApiError(statusCode, message, {}, err);
    }
    next(error);
};

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Something went wrong';
    const data = err.data || {};
    const error = err.error || {};

    const response = {
        success: false,
        message,
        ...(Object.keys(data).length && { data }),
        ...(Object.keys(error).length && { error }),
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    };

    res.locals.errorMessage = message;
    res.status(statusCode).json(response);
};

export { errorConverter, errorHandler };
