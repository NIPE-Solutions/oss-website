import type { Metadata } from 'next'

import { siteConfig } from './site'

type VercelEnvironment = string | undefined
type NodeEnvironment = string | undefined

interface PageMetadataInput {
  readonly title: string
  readonly description: string
  readonly path: string
}

interface SecurityEnvironment {
  readonly vercelEnvironment: VercelEnvironment
  readonly nodeEnvironment: NodeEnvironment
}

export function productionUrl(path: string) {
  return new URL(path, siteConfig.origin).toString()
}

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const url = productionUrl(path)

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
    },
  }
}

export function createRobotsMetadata(
  vercelEnvironment: VercelEnvironment = process.env.VERCEL_ENV,
): NonNullable<Metadata['robots']> {
  const isProduction = vercelEnvironment === 'production'

  return {
    index: isProduction,
    follow: isProduction,
  }
}

function createContentSecurityPolicy(nodeEnvironment: NodeEnvironment) {
  const development = nodeEnvironment === 'development'
  const scriptSources = ["'self'", "'unsafe-inline'"]

  if (development) {
    scriptSources.push("'unsafe-eval'")
  }

  const directives = [
    "default-src 'self'",
    `script-src ${scriptSources.join(' ')}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
  ]

  if (development) {
    directives.push("connect-src 'self' ws: wss:")
  }

  directives.push(
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  )

  return directives.join('; ')
}

export function createSecurityHeaders({
  vercelEnvironment,
  nodeEnvironment,
}: SecurityEnvironment) {
  const headers = [
    {
      key: 'Content-Security-Policy',
      value: createContentSecurityPolicy(nodeEnvironment),
    },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    {
      key: 'Permissions-Policy',
      value: 'camera=(), geolocation=(), microphone=()',
    },
    { key: 'X-Frame-Options', value: 'DENY' },
  ]

  if (vercelEnvironment === 'production') {
    headers.push({
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000',
    })
  }

  return headers
}
