import { Head, Link } from '@inertiajs/react'
import Form from './Form'
import { DictionaryEntryType } from './types'

interface EditProps {
  dictionary_entry: DictionaryEntryType
}

export default function Edit({ dictionary_entry }: EditProps) {
  return (
    <>
      <Head title="Editing dictionary entry" />

      <h1>Editing dictionary entry</h1>

      <Form
        dictionary_entry={dictionary_entry}
        onSubmit={(form) => {
          form.transform((data) => ({ dictionary_entry: data }))
          form.patch(`/dictionary_entries/${dictionary_entry.id}`)
        }}
        submitText="Update Dictionary entry"
      />

      <br />

      <div>
        <Link href={`/dictionary_entries/${dictionary_entry.id}`}>Show this dictionary entry</Link>
        {' | '}
        <Link href="/dictionary_entries">Back to dictionary entries</Link>
      </div>
    </>
  )
}
