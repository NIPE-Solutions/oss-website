import type { OpenSourceProject } from '@/content/project-types'
import { ProjectMotif } from '@/components/project-motif'

interface ProjectVisualProps {
  readonly project: OpenSourceProject
}

export function ProjectVisual({ project }: ProjectVisualProps) {
  return (
    <figure
      className={`project-visual project-visual--${project.visual}`}
      role="img"
      aria-label={`${project.name} concept illustration`}
    >
      <ProjectMotif visual={project.visual} decorative />
    </figure>
  )
}
