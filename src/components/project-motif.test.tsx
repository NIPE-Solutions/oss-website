import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { ProjectMotif } from './project-motif'
import { ProjectVisual } from './project-visual'
import { publicProjects } from '@/content/projects'

afterEach(cleanup)

const visualProjects = [
  {
    visual: 'bottom-sheet',
    name: 'Bottom Sheet fixture',
    label: 'Bottom Sheet fixture concept illustration',
  },
  {
    visual: 'swipe-actions',
    name: 'Swipe Actions fixture',
    label: 'Swipe Actions fixture concept illustration',
  },
  {
    visual: 'anchored-layer',
    name: 'Anchored Layer fixture',
    label: 'Anchored Layer fixture concept illustration',
  },
  {
    visual: 'pull-to-refresh',
    name: 'Pull to Refresh fixture',
    label: 'Pull to Refresh fixture concept illustration',
  },
  {
    visual: 'viewport',
    name: 'Viewport fixture',
    label: 'Viewport fixture concept illustration',
  },
  {
    visual: 'readonly-view',
    name: 'Readonly View fixture',
    label: 'Readonly View fixture concept illustration',
  },
  {
    visual: 'codemod',
    name: 'Codemod fixture',
    label: 'Codemod fixture concept illustration',
  },
] as const

describe('ProjectVisual motifs', () => {
  it.each(visualProjects)(
    'renders the $visual motif as an accessible text-free illustration',
    ({ visual, name, label }) => {
      const project = { ...publicProjects[0], visual, name }
      render(<ProjectVisual project={project} />)

      const illustration = screen.getByRole('img', {
        name: label,
      })

      expect(
        illustration.querySelector(`.project-motif--${visual}`),
      ).not.toBeNull()
      expect(illustration).not.toHaveTextContent(/\S/)
    },
  )
})

describe('ProjectMotif', () => {
  it('hides decorative motifs from assistive technology', () => {
    render(<ProjectMotif visual="viewport" decorative />)

    expect(screen.getByTestId('project-motif-viewport')).toHaveAttribute(
      'aria-hidden',
      'true',
    )
  })
})
