import { Request, Response } from 'express';
import { tryCatch } from '../../middleware/tryCatch';
import { authSchema } from '../../validations/auth.validation';
import { validate } from '../../validations/validate';
import { authService } from '../services/auth.service';

const login = tryCatch(async (request: Request, response: Response) => {
    const _validate = await validate(request.body, authSchema.loginSchema);
    const { email, password } = _validate;

    const _res = await authService.login(email, password);

    response.status(_res.success ? 200 : 400).json(_res);
});

const register = tryCatch(async (request: Request, response: Response) => {
    const _validate = await validate(request.body, authSchema.registerSchema);
    const { name, email, password } = _validate;

    const _res = await authService.register(name, email, password);

    response.status(_res.success ? 200 : 400).json(_res);
});

export const authController = { login, register };
