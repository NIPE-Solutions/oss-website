import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProjectDetail } from '@/components/project-detail'
import {
  createProjectStructuredData,
  StructuredData,
} from '@/components/structured-data'
import { publicProjects } from '@/content/projects'
import { createPageMetadata } from '@/lib/metadata'

interface ProjectPageProps {
  readonly params: Promise<{ slug: string }>
}

function getPublicProject(slug: string) {
  return publicProjects.find((project) => project.slug === slug)
}

export function generateStaticParams() {
  return publicProjects.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = getPublicProject((await params).slug)

  if (!project) {
    return { alternates: null, robots: null }
  }

  return createPageMetadata({
    title: project.name,
    description: project.description,
    path: `/projects/${project.slug}`,
  })
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = getPublicProject((await params).slug)

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
