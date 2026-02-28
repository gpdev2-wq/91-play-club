import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import * as spotify from '../services/spotifyAuth';
import Icon from '../components/Icon';
import ScreenWrapper from '../components/ScreenWrapper';

export default function SpotifyConnect() {
  const { navigate, showToast } = useApp();
  const [clientId, setClientId] = useState(spotify.getClientId() || '');
  const [connected, setConnected] = useState(spotify.isConnected());
  const [profile, setProfile] = useState<spotify.SpotifyProfile | null>(null);
  const [topTracks, setTopTracks] = useState<{ name: string; artists: { name: string }[]; album: { images: { url: string }[] } }[]>([]);

  useEffect(() => {
    // Handle OAuth callback
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code) {
      spotify.handleCallback(code).then(ok => {
        if (ok) {
          setConnected(true);
          showToast('Spotify connected!');
          window.history.replaceState({}, '', window.location.pathname);
        }
      });
    }
  }, [showToast]);

  useEffect(() => {
    if (connected) {
      spotify.getProfile().then(setProfile).catch(() => {});
      spotify.getTopTracks('short_term', 5).then(data => setTopTracks(data.items || [])).catch(() => {});
    }
  }, [connected]);

  const handleConnect = async () => {
    if (!clientId.trim()) {
      showToast('Please enter your Spotify Client ID');
      return;
    }
    spotify.setClientId(clientId.trim());
    try {
      await spotify.startAuth();
    } catch {
      showToast('Failed to start Spotify auth');
    }
  };

  const handleDisconnect = () => {
    spotify.disconnect();
    setConnected(false);
    setProfile(null);
    setTopTracks([]);
    showToast('Spotify disconnected');
  };

  return (
    <ScreenWrapper>
      <div className="px-5 pt-14 pb-12 animate-fadeIn">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate('profile')} className="p-1.5 rounded-xl glass hover:bg-surface-light transition">
            <Icon name="arrow_back" size={20} />
          </button>
          <h1 className="text-lg font-bold">Spotify Integration</h1>
        </div>

        {/* Spotify branding card */}
        <div className="rounded-2xl p-6 mb-6" style={{ background: 'linear-gradient(135deg, #1DB954, #191414)' }}>
          <div className="flex items-center gap-3 mb-3">
            <svg viewBox="0 0 24 24" className="w-8 h-8"><circle cx="12" cy="12" r="12" fill="#1DB954"/><path d="M16.5 15.5c-.2 0-.4-.1-.5-.2-2.1-1.3-4.8-1.6-7.9-.9-.3.1-.6-.1-.7-.4-.1-.3.1-.6.4-.7 3.4-.8 6.4-.4 8.8 1 .3.2.4.5.2.8-.1.3-.2.4-.3.4zm1.2-2.7c-.2 0-.4-.1-.6-.3-2.4-1.5-6-1.9-8.8-1-.3.1-.7 0-.8-.4-.1-.3 0-.7.4-.8 3.2-1 7.2-.5 9.9 1.2.3.2.4.6.2.9-.1.3-.2.4-.3.4zm.1-2.8c-2.9-1.7-7.6-1.9-10.3-.9-.4.1-.8-.1-.9-.5-.1-.4.1-.8.5-.9 3.2-1 8.4-.8 11.7 1.1.4.2.5.7.3 1-.2.3-.8.4-1.3.2z" fill="white"/></svg>
            <div>
              <h3 className="font-bold">Spotify</h3>
              <p className="text-xs text-white/60">
                {connected ? 'Connected' : 'Connect your account'}
              </p>
            </div>
          </div>

          {connected && profile && (
            <div className="flex items-center gap-3 mt-4 p-3 rounded-xl bg-black/20">
              {profile.images?.[0] && (
                <img src={profile.images[0].url} alt="" className="w-10 h-10 rounded-full" />
              )}
              <div>
                <p className="text-sm font-semibold">{profile.display_name}</p>
                <p className="text-[10px] text-white/50">{profile.email}</p>
              </div>
            </div>
          )}
        </div>

        {!connected ? (
          <>
            <div className="glass rounded-2xl p-5 mb-6">
              <h3 className="text-sm font-semibold mb-3">Setup</h3>
              <p className="text-xs text-white/50 mb-4 leading-relaxed">
                To connect Spotify, create a free app at{' '}
                <span className="text-primary">developer.spotify.com</span>{' '}
                and paste your Client ID below. Add{' '}
                <span className="text-accent-teal font-mono text-[10px]">{window.location.origin}/callback</span>{' '}
                as a redirect URI in your Spotify app settings.
              </p>

              <div className="glass rounded-xl flex items-center px-4 gap-3 mb-4 focus-within:border-primary/50 transition">
                <Icon name="key" className="text-white/30" size={18} />
                <input
                  type="text"
                  placeholder="Spotify Client ID"
                  value={clientId}
                  onChange={e => setClientId(e.target.value)}
                  className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-white/30 font-mono"
                />
              </div>

              <button
                onClick={handleConnect}
                className="w-full py-3 rounded-xl font-semibold text-sm active:scale-[0.98] transition-all"
                style={{ background: '#1DB954' }}
              >
                Connect Spotify
              </button>
            </div>

            <div className="glass rounded-2xl p-5">
              <h3 className="text-sm font-semibold mb-3">What you'll unlock</h3>
              <div className="space-y-3">
                {[
                  { icon: 'analytics', text: 'Listening history mood analysis' },
                  { icon: 'playlist_add', text: 'Auto-create mood playlists in Spotify' },
                  { icon: 'psychology', text: 'Correlates your music with mood patterns' },
                  { icon: 'music_note', text: 'Play directly from your library' },
                ].map(f => (
                  <div key={f.icon} className="flex items-center gap-3">
                    <Icon name={f.icon} className="text-[#1DB954]" size={20} />
                    <span className="text-sm text-white/70">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {topTracks.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3">Your Top Tracks (Recent)</h3>
                <div className="space-y-2">
                  {topTracks.map((track, i) => (
                    <div key={i} className="glass rounded-xl p-3 flex items-center gap-3">
                      <img
                        src={track.album.images?.[2]?.url || track.album.images?.[0]?.url || ''}
                        alt=""
                        className="w-10 h-10 rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold truncate">{track.name}</h4>
                        <p className="text-[10px] text-white/40 truncate">
                          {track.artists.map(a => a.name).join(', ')}
                        </p>
                      </div>
                      <span className="text-[10px] text-white/30">#{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleDisconnect}
              className="w-full py-3 rounded-2xl border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-500/10 transition"
            >
              Disconnect Spotify
            </button>
          </>
        )}
      </div>
    </ScreenWrapper>
  );
}
