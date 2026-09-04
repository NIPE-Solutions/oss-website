const canonicalOrigin = 'https://opensource.nipesolutions.com'

type Environment = Readonly<Record<string, string | undefined>>

export function readEnvironment(env: Environment) {
  if (
    env.NEXT_PUBLIC_SITE_URL !== undefined &&
    env.NEXT_PUBLIC_SITE_URL !== canonicalOrigin
  ) {
    throw new Error(`NEXT_PUBLIC_SITE_URL must be ${canonicalOrigin}`)
  }

  const production = env.VERCEL_ENV === 'production'

  return {
    origin: canonicalOrigin,
    robots: { follow: production, index: production },
  }
}
