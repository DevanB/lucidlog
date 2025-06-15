import { describe, it, expect } from 'vitest';
import { DictionaryTermService } from '@/lib/services/dictionary-term.service';

describe('DictionaryTermService', () => {
  const service = new DictionaryTermService();

  it('should create a new term', async () => {
    const created = await service.createTerm({
      name: 'Dream',
      slug: 'dream',
      definition: 'A series of thoughts, images, or emotions during sleep.',
      relatedTerms: [],
    });
    expect(created.id).toBeDefined();
    expect(created.name).toBe('Dream');
    expect(created.slug).toBe('dream');
    expect(created.definition).toBe('A series of thoughts, images, or emotions during sleep.');
    expect(created.createdAt).toBeInstanceOf(Date);
    expect(created.updatedAt).toBeInstanceOf(Date);
    expect(Array.isArray(created.relatedTerms)).toBe(true);
    expect(created.relatedTerms.length).toBe(0);
  });

  it('should fetch a term by name', async () => {
    await service.createTerm({
      name: 'Lucid',
      slug: 'lucid',
      definition: 'A dream in which the dreamer is aware they are dreaming.',
      relatedTerms: [],
    });
    const fetched = await service.getTermByName('Lucid');
    expect(fetched).not.toBeNull();
    expect(fetched?.name).toBe('Lucid');
    expect(fetched?.slug).toBe('lucid');
    expect(fetched?.definition).toBe('A dream in which the dreamer is aware they are dreaming.');
    expect(Array.isArray(fetched?.relatedTerms)).toBe(true);
    expect(fetched?.relatedTerms.length).toBe(0);
    expect(fetched?.createdAt).toBeInstanceOf(Date);
    expect(fetched?.updatedAt).toBeInstanceOf(Date);
  });

  it('should fetch a term by slug', async () => {
    const created = await service.createTerm({
      name: 'Test Term',
      slug: 'test-term',
      definition: 'A test term for slug testing.',
      relatedTerms: [],
    });
    
    const fetched = await service.getTermBySlug('test-term');
    expect(fetched).not.toBeNull();
    expect(fetched?.id).toBe(created.id);
    expect(fetched?.name).toBe('Test Term');
    expect(fetched?.slug).toBe('test-term');
    expect(fetched?.definition).toBe('A test term for slug testing.');
    expect(Array.isArray(fetched?.relatedTerms)).toBe(true);
    expect(fetched?.relatedTerms.length).toBe(0);
    expect(fetched?.createdAt).toBeInstanceOf(Date);
    expect(fetched?.updatedAt).toBeInstanceOf(Date);
  });

  it('should return null when fetching a term by non-existent slug', async () => {
    const fetched = await service.getTermBySlug('non-existent-slug');
    expect(fetched).toBeNull();
  });

  it('should fetch all terms', async () => {
    await Promise.all([
      service.createTerm({
        name: 'Nightmare',
        slug: 'nightmare',
        definition: 'A frightening or unpleasant dream.',
        relatedTerms: [],
      }),
      service.createTerm({
        name: 'Vision',
        slug: 'vision',
        definition: 'A vivid mental image, especially a fanciful one.',
        relatedTerms: [],
      })
    ]);
    
    const all = await service.getAllTerms();
    expect(all.length).toBe(2);
    const names = all.map(t => t.name).sort();
    expect(names).toEqual(['Nightmare', 'Vision']);
    all.forEach(t => {
      expect(t.createdAt).toBeInstanceOf(Date);
      expect(t.updatedAt).toBeInstanceOf(Date);
      expect(Array.isArray(t.relatedTerms)).toBe(true);
      expect(t.relatedTerms.length).toBe(0);
    });
  });

  it('should group terms by first letter', async () => {
    await Promise.all([
      service.createTerm({
        name: 'A Car',
        slug: 'a-car',
        definition: 'A car.',
        relatedTerms: [],
      }),
      service.createTerm({
        name: 'Banana',
        slug: 'banana',
        definition: 'Another fruit.',
        relatedTerms: [],
      }),
      service.createTerm({
        name: 'The Avocado',
        slug: 'the-avocado',
        definition: 'Yet another fruit.',
        relatedTerms: [],
      })
    ]);

    const grouped = await service.getTermsGroupedByLetter();
    const keys = Object.keys(grouped).sort();
    expect(keys).toEqual(['A', 'B', 'C']);
    expect(grouped['A'].length).toBe(1);
    expect(grouped['B'].length).toBe(1);
    expect(grouped['C'].length).toBe(1);
    const aNames = grouped['A'].map(t => t.name).sort();
    expect(aNames).toEqual(['The Avocado']);
    const bNames = grouped['B'].map(t => t.name);
    expect(bNames).toEqual(['Banana']);
    const cNames = grouped['C'].map(t => t.name);
    expect(cNames).toEqual(['A Car']);
    Object.values(grouped).flat().forEach(t => {
      expect(t.createdAt).toBeInstanceOf(Date);
      expect(t.updatedAt).toBeInstanceOf(Date);
      expect(Array.isArray(t.relatedTerms)).toBe(true);
      expect(t.relatedTerms.length).toBe(0);
    });
  });

  it('should get all terms by a given letter', async () => {
    await service.createTerm({
      name: 'Alpha',
      slug: 'alpha',
      definition: 'First letter.',
      relatedTerms: [],
    });
    await service.createTerm({
      name: 'Albatross',
      slug: 'albatross',
      definition: 'A bird.',
      relatedTerms: [],
    });
    await service.createTerm({
      name: 'Beta',
      slug: 'beta',
      definition: 'Second letter.',
      relatedTerms: [],
    });
    await service.createTerm({
      name: 'Bravo',
      slug: 'bravo',
      definition: 'A word for B.',
      relatedTerms: [],
    });
    const aTerms = await service.getTermsByLetter('A');
    expect(aTerms.length).toBe(2);
    const aNames = aTerms.map(t => t.name);
    expect(aNames).toContain('Alpha');
    expect(aNames).toContain('Albatross');
    aTerms.forEach(t => {
      expect(t.createdAt).toBeInstanceOf(Date);
      expect(t.updatedAt).toBeInstanceOf(Date);
      expect(Array.isArray(t.relatedTerms)).toBe(true);
      expect(t.relatedTerms.length).toBe(0);
    });
    const bTerms = await service.getTermsByLetter('b'); // test case-insensitivity
    expect(bTerms.length).toBe(2);
    const bNames = bTerms.map(t => t.name);
    expect(bNames).toContain('Beta');
    expect(bNames).toContain('Bravo');
    bTerms.forEach(t => {
      expect(t.createdAt).toBeInstanceOf(Date);
      expect(t.updatedAt).toBeInstanceOf(Date);
      expect(Array.isArray(t.relatedTerms)).toBe(true);
      expect(t.relatedTerms.length).toBe(0);
    });
  });

  it('should update a term', async () => {
    const created = await service.createTerm({
      name: 'UpdateMe',
      slug: 'updateme',
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
      slug: 'deleteme',
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
      slug: 'unique',
      definition: 'First.',
      relatedTerms: [],
    });
    await expect(service.createTerm({
      name: 'Unique',
      slug: 'unique-2',
      definition: 'Second.',
      relatedTerms: [],
    })).rejects.toThrow();
  });

  it('should return null for non-existent term', async () => {
    const fetched = await service.getTermByName('DoesNotExist');
    expect(fetched).toBeNull();
  });

  it('should link related terms via update and retrieve them consistently across all methods', async () => {
    // Create three terms using the service
    const termA = await service.createTerm({
      name: 'Alpha',
      slug: 'alpha',
      definition: 'First.',
      relatedTerms: [],
    });
    const termB = await service.createTerm({
      name: 'Beta',
      slug: 'beta',
      definition: 'Second.',
      relatedTerms: [],
    });
    const termC = await service.createTerm({
      name: 'Bravo',
      slug: 'bravo',
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
    expect(alpha?.relatedTerms).toBeInstanceOf(Array);
    expect(alpha?.relatedTerms.length).toBe(2);
    const relNames = alpha?.relatedTerms.map(r => r.name);
    expect(relNames).toContain('Beta');
    expect(relNames).toContain('Bravo');
    if (alpha) {
      for (const rel of alpha.relatedTerms) {
        expect(typeof rel.id).toBe('number');
        expect(typeof rel.name).toBe('string');
      }
    }

    // Test getAllTerms
    const all = await service.getAllTerms();
    const alphaAll = all.find(t => t.name === 'Alpha');
    expect(alphaAll).toBeDefined();
    if (alphaAll) expect(alphaAll.relatedTerms.length).toBe(2);

    // Test getTermsGroupedByLetter
    const grouped = await service.getTermsGroupedByLetter();
    expect(grouped['A'][0].relatedTerms.length).toBe(2);

    // Test getTermsByLetter
    const aTerms = await service.getTermsByLetter('A');
    expect(aTerms[0].relatedTerms.length).toBe(2);
  });
  
  describe('Linking related terms on create', () => {
    it('should link related terms when creating a new term', async () => {
      // First create some terms to use as related terms
      const term1 = await service.createTerm({
        name: 'Sleep',
        slug: 'sleep',
        definition: 'A state of rest.',
        relatedTerms: [],
      });
      const term2 = await service.createTerm({
        name: 'REM',
        slug: 'rem',
        definition: 'Rapid Eye Movement sleep stage.',
        relatedTerms: [],
      });

      // Create a new term with related terms
      const dreamTerm = await service.createTerm({
        name: 'Lucid Dreaming',
        slug: 'lucid-dreaming',
        definition: 'Conscious awareness during dreams.',
        relatedTerms: [term1.id, term2.id],
      });

      // Verify the term was created with related terms
      expect(dreamTerm.id).toBeDefined();
      expect(dreamTerm.name).toBe('Lucid Dreaming');
      expect(Array.isArray(dreamTerm.relatedTerms)).toBe(true);
      expect(dreamTerm.relatedTerms.length).toBe(2);

      // Verify the related terms have correct structure
      for (const rel of dreamTerm.relatedTerms) {
        expect(typeof rel.id).toBe('number');
        expect(typeof rel.name).toBe('string');
      }

      // Verify the specific related terms
      const relatedNames = dreamTerm.relatedTerms.map(r => r.name).sort();
      expect(relatedNames).toEqual(['REM', 'Sleep']);
      const relatedIds = dreamTerm.relatedTerms.map(r => r.id).sort();
      expect(relatedIds).toEqual([term1.id, term2.id].sort());
    });

    it('should create term without related terms when none provided', async () => {
      const term = await service.createTerm({
        name: 'Simple Term',
        slug: 'simple-term',
        definition: 'A term without relations.',
      });

      expect(term.relatedTerms).toEqual([]);
    });

    it('should create term without related terms when empty array provided', async () => {
      const term = await service.createTerm({
        name: 'Another Simple Term',
        slug: 'another-simple-term',
        definition: 'A term with empty relations.',
        relatedTerms: [],
      });

      expect(term.relatedTerms).toEqual([]);
    });

    it('should retrieve created term with related terms via getTermByName', async () => {
      // Create related terms
      const relatedTerm1 = await service.createTerm({
        name: 'Night',
        slug: 'night',
        definition: 'Time when we sleep.',
        relatedTerms: [],
      });
      const relatedTerm2 = await service.createTerm({
        name: 'Consciousness',
        slug: 'consciousness',
        definition: 'State of awareness.',
        relatedTerms: [],
      });

      // Create main term with relations
      await service.createTerm({
        name: 'Dream State',
        slug: 'dream-state',
        definition: 'State of dreaming.',
        relatedTerms: [relatedTerm1.id, relatedTerm2.id],
      });

      // Retrieve and verify
      const retrieved = await service.getTermByName('Dream State');
      expect(retrieved).not.toBeNull();
      if (retrieved) {
        expect(retrieved.relatedTerms.length).toBe(2);
        const retrievedNames = retrieved.relatedTerms.map(r => r.name).sort();
        expect(retrievedNames).toEqual(['Consciousness', 'Night']);
      }
    });
  });
  
  describe('Linking related terms on update', () => {
    it('should add related terms to an existing term', async () => {
      // Create terms
      const mainTerm = await service.createTerm({
        name: 'Main Term',
        slug: 'main-term',
        definition: 'A main term.',
        relatedTerms: [],
      });
      const relatedTerm1 = await service.createTerm({
        name: 'Related One',
        slug: 'related-one',
        definition: 'First related term.',
        relatedTerms: [],
      });
      const relatedTerm2 = await service.createTerm({
        name: 'Related Two',
        slug: 'related-two',
        definition: 'Second related term.',
        relatedTerms: [],
      });

      // Update main term to add related terms
      const updated = await service.updateTerm(mainTerm.id, {
        relatedTerms: [relatedTerm1.id, relatedTerm2.id],
      });

      // Verify related terms were added
      expect(updated.relatedTerms.length).toBe(2);
      const relatedNames = updated.relatedTerms.map(r => r.name).sort();
      expect(relatedNames).toEqual(['Related One', 'Related Two']);
    });

    it('should replace existing related terms with new ones', async () => {
      // Create terms
      const mainTerm = await service.createTerm({
        name: 'Main Term',
        slug: 'main-term-2',
        definition: 'A main term.',
        relatedTerms: [],
      });
      const oldRelated = await service.createTerm({
        name: 'Old Related',
        slug: 'old-related',
        definition: 'Old related term.',
        relatedTerms: [],
      });
      const newRelated1 = await service.createTerm({
        name: 'New Related One',
        slug: 'new-related-one',
        definition: 'New related term 1.',
        relatedTerms: [],
      });
      const newRelated2 = await service.createTerm({
        name: 'New Related Two',
        slug: 'new-related-two',
        definition: 'New related term 2.',
        relatedTerms: [],
      });

      // First, add the old related term
      await service.updateTerm(mainTerm.id, {
        relatedTerms: [oldRelated.id],
      });

      // Verify old related term was added
      let current = await service.getTermByName('Main Term');
      expect(current).not.toBeNull();
      if (current) {
        expect(current.relatedTerms.length).toBe(1);
        expect(current.relatedTerms[0].name).toBe('Old Related');
      }

      // Now replace with new related terms
      const updated = await service.updateTerm(mainTerm.id, {
        relatedTerms: [newRelated1.id, newRelated2.id],
      });

      // Verify old related term was replaced with new ones
      expect(updated.relatedTerms.length).toBe(2);
      const relatedNames = updated.relatedTerms.map(r => r.name).sort();
      expect(relatedNames).toEqual(['New Related One', 'New Related Two']);
      expect(relatedNames).not.toContain('Old Related');
    });

    it('should remove all related terms when empty array provided', async () => {
      // Create terms with initial related terms
      const relatedTerm = await service.createTerm({
        name: 'To Remove',
        slug: 'to-remove',
        definition: 'Term to be removed.',
        relatedTerms: [],
      });
      const mainTerm = await service.createTerm({
        name: 'Main Term',
        slug: 'main-term-3',
        definition: 'A main term.',
        relatedTerms: [relatedTerm.id],
      });

      // Verify related term exists
      expect(mainTerm.relatedTerms.length).toBe(1);

      // Update to remove all related terms
      const updated = await service.updateTerm(mainTerm.id, {
        relatedTerms: [],
      });

      // Verify all related terms were removed
      expect(updated.relatedTerms.length).toBe(0);
    });

    it('should update both definition and related terms simultaneously', async () => {
      // Create terms
      const mainTerm = await service.createTerm({
        name: 'Main Term',
        slug: 'main-term-6',
        definition: 'Original definition.',
        relatedTerms: [],
      });
      const relatedTerm = await service.createTerm({
        name: 'Related Term',
        slug: 'related-term',
        definition: 'A related term.',
        relatedTerms: [],
      });

      // Update both definition and related terms
      const updated = await service.updateTerm(mainTerm.id, {
        definition: 'Updated definition.',
        relatedTerms: [relatedTerm.id],
      });

      // Verify both were updated
      expect(updated.definition).toBe('Updated definition.');
      expect(updated.relatedTerms.length).toBe(1);
      expect(updated.relatedTerms[0].name).toBe('Related Term');
    });

    it('should not affect related terms when they are not included in update', async () => {
      // Create terms with initial related terms
      const relatedTerm = await service.createTerm({
        name: 'Keep Me',
        slug: 'keep-me',
        definition: 'Term to keep.',
        relatedTerms: [],
      });
      const mainTerm = await service.createTerm({
        name: 'Main Term',
        slug: 'main-term-5',
        definition: 'Original definition.',
        relatedTerms: [relatedTerm.id],
      });

      // Update only the definition, not related terms
      const updated = await service.updateTerm(mainTerm.id, {
        definition: 'Updated definition.',
      });

      // Verify definition changed but related terms remained
      expect(updated.definition).toBe('Updated definition.');
      expect(updated.relatedTerms.length).toBe(1);
      expect(updated.relatedTerms[0].name).toBe('Keep Me');
    });
  });

  describe('Article handling and multi-word terms', () => {
    it('should ignore leading articles when grouping terms by letter', async () => {
      await Promise.all([
        service.createTerm({
          name: 'The Dream',
          slug: 'the-dream',
          definition: 'A dream with the article.',
          relatedTerms: [],
        }),
        service.createTerm({
          name: 'An Apple',
          slug: 'an-apple',
          definition: 'An apple with the article.',
          relatedTerms: [],
        }),
        service.createTerm({
          name: 'A Banana',
          slug: 'a-banana',
          definition: 'A banana with the article.',
          relatedTerms: [],
        }),
        service.createTerm({
          name: 'Dream Journal',
          slug: 'dream-journal',
          definition: 'A journal without article.',
          relatedTerms: [],
        }),
        service.createTerm({
          name: 'Beautiful Vision',
          slug: 'beautiful-vision',
          definition: 'A vision without article.',
          relatedTerms: [],
        })
      ]);

      const grouped = await service.getTermsGroupedByLetter();
      
      // "The Dream" should be grouped under 'D', not 'T'
      expect(grouped['D']).toBeDefined();
      expect(grouped['D'].some(t => t.name === 'The Dream')).toBe(true);
      expect(grouped['D'].some(t => t.name === 'Dream Journal')).toBe(true);
      
      // "An Apple" should be grouped under 'A', not 'A' for the article
      expect(grouped['A']).toBeDefined();
      expect(grouped['A'].some(t => t.name === 'An Apple')).toBe(true);
      
      // "A Banana" should be grouped under 'B', not 'A'
      expect(grouped['B']).toBeDefined();
      expect(grouped['B'].some(t => t.name === 'A Banana')).toBe(true);
      expect(grouped['B'].some(t => t.name === 'Beautiful Vision')).toBe(true);
      
      // Should not have terms grouped under 'T' for "The"
      grouped['T'] && expect(grouped['T'].some(t => t.name === 'The Dream')).toBe(false);
    });

    it('should ignore leading articles when filtering terms by letter', async () => {
      await Promise.all([
        service.createTerm({
          name: 'The Cat',
          slug: 'the-cat',
          definition: 'A cat with the article.',
          relatedTerms: [],
        }),
        service.createTerm({
          name: 'An Elephant',
          slug: 'an-elephant',
          definition: 'An elephant with the article.',
          relatedTerms: [],
        }),
        service.createTerm({
          name: 'A Dog',
          slug: 'a-dog',
          definition: 'A dog with the article.',
          relatedTerms: [],
        }),
        service.createTerm({
          name: 'Cat Food',
          slug: 'cat-food',
          definition: 'Food for cats.',
          relatedTerms: [],
        }),
        service.createTerm({
          name: 'Elephant Trunk',
          slug: 'elephant-trunk',
          definition: 'The trunk of an elephant.',
          relatedTerms: [],
        })
      ]);

      // Get terms by letter 'C' - should include "The Cat" and "Cat Food"
      const cTerms = await service.getTermsByLetter('C');
      const cNames = cTerms.map(t => t.name);
      expect(cNames).toContain('The Cat');
      expect(cNames).toContain('Cat Food');
      expect(cNames).not.toContain('A Dog'); // Should not be in 'C'
      
      // Get terms by letter 'E' - should include "An Elephant" and "Elephant Trunk"
      const eTerms = await service.getTermsByLetter('E');
      const eNames = eTerms.map(t => t.name);
      expect(eNames).toContain('An Elephant');
      expect(eNames).toContain('Elephant Trunk');
      
      // Get terms by letter 'D' - should include "A Dog"
      const dTerms = await service.getTermsByLetter('D');
      const dNames = dTerms.map(t => t.name);
      expect(dNames).toContain('A Dog');
    });

    it('should handle edge cases with articles', async () => {
      await Promise.all([
        service.createTerm({
          name: 'A',
          slug: 'a',
          definition: 'Just the letter A.',
          relatedTerms: [],
        }),
        service.createTerm({
          name: 'The',
          slug: 'the',
          definition: 'Just the word The.',
          relatedTerms: [],
        }),
        service.createTerm({
          name: 'An',
          slug: 'an',
          definition: 'Just the word An.',
          relatedTerms: [],
        }),
        service.createTerm({
          name: 'THE UPPER',
          slug: 'the-upper',
          definition: 'All caps with article.',
          relatedTerms: [],
        })
      ]);

      const grouped = await service.getTermsGroupedByLetter();
      
      // Single letter/word terms should be grouped by their actual first letter
      expect(grouped['A']).toBeDefined();
      expect(grouped['A'].some(t => t.name === 'A')).toBe(true);
      expect(grouped['A'].some(t => t.name === 'An')).toBe(true);
      
      expect(grouped['T']).toBeDefined();
      expect(grouped['T'].some(t => t.name === 'The')).toBe(true);
      
      // "THE UPPER" should be grouped under 'U' (case-insensitive)
      expect(grouped['U']).toBeDefined();
      expect(grouped['U'].some(t => t.name === 'THE UPPER')).toBe(true);
    });

    it('should handle multi-word terms without articles correctly', async () => {
      await Promise.all([
        service.createTerm({
          name: 'Dream Journal Entry',
          slug: 'dream-journal-entry',
          definition: 'A specific entry in a dream journal.',
          relatedTerms: [],
        }),
        service.createTerm({
          name: 'Lucid Dream State',
          slug: 'lucid-dream-state',
          definition: 'The state of being in a lucid dream.',
          relatedTerms: [],
        }),
        service.createTerm({
          name: 'Beautiful Nightmare Vision',
          slug: 'beautiful-nightmare-vision',
          definition: 'A complex multi-word term.',
          relatedTerms: [],
        })
      ]);

      const grouped = await service.getTermsGroupedByLetter();
      
      expect(grouped['D']).toBeDefined();
      expect(grouped['D'].some(t => t.name === 'Dream Journal Entry')).toBe(true);
      
      expect(grouped['L']).toBeDefined();
      expect(grouped['L'].some(t => t.name === 'Lucid Dream State')).toBe(true);
      
      expect(grouped['B']).toBeDefined();
      expect(grouped['B'].some(t => t.name === 'Beautiful Nightmare Vision')).toBe(true);
    });

    it('should handle multi-word terms with leading articles correctly', async () => {
      await Promise.all([
        service.createTerm({
          name: 'Dream Journal Entry',
          slug: 'dream-journal-entry-2',
          definition: 'A specific entry in a dream journal.',
          relatedTerms: [],
        }),
        service.createTerm({
          name: 'The Lucid Dream State',
          slug: 'the-lucid-dream-state',
          definition: 'The state of being in a lucid dream.',
          relatedTerms: [],
        }),
        service.createTerm({
          name: 'A Beautiful Nightmare Vision',
          slug: 'a-beautiful-nightmare-vision',
          definition: 'A complex multi-word term.',
          relatedTerms: [],
        })
      ]);

      const grouped = await service.getTermsGroupedByLetter();
      
      expect(grouped['D']).toBeDefined();
      expect(grouped['D'].some(t => t.name === 'Dream Journal Entry')).toBe(true);
      
      expect(grouped['L']).toBeDefined();
      expect(grouped['L'].some(t => t.name === 'The Lucid Dream State')).toBe(true);
      
      expect(grouped['B']).toBeDefined();
      expect(grouped['B'].some(t => t.name === 'A Beautiful Nightmare Vision')).toBe(true);
    });
  });
});