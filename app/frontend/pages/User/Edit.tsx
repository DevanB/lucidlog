import { Head, Link } from '@inertiajs/react'
import Form from './Form'
import { UserType } from './types'

interface EditProps {
  user: UserType
}

export default function Edit({ user }: EditProps) {
  return (
    <>
      <Head title="Editing user" />

      <h1>Editing user</h1>

      <Form
        user={user}
        onSubmit={(form) => {
          form.transform((data) => ({ user: data }))
          form.patch(`/users/${user.id}`)
        }}
        submitText="Update User"
      />

      <br />

      <div>
        <Link href={`/users/${user.id}`}>Show this user</Link>
        {' | '}
        <Link href="/users">Back to users</Link>
      </div>
    </>
  )
}
