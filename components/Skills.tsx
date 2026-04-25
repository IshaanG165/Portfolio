'use client'

import { motion } from 'framer-motion'

const SKILL_GROUPS = [
  {
    category: 'Languages',
    accent: '#00D4FF',
    skills: ['Python', 'Java', 'JavaScript', 'TypeScript', 'Dart', 'Bash', 'SQL'],
  },
  {
    category: 'Frameworks',
    accent: '#7DF9FF',
    skills: ['React', 'Next.js', 'Flutter', 'TensorFlow / TFLite', 'Pandas'],
  },
  {
    category: 'Tools & Infrastructure',
    accent: '#00B4CC',
    skills: ['Git', 'Supabase', 'PostgreSQL', 'Vercel', 'Leaflet.js', 'ESP32', 'Hive'],
  },
  {
    category: 'Concepts',
    accent: '#5BE0FF',
    skills: ['OOP', 'REST APIs', 'Serverless', 'CNN / Transfer Learning', 'Agile'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-36 px-6">
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
            04
          </span>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10"
          >
            <p className="font-mono text-[#00D4FF] text-[11px] tracking-[0.32em] uppercase mb-5 font-medium">
              04 · Skills
            </p>
            <h2 className="font-syne text-4xl md:text-5xl lg:text-6xl font-bold text-[#EDEDED] leading-[0.95]">
              The Stack
            </h2>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: gi * 0.1, duration: 0.65 }}
              className="glass rounded-2xl p-6 md:p-8"
            >
              <p
                className="font-syne text-xs font-semibold tracking-[0.25em] uppercase mb-5"
                style={{ color: group.accent }}
              >
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: gi * 0.08 + si * 0.04, duration: 0.4, ease: 'easeOut' }}
                    className="font-dm-sans text-sm text-[#EDEDED]/75 bg-white/[0.05] border border-white/[0.09] px-3.5 py-1.5 rounded-lg cursor-default transition-all duration-200 hover:text-[#00D4FF] hover:border-[#00D4FF]/30 hover:bg-[#00D4FF]/[0.07]"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
