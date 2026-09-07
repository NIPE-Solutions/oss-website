# Adding a project

Add one registry entry in `src/content/projects.ts`. The registry supplies the
homepage directory, category counts, detail routes, metadata and sitemap.
Longer content lives in `src/content/project-content.ts`; it is joined to the
registry once. Do not duplicate a project list in a component.

## Verify before editing

Read the current public repository, canonical project site and npm registry.
Record the actual package name, published version, lifecycle, license and
support URLs. A version in package.json alone does not prove publication.
Use commit-pinned or release-tagged source URLs for factual evidence.

Each entry needs unique `slug`, `name`, `category`, `visibility`, `status`,
`repository`, `accent`, `visual` and positive `order` fields. Categories are
`ui-interaction`, `browser-primitives`, `runtime` and `tooling`. Status is one
of `alpha`, `beta`, `stable` or `experimental`. Numbers express editorial order,
not popularity or quality.

Public entries require canonical HTTPS `documentation` on their project
subdomain, a GitHub repository and issues URL, a license, and explicit
`npm.published`. Never use a README URL as public documentation navigation.
A hidden entry has no public route or sitemap entry and does not affect counts.

Keep purpose and boundary prose concise. A purpose source and every claim source
need a descriptive label and an HTTPS URL. `claims` distinguishes `capability`
from `limitation`. Avoid technical claims without corresponding evidence.

## Publication examples

These are publication fragments; they accompany the verified project metadata
and evidence described above.

### Stable npm package

```ts
npm: {
  package: '@nipe-solutions/example',
  published: true,
  version: '1.0.0',
}
```

Set `status: 'stable'` only when the project's release supports that label.
Install commands use the verified exact version, including prerelease suffixes.
This avoids accidentally installing an older npm `latest` tag.

### Public beta

Use `status: 'beta'` with the published beta version in `npm.version`.
Publication and maturity are independent: a public beta can also be unpublished.

### GitHub-only tool

Use `npm: { package: '@nipe-solutions/example', published: false }` when that
package identity is confirmed but unpublished. Omit the version. No npm link
or install command will render. The project still needs canonical documentation.

### Hidden experimental project

Use `visibility: 'hidden'` and `status: 'experimental'` for an intentionally
unlisted experiment. Do not present it as stable or infer public support links.

## Presentation and support

`ProjectMotif` is the central SVG renderer for compact directory accents,
detail headers and project OpenGraph images. Add a restrained operational
motif and theme-aware accent token. Keep the text first on mobile. There is
no hero constellation or client-side project menu.

Configure support URLs explicitly. Add security and changelog URLs only when
the policy and changelog exist. Optional `resources` contain useful canonical
project pages. Optional `funding.githubSponsors` and `funding.openCollective`
render maintenance links only when populated with real active destinations.

## Validation

Run `npm run validate:projects`, `npm run check`, and `npm run test:e2e`.
Inspect desktop, tablet, mobile, light/dark themes and keyboard focus.
`npm run check:links:live` is an optional network check; npm website bot blocking
must be distinguished from npm registry publication checks.

Keep local instructions, planning files, audit scratch files and browser
artifacts outside version control.

## Featured project

Set `featured: true` only for the current featured project, and `false` on the
other entries. Supply `website`, `playground` and a `feature` object with a
concise `headline` and 3–5 `signals`. Keep it first in its category using `order`.
The directory renders its wide presentation instead of an ordinary row; header
and footer featured links use the same registry flag. The inspector preview is
static HTML/CSS, not an installed library or an interactive tree.

React Data Inspector was verified on 2026-09-07 against repository commit
`f9f3e09504467b1ac44dd21d370895d5541b36d7`, the live website, and the npm registry:
Beta, published `0.1.0-beta.0`, canonical `/docs` and `/playground`. Issues are
enabled; Discussions and a project security policy are absent. Projects without
a configured security policy remain listed on the security page with an explicit
note and a repository link, never a fabricated reporting URL.
