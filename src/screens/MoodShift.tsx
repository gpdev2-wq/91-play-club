import { useState, useMemo } from 'react';
import { useApp, MOOD_LABELS, type Mood } from '../context/AppContext';
import { MOOD_DATA } from '../data/moodData';
import { generateShiftPlaylist } from '../services/moodShiftEngine';
import Icon from '../components/Icon';
import ScreenWrapper from '../components/ScreenWrapper';

const ALL_MOODS: Mood[] = ['happy', 'motivated', 'calm', 'sad', 'lonely', 'angry', 'anxious', 'inspired', 'tired'];

const MOOD_ICONS: Record<Mood, string> = {
  happy: 'sentiment_very_satisfied', motivated: 'bolt', calm: 'self_improvement',
  sad: 'rainy', lonely: 'nights_stay', angry: 'mode_heat',
  anxious: 'air', inspired: 'auto_awesome', tired: 'bedtime',
};

const PHASE_LABELS = { match: 'Matching You', transition: 'Shifting', target: 'Destination' };
const PHASE_COLORS = { match: '#ef4444', transition: '#f59e0b', target: '#00d4aa' };

export default function MoodShift() {
  const { mood, navigate, playMusic, showToast } = useApp();
  const [step, setStep] = useState<'select' | 'preview' | 'playing'>('select');
  const [targetMood, setTargetMood] = useState<Mood | null>(null);

  const availableTargets = ALL_MOODS.filter(m => m !== mood);

  const playlist = useMemo(() => {
    if (!targetMood) return null;
    return generateShiftPlaylist(mood, targetMood);
  }, [mood, targetMood]);

  const fromData = MOOD_DATA[mood];
  const toData = targetMood ? MOOD_DATA[targetMood] : null;

  return (
    <ScreenWrapper>
      <div className="px-5 pt-14 pb-12 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate('mood-home')} className="p-1.5 rounded-xl glass hover:bg-surface-light transition">
            <Icon name="arrow_back" size={20} />
          </button>
          <div>
            <h1 className="text-lg font-bold">Mood Shift</h1>
            <p className="text-[11px] text-white/40">Gradual emotional transition through music</p>
          </div>
        </div>

        {/* Current mood indicator */}
        <div className="mt-6 mb-6 flex items-center gap-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${fromData.gradient} flex items-center justify-center shadow-lg`}>
            <Icon name={MOOD_ICONS[mood]} size={28} filled />
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-white/40 uppercase tracking-wider">Current state</p>
            <h3 className="text-base font-bold">{MOOD_LABELS[mood]}</h3>
            <p className="text-xs text-white/50">{fromData.quote}</p>
          </div>
        </div>

        {step === 'select' && (
          <>
            <h3 className="text-sm font-semibold mb-4">Where do you want to be?</h3>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {availableTargets.map(m => {
                const mData = MOOD_DATA[m];
                const selected = targetMood === m;
                return (
                  <button
                    key={m}
                    onClick={() => setTargetMood(m)}
                    className={`rounded-2xl p-4 flex items-center gap-3 transition-all duration-200 text-left
                      ${selected
                        ? `bg-gradient-to-br ${mData.gradient} shadow-lg scale-[1.02]`
                        : 'glass hover:bg-surface-light/50 active:scale-[0.97]'}`}
                  >
                    <Icon name={MOOD_ICONS[m]} size={22} filled={selected} />
                    <div>
                      <span className="text-sm font-semibold">{MOOD_LABELS[m]}</span>
                      <span className="text-[10px] text-white/40 block">{mData.emoji}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {targetMood && (
              <button
                onClick={() => setStep('preview')}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] transition-all"
              >
                <Icon name="auto_awesome" size={20} />
                Generate Shift Playlist
              </button>
            )}
          </>
        )}

        {step === 'preview' && playlist && toData && (
          <>
            {/* Journey visualization */}
            <div className="flex items-center justify-between my-6">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${fromData.gradient} flex items-center justify-center`}>
                  <Icon name={MOOD_ICONS[mood]} size={20} filled />
                </div>
                <span className="text-[10px] mt-1 text-white/50">{MOOD_LABELS[mood]}</span>
              </div>

              <div className="flex-1 mx-4 flex items-center">
                <div className="flex-1 h-0.5 bg-gradient-to-r from-white/20 via-primary/60 to-white/20" />
                <Icon name="arrow_forward" size={16} className="text-primary mx-1" />
                <div className="flex-1 h-0.5 bg-gradient-to-r from-white/20 via-primary/60 to-white/20" />
              </div>

              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${toData.gradient} flex items-center justify-center`}>
                  <Icon name={MOOD_ICONS[targetMood!]} size={20} filled />
                </div>
                <span className="text-[10px] mt-1 text-white/50">{MOOD_LABELS[targetMood!]}</span>
              </div>
            </div>

            <div className="glass rounded-2xl p-4 mb-4">
              <p className="text-xs text-white/50 leading-relaxed">{playlist.description}</p>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary font-medium">
                  {playlist.duration}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-teal/15 text-accent-teal font-medium">
                  {playlist.tracks.length} tracks
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/15 text-accent font-medium">
                  Gradual Shift
                </span>
              </div>
            </div>

            {/* Track list */}
            <div className="space-y-2 mb-6">
              {playlist.tracks.map((track, i) => (
                <button
                  key={i}
                  onClick={() => { playMusic(track.videoId); setStep('playing'); }}
                  className="w-full glass rounded-xl p-3 flex items-center gap-3 hover:bg-surface-light/50 transition text-left"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{ background: `${PHASE_COLORS[track.phase]}20`, color: PHASE_COLORS[track.phase] }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold truncate">{track.title}</h4>
                    <p className="text-[10px] text-white/40 truncate">{track.artist}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-[10px] text-white/30 block">{track.bpm} BPM</span>
                    <span className="text-[9px] font-semibold" style={{ color: PHASE_COLORS[track.phase] }}>
                      {PHASE_LABELS[track.phase]}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => { playMusic(playlist.tracks[0].videoId); setStep('playing'); showToast('Mood shift session started!'); }}
              className="w-full py-3.5 rounded-2xl text-white font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
              style={{ background: `linear-gradient(135deg, ${fromData.accentHex}, ${toData.accentHex})` }}
            >
              <Icon name="play_circle" size={22} />
              Begin Shift Session
            </button>
          </>
        )}

        {step === 'playing' && playlist && toData && (
          <div className="mt-8 text-center">
            <div className="relative w-40 h-40 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full blur-2xl opacity-30"
                style={{ background: `linear-gradient(135deg, ${fromData.accentHex}, ${toData.accentHex})`, animation: 'breathe 4s ease-in-out infinite' }} />
              <div className="absolute inset-2 rounded-full flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${fromData.accentHex}40, ${toData.accentHex}40)`, border: `2px solid ${toData.accentHex}40` }}>
                <div className="text-center">
                  <Icon name="graphic_eq" size={36} style={{ color: toData.accentHex }} />
                  <p className="text-xs text-white/60 mt-1">Shifting...</p>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-2">Session Active</h2>
            <p className="text-sm text-white/50 mb-8">
              Moving from {MOOD_LABELS[mood]} → {MOOD_LABELS[targetMood!]}
            </p>

            <div className="space-y-2 mb-8">
              {playlist.tracks.map((track, i) => (
                <button
                  key={i}
                  onClick={() => playMusic(track.videoId)}
                  className="w-full glass rounded-xl p-3 flex items-center gap-3 hover:bg-surface-light/50 transition text-left"
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: PHASE_COLORS[track.phase] }} />
                  <span className="text-sm flex-1 truncate">{track.title}</span>
                  <Icon name="play_arrow" size={18} className="text-white/40" />
                </button>
              ))}
            </div>

            <button
              onClick={() => { navigate('mood-home'); showToast('Mood shift complete! How do you feel?'); }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-accent-teal to-primary text-white font-semibold active:scale-[0.98] transition-all"
            >
              Complete Session
            </button>
          </div>
        )}

        {step !== 'select' && (
          <button
            onClick={() => setStep('select')}
            className="w-full mt-3 text-sm text-white/40 hover:text-white transition text-center py-2"
          >
            ← Change target mood
          </button>
        )}
      </div>
    </ScreenWrapper>
  );
}
