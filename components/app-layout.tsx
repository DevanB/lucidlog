"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Folder, LayoutGrid } from 'lucide-react';
import type { ReactNode } from 'react';

import AppLogo from '@/components/app-logo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItem, NavItem } from '@/types';

import { Icon } from '@/components/icon';
import { SignedIn, UserButton } from '@clerk/nextjs';

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dreams',
    icon: LayoutGrid,
  },
];

const footerNavItems: NavItem[] = [
  {
    title: 'Repository',
    href: 'https://github.com/laravel/react-starter-kit',
    icon: Folder,
  },
  {
    title: 'Documentation',
    href: 'https://laravel.com/docs/starter-kits',
    icon: BookOpen,
  },
];


interface AppLayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs = [] }: AppLayoutProps) {
  const pathname = usePathname();

  return (
    <>
      <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/" prefetch>
                  <AppLogo />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild isActive={item.href === pathname}
                    tooltip={{ children: item.title }}
                  >
                    <Link href={item.href} prefetch>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarGroup className="group-data-[collapsible=icon]:p-0 mt-auto">
            <SidebarGroupContent>
              <SidebarMenu>
                {footerNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100"
                    >
                      <a href={item.href} target="_blank" rel="noopener noreferrer">
                        {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SignedIn>
            <UserButton
              showName
              appearance={{
                elements: {
                  userButtonTrigger: {
                    paddingLeft: 16,
                    paddingRight: 16,
                  },
                  userButtonBox: {
                    flexDirection: "row-reverse",
                  },
                },
              }}
            />
          </SignedIn>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </div>
        </header>
        {children}
      </SidebarInset>
    </>
  )
}
