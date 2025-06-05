import { cookies } from "next/headers";
import { SidebarProvider } from '@/components/ui/sidebar';
import {
  SignInButton,
  SignUpButton,
  SignedOut,
} from '@clerk/nextjs'
import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dreams'
  },
];

export default async function DreamsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppLayout breadcrumbs={breadcrumbs}>
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        {children}
      </AppLayout>
    </SidebarProvider>
  )
}
