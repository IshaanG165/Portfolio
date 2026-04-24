'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ExperienceItem {
  title: string
  company: string
  period: string
  description: string
  type: 'work' | 'club'
  tags?: string[]
  highlight?: string
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
    description:
      'Teaching HSC and first-year university students in Mathematics and Computer Science. Breaking complex topics — algorithms, calculus, data structures, proof techniques — into clear mental models. Tracking individual progress and adapting sessions to each student\'s learning style.',
    type: 'work',
    tags: ['Mathematics', 'Computer Science', 'HSC', 'University'],
    highlight: 'Teaching',
  },
  {
    title: 'Software Engineering Intern',
    company: 'Vidit Healthcare',
    period: 'Aug – Sep 2023',
    description:
      'Built and deployed full-stack features for a healthcare management platform — spanning frontend UI, REST API design, and database integration — contributing across the entire product lifecycle.',
    type: 'work',
    tags: ['Full Stack', 'REST API', 'Healthcare'],
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
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16 md:mb-20"
        >
          <p className="font-dm-sans text-[#00D4FF] text-xs tracking-[0.3em] uppercase mb-4 font-medium">
            03 — Experience
          </p>
          <h2 className="font-syne text-4xl md:text-5xl lg:text-6xl font-bold text-[#F0F0F0]">
            Where I&apos;ve Been
          </h2>
        </motion.div>

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
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div className="flex items-start gap-3">
                        <div>
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <h3 className="font-syne text-lg md:text-xl font-semibold text-[#F0F0F0] leading-snug">
                              {exp.title}
                            </h3>
                            {isTutor && (
                              <span className="inline-flex items-center gap-1 font-dm-sans text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full font-medium text-[#00D4FF] border border-[#00D4FF]/25 bg-[#00D4FF]/[0.08]">
                                Active
                              </span>
                            )}
                          </div>
                          <p className="font-dm-sans text-sm font-medium text-[#00D4FF] mt-0.5">
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      <span className="flex-shrink-0 font-dm-sans text-xs text-[#F0F0F0]/35 bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 rounded-full">
                        {exp.period}
                      </span>
                    </div>

                    <p className="font-dm-sans text-sm text-[#F0F0F0]/55 leading-relaxed mb-4">
                      {exp.description}
                    </p>

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
