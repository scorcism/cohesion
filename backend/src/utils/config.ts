import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
    DATABASE_URL: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_DB_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
};
