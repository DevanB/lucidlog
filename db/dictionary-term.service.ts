import { db } from './client';
import { dictionaryTerms, relatedTerms } from './schema';
import { eq, like, asc, inArray } from 'drizzle-orm';
// import { DictionaryTerm } from './types';

async function getRelatedTerms(termId: number): Promise<{ id: number, name: string }[]> {
  // Find all relatedTermIds for this term
  const rels = await db.select().from(relatedTerms).where(eq(relatedTerms.termId, termId));
  if (rels.length === 0) return [];
  const relatedIds = rels.map(r => r.relatedTermId);
  // Get the names for these IDs
  const terms = await db.select({ id: dictionaryTerms.id, name: dictionaryTerms.name })
    .from(dictionaryTerms)
    .where(inArray(dictionaryTerms.id, relatedIds));
  return terms;
}

export class DictionaryTermService {
  async getAllTerms(): Promise<any[]> {
    const rows = await db.select().from(dictionaryTerms);
    return Promise.all(rows.map(async row => ({
      ...row,
      createdAt: new Date(row.createdAt),
      updatedAt: new Date(row.updatedAt),
      relatedTerms: await getRelatedTerms(row.id),
    })));
  }

  async getTermByName(name: string): Promise<any | null> {
    const rows = await db.select().from(dictionaryTerms).where(eq(dictionaryTerms.name, name));
    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      ...row,
      createdAt: new Date(row.createdAt),
      updatedAt: new Date(row.updatedAt),
      relatedTerms: await getRelatedTerms(row.id),
    };
  }

  async getTermsGroupedByLetter(): Promise<Record<string, any[]>> {
    const rows = await db.select().from(dictionaryTerms);
    // TODO: what if a Set was used?
    const grouped: Record<string, any[]> = {};
    for (const row of rows) {
      const letter = row.name[0].toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push({
        ...row,
        createdAt: new Date(row.createdAt),
        updatedAt: new Date(row.updatedAt),
        relatedTerms: await getRelatedTerms(row.id),
      });
    }
    return grouped;
  }

  async getTermsByLetter(letter: string): Promise<any[]> {
    const pattern = letter.length === 1 ? `${letter[0]}%` : `${letter}%`;
    const rows = await db.select().from(dictionaryTerms).where(like(dictionaryTerms.name, pattern)).orderBy(asc(dictionaryTerms.name));
    return Promise.all(
      rows
        .filter(row => row.name[0].toUpperCase() === letter[0].toUpperCase())
        .map(async row => ({
          ...row,
          createdAt: new Date(row.createdAt),
          updatedAt: new Date(row.updatedAt),
          relatedTerms: await getRelatedTerms(row.id),
        }))
    );
  }

  async createTerm(term: Omit<any, 'id' | 'createdAt' | 'updatedAt'>): Promise<any> {
    const now = new Date();
    const [inserted] = await db.insert(dictionaryTerms).values({
      name: term.name,
      definition: term.definition,
      createdAt: now,
      updatedAt: now,
    }).returning();
    return {
      ...inserted,
      createdAt: new Date(inserted.createdAt),
      updatedAt: new Date(inserted.updatedAt),
      relatedTerms: [],
    };
  }

  async updateTerm(id: number, updates: Partial<any>): Promise<any> {
    const now = new Date();
    const { relatedTerms: newRelatedTerms, ...termUpdates } = updates;
    
    const [updated] = await db.update(dictionaryTerms)
      .set({ ...termUpdates, updatedAt: now })
      .where(eq(dictionaryTerms.id, id))
      .returning();
    
    if (!updated) throw new Error('Term not found');

    // Handle related terms if provided
    if (newRelatedTerms) {
      // Delete existing relationships
      await db.delete(relatedTerms).where(eq(relatedTerms.termId, id));
      
      // Add new relationships if any
      if (newRelatedTerms.length > 0) {
        await db.insert(relatedTerms).values(
          newRelatedTerms.map((relatedId: number) => ({
            termId: id,
            relatedTermId: relatedId
          }))
        );
      }
    }

    return {
      ...updated,
      createdAt: new Date(updated.createdAt),
      updatedAt: new Date(updated.updatedAt),
      relatedTerms: await getRelatedTerms(updated.id),
    };
  }

  async deleteTerm(id: number): Promise<void> {
    await db.delete(dictionaryTerms).where(eq(dictionaryTerms.id, id));
  }
} 