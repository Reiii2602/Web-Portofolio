'use client'
import { useState, useRef, useEffect } from 'react'
import { useLang } from './LangContext'

export default function MusicDropdown() {
  const { t } = useLang()
  const [isOpen, setIsOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [embedUrl, setEmbedUrl] = useState('')
  const popoverRef = useRef<HTMLDivElement>(null)

  // Parse Spotify URL to Embed URL
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

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <div className="music-dropdown-container" ref={popoverRef}>
      <button 
        className={`music-nav-btn ${isOpen ? 'active' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        {t.music}
      </button>

      {isOpen && (
        <div className="music-popover">
          <input
            type="text"
            placeholder={t.musicPlaceholder}
            value={url}
            onChange={handleUrlChange}
            className="music-input"
            autoFocus
          />
          {embedUrl && (
            <div className="music-player">
              <iframe
                src={embedUrl}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style={{ borderRadius: '12px' }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
