import type { Mood } from '../context/AppContext';

export interface MoodPlaylist {
  title: string;
  subtitle: string;
  thumb: string;
  videoId: string;
  spotifyId: string;
  bpm: number;
}

export interface MoodMeditation {
  title: string;
  duration: string;
  thumb: string;
  videoId: string;
}

export interface NowPlaying {
  title: string;
  artist: string;
  videoId: string;
  spotifyId: string;
}

export interface MoodConfig {
  emoji: string;
  quote: string;
  gradient: string;
  gradientBg: string;
  accentHex: string;
  heroImage: string;
  nowPlaying: NowPlaying;
  playlists: MoodPlaylist[];
  hindiNowPlaying: NowPlaying;
  hindiPlaylists: MoodPlaylist[];
  meditation: MoodMeditation;
}

export const MOOD_DATA: Record<Mood, MoodConfig> = {
  happy: {
    emoji: '☀️',
    quote: '"Let the sunshine in. Your energy is magnetic today."',
    gradient: 'from-amber-400 via-orange-500 to-rose-500',
    gradientBg: 'from-amber-500/15 via-orange-500/10 to-transparent',
    accentHex: '#f59e0b',
    heroImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=400&fit=crop',
    nowPlaying: { title: 'Sunshine Vibes Mix', artist: 'Lofi Girl · Happy Beats', videoId: '5qap5aO4i9A', spotifyId: '37i9dQZF1DXdPec7aLTmlC' },
    playlists: [
      { title: 'Golden Hour Beats', subtitle: 'Feel-good Lo-fi · 18 tracks', thumb: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop', videoId: '5qap5aO4i9A', spotifyId: '37i9dQZF1DX3rxVfibe1L0', bpm: 95 },
      { title: 'Summer Frequencies', subtitle: 'Upbeat Electronic · 24 tracks', thumb: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop', videoId: 'jfKfPfyJRdk', spotifyId: '37i9dQZF1DX1BzILRveYHb', bpm: 120 },
      { title: 'Positive Energy', subtitle: 'Indie Pop · 16 tracks', thumb: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=200&h=200&fit=crop', videoId: 'DWcJFNfaw9c', spotifyId: '37i9dQZF1DX9XIFQuFvzM4', bpm: 110 },
    ],
    hindiNowPlaying: { title: 'Kesariya', artist: 'Arijit Singh · Brahmastra', videoId: 'atGMSIBFN04', spotifyId: '37i9dQZF1DX0XUfZLuQN4a' },
    hindiPlaylists: [
      { title: 'Bollywood Hits', subtitle: 'Top Hindi · 30 tracks', thumb: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop', videoId: 'lJw4mVyqkFk', spotifyId: '37i9dQZF1DX0XUfZLuQN4a', bpm: 110 },
      { title: 'Desi Pop Vibes', subtitle: 'Indie Hindi · 20 tracks', thumb: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop', videoId: '_ik4jcamVeI', spotifyId: '37i9dQZF1DX0Yxoavh5qJV', bpm: 105 },
      { title: 'Feel Good Hindi', subtitle: 'Upbeat Bollywood · 25 tracks', thumb: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=200&h=200&fit=crop', videoId: 'atGMSIBFN04', spotifyId: '37i9dQZF1DX18jTM2l2fJY', bpm: 115 },
    ],
    meditation: { title: 'Gratitude Flow', duration: '5 min', thumb: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&h=200&fit=crop', videoId: '6LuEK7FgecE' },
  },

  motivated: {
    emoji: '🔥',
    quote: '"You\'re unstoppable today. Channel that fire."',
    gradient: 'from-rose-500 via-pink-600 to-fuchsia-600',
    gradientBg: 'from-rose-500/15 via-pink-600/10 to-transparent',
    accentHex: '#ec4899',
    heroImage: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=400&fit=crop',
    nowPlaying: { title: 'Power Surge', artist: 'High Energy · Workout Mix', videoId: 'DWcJFNfaw9c', spotifyId: '37i9dQZF1DX76Wlfdnj7AP' },
    playlists: [
      { title: 'Beast Mode', subtitle: 'High-Intensity · 20 tracks', thumb: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=200&h=200&fit=crop', videoId: 'DWcJFNfaw9c', spotifyId: '37i9dQZF1DX76Wlfdnj7AP', bpm: 150 },
      { title: 'Hyperpop Rush', subtitle: 'Electronic · 14 tracks', thumb: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop', videoId: '3AtDnEC4zak', spotifyId: '37i9dQZF1DX0BcQWzuB7ZO', bpm: 165 },
      { title: 'Morning Grind', subtitle: 'Hip-Hop · 22 tracks', thumb: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop', videoId: '5qap5aO4i9A', spotifyId: '37i9dQZF1DX0UrRvztWcAU', bpm: 130 },
    ],
    hindiNowPlaying: { title: 'Kar Har Maidaan Fateh', artist: 'Sukhwinder Singh · Shreya', videoId: 'elYCl3PAfeg', spotifyId: '37i9dQZF1DX5q67ZpWyRrZ' },
    hindiPlaylists: [
      { title: 'Bollywood Workout', subtitle: 'High Energy Hindi · 22 tracks', thumb: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=200&h=200&fit=crop', videoId: 'FBKq_m0lhDc', spotifyId: '37i9dQZF1DX5q67ZpWyRrZ', bpm: 145 },
      { title: 'Desi Hip Hop', subtitle: 'Indian Rap · 18 tracks', thumb: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop', videoId: 'IAkfHLNjfAY', spotifyId: '37i9dQZF1DX0Yxoavh5qJV', bpm: 130 },
      { title: 'Pump Up Hindi', subtitle: 'Party Hits · 20 tracks', thumb: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop', videoId: 'lJw4mVyqkFk', spotifyId: '37i9dQZF1DX0XUfZLuQN4a', bpm: 140 },
    ],
    meditation: { title: 'Focus Ignite', duration: '3 min', thumb: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=200&h=200&fit=crop', videoId: 'xuTTAhNBDg0' },
  },

  calm: {
    emoji: '🌊',
    quote: '"Stillness is a superpower. You\'re perfectly balanced."',
    gradient: 'from-teal-400 via-cyan-500 to-blue-500',
    gradientBg: 'from-teal-500/15 via-cyan-500/10 to-transparent',
    accentHex: '#14b8a6',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=400&fit=crop',
    nowPlaying: { title: 'Ocean Waves', artist: 'Nature Ambient · Calm', videoId: 'jfKfPfyJRdk', spotifyId: '37i9dQZF1DX4sWSpwq3LiO' },
    playlists: [
      { title: 'Zen Garden', subtitle: 'Ambient · 12 tracks', thumb: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=200&fit=crop', videoId: 'jfKfPfyJRdk', spotifyId: '37i9dQZF1DX4sWSpwq3LiO', bpm: 60 },
      { title: 'Rainy Day Lofi', subtitle: 'Chill Beats · 30 tracks', thumb: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=200&h=200&fit=crop', videoId: '5qap5aO4i9A', spotifyId: '37i9dQZF1DX4PP3DA4J0N8', bpm: 70 },
      { title: 'Cloud Drift', subtitle: 'Downtempo · 15 tracks', thumb: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=200&h=200&fit=crop', videoId: '6LuEK7FgecE', spotifyId: '37i9dQZF1DWYoYGBbGKurt', bpm: 75 },
    ],
    hindiNowPlaying: { title: 'Agar Tum Saath Ho', artist: 'Arijit Singh · Alka Yagnik', videoId: 'cYOB941gyXI', spotifyId: '37i9dQZF1DWTtTyjgSrRoB' },
    hindiPlaylists: [
      { title: 'Bollywood Acoustic', subtitle: 'Unplugged Hindi · 18 tracks', thumb: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=200&fit=crop', videoId: 'QKEPaZK9vdI', spotifyId: '37i9dQZF1DWTtTyjgSrRoB', bpm: 65 },
      { title: 'Sufi & Soul', subtitle: 'Qawwali · Sufi Chill · 14 tracks', thumb: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=200&h=200&fit=crop', videoId: 'BddP6PYo2gs', spotifyId: '37i9dQZF1DX18jTM2l2fJY', bpm: 70 },
      { title: 'Chill Bollywood', subtitle: 'Soft Hindi · 20 tracks', thumb: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=200&h=200&fit=crop', videoId: 'cYOB941gyXI', spotifyId: '37i9dQZF1DX0Yxoavh5qJV', bpm: 60 },
    ],
    meditation: { title: 'Deep Blue Drift', duration: '12 min', thumb: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=200&h=200&fit=crop', videoId: 'xuTTAhNBDg0' },
  },

  sad: {
    emoji: '🌧️',
    quote: '"It\'s okay to feel. Let the music hold you."',
    gradient: 'from-blue-500 via-indigo-600 to-violet-600',
    gradientBg: 'from-blue-500/15 via-indigo-600/10 to-transparent',
    accentHex: '#6366f1',
    heroImage: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=800&h=400&fit=crop',
    nowPlaying: { title: 'Rainy Reflections', artist: 'Melancholic Piano · Soft', videoId: '6LuEK7FgecE', spotifyId: '37i9dQZF1DX7qK8ma5wgG1' },
    playlists: [
      { title: 'Midnight Blue', subtitle: 'Sad Lo-fi · 20 tracks', thumb: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=200&h=200&fit=crop', videoId: '6LuEK7FgecE', spotifyId: '37i9dQZF1DX7qK8ma5wgG1', bpm: 65 },
      { title: 'Tears & Stars', subtitle: 'Piano Ballads · 14 tracks', thumb: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&h=200&fit=crop', videoId: 'jfKfPfyJRdk', spotifyId: '37i9dQZF1DX3YSRoSdA634', bpm: 70 },
      { title: 'Healing Rain', subtitle: 'Nature + Ambient · 18 tracks', thumb: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=200&h=200&fit=crop', videoId: '5qap5aO4i9A', spotifyId: '37i9dQZF1DWVrtsSlLKzro', bpm: 55 },
    ],
    hindiNowPlaying: { title: 'Channa Mereya', artist: 'Arijit Singh · ADHM', videoId: 'cAMHx-m9oh8', spotifyId: '37i9dQZF1DX18jTM2l2fJY' },
    hindiPlaylists: [
      { title: 'Sad Bollywood', subtitle: 'Heartbreak Hindi · 24 tracks', thumb: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=200&h=200&fit=crop', videoId: 'BddP6PYo2gs', spotifyId: '37i9dQZF1DX18jTM2l2fJY', bpm: 60 },
      { title: 'Arijit Feels', subtitle: 'Arijit Singh · 18 tracks', thumb: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&h=200&fit=crop', videoId: 'cAMHx-m9oh8', spotifyId: '37i9dQZF1DWTtTyjgSrRoB', bpm: 65 },
      { title: 'Hindi Lo-fi Sad', subtitle: 'Slowed + Reverb · 16 tracks', thumb: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=200&h=200&fit=crop', videoId: 'cYOB941gyXI', spotifyId: '37i9dQZF1DX0Yxoavh5qJV', bpm: 55 },
    ],
    meditation: { title: 'Comfort Space', duration: '10 min', thumb: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=200&h=200&fit=crop', videoId: '1ZYbU82GVz4' },
  },

  lonely: {
    emoji: '🌙',
    quote: '"You are never truly alone. The universe hums with you."',
    gradient: 'from-violet-500 via-purple-600 to-indigo-600',
    gradientBg: 'from-violet-500/15 via-purple-600/10 to-transparent',
    accentHex: '#8b5cf6',
    heroImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=400&fit=crop',
    nowPlaying: { title: 'Neon Solitude', artist: 'Synthwave · Late Night', videoId: '3AtDnEC4zak', spotifyId: '37i9dQZF1DX2pSTOxoPbx9I' },
    playlists: [
      { title: 'Cosmic Alone', subtitle: 'Synthwave · 16 tracks', thumb: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&h=200&fit=crop', videoId: '3AtDnEC4zak', spotifyId: '37i9dQZF1DX2pSTOxoPbx9I', bpm: 85 },
      { title: 'Night Drive', subtitle: 'Retrowave · 20 tracks', thumb: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=200&h=200&fit=crop', videoId: 'DWcJFNfaw9c', spotifyId: '37i9dQZF1DX6VDO8a6cQME', bpm: 100 },
      { title: 'Starlight Drift', subtitle: 'Ambient · 12 tracks', thumb: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=200&h=200&fit=crop', videoId: 'jfKfPfyJRdk', spotifyId: '37i9dQZF1DWU0ScTcjJBdj', bpm: 60 },
    ],
    hindiNowPlaying: { title: 'Tum Hi Ho', artist: 'Arijit Singh · Aashiqui 2', videoId: 'BddP6PYo2gs', spotifyId: '37i9dQZF1DWTtTyjgSrRoB' },
    hindiPlaylists: [
      { title: 'Tanha Nights', subtitle: 'Melancholic Hindi · 16 tracks', thumb: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&h=200&fit=crop', videoId: 'cAMHx-m9oh8', spotifyId: '37i9dQZF1DWTtTyjgSrRoB', bpm: 70 },
      { title: 'Late Night Hindi', subtitle: 'Slow Bollywood · 20 tracks', thumb: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=200&h=200&fit=crop', videoId: 'cYOB941gyXI', spotifyId: '37i9dQZF1DX18jTM2l2fJY', bpm: 65 },
      { title: 'Soulful Hindi', subtitle: 'Ghazals + Sufi · 14 tracks', thumb: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=200&h=200&fit=crop', videoId: 'BddP6PYo2gs', spotifyId: '37i9dQZF1DX0Yxoavh5qJV', bpm: 60 },
    ],
    meditation: { title: 'Neon Silence', duration: '8 min', thumb: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=200&h=200&fit=crop', videoId: '6LuEK7FgecE' },
  },

  angry: {
    emoji: '⚡',
    quote: '"Channel the storm. Transform rage into power."',
    gradient: 'from-red-500 via-orange-600 to-amber-600',
    gradientBg: 'from-red-500/15 via-orange-600/10 to-transparent',
    accentHex: '#ef4444',
    heroImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=400&fit=crop',
    nowPlaying: { title: 'Rage Protocol', artist: 'Heavy Bass · Intense', videoId: 'DWcJFNfaw9c', spotifyId: '37i9dQZF1DWTcqUzwhNmKv' },
    playlists: [
      { title: 'Thunder Drop', subtitle: 'Dubstep · 18 tracks', thumb: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop', videoId: 'DWcJFNfaw9c', spotifyId: '37i9dQZF1DWTcqUzwhNmKv', bpm: 140 },
      { title: 'Smash Room Beats', subtitle: 'Hard Electronic · 15 tracks', thumb: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=200&h=200&fit=crop', videoId: '3AtDnEC4zak', spotifyId: '37i9dQZF1DX1tyCD9QhIGF', bpm: 160 },
      { title: 'Release Valve', subtitle: 'Metal + Electronic · 12 tracks', thumb: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop', videoId: '5qap5aO4i9A', spotifyId: '37i9dQZF1DX2EykupcSRMt', bpm: 155 },
    ],
    hindiNowPlaying: { title: 'Brown Munde', artist: 'AP Dhillon · Gurinder Gill', videoId: 'FBKq_m0lhDc', spotifyId: '37i9dQZF1DX5q67ZpWyRrZ' },
    hindiPlaylists: [
      { title: 'Desi Bass Drop', subtitle: 'Hard Hindi · 18 tracks', thumb: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop', videoId: 'IAkfHLNjfAY', spotifyId: '37i9dQZF1DX5q67ZpWyRrZ', bpm: 145 },
      { title: 'Rage Bollywood', subtitle: 'Intense Hindi · 14 tracks', thumb: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=200&h=200&fit=crop', videoId: 'FBKq_m0lhDc', spotifyId: '37i9dQZF1DX0XUfZLuQN4a', bpm: 150 },
      { title: 'Desi Trap', subtitle: 'Indian Trap · 12 tracks', thumb: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop', videoId: 'lJw4mVyqkFk', spotifyId: '37i9dQZF1DX0Yxoavh5qJV', bpm: 140 },
    ],
    meditation: { title: 'Anger Release', duration: '7 min', thumb: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&h=200&fit=crop', videoId: 'xuTTAhNBDg0' },
  },

  anxious: {
    emoji: '💨',
    quote: '"Breathe in calm. Exhale worry. You are safe here."',
    gradient: 'from-sky-400 via-blue-500 to-indigo-500',
    gradientBg: 'from-sky-400/15 via-blue-500/10 to-transparent',
    accentHex: '#0ea5e9',
    heroImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop',
    nowPlaying: { title: 'Anxiety Relief', artist: 'Calm Ambient · Healing', videoId: '6LuEK7FgecE', spotifyId: '37i9dQZF1DWZqd5JICZI0u' },
    playlists: [
      { title: 'Safe Haven', subtitle: 'Soft Ambient · 20 tracks', thumb: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&h=200&fit=crop', videoId: '6LuEK7FgecE', spotifyId: '37i9dQZF1DWZqd5JICZI0u', bpm: 50 },
      { title: 'Grounding Beats', subtitle: 'Nature Lo-fi · 16 tracks', thumb: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=200&fit=crop', videoId: 'jfKfPfyJRdk', spotifyId: '37i9dQZF1DX4PP3DA4J0N8', bpm: 65 },
      { title: 'Slow Breath', subtitle: 'Meditation Music · 10 tracks', thumb: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=200&h=200&fit=crop', videoId: '1ZYbU82GVz4', spotifyId: '37i9dQZF1DWZd79rJ6a7lp', bpm: 55 },
    ],
    hindiNowPlaying: { title: 'Raataan Lambiyan', artist: 'Jubin Nautiyal · Asees Kaur', videoId: '_ik4jcamVeI', spotifyId: '37i9dQZF1DWTtTyjgSrRoB' },
    hindiPlaylists: [
      { title: 'Bollywood Sukoon', subtitle: 'Calming Hindi · 20 tracks', thumb: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&h=200&fit=crop', videoId: 'QKEPaZK9vdI', spotifyId: '37i9dQZF1DWTtTyjgSrRoB', bpm: 55 },
      { title: 'Hindi Lofi Chill', subtitle: 'Slowed Hindi · 16 tracks', thumb: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=200&fit=crop', videoId: 'cYOB941gyXI', spotifyId: '37i9dQZF1DX18jTM2l2fJY', bpm: 60 },
      { title: 'Sufi Healing', subtitle: 'Sufi Meditation · 12 tracks', thumb: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=200&h=200&fit=crop', videoId: 'BddP6PYo2gs', spotifyId: '37i9dQZF1DX0Yxoavh5qJV', bpm: 50 },
    ],
    meditation: { title: 'Calm Protocol', duration: '10 min', thumb: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=200&h=200&fit=crop', videoId: 'xuTTAhNBDg0' },
  },

  inspired: {
    emoji: '✨',
    quote: '"Your mind is on fire. Create something beautiful."',
    gradient: 'from-fuchsia-500 via-pink-500 to-rose-500',
    gradientBg: 'from-fuchsia-500/15 via-pink-500/10 to-transparent',
    accentHex: '#d946ef',
    heroImage: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=400&fit=crop',
    nowPlaying: { title: 'Creative Flow', artist: 'Chill Electronic · Studio', videoId: '5qap5aO4i9A', spotifyId: '37i9dQZF1DX56bqlsMxJYR' },
    playlists: [
      { title: 'Flow State', subtitle: 'Deep Focus · 22 tracks', thumb: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=200&h=200&fit=crop', videoId: '5qap5aO4i9A', spotifyId: '37i9dQZF1DX56bqlsMxJYR', bpm: 90 },
      { title: 'Studio Sessions', subtitle: 'Creative Lo-fi · 18 tracks', thumb: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=200&h=200&fit=crop', videoId: 'jfKfPfyJRdk', spotifyId: '37i9dQZF1DWWQRwui0ExPn', bpm: 85 },
      { title: 'Dream Canvas', subtitle: 'Chillwave · 14 tracks', thumb: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop', videoId: '3AtDnEC4zak', spotifyId: '37i9dQZF1DX6ziVCJnEm59', bpm: 95 },
    ],
    hindiNowPlaying: { title: 'Apna Bana Le', artist: 'Arijit Singh · Bhediya', videoId: '1ygdXiAVCKs', spotifyId: '37i9dQZF1DX18jTM2l2fJY' },
    hindiPlaylists: [
      { title: 'Rahman Magic', subtitle: 'A.R. Rahman · 22 tracks', thumb: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=200&h=200&fit=crop', videoId: 'atGMSIBFN04', spotifyId: '37i9dQZF1DX18jTM2l2fJY', bpm: 90 },
      { title: 'Indie Hindi', subtitle: 'New Age Hindi · 16 tracks', thumb: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=200&h=200&fit=crop', videoId: '_ik4jcamVeI', spotifyId: '37i9dQZF1DX0XUfZLuQN4a', bpm: 85 },
      { title: 'Creative Hindi', subtitle: 'Fusion · 14 tracks', thumb: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop', videoId: '1ygdXiAVCKs', spotifyId: '37i9dQZF1DX0Yxoavh5qJV', bpm: 95 },
    ],
    meditation: { title: 'Vision Board', duration: '6 min', thumb: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=200&h=200&fit=crop', videoId: '6LuEK7FgecE' },
  },

  tired: {
    emoji: '😴',
    quote: '"Rest is not weakness. Recharge your soul."',
    gradient: 'from-slate-400 via-gray-500 to-zinc-600',
    gradientBg: 'from-slate-400/15 via-gray-500/10 to-transparent',
    accentHex: '#94a3b8',
    heroImage: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=800&h=400&fit=crop',
    nowPlaying: { title: 'Sleep Waves', artist: 'ASMR Ambient · 432Hz', videoId: '1ZYbU82GVz4', spotifyId: '37i9dQZF1DWZd79rJ6a7lp' },
    playlists: [
      { title: 'Pillow Talk', subtitle: 'Sleep Lo-fi · 20 tracks', thumb: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=200&h=200&fit=crop', videoId: '1ZYbU82GVz4', spotifyId: '37i9dQZF1DWZd79rJ6a7lp', bpm: 50 },
      { title: 'Drift Off', subtitle: 'Ambient Sleep · 12 tracks', thumb: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=200&h=200&fit=crop', videoId: '6LuEK7FgecE', spotifyId: '37i9dQZF1DX2yvmlOdMYzV', bpm: 45 },
      { title: 'Night Sky', subtitle: 'Soft Piano · 15 tracks', thumb: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&h=200&fit=crop', videoId: 'jfKfPfyJRdk', spotifyId: '37i9dQZF1DX4sWSpwq3LiO', bpm: 55 },
    ],
    hindiNowPlaying: { title: 'Gerua', artist: 'Arijit Singh · Antara Mitra', videoId: 'QKEPaZK9vdI', spotifyId: '37i9dQZF1DWTtTyjgSrRoB' },
    hindiPlaylists: [
      { title: 'Bollywood Lullaby', subtitle: 'Sleep Hindi · 16 tracks', thumb: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=200&h=200&fit=crop', videoId: 'BddP6PYo2gs', spotifyId: '37i9dQZF1DWTtTyjgSrRoB', bpm: 50 },
      { title: 'Hindi Lo-fi Sleep', subtitle: 'Slowed Reverb · 14 tracks', thumb: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=200&h=200&fit=crop', videoId: 'cYOB941gyXI', spotifyId: '37i9dQZF1DX18jTM2l2fJY', bpm: 45 },
      { title: 'Soft Hindi Piano', subtitle: 'Instrumental · 12 tracks', thumb: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&h=200&fit=crop', videoId: 'QKEPaZK9vdI', spotifyId: '37i9dQZF1DX0Yxoavh5qJV', bpm: 55 },
    ],
    meditation: { title: 'Sleep Journey', duration: '15 min', thumb: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=200&h=200&fit=crop', videoId: '1ZYbU82GVz4' },
  },
};
