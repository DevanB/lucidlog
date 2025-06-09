'use client'

import { SignedIn, SignedOut } from '@clerk/nextjs'
import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from '@headlessui/react'
import clsx from 'clsx'
import Link from 'next/link'

import { Container } from '@/components/marketing/container'
import { Logo } from '@/components/marketing/logo'
import { NavLink } from '@/components/marketing/nav-link'
import { Button } from '@/components/ui/button'

function MobileNavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <PopoverButton as={Link} href={href} className="block w-full p-2">
      {children}
    </PopoverButton>
  )
}

function MobileNavIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700 dark:stroke-slate-200"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          'origin-center transition',
          open && 'scale-90 opacity-0',
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          'origin-center transition',
          !open && 'scale-90 opacity-0',
        )}
      />
    </svg>
  )
}

function MobileNavigation() {
  return (
    <Popover>
      <PopoverButton
        className="relative z-10 flex h-8 w-8 items-center justify-center focus:not-data-focus:outline-hidden"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </PopoverButton>
      <PopoverBackdrop
        transition
        className="fixed inset-0 bg-slate-300/50 dark:bg-slate-800/50 duration-150 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in"
      />
      <PopoverPanel
        transition
        className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white dark:bg-slate-800 p-4 text-lg tracking-tight text-slate-900 dark:text-slate-200 shadow-xl ring-1 ring-slate-900/5 dark:ring-slate-100/5 data-closed:scale-95 data-closed:opacity-0 data-enter:duration-150 data-enter:ease-out data-leave:duration-100 data-leave:ease-in"
      >
        <MobileNavLink href="/#features">Features</MobileNavLink>
        <MobileNavLink href="/#pricing">Pricing</MobileNavLink>
        <MobileNavLink href="/#faq">FAQ</MobileNavLink>
        <hr className="m-2 border-slate-300/40" />
        <SignedIn>
          <MobileNavLink href="/dreams">Dashboard</MobileNavLink>
        </SignedIn>
        <SignedOut>
          <MobileNavLink href="/login">Log In</MobileNavLink>
        </SignedOut>
      </PopoverPanel>
    </Popover>
  )
}

export function Header() {
  return (
    <header className="py-10">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="/" aria-label="Home">
              <Logo className="h-10 w-auto" />
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              <NavLink href="/#features">Features</NavLink>
              <NavLink href="/#pricing">Pricing</NavLink>
              <NavLink href="/#faq">FAQ</NavLink>
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <SignedIn>
              <div className="hidden md:block">
                <NavLink href="/dreams">Dashboard</NavLink>
              </div>
            </SignedIn>
            <SignedOut>
              <div className="hidden md:block">
                <NavLink href="/login">Log In</NavLink>
              </div>
              <Button className="bg-violet-700 dark:bg-violet-500 hover:bg-violet-900 dark:hover:bg-violet-600 dark:text-slate-200">
                <Link href="/waitlist">
                  <span>
                    Get started <span className="hidden lg:inline">today</span>
                  </span>
                </Link>
              </Button>
            </SignedOut>
            <div className="-mr-1 md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
