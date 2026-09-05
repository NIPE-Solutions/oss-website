import Link from 'next/link'

import { ProjectMenuDisclosure } from '@/components/project-menu-disclosure'
import { projectStatusLabels } from '@/content/project-status'
import { projectCategories, publicProjects } from '@/content/projects'

export function ProjectMenu() {
  const populatedCategories = projectCategories
    .map((category) => ({
      ...category,
      projects: publicProjects.filter(
        (project) => project.category === category.id,
      ),
    }))
    .filter(({ projects }) => projects.length > 0)

  return (
    <ProjectMenuDisclosure>
      <summary>Projects</summary>
      <div className="project-menu__panel">
        {populatedCategories.map((category) => (
          <section
            className="project-menu__group"
            key={category.id}
            aria-labelledby={`project-menu-${category.id}`}
          >
            <h2 id={`project-menu-${category.id}`}>{category.label}</h2>
            <ul>
              {category.projects.map((project) => (
                <li key={project.slug}>
                  <Link href={`/projects/${project.slug}`}>{project.name}</Link>
                  <span>{projectStatusLabels[project.status]}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </ProjectMenuDisclosure>
  )
}
