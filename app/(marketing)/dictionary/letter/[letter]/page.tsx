import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/marketing/container';
import { DictionarySubnav } from '@/components/dictionary-subnav';
import { DictionaryTermService } from '@/lib/services/dictionary-term.service';

type Props = {
  params: { letter: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { letter } = await params
  const uppercaseLetter = letter.toUpperCase();
  
  if (!uppercaseLetter || uppercaseLetter.length !== 1 || !/[A-Z]/.test(uppercaseLetter)) {
    return {
      title: 'Page Not Found',
    };
  }

  const dictionaryTermService = new DictionaryTermService();
  const terms = await dictionaryTermService.getTermsByLetter(uppercaseLetter);
  const termCount = terms.length;

  return {
    title: `${uppercaseLetter} - Dictionary`,
    description: `Explore ${termCount} dream symbols and meanings starting with the letter ${uppercaseLetter}. Discover interpretations for common dreams.`,
    openGraph: {
      title: `${uppercaseLetter} - Dictionary :: LucidLog`,
      description: `Explore ${termCount} dream symbols and meanings starting with the letter ${uppercaseLetter}. Discover interpretations for common dreams.`,
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  const dictionaryTermService = new DictionaryTermService();
  const groupedTerms = await dictionaryTermService.getTermsGroupedByLetter();
  const availableLetters = Object.keys(groupedTerms).filter(
    letter => groupedTerms[letter]?.length > 0
  );
  
  return availableLetters.map((letter) => ({
    letter: letter.toLowerCase(),
  }));
}

export default async function DictionaryLetterPage({ params }: Props) {
  const { letter } = await params
  const uppercaseLetter = letter.toUpperCase();
  
  if (!uppercaseLetter || uppercaseLetter.length !== 1 || !/[A-Z]/.test(uppercaseLetter)) {
    notFound();
  }

  const dictionaryTermService = new DictionaryTermService();
  const terms = await dictionaryTermService.getTermsByLetter(uppercaseLetter);
  
  if (terms.length === 0) {
    notFound();
  }

  return (
    <Container>
      <hr className="border-gray-200 dark:border-gray-700" />
      
      <DictionarySubnav currentLetter={uppercaseLetter} />

      <div className="mx-auto max-w-5xl mb-8">
        <div className="my-20 flex justify-between items-start">
          <h1 className="text-4xl font-bold">{uppercaseLetter}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-sm">
            Explore {terms.length} dream symbol{terms.length !== 1 ? 's' : ''} and meaning{terms.length !== 1 ? 's' : ''} starting with the letter {uppercaseLetter}.
          </p>
        </div>
      </div>

      <hr className="border-gray-200 dark:border-gray-700" />

      <div className="mx-auto max-w-5xl">
        <div className="my-20">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {terms.map(term => (
              <div
                key={term.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-violet-300 dark:hover:border-violet-600 transition-colors"
              >
                <Link
                  href={`/dictionary/${term.slug}`}
                  className="block"
                >
                  <h3 className="text-lg font-medium text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-300 mb-2">
                    {term.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                    {term.definition}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
