'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const initParticles = () => {
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 14000), 110)
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.4 + 0.4,
        opacity: Math.random() * 0.55 + 0.15,
      }))
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const MAX_DIST = 160
    const MAX_SPEED = 0.7
    const MOUSE_RADIUS = 90

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (reducedMotion || isTouch) {
      return () => {
        window.removeEventListener('resize', resize)
        window.removeEventListener('mousemove', onMouseMove)
      }
    }

    let paused = false
    const onVisibility = () => { paused = document.hidden }
    document.addEventListener('visibilitychange', onVisibility)

    const draw = () => {
      if (paused) {
        rafRef.current = requestAnimationFrame(draw)
        return
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const particles = particlesRef.current
      const { x: mx, y: my } = mouseRef.current

      for (const p of particles) {
        const dx = p.x - mx
        const dy = p.y - my
        const distSq = dx * dx + dy * dy
        if (distSq < MOUSE_RADIUS * MOUSE_RADIUS) {
          const dist = Math.sqrt(distSq)
          const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * 0.06
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED
          p.vy = (p.vy / speed) * MAX_SPEED
        }

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) { p.x = 0; p.vx *= -1 }
        if (p.x > canvas.width) { p.x = canvas.width; p.vx *= -1 }
        if (p.y < 0) { p.y = 0; p.vy *= -1 }
        if (p.y > canvas.height) { p.y = canvas.height; p.vy *= -1 }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,212,255,${p.opacity})`
        ctx.fill()
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.12
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0,212,255,${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('visibilitychange', onVisibility)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
