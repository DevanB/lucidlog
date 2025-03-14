import { Head, Link } from '@inertiajs/react'
import Form from './Form'
import { DreamType } from './types'

interface NewProps {
  dream: DreamType
}

export default function New({ dream }: NewProps) {
  return (
    <>
      <Head title="New dream" />

      <h1>New dream</h1>

      <Form
        dream={dream}
        onSubmit={(form) => {
          form.transform((data) => ({ dream: data }))
          form.post('/dreams')
        }}
        submitText="Create Dream"
      />

      <br />

      <div>
        <Link href="/dreams">Back to dreams</Link>
      </div>
    </>
  )
}
