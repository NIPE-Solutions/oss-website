import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { ProjectDetail } from '@/components/project-detail'
import { publicProjects } from '@/content/projects'
import Page, { generateMetadata, generateStaticParams } from './[slug]/page'

afterEach(cleanup)

describe('project detail routes', () => {
  it('generates one static route for every published project', () => {
    expect(generateStaticParams()).toEqual([
      { slug: 'react-spring-bottom-sheet' },
      { slug: 'readonly-view' },
      { slug: 'flex-layout-codemod' },
    ])
  })

  it('generates unique factual metadata and production canonicals', async () => {
    const metadata = await Promise.all(
      publicProjects.map(({ slug }) =>
        generateMetadata({ params: Promise.resolve({ slug }) }),
      ),
    )

    expect(metadata).toEqual([
      {
        title: 'React Spring Bottom Sheet',
        description:
          'Accessible React 19 bottom sheets with a compound Sheet API, named snap points, and separately exported styles.',
        alternates: {
          canonical:
            'https://opensource.nipesolutions.com/projects/react-spring-bottom-sheet',
        },
      },
      {
        title: 'Readonly View',
        description:
          'A deeply readonly, lazy, live view of owner-controlled mutable data for JavaScript and TypeScript.',
        alternates: {
          canonical:
            'https://opensource.nipesolutions.com/projects/readonly-view',
        },
      },
      {
        title: 'Angular Flex-Layout Codemod',
        description:
          'A beta Angular template codemod for Flex-Layout to Tailwind CSS v4 migrations.',
        alternates: {
          canonical:
            'https://opensource.nipesolutions.com/projects/flex-layout-codemod',
        },
      },
    ])
  })

  it.each(publicProjects)(
    'renders the registry-backed overview, status, evidence, scope, and actions for $name',
    async (project) => {
      render(await Page({ params: Promise.resolve({ slug: project.slug }) }))

      expect(
        screen.getByRole('heading', { level: 1, name: project.name }),
      ).toBeInTheDocument()
      expect(
        within(screen.getByRole('region', { name: 'Overview' })).getByText(
          project.description,
        ),
      ).toBeInTheDocument()
      const purpose = screen.getByRole('region', { name: 'Why it exists' })
      expect(
        within(purpose).getByText(project.purpose.description),
      ).toBeInTheDocument()
      expect(
        within(purpose).getByRole('link', { name: 'Source for purpose' }),
      ).toHaveAttribute('href', project.purpose.source.href)
      expect(
        within(purpose).getByRole('link', { name: 'Source for purpose' }),
      ).toHaveTextContent('Source')
      expect(
        screen.getByText(
          project.status === 'stable'
            ? 'Stable'
            : project.status === 'beta'
              ? 'Beta'
              : project.status,
        ),
      ).toBeInTheDocument()

      const claims = screen.getByRole('region', { name: 'Capabilities' })
      for (const claim of project.claims.filter(
        ({ kind }) => kind === 'capability',
      )) {
        expect(within(claims).getByText(claim.title)).toBeInTheDocument()
        expect(
          within(claims).getByText(claim.description ?? ''),
        ).toBeInTheDocument()
        expect(
          within(claims).getByRole('link', {
            name: `Source for ${claim.title}`,
          }),
        ).toHaveAttribute('href', claim.source.href)
        expect(
          within(claims).getByRole('link', {
            name: `Source for ${claim.title}`,
          }),
        ).toHaveTextContent('Source')
      }

      const limitations = screen.getByRole('region', { name: 'Limitations' })
      for (const claim of project.claims.filter(
        ({ kind }) => kind === 'limitation',
      )) {
        expect(within(limitations).getByText(claim.title)).toBeInTheDocument()
        expect(
          within(limitations).getByText(claim.description ?? ''),
        ).toBeInTheDocument()
        expect(
          within(limitations).getByRole('link', {
            name: `Source for ${claim.title}`,
          }),
        ).toHaveAttribute('href', claim.source.href)
      }

      expect(screen.queryByText(/Evidence for/i)).not.toBeInTheDocument()

      if (project.example) {
        const example = screen.getByRole('region', { name: 'Example' })
        expect(example.querySelector('code')?.textContent).toBe(
          project.example.code,
        )
        expect(
          within(example).getByRole('link', { name: 'Example source' }),
        ).toHaveAttribute('href', project.example.source.href)
      }

      const actions = screen.getByRole('navigation', {
        name: `${project.name} actions`,
      })
      if (project.documentation) {
        expect(
          within(actions).getByRole('link', { name: 'Documentation' }),
        ).toHaveAttribute('href', project.documentation)
      }
      expect(
        within(actions).getByRole('link', { name: 'Source' }),
      ).toHaveAttribute('href', project.repository)
      expect(
        within(actions).getByRole('link', { name: 'npm package' }),
      ).toHaveAttribute(
        'href',
        `https://www.npmjs.com/package/${project.npm?.package}`,
      )
      const installCommand = screen.getByText(
        `npm install ${project.npm?.package}`,
      )
      expect(installCommand).toBeInTheDocument()
      expect(installCommand.closest('pre')).toHaveAttribute('tabindex', '0')
    },
  )

  it('omits package actions when a project has no published package', () => {
    const project = {
      ...publicProjects[0],
      npm: { package: '@nipe-solutions/unreleased', published: false },
    }
    render(<ProjectDetail project={project} />)

    expect(
      screen.queryByRole('link', { name: 'npm package' }),
    ).not.toBeInTheDocument()
    expect(screen.queryByText(/^npm install /)).not.toBeInTheDocument()
  })

  it.each([
    ['development', 'Development'],
    ['archived', 'Archived'],
  ] as const)(
    'renders an intentionally public %s lifecycle label',
    (status, label) => {
      render(<ProjectDetail project={{ ...publicProjects[0], status }} />)

      expect(screen.getByText(label)).toBeInTheDocument()
    },
  )

  it('groups claims by their explicit kind rather than their registry position', () => {
    const project = {
      ...publicProjects[0],
      claims: [
        { ...publicProjects[0].claims[3], kind: 'limitation' as const },
        { ...publicProjects[0].claims[0], kind: 'capability' as const },
      ],
    }
    render(<ProjectDetail project={project} />)

    expect(
      within(screen.getByRole('region', { name: 'Capabilities' })).getByText(
        project.claims[1].title,
      ),
    ).toBeInTheDocument()
    expect(
      within(screen.getByRole('region', { name: 'Limitations' })).getByText(
        project.claims[0].title,
      ),
    ).toBeInTheDocument()
  })

  it('uses Next notFound for an unknown project slug', async () => {
    await expect(
      Page({ params: Promise.resolve({ slug: 'missing-project' }) }),
    ).rejects.toThrow()
  })

  it('does not expose a local page or metadata for a hidden project', async () => {
    const params = Promise.resolve({ slug: 'react-swipe-actions' })

    await expect(Page({ params })).rejects.toThrow()
    await expect(
      generateMetadata({
        params: Promise.resolve({ slug: 'react-swipe-actions' }),
      }),
    ).resolves.toEqual({})
  })
})
