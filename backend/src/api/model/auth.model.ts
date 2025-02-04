import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { users } from '../../db/schema/users';
import { ApiError } from '../../utils/ApiError';

type NewUser = typeof users.$inferInsert;

class AuthModel {
    async register(name: string, email: string, password: string) {
        try {
            const newUser: NewUser = {
                name,
                email,
                password,
            };

            const createdUser = await db.insert(users).values(newUser);

            return !!createdUser;
        } catch (error: any) {
            console.log({ registerError: error });
            throw new ApiError(500, 'Error while registering user');
        }
    }

    async checkUser(email: string) {
        try {
            const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
            return user;
        } catch (error) {
            throw error;
        }
    }
}

export const authModel = new AuthModel();
