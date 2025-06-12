import '@testing-library/jest-dom';
import { beforeEach } from 'vitest';
import { db } from './db/client';
import { relatedTerms, dictionaryTerms } from './db/schema';

beforeEach(async () => {
  // ORDER MATTERS: Delete child tables first if you have foreign key constraints
  await db.delete(relatedTerms);
  await db.delete(dictionaryTerms);
});