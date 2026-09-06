import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'

// Evaluate only the two local, build-time content modules. No network or package loading.
function loadContent(name) {
  if (!['projects', 'project-content'].includes(name))
    throw new Error(`Unexpected content module: ${name}`)
  const source = readFileSync(
    new URL(`../src/content/${name}.ts`, import.meta.url),
    'utf8',
  )
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText
  const exports = {}
  vm.runInNewContext(compiled, {
    exports,
    require: (name) => loadContent(name.replace('./', '')),
  })
  return exports
}
export function loadRegistry() {
  return loadContent('projects').projects
}
