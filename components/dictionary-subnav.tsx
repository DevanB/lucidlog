import Link from 'next/link';
import { dictionaryTermsData } from '@/lib/data/dictionary-terms';
import { cn} from '@/lib/utils';

interface DictionarySubnavProps {
  root?: boolean;
  currentLetter?: string
}

const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const baseLinkStyles = 'text-md font-medium text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-300';
const activeLinkStyles = 'text-black dark:text-white underline';
const inactiveLinkStyles = 'text-gray-400 dark:text-gray-500';

export function DictionarySubnav({ currentLetter, root }: DictionarySubnavProps) {
  const availableLetters = Object.keys(dictionaryTermsData).filter(
    letter => dictionaryTermsData[letter]?.length > 0
  ).sort();

  return (
    <nav className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 py-4 z-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap justify-center gap-4">
          {root ? (
            <span className={cn(baseLinkStyles, activeLinkStyles)}>All</span>
          ) : (
            <Link href="/dictionary" className={cn(baseLinkStyles)}>
              All
            </Link>
          )}
          {allLetters.map(letter => {
            const hasTerms = availableLetters.includes(letter);
            const isCurrentLetter = currentLetter && letter === currentLetter.toUpperCase();
            
            if (!hasTerms) return <span key={letter} className={cn(baseLinkStyles, inactiveLinkStyles)}>{letter}</span>

            return isCurrentLetter ? (
              <span key={letter} className={cn(baseLinkStyles, activeLinkStyles)}>{letter}</span>
            ) : (
              <Link
                key={letter}
                href={`/dictionary/letter/${letter}`}
                className={baseLinkStyles}
              >
                {letter}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  );
}
