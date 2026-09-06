import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import Home from './page'
import { ProjectRow } from '@/components/project-row'
import { publicProjects, projectCategories } from '@/content/projects'
afterEach(cleanup)
it('renders a typography-led index with derived counts and all category groups', () => {
  const { container } = render(<Home />)
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    'Focused primitives and tools for the web.',
  )
  expect(
    screen.getByText('09 projects · 4 areas · independently installable'),
  ).toBeInTheDocument()
  expect(container.querySelector('.project-constellation')).toBeNull()
  for (const c of projectCategories)
    expect(screen.getByRole('heading', { name: c.label })).toBeInTheDocument()
  for (const p of publicProjects) {
    const row = within(screen.getByRole('article', { name: p.name }))
    expect(row.getByRole('link', { name: p.name })).toHaveAttribute(
      'href',
      `/projects/${p.slug}`,
    )
    expect(row.getByRole('link', { name: 'Docs' })).toHaveAttribute(
      'href',
      p.documentation,
    )
    expect(row.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      p.repository,
    )
    expect(row.getByText(p.status.toUpperCase())).toBeInTheDocument()
  }
})
it('never renders npm links for unpublished packages', () => {
  render(
    <ProjectRow
      project={{
        ...publicProjects[0],
        npm: { package: '@nipe-solutions/example', published: false },
      }}
    />,
  )
  expect(screen.queryByRole('link', { name: 'npm' })).not.toBeInTheDocument()
})
