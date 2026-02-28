import { useApp } from '../context/AppContext';
import Icon from '../components/Icon';
import ScreenWrapper from '../components/ScreenWrapper';

const STATS = [
  { icon: 'auto_awesome', label: 'Frequent Mood', value: 'Absolute Calm +14%' },
  { icon: 'audiotrack', label: 'Top Genre', value: 'Lo-fi Chill' },
  { icon: 'local_fire_department', label: 'Streak', value: '5 Days Active' },
];

export default function WeeklyRecap() {
  const { navigate, showToast } = useApp();

  const share = () => {
    if (navigator.share) {
      navigator.share({
        title: '91 Play Club Weekly Recap',
        text: 'Check out my week in 91 Play Club!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      showToast('Sharing is available on mobile devices');
    }
  };

  return (
    <ScreenWrapper>
      <div className="px-6 pt-14 pb-12 animate-fadeIn">
        <button
          onClick={() => navigate('mood-journey')}
          className="absolute top-6 right-6 p-2 rounded-full glass hover:bg-surface-light transition"
        >
          <Icon name="close" size={20} />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Icon name="graphic_eq" className="text-primary" size={20} />
          <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">91 Play Club Insights</span>
        </div>

        <h1 className="text-2xl font-bold mb-6">Insight Report</h1>
        <h2 className="text-base font-semibold text-text-dim mb-4">Weekly Summary</h2>

        {/* Week dots */}
        <div className="glass rounded-2xl p-5 mb-6">
          <h3 className="text-sm font-semibold mb-4">Your Week in Harmony</h3>
          <div className="flex items-center justify-center gap-3 mb-2">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className={`w-4 h-4 rounded-full transition ${i < 5 ? 'bg-primary shadow-lg shadow-primary/30' : 'bg-surface-lighter'}`} />
                <span className="text-[10px] text-text-dim">{d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-3 mb-8">
          {STATS.map(s => (
            <div key={s.icon} className="glass rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                <Icon name={s.icon} className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-[10px] text-text-dim uppercase tracking-wider">{s.label}</p>
                <p className="text-sm font-semibold">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={share}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] transition-all"
        >
          <Icon name="ios_share" size={18} />
          Share to Story
        </button>

        <button
          onClick={() => navigate('mood-home')}
          className="w-full mt-3 py-3 rounded-2xl border border-border text-sm font-medium hover:bg-surface-light transition"
        >
          Maybe later
        </button>

        <button
          onClick={() => navigate('mood-journey')}
          className="w-full mt-3 text-sm text-text-dim hover:text-white transition text-center py-2"
        >
          ← Back
        </button>
      </div>
    </ScreenWrapper>
  );
}
