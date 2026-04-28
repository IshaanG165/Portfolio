'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_ITEMS = [
  {
    id: 'hero',
    label: 'Home',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'about',
    label: 'About',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
]

const BASE = 32
const HOVER_SELF = 46
const HOVER_NEIGHBOR = 38

function getSize(index: number, hovered: number | null): number {
  if (hovered === null) return BASE
  const d = Math.abs(index - hovered)
  if (d === 0) return HOVER_SELF
  if (d === 1) return HOVER_NEIGHBOR
  return BASE
}

export default function NavDock() {
  const [hovered, setHovered] = useState<number | null>(null)
  const [tooltip, setTooltip] = useState<number | null>(null)
  const [activeId, setActiveId] = useState('hero')

  useEffect(() => {
    const ids = NAV_ITEMS.map(i => i.id)

    const onScroll = () => {
      const threshold = window.scrollY + window.innerHeight * 0.38
      let found = 'hero'
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= threshold) found = id
      }
      setActiveId(found)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    if (id === 'hero') {
      window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.2 }) : window.scrollTo({ top: 0 })
    } else {
      const el = document.getElementById(id)
      if (!el) return
      window.__lenis ? window.__lenis.scrollTo(el, { offset: -80, duration: 1.2 }) : el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ opacity: 0, x: 48 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      aria-label="Page navigation"
      className="fixed top-5 right-5 z-50 hidden md:flex items-center gap-0.5 px-2 py-2 rounded-2xl"
      style={{
        background: 'rgba(5, 10, 14, 0.78)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(0, 200, 255, 0.13)',
        overflow: 'visible',
      }}
    >
      {NAV_ITEMS.map((item, i) => {
        const size = getSize(i, hovered)
        const isActive = activeId === item.id
        const isLit = isActive || hovered === i

        return (
          <div
            key={item.id}
            style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <motion.button
              onClick={() => scrollTo(item.id)}
              onMouseEnter={() => { setHovered(i); setTooltip(i) }}
              onMouseLeave={() => { setHovered(null); setTooltip(null) }}
              animate={{ width: size, height: size }}
              transition={{ type: 'spring', stiffness: 380, damping: 22, mass: 0.75 }}
              aria-label={item.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                flexShrink: 0,
                background: isLit ? 'rgba(0, 200, 255, 0.1)' : 'transparent',
                color: isLit ? '#00c8ff' : 'rgba(237, 237, 237, 0.28)',
                transition: 'background 0.2s ease, color 0.2s ease',
                willChange: 'width, height',
                padding: 0,
              }}
            >
              <div style={{ width: '52%', height: '52%', pointerEvents: 'none', flexShrink: 0 }}>
                {item.icon}
              </div>
            </motion.button>

            {/* Active dot */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.4 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'absolute',
                    bottom: -7,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 3,
                    height: 3,
                    borderRadius: '50%',
                    background: '#00c8ff',
                    boxShadow: '0 0 7px 1px rgba(0, 200, 255, 0.85)',
                    pointerEvents: 'none',
                  }}
                />
              )}
            </AnimatePresence>

            {/* Tooltip */}
            <AnimatePresence>
              {tooltip === i && (
                <motion.span
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 10px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '3px 10px',
                    borderRadius: 999,
                    fontSize: 10,
                    fontFamily: 'var(--font-dm-sans)',
                    letterSpacing: '0.05em',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    background: 'rgba(5, 10, 14, 0.95)',
                    border: '1px solid rgba(0, 200, 255, 0.22)',
                    color: '#00c8ff',
                    zIndex: 60,
                  }}
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </motion.nav>
  )
}
