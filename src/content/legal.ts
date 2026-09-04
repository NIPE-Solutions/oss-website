import type { OpenSourceProject, ProjectSupport } from '@/content/project-types'
import { publicProjects } from '@/content/projects'

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

export interface ProjectSupportRoute {
  readonly project: OpenSourceProject
  readonly support: ProjectSupport
}

export const projectSupportRoutes: readonly ProjectSupportRoute[] =
  publicProjects.flatMap((project) =>
    project.support ? [{ project, support: project.support }] : [],
  )
