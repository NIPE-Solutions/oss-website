import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProjectDetail } from '@/components/project-detail'
import {
  createProjectStructuredData,
  StructuredData,
} from '@/components/structured-data'
import { getProject, publishedProjects } from '@/content/projects'
import { createPageMetadata } from '@/lib/metadata'

interface ProjectPageProps {
  readonly params: Promise<{ slug: string }>
}

function getPublishedProject(slug: string) {
  const project = getProject(slug)

  return publishedProjects.includes(
    project as (typeof publishedProjects)[number],
  )
    ? project
    : undefined
}

export function generateStaticParams() {
  return publishedProjects.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = getPublishedProject((await params).slug)

  if (!project) {
    return {}
  }

  return createPageMetadata({
    title: project.name,
    description: project.description,
    path: `/projects/${project.slug}`,
  })
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = getPublishedProject((await params).slug)

  if (!project) {
    notFound()
  }

  return (
    <>
      <StructuredData data={createProjectStructuredData(project)} />
      <ProjectDetail project={project} />
    </>
  )
}
