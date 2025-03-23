import { Head, Link } from '@inertiajs/react'
import { FlashMessages } from '@/components/flash-messages'

export default function Dashboard() {
  return (
    <>
      <Head title="Dashboard" />
      <FlashMessages />
      <h1>Dashboard</h1>
      <Link href="/logout" method="delete" as="button">Log Out</Link>
    </>
  )
}
