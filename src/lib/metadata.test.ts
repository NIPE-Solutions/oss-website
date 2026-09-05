import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import nextConfig from '../../next.config'
import { metadata as contributingMetadata } from '@/app/contributing/page'
import { metadata as impressumMetadata } from '@/app/impressum/page'
import RootLayout, { metadata as homeMetadata } from '@/app/layout'
import RootOpenGraphImage, {
  alt as rootOpenGraphAlt,
  contentType as rootOpenGraphContentType,
  size as rootOpenGraphSize,
} from '@/app/opengraph-image'
import { metadata as privacyMetadata } from '@/app/privacy/page'
import {
  generateMetadata,
  default as ProjectPage,
} from '@/app/projects/[slug]/page'
import ProjectOpenGraphImage, {
  contentType as projectOpenGraphContentType,
  generateImageMetadata,
  size as projectOpenGraphSize,
} from '@/app/projects/[slug]/opengraph-image'
import robots from '@/app/robots'
import { metadata as securityMetadata } from '@/app/security/page'
import sitemap from '@/app/sitemap'
import {
  createOrganizationStructuredData,
  createProjectStructuredData,
  createWebsiteStructuredData,
} from '@/components/structured-data'
import { publicProjects } from '@/content/projects'
import {
  createPageMetadata,
  createRobotsMetadata,
  createSecurityHeaders,
} from '@/lib/metadata'
import { renderToStaticMarkup } from 'react-dom/server'

afterEach(() => {
  cleanup()
  vi.unstubAllEnvs()
})

describe('page metadata', () => {
  it('keeps canonical URLs on the production origin', () => {
    expect(
      createPageMetadata({
        title: 'Security',
        description: 'Repository-specific vulnerability reporting routes.',
        path: '/security',
      }),
    ).toEqual({
      title: 'Security',
      description: 'Repository-specific vulnerability reporting routes.',
      alternates: {
        canonical: 'https://opensource.nipesolutions.com/security',
      },
    })
  })

  it('gives every public page a distinct production canonical', () => {
    const routeMetadata = [
      homeMetadata,
      contributingMetadata,
      securityMetadata,
      impressumMetadata,
      privacyMetadata,
    ]

    expect(homeMetadata.title).toEqual({
      default: 'NIPE Open Source',
      template: '%s | NIPE Open Source',
    })
    expect(homeMetadata.description).toBe(
      'Focused primitives and tools for the web.',
    )
    expect(routeMetadata.slice(1).map(({ title }) => title)).toEqual([
      'Contributing',
      'Security',
      'Impressum',
      'Privacy',
    ])
    expect(
      routeMetadata.map(({ alternates }) => alternates?.canonical),
    ).toEqual([
      'https://opensource.nipesolutions.com/',
      'https://opensource.nipesolutions.com/contributing',
      'https://opensource.nipesolutions.com/security',
      'https://opensource.nipesolutions.com/impressum',
      'https://opensource.nipesolutions.com/privacy',
    ])
  })

  it('derives unique project titles, descriptions, and canonicals from the registry', async () => {
    const projectMetadata = await Promise.all(
      publicProjects.map(({ slug }) =>
        generateMetadata({ params: Promise.resolve({ slug }) }),
      ),
    )

    expect(projectMetadata.map(({ title }) => title)).toEqual([
      'React Spring Bottom Sheet',
      'React Swipe Actions',
      'React Anchored Layer',
      'React Pull to Refresh',
      'React Viewport',
      'Readonly View',
      'Angular Flex-Layout Codemod',
    ])
    expect(projectMetadata.map(({ description }) => description)).toEqual([
      'Accessible React 19 bottom sheets with a compound Sheet API, named snap points, and separately exported styles.',
      'Composable React rows with measured leading and trailing actions, keyboard support, logical RTL sides, and optional full-swipe activation.',
      'Anchored floating layers for React that keep arbitrary portal content aligned through scroll, resize, and layout changes.',
      'Pull-to-refresh for React with scroll arbitration, resistance, threshold hysteresis, and an application-owned refresh lifecycle.',
      'Reactive React geometry for layout and visual viewports, keyboard occlusion, and safe areas.',
      'A deeply readonly, lazy, live view of owner-controlled mutable data for JavaScript and TypeScript.',
      'A beta Angular template codemod for Flex-Layout to Tailwind CSS v4 migrations.',
    ])
    expect(
      projectMetadata.map(({ alternates }) => alternates?.canonical),
    ).toEqual([
      'https://opensource.nipesolutions.com/projects/react-spring-bottom-sheet',
      'https://opensource.nipesolutions.com/projects/react-swipe-actions',
      'https://opensource.nipesolutions.com/projects/react-anchored-layer',
      'https://opensource.nipesolutions.com/projects/react-pull-to-refresh',
      'https://opensource.nipesolutions.com/projects/react-viewport',
      'https://opensource.nipesolutions.com/projects/readonly-view',
      'https://opensource.nipesolutions.com/projects/flex-layout-codemod',
    ])
  })
})

describe('discovery routes', () => {
  it('lists every public route in the sitemap at the production origin', () => {
    expect(sitemap()).toEqual([
      { url: 'https://opensource.nipesolutions.com/' },
      {
        url: 'https://opensource.nipesolutions.com/projects/react-spring-bottom-sheet',
      },
      {
        url: 'https://opensource.nipesolutions.com/projects/react-swipe-actions',
      },
      {
        url: 'https://opensource.nipesolutions.com/projects/react-anchored-layer',
      },
      {
        url: 'https://opensource.nipesolutions.com/projects/react-pull-to-refresh',
      },
      {
        url: 'https://opensource.nipesolutions.com/projects/react-viewport',
      },
      { url: 'https://opensource.nipesolutions.com/projects/readonly-view' },
      {
        url: 'https://opensource.nipesolutions.com/projects/flex-layout-codemod',
      },
      { url: 'https://opensource.nipesolutions.com/contributing' },
      { url: 'https://opensource.nipesolutions.com/security' },
      { url: 'https://opensource.nipesolutions.com/impressum' },
      { url: 'https://opensource.nipesolutions.com/privacy' },
    ])
  })

  it('prevents indexing and crawling outside production', () => {
    vi.stubEnv('VERCEL_ENV', 'preview')

    expect(createRobotsMetadata()).toEqual({ index: false, follow: false })
    expect(robots()).toEqual({
      rules: { userAgent: '*', disallow: '/' },
    })
  })

  it('allows indexing and advertises the production sitemap in production', () => {
    vi.stubEnv('VERCEL_ENV', 'production')

    expect(createRobotsMetadata()).toEqual({ index: true, follow: true })
    expect(robots()).toEqual({
      rules: { userAgent: '*', allow: '/' },
      sitemap: 'https://opensource.nipesolutions.com/sitemap.xml',
    })
  })
})

describe('structured data', () => {
  it('renders WebSite and Organization data in the global layout', () => {
    const markup = renderToStaticMarkup(RootLayout({ children: 'Directory' }))
    const document = new DOMParser().parseFromString(markup, 'text/html')
    const scripts = Array.from(
      document.querySelectorAll('script[type="application/ld+json"]'),
    )

    expect(scripts).toHaveLength(2)
    expect(
      scripts.map(({ textContent }) => JSON.parse(textContent ?? '')),
    ).toEqual([
      createWebsiteStructuredData(),
      createOrganizationStructuredData(),
    ])
  })

  it('describes only factual site and legal-operator properties globally', () => {
    expect(createWebsiteStructuredData()).toEqual({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'NIPE Open Source',
      url: 'https://opensource.nipesolutions.com/',
      description: 'Focused primitives and tools for the web.',
    })
    expect(createOrganizationStructuredData()).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'NIPE Solutions e.U.',
      url: 'https://nipesolutions.com/',
      email: 'office@nipesolutions.com',
      sameAs: ['https://github.com/NIPE-Solutions'],
    })
  })

  it('adds factual SoftwareSourceCode data to each published project page', async () => {
    for (const project of publicProjects) {
      expect(createProjectStructuredData(project)).toEqual({
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: project.name,
        description: project.description,
        url: `https://opensource.nipesolutions.com/projects/${project.slug}`,
        codeRepository: project.repository,
        license: project.license,
        author: {
          '@type': 'Organization',
          name: 'NIPE Solutions e.U.',
          url: 'https://nipesolutions.com/',
        },
      })

      const { container } = render(
        await ProjectPage({ params: Promise.resolve({ slug: project.slug }) }),
      )
      const scripts = container.querySelectorAll(
        'script[type="application/ld+json"]',
      )
      expect(scripts).toHaveLength(1)
      expect(JSON.parse(scripts[0].textContent ?? '')).toEqual(
        createProjectStructuredData(project),
      )
      cleanup()
    }
  })
})

describe('Open Graph images', () => {
  it('provides a restrained 1200 by 630 site image with descriptive metadata', () => {
    expect(rootOpenGraphAlt).toBe(
      'NIPE Open Source — Focused primitives and tools for the web.',
    )
    expect(rootOpenGraphSize).toEqual({ width: 1200, height: 630 })
    expect(rootOpenGraphContentType).toBe('image/png')

    const response = RootOpenGraphImage()
    expect(response).toBeInstanceOf(Response)
    expect(response.headers.get('content-type')).toBe('image/png')
  })

  it('provides unique image metadata and images for every project route', async () => {
    expect(projectOpenGraphSize).toEqual({ width: 1200, height: 630 })
    expect(projectOpenGraphContentType).toBe('image/png')

    for (const project of publicProjects) {
      expect(
        await generateImageMetadata({
          params: Promise.resolve({ slug: project.slug }),
        }),
      ).toEqual([
        {
          id: project.slug,
          alt: `${project.name} — NIPE Open Source`,
          size: { width: 1200, height: 630 },
          contentType: 'image/png',
        },
      ])

      const response = await ProjectOpenGraphImage({
        params: Promise.resolve({ slug: project.slug }),
      })
      expect(response).toBeInstanceOf(Response)
      expect(response.headers.get('content-type')).toBe('image/png')
    }
  })

  it('does not provide image metadata for an unknown project route', async () => {
    await expect(
      generateImageMetadata({
        params: Promise.resolve({ slug: 'hidden-project' }),
      }),
    ).resolves.toEqual([])
  })
})

describe('security headers', () => {
  const contentSecurityPolicy =
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'"

  const commonHeaders = [
    { key: 'Content-Security-Policy', value: contentSecurityPolicy },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    {
      key: 'Permissions-Policy',
      value: 'camera=(), geolocation=(), microphone=()',
    },
    { key: 'X-Frame-Options', value: 'DENY' },
  ]

  it('uses the minimal production CSP and adds HSTS only in production', () => {
    expect(
      createSecurityHeaders({
        vercelEnvironment: 'production',
        nodeEnvironment: 'production',
      }),
    ).toEqual([
      ...commonHeaders,
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000',
      },
    ])

    expect(
      createSecurityHeaders({
        vercelEnvironment: 'preview',
        nodeEnvironment: 'production',
      }),
    ).toEqual(commonHeaders)
  })

  it('applies the production policy to every response through Next config', async () => {
    vi.stubEnv('VERCEL_ENV', 'production')
    vi.stubEnv('NODE_ENV', 'production')

    expect(await nextConfig.headers?.()).toEqual([
      {
        source: '/(.*)',
        headers: [
          ...commonHeaders,
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000',
          },
        ],
      },
    ])
  })
})
