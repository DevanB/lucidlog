import 'dotenv/config';
import { seed, reset } from "drizzle-seed";
import * as schema from '@/db/schema';
import { db } from '@/db/client';

async function main() {
  console.log('🌱 Starting dictionary terms seeding with drizzle-seed...');

  try {
    // Clear existing data first
    console.log('🗑️  Clearing existing data...');
    await reset(db, schema);

    console.log('📝 Seeding...');
    await seed(db, schema, { count: 1000}).refine((funcs) => ({
      dictionaryTerms: {
        columns: {
          name: funcs.firstName({
            isUnique: true,
            arraySize: 1
          }),
          slug: funcs.firstName({
            isUnique: true,
            arraySize: 1
          }),
          definition: funcs.loremIpsum({
            sentencesCount: 2,
          }),
        }
      }
    }));

    // // Helper function to create URL-friendly slugs
    // const createSlug = (name: string): string => {
    //   return name
    //     .toLowerCase()
    //     .replace(/[^a-z0-9]+/g, '-')
    //     .replace(/^-+|-+$/g, '');
    // };
    //
    // // Seed dictionary terms with realistic dream-related content
    // .refine((funcs) => ({
    //   dictionaryTerms: {
    //     count: Math.min(dreamTerms.length, dreamDefinitions.length), // Use available data
    //     columns: {
    //       name: funcs.valuesFromArray({ values: dreamTerms }),
    //       slug: funcs.valuesFromArray({ 
    //         values: dreamTerms.map(createSlug)
    //       }),
    //       definition: funcs.valuesFromArray({ values: dreamDefinitions }),
    //     },
    //   },
    // }));
    console.log('🎉 Seeding completed successfully!');

  } catch (error) {
    console.error('❌ Error seeding:', error);
    throw error;
  }
}

// Allow this script to be run directly
if (require.main === module) {
  main()
    .then(() => {
      console.log('✨ Seeding process finished');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Seeding process failed:', error);
      process.exit(1);
    });
}

export { main as seedDictionary };
