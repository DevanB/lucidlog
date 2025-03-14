import { Head, Link } from '@inertiajs/react'
import Form from './Form'
import { DictionaryEntryType } from './types'

interface NewProps {
  dictionary_entry: DictionaryEntryType
}

export default function New({ dictionary_entry }: NewProps) {
  return (
    <>
      <Head title="New dictionary entry" />

      <h1>New dictionary entry</h1>

      <Form
        dictionary_entry={dictionary_entry}
        onSubmit={(form) => {
          form.transform((data) => ({ dictionary_entry: data }))
          form.post('/dictionary_entries')
        }}
        submitText="Create Dictionary entry"
      />

      <br />

      <div>
        <Link href="/dictionary_entries">Back to dictionary entries</Link>
      </div>
    </>
  )
}
