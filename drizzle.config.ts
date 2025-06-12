import { defineConfig } from 'drizzle-kit';

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) throw new Error('Missing TURSO_DATABASE_URL in environment variables.');

if (process.env.NODE_ENV === 'production' && !authToken) {
  throw new Error('Missing TURSO_AUTH_TOKEN in environment variables.');
}

export default defineConfig({
  schema: './db/schema.ts',
  out: './db/migrations',
  dialect: 'turso',
  dbCredentials: {
    url,
    authToken
  },
}); 