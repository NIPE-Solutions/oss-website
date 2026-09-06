import Link from 'next/link'
import { ExternalLink } from './external-link'
import { siteConfig } from '@/lib/site'
export function SupportRouting() {
  return (
    <nav
      className="trust-links site-frame"
      aria-label="Contributing and support"
    >
      <span>Questions, fixes, or a vulnerability?</span>
      <Link href="/contributing">Contributing & support</Link>
      <Link href="/security">Security</Link>
      <ExternalLink href={siteConfig.githubOrganization}>
        GitHub organization
      </ExternalLink>
    </nav>
  )
}
