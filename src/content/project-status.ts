import type { ProjectStatus } from './project-types'

export const projectStatusLabels: Record<ProjectStatus, string> = {
  stable: 'Stable',
  beta: 'Beta',
  alpha: 'Alpha',
  preview: 'Preview',
  development: 'Development',
  maintenance: 'Maintenance',
  archived: 'Archived',
}
