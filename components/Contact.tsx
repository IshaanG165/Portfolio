'use client'

import { motion } from 'framer-motion'

const CONTACT_LINKS = [
  {
    name: 'Email',
    href: 'mailto:ishaangulati165@gmail.com',
    label: 'ishaangulati165@gmail.com',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    href: 'https://github.com/IshaanG165',
    label: 'IshaanG165',
    external: true,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/ishaan-gulati',
    label: 'ishaan-gulati',
    external: true,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-36 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
        >
          <p className="font-dm-sans text-[#00D4FF] text-xs tracking-[0.3em] uppercase mb-4 font-medium">
            05 — Contact
          </p>
          <h2 className="font-syne text-4xl md:text-5xl lg:text-6xl font-bold text-[#F0F0F0] mb-6">
            Let&apos;s Talk
          </h2>
          <p className="font-dm-sans text-[#F0F0F0]/55 text-lg md:text-xl mb-16 max-w-md mx-auto leading-relaxed">
            Open to internships and interesting problems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            {CONTACT_LINKS.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.6 }}
                whileHover={{ y: -3 }}
                className="group flex items-center gap-4 px-6 py-4 rounded-2xl glass glass-hover transition-all duration-300 w-full sm:w-auto min-h-[60px]"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <span className="text-[#F0F0F0]/45 group-hover:text-[#00D4FF] transition-colors duration-300 flex-shrink-0">
                  {link.icon}
                </span>
                <div className="text-left">
                  <p className="font-dm-sans text-[10px] text-[#F0F0F0]/30 uppercase tracking-[0.2em] mb-0.5">
                    {link.name}
                  </p>
                  <p className="font-dm-sans text-sm text-[#F0F0F0]/75 group-hover:text-[#00D4FF] transition-colors duration-300 font-medium">
                    {link.label}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-24 pt-8 border-t border-white/[0.05]"
          >
            <p className="font-dm-sans text-xs text-[#F0F0F0]/18 tracking-wide">
              Built with Next.js · Tailwind CSS · Framer Motion · Deployed on Vercel
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
