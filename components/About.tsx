'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start || target === 0) return
    let startTime: number | null = null
    let rafId: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) rafId = requestAnimationFrame(step)
      else setCount(target)
    }
    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [target, duration, start])
  return count
}

interface StatCardProps {
  value: string | number
  label: string
  sub: string
  isNumber: boolean
  prefix?: string
  started: boolean
}

function StatCard({ value, label, sub, isNumber, prefix = '', started }: StatCardProps) {
  const count = useCountUp(isNumber ? Number(value) : 0, 1800, started && isNumber)
  return (
    <div className="glass glass-hover rounded-2xl p-5 md:p-6 flex flex-col justify-between min-h-[140px] group">
      <p className="font-mono text-[2.4rem] md:text-[2.75rem] font-bold text-gradient leading-none tabular-nums">
        {isNumber ? `${prefix}${count}` : `${prefix}${value}`}
      </p>
      <div>
        <p className="font-dm-sans text-[11px] font-semibold text-[#EDEDED]/60 uppercase tracking-[0.18em] mb-1.5">
          {label}
        </p>
        <p className="font-mono text-[10px] text-[#EDEDED]/28 leading-snug">{sub}</p>
      </div>
    </div>
  )
}

const STATS: Omit<StatCardProps, 'started'>[] = [
  { value: 'HD',  label: 'WAM',           sub: 'High Distinction average',    isNumber: false, prefix: '' },
  { value: 21,    label: 'OOP Rank',      sub: '#21 of 822 · top 2.6%',       isNumber: true,  prefix: '#' },
  { value: 55,    label: 'Prog. Rank',    sub: '#55 of 1,200+ · top 4.6%',    isNumber: true,  prefix: '#' },
  { value: '1st', label: 'Hackathon',     sub: 'Canva × USYD · 200+ teams',   isNumber: false, prefix: '' },
]

const CURRENTLY = [
  'Teaching Maths & Chemistry · Years 8–12 at NextStep Academy',
  'Building analytics tooling for SUDATA at USYD',
  'Open to software engineering internships · 2026–27',
]

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="relative py-32 md:py-44 px-6">
      <div className="max-w-7xl mx-auto">

        {/* ── Section header with ghost number ── */}
        <div ref={ref} className="relative mb-20 md:mb-28" style={{ overflow: 'clip' }}>
          <span
            aria-hidden="true"
            className="absolute select-none pointer-events-none font-syne font-black"
            style={{
              fontSize: 'clamp(9rem, 26vw, 22rem)',
              top: '-0.1em',
              left: '-0.06em',
              lineHeight: 1,
              color: 'transparent',
              WebkitTextStroke: '1.5px rgba(255,255,255,0.028)',
            }}
          >
            01
          </span>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10"
          >
            <p className="font-mono text-[#00D4FF] text-[11px] tracking-[0.32em] uppercase mb-5 font-medium">
              01 · About
            </p>
            <h2 className="font-syne text-4xl md:text-5xl lg:text-6xl font-bold text-[#EDEDED] leading-[0.95]">
              Who I Am
            </h2>
          </motion.div>
        </div>

        {/* ── Main grid: bio (left) + stats (right) ── */}
        <div className="grid lg:grid-cols-5 gap-14 lg:gap-24 items-start mb-12">

          {/* Bio column */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18, duration: 0.8 }}
          >
            <div className="space-y-6 mb-10">
              <p className="font-dm-sans text-[#EDEDED]/80 text-base md:text-[1.05rem] leading-[1.9]">
                <span className="text-[#EDEDED] font-semibold">Dalyell Scholar</span>{' '}
                studying{' '}
                <span className="text-[#EDEDED] font-semibold">Advanced Computing @ USYD</span>
                {' '}— HD WAM, named to the{' '}
                <span className="text-[#EDEDED] font-semibold">UG High Honour Roll</span>{' '}
                by the School of Computer Science, and ranked in the{' '}
                <span className="text-[#00D4FF] font-medium">top 2.6% of my cohort</span>{' '}
                across courses with 800–1,200+ students.
              </p>

              <p className="font-dm-sans text-[#EDEDED]/60 text-base md:text-[1.05rem] leading-[1.9]">
                I build fast, precise software. I&apos;ve shipped an offline-first neural
                network that detects crop disease at under 150ms on a microcontroller —
                no cloud, no internet, no excuses — and real-time campus infrastructure
                where a QR scan becomes a live map pin in under 10 seconds. I think in
                systems, care about every layer of the stack, and close the gap between
                prototype and production.
              </p>

              <p className="font-dm-sans text-[#EDEDED]/42 text-base leading-[1.9]">
                Beyond engineering: I&apos;m drawn to the elegance of mathematical proofs,
                I tutor students from Year 8 to HSC in Maths and Chemistry, and I believe
                the best software is built by people who understand{' '}
                <em className="not-italic text-[#EDEDED]/55">why</em> the system should
                exist before they start building it.
              </p>
            </div>

            {/* Currently */}
            <div className="pt-8 border-t border-white/[0.055]">
              <p className="font-mono text-[10px] tracking-[0.38em] uppercase text-[#00D4FF]/45 mb-5">
                Currently
              </p>
              <div className="space-y-3">
                {CURRENTLY.map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -14 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.45 + i * 0.09, duration: 0.5, ease: 'easeOut' }}
                  >
                    <span className="mt-[9px] flex-shrink-0 w-[5px] h-[5px] rounded-full bg-[#00D4FF]/40" />
                    <p className="font-dm-sans text-sm text-[#EDEDED]/45 leading-relaxed">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2.5 mt-8">
              {['Dalyell Scholar', 'UG High Honour Roll 2025'].map((badge) => (
                <motion.span
                  key={badge}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00D4FF]/20 bg-[#00D4FF]/[0.06] text-[#00D4FF]/80 text-xs font-dm-sans font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]/60 flex-shrink-0" />
                  {badge}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Stats column */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-3">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 22 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.12 + i * 0.1, duration: 0.65 }}
              >
                <StatCard {...stat} started={isInView} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Award Spotlight ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative overflow-hidden rounded-2xl p-7 md:p-9"
          style={{
            background:
              'linear-gradient(135deg, rgba(251,191,36,0.07) 0%, rgba(245,158,11,0.03) 50%, rgba(5,10,14,0.5) 100%)',
            border: '1px solid rgba(251,191,36,0.2)',
          }}
        >
          <div
            className="absolute -top-20 -left-20 w-64 h-64 rounded-full pointer-events-none award-glow"
            style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.12) 0%, transparent 70%)' }}
          />

          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
            <div
              className="relative flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center pulse-ring"
              style={{ background: 'rgba(251,191,36,0.09)', border: '1px solid rgba(251,191,36,0.28)' }}
            >
              <span className="text-2xl" aria-hidden="true">⭐</span>
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <p
                  className="font-syne text-xl md:text-2xl font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 60%, #FDE68A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  UG High Honour Roll 2025
                </p>
                <span
                  className="font-mono text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full"
                  style={{
                    color: 'rgba(251,191,36,0.85)',
                    border: '1px solid rgba(251,191,36,0.22)',
                    background: 'rgba(251,191,36,0.07)',
                  }}
                >
                  Institutional Award
                </span>
              </div>
              <p className="font-dm-sans text-sm text-[#EDEDED]/55 leading-relaxed">
                <span className="text-[#EDEDED]/80 font-medium">School of Computer Science Award</span>
                {' · '}University of Sydney
                {' · '}
                Awarded to the highest-performing students in the CS undergraduate cohort — requires a High Distinction WAM sustained across all enrolled courses.
              </p>
            </div>

            <div
              className="flex-shrink-0 text-center px-6 py-4 rounded-xl hidden md:block"
              style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.14)' }}
            >
              <p
                className="font-mono text-3xl font-bold"
                style={{
                  background: 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                HD
              </p>
              <p className="font-mono text-[10px] text-[#EDEDED]/35 mt-1 tracking-widest uppercase">WAM</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
