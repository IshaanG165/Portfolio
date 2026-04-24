'use client'

import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -9999, y: -9999 })
  const target = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const el = glowRef.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.07)
      pos.current.y = lerp(pos.current.y, target.current.y, 0.07)
      el.style.transform = `translate(${pos.current.x - 350}px, ${pos.current.y - 350}px)`
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 z-0 w-[700px] h-[700px]"
      style={{
        background:
          'radial-gradient(circle, rgba(0,212,255,0.05) 0%, rgba(0,212,255,0.01) 40%, transparent 70%)',
      }}
      aria-hidden="true"
    />
  )
}
