import type { OpenSourceProject } from '@/content/project-types'
import { operator } from '@/content/legal'
import { siteConfig } from '@/lib/site'
import { productionUrl } from '@/lib/metadata'

interface StructuredDataProps {
  readonly data: object
}

function serializeStructuredData(data: object) {
  return JSON.stringify(data).replaceAll('<', '\\u003c')
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeStructuredData(data) }}
    />
  )
}

export function createWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.title,
    url: productionUrl('/'),
    description: siteConfig.description,
  } as const
}

export function createOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: operator.company,
    url: new URL(siteConfig.nipeUrl).toString(),
    email: operator.email,
    sameAs: [siteConfig.githubOrganization],
  } as const
}

export function createProjectStructuredData(project: OpenSourceProject) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.name,
    description: project.description,
    url: productionUrl(`/projects/${project.slug}`),
    codeRepository: project.repository,
    license: project.license,
    author: {
      '@type': 'Organization',
      name: operator.company,
      url: new URL(siteConfig.nipeUrl).toString(),
    },
  } as const
}

export function SiteStructuredData() {
  return (
    <>
      <StructuredData data={createWebsiteStructuredData()} />
      <StructuredData data={createOrganizationStructuredData()} />
    </>
  )
}
