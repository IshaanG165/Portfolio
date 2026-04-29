'use client'

import { useEffect, useRef } from 'react'

/* ── Seeded PRNG (Mulberry32) ── */
function makePRNG(seed: number) {
  let s = seed
  return () => {
    s |= 0
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* ── Permutation table for Perlin noise ── */
const GRAD2 = [
  [1, 1], [-1, 1], [1, -1], [-1, -1],
  [1, 0], [-1, 0], [0, 1], [0, -1],
]

const PERM = (() => {
  const rand = makePRNG(42)
  const p = Array.from({ length: 256 }, (_, i) => i)
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[p[i], p[j]] = [p[j], p[i]]
  }
  const perm = new Uint8Array(512)
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255]
  return perm
})()

function fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10) }
function mix(a: number, b: number, t: number) { return a + t * (b - a) }
function dot2(g: number[], x: number, y: number) { return g[0] * x + g[1] * y }

function perlin2(x: number, y: number): number {
  const X = Math.floor(x) & 255
  const Y = Math.floor(y) & 255
  x -= Math.floor(x)
  y -= Math.floor(y)
  const u = fade(x)
  const v = fade(y)
  const a = PERM[X] + Y
  const b = PERM[X + 1] + Y
  return mix(
    mix(dot2(GRAD2[PERM[a] & 7], x, y), dot2(GRAD2[PERM[b] & 7], x - 1, y), u),
    mix(dot2(GRAD2[PERM[a + 1] & 7], x, y - 1), dot2(GRAD2[PERM[b + 1] & 7], x - 1, y - 1), u),
    v,
  )
}

/* ── Palette: cyan-dominant with violet accents ── */
const PALETTE: [number, number, number][] = [
  [0, 212, 255],   // cyan ×3 (dominant)
  [0, 212, 255],
  [0, 212, 255],
  [139, 92, 246],  // violet ×2
  [139, 92, 246],
  [0, 229, 255],   // bright cyan ×1
]

interface Particle {
  x: number; y: number
  px: number; py: number
  speed: number
  life: number; maxLife: number
  ci: number      // color index
  lw: number      // line width
}

const BG = '5, 10, 14'   // rgb for background color

export default function FlowFieldCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Capture as non-null to avoid closure narrowing issues
    const cv = canvas
    const c = ctx
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let W = 0, H = 0

    function resize() {
      W = window.innerWidth
      H = window.innerHeight
      cv.width = W * dpr
      cv.height = H * dpr
      cv.style.width = `${W}px`
      cv.style.height = `${H}px`
      c.scale(dpr, dpr)
      c.fillStyle = `rgb(${BG})`
      c.fillRect(0, 0, W, H)
    }

    resize()
    window.addEventListener('resize', resize)

    // Respect prefers-reduced-motion — static background, no animation
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      return () => window.removeEventListener('resize', resize)
    }

    const isMobile = W < 768
    const cores = navigator.hardwareConcurrency || 4
    const lowEnd = cores <= 2
    const COUNT = isMobile ? (lowEnd ? 200 : 380) : (lowEnd ? 400 : 750)

    function spawn(): Particle {
      const x = Math.random() * W
      const y = Math.random() * H
      return {
        x, y, px: x, py: y,
        speed: 0.38 + Math.random() * 0.55,
        life: Math.random() * 300,
        maxLife: 220 + Math.random() * 300,
        ci: Math.floor(Math.random() * PALETTE.length),
        lw: 0.45 + Math.random() * 0.6,
      }
    }

    const pts: Particle[] = Array.from({ length: COUNT }, spawn)

    const SCALE = 0.0017
    let t = 0
    let raf: number
    let paused = false

    c.lineCap = 'round'

    function draw() {
      if (!paused) {
        c.fillStyle = `rgba(${BG}, 0.016)`
        c.fillRect(0, 0, W, H)

        t += 0.001

        for (const p of pts) {
          const nx = p.x * SCALE
          const ny = p.y * SCALE
          const angle =
            perlin2(nx + t * 0.28, ny + t * 0.14) * Math.PI * 4.5 +
            perlin2(nx * 1.9 + 80 + t * 0.09, ny * 1.9 + 80) * Math.PI * 0.9

          p.px = p.x
          p.py = p.y
          p.x += Math.cos(angle) * p.speed
          p.y += Math.sin(angle) * p.speed
          p.life++

          if (p.x < -4 || p.x > W + 4 || p.y < -4 || p.y > H + 4 || p.life > p.maxLife) {
            Object.assign(p, spawn(), { life: 0 })
            continue
          }

          const lr = p.life / p.maxLife
          const alpha = Math.sin(lr * Math.PI) * 0.52

          const [r, g, b] = PALETTE[p.ci]
          c.beginPath()
          c.moveTo(p.px, p.py)
          c.lineTo(p.x, p.y)
          c.strokeStyle = `rgba(${r},${g},${b},${alpha})`
          c.lineWidth = p.lw
          c.stroke()
        }
      }

      raf = requestAnimationFrame(draw)
    }

    const onVisibility = () => { paused = document.hidden }
    document.addEventListener('visibilitychange', onVisibility)

    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <>
      {/* Flow field */}
      <canvas
        ref={ref}
        aria-hidden="true"
        style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      />

      {/* Vignette — draws focus to center, cinematic depth */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background: `radial-gradient(ellipse 110% 110% at 50% 50%, transparent 30%, rgba(${BG}, 0.72) 100%)`,
        }}
      />

      {/* Film grain */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          opacity: 0.032,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </>
  )
}
