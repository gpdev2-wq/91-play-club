import { useMemo, useEffect, useState } from 'react';
import { useApp, MOOD_LABELS, type Mood, type MusicLang } from '../context/AppContext';
import { MOOD_DATA } from '../data/moodData';
import { getWeather, getGreeting, type WeatherData } from '../services/weatherService';
import Icon from '../components/Icon';
import BottomNav from '../components/BottomNav';
import ScreenWrapper from '../components/ScreenWrapper';

const MOODS: { mood: Mood; icon: string }[] = [
  { mood: 'happy', icon: 'sentiment_very_satisfied' },
  { mood: 'motivated', icon: 'bolt' },
  { mood: 'calm', icon: 'self_improvement' },
  { mood: 'sad', icon: 'rainy' },
  { mood: 'lonely', icon: 'nights_stay' },
  { mood: 'angry', icon: 'mode_heat' },
];

const LANG_OPTIONS: { id: MusicLang; label: string; flag: string }[] = [
  { id: 'english', label: 'English', flag: '🌍' },
  { id: 'hindi', label: 'हिंदी', flag: '🇮🇳' },
];

export default function MoodHome() {
  const { mood, setMood, navigate, playMusic, closeMusic, musicLang, setMusicLang, musicOpen, musicVideoId, musicSpotifyId, userName } = useApp();
  const data = useMemo(() => MOOD_DATA[mood], [mood]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const greeting = useMemo(() => getGreeting(), []);

  const nowPlaying = musicLang === 'hindi' ? data.hindiNowPlaying : data.nowPlaying;
  const playlists = musicLang === 'hindi' ? data.hindiPlaylists : data.playlists;

  const isNowPlayingActive = musicOpen && (musicVideoId === nowPlaying.videoId || musicSpotifyId === nowPlaying.spotifyId);

  const isPlaylistActive = (videoId: string, spotifyId: string) =>
    musicOpen && (musicVideoId === videoId || musicSpotifyId === spotifyId);

  const handleNowPlayingTap = () => {
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

  useEffect(() => { getWeather().then(setWeather); }, []);

  return (
    <ScreenWrapper withNav>
      <div className="animate-fadeIn">

        {/* ─── Hero ─── */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={data.heroImage} alt="" className="w-full h-full object-cover transition-all duration-700" key={mood} />
            <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-dark/70 to-dark" />
          </div>

          <div className="relative px-4 sm:px-6 pt-12 sm:pt-14 pb-6 sm:pb-8">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <button
                onClick={() => navigate('profile')}
                className="flex items-center gap-3 active:scale-95 transition-transform"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full ring-2 ring-white/30 shadow-md shadow-black/60 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-accent-teal opacity-80" />
                  <div className="relative w-7 h-7 rounded-full bg-black/80 flex items-center justify-center">
                    <span className="text-[11px] font-extrabold tracking-tight">91</span>
                    <div className="absolute -right-1 -bottom-1 w-4 h-4 rounded-full bg-white flex items-center justify-center shadow-md shadow-black/60">
                      <Icon name="play_arrow" size={11} className="text-primary" />
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-[10px] sm:text-[11px] text-white/60 uppercase tracking-wider">{greeting}</p>
                  <h2 className="text-sm font-semibold">
                    {userName ? (userName.split(' ')[0] || userName) : 'Player'}
                  </h2>
                </div>
              </button>
              <div className="flex items-center gap-1.5 sm:gap-2">
                {weather && (
                  <div className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
                    <span className="text-xs sm:text-sm">{weather.icon}</span>
                    <span className="text-[11px] sm:text-xs font-medium">{weather.temp}°</span>
                  </div>
                )}
                <button onClick={() => navigate('ai-insights')}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white/20 active:scale-95 transition">
                  <Icon name="insights" size={18} />
                </button>
              </div>
            </div>

            {/* Mood status + circular selector */}
            <div className="mb-4 sm:mb-6 flex flex-col items-center">
              <button
                onClick={() => {
                  const idx = MOODS.findIndex(m => m.mood === mood);
                  const next = MOODS[(idx + 1) % MOODS.length];
                  setMood(next.mood);
                }}
                className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-full flex items-center justify-center active:scale-95 transition-all duration-500"
                style={{
                  background: `radial-gradient(circle at 30% 0%, ${data.accentHex}70 0, transparent 55%), radial-gradient(circle at 70% 100%, ${data.accentHex}40 0, rgba(8,8,13,0.9) 60%)`,
                  boxShadow: `0 20px 60px ${data.accentHex}40, 0 0 0 1px rgba(255,255,255,0.08)`,
                }}
              >
                <div className="absolute inset-3 rounded-full border border-white/10" />
                <div className="absolute inset-1 rounded-full border border-white/5 opacity-40" />
                <div className="relative flex flex-col items-center justify-center text-center px-4">
                  <span className="text-3xl sm:text-4xl mb-1">{data.emoji}</span>
                  <span className={`text-[11px] sm:text-xs font-semibold uppercase tracking-wider bg-gradient-to-r ${data.gradient} bg-clip-text text-transparent`}>
                    {MOOD_LABELS[mood]}
                  </span>
                  <p className="text-[10px] sm:text-[11px] text-white/50 mt-1 leading-snug line-clamp-2">
                    {data.quote}
                  </p>
                  <span className="mt-2 text-[9px] text-white/30 tracking-wide">
                    Tap to change vibe
                  </span>
                </div>
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 sm:gap-3">
                {MOODS.map(m => {
                  const active = mood === m.mood;
                  const mData = MOOD_DATA[m.mood];
                  return (
                    <button
                      key={m.mood}
                      onClick={() => setMood(m.mood)}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 border border-white/10 ${
                        active ? 'scale-110 shadow-[0_0_0_1px_rgba(255,255,255,0.4)]' : 'opacity-70 hover:opacity-100'
                      }`}
                      style={active ? { background: `radial-gradient(circle, ${mData.accentHex}80 0, transparent 70%)` } : { background: 'rgba(15,15,25,0.9)' }}
                    >
                      <span className="text-xs sm:text-sm">{MOOD_DATA[m.mood].emoji}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Compact controls row ─── */}
        <div className="px-4 sm:px-6 -mt-1 mb-3 flex items-center gap-2">
          <div className="flex-1 flex gap-1.5 p-1 rounded-2xl bg-white/[0.04] border border-white/[0.06]">
            {LANG_OPTIONS.map(opt => {
              const active = musicLang === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setMusicLang(opt.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-1.5 rounded-xl text-[10px] sm:text-xs font-semibold transition-all duration-300
                    ${active
                      ? 'bg-white/[0.12] text-white shadow-sm border border-white/[0.1]'
                      : 'text-white/40 hover:text-white/70 active:scale-95'}`}
                >
                  <span className="text-xs sm:text-sm">{opt.flag}</span>
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── Now Playing ─── */}
        <div className="px-4 sm:px-6 mb-3 sm:mb-4">
          <button onClick={handleNowPlayingTap}
            className="w-full relative overflow-hidden rounded-2xl p-3.5 sm:p-4 transition-all active:scale-[0.98] group"
            style={{ background: `linear-gradient(135deg, ${data.accentHex}${isNowPlayingActive ? '30' : '22'}, ${data.accentHex}08)`, border: `1px solid ${data.accentHex}${isNowPlayingActive ? '50' : '30'}` }}>

            {isNowPlayingActive && (
              <div className="absolute inset-0 rounded-2xl animate-pulse" style={{ background: `${data.accentHex}08` }} />
            )}

            <div className="relative flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${data.accentHex}25` }}>
                <div className="flex items-end gap-[2px] sm:gap-[3px] h-4 sm:h-5">
                  {[0.6, 1, 0.4, 0.8, 0.5].map((h, i) => (
                    <div key={i} className="w-[2.5px] sm:w-[3px] rounded-full transition-all duration-300"
                      style={{
                        height: isNowPlayingActive ? undefined : `${h * 100}%`,
                        background: data.accentHex,
                        animation: isNowPlayingActive ? `wave ${0.5 + i * 0.12}s ease-in-out infinite ${i * 0.08}s` : 'none',
                        opacity: isNowPlayingActive ? 1 : 0.4,
                      }} />
                  ))}
                </div>
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-[9px] sm:text-[10px] uppercase tracking-widest font-medium mb-0.5" style={{ color: data.accentHex }}>
                  {isNowPlayingActive ? 'Now playing' : 'Tap to play'}
                </p>
                <h4 className="text-[13px] sm:text-sm font-bold truncate">{nowPlaying.title}</h4>
                <p className="text-[11px] sm:text-xs text-white/40 truncate">{nowPlaying.artist}</p>
              </div>
              <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300
                ${isNowPlayingActive ? 'scale-110' : 'group-hover:scale-110'}`}
                style={{ background: data.accentHex, boxShadow: isNowPlayingActive ? `0 0 20px ${data.accentHex}60` : 'none' }}>
                <Icon name={isNowPlayingActive ? 'pause' : 'play_arrow'} size={20} className="text-white" />
              </div>
            </div>
          </button>
        </div>

        {/* ─── Content ─── */}
        <div className="px-4 sm:px-6 pb-6 space-y-4 sm:space-y-5">
          {/* Playlists */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[15px] sm:text-base font-bold">Soundscapes for this vibe</h3>
              <p className="text-[10px] sm:text-[11px] text-white/40">
                {musicLang === 'hindi' ? 'हिंदी' : 'English'} · Curated for {MOOD_LABELS[mood]}
              </p>
            </div>
            <button onClick={() => navigate('sync-result')} className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider hover:text-white active:scale-95 transition" style={{ color: data.accentHex }}>
              See all
            </button>
          </div>

          <div className="flex gap-2.5 sm:gap-3 overflow-x-auto pb-1 -mx-4 sm:-mx-6 px-4 sm:px-6 scrollbar-none">
            {playlists.map((pl, i) => {
              const active = isPlaylistActive(pl.videoId, pl.spotifyId);
              return (
                <button key={`${mood}-${musicLang}-${i}`} onClick={() => navigate('sync-result')} className="flex-shrink-0 w-[130px] sm:w-[140px] group text-left">
                  <div className="relative w-[130px] sm:w-[140px] h-[130px] sm:h-[140px] rounded-2xl overflow-hidden mb-2">
                    <img src={pl.thumb} alt={pl.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {active && (
                      <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: `${data.accentHex}cc` }}>
                        <div className="flex items-end gap-[1.5px] h-2.5">
                          {[0.5, 1, 0.6].map((_, j) => (
                            <div key={j} className="w-[2px] rounded-full bg-white"
                              style={{ animation: `wave ${0.4 + j * 0.15}s ease-in-out infinite ${j * 0.08}s` }} />
                          ))}
                        </div>
                        <span className="text-[8px] font-bold text-white uppercase">Playing</span>
                      </div>
                    )}

                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                      <span className="text-[9px] sm:text-[10px] text-white/70 font-medium">{pl.bpm} BPM</span>
                      <button onClick={e => { e.stopPropagation(); handlePlaylistTap(pl.videoId, pl.spotifyId); }}
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all border border-white/10
                          ${active ? 'bg-white/40 backdrop-blur-md scale-110' : 'bg-white/20 backdrop-blur-md hover:bg-white/30 active:scale-90'}`}
                        style={active ? { boxShadow: `0 0 12px ${data.accentHex}50` } : undefined}>
                        <Icon name={active ? 'pause' : 'play_arrow'} size={14} />
                      </button>
                    </div>
                  </div>
                  <h4 className="text-[11px] sm:text-xs font-semibold truncate">{pl.title}</h4>
                  <p className="text-[9px] sm:text-[10px] text-white/40 truncate">{pl.subtitle}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <BottomNav />
    </ScreenWrapper>
  );
}
