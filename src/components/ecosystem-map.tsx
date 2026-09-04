export function EcosystemMap() {
  return (
    <figure
      className="ecosystem-map"
      role="img"
      aria-label="NIPE Open Source connects interface, runtime, and migration projects."
    >
      <svg viewBox="0 0 560 330" aria-hidden="true" focusable="false">
        <path className="ecosystem-map__line" d="M280 165 112 74" />
        <path className="ecosystem-map__line" d="M280 165 448 74" />
        <path className="ecosystem-map__line" d="M280 165 280 276" />

        <g className="ecosystem-map__node ecosystem-map__node--interface">
          <rect x="39" y="36" width="146" height="76" />
          <text x="112" y="81" textAnchor="middle">
            Interface
          </text>
        </g>
        <g className="ecosystem-map__node ecosystem-map__node--runtime">
          <rect x="375" y="36" width="146" height="76" />
          <text x="448" y="81" textAnchor="middle">
            Runtime
          </text>
        </g>
        <g className="ecosystem-map__node ecosystem-map__node--migration">
          <rect x="207" y="238" width="146" height="76" />
          <text x="280" y="283" textAnchor="middle">
            Migration
          </text>
        </g>

        <g className="ecosystem-map__hub">
          <rect x="208" y="127" width="144" height="76" />
          <text x="280" y="158" textAnchor="middle">
            NIPE
          </text>
          <text x="280" y="180" textAnchor="middle">
            Open Source
          </text>
        </g>
      </svg>
    </figure>
  )
}
