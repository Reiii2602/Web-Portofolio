'use client'
import { useState } from 'react'
import { useLang } from './LangContext'

export default function MusicDropdown() {
  const { t } = useLang()
  const [isOpen, setIsOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [embedUrl, setEmbedUrl] = useState('')

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setUrl(val)

    const match = val.match(/spotify\.com\/(playlist|track|album|show|episode)\/([a-zA-Z0-9]+)/)
    if (match) {
      setEmbedUrl(`https://open.spotify.com/embed/${match[1]}/${match[2]}?utm_source=generator&theme=0`)
    } else {
      setEmbedUrl('')
    }
  }

  return (
    <div className="music-inline-container">
      <button 
        className={`music-nav-btn ${isOpen ? 'active' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        {t.music}
      </button>

      {isOpen && (
        <div className="music-inline-content">
          {!embedUrl ? (
            <input
              type="text"
              placeholder={t.musicPlaceholder}
              value={url}
              onChange={handleUrlChange}
              className="music-inline-input"
              autoFocus
            />
          ) : (
            <div className="music-inline-player">
              <iframe
                src={embedUrl}
                width="300"
                height="80"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style={{ borderRadius: '12px', background: 'transparent' }}
              />
              <button 
                className="music-clear-btn" 
                onClick={() => { setUrl(''); setEmbedUrl(''); }} 
                title="Clear Music"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
