'use client'

import { useEffect, useState } from 'react'
import { motion, MotionProps } from 'framer-motion'

type TextScrambleProps = {
  children: string
  duration?: number
  speed?: number
  characterSet?: string
  as?: keyof typeof motion
  className?: string
  trigger?: boolean
  onScrambleComplete?: () => void
} & MotionProps

const defaultChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export function TextScramble({
  children,
  duration = 0.8,
  speed = 0.04,
  characterSet = defaultChars,
  className,
  as = 'p',
  trigger = true,
  onScrambleComplete,
  ...props
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(children)
  const [isAnimating, setIsAnimating] = useState(false)

  const scramble = () => {
    if (isAnimating) return
    setIsAnimating(true)
    const text = children
    const steps = duration / speed
    let step = 0
    const interval = setInterval(() => {
      const progress = step / steps
      let scrambled = ''
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') { scrambled += ' '; continue }
        if (progress * text.length > i) {
          scrambled += text[i]
        } else {
          scrambled += characterSet[Math.floor(Math.random() * characterSet.length)]
        }
      }
      setDisplayText(scrambled)
      step++
      if (step > steps) {
        clearInterval(interval)
        setDisplayText(text)
        setIsAnimating(false)
        onScrambleComplete?.()
      }
    }, speed * 1000)
  }

  useEffect(() => {
    if (!trigger) return
    scramble()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger])

  const MotionEl = (motion as unknown as Record<string, React.ElementType>)[as] ?? motion.p

  return (
    <MotionEl className={className} {...props}>
      {displayText}
    </MotionEl>
  )
}
