import { describe, it, expect } from 'vitest';
import { DictionaryTermService } from './dictionary-term.service';

// You may want to import types as well
// import { DictionaryTerm } from './types';

describe('DictionaryTermService', () => {
  const service = new DictionaryTermService();

  it('should create a new term', async () => {
    const created = await service.createTerm({
      name: 'Dream',
      definition: 'A series of thoughts, images, or emotions during sleep.',
      relatedTerms: [],
    });
    expect(created.id).toBeDefined();
    expect(created.name).toBe('Dream');
    expect(created.definition).toBe('A series of thoughts, images, or emotions during sleep.');
    expect(created.createdAt).toBeInstanceOf(Date);
    expect(created.updatedAt).toBeInstanceOf(Date);
    expect(Array.isArray(created.relatedTerms)).toBe(true);
  });

  it('should fetch a term by name', async () => {
    await service.createTerm({
      name: 'Lucid',
      definition: 'A dream in which the dreamer is aware they are dreaming.',
      relatedTerms: [],
    });
    const fetched = await service.getTermByName('Lucid');
    expect(fetched).not.toBeNull();
    expect(fetched?.name).toBe('Lucid');
    expect(fetched?.definition).toBe('A dream in which the dreamer is aware they are dreaming.');
    expect(Array.isArray(fetched?.relatedTerms)).toBe(true);
    expect(fetched?.relatedTerms.length).toBe(0);
    expect(fetched?.createdAt).toBeInstanceOf(Date);
    expect(fetched?.updatedAt).toBeInstanceOf(Date);
  });

  it('should fetch all terms', async () => {
    await Promise.all([
      service.createTerm({
        name: 'Nightmare',
        definition: 'A frightening or unpleasant dream.',
        relatedTerms: [],
      }),
      service.createTerm({
        name: 'Vision',
        definition: 'A vivid mental image, especially a fanciful one.',
        relatedTerms: [],
      })
    ]);
    
    const all = await service.getAllTerms();
    expect(all.length).toBe(2);
    const names = all.map((t: any) => t.name).sort();
    expect(names).toEqual(['Nightmare', 'Vision']);
    all.forEach((t: any) => {
      expect(t.createdAt).toBeInstanceOf(Date);
      expect(t.updatedAt).toBeInstanceOf(Date);
      expect(Array.isArray(t.relatedTerms)).toBe(true);
      expect(t.relatedTerms.length).toBe(0);
    });
  });

  it('should group terms by first letter', async () => {
    const terms = await Promise.all([
      service.createTerm({
        name: 'Apple',
        definition: 'A fruit.',
        relatedTerms: [],
      }),
      service.createTerm({
        name: 'Banana',
        definition: 'Another fruit.',
        relatedTerms: [],
      }),
      service.createTerm({
        name: 'Avocado',
        definition: 'Yet another fruit.',
        relatedTerms: [],
      })
    ]);

    const grouped = await service.getTermsGroupedByLetter();
    const keys = Object.keys(grouped).sort();
    expect(keys).toEqual(['A', 'B']);
    expect(grouped['A'].length).toBe(2);
    expect(grouped['B'].length).toBe(1);
    const aNames = grouped['A'].map((t: any) => t.name).sort();
    expect(aNames).toEqual(['Apple', 'Avocado']);
    const bNames = grouped['B'].map((t: any) => t.name);
    expect(bNames).toEqual(['Banana']);
    Object.values(grouped).flat().forEach((t: any) => {
      expect(t.createdAt).toBeInstanceOf(Date);
      expect(t.updatedAt).toBeInstanceOf(Date);
      expect(Array.isArray(t.relatedTerms)).toBe(true);
      expect(t.relatedTerms.length).toBe(0);
    });
  });

  it('should get all terms by a given letter', async () => {
    await service.createTerm({
      name: 'Alpha',
      definition: 'First letter.',
      relatedTerms: [],
    });
    await service.createTerm({
      name: 'Albatross',
      definition: 'A bird.',
      relatedTerms: [],
    });
    await service.createTerm({
      name: 'Beta',
      definition: 'Second letter.',
      relatedTerms: [],
    });
    await service.createTerm({
      name: 'Bravo',
      definition: 'A word for B.',
      relatedTerms: [],
    });
    const aTerms = await service.getTermsByLetter('A');
    expect(aTerms.length).toBe(2);
    const aNames = aTerms.map((t: any) => t.name);
    expect(aNames).toContain('Alpha');
    expect(aNames).toContain('Albatross');
    aTerms.forEach((t: any) => {
      expect(t.createdAt).toBeInstanceOf(Date);
      expect(t.updatedAt).toBeInstanceOf(Date);
      expect(Array.isArray(t.relatedTerms)).toBe(true);
      expect(t.relatedTerms.length).toBe(0);
    });
    const bTerms = await service.getTermsByLetter('b'); // test case-insensitivity
    expect(bTerms.length).toBe(2);
    const bNames = bTerms.map((t: any) => t.name);
    expect(bNames).toContain('Beta');
    expect(bNames).toContain('Bravo');
    bTerms.forEach((t: any) => {
      expect(t.createdAt).toBeInstanceOf(Date);
      expect(t.updatedAt).toBeInstanceOf(Date);
      expect(Array.isArray(t.relatedTerms)).toBe(true);
      expect(t.relatedTerms.length).toBe(0);
    });
  });

  it('should update a term', async () => {
    const created = await service.createTerm({
      name: 'UpdateMe',
      definition: 'Old definition.',
      relatedTerms: [],
    });
    const updated = await service.updateTerm(created.id, { definition: 'New definition.' });
    expect(updated.definition).toBe('New definition.');
    expect(updated.updatedAt).toBeInstanceOf(Date);
    expect(updated.updatedAt.getTime()).toBeGreaterThanOrEqual(created.updatedAt.getTime());
  });

  it('should delete a term', async () => {
    const created = await service.createTerm({
      name: 'DeleteMe',
      definition: 'To be deleted.',
      relatedTerms: [],
    });
    await service.deleteTerm(created.id);
    const fetched = await service.getTermByName('DeleteMe');
    expect(fetched).toBeNull();
  });

  it('should not allow duplicate names', async () => {
    await service.createTerm({
      name: 'Unique',
      definition: 'First.',
      relatedTerms: [],
    });
    await expect(service.createTerm({
      name: 'Unique',
      definition: 'Second.',
      relatedTerms: [],
    })).rejects.toThrow();
  });

  it('should return null for non-existent term', async () => {
    const fetched = await service.getTermByName('DoesNotExist');
    expect(fetched).toBeNull();
  });

  it('should create and retrieve a term with related terms', async () => {
    // Create three terms using the service
    const termA = await service.createTerm({
      name: 'Alpha',
      definition: 'First.',
      relatedTerms: [],
    });
    const termB = await service.createTerm({
      name: 'Beta',
      definition: 'Second.',
      relatedTerms: [],
    });
    const termC = await service.createTerm({
      name: 'Bravo',
      definition: 'Third.',
      relatedTerms: [],
    });

    // Update Alpha to include related terms
    await service.updateTerm(termA.id, {
      relatedTerms: [termB.id, termC.id],
    });

    // Test getTermByName
    const alpha = await service.getTermByName('Alpha');
    expect(alpha).not.toBeNull();
    expect(Array.isArray(alpha.relatedTerms)).toBe(true);
    expect(alpha.relatedTerms.length).toBe(2);
    for (const rel of alpha.relatedTerms) {
      expect(typeof rel.id).toBe('number');
      expect(typeof rel.name).toBe('string');
    }
    const relNames = alpha.relatedTerms.map((r: any) => r.name);
    expect(relNames).toContain('Beta');
    expect(relNames).toContain('Bravo');

    // Test getAllTerms
    const all = await service.getAllTerms();
    const alphaAll = all.find((t: any) => t.name === 'Alpha');
    expect(alphaAll.relatedTerms.length).toBe(2);

    // Test getTermsGroupedByLetter
    const grouped = await service.getTermsGroupedByLetter();
    expect(grouped['A'][0].relatedTerms.length).toBe(2);

    // Test getTermsByLetter
    const aTerms = await service.getTermsByLetter('A');
    expect(aTerms[0].relatedTerms.length).toBe(2);
  });
}); 