import { useMemo } from 'react';
import { useApp, MOOD_LABELS } from '../context/AppContext';
import { MOOD_DATA } from '../data/moodData';
import Icon from '../components/Icon';
import ScreenWrapper from '../components/ScreenWrapper';

export default function SyncResult() {
  const { mood, navigate, playMusic, closeMusic, showToast, musicLang, musicOpen, musicVideoId, musicSpotifyId } = useApp();
  const data = useMemo(() => MOOD_DATA[mood], [mood]);

  const nowPlaying = musicLang === 'hindi' ? data.hindiNowPlaying : data.nowPlaying;
  const playlists = musicLang === 'hindi' ? data.hindiPlaylists : data.playlists;

  const isNowPlayingActive = musicOpen && (musicVideoId === nowPlaying.videoId || musicSpotifyId === nowPlaying.spotifyId);
  const isPlaylistActive = (videoId: string, spotifyId: string) =>
    musicOpen && (musicVideoId === videoId || musicSpotifyId === spotifyId);

  const handlePlay = () => {
    if (isNowPlayingActive) {
      closeMusic();
    } else {
      playMusic(nowPlaying.videoId, nowPlaying.spotifyId);
    }
  };

  const handlePlaylistTap = (videoId: string, spotifyId: string) => {
    if (isPlaylistActive(videoId, spotifyId)) {
      closeMusic();
    } else {
      playMusic(videoId, spotifyId);
    }
  };

  return (
    <ScreenWrapper>
      <div className="animate-fadeIn">
        <div className="relative h-56 sm:h-72 overflow-hidden">
          <img src={data.heroImage} alt="Sync" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/60 to-dark" />

          <button
            onClick={() => navigate('mood-home')}
            className="absolute top-5 sm:top-6 left-4 sm:left-5 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white/20 active:scale-95 transition"
          >
            <Icon name="arrow_back" size={18} />
          </button>

          <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 right-5">
            <span
              className="inline-block px-3 py-1 rounded-full text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold"
              style={{ background: `${data.accentHex}30`, color: data.accentHex }}
            >
              {data.emoji} {MOOD_LABELS[mood]} {musicLang === 'hindi' ? '· हिंदी' : ''}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold mt-2 truncate">{nowPlaying.title}</h1>
          </div>
        </div>

        <div className="px-4 sm:px-6 pb-12">
          <p className="text-white/50 text-[13px] sm:text-sm mt-3 sm:mt-4 mb-5 sm:mb-6">{data.quote}</p>

          {/* Now Playing */}
          <div className="glass rounded-2xl p-4 sm:p-5 mb-5 sm:mb-6 transition-all"
            style={isNowPlayingActive ? { border: `1px solid ${data.accentHex}40`, boxShadow: `0 0 30px ${data.accentHex}15` } : undefined}>
            <div className="flex items-center justify-between mb-4">
              <div className="min-w-0 flex-1 mr-3">
                <h4 className="text-[13px] sm:text-sm font-semibold truncate">{nowPlaying.title}</h4>
                <p className="text-[11px] sm:text-xs text-white/40 truncate">{nowPlaying.artist}</p>
              </div>
              <button
                onClick={handlePlay}
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg transition-all flex-shrink-0
                  ${isNowPlayingActive ? 'scale-110' : 'hover:scale-105 active:scale-95'}`}
                style={{
                  background: `linear-gradient(135deg, ${data.accentHex}, ${data.accentHex}cc)`,
                  boxShadow: isNowPlayingActive ? `0 8px 30px ${data.accentHex}60` : `0 8px 24px ${data.accentHex}40`,
                }}
              >
                <Icon name={isNowPlayingActive ? 'pause' : 'play_arrow'} size={22} />
              </button>
            </div>

            <div className="flex items-end justify-center gap-[2px] sm:gap-[3px] h-8 sm:h-10 mb-3">
              {Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[2px] sm:w-[2.5px] rounded-full transition-all duration-300"
                  style={{
                    height: isNowPlayingActive ? undefined : `${15 + Math.sin(i * 0.5) * 25 + 15}%`,
                    background: `linear-gradient(to top, ${data.accentHex}, ${data.accentHex}66)`,
                    animation: isNowPlayingActive ? `wave ${0.5 + (i % 7) * 0.08}s ease-in-out infinite ${i * 0.03}s` : 'none',
                    opacity: isNowPlayingActive ? 1 : 0.2,
                  }}
                />
              ))}
            </div>

            <div className="w-full h-1 rounded-full bg-surface-lighter overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: isNowPlayingActive ? '66%' : '0%', background: data.accentHex }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[9px] sm:text-[10px] text-white/30">{isNowPlayingActive ? '1:17' : '0:00'}</span>
              <span className="text-[9px] sm:text-[10px] text-white/30">3:42</span>
            </div>
          </div>

          {/* More playlists */}
          <h3 className="text-[13px] sm:text-sm font-bold mb-3">
            More for {MOOD_LABELS[mood]} {musicLang === 'hindi' ? '· हिंदी' : ''}
          </h3>
          <div className="space-y-2 mb-6">
            {playlists.map((pl, i) => {
              const active = isPlaylistActive(pl.videoId, pl.spotifyId);
              return (
                <button
                  key={i}
                  onClick={() => handlePlaylistTap(pl.videoId, pl.spotifyId)}
                  className={`w-full rounded-2xl p-3 flex items-center gap-3 transition-all text-left active:scale-[0.99]
                    ${active ? 'glass-elevated' : 'glass hover:bg-surface-light/50'}`}
                  style={active ? { border: `1px solid ${data.accentHex}35` } : undefined}
                >
                  <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={pl.thumb} alt={pl.title} className="w-full h-full object-cover" loading="lazy" />
                    {active && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="flex items-end gap-[1.5px] h-3">
                          {[0.5, 1, 0.6].map((_, j) => (
                            <div key={j} className="w-[2px] rounded-full bg-white"
                              style={{ animation: `wave ${0.4 + j * 0.12}s ease-in-out infinite ${j * 0.06}s` }} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[13px] sm:text-sm font-semibold truncate">{pl.title}</h4>
                    <p className="text-[10px] sm:text-[11px] text-white/40 truncate">{pl.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[9px] sm:text-[10px] text-white/30">{pl.bpm} BPM</span>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center" style={active ? { background: `${data.accentHex}30` } : { background: 'rgba(255,255,255,0.06)' }}>
                      <Icon name={active ? 'pause' : 'play_arrow'} size={14} style={active ? { color: data.accentHex } : undefined} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              const link = document.createElement('a');
              link.href = data.heroImage;
              link.target = '_blank';
              link.rel = 'noopener noreferrer';
              link.click();
              showToast('Opening wallpaper image — long-press to save');
            }}
            className="w-full py-3 rounded-2xl border border-border text-[13px] sm:text-sm font-medium hover:bg-surface-light active:scale-[0.98] transition flex items-center justify-center gap-2"
          >
            <Icon name="open_in_new" size={18} />
            Save Wallpaper
          </button>

          <button
            onClick={() => navigate('mood-home')}
            className="w-full mt-4 text-[13px] sm:text-sm text-white/40 hover:text-white active:scale-95 transition text-center py-2"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </ScreenWrapper>
  );
}
