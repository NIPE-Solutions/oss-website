import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'

import ts from 'typescript'

const knownCategories = new Set(['ui-interaction', 'runtime', 'tooling'])
const knownVisibilities = new Set(['public', 'hidden'])
const knownStatuses = new Set([
  'stable',
  'beta',
  'alpha',
  'preview',
  'development',
  'maintenance',
  'archived',
])
const knownClaimKinds = new Set(['capability', 'limitation'])
const knownVisuals = new Set([
  'bottom-sheet',
  'readonly-view',
  'swipe-actions',
  'anchored-layer',
  'pull-to-refresh',
  'viewport',
  'codemod',
])
const supportDestinations = [
  'issues',
  'discussions',
  'security',
  'documentation',
]
const nipePackageName = /^@nipe-solutions\/[a-z0-9][a-z0-9-]*$/

function isHttpsUrl(value) {
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

function validateSource(errors, slug, source, context) {
  if (!source?.label) {
    errors.push(`Project "${slug}" ${context} source is missing a label.`)
  }

  if (!isHttpsUrl(source?.href)) {
    errors.push(`Project "${slug}" ${context} source URL must use HTTPS.`)
  }
}

export function validateProjects(entries) {
  const errors = []
  const slugs = new Set()
  const orders = new Set()

  for (const entry of entries) {
    const { slug } = entry

    if (slugs.has(slug)) {
      errors.push(`Duplicate slug "${slug}".`)
    }
    slugs.add(slug)

    if (!knownCategories.has(entry.category)) {
      errors.push(
        `Project "${slug}" has an unknown category "${entry.category}".`,
      )
    }

    if (!knownVisibilities.has(entry.visibility)) {
      errors.push(
        `Project "${slug}" has an unknown visibility "${entry.visibility}".`,
      )
    }

    if (!knownStatuses.has(entry.status)) {
      errors.push(`Project "${slug}" has an unknown status "${entry.status}".`)
    }

    if (!isHttpsUrl(entry.repository)) {
      errors.push(`Project "${slug}" has a repository URL that must use HTTPS.`)
    }

    if (entry.documentation && !isHttpsUrl(entry.documentation)) {
      errors.push(
        `Project "${slug}" has a documentation URL that must use HTTPS.`,
      )
    }

    if (entry.visibility === 'public' && !entry.documentation) {
      errors.push(`Public project "${slug}" is missing documentation.`)
    }

    if (!entry.license) {
      errors.push(`Project "${slug}" is missing a license.`)
    }

    if (entry.npm) {
      if (!nipePackageName.test(entry.npm.package)) {
        errors.push(
          `Project "${slug}" has an invalid npm package "${entry.npm.package}"; expected a scoped @nipe-solutions package name.`,
        )
      }

      if (typeof entry.npm.published !== 'boolean') {
        errors.push(`Project "${slug}" npm publication state must be boolean.`)
      }
    }

    if (!entry.purpose?.description) {
      errors.push(`Project "${slug}" purpose is missing description.`)
    }

    validateSource(errors, slug, entry.purpose?.source, 'purpose')

    if (!entry.claims?.length) {
      errors.push(`Project "${slug}" must define at least one claim.`)
    }

    if (!knownVisuals.has(entry.visual)) {
      errors.push(`Project "${slug}" has an unknown visual "${entry.visual}".`)
    }

    for (const destination of supportDestinations) {
      const url = entry.support?.[destination]

      if (url !== undefined && !isHttpsUrl(url)) {
        errors.push(
          `Project "${slug}" support ${destination} URL must use HTTPS.`,
        )
      }
    }

    if (!Number.isInteger(entry.order) || entry.order < 1) {
      errors.push(
        `Project "${slug}" has an order that must be a positive integer.`,
      )
    } else if (orders.has(entry.order)) {
      errors.push(`Duplicate editorial order "${entry.order}".`)
    }
    orders.add(entry.order)

    for (const [index, claim] of (entry.claims ?? []).entries()) {
      if (!knownClaimKinds.has(claim.kind)) {
        errors.push(
          `Project "${slug}" claim ${index + 1} has an unknown kind "${claim.kind}".`,
        )
      }

      validateSource(errors, slug, claim.source, `claim ${index + 1}`)
    }

    if (entry.example) {
      validateSource(errors, slug, entry.example.source, 'example')
    }
  }

  return errors
}

function loadRegistry() {
  const registryPath = new URL('../src/content/projects.ts', import.meta.url)
  const source = readFileSync(registryPath, 'utf8')
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: fileURLToPath(registryPath),
  }).outputText
  const registryModule = { exports: {} }

  vm.runInNewContext(compiled, {
    module: registryModule,
    exports: registryModule.exports,
  })

  return registryModule.exports.projects
}

function run() {
  const projects = loadRegistry()
  const errors = validateProjects(projects)

  if (errors.length > 0) {
    console.error(errors.join('\n'))
    process.exitCode = 1
    return
  }

  console.log(`Validated ${projects.length} projects.`)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  run()
}
