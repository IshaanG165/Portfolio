'use client'

export default function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <div className="aurora-orb aurora-orb--1" />
      <div className="aurora-orb aurora-orb--2" />
      <div className="aurora-orb aurora-orb--3" />
      <div className="aurora-orb aurora-orb--4" />

      {/* Dot grid — fades at viewport edges */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 90% at 50% 50%, black 5%, transparent 100%)',
          maskImage:
            'radial-gradient(ellipse 80% 90% at 50% 50%, black 5%, transparent 100%)',
        }}
      />

      {/* Film grain */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.033,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
