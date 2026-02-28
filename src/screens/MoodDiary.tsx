import { useState, useEffect, useMemo } from 'react';
import { useApp, type Mood } from '../context/AppContext';
import { addEntry } from '../services/moodHistory';
import { getWeather, type WeatherData } from '../services/weatherService';
import Icon from '../components/Icon';
import BottomNav from '../components/BottomNav';
import ScreenWrapper from '../components/ScreenWrapper';

const DIARY_MOODS: { mood: Mood; icon: string }[] = [
  { mood: 'happy', icon: 'sentiment_very_satisfied' },
  { mood: 'sad', icon: 'sentiment_sad' },
  { mood: 'calm', icon: 'self_improvement' },
  { mood: 'anxious', icon: 'air' },
  { mood: 'inspired', icon: 'auto_awesome' },
  { mood: 'tired', icon: 'bedtime' },
  { mood: 'motivated', icon: 'bolt' },
  { mood: 'angry', icon: 'mode_heat' },
];

const TAGS = ['Grateful', 'Tired', 'Inspired', 'Productive', 'Wired', 'Anxious', 'Social', 'Creative'];

const CONTEXTS = [
  { label: 'Morning', icon: 'wb_sunny', value: 'morning' },
  { label: 'Afternoon', icon: 'wb_cloudy', value: 'afternoon' },
  { label: 'After Work', icon: 'work_off', value: 'after-work' },
  { label: 'Evening', icon: 'nightlight', value: 'evening' },
  { label: 'Post-Workout', icon: 'fitness_center', value: 'post-workout' },
  { label: 'Weekend', icon: 'weekend', value: 'weekend' },
];

export default function MoodDiary() {
  const { navigate, showToast } = useApp();
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [energy, setEnergy] = useState(50);
  const [pleasantness, setPleasantness] = useState(50);
  const [journal, setJournal] = useState('');
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [activeContexts, setActiveContexts] = useState<Set<string>>(new Set());
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => { getWeather().then(setWeather); }, []);

  const wordCount = useMemo(() => journal.trim().split(/\s+/).filter(Boolean).length, [journal]);

  const toggleTag = (tag: string) => {
    setActiveTags(prev => { const n = new Set(prev); n.has(tag) ? n.delete(tag) : n.add(tag); return n; });
  };

  const toggleContext = (ctx: string) => {
    setActiveContexts(prev => { const n = new Set(prev); n.has(ctx) ? n.delete(ctx) : n.add(ctx); return n; });
  };

  const handleSave = () => {
    if (!selectedMood) { showToast('Please select a mood first'); return; }

    addEntry({
      mood: selectedMood,
      energy,
      pleasantness,
      context: Array.from(activeContexts),
      journal,
      tags: Array.from(activeTags),
      weather: weather ? { temp: weather.temp, condition: weather.condition, icon: weather.icon } : undefined,
    });

    navigate('diary-saved');
  };

  return (
    <ScreenWrapper withNav>
      <div className="px-5 pt-14 pb-6 animate-fadeIn">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=64&h=64&fit=crop" alt="" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Daily Mood Diary</h2>
            <p className="text-xs text-white/40">How are you feeling right now?</p>
          </div>
          {weather && (
            <div className="ml-auto flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 text-[10px] text-white/40">
              <span>{weather.icon}</span> {weather.temp}°
            </div>
          )}
        </div>

        {/* Mood chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {DIARY_MOODS.map(m => (
            <button key={m.mood} onClick={() => setSelectedMood(m.mood)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all
                ${selectedMood === m.mood ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'glass hover:bg-surface-light'}`}>
              <Icon name={m.icon} size={18} />
              {m.mood.charAt(0).toUpperCase() + m.mood.slice(1)}
            </button>
          ))}
        </div>

        {/* Energy & Pleasantness Sliders */}
        <div className="glass rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="psychology" className="text-primary" size={18} />
            <h3 className="text-sm font-semibold">Emotional Compass</h3>
          </div>

          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-white/50">Energy Level</span>
              <span className="text-xs font-bold text-primary">{energy}%</span>
            </div>
            <input
              type="range" min="0" max="100" value={energy}
              onChange={e => setEnergy(Number(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none bg-surface-lighter cursor-pointer accent-primary"
            />
            <div className="flex justify-between mt-1">
              <span className="text-[9px] text-white/30">Low / Drained</span>
              <span className="text-[9px] text-white/30">High / Wired</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-white/50">Pleasantness</span>
              <span className="text-xs font-bold text-accent-teal">{pleasantness}%</span>
            </div>
            <input
              type="range" min="0" max="100" value={pleasantness}
              onChange={e => setPleasantness(Number(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none bg-surface-lighter cursor-pointer accent-accent-teal"
            />
            <div className="flex justify-between mt-1">
              <span className="text-[9px] text-white/30">Negative / Unpleasant</span>
              <span className="text-[9px] text-white/30">Positive / Pleasant</span>
            </div>
          </div>
        </div>

        {/* Context */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-3">When is this?</h4>
          <div className="flex flex-wrap gap-2">
            {CONTEXTS.map(c => (
              <button key={c.value} onClick={() => toggleContext(c.value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all
                  ${activeContexts.has(c.value) ? 'bg-primary/20 text-primary border border-primary/40' : 'glass hover:bg-surface-light'}`}>
                <Icon name={c.icon} size={14} />
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Journal */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-semibold mb-2">
            <Icon name="edit_note" size={18} className="text-primary" />
            Journal Entry
          </label>
          <textarea value={journal} onChange={e => setJournal(e.target.value)}
            placeholder="How's your day going? Share your thoughts..."
            maxLength={2000}
            className="w-full h-28 glass rounded-2xl p-4 text-sm outline-none resize-none placeholder:text-white/30 focus:border-primary/50 transition" />
          <p className="text-[11px] text-white/30 mt-1 text-right">{wordCount}/500 words</p>
        </div>

        {/* Tags */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold mb-3">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {TAGS.map(tag => (
              <button key={tag} onClick={() => toggleTag(tag)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all
                  ${activeTags.has(tag) ? 'bg-primary/20 text-primary border border-primary/40' : 'glass hover:bg-surface-light'}`}>
                {tag}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleSave}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] transition-all">
          Save Entry
        </button>
      </div>
      <BottomNav />
    </ScreenWrapper>
  );
}
