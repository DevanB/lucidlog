"use client";

import { SignUp } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'

export default function RegisterPage() {
  const { resolvedTheme } = useTheme()

  return (
    <div className="flex h-full items-center justify-center pt-12 pb-16">
      <SignUp appearance={{ baseTheme: resolvedTheme === "dark" ? dark : undefined }} />
    </div>
  )
}
