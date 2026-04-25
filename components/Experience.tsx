'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ExperienceItem {
  title: string
  company: string
  period: string
  description: string
  bullets?: string[]
  type: 'work' | 'club'
  tags?: string[]
  highlight?: string
  location?: string
}

const EXPERIENCES: ExperienceItem[] = [
  {
    title: 'Technology Subcommittee',
    company: 'SUDATA',
    period: 'Feb 2026 – Present',
    description:
      'Building technical infrastructure, data pipelines, and analytics tooling for the Sydney University Data Analytics Society.',
    type: 'club',
    tags: ['Data Pipelines', 'Analytics', 'Infrastructure'],
  },
  {
    title: 'Events Subcommittee',
    company: 'SUMS',
    period: 'Dec 2025 – Present',
    description:
      'Coordinating and running events for the Sydney University Mathematics Society, including academic competitions and industry networking nights.',
    type: 'club',
    tags: ['Event Management', 'Community'],
  },
  {
    title: 'Private Tutor',
    company: 'NextStep Academy',
    period: 'Apr 2026 – Present',
    description: '',
    bullets: [
      'Teaching and mentoring 4+ students across Years 8–12 in Chemistry and Mathematics, tailoring structured lessons and diagnosing individual knowledge gaps to accelerate concept mastery and exam readiness.',
      'Designed and curated 20+ targeted problem sets using NSW past paper questions, worked examples, and revision resources aligned with the latest NSW syllabus for efficient practice and conceptual understanding.',
    ],
    type: 'work',
    tags: ['Mathematics', 'Chemistry', 'Years 8–12', 'NSW Syllabus'],
    highlight: 'Teaching',
  },
  {
    title: 'Software Engineering Intern',
    company: 'Vidit Healthcare',
    period: 'Aug – Sep 2023',
    location: 'Haryana, India',
    description: '',
    bullets: [
      'Automated data ingestion and cleaning pipelines (Python, Pandas, PostgreSQL), cutting manual processing time by 40% across 3 operational workflows and eliminating a recurring class of data-entry errors.',
      'Built a live operations dashboard (PostgreSQL + Google Sheets API) enabling same-day resource and staffing decisions for clinical teams, replacing daily ad-hoc manual reporting.',
    ],
    type: 'work',
    tags: ['Python', 'Pandas', 'PostgreSQL', 'Google Sheets API'],
  },
]

const TYPE_CONFIG = {
  work: {
    dot: 'bg-[#00D4FF]',
    glow: 'shadow-[0_0_10px_rgba(0,212,255,0.7)]',
    tagColor: 'text-[#00D4FF]/75 bg-[#00D4FF]/[0.07] border-[#00D4FF]/15',
  },
  club: {
    dot: 'bg-violet-400',
    glow: 'shadow-[0_0_10px_rgba(167,139,250,0.7)]',
    tagColor: 'text-violet-400/75 bg-violet-400/[0.07] border-violet-400/15',
  },
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="py-24 md:py-36 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative mb-16 md:mb-20" style={{ overflow: 'clip' }}>
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
            03
          </span>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10"
          >
            <p className="font-mono text-[#00D4FF] text-[11px] tracking-[0.32em] uppercase mb-5 font-medium">
              03 · Experience
            </p>
            <h2 className="font-syne text-4xl md:text-5xl lg:text-6xl font-bold text-[#EDEDED] leading-[0.95]">
              Where I&apos;ve Been
            </h2>
          </motion.div>
        </div>

        <div ref={ref} className="relative">
          {/* Timeline spine */}
          <div className="absolute left-[18px] md:left-[22px] top-3 bottom-3 w-px bg-white/[0.07] overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-[#00D4FF] via-violet-400 to-transparent"
              initial={{ height: '0%' }}
              animate={isInView ? { height: '100%' } : {}}
              transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
            />
          </div>

          <div className="space-y-5 pl-14 md:pl-16">
            {EXPERIENCES.map((exp, i) => {
              const config = TYPE_CONFIG[exp.type]
              const isTutor = exp.highlight === 'Teaching'

              return (
                <motion.div
                  key={`${exp.company}-${exp.period}`}
                  initial={{ opacity: 0, x: -24 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.18, duration: 0.65, ease: 'easeOut' }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute -left-[46px] md:-left-[48px] top-5 w-3 h-3 rounded-full ${config.dot} ${config.glow}`}
                  />

                  <div
                    className="rounded-2xl p-6 md:p-7 transition-all duration-300 group"
                    style={{
                      background: isTutor
                        ? 'rgba(0,212,255,0.03)'
                        : 'rgba(255,255,255,0.04)',
                      backdropFilter: 'blur(12px)',
                      border: isTutor
                        ? '1px solid rgba(0,212,255,0.15)'
                        : '1px solid rgba(255,255,255,0.08)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = isTutor
                        ? 'rgba(0,212,255,0.3)'
                        : 'rgba(255,255,255,0.14)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = isTutor
                        ? 'rgba(0,212,255,0.15)'
                        : 'rgba(255,255,255,0.08)'
                    }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h3 className="font-syne text-lg md:text-xl font-semibold text-[#EDEDED] leading-snug">
                            {exp.title}
                          </h3>
                          {isTutor && (
                            <span className="inline-flex items-center gap-1 font-dm-sans text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full font-medium text-[#00D4FF] border border-[#00D4FF]/25 bg-[#00D4FF]/[0.08]">
                              Active
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                          <p className="font-dm-sans text-sm font-medium text-[#00D4FF]">
                            {exp.company}
                          </p>
                          {exp.location && (
                            <>
                              <span className="text-[#EDEDED]/20 text-xs">·</span>
                              <p className="font-dm-sans text-xs text-[#EDEDED]/35">{exp.location}</p>
                            </>
                          )}
                        </div>
                      </div>

                      <span className="flex-shrink-0 font-dm-sans text-xs text-[#EDEDED]/35 bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 rounded-full">
                        {exp.period}
                      </span>
                    </div>

                    {exp.description ? (
                      <p className="font-dm-sans text-sm text-[#EDEDED]/55 leading-relaxed mb-4">
                        {exp.description}
                      </p>
                    ) : null}

                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="space-y-2.5 mb-4">
                        {exp.bullets.map((bullet, bi) => (
                          <li key={bi} className="flex items-start gap-3">
                            <span className="mt-[7px] flex-shrink-0 w-1 h-1 rounded-full bg-[#00D4FF]/50" />
                            <p className="font-dm-sans text-sm text-[#EDEDED]/55 leading-relaxed">
                              {bullet}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Subject / role tags */}
                    {exp.tags && exp.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`font-dm-sans text-xs px-2.5 py-1 rounded-lg border ${config.tagColor}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
