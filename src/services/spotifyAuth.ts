const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const REDIRECT_URI = window.location.origin + '/callback';
const SCOPES = [
  'user-read-email',
  'user-read-private',
  'user-top-read',
  'user-read-recently-played',
  'playlist-modify-public',
  'playlist-modify-private',
].join(' ');

const STORAGE_KEY = 'moodsync_spotify';

export interface SpotifyTokens {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

export interface SpotifyProfile {
  id: string;
  display_name: string;
  email: string;
  images: { url: string }[];
}

function getStored(): { clientId?: string; tokens?: SpotifyTokens } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function setStored(data: { clientId?: string; tokens?: SpotifyTokens }) {
  const existing = getStored();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...existing, ...data }));
}

export function getClientId(): string | null {
  return getStored().clientId || null;
}

export function setClientId(id: string) {
  setStored({ clientId: id });
}

export function getTokens(): SpotifyTokens | null {
  const { tokens } = getStored();
  if (!tokens) return null;
  if (Date.now() >= tokens.expires_at) return null;
  return tokens;
}

export function isConnected(): boolean {
  return !!getTokens();
}

export function disconnect() {
  const { clientId } = getStored();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ clientId }));
}

// PKCE helpers
function generateCodeVerifier(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
}

async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function startAuth() {
  const clientId = getClientId();
  if (!clientId) throw new Error('Spotify Client ID not set');

  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);

  sessionStorage.setItem('spotify_verifier', verifier);

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    code_challenge_method: 'S256',
    code_challenge: challenge,
  });

  window.location.href = `${SPOTIFY_AUTH_URL}?${params}`;
}

export async function handleCallback(code: string): Promise<boolean> {
  const clientId = getClientId();
  const verifier = sessionStorage.getItem('spotify_verifier');
  if (!clientId || !verifier) return false;

  try {
    const res = await fetch(SPOTIFY_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        code_verifier: verifier,
      }),
    });

    const data = await res.json();
    if (data.access_token) {
      setStored({
        tokens: {
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          expires_at: Date.now() + data.expires_in * 1000,
        },
      });
      sessionStorage.removeItem('spotify_verifier');
      return true;
    }
  } catch { /* auth failed */ }
  return false;
}

async function fetchSpotify(endpoint: string) {
  const tokens = getTokens();
  if (!tokens) throw new Error('Not authenticated');

  const res = await fetch(`https://api.spotify.com/v1${endpoint}`, {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });

  if (!res.ok) throw new Error(`Spotify API error: ${res.status}`);
  return res.json();
}

export async function getProfile(): Promise<SpotifyProfile> {
  return fetchSpotify('/me');
}

export async function getTopTracks(timeRange: 'short_term' | 'medium_term' | 'long_term' = 'short_term', limit = 10) {
  return fetchSpotify(`/me/top/tracks?time_range=${timeRange}&limit=${limit}`);
}

export async function getRecentlyPlayed(limit = 20) {
  return fetchSpotify(`/me/player/recently-played?limit=${limit}`);
}

export async function createPlaylist(name: string, description: string, trackUris: string[]) {
  const tokens = getTokens();
  if (!tokens) throw new Error('Not authenticated');

  const profile = await getProfile();

  const createRes = await fetch(`https://api.spotify.com/v1/users/${profile.id}/playlists`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, description, public: false }),
  });
  const playlist = await createRes.json();

  if (trackUris.length > 0) {
    await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uris: trackUris }),
    });
  }

  return playlist;
}
