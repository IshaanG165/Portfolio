'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({ lerp: 0.1 })

    // Keep GSAP ScrollTrigger in sync with Lenis scroll position
    lenis.on('scroll', () => ScrollTrigger.update())

    // Drive Lenis via GSAP ticker instead of its own RAF
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Expose globally so Navbar/NavDock can call lenis.scrollTo()
    ;(window as Window & { __lenis?: Lenis }).__lenis = lenis

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      delete (window as Window & { __lenis?: Lenis }).__lenis
    }
  }, [])

  return null
}
