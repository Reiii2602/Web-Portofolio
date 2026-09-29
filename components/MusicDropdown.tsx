'use client'
import { useState } from 'react'
import { useLang } from './LangContext'

export default function MusicDropdown() {
  const { t } = useLang()
  const [isOpen, setIsOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [trackData, setTrackData] = useState<{ title: string, artist: string, cover: string, url: string } | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)

  const handleUrlChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setUrl(val)

    if (val.includes('spotify.com')) {
      setIsLoading(true)
      try {
        // Fetch Spotify OEmbed data via proxy to bypass CORS
        const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://open.spotify.com/oembed?url=' + val)}`)
        if (res.ok) {
          const data = await res.json()
          const oembed = JSON.parse(data.contents)
          setTrackData({
            title: oembed.title || 'Unknown Track',
            artist: oembed.author_name || 'Spotify',
            cover: oembed.thumbnail_url || 'https://placehold.co/100x100/111/fff?text=Audio',
            url: val
          })
          setIsPlaying(true)
        }
      } catch (err) {
        console.error('Error fetching Spotify data:', err)
      }
      setIsLoading(false)
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
          {!trackData ? (
            <input
              type="text"
              placeholder={isLoading ? 'Loading...' : t.musicPlaceholder}
              value={url}
              onChange={handleUrlChange}
              className="music-inline-input"
              disabled={isLoading}
              autoFocus
            />
          ) : (
            <div className="custom-player-container">
              <a href={trackData.url} target="_blank" rel="noopener noreferrer" title="Open in Spotify">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={trackData.cover} alt="Cover" className="custom-player-cover" />
              </a>
              
              <div className="custom-player-info">
                <div className="custom-player-title" title={trackData.title}>{trackData.title}</div>
                <div className="custom-player-artist" title={trackData.artist}>{trackData.artist}</div>
              </div>
              
              <div className="custom-player-controls">
                <button className="custom-player-btn" aria-label="Previous">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
                </button>
                <button 
                  className="custom-player-btn play-btn" 
                  onClick={() => setIsPlaying(!isPlaying)} 
                  aria-label="Play/Pause"
                >
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  )}
                </button>
                <button className="custom-player-btn" aria-label="Next">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
                </button>
                <div className="custom-player-divider" />
                <button 
                  className="custom-player-btn close-btn" 
                  onClick={() => { setTrackData(null); setUrl(''); setIsPlaying(false); }} 
                  aria-label="Close"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
