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
  sublabel: string
  isNumber: boolean
  prefix?: string
  started: boolean
}

function StatCard({ value, label, sublabel, isNumber, prefix = '', started }: StatCardProps) {
  const numTarget = isNumber ? Number(value) : 0
  const count = useCountUp(numTarget, 1600, started && isNumber)

  return (
    <div className="glass glass-hover rounded-2xl p-5 md:p-6 h-full flex flex-col justify-between min-h-[130px]">
      <p className="font-mono text-3xl md:text-4xl font-bold text-gradient leading-none mb-3 tabular-nums">
        {isNumber ? `${prefix}${count}` : `${prefix}${value}`}
      </p>
      <div>
        <p className="font-dm-sans text-sm text-[#EDEDED]/85 font-medium leading-snug">{label}</p>
        <p className="font-mono text-[11px] text-[#EDEDED]/35 mt-1 leading-relaxed tracking-tight">{sublabel}</p>
      </div>
    </div>
  )
}

const STATS: StatCardProps[] = [
  {
    value: 'HD',
    label: 'WAM',
    sublabel: 'High Distinction average',
    isNumber: false,
    started: false,
  },
  {
    value: 21,
    label: 'INFO1113 · OOP',
    sublabel: '21st / 822 students · top 2.6%',
    isNumber: true,
    prefix: '#',
    started: false,
  },
  {
    value: 55,
    label: 'INFO1110 · Intro to Programming',
    sublabel: '55th / 1200+ students · top 4.6%',
    isNumber: true,
    prefix: '#',
    started: false,
  },
  {
    value: '1st',
    label: 'Hackathon',
    sublabel: 'Canva × USYD CommStem 2025',
    isNumber: false,
    started: false,
  },
]

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-24 md:py-36 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="mb-16 md:mb-20">
            <p className="font-dm-sans text-[#00D4FF] text-xs tracking-[0.3em] uppercase mb-4 font-medium">
              01 — About
            </p>
            <h2 className="font-syne text-4xl md:text-5xl lg:text-6xl font-bold text-[#F0F0F0]">
              Who I Am
            </h2>
          </div>

          {/* Bio + Stats grid */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start mb-8">
            {/* Left: Bio */}
            <div>
              <p className="font-dm-sans text-[#EDEDED]/70 text-lg leading-relaxed mb-6">
                I&apos;m Ishaan — studying{' '}
                <span className="text-[#EDEDED] font-medium">Bachelor of Advanced Computing (Computer Science)</span>{' '}
                at the University of Sydney, ranked in the{' '}
                <span className="text-[#00D4FF] font-medium">top 2.6% of my cohort</span>{' '}
                and awarded the UG High Honour Roll — the highest distinction given by the School of Computer Science.
              </p>
              <p className="font-dm-sans text-[#EDEDED]/70 text-lg leading-relaxed mb-10">
                I build fast, precise software: from offline-first neural networks running on
                microcontrollers to real-time infrastructure handling live data at sub-200ms latency.
                I think in systems, ship with discipline, and close the gap between research and production.
              </p>

              <div className="flex flex-wrap gap-3">
                {['Dalyell Scholar', 'UG High Honour Roll 2025'].map((badge) => (
                  <motion.span
                    key={badge}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00D4FF]/25 bg-[#00D4FF]/[0.07] text-[#00D4FF] text-sm font-dm-sans font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] inline-block" />
                    {badge}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Right: Stats */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.6 }}
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
                'linear-gradient(135deg, rgba(251,191,36,0.06) 0%, rgba(245,158,11,0.03) 50%, rgba(10,15,30,0.4) 100%)',
              border: '1px solid rgba(251,191,36,0.22)',
            }}
          >
            {/* Ambient corner glow */}
            <div
              className="absolute -top-16 -left-16 w-48 h-48 rounded-full pointer-events-none award-glow"
              style={{
                background:
                  'radial-gradient(circle, rgba(251,191,36,0.14) 0%, transparent 70%)',
              }}
            />

            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Icon */}
              <div
                className="relative flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center pulse-ring"
                style={{
                  background: 'rgba(251,191,36,0.1)',
                  border: '1px solid rgba(251,191,36,0.3)',
                }}
              >
                <span className="text-2xl" aria-hidden="true">⭐</span>
              </div>

              {/* Content */}
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
                    className="font-dm-sans text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full font-medium"
                    style={{
                      color: 'rgba(251,191,36,0.9)',
                      border: '1px solid rgba(251,191,36,0.25)',
                      background: 'rgba(251,191,36,0.08)',
                    }}
                  >
                    Institutional Award
                  </span>
                </div>
                <p className="font-dm-sans text-sm text-[#F0F0F0]/60 leading-relaxed">
                  <span className="text-[#F0F0F0]/85 font-medium">School of Computer Science Award</span>
                  {' '}·{' '}
                  University of Sydney
                  {' '}·{' '}
                  Awarded to top-performing students in the CS undergraduate cohort with a High Distinction WAM.
                </p>
              </div>

              {/* Right: Rank context */}
              <div
                className="flex-shrink-0 text-center px-5 py-3 rounded-xl hidden md:block"
                style={{
                  background: 'rgba(251,191,36,0.06)',
                  border: '1px solid rgba(251,191,36,0.15)',
                }}
              >
                <p
                  className="font-syne text-3xl font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  HD
                </p>
                <p className="font-dm-sans text-xs text-[#F0F0F0]/40 mt-0.5 tracking-wide">WAM</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
