import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { getEntries, getStreak, getEntriesForRange } from '../services/moodHistory';
import Icon from '../components/Icon';
import BottomNav from '../components/BottomNav';
import ScreenWrapper from '../components/ScreenWrapper';

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export default function MoodJourney() {
  const { navigate } = useApp();
  const streak = useMemo(() => getStreak(), []);
  const totalEntries = useMemo(() => getEntries().length, []);

  const weeklyFlow = useMemo(() => {
    const entries = getEntriesForRange(7);
    return DAYS.map((_, i) => {
      const dayIndex = i === 6 ? 0 : i + 1;
      const dayEntries = entries.filter(e => new Date(e.timestamp).getDay() === dayIndex);
      if (dayEntries.length === 0) return 0;
      return Math.round(dayEntries.reduce((s, e) => s + e.energy, 0) / dayEntries.length);
    });
  }, []);

  const dominantMood = useMemo(() => {
    const entries = getEntriesForRange(7);
    if (entries.length === 0) return 'No data yet';
    const counts: Record<string, number> = {};
    entries.forEach(e => { counts[e.mood] = (counts[e.mood] || 0) + 1; });
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    return top ? `Mostly ${top[0].charAt(0).toUpperCase() + top[0].slice(1)}` : 'No data yet';
  }, []);

  return (
    <ScreenWrapper withNav>
      <div className="px-5 pt-14 pb-6 animate-fadeIn">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1557683316-973673baf926?w=64&h=64&fit=crop" alt="" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-lg font-bold">Your Mood Journey</h2>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-2 mb-6">
          <div className="glass rounded-full px-4 py-2 flex items-center gap-2">
            <Icon name="local_fire_department" className="text-accent" size={20} />
            <span className="text-sm font-semibold">{streak} Day Streak</span>
          </div>
          <div className="glass rounded-full px-4 py-2 flex items-center gap-2">
            <Icon name="edit_note" className="text-primary" size={20} />
            <span className="text-sm font-semibold">{totalEntries} Entries</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="glass rounded-2xl p-4 flex items-center gap-3">
            <Icon name="auto_awesome" className="text-accent-teal" size={22} />
            <span className="text-sm font-medium">{dominantMood}</span>
          </div>
          <div className="glass rounded-2xl p-4 flex items-center gap-3">
            <Icon name="insights" className="text-primary" size={22} />
            <span className="text-sm font-medium">Trending Up</span>
          </div>
        </div>

        {/* Emotional Flow Chart */}
        <div className="glass rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-semibold">Weekly Energy</h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-semibold">This Week</span>
          </div>
          <p className="text-xs text-text-dim mb-4">Average energy level per day</p>

          <div className="flex items-end justify-between h-24 gap-2">
            {weeklyFlow.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-lg bg-gradient-to-t from-primary to-primary-light transition-all"
                  style={{ height: `${Math.max(v, 4)}%` }}
                />
                <span className="text-[9px] text-text-dim">{DAYS[i]}</span>
              </div>
            ))}
          </div>

          {totalEntries === 0 && (
            <p className="text-xs text-white/30 text-center mt-3">Start logging moods to see your weekly energy chart</p>
          )}
        </div>

        {/* Progress */}
        <div className="glass rounded-2xl p-5 mb-6 border-accent-amber/20">
          <div className="flex items-center gap-3">
            <Icon name="emoji_events" className="text-accent-amber" size={28} />
            <div>
              <h4 className="text-sm font-bold">
                {streak >= 7 ? 'Week Warrior' : streak >= 3 ? 'Building Momentum' : 'Getting Started'}
              </h4>
              <p className="text-xs text-text-dim">
                {streak >= 7
                  ? `Amazing! ${streak} days of consistent mood tracking.`
                  : streak >= 3
                    ? `${streak} day streak! Keep going to unlock deeper insights.`
                    : 'Log your mood daily to build a streak and discover patterns.'}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('weekly-recap')}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] transition-all"
        >
          View Full Report
        </button>

        <button
          onClick={() => navigate('mood-home')}
          className="w-full mt-3 text-sm text-text-dim hover:text-white transition text-center py-2"
        >
          ← Back to Home
        </button>
      </div>
      <BottomNav />
    </ScreenWrapper>
  );
}
