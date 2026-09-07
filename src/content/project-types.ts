export type ProjectCategory =
  'ui-interaction' | 'browser-primitives' | 'runtime' | 'tooling'

export type ProjectVisibility = 'public' | 'hidden'

export type ProjectStatus = 'stable' | 'beta' | 'alpha' | 'experimental'

export interface ProjectSource {
  readonly label: string
  readonly href: string
}

export interface ProjectClaim {
  readonly kind: 'capability' | 'limitation'
  readonly title: string
  readonly description?: string
  readonly source: ProjectSource
}

export interface ProjectNpm {
  readonly package: string
  readonly published: boolean
  readonly version?: string
}

export interface ProjectSupport {
  readonly issues?: string
  readonly discussions?: string
  readonly security?: string
  readonly documentation?: string
}

export interface OpenSourceProject {
  readonly slug: string
  readonly name: string
  readonly category: ProjectCategory
  readonly description: string
  readonly visibility: ProjectVisibility
  readonly status: ProjectStatus
  readonly repository: string
  readonly documentation?: string
  readonly website?: string
  readonly playground?: string
  readonly feature?: {
    readonly headline: string
    readonly signals: readonly string[]
  }
  readonly npm?: ProjectNpm
  readonly support?: ProjectSupport
  readonly license?: string
  readonly purpose: {
    readonly description: string
    readonly source: ProjectSource
  }
  readonly claims: readonly ProjectClaim[]
  readonly example?: {
    readonly language: string
    readonly code: string
    readonly source: ProjectSource
  }
  readonly accent: string
  readonly visual:
    | 'bottom-sheet'
    | 'readonly-view'
    | 'swipe-actions'
    | 'anchored-layer'
    | 'pull-to-refresh'
    | 'viewport'
    | 'codemod'
    | 'drag-dismiss'
    | 'caret-geometry'
    | 'technical'
    | 'data-inspector'
  readonly changelog?: string
  readonly resources?: readonly ProjectSource[]
  readonly funding?: {
    readonly githubSponsors?: string
    readonly openCollective?: string
  }
  readonly featured: boolean
  readonly order: number
}
