'use client'

import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      const pct = total > 0 ? (scrolled / total) * 100 : 0
      if (barRef.current) barRef.current.style.transform = `scaleX(${pct / 100})`
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '2px',
        background: 'linear-gradient(90deg, #00D4FF, #7DF9FF)',
        boxShadow: '0 0 10px rgba(0, 212, 255, 0.7)',
        transformOrigin: 'left center',
        transform: 'scaleX(0)',
        zIndex: 99997,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    />
  )
}
