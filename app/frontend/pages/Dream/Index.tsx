import { Head, Link } from '@inertiajs/react'
import Dream from './Dream'
import { DreamType } from './types'

interface IndexProps {
  dreams: DreamType[]
  flash: { notice?: string }
}

export default function Index({ dreams, flash }: IndexProps) {
  return (
    <>
      <Head title="Dreams" />

      {flash.notice && <p style={{ color: 'green' }}>{flash.notice}</p>}

      <h1>Dreams</h1>
      <div>
        {dreams.map((dream) => (
          <div key={dream.id}>
            <Dream dream={dream} />
            <p>
              <Link href={`/dreams/${dream.id}`}>Show this dream</Link>
            </p>
          </div>
        ))}
      </div>

      <Link href="/dreams/new">New dream</Link>
    </>
  )
}
