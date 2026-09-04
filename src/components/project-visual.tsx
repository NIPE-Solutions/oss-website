import type { OpenSourceProject } from '@/content/project-types'

interface ProjectVisualProps {
  readonly project: OpenSourceProject
}

export function ProjectVisual({ project }: ProjectVisualProps) {
  if (project.visual === 'bottom-sheet') {
    return (
      <figure
        className="project-visual project-visual--bottom-sheet"
        role="img"
        aria-label={`${project.name} concept illustration`}
      >
        <div className="sheet-stage" aria-hidden="true">
          <span className="sheet-stage__content" />
          <span className="sheet-stage__backdrop" />
          <span className="sheet-stage__panel sheet-stage__panel--rest" />
          <span className="sheet-stage__panel sheet-stage__panel--active">
            <i />
            <i />
            <i />
          </span>
          <span className="sheet-stage__snap sheet-stage__snap--high" />
          <span className="sheet-stage__snap sheet-stage__snap--low" />
        </div>
      </figure>
    )
  }

  if (project.visual === 'readonly-view') {
    return (
      <figure
        className="project-visual project-visual--readonly-view"
        role="img"
        aria-label={`${project.name} concept illustration`}
      >
        <div className="view-model" aria-hidden="true">
          <div className="view-model__source">
            <span className="view-model__cap" />
            <span className="view-model__datum" />
            <span className="view-model__edge" />
          </div>
          <div className="view-model__connection">
            <span />
            <span />
          </div>
          <div className="view-model__view">
            <span className="view-model__cap" />
            <span className="view-model__datum" />
            <span className="view-model__edge" />
          </div>
        </div>
      </figure>
    )
  }

  if (project.visual === 'codemod') {
    return (
      <figure
        className="project-visual project-visual--codemod"
        role="img"
        aria-label={`${project.name} concept illustration`}
      >
        <div className="migration-diff" aria-hidden="true">
          <div className="migration-diff__header">
            <span />
            <span />
          </div>
          <span className="migration-diff__removed" />
          <span className="migration-diff__added" />
          <div className="migration-diff__result">
            <span />
            <span />
          </div>
        </div>
      </figure>
    )
  }

  return null
}
