import { readEnvironment } from '../config/environment'

export const siteConfig = {
  origin: readEnvironment(process.env).origin,
  name: 'NIPE Open Source',
  title: 'NIPE Open Source — Focused primitives and tools for the web',
  tagline: 'Focused primitives and tools for the web.',
  description:
    'Focused React interaction primitives, runtime utilities, and developer tooling with independent packages and project-owned documentation.',
  githubOrganization: 'https://github.com/NIPE-Solutions',
  nipeUrl: 'https://nipesolutions.com',
} as const
