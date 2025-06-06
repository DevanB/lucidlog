import "./globals.css";
import clsx from 'clsx'
import type { Metadata } from "next";
import { Inter, Lexend } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
})


export const metadata: Metadata = {
  title: {
    template: '%s :: LucidLog',
    default: "LucidLog :: Unlock the mysteries of your dreams",
  },
  description: "The innovative journaling tool designed to unlock the mysteries of your dreams.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={clsx(
        'h-full scroll-smooth antialiased',
        inter.variable,
        lexend.variable,
      )}
    >
      <body className="flex h-full flex-col bg-white dark:bg-slate-950">
        <ThemeProvider attribute="class" enableSystem={true} defaultTheme="system" disableTransitionOnChange>
          <ClerkProvider>
            <Toaster expand={false} position="top-center" />
            {children}
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
