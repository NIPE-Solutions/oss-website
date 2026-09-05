import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { SiteShell } from '@/app/layout'
import { publicProjects } from '@/content/projects'
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

  it('provides project discovery with a compact-layout directory fallback', () => {
    render(
      <SiteShell>
        <h1>Directory</h1>
      </SiteShell>,
    )

    const navigation = screen.getByRole('navigation', { name: 'Primary' })
    const summary = within(navigation).getByText('Projects', {
      selector: 'summary',
    })
    const disclosure = summary.closest('details')
    expect(disclosure).not.toBeNull()
    fireEvent.click(summary)

    expect(
      within(navigation).getByRole('link', { name: 'Projects' }),
    ).toHaveAttribute('href', '/#projects')

    for (const project of [
      {
        name: 'React Spring Bottom Sheet',
        href: '/projects/react-spring-bottom-sheet',
      },
      {
        name: 'React Swipe Actions',
        href: '/projects/react-swipe-actions',
      },
      {
        name: 'React Anchored Layer',
        href: '/projects/react-anchored-layer',
      },
      {
        name: 'React Pull to Refresh',
        href: '/projects/react-pull-to-refresh',
      },
      { name: 'React Viewport', href: '/projects/react-viewport' },
      { name: 'Readonly View', href: '/projects/readonly-view' },
      {
        name: 'Angular Flex-Layout Codemod',
        href: '/projects/flex-layout-codemod',
      },
    ]) {
      expect(
        within(disclosure!).getByRole('link', { name: project.name }),
      ).toHaveAttribute('href', project.href)
    }
  })

  it('routes primary navigation to principles and NIPE destinations', () => {
    render(
      <SiteShell>
        <h1>Directory</h1>
      </SiteShell>,
    )

    const navigation = screen.getByRole('navigation', { name: 'Primary' })

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

  it('groups registry projects, resources, NIPE, and legal routes in the footer', () => {
    render(
      <SiteShell>
        <h1>Directory</h1>
      </SiteShell>,
    )

    const footer = screen.getByRole('contentinfo')
    const navigation = within(footer).getByRole('navigation', {
      name: 'Footer',
    })

    for (const project of publicProjects) {
      expect(
        within(navigation).getByRole('link', { name: project.name }),
      ).toHaveAttribute('href', `/projects/${project.slug}`)
    }

    expect(
      within(navigation).getByRole('link', { name: 'Contributing' }),
    ).toHaveAttribute('href', '/contributing')
    expect(
      within(navigation).getByRole('link', { name: 'Security' }),
    ).toHaveAttribute('href', '/security')
    expect(
      within(navigation).getByRole('link', { name: 'NIPE Solutions' }),
    ).toHaveAttribute('href', 'https://nipesolutions.com')
    expect(
      within(navigation).getByRole('link', { name: 'GitHub' }),
    ).toHaveAttribute('href', 'https://github.com/NIPE-Solutions')

    expect(
      within(navigation).getByRole('link', { name: 'Impressum' }),
    ).toHaveAttribute('href', '/impressum')
    expect(
      within(navigation).getByRole('link', { name: 'Privacy' }),
    ).toHaveAttribute('href', '/privacy')

    expect(
      within(navigation)
        .getAllByRole('heading', { level: 2 })
        .map(({ textContent }) => textContent),
    ).toEqual(['Projects', 'Resources', 'NIPE', 'Legal'])
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
