import { CallToAction } from '@/components/marketing/call-to-action'
import { Faqs } from '@/components/marketing/faqs'
import { Hero } from '@/components/marketing/hero'
import { Pricing } from '@/components/marketing/pricing'
import { PrimaryFeatures } from '@/components/marketing/primary-features'
import { SecondaryFeatures } from '@/components/marketing/secondary-features'

export default function Home() {
  return (
    <>
      <Hero />
      <PrimaryFeatures />
      <SecondaryFeatures />
      <CallToAction />
      <Pricing />
      <Faqs />
    </>
  )
}
