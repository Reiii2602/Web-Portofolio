'use client'
import { useState, useEffect } from 'react'
import { useLang } from './LangContext'

const RANDOM_TRACKS = [
  'track/1fDFHXcykq4oaZvWgwecmZ', // About You - The 1975
  'track/7zFXmv6vqI4qOt4yGf3jYZ', // Get You - Daniel Caesar
  'track/3xKsf9qdS1CyvXSMEid6g8', // Pink + White - Frank Ocean
  'track/4k6Uh1HXdhtusDW5y8Gbvy', // Bad Habit - Steve Lacy
  'track/68cqcedhXNpwTJaE12932K', // Every Summertime - NIKI
  'track/5XeFesFbtLpXzIVDNQP22n', // I Wanna Be Yours - Arctic Monkeys
  'track/7D0RhFcb3crfPuTJ0obpdN', // Sparks - Coldplay
  'track/1BxfuPKGuaTgP7aM0Bbdwr', // Cruel Summer - Taylor Swift
  'track/3vkCueOxgXX6eBse6Qc08b'  // Sunday Best - Surfaces
]

export default function MusicDropdown() {
  const { t } = useLang()
  const [isOpen, setIsOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [embedUrl, setEmbedUrl] = useState('')

  // Set random track on mount
  useEffect(() => {
    const randomTrack = RANDOM_TRACKS[Math.floor(Math.random() * RANDOM_TRACKS.length)]
    setEmbedUrl(`https://open.spotify.com/embed/${randomTrack}?utm_source=generator&theme=0`)
  }, [])

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setUrl(val)

    const match = val.match(/spotify\.com\/(playlist|track|album|show|episode)\/([a-zA-Z0-9]+)/)
    if (match) {
      setEmbedUrl(`https://open.spotify.com/embed/${match[1]}/${match[2]}?utm_source=generator&theme=0`)
      // Close input after successful paste
      setTimeout(() => setIsOpen(false), 800)
    }
  }

  return (
    <>
      <div className="music-inline-container">
        <button 
          className={`music-nav-btn ${isOpen ? 'active' : ''}`} 
          onClick={() => setIsOpen(!isOpen)}
        >
          {t.music}
        </button>

        {isOpen && (
          <div className="music-inline-content">
            <input
              type="text"
              placeholder={t.musicPlaceholder}
              value={url}
              onChange={handleUrlChange}
              className="music-inline-input"
              autoFocus
            />
          </div>
        )}
      </div>

      {embedUrl && (
        <div className="floating-music-player">
          <iframe
            src={embedUrl}
            width="300"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ borderRadius: '12px' }}
          />
        </div>
      )}
    </>
  )
}
