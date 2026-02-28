import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Icon from '../components/Icon';
import ScreenWrapper from '../components/ScreenWrapper';

const MOCK_BUDDIES = [
  { name: 'Maya', mood: 'calm', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=face', listening: 'Ocean Waves Mix', status: 'online' },
  { name: 'Jay', mood: 'motivated', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=face', listening: 'Beast Mode Playlist', status: 'online' },
  { name: 'Luna', mood: 'sad', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&crop=face', listening: 'Midnight Blue', status: 'away' },
];

const MOOD_EMOJIS: Record<string, string> = {
  happy: '☀️', motivated: '🔥', calm: '🌊', sad: '🌧️',
  lonely: '🌙', angry: '⚡', anxious: '💨', inspired: '✨', tired: '😴',
};

export default function MoodBuddy() {
  const { mood, navigate, showToast, playMusic } = useApp();
  const [matchedBuddy, setMatchedBuddy] = useState<typeof MOCK_BUDDIES[number] | null>(null);
  const [searching, setSearching] = useState(false);

  const findBuddy = () => {
    setSearching(true);
    setTimeout(() => {
      const buddy = MOCK_BUDDIES[Math.floor(Math.random() * MOCK_BUDDIES.length)];
      setMatchedBuddy(buddy);
      setSearching(false);
    }, 2000);
  };

  return (
    <ScreenWrapper>
      <div className="px-5 pt-14 pb-12 animate-fadeIn">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate('friends-feed')} className="p-1.5 rounded-xl glass hover:bg-surface-light transition">
            <Icon name="arrow_back" size={20} />
          </button>
          <div>
            <h1 className="text-lg font-bold">Mood Buddy</h1>
            <p className="text-[11px] text-white/40">Find someone feeling the same way <span className="text-accent-amber">(Preview)</span></p>
          </div>
        </div>

        {!matchedBuddy && !searching && (
          <>
            <div className="text-center py-10">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6"
                style={{ animation: 'breathe 3s ease-in-out infinite' }}>
                <span className="text-4xl">{MOOD_EMOJIS[mood]}</span>
              </div>

              <h2 className="text-xl font-bold mb-2">You're feeling {mood}</h2>
              <p className="text-sm text-white/50 max-w-xs mx-auto mb-8">
                Get matched with someone in a similar emotional state. Share a playlist, listen together, or just know you're not alone.
              </p>

              <button
                onClick={findBuddy}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-semibold active:scale-[0.98] transition-all shadow-lg shadow-primary/25"
              >
                <Icon name="person_search" size={20} className="mr-2 inline" />
                Find a Mood Buddy
              </button>
            </div>

            {/* Active buddies */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold mb-3">Active Now</h3>
              <div className="space-y-2">
                {MOCK_BUDDIES.map(b => (
                  <div key={b.name} className="glass rounded-2xl p-3 flex items-center gap-3">
                    <div className="relative">
                      <img src={b.avatar} alt={b.name} className="w-11 h-11 rounded-full object-cover" />
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-dark ${b.status === 'online' ? 'bg-accent-teal' : 'bg-accent-amber'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold">{b.name} <span className="text-white/40">· {MOOD_EMOJIS[b.mood]}</span></h4>
                      <p className="text-[10px] text-white/40 truncate">Listening to {b.listening}</p>
                    </div>
                    <button
                      onClick={() => showToast(`Vibe sent to ${b.name}!`)}
                      className="px-3 py-1.5 rounded-full glass text-[10px] font-semibold text-primary hover:bg-surface-light/50 transition"
                    >
                      Wave
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {searching && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto rounded-full border-2 border-primary/30 flex items-center justify-center mb-6"
              style={{ animation: 'pulse-ring 1.5s ease-in-out infinite' }}>
              <Icon name="radar" size={36} className="text-primary" />
            </div>
            <h2 className="text-lg font-bold mb-2">Searching...</h2>
            <p className="text-sm text-white/50">Finding someone on your wavelength</p>
          </div>
        )}

        {matchedBuddy && (
          <div className="text-center py-8 animate-fadeIn">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-teal to-primary blur-lg opacity-30" />
              <img src={matchedBuddy.avatar} alt={matchedBuddy.name} className="relative w-24 h-24 rounded-full object-cover ring-4 ring-accent-teal/30" />
            </div>

            <h2 className="text-xl font-bold mb-1">Matched with {matchedBuddy.name}!</h2>
            <p className="text-sm text-white/50 mb-6">
              {matchedBuddy.name} is also feeling {matchedBuddy.mood} {MOOD_EMOJIS[matchedBuddy.mood]}
            </p>

            <div className="glass rounded-2xl p-4 mb-6 text-left">
              <p className="text-[10px] text-white/40 uppercase tracking-wider mb-2">They're listening to</p>
              <h4 className="text-sm font-semibold">{matchedBuddy.listening}</h4>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => { playMusic('5qap5aO4i9A'); showToast(`Listening together with ${matchedBuddy.name}!`); }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-accent-teal to-primary text-white font-semibold active:scale-[0.98] transition-all"
              >
                <Icon name="headphones" size={20} className="mr-2 inline" />
                Listen Together
              </button>

              <button
                onClick={() => navigate('send-vibe')}
                className="w-full py-3 rounded-2xl border border-border text-sm font-medium hover:bg-surface-light transition"
              >
                <Icon name="favorite" size={18} className="mr-2 inline text-accent" />
                Send a Vibe
              </button>

              <button
                onClick={() => { setMatchedBuddy(null); }}
                className="w-full text-sm text-white/40 hover:text-white transition py-2"
              >
                Find another buddy
              </button>
            </div>
          </div>
        )}
      </div>
    </ScreenWrapper>
  );
}
