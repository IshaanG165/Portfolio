'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GitHubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
)

interface MetricChipProps {
  value: string
  label: string
  delay?: number
  gold?: boolean
}

function MetricChip({ value, label, delay = 0, gold = false }: MetricChipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col items-center justify-center rounded-2xl p-4 md:p-5 text-center min-h-[90px]"
      style={{
        background: gold
          ? 'rgba(251,191,36,0.06)'
          : 'rgba(0,212,255,0.05)',
        border: gold
          ? '1px solid rgba(251,191,36,0.2)'
          : '1px solid rgba(0,212,255,0.15)',
      }}
    >
      <span
        className="font-syne text-xl md:text-2xl font-bold leading-none mb-1.5"
        style={
          gold
            ? {
                background: 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }
            : undefined
        }
        data-gradient={!gold ? 'cyan' : undefined}
      >
        {!gold ? (
          <span className="text-gradient">{value}</span>
        ) : (
          value
        )}
      </span>
      <span className="font-dm-sans text-[11px] text-[#F0F0F0]/45 leading-tight px-1">{label}</span>
    </motion.div>
  )
}

/* ── Spore Scout — Featured Full-Width Card ── */
function SportScoutCard() {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative overflow-hidden rounded-2xl"
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(12px)',
        border: hovered
          ? '1px solid rgba(251,191,36,0.4)'
          : '1px solid rgba(251,191,36,0.18)',
        boxShadow: hovered
          ? '0 0 60px rgba(251,191,36,0.12), 0 24px 48px rgba(0,0,0,0.35)'
          : '0 4px 24px rgba(0,0,0,0.25)',
        transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
      }}
    >
      {/* Top winner banner */}
      <div
        className="flex items-center gap-3 px-7 md:px-9 py-3.5 border-b"
        style={{
          background:
            'linear-gradient(90deg, rgba(251,191,36,0.12) 0%, rgba(245,158,11,0.06) 60%, transparent 100%)',
          borderColor: 'rgba(251,191,36,0.14)',
        }}
      >
        <span className="text-lg" aria-hidden="true">🏆</span>
        <span className="font-dm-sans text-sm font-semibold text-amber-300">
          1st Place — Canva × USYD CommStem Hackathon 2024
        </span>
        <span
          className="ml-auto font-dm-sans text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full"
          style={{
            color: 'rgba(251,191,36,0.8)',
            border: '1px solid rgba(251,191,36,0.2)',
            background: 'rgba(251,191,36,0.07)',
          }}
        >
          Featured Project
        </span>
      </div>

      {/* Card body */}
      <div className="p-7 md:p-9">
        <div className="grid md:grid-cols-5 gap-8 md:gap-10 items-start">
          {/* Left: Content (3/5) */}
          <div className="md:col-span-3">
            <h3 className="font-syne text-3xl md:text-4xl font-bold text-[#F0F0F0] mb-4 leading-tight">
              Spore Scout
            </h3>

            <div className="flex flex-wrap gap-2 mb-5">
              {['TensorFlow', 'Flutter', 'ESP32', 'TFLite', 'Bluetooth'].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-dm-sans text-amber-300/80 bg-amber-300/[0.07] border border-amber-300/15 px-3 py-1 rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="min-h-[80px] mb-8">
              <AnimatePresence mode="wait">
                <motion.p
                  key={hovered ? 'long' : 'short'}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="font-dm-sans text-[#F0F0F0]/65 leading-relaxed"
                >
                  {hovered
                    ? 'Detects 8 crop diseases using a quantised ResNet CNN (INT8) with under 150ms inference. Fused with real-time ESP32 Bluetooth sensor data — soil humidity, temperature, and light. Built for farmers with zero internet connectivity. Competed against 200+ teams to take first place.'
                    : 'Offline-first Android app for real-time crop disease detection. No internet required — built for the field, not the lab. Won 1st place competing against 200+ teams at the Canva × USYD CommStem Hackathon.'}
                </motion.p>
              </AnimatePresence>
            </div>

            <a
              href="https://github.com/IshaanG165"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-dm-sans text-amber-300/70 hover:text-amber-300 transition-colors duration-200 group"
            >
              <GitHubIcon />
              <span>View on GitHub</span>
              <svg
                className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Right: Metrics (2/5) */}
          <div className="md:col-span-2 grid grid-cols-2 gap-3">
            <MetricChip value="8" label="Crop diseases detected" delay={0.1} />
            <MetricChip value="<150ms" label="Model inference time" delay={0.18} />
            <MetricChip value="INT8" label="Quantised ResNet" delay={0.26} />
            <MetricChip value="Offline" label="No internet needed" delay={0.34} gold />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── QuickFix QR ── */
function QuickFixCard() {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: 0.15, duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative overflow-hidden rounded-2xl"
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(12px)',
        border: hovered
          ? '1px solid rgba(0,212,255,0.35)'
          : '1px solid rgba(255,255,255,0.08)',
        boxShadow: hovered
          ? '0 0 50px rgba(0,212,255,0.1), 0 20px 40px rgba(0,0,0,0.3)'
          : '0 4px 20px rgba(0,0,0,0.2)',
        transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
      }}
    >
      <div className="p-7 md:p-9">
        <div className="grid md:grid-cols-5 gap-8 items-start">
          {/* Left: Content (3/5) */}
          <div className="md:col-span-3">
            <h3 className="font-syne text-2xl md:text-3xl font-bold text-[#F0F0F0] mb-4 leading-tight">
              QuickFix QR
            </h3>

            <div className="flex flex-wrap gap-2 mb-5">
              {['Next.js', 'Supabase', 'PostgreSQL', 'WebSocket', 'Leaflet.js'].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-dm-sans text-[#00D4FF]/80 bg-[#00D4FF]/[0.07] border border-[#00D4FF]/15 px-3 py-1 rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="min-h-[72px] mb-8">
              <AnimatePresence mode="wait">
                <motion.p
                  key={hovered ? 'long' : 'short'}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="font-dm-sans text-sm text-[#F0F0F0]/60 leading-relaxed"
                >
                  {hovered
                    ? 'Serverless event-driven pipeline with sub-200ms end-to-end latency. Supabase real-time subscriptions push live updates to a Leaflet.js campus map. Scan a QR code, submit a fault — it appears as a live map pin for campus operations staff instantly.'
                    : 'Real-time campus fault-reporting platform. QR scan → live map pin in under 10 seconds. Built with serverless architecture and real-time WebSocket subscriptions.'}
                </motion.p>
              </AnimatePresence>
            </div>

            <a
              href="https://github.com/IshaanG165"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-dm-sans text-[#00D4FF]/80 hover:text-[#00D4FF] transition-colors duration-200 group"
            >
              <GitHubIcon />
              <span>View on GitHub</span>
              <svg
                className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Right: Metrics (2/5) */}
          <div className="md:col-span-2 grid grid-cols-2 gap-3">
            <MetricChip value="<10s" label="QR scan to live map" delay={0.1} />
            <MetricChip value="<200ms" label="End-to-end latency" delay={0.18} />
            <MetricChip value="Live" label="Real-time updates" delay={0.26} />
            <MetricChip value="0" label="Page reloads needed" delay={0.34} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-36 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16 md:mb-20"
        >
          <p className="font-dm-sans text-[#00D4FF] text-xs tracking-[0.3em] uppercase mb-4 font-medium">
            02 — Projects
          </p>
          <h2 className="font-syne text-4xl md:text-5xl lg:text-6xl font-bold text-[#F0F0F0]">
            What I&apos;ve Built
          </h2>
        </motion.div>

        <div className="flex flex-col gap-6">
          <SportScoutCard />
          <QuickFixCard />
        </div>
      </div>
    </section>
  )
}
