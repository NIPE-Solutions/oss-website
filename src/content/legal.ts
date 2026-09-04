import type { OpenSourceProject } from '@/content/project-types'
import { publishedProjects } from '@/content/projects'

export interface Operator {
  readonly company: string
  readonly proprietor: string
  readonly street: string
  readonly postalCode: string
  readonly city: string
  readonly country: string
  readonly countryGerman: string
  readonly email: string
  readonly phoneDisplay: string
  readonly phoneHref: string
  readonly vatId: string
  readonly registerNumber: string
  readonly registerCourt: string
  readonly registeredOffice: string
  readonly trade: string
  readonly authority: string
  readonly chamber: string
}

export const operator: Operator = {
  company: 'NIPE Solutions e.U.',
  proprietor: 'Nicholas Petrasek',
  street: 'Achtergasse 10',
  postalCode: '1230',
  city: 'Wien',
  country: 'Austria',
  countryGerman: 'Österreich',
  email: 'office@nipesolutions.com',
  phoneDisplay: '+43 676 9654266',
  phoneHref: '+436769654266',
  vatId: 'ATU78464412',
  registerNumber: 'FN 585066t',
  registerCourt: 'Handelsgericht Wien',
  registeredOffice: 'Wien',
  trade:
    'Dienstleistungen in der automatischen Datenverarbeitung und Informationstechnik',
  authority: 'Magistratisches Bezirksamt für den 23. Bezirk',
  chamber: 'Wirtschaftskammer Wien',
}

type SecurityDestination =
  | {
      readonly kind: 'private-reporting'
      readonly label: 'private vulnerability report'
      readonly note: string
    }
  | {
      readonly kind: 'policy'
      readonly label: 'security policy'
      readonly note: string
    }
  | {
      readonly kind: 'overview'
      readonly label: 'security overview'
      readonly note: string
    }

export interface ProjectSupportRoute {
  readonly project: OpenSourceProject
  readonly contributionUrl: string
  readonly securityUrl: string
  readonly security: SecurityDestination
}

function securityDestination(project: OpenSourceProject): SecurityDestination {
  if (project.slug === 'flex-layout-codemod') {
    return {
      kind: 'private-reporting',
      label: 'private vulnerability report',
      note: 'Private vulnerability reporting is enabled for this repository.',
    }
  }

  if (project.slug === 'readonly-view') {
    return {
      kind: 'policy',
      label: 'security policy',
      note: 'Private vulnerability reporting is not currently enabled. Read the repository policy and confirm its current instructions before sharing details.',
    }
  }

  return {
    kind: 'overview',
    label: 'security overview',
    note: 'No verified private reporting route or published policy is available. Review the repository security overview without disclosing sensitive details in a public issue.',
  }
}

function securityUrl(
  project: OpenSourceProject,
  destination: SecurityDestination,
) {
  if (destination.kind === 'private-reporting') {
    return `${project.repository}/security/advisories/new`
  }

  if (destination.kind === 'policy') {
    return `${project.repository}/security/policy`
  }

  return `${project.repository}/security`
}

export const projectSupportRoutes: readonly ProjectSupportRoute[] =
  publishedProjects.map((project) => {
    const security = securityDestination(project)

    return {
      project,
      contributionUrl: `${project.repository}/blob/main/CONTRIBUTING.md`,
      securityUrl: securityUrl(project, security),
      security,
    }
  })
