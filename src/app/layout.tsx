import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { SiteStructuredData } from '@/components/structured-data'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { createRobotsMetadata, productionUrl } from '@/lib/metadata'
import { siteConfig } from '@/lib/site'

import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.origin),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: productionUrl('/'),
  },
  alternates: {
    canonical: productionUrl('/'),
  },
  robots: createRobotsMetadata(),
}

interface SiteShellProps {
  readonly children: ReactNode
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </>
  )
}

export default function RootLayout({ children }: SiteShellProps) {
  return (
    <html lang="en" data-build-commit={process.env.NEXT_PUBLIC_BUILD_COMMIT}>
      <body>
        <SiteStructuredData />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
