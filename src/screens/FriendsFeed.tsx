import { useApp } from '../context/AppContext';
import Icon from '../components/Icon';
import BottomNav from '../components/BottomNav';
import ScreenWrapper from '../components/ScreenWrapper';

const FRIENDS = [
  { name: 'Sarah', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=face' },
  { name: 'Leo', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=face' },
  { name: 'Chloe', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&crop=face' },
  { name: 'Alex', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face', me: true },
];

const FEED = [
  {
    emoji: '⚡', name: 'Sarah', mood: 'Energetic',
    genre: 'HYPERPOP MIX · 165 BPM', time: '2m ago',
    bg: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=200&fit=crop',
    video: 'DWcJFNfaw9c', vibes: 12,
  },
  {
    emoji: '🌙', name: 'Leo', mood: 'Mellow',
    genre: 'LO-FI RAINY NIGHTS · 70 BPM', time: '15m ago',
    bg: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop',
    video: '5qap5aO4i9A', vibes: 5,
  },
  {
    emoji: '🌿', name: 'Chloe', mood: 'Focused',
    genre: 'DEEP TECH HOUSE · 126 BPM', time: '1h ago',
    bg: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=200&fit=crop',
    video: '3AtDnEC4zak', vibes: 0,
  },
];

export default function FriendsFeed() {
  const { navigate, playMusic, showToast } = useApp();

  return (
    <ScreenWrapper withNav>
      <div className="px-5 pt-14 pb-6 animate-fadeIn">
        <div className="flex items-center gap-3 mb-2">
          <Icon name="group" className="text-primary" size={24} />
          <h2 className="text-lg font-bold">Active Moods</h2>
        </div>
        <div className="flex items-center gap-2 mb-6 px-1">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-amber/15 text-accent-amber font-semibold">Preview</span>
          <span className="text-[10px] text-white/30">Social features are a demo — real connections coming soon</span>
        </div>

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => navigate('mood-home')}
            className="flex-1 glass rounded-2xl px-4 py-2.5 flex items-center justify-center gap-2 text-sm font-medium text-primary hover:bg-surface-light/50 transition"
          >
            <Icon name="add_reaction" size={18} />
            Set Mood
          </button>
          <button
            onClick={() => navigate('mood-buddy')}
            className="flex-1 glass rounded-2xl px-4 py-2.5 flex items-center justify-center gap-2 text-sm font-medium text-accent hover:bg-surface-light/50 transition"
          >
            <Icon name="person_search" size={18} />
            Mood Buddy
          </button>
          <button
            onClick={() => navigate('send-vibe')}
            className="glass rounded-2xl px-3 py-2.5 flex items-center justify-center text-accent-teal hover:bg-surface-light/50 transition"
          >
            <Icon name="send" size={18} />
          </button>
        </div>

        {/* Friend Avatars */}
        <div className="flex gap-3 mb-6">
          {FRIENDS.map(f => (
            <div key={f.name} className="flex flex-col items-center gap-1">
              <div className={`w-14 h-14 rounded-full overflow-hidden ring-2 ${f.me ? 'ring-primary' : 'ring-border'}`}>
                <img src={f.img} alt={f.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <span className="text-[10px] text-text-dim">{f.me ? 'You' : f.name}</span>
            </div>
          ))}
        </div>

        {/* Feed Cards */}
        <div className="space-y-4">
          {FEED.map(f => (
            <div key={f.video} className="glass rounded-2xl overflow-hidden">
              <div className="relative h-36">
                <img src={f.bg} alt="" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
                <div className="absolute top-3 left-3 text-2xl">{f.emoji}</div>
                <div className="absolute bottom-3 left-3">
                  <h4 className="text-sm font-bold">{f.name} is feeling {f.mood}</h4>
                  <p className="text-[10px] text-text-dim uppercase tracking-wider">{f.genre}</p>
                </div>
                <span className="absolute top-3 right-3 text-[10px] text-text-dim">{f.time}</span>
              </div>

              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => playMusic(f.video)}
                    className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition"
                  >
                    <Icon name="play_arrow" className="text-primary" size={20} />
                  </button>
                  {f.vibes > 0 && <span className="text-xs text-text-dim">+{f.vibes}</span>}
                </div>
                <button
                  onClick={() => showToast('Vibe synced!')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-xs font-medium hover:bg-surface-light/50 transition"
                >
                  <Icon name="favorite" className="text-accent" size={16} />
                  Vibe Sync
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('mood-home')}
          className="w-full mt-6 text-sm text-text-dim hover:text-white transition text-center py-2"
        >
          ← Back
        </button>
      </div>
      <BottomNav />
    </ScreenWrapper>
  );
}
