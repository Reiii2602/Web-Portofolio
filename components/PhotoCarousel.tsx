'use client'

import { useState, useEffect, useCallback } from 'react'

const photos = [
  { src: '/photo-1.jpg', alt: 'Daffa Fadhul Rahman - Photo 1' },
  { src: '/photo-2.jpg', alt: 'Daffa Fadhul Rahman - Photo 2' },
]

export default function PhotoCarousel() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % photos.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(next, 4000)
    return () => clearInterval(interval)
  }, [next])

  return (
    <div className="photo-carousel">
      <div className="photo-frame">
        {/* SVG clip path for organic book-like shape */}
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <clipPath id="frame-clip" clipPathUnits="objectBoundingBox">
              <path d="
                M 0.08 0.02
                C 0.03 0.02, 0.0 0.06, 0.0 0.12
                L 0.0 0.85
                C 0.0 0.93, 0.04 0.98, 0.1 0.98
                L 0.42 0.99
                C 0.46 0.99, 0.48 0.97, 0.5 0.95
                C 0.52 0.97, 0.54 0.99, 0.58 0.99
                L 0.9 0.98
                C 0.96 0.98, 1.0 0.93, 1.0 0.85
                L 1.0 0.12
                C 1.0 0.06, 0.97 0.02, 0.92 0.02
                L 0.58 0.01
                C 0.54 0.01, 0.52 0.03, 0.5 0.05
                C 0.48 0.03, 0.46 0.01, 0.42 0.01
                Z
              " />
            </clipPath>
          </defs>
        </svg>

        <div className="photo-container">
          {photos.map((photo, i) => (
            <img
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              className={`photo-slide ${i === current ? 'photo-active' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="photo-dots">
        {photos.map((_, i) => (
          <button
            key={i}
            className={`photo-dot ${i === current ? 'photo-dot-active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
