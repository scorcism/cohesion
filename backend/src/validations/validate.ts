import httpStatus from 'http-status';
import { fromZodError } from 'zod-validation-error';
import { ApiError } from '../utils/ApiError';

const validate = async (data: any, schema: any): Promise<any> => {
    try {
        const result = schema.safeParse(data);
        if (!result.success) {
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'Validation error',
                {},
                fromZodError(result.error).details,
            );
        }

        return result.data;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            'Internal Server Error',
            {},
            error as Record<string, any>,
        );
    }
};

export { validate };

