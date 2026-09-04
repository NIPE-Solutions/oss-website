interface InstallCommandProps {
  readonly packageName: string
}

export function InstallCommand({ packageName }: InstallCommandProps) {
  return (
    <section className="install-command" aria-labelledby="install-heading">
      <h2 id="install-heading">Install</h2>
      <pre tabIndex={0}>
        <code>{`npm install ${packageName}`}</code>
      </pre>
    </section>
  )
}
