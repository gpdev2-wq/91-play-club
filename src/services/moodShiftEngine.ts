import type { Mood } from '../context/AppContext';

export interface ShiftTrack {
  title: string;
  artist: string;
  bpm: number;
  energy: number; // 0-100
  videoId: string;
  phase: 'match' | 'transition' | 'target';
}

export interface ShiftPlaylist {
  from: Mood;
  to: Mood;
  duration: string;
  description: string;
  tracks: ShiftTrack[];
}

const MOOD_PROFILES: Record<Mood, { energy: number; valence: number; bpmRange: [number, number] }> = {
  happy:     { energy: 75, valence: 85, bpmRange: [100, 130] },
  motivated: { energy: 90, valence: 80, bpmRange: [120, 160] },
  calm:      { energy: 25, valence: 70, bpmRange: [55, 75] },
  sad:       { energy: 20, valence: 20, bpmRange: [50, 70] },
  lonely:    { energy: 30, valence: 30, bpmRange: [60, 85] },
  angry:     { energy: 85, valence: 15, bpmRange: [130, 165] },
  anxious:   { energy: 65, valence: 25, bpmRange: [80, 110] },
  inspired:  { energy: 70, valence: 90, bpmRange: [90, 120] },
  tired:     { energy: 10, valence: 40, bpmRange: [45, 60] },
};

const TRACK_POOL: Record<string, { title: string; artist: string; videoId: string }[]> = {
  'low-energy-low-valence': [
    { title: 'Midnight Rain', artist: 'Sad Lo-fi Collective', videoId: '6LuEK7FgecE' },
    { title: 'Empty Rooms', artist: 'Ambient Piano', videoId: 'jfKfPfyJRdk' },
    { title: 'Grey Skies', artist: 'Melancholy Beats', videoId: '1ZYbU82GVz4' },
  ],
  'low-energy-high-valence': [
    { title: 'Cloud Nine', artist: 'Chill Ambient', videoId: 'jfKfPfyJRdk' },
    { title: 'Gentle Waves', artist: 'Nature Sounds', videoId: '6LuEK7FgecE' },
    { title: 'Soft Landing', artist: 'Downtempo', videoId: '1ZYbU82GVz4' },
  ],
  'mid-energy-low-valence': [
    { title: 'Neon Shadows', artist: 'Dark Synthwave', videoId: '3AtDnEC4zak' },
    { title: 'Restless Mind', artist: 'Trip-Hop', videoId: 'DWcJFNfaw9c' },
    { title: 'Static Noise', artist: 'Industrial Ambient', videoId: '5qap5aO4i9A' },
  ],
  'mid-energy-high-valence': [
    { title: 'Golden Hour', artist: 'Chill Electronic', videoId: '5qap5aO4i9A' },
    { title: 'Sunday Drive', artist: 'Indie Vibes', videoId: 'jfKfPfyJRdk' },
    { title: 'Daydream', artist: 'Lo-fi Pop', videoId: '6LuEK7FgecE' },
  ],
  'high-energy-low-valence': [
    { title: 'Thunder Protocol', artist: 'Heavy Bass', videoId: 'DWcJFNfaw9c' },
    { title: 'Rage Circuit', artist: 'Dubstep', videoId: '3AtDnEC4zak' },
    { title: 'Voltage Spike', artist: 'Hard Electronic', videoId: '5qap5aO4i9A' },
  ],
  'high-energy-high-valence': [
    { title: 'Electric Sunrise', artist: 'Upbeat EDM', videoId: 'DWcJFNfaw9c' },
    { title: 'Victory Lap', artist: 'Power Pop', videoId: '5qap5aO4i9A' },
    { title: 'Euphoria Rush', artist: 'Progressive House', videoId: '3AtDnEC4zak' },
  ],
};

function getPoolKey(energy: number, valence: number): string {
  const e = energy < 40 ? 'low' : energy < 70 ? 'mid' : 'high';
  const v = valence < 50 ? 'low' : 'high';
  return `${e}-energy-${v}-valence`;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function generateShiftPlaylist(from: Mood, to: Mood): ShiftPlaylist {
  const fromProfile = MOOD_PROFILES[from];
  const toProfile = MOOD_PROFILES[to];

  const steps = 6;
  const tracks: ShiftTrack[] = [];

  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    const energy = Math.round(lerp(fromProfile.energy, toProfile.energy, t));
    const valence = Math.round(lerp(fromProfile.valence, toProfile.valence, t));
    const bpm = Math.round(lerp(fromProfile.bpmRange[0], toProfile.bpmRange[0], t));

    const poolKey = getPoolKey(energy, valence);
    const pool = TRACK_POOL[poolKey] || TRACK_POOL['mid-energy-high-valence'];
    const track = pool[i % pool.length];

    const phase: ShiftTrack['phase'] = i < 2 ? 'match' : i < 4 ? 'transition' : 'target';

    tracks.push({
      ...track,
      bpm,
      energy,
      phase,
    });
  }

  return {
    from,
    to,
    duration: `${steps * 4}-${steps * 5} min`,
    description: `Gradually shift from ${from} to ${to} — matching your current state first, then transitioning through music.`,
    tracks,
  };
}
