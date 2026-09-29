'use client'

import { useState, useEffect, useRef } from 'react'

const PET_W = 64

export default function Pet() {
  const posRef = useRef(80)
  const [pos, setPos] = useState(80)
  const [dir, setDir] = useState(1)
  const [isWalking, setIsWalking] = useState(false)
  const [blink, setBlink] = useState(false)
  const [jump, setJump] = useState(false)

  const targetXRef = useRef<number | null>(null)
  const lastMouseTimeRef = useRef<number>(0)
  const mounted = useRef(true)

  // Mouse tracker
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetXRef.current = e.clientX
      lastMouseTimeRef.current = Date.now()
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

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

  // Movement loop (RAF for smooth 60fps tracking)
  useEffect(() => {
    let active = true
    let frameId: number
    let currentMode: 'roam' | 'follow' = 'roam'
    let roamTarget = posRef.current

    const loop = () => {
      if (!active) return

      const now = Date.now()
      // If mouse moved in the last 5 seconds, follow it!
      const isMouseActive = now - lastMouseTimeRef.current < 5000 && targetXRef.current !== null

      let targetX = roamTarget

      if (isMouseActive) {
        currentMode = 'follow'
        targetX = targetXRef.current! - PET_W / 2 // Center pet on cursor
      } else {
        if (currentMode === 'follow') {
          currentMode = 'roam'
          roamTarget = posRef.current
        }
        // Random roam logic
        if (Math.random() < 0.015) {
          if (Math.random() < 0.6) {
            const maxW = typeof window !== 'undefined' ? window.innerWidth - PET_W : 400
            roamTarget = Math.max(10, Math.min(maxW, posRef.current + (Math.random() * 400 - 200)))
          } else {
            roamTarget = posRef.current
          }
        }
      }

      const dist = targetX - posRef.current
      const speed = isMouseActive ? 3.5 : 1.5 // Run faster to cursor

      if (Math.abs(dist) > 20) {
        setIsWalking(true)
        const newDir = dist > 0 ? 1 : -1
        setDir(newDir)
        posRef.current += newDir * speed

        // Bounds check
        const maxW = typeof window !== 'undefined' ? window.innerWidth - PET_W : 400
        if (posRef.current < 5) posRef.current = 5
        if (posRef.current > maxW - 5) posRef.current = maxW - 5

        setPos(posRef.current)
      } else {
        setIsWalking(false)
      }

      frameId = requestAnimationFrame(loop)
    }

    frameId = requestAnimationFrame(loop)
    return () => {
      active = false
      cancelAnimationFrame(frameId)
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
      <div className={`pet-jump-wrap${jump ? ' pet-jump' : ''}`} style={{ display: 'inline-block' }}>
        <svg
          width="64"
          height="60"
          viewBox="0 0 64 60"
          fill="none"
          className={`pet-body${dir === -1 ? ' pet-flipped' : ''}`}
        >
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

          {/* Eyes (Perfectly centered like original, looking right) */}
          {blink ? (
            <>
              <line x1="20" y1="24" x2="28" y2="24" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="36" y1="24" x2="44" y2="24" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Whites */}
              <ellipse cx="24" cy="23" rx="5.5" ry="6" fill="#fff" />
              <ellipse cx="40" cy="23" rx="5.5" ry="6" fill="#fff" />
              {/* Pupils */}
              <circle cx="26" cy="24" r="2.8" fill="#1a1a1a" />
              <circle cx="42" cy="24" r="2.8" fill="#1a1a1a" />
              {/* Shine */}
              <circle cx="27" cy="22" r="1.2" fill="#fff" />
              <circle cx="43" cy="22" r="1.2" fill="#fff" />
            </>
          )}

          {/* Mouth */}
          {jump ? (
            <path d="M 30 33 Q 32 37 34 33" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
          ) : (
            <path d="M 30 33 Q 32 35 34 33" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          )}

          {/* Blush */}
          <circle cx="16" cy="29" r="4" fill="#ff6b6b" opacity="0.25" />
          <circle cx="48" cy="29" r="4" fill="#ff6b6b" opacity="0.25" />
        </svg>
      </div>

      {/* Wave on click */}
      {jump && <span className="pet-emoji">👋</span>}
    </div>
  )
}
