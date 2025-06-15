import { db } from '@/db/client';
import { dictionaryTerms, relatedTerms } from '@/db/schema';
import { eq, asc, inArray } from 'drizzle-orm';
import { 
  DictionaryTerm, 
  RelatedTermReference, 
  CreateDictionaryTermInput, 
  UpdateDictionaryTermInput,
  DictionaryTermsGrouped 
} from '@/types/services/dictionary-terms';

function getEffectiveFirstLetter(term: string): string {
  const trimmed = term.trim();
  if (!trimmed) return '';
  
  const words = trimmed.split(/\s+/);
  const firstWord = words[0].toLowerCase();
  const articles = ['a', 'an', 'the'];
  
  return articles.includes(firstWord) && words.length > 1 
    ? words[1][0].toUpperCase()
    : words[0][0].toUpperCase();
}

async function getRelatedTerms(termId: number): Promise<Array<RelatedTermReference>> {
  // Find all relatedTermIds for this term
  const rels = await db.select().from(relatedTerms).where(eq(relatedTerms.termId, termId));
  if (rels.length === 0) return [];
  const relatedIds = rels.map(r => r.relatedTermId);
  // Get the names and slugs for these IDs
  const terms = await db.select({ id: dictionaryTerms.id, name: dictionaryTerms.name, slug: dictionaryTerms.slug })
    .from(dictionaryTerms)
    .where(inArray(dictionaryTerms.id, relatedIds));
  return terms;
}

export class DictionaryTermService {
  async getAllTerms(): Promise<Array<DictionaryTerm>> {
    const rows = await db.select().from(dictionaryTerms);
    return Promise.all(rows.map(async row => ({
      ...row,
      createdAt: new Date(row.createdAt),
      updatedAt: new Date(row.updatedAt),
      relatedTerms: await getRelatedTerms(row.id),
    })));
  }

  async getTermBySlug(slug: string): Promise<DictionaryTerm | null> {
    const rows = await db.select().from(dictionaryTerms).where(eq(dictionaryTerms.slug, slug));
    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      ...row,
      createdAt: new Date(row.createdAt),
      updatedAt: new Date(row.updatedAt),
      relatedTerms: await getRelatedTerms(row.id),
    };
  }

  async getTermByName(name: string): Promise<DictionaryTerm | null> {
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

  async getTermsGroupedByLetter(): Promise<DictionaryTermsGrouped> {
    const rows = await db.select().from(dictionaryTerms);
    // TODO: what if a Set was used?
    const grouped: DictionaryTermsGrouped = {};
    for (const row of rows) {
      const letter = getEffectiveFirstLetter(row.name);
      grouped[letter] = grouped[letter] || [];
      grouped[letter].push({
        ...row,
        createdAt: new Date(row.createdAt),
        updatedAt: new Date(row.updatedAt),
        relatedTerms: await getRelatedTerms(row.id),
      });
    }
    return grouped;
  }

  async getTermsByLetter(letter: string): Promise<Array<DictionaryTerm>> {
    const rows = await db.select().from(dictionaryTerms).orderBy(asc(dictionaryTerms.name));
    const targetLetter = letter[0].toUpperCase();
    
    return Promise.all(
      rows
        .filter(row => getEffectiveFirstLetter(row.name) === targetLetter)
        .map(async row => ({
          ...row,
          createdAt: new Date(row.createdAt),
          updatedAt: new Date(row.updatedAt),
          relatedTerms: await getRelatedTerms(row.id),
        }))
    );
  }

  async createTerm(term: CreateDictionaryTermInput): Promise<DictionaryTerm> {
    const now = new Date();
    const { relatedTerms: newRelatedTerms, ...termData } = term;
    
    const [inserted] = await db.insert(dictionaryTerms).values({
      name: termData.name,
      slug: termData.slug,
      definition: termData.definition,
      createdAt: now,
      updatedAt: now,
    }).returning();

    // Handle related terms if provided
    if (newRelatedTerms && newRelatedTerms.length > 0) {
      await db.insert(relatedTerms).values(
        newRelatedTerms.map(relatedId => ({
          termId: inserted.id,
          relatedTermId: relatedId
        }))
      );
    }

    return {
      ...inserted,
      createdAt: new Date(inserted.createdAt),
      updatedAt: new Date(inserted.updatedAt),
      relatedTerms: await getRelatedTerms(inserted.id),
    };
  }

  async updateTerm(id: number, updates: UpdateDictionaryTermInput): Promise<DictionaryTerm> {
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
          newRelatedTerms.map(relatedId => ({
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