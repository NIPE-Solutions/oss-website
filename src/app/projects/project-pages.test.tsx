import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import Page, { generateMetadata, generateStaticParams } from './[slug]/page'
import { ProjectDetail } from '@/components/project-detail'
import { publicProjects } from '@/content/projects'
vi.mock('next/navigation', () => ({
  notFound: () => {
    throw new Error('404')
  },
}))
afterEach(cleanup)
it('derives static routes from the public registry', () =>
  expect(generateStaticParams()).toEqual(
    publicProjects.map((p) => ({ slug: p.slug })),
  ))
it.each(publicProjects)(
  'renders $name with canonical metadata, boundaries and publication',
  async (p) => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: p.slug }),
    })
    expect(metadata.description).toBe(p.description)
    expect(metadata.openGraph?.description).toBe(p.description)
    expect(metadata.alternates?.canonical).toBe(
      `https://opensource.nipesolutions.com/projects/${p.slug}`,
    )
    render(await Page({ params: Promise.resolve({ slug: p.slug }) }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(p.name)
    expect(
      screen.getByRole('heading', { name: 'Boundaries & limitations' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Documentation' })).toHaveAttribute(
      'href',
      p.documentation,
    )
    expect(screen.getByRole('link', { name: 'Issues' })).toHaveAttribute(
      'href',
      p.support?.issues,
    )
    expect(
      screen.getByText(`npm install ${p.npm?.package}@${p.npm?.version}`),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Source for purpose' }),
    ).toHaveAttribute('href', expect.stringContaining('/blob/'))
  },
)
it('omits npm and version for unpublished packages', () => {
  render(
    <ProjectDetail
      project={{
        ...publicProjects[0],
        npm: { package: '@nipe-solutions/example', published: false },
      }}
    />,
  )
  expect(
    screen.queryByRole('heading', { name: 'Install' }),
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('link', { name: 'npm package' }),
  ).not.toBeInTheDocument()
})
it.each([
  ['react-data-inspector', '@nipe-solutions/react-data-inspector', '1.0.0'],
  [
    'react-spring-bottom-sheet',
    '@nipe-solutions/react-spring-bottom-sheet',
    '5.0.2',
  ],
  ['react-swipe-actions', '@nipe-solutions/react-swipe-actions', '1.0.0'],
  ['react-anchored-layer', '@nipe-solutions/react-anchored-layer', '1.0.0'],
  ['react-pull-to-refresh', '@nipe-solutions/react-pull-to-refresh', '1.0.0'],
  ['react-drag-dismiss', '@nipe-solutions/react-drag-dismiss', '1.0.0'],
  ['caret-geometry', '@nipe-solutions/caret-geometry', '1.0.0'],
  ['react-viewport', '@nipe-solutions/react-viewport', '1.0.0'],
  ['readonly-view', '@nipe-solutions/readonly-view', '2.0.1'],
  ['flex-layout-codemod', '@nipe-solutions/flex-layout-codemod', '2.0.0'],
])(
  'offers the published stable install command for %s',
  async (slug, packageName, version) => {
    render(await Page({ params: Promise.resolve({ slug }) }))
    expect(screen.getByText('STABLE')).toBeInTheDocument()
    expect(
      screen.getByText(`npm install ${packageName}@${version}`),
    ).toBeInTheDocument()
  },
)
it('returns not-found for invalid projects', async () => {
  await expect(
    Page({ params: Promise.resolve({ slug: 'invalid' }) }),
  ).rejects.toThrow('404')
  expect(
    await generateMetadata({ params: Promise.resolve({ slug: 'invalid' }) }),
  ).toEqual({ alternates: null, robots: null })
})

it('renders maintenance funding only when explicitly configured', () => {
  const project = {
    ...publicProjects[0],
    funding: { githubSponsors: 'https://github.com/sponsors/example' },
  }
  render(<ProjectDetail project={project} />)
  expect(
    screen.getByRole('link', { name: 'Support maintenance' }),
  ).toHaveAttribute('href', project.funding.githubSponsors)
})
