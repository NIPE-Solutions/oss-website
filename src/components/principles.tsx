export function Principles() {
  return (
    <section
      className="principles"
      id="principles"
      aria-labelledby="principles-heading"
    >
      <div className="site-frame principles__inner">
        <header className="section-introduction">
          <h2 id="principles-heading">Engineering principles</h2>
          <p>
            These are working constraints reflected in the projects above, not
            claims that every library solves every case.
          </p>
        </header>
        <div className="principles__list">
          <article>
            <h3>Evidence before claims</h3>
            <p>
              Capabilities and limits in this directory follow released
              documentation, package metadata, and current source.
            </p>
          </article>
          <article>
            <h3>Accessibility is behavior</h3>
            <p>
              Interface components document focus, keyboard, motion, and
              background behavior alongside their visual states.
            </p>
          </article>
          <article>
            <h3>Automation leaves a review path</h3>
            <p>
              Migration tooling reports exact edits and preserves unresolved
              cases for human review instead of approximating them silently.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
