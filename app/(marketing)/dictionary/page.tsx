import { Metadata } from 'next';
import Link from 'next/link';
import { dictionaryTermsData } from '@/lib/data/dictionary-terms';
import { Container } from '@/components/marketing/container';
import { DictionarySubnav } from '@/components/dictionary-subnav';

export const metadata: Metadata = {
  title: 'Dream Dictionary',
  description: 'Explore our comprehensive dream dictionary with meanings of common dream symbols, themes, and interpretations.',
  openGraph: {
    title: 'Dictionary :: LucidLog',
    description: 'Explore our comprehensive dream dictionary with meanings of common dream symbols, themes, and interpretations.',
    type: 'website',
  },
};

export default function DictionaryPage() {
  const availableLetters = Object.keys(dictionaryTermsData).sort();

  return (
    <Container>
      <hr className="border-gray-200 dark:border-gray-700" />
      
      <DictionarySubnav root/>

      <div className="mx-auto max-w-5xl">
        <div className="my-20 flex justify-between items-start">
          <h1 className="text-4xl font-bold">Dictionary</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-sm">
            Explore the meanings behind your dreams with our comprehensive dictionary of dream symbols and interpretations.
          </p>
        </div>
      </div>

      <hr className="border-gray-200 dark:border-gray-700" />

      <div className="mx-auto max-w-5xl">
        <div className="space-y-28 mt-20">
          {availableLetters.map(letter => {
            return dictionaryTermsData[letter].length > 0 ? (
              <section key={letter} id={`letter-${letter}`} className="scroll-mt-4 flex flex-col">
                <div className="flex items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {letter}
                  </h2>
                </div>
                
                <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {dictionaryTermsData[letter]?.slice(0, 20).map(term => (
                    <Link
                      key={term.id}
                      href={`/dictionary/${term.slug}`}
                      className="text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-300 font-medium text-lg"
                    >
                      {term.name}
                    </Link>
                  ))}
                </div>

                {dictionaryTermsData[letter].length > 20 && (
                  <Link
                    href={`/dictionary/letter/${letter}`}
                    className="text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-300 font-medium text-sm mt-8"
                  >
                    View all &ldquo;{letter}&rdquo; terms →
                  </Link>
                )}
              </section>
            ) : null
          })}
        </div>
      </div>
    </Container>
  );
}
