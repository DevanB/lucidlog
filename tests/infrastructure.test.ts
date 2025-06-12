import { describe, it, expect } from 'vitest';
import { db } from '../db/client';
import { dictionaryTerms } from '../db/schema';
import { sql } from 'drizzle-orm';

describe('infrastructure', () => {
  it('can connect to the database and run a simple query', async () => {
    const row = await db.get(sql`SELECT 1 as one`) as { one: number };
    expect(row.one).toBe(1);
  });

  it('can count rows in dictionaryTerms', async () => {
    const rows = await db.select().from(dictionaryTerms);
    expect(Array.isArray(rows)).toBe(true);
  });
}); 