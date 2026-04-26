'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { SpiralAnimation } from '@/components/ui/spiral-animation'

interface LoadingScreenProps {
  onEnter: () => void
}

export default function LoadingScreen({ onEnter }: LoadingScreenProps) {
  const [showEnter, setShowEnter] = useState(false)
  const [exiting, setExiting] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  const handleReady = useCallback(() => {
    setShowEnter(true)
  }, [])

  const handleEnter = useCallback(() => {
    if (exiting) return
    setExiting(true)

    // Fade the whole overlay out, then unmount
    const el = overlayRef.current
    if (el) {
      el.style.transition = 'opacity 0.75s cubic-bezier(0.4, 0, 0.2, 1)'
      el.style.opacity = '0'
    }
    setTimeout(onEnter, 800)
  }, [exiting, onEnter])

  // Skip on reduced-motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) onEnter()
  }, [onEnter])

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#050A0E',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <SpiralAnimation onReady={handleReady} />

      {/* Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 40%, #050A0E 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Monogram */}
      <div
        style={{
          position: 'absolute',
          top: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          fontFamily: 'var(--font-space-grotesk)',
          fontSize: '1.1rem',
          fontWeight: 700,
          letterSpacing: '0.05em',
          background: 'linear-gradient(135deg, #00D4FF 0%, #7DF9FF 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          opacity: 0.8,
        }}
      >
        IG
      </div>

      {/* Enter button area */}
      <div
        style={{
          position: 'absolute',
          bottom: '10vh',
          left: '50%',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
          opacity: showEnter ? 1 : 0,
          transform: showEnter
            ? 'translateX(-50%) translateY(0)'
            : 'translateX(-50%) translateY(12px)',
          pointerEvents: showEnter ? 'auto' : 'none',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '0.65rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(0,212,255,0.55)',
            fontWeight: 500,
          }}
        >
          Ishaan Gulati · Portfolio
        </p>

        <button
          onClick={handleEnter}
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: '0.88rem',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#050A0E',
            background: 'linear-gradient(135deg, #00D4FF 0%, #7DF9FF 100%)',
            border: 'none',
            borderRadius: '3px',
            padding: '0.75rem 2.5rem',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            boxShadow: '0 0 24px rgba(0,212,255,0.25)',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.transform = 'scale(1.04)'
            el.style.boxShadow = '0 0 40px rgba(0,212,255,0.45)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.transform = 'scale(1)'
            el.style.boxShadow = '0 0 24px rgba(0,212,255,0.25)'
          }}
        >
          Enter
        </button>

        {/* Scroll hint line */}
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, rgba(0,212,255,0.5), transparent)',
            marginTop: '0.5rem',
          }}
        />
      </div>
    </div>
  )
}
