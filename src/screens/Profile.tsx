import { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { getEntries, getStreak, downloadExport } from '../services/moodHistory';
import { isConnected as isSpotifyConnected } from '../services/spotifyAuth';
import Icon from '../components/Icon';
import BottomNav from '../components/BottomNav';
import ScreenWrapper from '../components/ScreenWrapper';

export default function Profile() {
  const { navigate, logout, showToast, userName, userEmail } = useApp();
  const totalEntries = useMemo(() => getEntries().length, []);
  const streak = useMemo(() => getStreak(), []);
  const spotifyConnected = useMemo(() => isSpotifyConnected(), []);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const deleteAllData = () => {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('moodsync'));
    keys.forEach(k => localStorage.removeItem(k));
    showToast('All data deleted successfully');
    setShowDeleteConfirm(false);
    setTimeout(() => logout(), 1000);
  };

  return (
    <ScreenWrapper withNav>
      <div className="px-5 pt-14 pb-6 animate-fadeIn">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Icon name="sports_esports" className="text-primary" size={24} />
            <div>
              <h2 className="text-lg font-bold">Player Profile</h2>
              {userEmail && <p className="text-[11px] text-white/40 truncate max-w-[180px]">{userEmail}</p>}
            </div>
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 text-white/40 uppercase tracking-wider">
            {userName ? 'Signed in' : 'Guest'}
          </span>
        </div>

        {/* Profile Card */}
        <div className="glass rounded-2xl p-6 flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full ring-4 ring-primary/40 shadow-xl shadow-black/70 mb-3 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-accent-teal opacity-80" />
            <div className="relative w-14 h-14 rounded-full bg-black/80 flex items-center justify-center">
              <span className="text-2xl font-extrabold tracking-tight">91</span>
              <div className="absolute -right-1.5 -bottom-1.5 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md shadow-black/60">
                <Icon name="play_arrow" size={16} className="text-primary" />
              </div>
            </div>
          </div>
          <h3 className="text-base font-bold">
            {userName || '91 Play Club Member'}
          </h3>
          <p className="text-xs text-white/40">Your gaming & events hub</p>

          <div className="flex gap-6 mt-5">
            <div className="text-center px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-sm font-semibold text-primary">{totalEntries}</div>
              <div className="text-[10px] text-white/40">Sessions logged</div>
            </div>
            <div className="text-center px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-sm font-semibold text-accent">{streak}</div>
              <div className="text-[10px] text-white/40">Day streak</div>
            </div>
            <div className="text-center px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-sm font-semibold text-accent-teal">
                {totalEntries > 0 ? Math.min(totalEntries * 7, 100) : 0}%
              </div>
              <div className="text-[10px] text-white/40">Completion</div>
            </div>
          </div>
        </div>

        {/* Club Hub */}
        <div className="glass rounded-2xl p-5 mb-6 space-y-2.5">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="hub" className="text-primary" size={18} />
            <h3 className="text-sm font-semibold">Club hub</h3>
          </div>

          {/* Spotify */}
          <button
            onClick={() => navigate('spotify-connect')}
            className="w-full rounded-xl px-3.5 py-3 flex items-center gap-3 hover:bg-surface-light/60 transition text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-[#1DB954]/15 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <circle cx="12" cy="12" r="12" fill="#1DB954" />
                <path
                  d="M16.5 15.5c-.2 0-.4-.1-.5-.2-2.1-1.3-4.8-1.6-7.9-.9-.3.1-.6-.1-.7-.4-.1-.3.1-.6.4-.7 3.4-.8 6.4-.4 8.8 1 .3.2.4.5.2.8-.1.3-.2.4-.3.4z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">Spotify</p>
              <p className="text-[10px] text-white/40 truncate">
                Connect your library for smarter soundscapes
              </p>
            </div>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                spotifyConnected ? 'bg-accent-teal/15 text-accent-teal' : 'bg-white/5 text-white/40'
              }`}
            >
              {spotifyConnected ? 'Connected' : 'Connect'}
            </span>
          </button>

          {/* Weekly report */}
          <button
            onClick={() => navigate('weekly-report')}
            className="w-full rounded-xl px-3.5 py-3 flex items-center gap-3 hover:bg-surface-light/60 transition text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Icon name="analytics" className="text-primary" size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">Weekly report</p>
              <p className="text-[10px] text-white/40 truncate">
                See your streaks and patterns at a glance
              </p>
            </div>
            <Icon name="chevron_right" className="text-white/30" size={18} />
          </button>

          {/* Export data */}
          <button
            onClick={() => {
              downloadExport('csv');
              showToast('Data exported as CSV');
            }}
            className="w-full rounded-xl px-3.5 py-3 flex items-center gap-3 hover:bg-surface-light/60 transition text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-accent-teal/20 flex items-center justify-center">
              <Icon name="download" className="text-accent-teal" size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">Export data</p>
              <p className="text-[10px] text-white/40 truncate">
                Download your entries as a CSV file
              </p>
            </div>
            <span className="text-[10px] text-white/30">CSV</span>
          </button>

          {/* Settings & Premium */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => navigate('settings')}
              className="flex-1 rounded-xl px-3.5 py-2.5 flex items-center gap-2 bg-white/3 hover:bg-surface-light/70 transition text-left border border-white/8"
            >
              <Icon name="settings" className="text-white/60" size={16} />
              <span className="text-xs font-medium">Settings</span>
            </button>
            <button
              onClick={() => navigate('premium')}
              className="flex-1 rounded-xl px-3.5 py-2.5 flex items-center gap-2 bg-accent-amber/10 hover:bg-accent-amber/20 transition text-left border border-accent-amber/30"
            >
              <Icon name="workspace_premium" className="text-accent-amber" size={16} />
              <span className="text-xs font-medium">Club+</span>
            </button>
          </div>
        </div>

        {/* Health Disclaimer */}
        <div className="glass rounded-2xl p-4 mb-6 border border-white/5">
          <div className="flex items-start gap-3">
            <Icon name="info" className="text-white/30 flex-shrink-0 mt-0.5" size={16} />
            <p className="text-[10px] text-white/30 leading-relaxed">
              91 Play Club is for general entertainment only. It does not provide medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for mental health concerns.
            </p>
          </div>
        </div>

        {/* Account Actions */}
        <div className="space-y-2">
          <button onClick={logout}
            className="w-full py-3 rounded-2xl border border-white/10 text-white/50 text-sm font-medium hover:bg-surface-light transition">
            Sign Out
          </button>

          {!showDeleteConfirm ? (
            <button onClick={() => setShowDeleteConfirm(true)}
              className="w-full py-3 rounded-2xl border border-red-500/20 text-red-400/70 text-sm font-medium hover:bg-red-500/10 transition">
              Delete All Data & Account
            </button>
          ) : (
            <div className="glass rounded-2xl p-4 border border-red-500/30">
              <p className="text-sm text-red-400 font-medium mb-2">Are you sure?</p>
              <p className="text-xs text-white/40 mb-4">This will permanently delete all your mood entries, preferences, and connected service data. This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-surface-light transition">
                  Cancel
                </button>
                <button onClick={deleteAllData}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition">
                  Delete Everything
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </ScreenWrapper>
  );
}
