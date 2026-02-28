import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Splash() {
  const { navigate } = useApp();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        const next = p + Math.random() * 14 + 5;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate('onboarding'), 400);
          return 100;
        }
        return next;
      });
    }, 180);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center relative overflow-hidden bg-dark">
      <div className="absolute w-80 h-80 rounded-full bg-primary/10 blur-[120px] -top-20 -left-20" style={{ animation: 'float 6s ease-in-out infinite' }} />
      <div className="absolute w-64 h-64 rounded-full bg-accent/10 blur-[100px] -bottom-10 -right-10" style={{ animation: 'float 8s ease-in-out infinite 1s' }} />

      <div className="relative z-10 flex flex-col items-center gap-8 animate-fadeIn">
        <div className="relative w-20 h-20">
          <div className="absolute inset-[-8px] rounded-full border border-primary/20" style={{ animation: 'pulse-ring 2.5s ease-in-out infinite' }} />
          <div className="w-20 h-20 rounded-[22px] bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl shadow-primary/20">
            <span className="text-3xl">🎵</span>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">Mood</span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Sync</span>
          </h1>
          <p className="text-white/30 text-xs mt-1.5 tracking-[0.2em] uppercase">Sync your vibe</p>
        </div>

        <div className="w-48">
          <div className="h-[3px] rounded-full bg-white/[0.04] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[10px] text-white/20 mt-3 text-center font-medium tracking-wider">
            {Math.floor(progress)}%
          </p>
        </div>
      </div>
    </div>
  );
}
