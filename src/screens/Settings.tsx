import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import Icon from '../components/Icon';
import ScreenWrapper from '../components/ScreenWrapper';

const PREFS_KEY = 'moodsync_prefs';

interface Prefs {
  dailyReminder: boolean;
  reminderTime: string;
  soundEffects: boolean;
  haptics: boolean;
  darkMode: boolean;
  compactCards: boolean;
  showWeather: boolean;
  autoPlayMusic: boolean;
  lockScreenWidget: boolean;
}

const DEFAULT_PREFS: Prefs = {
  dailyReminder: true,
  reminderTime: '20:00',
  soundEffects: true,
  haptics: true,
  darkMode: true,
  compactCards: false,
  showWeather: true,
  autoPlayMusic: false,
  lockScreenWidget: false,
};

function loadPrefs(): Prefs {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    return raw ? { ...DEFAULT_PREFS, ...JSON.parse(raw) } : DEFAULT_PREFS;
  } catch {
    return DEFAULT_PREFS;
  }
}

function savePrefs(prefs: Prefs) {
  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
}

type SettingsTab = 'notifications' | 'appearance' | 'privacy';

export default function Settings() {
  const { goBack, navigate, showToast } = useApp();
  const [prefs, setPrefs] = useState<Prefs>(loadPrefs);
  const [tab, setTab] = useState<SettingsTab>('notifications');

  useEffect(() => { savePrefs(prefs); }, [prefs]);

  const toggle = (key: keyof Prefs) => {
    setPrefs(p => ({ ...p, [key]: !p[key] }));
  };

  const TABS: { id: SettingsTab; label: string; icon: string }[] = [
    { id: 'notifications', label: 'Alerts', icon: 'notifications' },
    { id: 'appearance', label: 'Display', icon: 'palette' },
    { id: 'privacy', label: 'Privacy', icon: 'lock' },
  ];

  return (
    <ScreenWrapper>
      <div className="px-5 pt-14 pb-12 animate-fadeIn">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={goBack} className="p-1.5 rounded-xl glass hover:bg-surface-light transition">
            <Icon name="arrow_back" size={20} />
          </button>
          <h1 className="text-lg font-bold">Settings</h1>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1.5 p-1 rounded-2xl bg-white/[0.04] border border-white/[0.06] mb-6">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all
                ${tab === t.id
                  ? 'bg-white/[0.1] text-white shadow-sm border border-white/[0.1]'
                  : 'text-white/40 hover:text-white/60'}`}
            >
              <Icon name={t.icon} size={16} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Notifications Tab */}
        {tab === 'notifications' && (
          <div className="space-y-3 animate-fadeIn">
            <ToggleRow
              icon="notifications_active"
              label="Daily Mood Reminder"
              description="Get reminded to log your mood"
              value={prefs.dailyReminder}
              onChange={() => toggle('dailyReminder')}
            />

            {prefs.dailyReminder && (
              <div className="glass rounded-2xl px-4 py-3.5 flex items-center gap-3">
                <Icon name="schedule" className="text-white/40" size={20} />
                <div className="flex-1">
                  <span className="text-sm font-medium">Reminder Time</span>
                  <p className="text-[10px] text-white/40">When to send your daily reminder</p>
                </div>
                <input
                  type="time"
                  value={prefs.reminderTime}
                  onChange={e => setPrefs(p => ({ ...p, reminderTime: e.target.value }))}
                  className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-sm text-white outline-none"
                />
              </div>
            )}

            <ToggleRow
              icon="volume_up"
              label="Sound Effects"
              description="Play sounds for interactions"
              value={prefs.soundEffects}
              onChange={() => toggle('soundEffects')}
            />

            <ToggleRow
              icon="vibration"
              label="Haptic Feedback"
              description="Vibration on button taps"
              value={prefs.haptics}
              onChange={() => toggle('haptics')}
            />
          </div>
        )}

        {/* Appearance Tab */}
        {tab === 'appearance' && (
          <div className="space-y-3 animate-fadeIn">
            <ToggleRow
              icon="dark_mode"
              label="Dark Mode"
              description="Always on (optimized for dark theme)"
              value={prefs.darkMode}
              onChange={() => {
                showToast('Dark mode is the default and recommended theme');
              }}
            />

            <ToggleRow
              icon="view_compact"
              label="Compact Cards"
              description="Show smaller playlist and mood cards"
              value={prefs.compactCards}
              onChange={() => toggle('compactCards')}
            />

            <ToggleRow
              icon="cloud"
              label="Show Weather"
              description="Display weather on home and diary screens"
              value={prefs.showWeather}
              onChange={() => toggle('showWeather')}
            />

            <ToggleRow
              icon="play_circle"
              label="Auto-Play Music"
              description="Automatically play suggested tracks"
              value={prefs.autoPlayMusic}
              onChange={() => toggle('autoPlayMusic')}
            />
          </div>
        )}

        {/* Privacy Tab */}
        {tab === 'privacy' && (
          <div className="space-y-3 animate-fadeIn">
            <div className="glass rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <Icon name="security" className="text-accent-teal flex-shrink-0" size={20} />
                <div>
                  <h4 className="text-sm font-semibold mb-1">Your Data is Local</h4>
                  <p className="text-xs text-white/50 leading-relaxed">
                    All mood data is stored on your device. Nothing is sent to external servers. Only weather and music services use network connections.
                  </p>
                </div>
              </div>
            </div>

            <ToggleRow
              icon="location_on"
              label="Location for Weather"
              description="Use your location to show local weather"
              value={prefs.showWeather}
              onChange={() => toggle('showWeather')}
            />

            <button
              onClick={() => navigate('privacy-policy')}
              className="w-full glass rounded-2xl px-4 py-3.5 flex items-center gap-3 hover:bg-surface-light/50 transition text-left"
            >
              <Icon name="policy" className="text-white/40" size={20} />
              <span className="text-sm font-medium flex-1">Privacy Policy</span>
              <Icon name="chevron_right" className="text-white/30" size={18} />
            </button>

            <button
              onClick={() => navigate('privacy-policy')}
              className="w-full glass rounded-2xl px-4 py-3.5 flex items-center gap-3 hover:bg-surface-light/50 transition text-left"
            >
              <Icon name="description" className="text-white/40" size={20} />
              <span className="text-sm font-medium flex-1">Terms of Service</span>
              <Icon name="chevron_right" className="text-white/30" size={18} />
            </button>

            <button
              onClick={() => {
                const keys = Object.keys(localStorage).filter(k => k.startsWith('moodsync') && k !== 'moodsync_state');
                const count = keys.length;
                keys.forEach(k => localStorage.removeItem(k));
                showToast(`Cleared ${count} cached data items`);
              }}
              className="w-full glass rounded-2xl px-4 py-3.5 flex items-center gap-3 hover:bg-surface-light/50 transition text-left"
            >
              <Icon name="delete_sweep" className="text-accent" size={20} />
              <span className="text-sm font-medium flex-1">Clear Cache</span>
              <Icon name="chevron_right" className="text-white/30" size={18} />
            </button>
          </div>
        )}

        <button
          onClick={goBack}
          className="w-full mt-8 text-sm text-text-dim hover:text-white transition text-center py-2"
        >
          ← Back
        </button>
      </div>
    </ScreenWrapper>
  );
}

function ToggleRow({ icon, label, description, value, onChange }: {
  icon: string; label: string; description: string; value: boolean; onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className="w-full glass rounded-2xl px-4 py-3.5 flex items-center gap-3 hover:bg-surface-light/50 transition text-left"
    >
      <Icon name={icon} className="text-white/40" size={20} />
      <div className="flex-1 min-w-0">
        <span className="text-sm font-medium">{label}</span>
        <p className="text-[10px] text-white/40">{description}</p>
      </div>
      <div className={`w-11 h-6 rounded-full transition-all duration-300 flex items-center ${value ? 'bg-primary justify-end' : 'bg-white/10 justify-start'}`}>
        <div className={`w-5 h-5 rounded-full mx-0.5 transition-all duration-300 ${value ? 'bg-white shadow-md' : 'bg-white/30'}`} />
      </div>
    </button>
  );
}
