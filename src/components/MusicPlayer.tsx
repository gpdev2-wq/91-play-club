import { useApp, type MusicSource } from '../context/AppContext';
import Icon from './Icon';

const SOURCE_OPTIONS: { id: MusicSource; label: string; color: string }[] = [
  { id: 'spotify', label: 'Spotify', color: '#1DB954' },
  { id: 'youtube', label: 'YouTube', color: '#FF0000' },
];

function SpotifyIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function YouTubeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function MusicPlayer() {
  const { musicOpen, musicVideoId, musicSpotifyId, musicSource, setMusicSource, closeMusic } = useApp();

  const openExternal = () => {
    if (effectiveSource === 'spotify' && musicSpotifyId) {
      window.open(`https://open.spotify.com/playlist/${musicSpotifyId}`, '_blank', 'noopener');
    } else if (musicVideoId) {
      window.open(`https://www.youtube.com/watch?v=${musicVideoId}`, '_blank', 'noopener');
    }
  };

  const hasSpotify = !!musicSpotifyId;
  const hasYouTube = !!musicVideoId;

  const effectiveSource: MusicSource = musicSource === 'spotify' && hasSpotify
    ? 'spotify'
    : hasYouTube ? 'youtube' : 'spotify';

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-end justify-center transition-all duration-300
        ${musicOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      onClick={closeMusic}
    >
      <div className={`absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300 ${musicOpen ? 'opacity-100' : 'opacity-0'}`} />

      <div
        className={`relative w-full max-w-lg mx-2 sm:mx-auto rounded-t-[24px] sm:rounded-t-[28px] overflow-hidden transition-transform duration-300 ease-out
          ${musicOpen ? 'translate-y-0' : 'translate-y-full'}`}
        onClick={e => e.stopPropagation()}
        style={{
          background: 'linear-gradient(180deg, rgba(30,30,42,0.98) 0%, rgba(16,16,24,0.99) 100%)',
          boxShadow: '0 -10px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        <div className="flex justify-center pt-2.5 sm:pt-3 pb-1.5 sm:pb-2">
          <div className="w-9 sm:w-10 h-1 rounded-full bg-white/15" />
        </div>

        <div className="px-4 sm:px-5 pb-6 sm:pb-8">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-[10px] sm:text-xs font-semibold text-white/50 uppercase tracking-widest">Now Playing</h3>
            <button onClick={closeMusic}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/[0.08] flex items-center justify-center hover:bg-white/15 active:scale-90 transition">
              <Icon name="close" size={16} className="text-white/60" />
            </button>
          </div>

          {hasSpotify && hasYouTube && (
            <div className="flex gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              {SOURCE_OPTIONS.map(opt => {
                const active = effectiveSource === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setMusicSource(opt.id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-semibold transition-all active:scale-[0.97]
                      ${active ? 'shadow-lg scale-[1.02]' : 'bg-white/[0.05] text-white/40 hover:bg-white/[0.08]'}`}
                    style={active ? {
                      background: `${opt.color}18`,
                      color: opt.color,
                      boxShadow: `0 4px 20px ${opt.color}20`,
                      border: `1px solid ${opt.color}30`,
                    } : undefined}
                  >
                    {opt.id === 'spotify' ? <SpotifyIcon size={14} /> : <YouTubeIcon size={14} />}
                    {opt.label}
                  </button>
                );
              })}
            </div>
          )}

          <div className="rounded-2xl overflow-hidden bg-black relative" style={{ border: '1px solid rgba(255,255,255,0.04)' }}>
            {musicOpen && effectiveSource === 'spotify' && musicSpotifyId && (
              <iframe
                key={`spotify-${musicSpotifyId}`}
                src={`https://open.spotify.com/embed/playlist/${musicSpotifyId}?utm_source=generator&theme=0`}
                className="w-full border-0"
                style={{ height: 352, minHeight: 280 }}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Player"
              />
            )}

            {musicOpen && effectiveSource === 'youtube' && musicVideoId && (
              <div className="aspect-video relative">
                <iframe
                  key={`yt-${musicVideoId}`}
                  src={`https://www.youtube.com/embed/${musicVideoId}?autoplay=1&modestbranding=1&rel=0&playsinline=1`}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  frameBorder="0"
                  title="YouTube Player"
                />
              </div>
            )}
          </div>

          <button onClick={openExternal}
            className="w-full mt-2.5 sm:mt-3 text-[10px] sm:text-[11px] text-white/30 hover:text-white/50 active:scale-95 transition text-center py-1 flex items-center justify-center gap-1.5">
            {effectiveSource === 'spotify' ? <SpotifyIcon size={11} /> : <YouTubeIcon size={11} />}
            Open in {effectiveSource === 'spotify' ? 'Spotify' : 'YouTube'} →
          </button>
        </div>
      </div>
    </div>
  );
}
