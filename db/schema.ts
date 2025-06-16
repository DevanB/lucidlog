import { sqliteTable, text, int, index, unique } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const dictionaryTerms = sqliteTable('dictionary_terms', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
  slug: text().notNull().unique(),
  definition: text().notNull(),
  createdAt: int('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  updatedAt: int('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
});

export const relatedTerms = sqliteTable('related_terms', {
  id: int().primaryKey({ autoIncrement: true }),
  termId: int('term_id').references(() => dictionaryTerms.id).notNull(),
  relatedTermId: int('related_term_id').references(() => dictionaryTerms.id).notNull(),
}, (table) => [
  index('related_terms_term_id_idx').on(table.termId),
  unique('related_terms_unique_pair').on(table.termId, table.relatedTermId),
]); 