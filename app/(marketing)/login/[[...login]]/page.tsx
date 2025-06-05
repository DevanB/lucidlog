"use client";

import { SignIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'

export default function LogInPage() {
  const { systemTheme } = useTheme()

  return (
    <div className="flex h-full items-center justify-center pt-12 pb-16">
      <SignIn appearance={{ baseTheme: systemTheme === "dark" ? dark : undefined }} />
    </div>
  )
}
