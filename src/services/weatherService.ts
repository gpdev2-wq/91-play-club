export interface WeatherData {
  temp: number;
  condition: string;
  icon: string;
  city: string;
}

const CACHE_KEY = 'moodsync_weather';
const CACHE_TTL = 30 * 60 * 1000; // 30 min

function getCached(): WeatherData | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) return null;
    return data;
  } catch { return null; }
}

function setCache(data: WeatherData) {
  localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
}

const WEATHER_ICONS: Record<string, string> = {
  Clear: '☀️', Sunny: '☀️',
  'Partly cloudy': '⛅', Cloudy: '☁️', Overcast: '☁️',
  Rain: '🌧️', 'Light rain': '🌦️', 'Heavy rain': '🌧️',
  Snow: '❄️', Fog: '🌫️', Mist: '🌫️',
  Thunderstorm: '⛈️', Drizzle: '🌦️',
};

function getIcon(condition: string): string {
  for (const [key, icon] of Object.entries(WEATHER_ICONS)) {
    if (condition.toLowerCase().includes(key.toLowerCase())) return icon;
  }
  return '🌤️';
}

export async function getWeather(): Promise<WeatherData | null> {
  const cached = getCached();
  if (cached) return cached;

  try {
    const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 })
    );

    const { latitude, longitude } = pos.coords;

    // Open-Meteo: free, no API key required
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`
    );
    const json = await res.json();

    const temp = Math.round(json.current.temperature_2m);
    const code = json.current.weather_code;
    const condition = weatherCodeToCondition(code);

    // Reverse geocode for city name
    let city = 'Your Area';
    try {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=&latitude=${latitude}&longitude=${longitude}&count=1`);
      const geoJson = await geoRes.json();
      if (geoJson.results?.[0]?.name) city = geoJson.results[0].name;
    } catch { /* fallback to default */ }

    const data: WeatherData = { temp, condition, icon: getIcon(condition), city };
    setCache(data);
    return data;
  } catch {
    return null;
  }
}

function weatherCodeToCondition(code: number): string {
  if (code === 0) return 'Clear';
  if (code <= 3) return 'Partly cloudy';
  if (code <= 48) return 'Fog';
  if (code <= 57) return 'Drizzle';
  if (code <= 67) return 'Rain';
  if (code <= 77) return 'Snow';
  if (code <= 82) return 'Heavy rain';
  if (code <= 86) return 'Snow';
  if (code >= 95) return 'Thunderstorm';
  return 'Cloudy';
}

export function getTimeOfDay(): 'morning' | 'afternoon' | 'evening' | 'night' {
  const h = new Date().getHours();
  if (h < 6) return 'night';
  if (h < 12) return 'morning';
  if (h < 18) return 'afternoon';
  if (h < 22) return 'evening';
  return 'night';
}

export function getGreeting(): string {
  const t = getTimeOfDay();
  switch (t) {
    case 'morning': return 'Good morning';
    case 'afternoon': return 'Good afternoon';
    case 'evening': return 'Good evening';
    case 'night': return 'Late night';
  }
}
