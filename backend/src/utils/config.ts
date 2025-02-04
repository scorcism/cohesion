import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const config = {
    DATABASE_URL: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@localhost:5432/${process.env.POSTGRES_DB}`,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
};
