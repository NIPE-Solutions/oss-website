import type { MetadataRoute } from 'next'

import { publishedProjects } from '@/content/projects'
import { productionUrl } from '@/lib/metadata'

const staticPaths = [
  '/',
  '/contributing',
  '/security',
  '/impressum',
  '/privacy',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes = publishedProjects.map(({ slug }) => ({
    url: productionUrl(`/projects/${slug}`),
  }))
  const [home, ...policyRoutes] = staticPaths.map((path) => ({
    url: productionUrl(path),
  }))

  return [home, ...projectRoutes, ...policyRoutes]
}
