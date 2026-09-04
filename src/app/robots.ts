import type { MetadataRoute } from 'next'

import { productionUrl } from '@/lib/metadata'

export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV !== 'production') {
    return {
      rules: { userAgent: '*', disallow: '/' },
    }
  }

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: productionUrl('/sitemap.xml'),
  }
}
