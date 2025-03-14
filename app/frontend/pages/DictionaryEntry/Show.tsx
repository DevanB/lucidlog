import { Head, Link } from '@inertiajs/react'
import DictionaryEntry from './DictionaryEntry'
import { DictionaryEntryType } from './types'

interface ShowProps {
  dictionary_entry: DictionaryEntryType
  flash: { notice?: string }
}

export default function Show({ dictionary_entry, flash }: ShowProps) {
  return (
    <>
      <Head title={`Dictionary entry #${dictionary_entry.id}`} />

      {flash.notice && <p style={{ color: 'green' }}>{flash.notice}</p>}

      <h1>Dictionary entry #{dictionary_entry.id}</h1>

      <DictionaryEntry dictionary_entry={dictionary_entry} />

      <div>
        <Link href={`/dictionary_entries/${dictionary_entry.id}/edit`}>Edit this dictionary entry</Link>
        {' | '}
        <Link href="/dictionary_entries">Back to dictionary entries</Link>

        <br />

        <Link
          href={`/dictionary_entries/${dictionary_entry.id}`}
          as="button"
          method="delete"
        >
          Destroy this dictionary entry
        </Link>
      </div>
    </>
  )
}
