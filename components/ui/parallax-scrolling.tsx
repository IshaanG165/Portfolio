'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function ParallaxComponent() {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const container = parallaxRef.current
    if (!container) return

    const layersEl = container.querySelector('[data-parallax-layers]')
    if (!layersEl) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        // ends exactly when the sticky element would unstick (half of 200vh)
        end: 'center top',
        scrub: 0.8,
      },
    })

    const layers = [
      { layer: '1', yPercent: 55 },
      { layer: '2', yPercent: 38 },
      { layer: '3', yPercent: 18 },
      { layer: '4', yPercent: 5 },
    ]

    layers.forEach((layerObj, idx) => {
      tl.to(
        layersEl.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
        { yPercent: layerObj.yPercent, ease: 'none' },
        idx === 0 ? undefined : '<'
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
      tl.kill()
    }
  }, [])

  return (
    /* 200vh gives scroll space; sticky child stays pinned for 100vh of that */
    <div ref={parallaxRef} style={{ height: '200vh', position: 'relative' }}>
      <div
        style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}
      >
        {/* Top fade — blends with the About section above */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '18%',
            background: 'linear-gradient(to bottom, #050A0E, transparent)',
            zIndex: 20,
            pointerEvents: 'none',
          }}
        />

        {/* Bottom fade — blends into the Projects section below */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '22%',
            background: 'linear-gradient(to top, #050A0E, transparent)',
            zIndex: 20,
            pointerEvents: 'none',
          }}
        />

        <div
          data-parallax-layers
          style={{ position: 'absolute', inset: 0 }}
        >
          {/* ── Layer 1: Background radial glow (moves slowest) ── */}
          <div
            data-parallax-layer="1"
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse 80% 60% at 50% 55%, rgba(0,212,255,0.11) 0%, rgba(0,212,255,0.03) 50%, transparent 75%)',
            }}
          />

          {/* ── Layer 2: Huge faded section number ── */}
          <div
            data-parallax-layer="2"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(12rem, 32vw, 26rem)',
                fontWeight: 700,
                lineHeight: 1,
                color: 'transparent',
                WebkitTextStroke: '1px rgba(0, 212, 255, 0.07)',
              }}
            >
              02
            </span>
          </div>

          {/* ── Layer 3: Central headline (core message) ── */}
          <div
            data-parallax-layer="3"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.25rem',
              zIndex: 10,
              padding: '0 1.5rem',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.65rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'rgba(0,212,255,0.65)',
                fontWeight: 500,
              }}
            >
              02 — Projects
            </p>

            <h2
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(3rem, 9vw, 7.5rem)',
                fontWeight: 700,
                lineHeight: 0.93,
                background: 'linear-gradient(135deg, #F0F0F0 0%, rgba(240,240,240,0.55) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              The Work
            </h2>

            {/* Subtle divider line */}
            <div
              style={{
                width: '40px',
                height: '1px',
                background: 'rgba(0,212,255,0.35)',
                marginTop: '0.25rem',
              }}
            />
          </div>

          {/* ── Layer 4: Foreground accent — vertical scroll line (moves fastest) ── */}
          <div
            data-parallax-layer="4"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingBottom: '8vh',
              zIndex: 15,
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                width: '1px',
                height: '72px',
                background:
                  'linear-gradient(to bottom, rgba(0,212,255,0.7), transparent)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
