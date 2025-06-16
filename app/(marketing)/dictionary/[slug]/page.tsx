import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DictionaryTermService } from '@/lib/services/dictionary-term.service';
import { Container } from '@/components/marketing/container';
import { DictionarySubnav } from '@/components/dictionary-subnav';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const dictionaryTermService = new DictionaryTermService();
  const term = await dictionaryTermService.getTermBySlug(slug);
  
  if (!term) {
    return {
      title: 'Term Not Found',
    };
  }

  return {
    title: `${term.name} - Dictionary`,
    description: term.definition,
    openGraph: {
      title: `${term.name} - Dictionary :: LucidLog`,
      description: term.definition,
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  const dictionaryTermService = new DictionaryTermService();
  const allTerms = await dictionaryTermService.getAllTerms();
  
  return allTerms.map(term => ({ slug: term.slug }));
}

export default async function DictionaryTermPage({ params }: Props) {
  const { slug } = await params
  const dictionaryTermService = new DictionaryTermService();
  const term = await dictionaryTermService.getTermBySlug(slug);
  
  if (!term) {
    notFound();
  }

  return (
    <Container>
      <hr className="border-gray-200 dark:border-gray-700" />

      <DictionarySubnav />

      <div className="mx-auto max-w-5xl">
        <div className="my-20">
          <h1 className="text-3xl font-bold mb-6">{term.name}</h1>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {term.definition}
            </p>
          </div>
        </div>
      </div>

      {term.relatedTerms && term.relatedTerms.length > 0 && (
        <>
          <hr className="border-gray-200 dark:border-gray-700" />
          <div className="mx-auto max-w-5xl">
            <div className="my-20">
              <h2 className="text-2xl font-bold mb-6">Related Terms</h2>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {term.relatedTerms.map(relatedTerm => (
                  <Link
                    key={relatedTerm.id}
                    href={`/dictionary/${relatedTerm.slug}`}
                    className="block border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-violet-300 dark:hover:border-violet-600 transition-colors"
                  >
                    <h3 className="text-lg font-medium text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-300">
                      {relatedTerm.name}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </Container>
  );
}
