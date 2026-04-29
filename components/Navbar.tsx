'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = ['About', 'Projects', 'Experience', 'Skills', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock/unlock Lenis (and body overflow as fallback) when mobile menu toggles
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      window.__lenis?.stop()
    } else {
      document.body.style.overflow = ''
      window.__lenis?.start()
    }
    return () => {
      document.body.style.overflow = ''
      window.__lenis?.start()
    }
  }, [menuOpen])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    const delay = menuOpen ? 320 : 0
    setTimeout(() => {
      const el = document.getElementById(id.toLowerCase())
      if (!el) return
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -80, duration: 1.2 })
      } else {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }, delay)
  }

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 })
    } else {
      window.scrollTo({ top: 0 })
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#050A0E]/80 backdrop-blur-xl border-b border-white/[0.06]'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={scrollToTop}
            className="font-syne text-xl font-bold tracking-tight"
            aria-label="Scroll to top"
          >
            <span className="text-gradient">IG</span>
          </button>

          {/* Desktop nav replaced by NavDock top-right */}
          <button
            className="md:hidden relative w-11 h-11 flex flex-col items-center justify-center gap-1.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF]/50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span className={`block w-5 h-0.5 bg-[#EDEDED] transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-[#EDEDED] transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-[#EDEDED] transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 bg-[#050A0E]/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center"
          >
            <ul className="flex flex-col items-center gap-10">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                >
                  <button
                    onClick={() => scrollTo(link)}
                    className="font-syne text-3xl font-semibold text-[#EDEDED]/80 hover:text-[#00D4FF] transition-colors duration-200 min-h-[44px] px-4"
                  >
                    {link}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
