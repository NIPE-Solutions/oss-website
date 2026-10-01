import { readEnvironment } from '../config/environment'

export const siteConfig = {
  origin: readEnvironment(process.env).origin,
  name: 'NIPE Open Source',
  title: 'NIPE Open Source — Focused primitives and tools for the web',
  tagline: 'Focused primitives and tools for the web.',
  description:
    'Independent browser primitives, React interaction libraries including React Data Inspector, runtime utilities and migration tools by NIPE Solutions.',
  githubOrganization: 'https://github.com/NIPE-Solutions',
  githubRepository: 'https://github.com/NIPE-Solutions/oss-website',
  companyWebsite: 'https://nipesolutions.com',
} as const
