'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const SPEED = 1.2
const PET_W = 64

export default function Pet() {
  const [pos, setPos] = useState(80)
  const [dir, setDir] = useState<1 | -1>(1)
  const [walking, setWalking] = useState(false)
  const [blinking, setBlinking] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [jumping, setJumping] = useState(false)
  const walkRef = useRef<ReturnType<typeof setInterval>>()
  const behaviorRef = useRef<ReturnType<typeof setTimeout>>()
  const blinkRef = useRef<ReturnType<typeof setInterval>>()

  // Blink loop
  useEffect(() => {
    blinkRef.current = setInterval(() => {
      setBlinking(true)
      setTimeout(() => setBlinking(false), 180)
    }, 2500 + Math.random() * 2000)
    return () => clearInterval(blinkRef.current)
  }, [])

  const stopWalking = useCallback(() => {
    clearInterval(walkRef.current)
    setWalking(false)
  }, [])

  const startWalking = useCallback(() => {
    const newDir = Math.random() > 0.5 ? 1 : -1
    setDir(newDir as 1 | -1)
    setWalking(true)
    walkRef.current = setInterval(() => {
      setPos((p) => {
        const maxX = typeof window !== 'undefined' ? window.innerWidth - PET_W - 10 : 400
        const next = p + newDir * SPEED
        if (next < 10 || next > maxX) {
          stopWalking()
          return p
        }
        return next
      })
    }, 20)
  }, [stopWalking])

  // Random behavior loop
  useEffect(() => {
    const pick = () => {
      const r = Math.random()
      if (r < 0.5) {
        startWalking()
        behaviorRef.current = setTimeout(() => {
          stopWalking()
          behaviorRef.current = setTimeout(pick, 1500 + Math.random() * 2000)
        }, 2500 + Math.random() * 3000)
      } else {
        stopWalking()
        behaviorRef.current = setTimeout(pick, 2000 + Math.random() * 2500)
      }
    }
    behaviorRef.current = setTimeout(pick, 1000)
    return () => {
      clearTimeout(behaviorRef.current)
      clearInterval(walkRef.current)
    }
  }, [startWalking, stopWalking])

  const handleClick = () => {
    if (clicked) return
    setClicked(true)
    setJumping(true)
    stopWalking()
    clearTimeout(behaviorRef.current)
    setTimeout(() => setJumping(false), 500)
    setTimeout(() => setClicked(false), 1200)
  }

  // Eye state
  const eyeL = blinking ? null : { cx: dir === 1 ? 22 : 19, cy: 22 }
  const eyeR = blinking ? null : { cx: dir === 1 ? 38 : 35, cy: 22 }

  return (
    <div
      className="pet-wrap"
      style={{ left: `${pos}px` }}
      onClick={handleClick}
      title="Hi! Click me 👋"
    >
      <svg
        width="64"
        height="58"
        viewBox="0 0 64 58"
        fill="none"
        className={`pet-body ${dir === -1 ? 'pet-flipped' : ''} ${jumping ? 'pet-jump' : ''}`}
      >
        {/* Body */}
        <ellipse cx="32" cy="30" rx="22" ry="24" fill="#1a1a1a" />

        {/* Eyes - white */}
        {blinking ? (
          <>
            <line x1="17" y1="22" x2="25" y2="22" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="33" y1="22" x2="41" y2="22" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
          </>
        ) : (
          <>
            <ellipse cx="21" cy="21" rx="5.5" ry="6" fill="#fff" />
            <ellipse cx="37" cy="21" rx="5.5" ry="6" fill="#fff" />
            {/* Pupils */}
            <circle cx={eyeL!.cx} cy={eyeL!.cy} r="2.8" fill="#1a1a1a" />
            <circle cx={eyeR!.cx} cy={eyeR!.cy} r="2.8" fill="#1a1a1a" />
            {/* Eye shine */}
            <circle cx={eyeL!.cx - 1} cy={eyeL!.cy - 1.5} r="1" fill="#fff" />
            <circle cx={eyeR!.cx - 1} cy={eyeR!.cy - 1.5} r="1" fill="#fff" />
          </>
        )}

        {/* Mouth */}
        {clicked ? (
          <path d="M 25 30 Q 29 36 33 30" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        ) : (
          <ellipse cx="29" cy="31" rx="2" ry="1.2" fill="#fff" opacity="0.5" />
        )}

        {/* Blush */}
        <circle cx="14" cy="28" r="3.5" fill="#ff6b6b" opacity="0.25" />
        <circle cx="44" cy="28" r="3.5" fill="#ff6b6b" opacity="0.25" />

        {/* Left leg */}
        <g className={walking ? 'pet-leg-l' : ''}>
          <ellipse cx="22" cy="52" rx="5" ry="4" fill="#1a1a1a" />
        </g>
        {/* Right leg */}
        <g className={walking ? 'pet-leg-r' : ''}>
          <ellipse cx="40" cy="52" rx="5" ry="4" fill="#1a1a1a" />
        </g>
      </svg>

      {/* Wave emoji on click */}
      {clicked && <span className="pet-emoji">👋</span>}
    </div>
  )
}
