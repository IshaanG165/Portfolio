'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import CustomCursor from '@/components/CustomCursor'
import FlowFieldCanvas from '@/components/FlowFieldCanvas'
import ScrollProgress from '@/components/ScrollProgress'
import { ParallaxComponent } from '@/components/ui/parallax-scrolling'

// Load the intro screen client-side only (uses canvas / window)
const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), { ssr: false })

function SectionDivider() {
  return (
    <div className="px-6 py-2">
      <div className="max-w-7xl mx-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>
    </div>
  )
}

export default function Home() {
  const [entered, setEntered] = useState(false)

  const handleEnter = useCallback(() => {
    setEntered(true)
  }, [])

  return (
    <>
      {!entered && <LoadingScreen onEnter={handleEnter} />}

      <main
        className="relative overflow-x-hidden"
        style={{
          opacity: entered ? 1 : 0,
          transition: entered ? 'opacity 0.5s ease 0.1s' : 'none',
        }}
      >
        <FlowFieldCanvas />
        <ScrollProgress />
        <CustomCursor />
        <Navbar />
        <Hero />
        <SectionDivider />
        <About />
        <ParallaxComponent />
        <Projects />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Contact />
      </main>
    </>
  )
}
