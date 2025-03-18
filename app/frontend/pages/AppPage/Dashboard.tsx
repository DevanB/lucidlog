import FlashMessages from '@/components/flash-messages'
import { Head } from '@inertiajs/react'

export default function Dashboard() {
  return (
    <>
      <Head title="Dashboard" />
      <FlashMessages />
      <h1>Dashboard</h1>
    </>
  )
}
