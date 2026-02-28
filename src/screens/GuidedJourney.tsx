import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { JOURNEYS } from '../services/journeyTemplates';
import Icon from '../components/Icon';
import ScreenWrapper from '../components/ScreenWrapper';

const TYPE_ICONS: Record<string, string> = {
  breathwork: 'air', music: 'headphones', journal: 'edit_note',
  affirmation: 'format_quote', 'body-scan': 'accessibility_new',
};

export default function GuidedJourney() {
  const { activeJourneyId, navigate, playMusic, showToast } = useApp();
  const [activeStep, setActiveStep] = useState(0);
  const [timer, setTimer] = useState(0);
  const [journalText, setJournalText] = useState('');
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [started, setStarted] = useState(false);

  const journey = JOURNEYS.find(j => j.id === activeJourneyId);

  // Browse mode when no journey selected
  if (!journey) {
    return (
      <ScreenWrapper>
        <div className="px-5 pt-14 pb-12 animate-fadeIn">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate('mood-home')} className="p-1.5 rounded-xl glass hover:bg-surface-light transition">
              <Icon name="arrow_back" size={20} />
            </button>
            <div>
              <h1 className="text-lg font-bold">Guided Journeys</h1>
              <p className="text-[11px] text-white/40">Music + Breathwork + Journaling</p>
            </div>
          </div>

          <div className="space-y-4">
            {JOURNEYS.map(j => (
              <JourneyCard key={j.id} journey={j} />
            ))}
          </div>
        </div>
      </ScreenWrapper>
    );
  }

  const step = journey.steps[activeStep];
  const isLastStep = activeStep === journey.steps.length - 1;

  // Timer for current step
  useEffect(() => {
    if (!started || !step) return;
    setTimer(step.duration);
    const interval = setInterval(() => {
      setTimer(t => {
        if (t <= 1) { clearInterval(interval); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeStep, started, step]);

  // Breath cycle
  useEffect(() => {
    if (!started || step?.type !== 'breathwork' || !step.breathPattern) return;
    const pattern = step.breathPattern;
    setBreathPhase('inhale');

    const cycle = () => {
      const durations = { inhale: pattern.inhale * 1000, hold: pattern.hold * 1000, exhale: pattern.exhale * 1000 };
      setTimeout(() => setBreathPhase('hold'), durations.inhale);
      setTimeout(() => setBreathPhase('exhale'), durations.inhale + durations.hold);
      return durations.inhale + durations.hold + durations.exhale;
    };

    const total = cycle();
    const interval = setInterval(cycle, total);
    return () => clearInterval(interval);
  }, [activeStep, started, step]);

  // Play music for music steps
  useEffect(() => {
    if (started && step?.type === 'music' && step.videoId) {
      playMusic(step.videoId);
    }
  }, [activeStep, started]);

  const nextStep = useCallback(() => {
    if (isLastStep) {
      showToast('Journey complete! You did amazing.');
      navigate('mood-home');
    } else {
      setActiveStep(s => s + 1);
      setJournalText('');
    }
  }, [isLastStep, navigate, showToast]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  if (!started) {
    return (
      <ScreenWrapper>
        <div className="animate-fadeIn">
          <div className="relative h-56 overflow-hidden">
            <img src={journey.thumb} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-dark/30 via-dark/60 to-dark" />
            <button
              onClick={() => navigate('mood-home')}
              className="absolute top-6 left-5 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition"
            >
              <Icon name="arrow_back" size={18} />
            </button>
          </div>

          <div className="px-6 -mt-8 relative z-10 pb-12">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{journey.emoji}</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: journey.color }}>
                {journey.duration}
              </span>
            </div>
            <h1 className="text-2xl font-bold mb-2">{journey.title}</h1>
            <p className="text-sm text-white/50 mb-6">{journey.subtitle}</p>

            {/* Steps preview */}
            <div className="space-y-2 mb-8">
              {journey.steps.map((s, i) => (
                <div key={i} className="glass rounded-xl p-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${journey.color}20` }}>
                    <Icon name={TYPE_ICONS[s.type]} size={18} style={{ color: journey.color }} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold">{s.title}</h4>
                    <p className="text-[10px] text-white/40">{formatTime(s.duration)}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStarted(true)}
              className="w-full py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg"
              style={{ background: `linear-gradient(135deg, ${journey.color}, ${journey.color}cc)`, boxShadow: `0 8px 30px ${journey.color}40` }}
            >
              <Icon name="play_circle" size={24} />
              Begin Journey
            </button>

            <p className="text-[9px] text-white/20 text-center mt-4 leading-relaxed">
              For wellness purposes only. Not a substitute for professional medical advice.
            </p>
          </div>
        </div>
      </ScreenWrapper>
    );
  }

  const progress = ((activeStep + 1) / journey.steps.length) * 100;

  return (
    <ScreenWrapper>
      <div className="px-5 pt-10 pb-12 animate-fadeIn min-h-dvh flex flex-col">
        {/* Progress */}
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => { setStarted(false); setActiveStep(0); }} className="p-1.5 rounded-xl glass hover:bg-surface-light transition">
            <Icon name="close" size={18} />
          </button>
          <div className="flex-1 h-1.5 rounded-full bg-surface-lighter overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: journey.color }} />
          </div>
          <span className="text-[10px] text-white/40">{activeStep + 1}/{journey.steps.length}</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center">
          {/* Step type icon */}
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
            style={{ background: `${journey.color}20` }}>
            <Icon name={TYPE_ICONS[step.type]} size={32} style={{ color: journey.color }} />
          </div>

          <h2 className="text-xl font-bold mb-2">{step.title}</h2>
          <p className="text-sm text-white/50 leading-relaxed max-w-xs mb-8">{step.instruction}</p>

          {/* Breath circle */}
          {step.type === 'breathwork' && step.breathPattern && (
            <div className="relative w-36 h-36 mb-8">
              <div className="absolute inset-0 rounded-full transition-transform duration-1000"
                style={{
                  background: `radial-gradient(circle, ${journey.color}30, transparent)`,
                  transform: `scale(${breathPhase === 'inhale' ? 1.3 : breathPhase === 'hold' ? 1.15 : 1})`,
                }} />
              <div className="absolute inset-4 rounded-full flex items-center justify-center transition-transform duration-1000"
                style={{
                  background: `${journey.color}20`,
                  border: `2px solid ${journey.color}50`,
                  transform: `scale(${breathPhase === 'inhale' ? 1.2 : breathPhase === 'hold' ? 1.1 : 0.9})`,
                }}>
                <span className="text-sm font-bold capitalize">{breathPhase}</span>
              </div>
            </div>
          )}

          {/* Journal input */}
          {step.type === 'journal' && (
            <textarea
              value={journalText}
              onChange={e => setJournalText(e.target.value)}
              placeholder={step.journalPrompt}
              className="w-full h-36 glass rounded-2xl p-4 text-sm outline-none resize-none placeholder:text-white/30 focus:border-primary/50 transition mb-4"
            />
          )}

          {/* Timer */}
          <div className="text-3xl font-bold mb-2" style={{ color: journey.color }}>
            {formatTime(timer)}
          </div>
        </div>

        <button
          onClick={nextStep}
          className="w-full py-3.5 rounded-2xl text-white font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          style={{ background: journey.color }}
        >
          <Icon name={isLastStep ? 'check_circle' : 'skip_next'} size={20} />
          {isLastStep ? 'Complete Journey' : 'Next Step'}
        </button>
      </div>
    </ScreenWrapper>
  );
}

function JourneyCard({ journey }: { journey: typeof JOURNEYS[number] }) {
  const { startJourney } = useApp();

  return (
    <button
      onClick={() => startJourney(journey.id)}
      className="w-full rounded-2xl overflow-hidden text-left group"
    >
      <div className="relative h-36">
        <img src={journey.thumb} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="text-xl">{journey.emoji}</span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-base font-bold">{journey.title}</h3>
          <p className="text-[11px] text-white/50">{journey.subtitle} · {journey.duration}</p>
        </div>
        <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: `${journey.color}40` }}>
          <Icon name="play_arrow" size={20} />
        </div>
      </div>
    </button>
  );
}
