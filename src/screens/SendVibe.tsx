import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOOD_DATA } from '../data/moodData';
import Icon from '../components/Icon';
import ScreenWrapper from '../components/ScreenWrapper';

const FRIENDS = [
  { name: 'Sarah', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=face' },
  { name: 'Leo', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=face' },
  { name: 'Chloe', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&crop=face' },
  { name: 'Maya', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=face' },
];

const VIBE_TYPES = [
  { emoji: '🎵', label: 'Song', desc: 'Send a song that matches their mood' },
  { emoji: '🤗', label: 'Hug', desc: 'A virtual musical hug' },
  { emoji: '⚡', label: 'Energy', desc: 'Send an energy boost playlist' },
  { emoji: '🌙', label: 'Calm', desc: 'Send calming vibes' },
];

export default function SendVibe() {
  const { mood, navigate, showToast } = useApp();
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const data = MOOD_DATA[mood];

  const handleSend = () => {
    if (!selectedFriend || !selectedVibe) {
      showToast('Pick a friend and a vibe type');
      return;
    }
    setSent(true);
    setTimeout(() => {
      showToast(`Vibe sent to ${selectedFriend}! 🎵`);
    }, 500);
  };

  if (sent) {
    return (
      <ScreenWrapper>
        <div className="min-h-dvh flex flex-col items-center justify-center px-6 animate-fadeIn">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-6 shadow-lg shadow-accent/30"
            style={{ animation: 'breathe 2s ease-in-out infinite' }}>
            <Icon name="favorite" size={36} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Vibe Sent!</h1>
          <p className="text-sm text-white/50 mb-2">{selectedFriend} will feel the love</p>
          <p className="text-xs text-white/30 mb-8">This is a preview of upcoming social features</p>
          <button
            onClick={() => navigate('friends-feed')}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold active:scale-[0.98] transition-all"
          >
            Back to Feed
          </button>
        </div>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <div className="px-5 pt-14 pb-12 animate-fadeIn">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate('friends-feed')} className="p-1.5 rounded-xl glass hover:bg-surface-light transition">
            <Icon name="arrow_back" size={20} />
          </button>
          <div>
            <h1 className="text-lg font-bold">Send a Vibe</h1>
            <p className="text-[11px] text-white/40">Share your mood through music <span className="text-accent-amber">(Preview)</span></p>
          </div>
        </div>

        {/* Select friend */}
        <h3 className="text-sm font-semibold mb-3">Who needs a vibe?</h3>
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2 scrollbar-none">
          {FRIENDS.map(f => (
            <button
              key={f.name}
              onClick={() => setSelectedFriend(f.name)}
              className={`flex flex-col items-center gap-1.5 flex-shrink-0 transition-all ${selectedFriend === f.name ? 'scale-110' : ''}`}
            >
              <div className={`w-14 h-14 rounded-full overflow-hidden ring-2 transition-all ${selectedFriend === f.name ? 'ring-primary shadow-lg shadow-primary/25' : 'ring-border'}`}>
                <img src={f.avatar} alt={f.name} className="w-full h-full object-cover" />
              </div>
              <span className={`text-[10px] font-medium ${selectedFriend === f.name ? 'text-primary' : 'text-white/50'}`}>{f.name}</span>
            </button>
          ))}
        </div>

        {/* Vibe type */}
        <h3 className="text-sm font-semibold mb-3">Choose a vibe</h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {VIBE_TYPES.map(v => (
            <button
              key={v.label}
              onClick={() => setSelectedVibe(v.label)}
              className={`glass rounded-2xl p-4 text-left transition-all ${selectedVibe === v.label ? 'border-primary/50 bg-primary/10 scale-[1.02]' : 'hover:bg-surface-light/50'}`}
            >
              <span className="text-2xl block mb-2">{v.emoji}</span>
              <h4 className="text-sm font-semibold">{v.label}</h4>
              <p className="text-[10px] text-white/40">{v.desc}</p>
            </button>
          ))}
        </div>

        {/* Optional message */}
        <h3 className="text-sm font-semibold mb-3">Add a note (optional)</h3>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Thought you might vibe with this..."
          maxLength={140}
          className="w-full h-20 glass rounded-2xl p-4 text-sm outline-none resize-none placeholder:text-white/30 focus:border-primary/50 transition mb-6"
        />

        {/* Attached song preview */}
        <div className="glass rounded-2xl p-3 flex items-center gap-3 mb-6">
          <img src={data.playlists[0].thumb} alt="" className="w-11 h-11 rounded-xl object-cover" />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-white/40 uppercase tracking-wider">Auto-curated song</p>
            <h4 className="text-sm font-semibold truncate">{data.nowPlaying.title}</h4>
          </div>
          <Icon name="music_note" size={18} style={{ color: data.accentHex }} />
        </div>

        <button
          onClick={handleSend}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-accent to-primary text-white font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg shadow-accent/20"
        >
          <Icon name="send" size={20} />
          Send Vibe
        </button>
      </div>
    </ScreenWrapper>
  );
}
