import Image from 'next/image'

import { Container } from '@/components/marketing/container'
import backgroundImage from '@/images/background-call-to-action.jpg'
import Link from 'next/link'
import { Button } from '../ui/button'

export function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden bg-violet-800 py-32"
    >
      <Image
        className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        src={backgroundImage}
        alt=""
        width={2347}
        height={1244}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Make every dream count
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            Start gaining a deeper self-awareness through your dreams today.
            Join LucidLog and connect your subconscious to the conscious world.
          </p>
          <Button asChild variant="outline" className="mt-10">
            <Link href="/register">
              Get started for free
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
