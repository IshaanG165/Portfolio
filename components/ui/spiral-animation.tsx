'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface SpiralAnimationProps {
  onReady?: () => void
}

export function SpiralAnimation({ onReady }: SpiralAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cv = canvas
    const c = ctx

    let animFrameId: number
    let phase = 0
    let alive = true

    function resize() {
      cv.width = window.innerWidth
      cv.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const ARMS = 3
    const DOTS_PER_ARM = 180
    const MAX_RADIUS = Math.min(window.innerWidth, window.innerHeight) * 0.38
    const ROTATION_SPEED = 0.012
    const SPIRAL_TIGHTNESS = 3.8

    function draw() {
      if (!alive) return
      animFrameId = requestAnimationFrame(draw)

      const w = cv.width
      const h = cv.height
      const cx = w / 2
      const cy = h / 2

      // Motion blur trail
      c.fillStyle = 'rgba(5, 10, 14, 0.18)'
      c.fillRect(0, 0, w, h)

      phase += ROTATION_SPEED

      for (let arm = 0; arm < ARMS; arm++) {
        const armOffset = (arm / ARMS) * Math.PI * 2

        for (let i = 0; i < DOTS_PER_ARM; i++) {
          const t = i / DOTS_PER_ARM
          const angle = t * Math.PI * 2 * SPIRAL_TIGHTNESS + phase + armOffset
          const radius = t * MAX_RADIUS

          const x = cx + Math.cos(angle) * radius
          const y = cy + Math.sin(angle) * radius

          // Brightness peaks near the center and at the arm tip
          const brightness = Math.pow(1 - t, 0.4) * 0.9 + 0.08
          const size = (1 - t) * 2.2 + 0.4

          // Cyan-to-white gradient along spiral
          const blue = Math.round(212 + (255 - 212) * t)
          const green = Math.round(212 * (1 - t * 0.3))
          c.beginPath()
          c.arc(x, y, size, 0, Math.PI * 2)
          c.fillStyle = `rgba(0, ${green}, ${blue}, ${brightness})`
          c.fill()
        }
      }

      // Center glow
      const grd = c.createRadialGradient(cx, cy, 0, cx, cy, MAX_RADIUS * 0.25)
      grd.addColorStop(0, 'rgba(0, 212, 255, 0.18)')
      grd.addColorStop(0.5, 'rgba(0, 212, 255, 0.04)')
      grd.addColorStop(1, 'rgba(0, 0, 0, 0)')
      c.beginPath()
      c.arc(cx, cy, MAX_RADIUS * 0.25, 0, Math.PI * 2)
      c.fillStyle = grd
      c.fill()
    }

    // Clear to bg first
    c.fillStyle = '#050A0E'
    c.fillRect(0, cv.height / 2 - 1, cv.width, cv.height)

    draw()

    // Signal parent after ~2.2s so the Enter button can appear
    const readyTimer = setTimeout(() => {
      if (alive) onReady?.()
    }, 2200)

    return () => {
      alive = false
      cancelAnimationFrame(animFrameId)
      window.removeEventListener('resize', resize)
      clearTimeout(readyTimer)
    }
  }, [onReady])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  )
}
