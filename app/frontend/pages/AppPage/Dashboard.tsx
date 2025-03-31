import { Head, Link } from '@inertiajs/react'
import { FlashMessages } from '@/components/flash-messages'
import { EmailVerificationBanner } from '@/components/email-verification-banner'

export default function Dashboard() {
  return (
    <>
      <Head title="Dashboard" />
      <EmailVerificationBanner />
      <FlashMessages />
      <h1>Dashboard</h1>
      <Link href="/logout" method="delete" as="button">Log Out</Link>
    </>
  )
}
