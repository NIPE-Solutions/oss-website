import type { NextConfig } from 'next'

import { createSecurityHeaders } from './src/lib/metadata'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: createSecurityHeaders({
          vercelEnvironment: process.env.VERCEL_ENV,
          nodeEnvironment: process.env.NODE_ENV,
        }),
      },
    ]
  },
}

export default nextConfig
