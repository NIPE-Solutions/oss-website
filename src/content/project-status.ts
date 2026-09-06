import type { ProjectStatus } from './project-types'
export const projectStatusLabels: Record<ProjectStatus, string> = {
  stable: 'STABLE',
  beta: 'BETA',
  alpha: 'ALPHA',
  experimental: 'EXPERIMENTAL',
}
