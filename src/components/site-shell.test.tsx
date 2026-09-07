import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { SiteShell } from '@/app/layout'
import { ExternalLink } from './external-link'
afterEach(cleanup)
it('provides landmarks, a skip link and compact navigation', () => {
  render(
    <SiteShell>
      <h1>Index</h1>
    </SiteShell>,
  )
  expect(screen.getByRole('banner')).toBeInTheDocument()
  expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content')
  expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute(
    'href',
    '#main-content',
  )
  expect(
    within(screen.getByRole('navigation', { name: 'Primary' }))
      .getAllByRole('link')
      .map((l) => l.textContent?.replace('↗', '').trim()),
  ).toEqual(['Projects', 'React Data Inspector', 'Principles', 'GitHub'])
  const footer = within(screen.getByRole('navigation', { name: 'Footer' }))
  for (const [name, href] of [
    ['Imprint', '/impressum'],
    ['Privacy', '/privacy'],
    ['Security', '/security'],
    ['Contributing', '/contributing'],
  ])
    expect(footer.getByRole('link', { name })).toHaveAttribute('href', href)
})
it('keeps external links explicit without forcing a new tab', () => {
  render(<ExternalLink href="https://example.com">Reference</ExternalLink>)
  expect(screen.getByRole('link')).toHaveAttribute('rel', 'noopener noreferrer')
  expect(screen.getByRole('link')).not.toHaveAttribute('target')
})
