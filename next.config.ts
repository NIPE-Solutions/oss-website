import type { NextConfig } from 'next'
import { execFileSync } from 'node:child_process'

import { createSecurityHeaders } from './src/lib/metadata'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BUILD_COMMIT:
      process.env.VERCEL_GIT_COMMIT_SHA ||
      execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(),
  },
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
