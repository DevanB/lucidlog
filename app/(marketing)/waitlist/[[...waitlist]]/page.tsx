"use client";

import { Waitlist } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'

export default function WaitlistPage() {
  const { resolvedTheme } = useTheme()

  return (
    <div className="flex h-full items-center justify-center pt-12 pb-16">
      <Waitlist appearance={{ baseTheme: resolvedTheme === "dark" ? dark : undefined }} />
    </div>
  )
}
