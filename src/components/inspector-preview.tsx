// A static illustration, not a second implementation of the inspector.
const rows = [
  { depth: 0, marker: '⌄', key: '$', value: 'Object' },
  { depth: 1, marker: '⌄', key: 'user', value: 'Object' },
  { depth: 2, key: 'id', value: '42' },
  { depth: 2, key: 'name', value: '"Nicholas"' },
  { depth: 2, key: 'createdAt', value: 'Date(2026-09-07)' },
  { depth: 1, marker: '›', key: 'roles', value: 'Set(2)' },
  { depth: 1, marker: '›', key: 'cache', value: 'Map(1)' },
  { depth: 1, key: 'revision', value: '9007199254740993n' },
  { depth: 1, key: 'optional', value: 'undefined' },
  { depth: 1, key: 'copyOfUser', value: '↗ shared → $.user', reference: true },
  { depth: 1, key: 'self', value: '↩ circular → $', reference: true },
] as const

export function InspectorPreview() {
  return (
    <div
      className="inspector-preview"
      role="img"
      aria-label="JavaScript object graph with Date, Set, Map, BigInt and undefined values, a shared reference to user, and a circular reference to the root."
    >
      <div aria-hidden="true">
        <div className="inspector-preview__header">
          <span>Object graph</span>
          <span>Read-only preview</span>
        </div>
        <div className="inspector-preview__rows">
          {rows.map((row) => (
            <div
              className={`inspector-preview__row inspector-preview__row--${row.depth}`}
              key={row.key}
            >
              <span className="inspector-preview__marker">
                {'marker' in row ? row.marker : ''}
              </span>
              <span>
                <span className="inspector-preview__key">{row.key}: </span>
                <span
                  className={
                    'reference' in row
                      ? 'inspector-preview__reference'
                      : undefined
                  }
                >
                  {row.value}
                </span>
              </span>
            </div>
          ))}
        </div>
        <p className="inspector-preview__caption">
          Values and identity, beyond JSON.
        </p>
      </div>
    </div>
  )
}
