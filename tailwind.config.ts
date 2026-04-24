import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'space-navy': '#0A0F1E',
        'cyber-cyan': '#00D4FF',
        'warm-white': '#F0F0F0',
      },
      fontFamily: {
        syne: ['var(--font-space-grotesk)', 'sans-serif'],
        'dm-sans': ['var(--font-dm-sans)', 'sans-serif'],
      },
      animation: {
        'cursor-blink': 'cursorBlink 1s step-end infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        cursorBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      backgroundImage: {
        'radial-cyan': 'radial-gradient(ellipse at center, rgba(0,212,255,0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}

export default config
