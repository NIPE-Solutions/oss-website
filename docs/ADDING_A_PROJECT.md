# Adding a project

The directory is registry-first: one registry entry in
[`src/content/projects.ts`](../src/content/projects.ts) supplies project cards,
detail routes, metadata, sitemap entries, and validation. Do not create a
separate page, data file, or runtime data fetch for a project.

## Workflow

1. Confirm that the repository has a reviewable public implementation and that
   its status, package identity, license, documentation, examples, purpose,
   capabilities, and limitations can be supported by current primary sources.
2. Record the source URLs, observation date, exact release/default-branch
   state, and publication decision in
   [`docs/audits/project-sources.md`](audits/project-sources.md).
3. Add one registry entry to `src/content/projects.ts`. Give the distinct
   `purpose` its own `verifiedFrom` reference, and mark every claim explicitly
   as `capability` or `limitation` with its own `verifiedFrom`. Claim order does
   not determine its type. Omit an npm package unless it is published under the
   NIPE scope.
4. Update `src/content/projects.test.ts` when the expected public directory,
   status, or ordering changes. Keep archived projects represented accurately
   rather than deleting historic pages without an owner decision.
5. Run the focused tests, `npm run validate:projects`, and `npm run check`.
   Run `npm run test:e2e` for visitor-facing changes.
6. Request maintainer review of the evidence and wording before merge.

Individual project repositories and documentation sites remain the technical
sources of truth. The directory summarizes verified facts and links outward;
it does not replace project documentation.
