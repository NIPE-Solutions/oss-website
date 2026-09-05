import { ImageResponse } from 'next/og'

import { publicProjects } from '@/content/projects'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface ProjectImageProps {
  readonly params: Promise<{ slug: string }>
}

function findPublicProject(slug: string) {
  return publicProjects.find((project) => project.slug === slug)
}

export async function generateImageMetadata({ params }: ProjectImageProps) {
  const project = findPublicProject((await params).slug)

  if (!project) {
    return []
  }

  return [
    {
      id: project.slug,
      alt: `${project.name} — NIPE Open Source`,
      size,
      contentType,
    },
  ]
}

export default async function ProjectOpenGraphImage({
  params,
}: ProjectImageProps) {
  const project = findPublicProject((await params).slug)

  if (!project) {
    throw new Error('Unknown project image route')
  }

  const status =
    project.status[0].toUpperCase() + project.status.slice(1).toLowerCase()
  const footerLabel = project.npm?.published
    ? project.npm.package
    : `opensource.nipesolutions.com/projects/${project.slug}`

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        background: '#f2efe8',
        color: '#171716',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          paddingBottom: 28,
          borderBottom: '2px solid #171716',
          fontSize: 25,
          fontWeight: 700,
        }}
      >
        <span style={{ display: 'flex' }}>NIPE Open Source</span>
        <span
          style={{
            display: 'flex',
            padding: '9px 15px',
            border: '2px solid #171716',
            fontSize: 18,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {status}
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
        }}
      >
        <div
          style={{
            display: 'flex',
            maxWidth: 990,
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: '-0.045em',
          }}
        >
          {project.name}
        </div>
        <div
          style={{
            display: 'flex',
            maxWidth: 930,
            fontSize: 27,
            lineHeight: 1.35,
            color: '#5d5a53',
          }}
        >
          {project.description}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          fontSize: 20,
          color: '#5d5a53',
        }}
      >
        <span
          aria-hidden="true"
          style={{
            display: 'flex',
            width: 54,
            height: 6,
            background: '#b52d2d',
          }}
        />
        {footerLabel}
      </div>
    </div>,
    size,
  )
}
