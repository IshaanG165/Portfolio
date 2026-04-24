'use client'

import { useState, useEffect, useRef } from 'react'

const TYPING_SPEED = 75
const DELETING_SPEED = 45
const PAUSE_AFTER_TYPE = 2200
const PAUSE_AFTER_DELETE = 300

export function useTypewriter(strings: string[]) {
  const [displayText, setDisplayText] = useState('')
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting' | 'waiting'>('typing')
  const [currentIndex, setCurrentIndex] = useState(0)
  const stringsRef = useRef(strings)

  useEffect(() => {
    const currentString = stringsRef.current[currentIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (phase === 'typing') {
      if (displayText.length < currentString.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentString.slice(0, displayText.length + 1))
        }, TYPING_SPEED)
      } else {
        timeout = setTimeout(() => setPhase('pausing'), PAUSE_AFTER_TYPE)
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 100)
    } else if (phase === 'deleting') {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, DELETING_SPEED)
      } else {
        timeout = setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % stringsRef.current.length)
          setPhase('typing')
        }, PAUSE_AFTER_DELETE)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, phase, currentIndex])

  return displayText
}
