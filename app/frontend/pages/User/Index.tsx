import { Head, Link } from '@inertiajs/react'
import User from './User'
import { UserType } from './types'

interface IndexProps {
  users: UserType[]
  flash: { notice?: string }
}

export default function Index({ users, flash }: IndexProps) {
  return (
    <>
      <Head title="Users" />

      {flash.notice && <p style={{ color: 'green' }}>{flash.notice}</p>}

      <h1>Users</h1>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <User user={user} />
            <p>
              <Link href={`/users/${user.id}`}>Show this user</Link>
            </p>
          </div>
        ))}
      </div>

      <Link href="/users/new">New user</Link>
    </>
  )
}
