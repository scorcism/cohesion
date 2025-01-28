export const config = {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_DB_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,
  OLLAMA_URL: process.env.OLLAMA_URl ?? '127.0.0.1:11434/api',
  JWT_SECRET: process.env.JWT_SECRET,
};