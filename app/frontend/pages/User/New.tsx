import { Head, Link } from '@inertiajs/react'
import Form from './Form'
import { UserType } from './types'

interface NewProps {
  user: UserType
}

export default function New({ user }: NewProps) {
  return (
    <>
      <Head title="New user" />

      <h1>New user</h1>

      <Form
        user={user}
        onSubmit={(form) => {
          form.transform((data) => ({ user: data }))
          form.post('/users')
        }}
        submitText="Create User"
      />

      <br />

      <div>
        <Link href="/users">Back to users</Link>
      </div>
    </>
  )
}
