'use client'

import { useState, useEffect, useRef } from 'react'

const PET_W = 64

export default function Pet() {
  const [pos, setPos] = useState(80)
  const [dir, setDir] = useState(1)
  const [isWalking, setIsWalking] = useState(false)
  const [blink, setBlink] = useState(false)
  const [jump, setJump] = useState(false)
  const mounted = useRef(true)

  // Blinking loop
  useEffect(() => {
    mounted.current = true
    const blinkLoop = () => {
      if (!mounted.current) return
      const delay = 2000 + Math.random() * 2500
      setTimeout(() => {
        if (!mounted.current) return
        setBlink(true)
        setTimeout(() => {
          if (!mounted.current) return
          setBlink(false)
          blinkLoop()
        }, 150)
      }, delay)
    }
    blinkLoop()
    return () => { mounted.current = false }
  }, [])

  // Walking behavior loop
  useEffect(() => {
    let active = true
    let walkInterval: ReturnType<typeof setInterval> | null = null

    const stopWalk = () => {
      if (walkInterval) clearInterval(walkInterval)
      walkInterval = null
      if (active) setIsWalking(false)
    }

    const startWalk = () => {
      const newDir = Math.random() > 0.5 ? 1 : -1
      if (active) {
        setDir(newDir)
        setIsWalking(true)
      }

      walkInterval = setInterval(() => {
        if (!active) { stopWalk(); return }
        setPos((prev) => {
          const maxX = typeof window !== 'undefined' ? window.innerWidth - PET_W - 10 : 400
          const next = prev + newDir * 1.5
          if (next < 10 || next > maxX) {
            stopWalk()
            return prev
          }
          return next
        })
      }, 25)
    }

    const behaviorLoop = () => {
      if (!active) return

      const rand = Math.random()
      if (rand < 0.85) {
        // Walk often for 3-6 seconds
        startWalk()
        const walkDuration = 3000 + Math.random() * 3000
        setTimeout(() => {
          stopWalk()
          // Short idle between walks (0.5-2 seconds)
          const idleDuration = 500 + Math.random() * 1500
          setTimeout(() => {
            if (active) behaviorLoop()
          }, idleDuration)
        }, walkDuration)
      } else {
        // Idle occasionally for 1-3 seconds
        stopWalk()
        const idleDuration = 1000 + Math.random() * 2000
        setTimeout(() => {
          if (active) behaviorLoop()
        }, idleDuration)
      }
    }

    // Start after a short delay
    const startTimer = setTimeout(behaviorLoop, 500)

    return () => {
      active = false
      clearTimeout(startTimer)
      stopWalk()
    }
  }, [])

  const handleClick = () => {
    setJump(true)
    setTimeout(() => setJump(false), 600)
  }

  return (
    <div
      className="pet-wrap"
      style={{ left: `${pos}px` }}
      onClick={handleClick}
      title="Hi! Click me 👋"
    >
      <svg
        width="64"
        height="60"
        viewBox="0 0 64 60"
        fill="none"
        className={`pet-body${jump ? ' pet-jump' : ''}`}
      >
        <g className={dir === -1 ? 'pet-flipped' : ''} style={{ transformOrigin: '32px 30px' }}>
          {/* Shadow */}
          <ellipse cx="32" cy="58" rx="20" ry="2.5" fill="#0002" />

          {/* Left leg */}
          <g className={isWalking ? 'pet-leg-l' : ''}>
            <rect x="16" y="42" width="12" height="14" rx="5" fill="#1a1a1a" />
            <ellipse cx="22" cy="55" rx="7.5" ry="4.5" fill="#1a1a1a" />
          </g>
          {/* Right leg */}
          <g className={isWalking ? 'pet-leg-r' : ''}>
            <rect x="36" y="42" width="12" height="14" rx="5" fill="#1a1a1a" />
            <ellipse cx="42" cy="55" rx="7.5" ry="4.5" fill="#1a1a1a" />
          </g>

          {/* Body */}
          <ellipse cx="32" cy="28" rx="22" ry="22" fill="#1a1a1a" />

          {/* Eyes */}
          {blink ? (
            <>
              <line x1="18" y1="24" x2="26" y2="24" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="34" y1="24" x2="42" y2="24" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* White part */}
              <ellipse cx="22" cy="23" rx="6" ry="6.5" fill="#fff" />
              <ellipse cx="38" cy="23" rx="6" ry="6.5" fill="#fff" />
              {/* Pupils - face right by default */}
              <circle cx="24" cy="24" r="3" fill="#1a1a1a" />
              <circle cx="40" cy="24" r="3" fill="#1a1a1a" />
              {/* Shine */}
              <circle cx="23" cy="22" r="1.2" fill="#fff" />
              <circle cx="39" cy="22" r="1.2" fill="#fff" />
            </>
          )}

          {/* Mouth */}
          {jump ? (
            <path d="M 26 33 Q 30 38 34 33" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
          ) : (
            <path d="M 28 33 Q 30 35 32 33" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          )}

          {/* Blush */}
          <circle cx="13" cy="30" r="4" fill="#ff6b6b" opacity="0.2" />
          <circle cx="47" cy="30" r="4" fill="#ff6b6b" opacity="0.2" />
        </g>
      </svg>

      {/* Wave on click */}
      {jump && <span className="pet-emoji">👋</span>}
    </div>
  )
}
