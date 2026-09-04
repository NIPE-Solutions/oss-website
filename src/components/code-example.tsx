import { ExternalLink } from '@/components/external-link'

interface CodeExampleProps {
  readonly language: string
  readonly code: string
  readonly source: string
}

export function CodeExample({ language, code, source }: CodeExampleProps) {
  return (
    <section className="code-example" aria-labelledby="example-heading">
      <div className="project-detail__section-heading">
        <h2 id="example-heading">Example</h2>
        <ExternalLink href={source}>Example source</ExternalLink>
      </div>
      <pre data-language={language}>
        <code>{code}</code>
      </pre>
    </section>
  )
}
