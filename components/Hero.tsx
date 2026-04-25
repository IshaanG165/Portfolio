'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import ParticleCanvas from './ParticleCanvas'
import { useTypewriter } from '@/hooks/useTypewriter'

const TYPEWRITER_STRINGS = [
  'Dalyell Scholar',
  'Hackathon Winner',
  'Math Enthusiast',
  'Builder',
]

const ACHIEVEMENT_CHIPS = [
  { icon: '🏆', text: 'Hackathon Winner', sub: 'Canva × USYD' },
  { icon: '📊', text: 'Top 2.6% INFO1113', sub: '21st / 822' },
  { icon: '🎓', text: 'Dalyell Scholar', sub: 'USYD' },
  { icon: '⭐', text: 'UG Honour Roll', sub: 'CS Award 2025' },
  { icon: '📈', text: 'Top 4.6% INFO1110', sub: '55th / 1200+' },
]

export default function Hero() {
  const displayText = useTypewriter(TYPEWRITER_STRINGS)
  const primaryRef = useRef<HTMLButtonElement>(null)
  const secondaryRef = useRef<HTMLButtonElement>(null)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const applyMagnetic = (
    e: React.MouseEvent<HTMLButtonElement>,
    ref: React.RefObject<HTMLButtonElement>
  ) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width - 0.5) * 20
    const y = ((e.clientY - r.top) / r.height - 0.5) * 12
    el.style.transition = 'transform 0.1s ease'
    el.style.transform = `translate(${x}px, ${y}px)`
  }

  const resetMagnetic = (ref: React.RefObject<HTMLButtonElement>) => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    el.style.transform = 'translate(0px, 0px)'
  }

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
    >
      <ParticleCanvas />

      {/* Layered gradients for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050A0E]/10 via-transparent to-[#050A0E] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050A0E]/40 via-transparent to-[#050A0E]/40 pointer-events-none" />

      {/* Ambient glow under name */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,212,255,0.1) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full">
        {/* Status row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
          className="flex items-center justify-center gap-4 mb-7"
        >
          <span className="inline-flex items-center gap-2 font-dm-sans text-xs text-[#EDEDED]/45 tracking-widest uppercase">
            Advanced Computing @ USYD
          </span>
          <span className="w-px h-3 bg-white/20" />
          <span className="inline-flex items-center gap-1.5 font-dm-sans text-xs text-emerald-400/80 tracking-wide">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            Available for internships
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-syne font-bold leading-[0.93] mb-7"
          style={{ fontSize: 'clamp(3.2rem, 10vw, 7.5rem)' }}
        >
          <span className="text-[#EDEDED]">Ishaan </span>
          <span className="shimmer-once">Gulati</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8 }}
          className="h-10 md:h-12 flex items-center justify-center mb-10"
        >
          <p className="font-dm-sans text-lg md:text-2xl text-[#EDEDED]/60 font-light">
            {displayText}
            <span className="inline-block w-[2px] h-5 md:h-6 bg-[#00D4FF] ml-1 animate-cursor-blink align-middle" />
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            ref={primaryRef}
            onClick={() => scrollTo('projects')}
            onMouseMove={(e) => applyMagnetic(e, primaryRef)}
            onMouseLeave={() => resetMagnetic(primaryRef)}
            className="group relative px-8 py-3.5 rounded-xl bg-[#00D4FF] text-[#050A0E] font-dm-sans font-semibold text-sm tracking-wide overflow-hidden hover:shadow-[0_0_40px_rgba(0,212,255,0.55)] transition-shadow duration-300 min-h-[44px]"
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
          </button>

          <button
            ref={secondaryRef}
            onClick={() => scrollTo('contact')}
            onMouseMove={(e) => applyMagnetic(e, secondaryRef)}
            onMouseLeave={() => resetMagnetic(secondaryRef)}
            className="px-8 py-3.5 rounded-xl border border-[#00D4FF]/35 text-[#EDEDED]/85 font-dm-sans font-medium text-sm tracking-wide hover:border-[#00D4FF]/70 hover:text-[#00D4FF] hover:shadow-[0_0_20px_rgba(0,212,255,0.2)] transition-colors duration-300 backdrop-blur-sm min-h-[44px]"
          >
            Get In Touch
          </button>
        </motion.div>

        {/* Achievement chips ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-12 overflow-hidden"
          aria-label="Key achievements"
        >
          <div className="ticker-track gap-3">
            {[...ACHIEVEMENT_CHIPS, ...ACHIEVEMENT_CHIPS].map((chip, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-4 py-2 mx-1.5 rounded-full border border-white/[0.09] bg-white/[0.03] backdrop-blur-sm text-xs font-dm-sans text-[#EDEDED]/45 whitespace-nowrap select-none"
              >
                <span className="text-sm">{chip.icon}</span>
                <span>{chip.text}</span>
                <span className="text-[#EDEDED]/25">·</span>
                <span className="text-[#EDEDED]/30">{chip.sub}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-dm-sans text-[10px] text-[#EDEDED]/20 tracking-[0.25em] uppercase">
          scroll
        </span>
        <div className="w-6 h-10 rounded-full border border-[#EDEDED]/12 flex items-start justify-center pt-2.5">
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2.5 rounded-full bg-[#00D4FF]"
          />
        </div>
      </motion.div>
    </section>
  )
}
