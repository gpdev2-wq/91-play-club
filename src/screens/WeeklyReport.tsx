import { useMemo } from 'react';
import { useApp, MOOD_LABELS } from '../context/AppContext';
import { generateWeeklyReport } from '../services/analyticsEngine';
import { downloadExport } from '../services/moodHistory';
import Icon from '../components/Icon';
import ScreenWrapper from '../components/ScreenWrapper';

const MOOD_EMOJIS: Record<string, string> = {
  happy: '☀️', motivated: '🔥', calm: '🌊', sad: '🌧️',
  lonely: '🌙', angry: '⚡', anxious: '💨', inspired: '✨', tired: '😴',
};

export default function WeeklyReport() {
  const { navigate, showToast } = useApp();
  const report = useMemo(() => generateWeeklyReport(), []);

  const share = () => {
    if (navigator.share) {
      navigator.share({ title: '91 Play Club Report', text: `My streak: ${report.streak} days!`, url: window.location.href }).catch(() => {});
    } else {
      showToast('Sharing is available on mobile devices');
    }
  };

  return (
    <ScreenWrapper>
      <div className="px-5 pt-14 pb-12 animate-fadeIn">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('ai-insights')} className="p-1.5 rounded-xl glass hover:bg-surface-light transition">
              <Icon name="arrow_back" size={20} />
            </button>
            <div>
              <h1 className="text-lg font-bold">Weekly Report</h1>
              <p className="text-[11px] text-white/40">Personalized mood analysis</p>
            </div>
          </div>
          <button onClick={() => { downloadExport('csv'); showToast('Report downloaded!'); }} className="p-2 rounded-xl glass hover:bg-surface-light transition">
            <Icon name="download" size={18} />
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="glass rounded-2xl p-3 text-center">
            <p className="text-2xl font-bold text-primary">{report.streak}</p>
            <p className="text-[10px] text-white/40">Day Streak</p>
          </div>
          <div className="glass rounded-2xl p-3 text-center">
            <p className="text-2xl font-bold text-accent">{report.totalEntries}</p>
            <p className="text-[10px] text-white/40">Entries</p>
          </div>
          <div className="glass rounded-2xl p-3 text-center">
            <p className="text-2xl font-bold text-accent-teal">{report.avgEnergy}%</p>
            <p className="text-[10px] text-white/40">Avg Energy</p>
          </div>
        </div>

        {/* Top mood */}
        <div className="glass rounded-2xl p-5 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">Dominant Mood</h3>
            <span className="text-2xl">{MOOD_EMOJIS[report.topMood.mood] || '🎵'}</span>
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-2xl font-bold">{MOOD_LABELS[report.topMood.mood] || 'None'}</span>
            <span className="text-sm text-white/40">{report.topMood.percentage}% of entries</span>
          </div>

          {/* Mood distribution */}
          <div className="space-y-2">
            {report.moodFrequencies.slice(0, 4).map(mf => (
              <div key={mf.mood} className="flex items-center gap-3">
                <span className="text-xs w-20 text-white/50">{MOOD_LABELS[mf.mood]}</span>
                <div className="flex-1 h-2 rounded-full bg-surface-lighter overflow-hidden">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${mf.percentage}%` }} />
                </div>
                <span className="text-[10px] text-white/40 w-8 text-right">{mf.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Energy trend */}
        <div className="glass rounded-2xl p-5 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">Energy This Week</h3>
            <div className={`flex items-center gap-1 text-sm font-bold ${report.energyTrend >= 0 ? 'text-accent-teal' : 'text-accent'}`}>
              <Icon name={report.energyTrend >= 0 ? 'trending_up' : 'trending_down'} size={18} />
              {report.energyTrend >= 0 ? '+' : ''}{report.energyTrend}%
            </div>
          </div>

          <div className="flex items-end justify-between h-20 gap-2">
            {report.dailyAverages.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-lg bg-gradient-to-t from-primary to-primary-light transition-all"
                  style={{ height: `${Math.max(d.energy, 8)}%` }}
                />
                <span className="text-[9px] text-white/30">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <h3 className="text-sm font-semibold mb-3">Insights</h3>
        <div className="space-y-3 mb-6">
          {report.insights.map((insight, i) => (
            <div key={i} className="glass rounded-2xl p-4 flex gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${insight.color}20` }}>
                <Icon name={insight.icon} size={20} style={{ color: insight.color }} />
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-0.5">{insight.title}</h4>
                <p className="text-xs text-white/50 leading-relaxed">{insight.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Weather correlation */}
        {report.weatherCorrelation && (
          <div className="glass rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="cloud" className="text-accent-teal" size={18} />
              <h4 className="text-sm font-semibold">Weather & Mood</h4>
            </div>
            <p className="text-xs text-white/50">{report.weatherCorrelation}</p>
          </div>
        )}

        {/* Time patterns */}
        {report.timePatterns.length > 0 && (
          <div className="glass rounded-2xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="schedule" className="text-accent-amber" size={18} />
              <h4 className="text-sm font-semibold">Time Patterns</h4>
            </div>
            {report.timePatterns.map((p, i) => (
              <p key={i} className="text-xs text-white/50 mb-1">{p}</p>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={share}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <Icon name="ios_share" size={18} />
            Share Report
          </button>

          <button
            onClick={() => { downloadExport('csv'); showToast('CSV exported!'); }}
            className="w-full py-3 rounded-2xl border border-border text-sm font-medium hover:bg-surface-light transition flex items-center justify-center gap-2"
          >
            <Icon name="table_chart" size={18} />
            Export as CSV
          </button>

          <button
            onClick={() => { downloadExport('json'); showToast('JSON exported!'); }}
            className="w-full py-3 rounded-2xl border border-border text-sm font-medium hover:bg-surface-light transition flex items-center justify-center gap-2"
          >
            <Icon name="data_object" size={18} />
            Export Raw Data (JSON)
          </button>
        </div>
      </div>
    </ScreenWrapper>
  );
}
