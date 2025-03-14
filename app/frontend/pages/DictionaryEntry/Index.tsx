import { Head, Link } from '@inertiajs/react'
import DictionaryEntry from './DictionaryEntry'
import { DictionaryEntryType } from './types'

interface IndexProps {
  dictionary_entries: DictionaryEntryType[]
  flash: { notice?: string }
}

export default function Index({ dictionary_entries, flash }: IndexProps) {
  return (
    <>
      <Head title="Dictionary entries" />

      {flash.notice && <p style={{ color: 'green' }}>{flash.notice}</p>}

      <h1>Dictionary entries</h1>
      <div>
        {dictionary_entries.map((dictionary_entry) => (
          <div key={dictionary_entry.id}>
            <DictionaryEntry dictionary_entry={dictionary_entry} />
            <p>
              <Link href={`/dictionary_entries/${dictionary_entry.id}`}>Show this dictionary entry</Link>
            </p>
          </div>
        ))}
      </div>

      <Link href="/dictionary_entries/new">New dictionary entry</Link>
    </>
  )
}
