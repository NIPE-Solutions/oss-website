import { describe, expect, it } from 'vitest'

import { readEnvironment } from './environment'

describe('readEnvironment', () => {
  it('uses the custom origin and permits indexing in production', () => {
    expect(readEnvironment({ VERCEL_ENV: 'production' })).toEqual({
      origin: 'https://opensource.nipesolutions.com',
      robots: { follow: true, index: true },
    })
  })

  it('keeps preview deployments out of search indexes', () => {
    expect(readEnvironment({ VERCEL_ENV: 'preview' })).toEqual({
      origin: 'https://opensource.nipesolutions.com',
      robots: { follow: false, index: false },
    })
  })

  it('rejects an explicit site URL that differs from the canonical origin', () => {
    expect(() =>
      readEnvironment({
        NEXT_PUBLIC_SITE_URL: 'https://preview-123.vercel.app',
        VERCEL_ENV: 'production',
      }),
    ).toThrow(
      'NEXT_PUBLIC_SITE_URL must be https://opensource.nipesolutions.com',
    )
  })
})
