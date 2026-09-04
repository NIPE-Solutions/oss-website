import { readEnvironment } from '../config/environment'

export const siteConfig = {
  origin: readEnvironment(process.env).origin,
  title: 'NIPE Open Source',
  description: 'Production-grade primitives and tools for the web.',
  githubOrganization: 'https://github.com/NIPE-Solutions',
  nipeUrl: 'https://nipesolutions.com',
} as const
