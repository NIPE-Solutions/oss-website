export type ProjectCategory = 'ui-interaction' | 'runtime' | 'tooling'

export type ProjectStatus = 'stable' | 'prerelease' | 'maintenance' | 'archived'

export interface ProjectClaim {
  readonly kind: 'capability' | 'limitation'
  readonly label: string
  readonly detail: string
  readonly verifiedFrom: string
}

export interface OpenSourceProject {
  readonly slug: string
  readonly name: string
  readonly category: ProjectCategory
  readonly description: string
  readonly status: ProjectStatus
  readonly repository: string
  readonly documentation?: string
  readonly npmPackage?: string
  readonly license: string
  readonly purpose: {
    readonly detail: string
    readonly verifiedFrom: string
  }
  readonly claims: readonly ProjectClaim[]
  readonly example?: {
    readonly language: string
    readonly code: string
    readonly verifiedFrom: string
  }
  readonly accent: string
  readonly visual:
    'bottom-sheet' | 'readonly-view' | 'swipe-actions' | 'codemod'
  readonly featured: boolean
  readonly order: number
}
