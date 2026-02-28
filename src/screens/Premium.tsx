import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Icon from '../components/Icon';
import ScreenWrapper from '../components/ScreenWrapper';

const FEATURES = [
  { icon: 'analytics', label: 'Deep Mood Analysis', desc: 'Advanced pattern recognition' },
  { icon: 'history', label: 'Unlimited Journal Entries', desc: 'No daily limits' },
  { icon: 'graphic_eq', label: 'Custom Soundscapes', desc: 'Personalized audio experiences' },
  { icon: 'timeline', label: 'Mood Journey History', desc: 'Full mood timeline access' },
  { icon: 'support_agent', label: 'Priority Support', desc: 'Faster response times' },
];

export default function Premium() {
  const { navigate, showToast } = useApp();

  const alreadySignedUp = localStorage.getItem('moodsync_premium_notify') === 'true';
  const [signedUp, setSignedUp] = useState(alreadySignedUp);

  const notifyMe = () => {
    localStorage.setItem('moodsync_premium_notify', 'true');
    setSignedUp(true);
    showToast('Saved! You\'ll be the first to know.');
  };

  return (
    <ScreenWrapper>
      <div className="animate-fadeIn">
        <div className="relative h-52 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=400&fit=crop"
            alt="" className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/60 to-dark" />
            <div className="absolute bottom-4 left-6">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="workspace_premium" className="text-accent-amber" size={24} />
              <span className="text-[10px] uppercase tracking-wider text-accent-amber font-semibold">Coming Soon</span>
            </div>
            <h1 className="text-2xl font-bold">91 Play Club+</h1>
          </div>
        </div>

        <div className="px-6 pb-12">
          <div className="mt-4 mb-6 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-accent-amber/10 border border-accent-amber/20">
            <Icon name="schedule" className="text-accent-amber" size={18} />
            <span className="text-sm text-accent-amber font-medium">Coming Soon</span>
          </div>

          <p className="text-text-dim text-sm mb-8">
            We're working on premium features to enhance your mood journey.
            Sign up to get notified when it launches.
          </p>

          <div className="glass rounded-2xl p-6 mb-6">
            <h3 className="text-sm font-semibold mb-4">What's included</h3>
            <div className="space-y-4">
              {FEATURES.map(f => (
                <div key={f.label} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-accent-amber/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={f.icon} className="text-accent-amber" size={18} />
                  </div>
                  <div>
                    <span className="text-sm font-medium">{f.label}</span>
                    <p className="text-[11px] text-white/40">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={signedUp ? undefined : notifyMe}
              className={`w-full mt-6 py-3.5 rounded-2xl font-semibold active:scale-[0.98] transition-all ${
                signedUp
                  ? 'bg-accent-teal/20 text-accent-teal border border-accent-teal/30 cursor-default'
                  : 'bg-gradient-to-r from-accent-amber to-orange-500 text-white hover:shadow-lg hover:shadow-accent-amber/25'
              }`}
            >
              {signedUp ? '✓ You\'ll Be Notified' : 'Notify Me When Available'}
            </button>
          </div>

          <button
            onClick={() => navigate('profile')}
            className="w-full text-sm text-text-dim hover:text-white transition text-center py-2"
          >
            ← Back
          </button>
        </div>
      </div>
    </ScreenWrapper>
  );
}
