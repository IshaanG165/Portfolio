import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import CustomCursor from '@/components/CustomCursor'
import FlowFieldCanvas from '@/components/FlowFieldCanvas'
import { ParallaxComponent } from '@/components/ui/parallax-scrolling'

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <FlowFieldCanvas />
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <ParallaxComponent />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
    </main>
  )
}
