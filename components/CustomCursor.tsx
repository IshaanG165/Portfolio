'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: -200, y: -200 })
  const posRef = useRef({ x: -200, y: -200 })

  useEffect(() => {
    // Only on pointer devices — bail on touch-only screens
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    let raf: number

    const animate = () => {
      // Ring lags behind with spring lerp
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.14
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.14

      const { x: mx, y: my } = mouseRef.current
      const { x: rx, y: ry } = posRef.current

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx - 4}px, ${my - 4}px)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx - 22}px, ${ry - 22}px)`
      }

      raf = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Dot — instant, inverts whatever's underneath */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          zIndex: 99999,
          pointerEvents: 'none',
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
      {/* Ring — lags with spring, also inverts */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.7)',
          zIndex: 99998,
          pointerEvents: 'none',
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
    </>
  )
}
