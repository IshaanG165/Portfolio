import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import CursorGlow from '@/components/CursorGlow'

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <CursorGlow />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
    </main>
  )
}
