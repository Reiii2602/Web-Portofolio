'use client'

import { useState, useRef } from 'react'

const photos = [
  { src: '/photo-1.jpg', alt: 'Daffa Fadhul Rahman - Photo 1' },
  { src: '/photo-2.jpg', alt: 'Daffa Fadhul Rahman - Photo 2' },
]

export default function PhotoCarousel() {
  const [stack, setStack] = useState([0, 1]) // [back, front]
  const [isAnimating, setIsAnimating] = useState(false)
  const [hovered, setHovered] = useState(false)
  const stackRef = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    if (isAnimating) return
    setIsAnimating(true)

    // After the CSS animation completes (~600ms), swap the stack order
    setTimeout(() => {
      setStack((prev) => {
        // Move back card to front: [back, front] -> [front, back]
        return [prev[1], prev[0]]
      })
      setIsAnimating(false)
      setHovered(false)
    }, 600)
  }

  return (
    <div
      className="photo-stack"
      ref={stackRef}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Click to shuffle photos"
    >
      {/* Back photo - straight, peeks on hover */}
      <div
        className={`photo-card photo-back ${hovered ? 'photo-peek' : ''} ${isAnimating ? 'photo-lift' : ''}`}
        onMouseEnter={() => !isAnimating && setHovered(true)}
        onMouseLeave={() => !isAnimating && setHovered(false)}
      >
        <img src={photos[stack[0]].src} alt={photos[stack[0]].alt} draggable={false} />
      </div>
      {/* Front photo - tilted */}
      <div className={`photo-card photo-front ${isAnimating ? 'photo-settle' : ''}`}>
        <img src={photos[stack[1]].src} alt={photos[stack[1]].alt} draggable={false} />
      </div>
    </div>
  )
}
