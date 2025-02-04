import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { config } from '../utils/config';

const pool = new Pool({
    connectionString: config.DATABASE_URL,
});
export const db = drizzle({ client: pool });
