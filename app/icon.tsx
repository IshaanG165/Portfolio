import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#050A0E',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '7px',
          border: '1.5px solid rgba(0, 212, 255, 0.45)',
        }}
      >
        <span
          style={{
            color: '#00D4FF',
            fontSize: '14px',
            fontWeight: 800,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '-0.5px',
            lineHeight: 1,
          }}
        >
          IG
        </span>
      </div>
    ),
    { ...size },
  )
}
