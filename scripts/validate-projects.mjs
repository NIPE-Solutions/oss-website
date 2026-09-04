import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'

import ts from 'typescript'

const knownCategories = new Set(['ui-interaction', 'runtime', 'tooling'])
const knownStatuses = new Set([
  'stable',
  'prerelease',
  'maintenance',
  'archived',
])
const nipePackageName = /^@nipe-solutions\/[a-z0-9][a-z0-9-]*$/

function isHttpsUrl(value) {
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
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

    if (entry.npmPackage && !nipePackageName.test(entry.npmPackage)) {
      errors.push(
        `Project "${slug}" has an invalid npm package "${entry.npmPackage}"; expected a scoped @nipe-solutions package name.`,
      )
    }

    if (!Number.isInteger(entry.order) || entry.order < 1) {
      errors.push(
        `Project "${slug}" has an order that must be a positive integer.`,
      )
    } else if (orders.has(entry.order)) {
      errors.push(`Duplicate editorial order "${entry.order}".`)
    }
    orders.add(entry.order)

    for (const [index, claim] of entry.claims.entries()) {
      if (!claim.verifiedFrom) {
        errors.push(
          `Project "${slug}" claim ${index + 1} is missing verifiedFrom.`,
        )
      }
    }

    if (entry.example && !entry.example.verifiedFrom) {
      errors.push(`Project "${slug}" example is missing verifiedFrom.`)
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
