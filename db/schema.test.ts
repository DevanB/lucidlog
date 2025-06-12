import { describe, it, expect } from 'vitest';
import { db } from './client';
import { dictionaryTerms, relatedTerms } from './schema';
import { eq } from 'drizzle-orm';

describe('dictionaryTerms schema', () => {
  it('should create and retrieve a term with related terms', async () => {
    const [lucidTerm] = await db.insert(dictionaryTerms).values({
      name: 'Lucid',
      definition: 'A dream in which the dreamer is aware they are dreaming.',
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    const [fallingTerm] = await db.insert(dictionaryTerms).values({
      name: 'Falling',
      definition: 'A common dream where one feels like they are falling.',
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    const [flyingTerm] = await db.insert(dictionaryTerms).values({
      name: 'Flying',
      definition: 'A dream where one can fly.',
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    await db.insert(relatedTerms).values([
      {
        termId: lucidTerm.id,
        relatedTermId: fallingTerm.id,
      },
      {
        termId: lucidTerm.id,
        relatedTermId: flyingTerm.id,
      }
    ]).returning();

    const rels = await db.select().from(relatedTerms).where(eq(relatedTerms.termId, lucidTerm.id));
    expect(rels.length).toBe(2);
    const relatedIds = rels.map(r => r.relatedTermId).sort();
    expect(relatedIds).toEqual([fallingTerm.id, flyingTerm.id]);
  });

  it('should enforce unique name constraint', async () => {
    await db.insert(dictionaryTerms).values({
      name: 'Falling',
      definition: 'A dream about falling can indicate loss of control.',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await expect(db.insert(dictionaryTerms).values({
      name: 'Falling',
      definition: 'Duplicate name test.',
      createdAt: new Date(),
      updatedAt: new Date(),
    })).rejects.toThrow();
  });

  it('should sort terms alphabetically by name', async () => {
    await db.insert(dictionaryTerms).values({
      name: 'Banana',
      definition: 'Dreaming of bananas...',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await db.insert(dictionaryTerms).values({
      name: 'Apple',
      definition: 'Dreaming of apples...',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const terms = await db.select().from(dictionaryTerms).orderBy(dictionaryTerms.name);
    expect(terms[0].name).toBe('Apple');
    expect(terms[1].name).toBe('Banana');
  });
});

describe('relatedTerms schema', () => {
  it('should prevent duplicate relationships (unique constraint)', async () => {
    // Insert two terms
    const termA = await db.insert(dictionaryTerms).values({
      name: 'A',
      definition: 'A',
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();
    const termB = await db.insert(dictionaryTerms).values({
      name: 'B',
      definition: 'B',
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();
    const idA = termA[0].id;
    const idB = termB[0].id;

    // Insert the relationship once
    await db.insert(relatedTerms).values({ termId: idA, relatedTermId: idB });
    // Try to insert the same relationship again
    await expect(db.insert(relatedTerms).values({ termId: idA, relatedTermId: idB })).rejects.toThrow();
  });
}); 