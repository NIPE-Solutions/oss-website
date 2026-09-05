import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { ProjectEntry } from '@/components/project-entry'
import { publicProjects } from '@/content/projects'
import Home from './page'

afterEach(cleanup)

describe('homepage', () => {
  it('introduces NIPE Open Source with one factual positioning heading', () => {
    render(<Home />)

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Focused primitives and tools for the web.',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Small, independently useful libraries and developer tools for browser and application problems that should not need to be rebuilt from scratch.',
      ),
    ).toBeInTheDocument()
  })

  it('shows the independent projects in the hero constellation', () => {
    render(<Home />)

    const constellation = screen.getByRole('navigation', {
      name: 'NIPE Open Source projects',
    })
    expect(within(constellation).getAllByRole('link')).toHaveLength(7)
    expect(
      screen.queryByRole('img', {
        name: /connects UI & Interaction, Runtime, and Tooling/,
      }),
    ).not.toBeInTheDocument()
    expect(screen.getByText(/do not require each other/i)).toBeInTheDocument()
  })

  it('renders only populated project categories and each published project once', () => {
    render(<Home />)

    const directory = screen.getByRole('region', { name: 'Projects' })

    expect(
      within(directory).getByText(
        'Public projects and their canonical technical references, grouped by the problem they address.',
      ),
    ).toBeInTheDocument()
    expect(
      within(directory).queryByText(/released packages/i),
    ).not.toBeInTheDocument()

    expect(
      within(directory)
        .getAllByRole('heading', { level: 3 })
        .map(({ textContent }) => textContent),
    ).toEqual(['UI & Interaction', 'Runtime', 'Tooling'])

    for (const projectName of [
      'React Spring Bottom Sheet',
      'Readonly View',
      'Angular Flex-Layout Codemod',
      'React Swipe Actions',
    ]) {
      expect(
        within(directory).getAllByRole('heading', { name: projectName }),
      ).toHaveLength(1)
    }

    expect(
      within(directory)
        .getByRole('img', {
          name: 'React Swipe Actions concept illustration',
        })
        .querySelector('.project-motif--swipe-actions'),
    ).not.toBeNull()
  })

  it('shows the verified description and status of every published project', () => {
    render(<Home />)
    const directory = screen.getByRole('region', { name: 'Projects' })

    expect(
      screen.getByText(
        'Accessible React 19 bottom sheets with a compound Sheet API, named snap points, and separately exported styles.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'A deeply readonly, lazy, live view of owner-controlled mutable data for JavaScript and TypeScript.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'A beta Angular template codemod for Flex-Layout to Tailwind CSS v4 migrations.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Composable React rows with measured leading and trailing actions, keyboard support, logical RTL sides, and optional full-swipe activation.',
      ),
    ).toBeInTheDocument()

    expect(within(directory).getAllByText('Stable')).toHaveLength(2)
    expect(within(directory).getAllByText('Beta')).toHaveLength(1)
    expect(within(directory).getAllByText('Alpha')).toHaveLength(4)
  })

  it('routes every project to its documentation, source, and published package', () => {
    render(<Home />)

    const destinations = [
      {
        name: 'React Spring Bottom Sheet',
        documentation: 'https://react-spring-bottom-sheet.nipesolutions.com',
        source: 'https://github.com/NIPE-Solutions/react-spring-bottom-sheet',
        package:
          'https://www.npmjs.com/package/@nipe-solutions/react-spring-bottom-sheet',
      },
      {
        name: 'Readonly View',
        documentation: 'https://readonly-view.nipesolutions.com',
        source: 'https://github.com/NIPE-Solutions/readonly-view',
        package: 'https://www.npmjs.com/package/@nipe-solutions/readonly-view',
      },
      {
        name: 'Angular Flex-Layout Codemod',
        documentation:
          'https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/README.md',
        source: 'https://github.com/NIPE-Solutions/flex-layout-migrator',
        package:
          'https://www.npmjs.com/package/@nipe-solutions/flex-layout-codemod',
      },
      {
        name: 'React Swipe Actions',
        documentation: 'https://react-swipe-actions.nipesolutions.com',
        source: 'https://github.com/NIPE-Solutions/react-swipe-actions',
        package:
          'https://www.npmjs.com/package/@nipe-solutions/react-swipe-actions',
      },
    ]

    for (const destination of destinations) {
      const project = screen.getByRole('article', { name: destination.name })

      expect(
        within(project).getByRole('link', { name: 'Documentation' }),
      ).toHaveAttribute('href', destination.documentation)
      expect(
        within(project).getByRole('link', { name: 'Source' }),
      ).toHaveAttribute('href', destination.source)
      expect(
        within(project).getByRole('link', { name: 'npm' }),
      ).toHaveAttribute('href', destination.package)
    }
  })

  it('omits npm from a public project entry when its known package is unpublished', () => {
    const project = {
      ...publicProjects[0],
      npm: { package: '@nipe-solutions/unreleased', published: false },
    }
    render(<ProjectEntry project={project} />)

    const entry = screen.getByRole('article', { name: project.name })
    expect(
      within(entry).queryByRole('link', { name: 'npm' }),
    ).not.toBeInTheDocument()
    expect(within(entry).getByRole('link', { name: 'Source' })).toHaveAttribute(
      'href',
      project.repository,
    )
  })

  it('links project titles to their local detail pages', () => {
    render(<Home />)

    for (const destination of [
      {
        name: 'React Spring Bottom Sheet',
        href: '/projects/react-spring-bottom-sheet',
      },
      {
        name: 'Readonly View',
        href: '/projects/readonly-view',
      },
      {
        name: 'Angular Flex-Layout Codemod',
        href: '/projects/flex-layout-codemod',
      },
      {
        name: 'React Swipe Actions',
        href: '/projects/react-swipe-actions',
      },
    ]) {
      const project = screen.getByRole('article', { name: destination.name })

      expect(
        within(project).getByRole('link', { name: destination.name }),
      ).toHaveAttribute('href', destination.href)
    }
  })

  it('states qualified principles and renders only configured support routes', () => {
    render(<Home />)

    const principles = screen.getByRole('region', {
      name: 'Engineering principles',
    })
    expect(within(principles).getByText('Evidence before claims')).toBeVisible()
    expect(within(principles).getByText('Focused by design')).toBeVisible()
    expect(
      within(principles).queryByText('Automation leaves a review path'),
    ).not.toBeInTheDocument()

    const support = screen.getByRole('region', {
      name: 'Contributing and security',
    })
    const bottomSheet = within(support)
      .getByText('React Spring Bottom Sheet')
      .closest('li')
    expect(bottomSheet).not.toBeNull()
    expect(within(bottomSheet!).getAllByRole('link')).toHaveLength(1)
    expect(
      within(bottomSheet!).getByRole('link', { name: /documentation/i }),
    ).toHaveAttribute(
      'href',
      'https://react-spring-bottom-sheet.nipesolutions.com',
    )
    expect(
      within(support).getByRole('link', {
        name: 'Readonly View security',
      }),
    ).toHaveAttribute(
      'href',
      'https://github.com/NIPE-Solutions/readonly-view/security/policy',
    )
    expect(
      within(support).getByRole('link', {
        name: 'Angular Flex-Layout Codemod security',
      }),
    ).toHaveAttribute(
      'href',
      'https://github.com/NIPE-Solutions/flex-layout-migrator/security/advisories/new',
    )
    expect(
      within(support).getByRole('link', {
        name: 'React Swipe Actions discussions',
      }),
    ).toHaveAttribute(
      'href',
      'https://github.com/NIPE-Solutions/react-swipe-actions/discussions',
    )
  })

  it('keeps concept visuals free of component-owned project facts', () => {
    render(<Home />)

    for (const projectName of [
      'React Spring Bottom Sheet',
      'Readonly View',
      'Angular Flex-Layout Codemod',
      'React Swipe Actions',
    ]) {
      const visual = screen.getByRole('img', {
        name: `${projectName} concept illustration`,
      })

      expect(visual).not.toHaveTextContent(/\S/)
    }
  })

  it('contains no placeholder, social-proof, or generic marketing language', () => {
    const { container } = render(<Home />)
    const publicCopy = container.textContent ?? ''

    expect(publicCopy).not.toMatch(
      /lorem ipsum|coming soon|trusted by|customers|downloads|stars|unlock|seamless|effortless|supercharge|robust|powerful|next-gen|modern developers|built for teams|at scale|enterprise-grade|beautiful|intuitive|revolutionize|transform/i,
    )
  })
})
