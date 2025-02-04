import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email('Invalid email format').nonempty('Email is required'),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .nonempty('Password is required'),
});

const registerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format').nonempty('Email is required'),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .nonempty('Password is required'),
});

export const authSchema = { loginSchema, registerSchema };
