import { ProjectEntry } from '@/components/project-entry'
import { projectCategories, publicProjects } from '@/content/projects'

export function ProjectDirectory() {
  const populatedCategories = projectCategories
    .map((category) => ({
      ...category,
      projects: publicProjects.filter(
        (project) => project.category === category.id,
      ),
    }))
    .filter(({ projects }) => projects.length > 0)

  return (
    <section
      className="project-directory"
      id="projects"
      aria-labelledby="projects-heading"
    >
      <div className="site-frame">
        <header className="section-introduction">
          <h2 id="projects-heading">Projects</h2>
          <p>
            Public projects and their canonical technical references, grouped by
            the problem they address.
          </p>
        </header>

        {populatedCategories.map((category) => (
          <section
            className="project-category"
            key={category.id}
            aria-labelledby={`${category.id}-heading`}
          >
            <h3 id={`${category.id}-heading`}>{category.label}</h3>
            {category.projects.map((project) => (
              <ProjectEntry key={project.slug} project={project} />
            ))}
          </section>
        ))}
      </div>
    </section>
  )
}
