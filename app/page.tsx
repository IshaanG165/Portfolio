import SmoothScroll from '@/components/SmoothScroll'
import Navbar from '@/components/Navbar'
import NavDock from '@/components/NavDock'
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
  return (
    <main className="relative overflow-x-hidden">
      <SmoothScroll />
      <FlowFieldCanvas />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <NavDock />
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
  )
}
