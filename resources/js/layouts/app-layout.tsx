import type { ReactNode } from 'react'
import { AppSkipLink } from '@/components/app-skip-link'
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout'
import type { BreadcrumbItem } from '@/types'

type AppLayoutProps = {
  children: ReactNode
  breadcrumbs?: BreadcrumbItem[]
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
  <>
    <AppSkipLink />
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
      {children}
    </AppLayoutTemplate>
  </>
)
