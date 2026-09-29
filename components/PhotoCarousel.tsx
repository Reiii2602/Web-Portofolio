'use client'

import { useState } from 'react'

const photos = [
  { src: '/photo-1.jpg', alt: 'Daffa Fadhul Rahman - Photo 1' },
  { src: '/photo-2.jpg', alt: 'Daffa Fadhul Rahman - Photo 2' },
]

export default function PhotoCarousel() {
  const [current, setCurrent] = useState(0)

  const handleClick = () => {
    setCurrent((prev) => (prev + 1) % photos.length)
  }

  const backIndex = current
  const frontIndex = (current + 1) % photos.length

  return (
    <div className="photo-stack" onClick={handleClick} role="button" tabIndex={0} aria-label="Click to see next photo">
      {/* Back photo - straight */}
      <div className="photo-card photo-back">
        <img src={photos[backIndex].src} alt={photos[backIndex].alt} />
      </div>
      {/* Front photo - tilted */}
      <div className="photo-card photo-front">
        <img src={photos[frontIndex].src} alt={photos[frontIndex].alt} />
      </div>
    </div>
  )
}
