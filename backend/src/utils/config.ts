export const config = {
  DATABASE_URL: `postgresql://admin:admin@localhost:5432/cohesion_db`,
  JWT_SECRET: process.env.JWT_SECRET!,
};