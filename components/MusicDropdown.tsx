'use client'
import { useState } from 'react'
import { useLang } from './LangContext'

export default function MusicDropdown() {
  const { t } = useLang()
  const [isOpen, setIsOpen] = useState(false)
  const [url, setUrl] = useState('')
  // Default to About You - The 1975
  const [embedUrl, setEmbedUrl] = useState('https://open.spotify.com/embed/track/1fDFHXcykq4oaZvWgwecmZ?utm_source=generator&theme=0')

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
