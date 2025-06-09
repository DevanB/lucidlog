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
  metadataBase: new URL('https://lucidlog-nu.vercel.app'),
  title: {
    template: '%s :: LucidLog',
    default: 'LucidLog :: Unlock the mysteries of your dreams',
  },
  description: 'The innovative journaling tool designed to unlock the mysteries of your dreams.',
  twitter: {
    card: 'summary_large_image',
    title: 'LucidLog :: Unlock the mysteries of your dreams',
    description: 'The innovative journaling tool designed to unlock the mysteries of your dreams.',
    siteId: '1467726470533754880',
    creator: '@devanbeitel',
    creatorId: '1467726470533754880',
    images: ['https://nextjs.org/og.png'], // Must be an absolute URL
  },
  openGraph: {
    title: 'LucidLog :: Unlock the mysteries of your dreams',
    description: 'The innovative journaling tool designed to unlock the mysteries of your dreams.',
    url: 'https://lucidlog-nu.vercel.app',
    siteName: 'LucidLog',
    images: [
      {
        url: 'https://nextjs.org/og.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'https://nextjs.org/og-alt.png', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    videos: [
      {
        url: 'https://nextjs.org/video.mp4', // Must be an absolute URL
        width: 800,
        height: 600,
      },
    ],
    audio: [
      {
        url: 'https://nextjs.org/audio.mp3', // Must be an absolute URL
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
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
        <ThemeProvider attribute="class" enableSystem defaultTheme="system" disableTransitionOnChange>
          <ClerkProvider waitlistUrl="/waitlist">
            <Toaster expand={false} position="top-center" />
            {children}
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
