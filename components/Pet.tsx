'use client'

import { useState, useEffect, useRef } from 'react'

type Mood = 'idle' | 'walking' | 'sleeping' | 'waving'

export default function Pet() {
  const [pos, setPos] = useState(60)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [mood, setMood] = useState<Mood>('idle')
  const [clicked, setClicked] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const intervalRef = useRef<ReturnType<typeof setInterval>>()

  // Random behaviors
  useEffect(() => {
    const pickBehavior = () => {
      const rand = Math.random()
      if (rand < 0.4) {
        // Walk
        setMood('walking')
        const newDir = Math.random() > 0.5 ? 1 : -1
        setDirection(newDir as 1 | -1)
        intervalRef.current = setInterval(() => {
          setPos((prev) => {
            const next = prev + newDir * 1.5
            if (next < 20 || next > (typeof window !== 'undefined' ? window.innerWidth - 80 : 300)) {
              return prev
            }
            return next
          })
        }, 30)
        timeoutRef.current = setTimeout(() => {
          clearInterval(intervalRef.current)
          setMood('idle')
          pickBehavior()
        }, 2000 + Math.random() * 3000)
      } else if (rand < 0.6) {
        // Sleep
        setMood('sleeping')
        timeoutRef.current = setTimeout(() => {
          setMood('idle')
          pickBehavior()
        }, 4000 + Math.random() * 3000)
      } else {
        // Idle
        setMood('idle')
        timeoutRef.current = setTimeout(pickBehavior, 2000 + Math.random() * 2000)
      }
    }

    pickBehavior()

    return () => {
      clearTimeout(timeoutRef.current)
      clearInterval(intervalRef.current)
    }
  }, [])

  const handleClick = () => {
    setClicked(true)
    setMood('waving')
    clearTimeout(timeoutRef.current)
    clearInterval(intervalRef.current)
    setTimeout(() => {
      setClicked(false)
      setMood('idle')
    }, 1200)
  }

  const eyes = () => {
    if (mood === 'sleeping') {
      return (
        <>
          <line x1="13" y1="16" x2="19" y2="16" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          <line x1="29" y1="16" x2="35" y2="16" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </>
      )
    }
    if (mood === 'waving') {
      return (
        <>
          <circle cx="16" cy="15" r="3.5" fill="#fff" />
          <circle cx="32" cy="15" r="3.5" fill="#fff" />
          <circle cx="16" cy="15" r="1.5" fill="#111" />
          <circle cx="32" cy="15" r="1.5" fill="#111" />
          {/* Happy mouth */}
          <path d="M 19 22 Q 24 27 29 22" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </>
      )
    }
    return (
      <>
        <circle cx="16" cy="15" r="3.5" fill="#fff" />
        <circle cx="32" cy="15" r="3.5" fill="#fff" />
        <circle cx={direction === 1 ? "17.5" : "14.5"} cy="15" r="1.5" fill="#111" />
        <circle cx={direction === 1 ? "33.5" : "30.5"} cy="15" r="1.5" fill="#111" />
      </>
    )
  }

  return (
    <div
      className="pet-container"
      style={{ left: `${pos}px` }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Pet mascot"
    >
      <svg
        width="48"
        height="40"
        viewBox="0 0 48 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`pet-svg pet-${mood} ${direction === -1 ? 'pet-flip' : ''}`}
      >
        {/* Body */}
        <path
          d="M 4 38 C 4 38 2 10 14 6 C 18 4 20 4 24 4 C 28 4 30 4 34 6 C 46 10 44 38 44 38 Z"
          fill="#1a1a1a"
        />
        {/* Eyes */}
        {eyes()}
      </svg>
      {/* Zzz for sleeping */}
      {mood === 'sleeping' && (
        <div className="pet-zzz">
          <span>z</span>
          <span>z</span>
          <span>Z</span>
        </div>
      )}
      {/* Wave hand */}
      {mood === 'waving' && (
        <div className="pet-wave">👋</div>
      )}
    </div>
  )
}
