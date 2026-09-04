import { readEnvironment } from '../config/environment'

export const siteConfig = {
  origin: readEnvironment(process.env).origin,
  title: 'NIPE Open Source',
  description: 'Focused primitives and tools for the web.',
  githubOrganization: 'https://github.com/NIPE-Solutions',
  nipeUrl: 'https://nipesolutions.com',
} as const
