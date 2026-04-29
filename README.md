# Ishaan Gulati — Portfolio

Personal portfolio for [ishaangulati.dev](https://ishaangulati.dev) — built to be fast, precise, and visually sharp.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion v11 + GSAP v3 |
| Smooth scroll | Lenis v1 wired to GSAP ticker |
| Canvas effects | Custom Canvas 2D (Perlin noise flow field, particle network) |
| Deployment | Vercel |

## Features

- **Flow field canvas** — Perlin noise driven particles, GPU-accelerated, pauses when tab is hidden, respects `prefers-reduced-motion`
- **Particle network** — Mouse-reactive particle system in the hero section, visibility-aware, respects `prefers-reduced-motion`
- **NavDock** — macOS-style floating navigation pill (desktop only), spring scale magnification on hover, scroll-based active section detection
- **Custom cursor** — Spring-lerp ring + instant dot using `mix-blend-mode: difference`, GPU composited via `willChange: transform`, desktop-only
- **Lenis smooth scroll** — Inertia scrolling wired to GSAP ticker for conflict-free parallax
- **Scroll progress bar** — Fixed top bar using GPU-composited `scaleX` transform
- **Shimmer hero name** — CSS background-size animation, fires once on load
- **Typewriter subtitle** — Cycles through role labels with a blinking cursor
- **Magnetic buttons** — Subtle follow effect on hero CTAs
- **Achievement ticker** — CSS marquee, pauses on hover
- **Scroll-triggered animations** — Framer Motion `whileInView` with `once: true` (no re-trigger on scroll back)
- **Glass card UI** — `backdrop-filter: blur` panels throughout
- **Award spotlight** — Pulsing ambient glow card with gradient text for the UG Honour Roll
- **Animated stat counters** — Count-up on scroll into view

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # ESLint check
```

## Project Structure

```
app/
  layout.tsx       — root layout, fonts, metadata
  page.tsx         — server component, assembles all sections
  globals.css      — Tailwind base, glass utility, keyframe animations

components/
  Navbar.tsx       — fixed header + mobile hamburger menu
  NavDock.tsx      — macOS dock (desktop), spring scale magnification
  Hero.tsx         — full-screen hero, particle canvas, typewriter, magnetic CTAs
  About.tsx        — bio, animated stat cards, award spotlight
  Projects.tsx     — project cards
  Experience.tsx   — timeline / experience cards
  Skills.tsx       — 2-column glass card grid with skill pills
  Contact.tsx      — contact links, footer
  FlowFieldCanvas  — full-screen Perlin noise background (fixed)
  ParticleCanvas   — hero section particle network
  CustomCursor     — spring-lerp cursor ring + dot
  ScrollProgress   — fixed top progress bar
  SmoothScroll     — Lenis initialiser, GSAP ticker integration
  SectionDivider   — decorative spacer

hooks/
  useTypewriter.ts — rotating typewriter strings hook
```

## Performance Notes

All animations default to GPU-composited `transform` and `opacity` properties to avoid layout reflow and paint. Key decisions:

- **FlowFieldCanvas** runs at 60fps with motion-blur fade (`rgba` fill at 0.016 opacity). Particle count is halved on mobile (380 vs 750). Tab hidden → RAF paused. `prefers-reduced-motion` → no animation.
- **ParticleCanvas** caps at 110 particles and scales count with screen area. Visibility paused when tab is hidden. `prefers-reduced-motion` → no animation. The O(n²) connection loop runs ~6,000 distance checks per frame at max particle count — this is the highest-CPU-cost per-frame operation at desktop sizes; mobile particle count drops to ~20 naturally.
- **NavDock** uses `animate={{ scale }}` (transform) rather than `width/height` to avoid layout reflow on every spring frame.
- **CustomCursor** uses `willChange: transform` and only runs on `pointer: fine` devices.
- **ScrollProgress** uses `scaleX` transform — no reflow, no repaint.
- **Lenis** is driven by the GSAP ticker (`gsap.ticker.add`) to avoid a competing RAF loop. `scroll-behavior: auto` is set in CSS to prevent double-smooth conflict.
- **Framer Motion** scroll triggers use `whileInView` + `viewport={{ once: true }}` — backed by IntersectionObserver, not scroll event listeners.

## Sections

| # | Section | Highlights |
|---|---|---|
| — | Hero | Name shimmer, typewriter, magnetic CTAs, particle network, achievement ticker |
| 01 | About | Bio, count-up stat cards, Honour Roll spotlight |
| 02 | Projects | Project cards with live/repo links |
| 03 | Experience | Teaching, club roles, internship targets |
| 04 | Skills | Languages, Frameworks, Tools, Concepts |
| 05 | Contact | Email, GitHub, LinkedIn, footer |
