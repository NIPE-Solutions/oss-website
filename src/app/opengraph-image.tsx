import { ImageResponse } from 'next/og'

export const alt =
  'NIPE Open Source — production-grade primitives and tools for the web'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        background: '#f2efe8',
        color: '#171716',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: '-0.02em',
        }}
      >
        <span
          style={{
            display: 'flex',
            width: 20,
            height: 20,
            background: '#b52d2d',
          }}
        />
        NIPE Open Source
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 64 }}>
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            gap: 24,
          }}
        >
          <div
            style={{
              display: 'flex',
              maxWidth: 760,
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: '-0.045em',
            }}
          >
            Production-grade primitives and tools for the web.
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 24,
              color: '#5d5a53',
            }}
          >
            Maintained by NIPE Solutions
          </div>
        </div>

        <div
          aria-hidden="true"
          style={{
            width: 235,
            height: 235,
            display: 'flex',
            position: 'relative',
            border: '2px solid #171716',
          }}
        >
          <span
            style={{
              display: 'flex',
              position: 'absolute',
              width: 82,
              height: 82,
              left: 30,
              top: 30,
              border: '2px solid #171716',
              background: '#f2efe8',
            }}
          />
          <span
            style={{
              display: 'flex',
              position: 'absolute',
              width: 82,
              height: 82,
              right: 30,
              bottom: 30,
              background: '#b52d2d',
            }}
          />
        </div>
      </div>
    </div>,
    size,
  )
}
