import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { ProjectDetail } from '@/components/project-detail'
import { publicProjects } from '@/content/projects'
import Page, { generateMetadata, generateStaticParams } from './[slug]/page'

afterEach(cleanup)

describe('project detail routes', () => {
  const newProjectDetails = [
    {
      slug: 'react-anchored-layer',
      name: 'React Anchored Layer',
      purpose:
        'It exists to keep arbitrary portal content aligned with an anchor while the application retains ownership of interaction and accessibility semantics.',
      capabilities: [
        'Portal and anchor tracking',
        'Collision and measurement ownership',
      ],
      limitation: 'Application-owned interaction semantics',
      example:
        "import { AnchoredLayer } from '@nipe-solutions/react-anchored-layer'",
      documentation: 'https://react-anchored-layer.nipesolutions.com',
      repository: 'https://github.com/NIPE-Solutions/react-anchored-layer',
    },
    {
      slug: 'react-pull-to-refresh',
      name: 'React Pull to Refresh',
      purpose:
        'It exists to coordinate downward intent, the active scroll boundary, resistance, threshold hysteresis, exactly-once refresh commitment, and settling while applications own data and errors.',
      capabilities: [
        'Scroll-boundary and direction arbitration',
        'Resistance and threshold hysteresis',
      ],
      limitation: 'Native refresh and device QA boundaries',
      example:
        "import { PullToRefresh } from '@nipe-solutions/react-pull-to-refresh'",
      documentation: 'https://react-pull-to-refresh.nipesolutions.com',
      repository: 'https://github.com/NIPE-Solutions/react-pull-to-refresh',
    },
    {
      slug: 'react-viewport',
      name: 'React Viewport',
      purpose:
        'It exists for React behavior that needs measured viewport geometry or an explicit distinction between layout and visual viewports when CSS alone cannot express it.',
      capabilities: [
        'Separate layout and visual geometry',
        'Conservative keyboard and safe-area state',
      ],
      limitation: 'Heuristic and physical-device boundaries',
      example: "from '@nipe-solutions/react-viewport'",
      documentation:
        'https://github.com/NIPE-Solutions/react-viewport/blob/08a4b3a2353d934835eb1054dd6ddadef2370e65/README.md',
      repository: 'https://github.com/NIPE-Solutions/react-viewport',
    },
  ] as const

  it('generates one static route for every public project', () => {
    expect(generateStaticParams()).toEqual([
      { slug: 'react-spring-bottom-sheet' },
      { slug: 'react-swipe-actions' },
      { slug: 'react-anchored-layer' },
      { slug: 'react-pull-to-refresh' },
      { slug: 'react-viewport' },
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
        title: 'React Swipe Actions',
        description:
          'Composable React rows with measured leading and trailing actions, keyboard support, logical RTL sides, and optional full-swipe activation.',
        alternates: {
          canonical:
            'https://opensource.nipesolutions.com/projects/react-swipe-actions',
        },
      },
      {
        title: 'React Anchored Layer',
        description:
          'Anchored floating layers for React that keep arbitrary portal content aligned through scroll, resize, and layout changes.',
        alternates: {
          canonical:
            'https://opensource.nipesolutions.com/projects/react-anchored-layer',
        },
      },
      {
        title: 'React Pull to Refresh',
        description:
          'Pull-to-refresh for React with scroll arbitration, resistance, threshold hysteresis, and an application-owned refresh lifecycle.',
        alternates: {
          canonical:
            'https://opensource.nipesolutions.com/projects/react-pull-to-refresh',
        },
      },
      {
        title: 'React Viewport',
        description:
          'Reactive React geometry for layout and visual viewports, keyboard occlusion, and safe areas.',
        alternates: {
          canonical:
            'https://opensource.nipesolutions.com/projects/react-viewport',
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
              : project.status === 'alpha'
                ? 'Alpha'
                : project.status,
        ),
      ).toBeInTheDocument()
      expect(
        screen.getByRole('img', {
          name: `${project.name} concept illustration`,
        }),
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
      if (project.npm?.published) {
        expect(
          within(actions).getByRole('link', { name: 'npm package' }),
        ).toHaveAttribute(
          'href',
          `https://www.npmjs.com/package/${project.npm.package}`,
        )
        const installCommand = screen.getByText(
          `npm install ${project.npm.package}`,
        )
        expect(installCommand).toBeInTheDocument()
        expect(installCommand.closest('pre')).toHaveAttribute('tabindex', '0')
      } else {
        expect(
          within(actions).queryByRole('link', { name: 'npm package' }),
        ).not.toBeInTheDocument()
        expect(screen.queryByText(/^npm install /)).not.toBeInTheDocument()
      }

      expect(
        screen.getByRole('link', { name: 'Explore other projects' }),
      ).toHaveAttribute('href', '/#projects')
    },
  )

  it.each(newProjectDetails)(
    'renders a complete public Alpha evaluation route for $name',
    async (expected) => {
      render(await Page({ params: Promise.resolve({ slug: expected.slug }) }))

      expect(
        screen.getByRole('heading', { level: 1, name: expected.name }),
      ).toBeInTheDocument()
      expect(screen.getByText('Alpha')).toBeInTheDocument()
      expect(screen.getByText(expected.purpose)).toBeInTheDocument()
      for (const capability of expected.capabilities) {
        const heading = screen.getByRole('heading', { name: capability })
        expect(heading).toBeInTheDocument()
        expect(
          within(heading.closest('li') as HTMLElement).getByRole('link', {
            name: `Source for ${capability}`,
          }),
        ).toBeInTheDocument()
      }
      expect(
        screen.getByRole('heading', { name: expected.limitation }),
      ).toBeInTheDocument()
      expect(screen.getByText(new RegExp(expected.example))).toBeInTheDocument()

      const actions = screen.getByRole('navigation', {
        name: `${expected.name} actions`,
      })
      expect(
        within(actions).getByRole('link', { name: 'Documentation' }),
      ).toHaveAttribute('href', expected.documentation)
      expect(
        within(actions).getByRole('link', { name: 'Source' }),
      ).toHaveAttribute('href', expected.repository)
      expect(
        within(actions).queryByRole('link', { name: 'npm package' }),
      ).not.toBeInTheDocument()
      expect(screen.queryByText(/^npm install /)).not.toBeInTheDocument()
      expect(
        screen.getByRole('link', { name: 'Explore other projects' }),
      ).toHaveAttribute('href', '/#projects')
      expect(
        screen.getByRole('img', {
          name: `${expected.name} concept illustration`,
        }),
      ).toBeInTheDocument()
    },
  )

  it('omits install and npm actions from a public project with a known unpublished package', () => {
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

  it('does not expose a local page or metadata for an unknown project', async () => {
    const params = Promise.resolve({ slug: 'hidden-project' })

    await expect(Page({ params })).rejects.toThrow()
    await expect(
      generateMetadata({
        params: Promise.resolve({ slug: 'hidden-project' }),
      }),
    ).resolves.toEqual({ alternates: null, robots: null })
  })
})
