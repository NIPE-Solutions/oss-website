export function Principles() {
  return (
    <section
      className="principles site-frame"
      id="principles"
      aria-labelledby="principles-heading"
    >
      <div className="independence">
        <h2 id="principles-heading">
          Independent by default.
          <br />
          Designed to compose.
        </h2>
        <div>
          <p>
            No shared runtime. No required NIPE stack. Each project owns its
            API, documentation and release cycle.
          </p>
          <p>
            Caret Geometry can provide a virtual caret reference to a compatible
            positioner. The positioner owns placement. Composition starts with
            matching boundaries, not installing the whole catalogue.
          </p>
        </div>
      </div>
      <div className="build-principles">
        <h2>How we build</h2>
        <div className="principles__list">
          <article>
            <h3>Focused scope</h3>
            <p>
              Each project solves one problem and stops before it becomes a
              framework. Application state stays with the application.
            </p>
          </article>
          <article>
            <h3>Browser evidence</h3>
            <p>
              Interaction and geometry projects document browser behavior,
              automated tests and the limits of physical-device verification.
            </p>
          </article>
          <article>
            <h3>Reviewable software</h3>
            <p>
              Strict TypeScript APIs, explicit ownership and inspectable output.
              The codemod leaves uncertain cases unchanged and reports why.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
