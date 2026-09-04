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
        aria-label="Layered panels illustrate a bottom sheet moving through named snap points."
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
        aria-label="An owner-controlled source remains connected to a protected live view."
      >
        <div className="view-model" aria-hidden="true">
          <div className="view-model__source">
            <span>owner source</span>
            <b>name: Bob</b>
            <i>write</i>
          </div>
          <div className="view-model__connection">
            <span />
            <span />
          </div>
          <div className="view-model__view">
            <span>readonly view</span>
            <b>name: Bob</b>
            <i>read</i>
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
        aria-label="A compact diff illustrates a reviewed Flex-Layout to Tailwind conversion."
      >
        <div className="migration-diff" aria-hidden="true">
          <div className="migration-diff__header">
            <span>template.html</span>
            <span>dry run</span>
          </div>
          <code className="migration-diff__removed">
            − fxLayout=&quot;row&quot;
          </code>
          <code className="migration-diff__added">
            + class=&quot;flex&quot;
          </code>
          <div className="migration-diff__result">
            <span>exact edit planned</span>
            <span>review required</span>
          </div>
        </div>
      </figure>
    )
  }

  return null
}
