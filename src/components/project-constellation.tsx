import type { CSSProperties } from 'react'
import Link from 'next/link'

import { ProjectMotif } from '@/components/project-motif'
import { projectStatusLabels } from '@/content/project-status'
import { publicProjects } from '@/content/projects'

export function ProjectConstellation() {
  return (
    <nav
      className="project-constellation"
      aria-label="NIPE Open Source projects"
    >
      <span className="project-constellation__hub" aria-hidden="true">
        <span>NIPE</span>
        <span>Open Source</span>
      </span>
      {publicProjects.map((project) => (
        <Link
          key={project.slug}
          className={`project-node project-node--${project.visual}`}
          href={`/projects/${project.slug}`}
          aria-label={`${project.name} ${projectStatusLabels[project.status]}`}
          style={{ '--project-accent': project.accent } as CSSProperties}
        >
          <ProjectMotif visual={project.visual} decorative />
          <span className="project-node__name">{project.name}</span>
          <span className="project-node__status">
            {projectStatusLabels[project.status]}
          </span>
        </Link>
      ))}
    </nav>
  )
}
