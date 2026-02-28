import type { Mood } from '../context/AppContext';
import { getEntries, getEntriesForRange, getStreak, type MoodEntry } from './moodHistory';

export interface MoodFrequency {
  mood: Mood;
  count: number;
  percentage: number;
}

export interface DailyAverage {
  day: string; // 'Mon', 'Tue', ...
  energy: number;
  pleasantness: number;
  count: number;
}

export interface InsightText {
  title: string;
  body: string;
  icon: string;
  color: string;
}

export interface WeeklyReport {
  totalEntries: number;
  streak: number;
  topMood: MoodFrequency;
  moodFrequencies: MoodFrequency[];
  avgEnergy: number;
  avgPleasantness: number;
  energyTrend: number; // % change vs previous week
  dailyAverages: DailyAverage[];
  insights: InsightText[];
  weatherCorrelation: string | null;
  timePatterns: string[];
}

export function generateWeeklyReport(): WeeklyReport {
  const thisWeek = getEntriesForRange(7);
  const lastWeek = getEntriesForRange(14).filter(
    e => e.timestamp < Date.now() - 7 * 86400000
  );

  const totalEntries = thisWeek.length;
  const streak = getStreak();

  // Mood frequencies
  const moodCounts: Partial<Record<Mood, number>> = {};
  thisWeek.forEach(e => { moodCounts[e.mood] = (moodCounts[e.mood] || 0) + 1; });
  const moodFrequencies: MoodFrequency[] = Object.entries(moodCounts)
    .map(([mood, count]) => ({
      mood: mood as Mood,
      count: count!,
      percentage: totalEntries ? Math.round((count! / totalEntries) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);
  const topMood = moodFrequencies[0] || { mood: 'calm' as Mood, count: 0, percentage: 0 };

  // Averages
  const avgEnergy = totalEntries ? Math.round(thisWeek.reduce((s, e) => s + e.energy, 0) / totalEntries) : 50;
  const avgPleasantness = totalEntries ? Math.round(thisWeek.reduce((s, e) => s + e.pleasantness, 0) / totalEntries) : 50;

  // Energy trend
  const lastWeekAvgEnergy = lastWeek.length
    ? Math.round(lastWeek.reduce((s, e) => s + e.energy, 0) / lastWeek.length)
    : avgEnergy;
  const energyTrend = lastWeekAvgEnergy ? Math.round(((avgEnergy - lastWeekAvgEnergy) / lastWeekAvgEnergy) * 100) : 0;

  // Daily averages
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dailyAverages: DailyAverage[] = dayNames.map(day => {
    const dayEntries = thisWeek.filter(e => dayNames[new Date(e.timestamp).getDay()] === day);
    return {
      day,
      energy: dayEntries.length ? Math.round(dayEntries.reduce((s, e) => s + e.energy, 0) / dayEntries.length) : 0,
      pleasantness: dayEntries.length ? Math.round(dayEntries.reduce((s, e) => s + e.pleasantness, 0) / dayEntries.length) : 0,
      count: dayEntries.length,
    };
  });

  // Generate insights
  const insights = generateInsights(thisWeek, lastWeek, topMood, avgEnergy, dailyAverages);

  // Weather correlation
  const weatherCorrelation = analyzeWeatherCorrelation(thisWeek);

  // Time patterns
  const timePatterns = analyzeTimePatterns(thisWeek);

  return {
    totalEntries, streak, topMood, moodFrequencies,
    avgEnergy, avgPleasantness, energyTrend,
    dailyAverages, insights, weatherCorrelation, timePatterns,
  };
}

function generateInsights(
  thisWeek: MoodEntry[],
  lastWeek: MoodEntry[],
  topMood: MoodFrequency,
  avgEnergy: number,
  dailyAverages: DailyAverage[],
): InsightText[] {
  const insights: InsightText[] = [];

  if (thisWeek.length >= 3) {
    insights.push({
      title: 'Dominant Mood',
      body: `You felt "${topMood.mood}" ${topMood.percentage}% of the time this week. ${
        topMood.mood === 'happy' || topMood.mood === 'calm' || topMood.mood === 'inspired'
          ? 'That\'s great — keep it up!'
          : 'Try the Mood Shift feature to explore transitional playlists.'
      }`,
      icon: 'auto_awesome',
      color: '#7c5cfc',
    });
  }

  const peakDay = dailyAverages.reduce((best, d) => d.energy > best.energy ? d : best, dailyAverages[0]);
  if (peakDay && peakDay.energy > 0) {
    insights.push({
      title: 'Peak Energy Day',
      body: `Your energy peaks on ${peakDay.day}s (avg ${peakDay.energy}%). Schedule important tasks on this day.`,
      icon: 'bolt',
      color: '#ff6b9d',
    });
  }

  if (lastWeek.length > 0 && thisWeek.length > 0) {
    const thisAvgP = thisWeek.reduce((s, e) => s + e.pleasantness, 0) / thisWeek.length;
    const lastAvgP = lastWeek.reduce((s, e) => s + e.pleasantness, 0) / lastWeek.length;
    const change = Math.round(((thisAvgP - lastAvgP) / lastAvgP) * 100);
    if (Math.abs(change) >= 5) {
      insights.push({
        title: change > 0 ? 'Upward Trend' : 'Emotional Dip',
        body: change > 0
          ? `Your overall pleasantness is up ${change}% from last week. Keep doing what you\'re doing!`
          : `Your pleasantness dropped ${Math.abs(change)}% vs last week. A Guided Journey might help reset.`,
        icon: change > 0 ? 'trending_up' : 'trending_down',
        color: change > 0 ? '#00d4aa' : '#f59e0b',
      });
    }
  }

  if (avgEnergy < 35) {
    insights.push({
      title: 'Low Energy Alert',
      body: 'Your average energy is below 35% this week. Try the Morning Energize journey to start your day with more energy.',
      icon: 'battery_alert',
      color: '#ef4444',
    });
  }

  if (insights.length === 0) {
    insights.push({
      title: 'Getting Started',
      body: 'Log more moods to unlock personalized insights! We need at least 3 entries this week.',
      icon: 'psychology',
      color: '#7c5cfc',
    });
  }

  return insights;
}

function analyzeWeatherCorrelation(entries: MoodEntry[]): string | null {
  const withWeather = entries.filter(e => e.weather);
  if (withWeather.length < 3) return null;

  const rainy = withWeather.filter(e => e.weather!.condition.includes('Rain'));
  const clear = withWeather.filter(e => e.weather!.condition.includes('Clear'));

  if (rainy.length >= 2 && clear.length >= 2) {
    const rainyEnergy = rainy.reduce((s, e) => s + e.energy, 0) / rainy.length;
    const clearEnergy = clear.reduce((s, e) => s + e.energy, 0) / clear.length;
    const diff = Math.round(clearEnergy - rainyEnergy);
    if (Math.abs(diff) >= 10) {
      return diff > 0
        ? `Sunny days boost your energy by ~${diff}% compared to rainy days.`
        : `Interestingly, rainy days give you ${Math.abs(diff)}% more energy than sunny ones.`;
    }
  }
  return null;
}

function analyzeTimePatterns(entries: MoodEntry[]): string[] {
  const patterns: string[] = [];
  const morning = entries.filter(e => { const h = new Date(e.timestamp).getHours(); return h >= 6 && h < 12; });
  const evening = entries.filter(e => { const h = new Date(e.timestamp).getHours(); return h >= 18 && h < 24; });

  if (morning.length >= 2 && evening.length >= 2) {
    const mornEnergy = morning.reduce((s, e) => s + e.energy, 0) / morning.length;
    const eveEnergy = evening.reduce((s, e) => s + e.energy, 0) / evening.length;
    if (mornEnergy > eveEnergy + 10) patterns.push('You\'re a morning person — energy is higher before noon.');
    else if (eveEnergy > mornEnergy + 10) patterns.push('Night owl detected — your energy peaks in the evening.');
  }

  const allEntries = getEntries();
  if (allEntries.length >= 7) {
    patterns.push(`You\'ve logged ${allEntries.length} total entries. Consistency builds better insights.`);
  }

  return patterns;
}
