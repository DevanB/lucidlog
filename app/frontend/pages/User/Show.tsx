import { Head, Link } from '@inertiajs/react'
import User from './User'
import { UserType } from './types'

interface ShowProps {
  user: UserType
  flash: { notice?: string }
}

export default function Show({ user, flash }: ShowProps) {
  return (
    <>
      <Head title={`User #${user.id}`} />

      {flash.notice && <p style={{ color: 'green' }}>{flash.notice}</p>}

      <h1>User #{user.id}</h1>

      <User user={user} />

      <div>
        <Link href={`/users/${user.id}/edit`}>Edit this user</Link>
        {' | '}
        <Link href="/users">Back to users</Link>

        <br />

        <Link
          href={`/users/${user.id}`}
          as="button"
          method="delete"
        >
          Destroy this user
        </Link>
      </div>
    </>
  )
}
