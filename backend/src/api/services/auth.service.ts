import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../../utils/config';
import { authModel } from '../model/auth.model';

const login = async (email: string, password: string) => {
    try {
        const user = await authModel.checkUser(email);

        if (user.length === 0) {
            return {
                success: false,
                message: 'Invalid email or password',
            };
        }

        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        if (!isPasswordValid) {
            return {
                success: false,
                message: 'Invalid email or password',
            };
        }

        const tokenBody = { userId: user[0].id, email: user[0].email };

        const token = jwt.sign(tokenBody, String(config.JWT_SECRET), {
            expiresIn: '24h',
        });

        return { success: true, message: 'Login success', data: { token, email } };
    } catch (error) {
        console.log({ login: error });
        return {
            status: true,
            message: 'Error while login user',
        };
    }
};

const hashPassword = (password: string) => {
    const saltRounds = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, saltRounds);
};

const register = async (name: string, email: string, password: string) => {
    try {
        const existingUser = await authModel.checkUser(email);
        if (existingUser.length > 0) {
            return {
                success: false,
                message: 'Email already registered',
            };
        }

        const hashedPassword = hashPassword(password);

        const _createUser = await authModel.register(name, email, hashedPassword);

        return {
            success: !!_createUser,
            message: 'User registration complete',
        };
    } catch (error) {
        console.log({ register: error });
        return {
            status: true,
            message: 'Error while register user',
        };
    }
};

export const authService = { login, register };
