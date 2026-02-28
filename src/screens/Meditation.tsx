import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import Icon from '../components/Icon';
import ScreenWrapper from '../components/ScreenWrapper';

const PHASES = [
  { name: 'Inhale', duration: 4000 },
  { name: 'Hold', duration: 2000 },
  { name: 'Exhale', duration: 4000 },
];

const SESSIONS = [
  { title: 'Deep Blue Drift', sub: '12 min · Guided Meditation', thumb: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=200&h=200&fit=crop', video: 'xuTTAhNBDg0' },
  { title: 'Neon Silence', sub: '8 min · Ambient Focus', thumb: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=200&h=200&fit=crop', video: '6LuEK7FgecE' },
  { title: 'Digital Horizon', sub: '15 min · Sleep Journey', thumb: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=200&h=200&fit=crop', video: '1ZYbU82GVz4' },
];

export default function Meditation() {
  const { navigate, playMusic } = useApp();
  const [phaseIndex, setPhaseIndex] = useState(0);
  const phase = PHASES[phaseIndex];

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhaseIndex(i => (i + 1) % PHASES.length);
    }, phase.duration);
    return () => clearTimeout(timer);
  }, [phaseIndex, phase.duration]);

  const scale = phase.name === 'Inhale' ? 1.3 : phase.name === 'Exhale' ? 1 : 1.15;

  return (
    <ScreenWrapper>
      <div className="px-6 pt-14 pb-12 animate-fadeIn">
        <p className="text-sm text-accent-teal font-medium mb-1">{phase.name} {phase.duration / 1000}s</p>
        <h1 className="text-2xl font-bold mb-2">Digital Zen Session</h1>
        <p className="text-text-dim text-sm mb-10">Follow the expanding light</p>

        {/* Breath Circle */}
        <div className="flex justify-center mb-12">
          <div className="relative w-44 h-44">
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-accent-teal/30 blur-xl transition-transform"
              style={{ transform: `scale(${scale})`, transitionDuration: `${phase.duration}ms` }}
            />
            <div
              className="absolute inset-4 rounded-full bg-gradient-to-br from-primary to-accent-teal transition-transform"
              style={{ transform: `scale(${scale * 0.8})`, transitionDuration: `${phase.duration}ms` }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold">{phase.name}</span>
            </div>
          </div>
        </div>

        {/* Curated Sessions */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold">Curated Sessions</h3>
          <span className="text-[10px] text-white/30">{SESSIONS.length} sessions</span>
        </div>

        <div className="space-y-3 mb-8">
          {SESSIONS.map(s => (
            <div key={s.video} className="glass rounded-2xl p-3 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                <img src={s.thumb} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold truncate">{s.title}</h4>
                <p className="text-xs text-text-dim truncate">{s.sub}</p>
              </div>
              <button
                onClick={() => playMusic(s.video)}
                className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition flex-shrink-0"
              >
                <Icon name="play_arrow" className="text-primary" size={20} />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => playMusic('6LuEK7FgecE')}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-accent-teal text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] transition-all"
        >
          <Icon name="play_circle" size={22} />
          START SESSION
        </button>

        <p className="text-[9px] text-white/20 text-center mt-6 leading-relaxed">
          For wellness purposes only. Not a substitute for professional medical advice.
        </p>

        <button
          onClick={() => navigate('mood-home')}
          className="w-full mt-4 text-sm text-text-dim hover:text-white transition text-center py-2"
        >
          ← Back
        </button>
      </div>
    </ScreenWrapper>
  );
}
