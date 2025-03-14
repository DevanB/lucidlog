import { Head, Link } from '@inertiajs/react'
import Dream from './Dream'
import { DreamType } from './types'

interface ShowProps {
  dream: DreamType
  flash: { notice?: string }
}

export default function Show({ dream, flash }: ShowProps) {
  return (
    <>
      <Head title={`Dream #${dream.id}`} />

      {flash.notice && <p style={{ color: 'green' }}>{flash.notice}</p>}

      <h1>Dream #{dream.id}</h1>

      <Dream dream={dream} />

      <div>
        <Link href={`/dreams/${dream.id}/edit`}>Edit this dream</Link>
        {' | '}
        <Link href="/dreams">Back to dreams</Link>

        <br />

        <Link
          href={`/dreams/${dream.id}`}
          as="button"
          method="delete"
        >
          Destroy this dream
        </Link>
      </div>
    </>
  )
}
