import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { SiteShell } from '@/app/layout'
import { ExternalLink } from './external-link'

afterEach(cleanup)

describe('site shell', () => {
  it('provides landmarks and a skip link that targets the main content', () => {
    render(
      <SiteShell>
        <h1>Directory</h1>
      </SiteShell>,
    )

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(
      screen.getByRole('navigation', { name: 'Primary' }),
    ).toBeInTheDocument()

    const main = screen.getByRole('main')
    expect(main).toHaveAttribute('id', 'main-content')
    expect(
      screen.getByRole('link', { name: 'Skip to content' }),
    ).toHaveAttribute('href', '#main-content')
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('routes primary navigation to the directory, principles, and NIPE destinations', () => {
    render(
      <SiteShell>
        <h1>Directory</h1>
      </SiteShell>,
    )

    const navigation = screen.getByRole('navigation', { name: 'Primary' })

    expect(
      within(navigation).getByRole('link', { name: 'Projects' }),
    ).toHaveAttribute('href', '/#projects')
    expect(
      within(navigation).getByRole('link', { name: 'Principles' }),
    ).toHaveAttribute('href', '/#principles')
    expect(
      within(navigation).getByRole('link', { name: 'GitHub' }),
    ).toHaveAttribute('href', 'https://github.com/NIPE-Solutions')
    expect(
      within(navigation).getByRole('link', { name: 'NIPE Solutions' }),
    ).toHaveAttribute('href', 'https://nipesolutions.com')
  })

  it('keeps legal routes available from the footer', () => {
    render(
      <SiteShell>
        <h1>Directory</h1>
      </SiteShell>,
    )

    const footer = screen.getByRole('contentinfo')

    expect(
      within(footer).getByRole('link', { name: 'Impressum' }),
    ).toHaveAttribute('href', '/impressum')
    expect(
      within(footer).getByRole('link', { name: 'Privacy' }),
    ).toHaveAttribute('href', '/privacy')
  })
})

describe('ExternalLink', () => {
  it('protects opener and referral data without forcing a new tab', () => {
    render(
      <ExternalLink href="https://example.com/reference">
        Reference
      </ExternalLink>,
    )

    const link = screen.getByRole('link', { name: 'Reference' })
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(link).not.toHaveAttribute('target')
  })
})
