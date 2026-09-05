import type { OpenSourceProject } from '@/content/project-types'

interface ProjectMotifProps {
  readonly visual: OpenSourceProject['visual']
  readonly decorative?: boolean
}

export function ProjectMotif({
  visual,
  decorative = false,
}: ProjectMotifProps) {
  const parts = {
    'bottom-sheet': ['surface', 'snap-high', 'snap-low'],
    'swipe-actions': ['leading', 'row', 'trailing'],
    'anchored-layer': ['anchor', 'measure', 'layer'],
    'pull-to-refresh': ['pull', 'threshold', 'indicator'],
    viewport: ['layout', 'visual', 'keyboard'],
    'readonly-view': ['source', 'membrane', 'view'],
    codemod: ['input', 'review', 'output'],
  } satisfies Record<OpenSourceProject['visual'], readonly string[]>

  return (
    <span
      className={`project-motif project-motif--${visual}`}
      data-testid={`project-motif-${visual}`}
      aria-hidden={decorative || undefined}
    >
      {parts[visual].map((part) => (
        <span key={part} className={`project-motif__${part}`} />
      ))}
    </span>
  )
}
