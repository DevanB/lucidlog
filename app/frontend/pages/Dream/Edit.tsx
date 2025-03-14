import { Head, Link } from '@inertiajs/react'
import Form from './Form'
import { DreamType } from './types'

interface EditProps {
  dream: DreamType
}

export default function Edit({ dream }: EditProps) {
  return (
    <>
      <Head title="Editing dream" />

      <h1>Editing dream</h1>

      <Form
        dream={dream}
        onSubmit={(form) => {
          form.transform((data) => ({ dream: data }))
          form.patch(`/dreams/${dream.id}`)
        }}
        submitText="Update Dream"
      />

      <br />

      <div>
        <Link href={`/dreams/${dream.id}`}>Show this dream</Link>
        {' | '}
        <Link href="/dreams">Back to dreams</Link>
      </div>
    </>
  )
}
