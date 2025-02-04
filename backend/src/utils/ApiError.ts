interface ApiErrorInterface {
    statusCode: number;
    isOperational: boolean;
    data: Record<string, any>;
    error: Record<string, any>;
    message: string;
    stack?: any;
}

export class ApiError extends Error implements ApiErrorInterface {
    statusCode: number;
    isOperational: boolean;
    data: Record<string, any>;
    error: Record<string, any>;

    constructor(
        statusCode: number,
        message: string,
        object = {},
        error = {},
        isOperational = true,
        stack = '',
    ) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.data = object;
        this.error = error;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
