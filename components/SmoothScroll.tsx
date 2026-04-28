'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Augment the Window interface so window.__lenis is typed everywhere
declare global {
  interface Window {
    __lenis?: {
      scrollTo: (
        target: number | string | HTMLElement,
        options?: { offset?: number; duration?: number; immediate?: boolean }
      ) => void
      stop: () => void
      start: () => void
    }
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      lerp: 0.12,         // snappy inertia — 0.1 was too laggy
      smoothWheel: true,  // smooth mouse-wheel on desktop
      syncTouch: false,   // leave iOS/Android touch scroll native (already buttery)
    })

    // Keep GSAP ScrollTrigger in sync with Lenis's virtual scroll position
    lenis.on('scroll', () => ScrollTrigger.update())

    // Drive Lenis via GSAP ticker so scroll + animations share one frame budget
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0) // prevent GSAP from dropping frames under load

    window.__lenis = lenis

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])

  return null
}
