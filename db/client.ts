import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) throw new Error('Missing TURSO_DATABASE_URL in environment variables.');

if (process.env.NODE_ENV === 'production' && !authToken) {
  throw new Error('Missing TURSO_AUTH_TOKEN in environment variables.');
}

const client = createClient({
  url,
  authToken,
});

export const db = drizzle({ client }); 