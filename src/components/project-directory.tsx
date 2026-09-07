import { FeaturedProject } from '@/components/featured-project'
import { ProjectRow } from '@/components/project-row'
import { projectCategories, publicProjects } from '@/content/projects'

export function ProjectDirectory() {
  return (
    <section
      className="project-directory site-frame"
      id="projects"
      aria-labelledby="projects-heading"
    >
      <header className="directory-heading">
        <h2 id="projects-heading">Project index</h2>
        <span>Choose the problem. Take the piece.</span>
      </header>
      {projectCategories.map((category) => {
        const entries = publicProjects.filter(
          (project) => project.category === category.id,
        )
        return entries.length ? (
          <section
            className="project-category"
            key={category.id}
            aria-labelledby={`${category.id}-heading`}
          >
            <header className="category-header">
              <div>
                <h3 id={`${category.id}-heading`}>{category.label}</h3>
                <p>{category.description}</p>
              </div>
              <span
                className="category-count"
                aria-label={`${entries.length} projects`}
              >
                {String(entries.length).padStart(2, '0')}
              </span>
            </header>
            {entries.map((project) =>
              project.featured ? (
                <FeaturedProject key={project.slug} project={project} />
              ) : (
                <ProjectRow key={project.slug} project={project} />
              ),
            )}
          </section>
        ) : null
      })}
      <p className="status-legend">
        Alpha — API and behavior may change. Beta — API settling, broader
        validation. Stable — compatibility expectations established.
      </p>
    </section>
  )
}
