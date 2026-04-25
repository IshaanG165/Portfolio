'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const LINKS = [
  {
    name: 'Email',
    label: 'ishaangulati165@gmail.com',
    href: 'mailto:ishaangulati165@gmail.com',
    external: false,
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    label: 'IshaanG165',
    href: 'https://github.com/IshaanG165',
    external: true,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    label: 'ishaan-gulati',
    href: 'https://linkedin.com/in/ishaan-gulati',
    external: true,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.999 23.227 23.999 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="relative py-32 md:py-44 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Ghost number */}
        <div className="relative mb-20 md:mb-28" style={{ overflow: 'clip' }}>
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
            05
          </span>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10"
          >
            <p className="font-mono text-[#00D4FF] text-[11px] tracking-[0.32em] uppercase mb-5 font-medium">
              05 · Contact
            </p>
            <h2
              className="font-syne font-bold text-[#EDEDED] leading-[0.9]"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}
            >
              Let&apos;s
              <br />
              <span className="text-gradient">Talk.</span>
            </h2>
          </motion.div>
        </div>

        {/* Subtext + links */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* Left: message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.7 }}
          >
            <p className="font-dm-sans text-[#EDEDED]/55 text-lg leading-[1.85] mb-8 max-w-md">
              I&apos;m open to software engineering internships and graduate roles
              starting 2026–27. If you&apos;re working on something interesting — or
              just want to talk systems, maths, or engineering — reach out.
            </p>
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="font-mono text-xs text-emerald-400/75 tracking-wide">
                Available · Responding within 24h
              </span>
            </div>
          </motion.div>

          {/* Right: contact links */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            {LINKS.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.45 + i * 0.1, duration: 0.5 }}
                className="group flex items-center justify-between px-6 py-4 rounded-2xl glass transition-all duration-300"
                style={{ borderColor: 'rgba(255,255,255,0.07)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.25)'
                  e.currentTarget.style.background = 'rgba(0,212,255,0.04)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-[#EDEDED]/35 group-hover:text-[#00D4FF] transition-colors duration-300 flex-shrink-0">
                    {link.icon}
                  </span>
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#EDEDED]/25 mb-0.5">
                      {link.name}
                    </p>
                    <p className="font-dm-sans text-sm text-[#EDEDED]/65 group-hover:text-[#00D4FF] transition-colors duration-300 font-medium">
                      {link.label}
                    </p>
                  </div>
                </div>
                <svg
                  className="w-3.5 h-3.5 text-[#EDEDED]/20 group-hover:text-[#00D4FF]/60 group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-24 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <p className="font-mono text-[10px] text-[#EDEDED]/15 tracking-wide">
            Ishaan Gulati · ishaangulati.dev
          </p>
          <p className="font-mono text-[10px] text-[#EDEDED]/15 tracking-wide">
            Next.js · Tailwind · Framer Motion · Vercel
          </p>
        </motion.div>

      </div>
    </section>
  )
}
