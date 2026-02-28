import type { Mood } from '../context/AppContext';

export interface MoodEntry {
  id: string;
  mood: Mood;
  energy: number;      // 0-100 (low → high)
  pleasantness: number; // 0-100 (negative → positive)
  context: string[];   // 'after-work', 'morning', 'post-workout', etc.
  journal: string;
  tags: string[];
  timestamp: number;
  weather?: { temp: number; condition: string; icon: string };
}

const STORAGE_KEY = 'moodsync_history';

function load(): MoodEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function save(entries: MoodEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function addEntry(entry: Omit<MoodEntry, 'id' | 'timestamp'>): MoodEntry {
  const full: MoodEntry = {
    ...entry,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
  };
  const entries = load();
  entries.unshift(full);
  save(entries);
  return full;
}

export function getEntries(): MoodEntry[] {
  return load();
}

export function getEntriesForRange(days: number): MoodEntry[] {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return load().filter(e => e.timestamp >= cutoff);
}

export function getTodayEntries(): MoodEntry[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return load().filter(e => e.timestamp >= today.getTime());
}

export function getStreak(): number {
  const entries = load();
  if (entries.length === 0) return 0;

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let d = 0; d < 365; d++) {
    const dayStart = today.getTime() - d * 86400000;
    const dayEnd = dayStart + 86400000;
    const hasEntry = entries.some(e => e.timestamp >= dayStart && e.timestamp < dayEnd);
    if (hasEntry) streak++;
    else if (d > 0) break;
  }
  return streak;
}

export function exportAsCSV(): string {
  const entries = load();
  const header = 'Date,Time,Mood,Energy,Pleasantness,Context,Tags,Journal,Weather\n';
  const rows = entries.map(e => {
    const d = new Date(e.timestamp);
    return [
      d.toLocaleDateString(),
      d.toLocaleTimeString(),
      e.mood,
      e.energy,
      e.pleasantness,
      `"${e.context.join(', ')}"`,
      `"${e.tags.join(', ')}"`,
      `"${e.journal.replace(/"/g, '""')}"`,
      e.weather ? `${e.weather.temp}°C ${e.weather.condition}` : '',
    ].join(',');
  }).join('\n');
  return header + rows;
}

export function exportAsJSON(): string {
  return JSON.stringify(load(), null, 2);
}

export function downloadExport(format: 'csv' | 'json') {
  const content = format === 'csv' ? exportAsCSV() : exportAsJSON();
  const blob = new Blob([content], { type: format === 'csv' ? 'text/csv' : 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `91playclub-mood-history.${format}`;
  a.click();
  URL.revokeObjectURL(url);
}

export function seedDemoData() {
  const existing = load();
  if (existing.length >= 7) return;

  const moods: Mood[] = ['calm', 'happy', 'motivated', 'happy', 'sad', 'calm', 'inspired', 'motivated', 'happy', 'calm', 'tired', 'happy', 'calm', 'motivated'];
  const contexts = ['morning', 'after-work', 'evening', 'morning', 'night', 'afternoon', 'morning'];
  const now = Date.now();

  const demo: MoodEntry[] = moods.map((mood, i) => ({
    id: crypto.randomUUID(),
    mood,
    energy: 30 + Math.floor(Math.random() * 50),
    pleasantness: 40 + Math.floor(Math.random() * 40),
    context: [contexts[i % contexts.length]],
    journal: '',
    tags: [],
    timestamp: now - (moods.length - i) * 86400000 + Math.random() * 43200000,
    weather: { temp: 18 + Math.floor(Math.random() * 12), condition: ['Clear', 'Cloudy', 'Rain'][i % 3], icon: '☀️' },
  }));

  save([...demo, ...existing]);
}
