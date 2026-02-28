import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { generateWeeklyReport } from '../services/analyticsEngine';
import Icon from '../components/Icon';
import BottomNav from '../components/BottomNav';
import ScreenWrapper from '../components/ScreenWrapper';

export default function AIInsights() {
  const { navigate } = useApp();
  const report = useMemo(() => generateWeeklyReport(), []);

  return (
    <ScreenWrapper withNav>
      <div className="px-5 pt-14 pb-6 animate-fadeIn">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Icon name="insights" size={18} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold">Smart summary</h2>
            <p className="text-[11px] text-white/50">
              Last 7 days in one glance
            </p>
          </div>
          <button
            onClick={() => navigate('weekly-report')}
            className="text-[11px] font-semibold uppercase tracking-wider text-primary hover:text-primary-light transition"
          >
            Full report
          </button>
        </div>

        {/* Hero summary card */}
        <div className="glass-elevated rounded-2xl p-5 mb-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[11px] text-white/40 uppercase tracking-wider mb-0.5">This week</p>
              <h3 className="text-base font-semibold">
                {report.streak} day streak · {report.totalEntries} entries
              </h3>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-white/40 mb-0.5">Avg energy</p>
              <p className="text-lg font-bold text-primary">{report.avgEnergy}%</p>
            </div>
          </div>
          <div className="mt-3 flex items-end gap-1.5 h-14">
            {report.dailyAverages.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-full bg-gradient-to-t from-primary to-primary-light"
                  style={{ height: `${Math.max(d.energy, 5)}%` }}
                />
                <span className="text-[9px] text-white/30">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key insights (top 3) */}
        <h3 className="text-sm font-semibold mb-3">Key insights</h3>
        <div className="space-y-3 mb-6">
          {report.insights.slice(0, 3).map((insight, i) => (
            <div key={i} className="glass rounded-2xl p-4 flex gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${insight.color}20` }}
              >
                <Icon name={insight.icon} size={20} style={{ color: insight.color }} />
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-0.5">{insight.title}</h4>
                <p className="text-xs text-white/50 leading-relaxed">{insight.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Patterns */}
        {(report.weatherCorrelation || report.timePatterns.length > 0) && (
          <div className="glass rounded-2xl p-5 mb-5">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="timeline" className="text-accent-amber" size={16} />
              <h3 className="text-sm font-semibold">Patterns</h3>
            </div>
            {report.weatherCorrelation && (
              <div className="flex items-start gap-2 mb-2">
                <Icon name="cloud" className="text-accent-teal" size={16} />
                <p className="text-xs text-white/50">{report.weatherCorrelation}</p>
              </div>
            )}
            {report.timePatterns.slice(0, 2).map((p, i) => (
              <div key={i} className="flex items-start gap-2 mb-2">
                <Icon name="schedule" className="text-accent-amber" size={16} />
                <p className="text-xs text-white/50">{p}</p>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => navigate('weekly-report')}
          className="w-full py-3 rounded-2xl border border-border text-sm font-medium hover:bg-surface-light transition"
        >
          View full weekly report
        </button>
      </div>
      <BottomNav />
    </ScreenWrapper>
  );
}
