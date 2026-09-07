import { loadRegistry } from './load-registry.mjs'
import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import ts from 'typescript'

function literalAttributeValue(attribute) {
  const initializer = attribute.initializer

  if (ts.isStringLiteral(initializer)) {
    return initializer.text
  }

  if (
    ts.isJsxExpression(initializer) &&
    initializer.expression &&
    (ts.isStringLiteral(initializer.expression) ||
      ts.isNoSubstitutionTemplateLiteral(initializer.expression))
  ) {
    return initializer.expression.text
  }
}

export function extractLiteralLinks(sourceText, sourceName) {
  const sourceFile = ts.createSourceFile(
    sourceName,
    sourceText,
    ts.ScriptTarget.ESNext,
    true,
    ts.ScriptKind.TSX,
  )
  const links = []

  function visit(node) {
    if (
      ts.isJsxAttribute(node) &&
      node.name.getText(sourceFile) === 'href' &&
      node.initializer
    ) {
      const href = literalAttributeValue(node)

      if (href !== undefined) {
        links.push({ source: sourceName, href })
      }
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return links
}

export function extractConfiguredUrlLiterals(sourceText, sourceName) {
  const sourceFile = ts.createSourceFile(
    sourceName,
    sourceText,
    ts.ScriptTarget.ESNext,
    true,
    ts.ScriptKind.TS,
  )
  const links = []

  function visit(node) {
    if (
      (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) &&
      /^(?:https?:|mailto:|tel:)/.test(node.text)
    ) {
      links.push({ source: sourceName, href: node.text })
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return links
}

export function collectProjectLinks(projects) {
  const links = []

  for (const project of projects) {
    if (project.visibility !== 'public') {
      continue
    }

    const source = `project:${project.slug}`
    links.push({ source, href: `/projects/${project.slug}` })
    links.push({ source, href: project.repository })

    if (project.documentation) {
      links.push({ source, href: project.documentation })
    }

    if (project.npm?.published) {
      links.push({
        source,
        href: `https://www.npmjs.com/package/${project.npm.package}`,
      })
    }

    for (const href of Object.values(project.support ?? {})) {
      if (href) {
        links.push({ source, href })
      }
    }

    for (const href of [
      project.website,
      project.playground,
      project.changelog,
      ...(project.resources ?? []).map((link) => link.href),
      ...Object.values(project.funding ?? {}),
    ]) {
      if (href) links.push({ source, href })
    }
    if (project.purpose?.source?.href) {
      links.push({ source, href: project.purpose.source.href })
    }

    for (const claim of project.claims ?? []) {
      if (claim.source?.href) {
        links.push({ source, href: claim.source.href })
      }
    }

    if (project.example?.source?.href) {
      links.push({ source, href: project.example.source.href })
    }
  }

  return links
}

function routeForLink(href) {
  if (href.startsWith('#')) {
    return '/'
  }

  return href.split(/[?#]/, 1)[0] || '/'
}

export function validateStaticLinks(links, knownRoutes) {
  const errors = []

  for (const { source, href } of links) {
    if (href.startsWith('/') || href.startsWith('#')) {
      const route = routeForLink(href)

      if (!knownRoutes.has(route)) {
        errors.push(`${source}: internal route does not exist: ${route}`)
      }
      continue
    }

    let url

    try {
      url = new URL(href)
    } catch {
      errors.push(`${source}: invalid link destination: ${href}`)
      continue
    }

    if (url.protocol === 'http:') {
      errors.push(`${source}: external URL must use HTTPS: ${href}`)
    } else if (!['https:', 'mailto:', 'tel:'].includes(url.protocol)) {
      errors.push(`${source}: unsupported link protocol: ${href}`)
    }
  }

  return errors
}

export async function checkLiveLinks(
  links,
  { fetchImpl = fetch, timeout = 10_000 } = {},
) {
  const externalLinks = links.filter(({ href }) => href.startsWith('https://'))

  return (
    await Promise.all(
      externalLinks.map(async ({ source, href }) => {
        try {
          let response = await fetchImpl(href, {
            method: 'HEAD',
            redirect: 'follow',
            signal: AbortSignal.timeout(timeout),
          })

          if ([403, 405].includes(response.status)) {
            response = await fetchImpl(href, {
              method: 'GET',
              headers: { Range: 'bytes=0-0' },
              redirect: 'follow',
              signal: AbortSignal.timeout(timeout),
            })
          }

          if (!response.ok) {
            return `${source}: live URL returned HTTP ${response.status}: ${href}`
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error)
          const cause =
            error instanceof Error && error.cause
              ? error.cause instanceof Error
                ? error.cause.message
                : String(error.cause)
              : undefined
          const details = cause ? `${message}: ${cause}` : message
          return `${source}: live URL request failed (${details}): ${href}`
        }
      }),
    )
  ).filter(Boolean)
}

function walkFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      return walkFiles(absolutePath)
    }

    return [absolutePath]
  })
}

function collectSourceLinks(sourceRoot) {
  return walkFiles(sourceRoot)
    .filter(
      (file) =>
        /\.(?:ts|tsx)$/.test(file) &&
        !/\.test\.(?:ts|tsx)$/.test(file) &&
        file !== path.join(sourceRoot, 'content', 'projects.ts'),
    )
    .flatMap((file) =>
      extractLiteralLinks(
        readFileSync(file, 'utf8'),
        path.relative(process.cwd(), file),
      ),
    )
}

function discoverRoutes(appRoot, projects) {
  const routes = new Set()

  for (const file of walkFiles(appRoot).filter((file) =>
    file.endsWith(`${path.sep}page.tsx`),
  )) {
    const relativeDirectory = path.relative(appRoot, path.dirname(file))
    const segments = relativeDirectory
      .split(path.sep)
      .filter((segment) => segment && !/^\(.+\)$/.test(segment))

    if (segments.includes('[slug]')) {
      for (const project of projects) {
        if (project.visibility === 'public') {
          routes.add(
            `/${segments
              .map((segment) => (segment === '[slug]' ? project.slug : segment))
              .join('/')}`,
          )
        }
      }
    } else {
      routes.add(`/${segments.join('/')}`)
    }
  }

  return routes
}

function deduplicateLinks(links) {
  const seen = new Set()

  return links.filter(({ href }) => {
    if (seen.has(href)) {
      return false
    }

    seen.add(href)
    return true
  })
}

async function run() {
  const projectRoot = fileURLToPath(new URL('..', import.meta.url))
  const sourceRoot = path.join(projectRoot, 'src')
  const appRoot = path.join(sourceRoot, 'app')
  const projects = loadRegistry()
  const links = deduplicateLinks([
    ...collectSourceLinks(sourceRoot),
    ...extractConfiguredUrlLiterals(
      readFileSync(path.join(sourceRoot, 'lib', 'site.ts'), 'utf8'),
      'src/lib/site.ts',
    ),
    ...collectProjectLinks(projects),
  ])
  const errors = validateStaticLinks(links, discoverRoutes(appRoot, projects))

  if (errors.length > 0) {
    console.error(errors.join('\n'))
    process.exitCode = 1
    return
  }

  if (process.argv.includes('--live')) {
    const liveErrors = await checkLiveLinks(links)

    if (liveErrors.length > 0) {
      console.error(liveErrors.join('\n'))
      process.exitCode = 1
      return
    }

    console.log(`Checked ${links.length} live link destinations.`)
    return
  }

  console.log(`Checked ${links.length} deterministic link destinations.`)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await run()
}
