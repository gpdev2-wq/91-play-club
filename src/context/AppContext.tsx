import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from 'react';
import { seedDemoData } from '../services/moodHistory';
import { supabase, supabaseConfigured } from '../lib/supabaseClient';

export type Screen =
  | 'splash' | 'onboarding' | 'login' | 'signup'
  | 'mood-home' | 'mood-diary' | 'diary-saved' | 'sync-result'
  | 'meditation' | 'ai-insights' | 'profile' | 'premium'
  | 'mood-journey' | 'weekly-recap' | 'friends-feed'
  | 'mood-shift' | 'guided-journey' | 'spotify-connect'
  | 'mood-buddy' | 'send-vibe' | 'export-data' | 'weekly-report' | 'privacy-policy' | 'settings';

export type Mood = 'happy' | 'motivated' | 'calm' | 'sad' | 'lonely' | 'angry' | 'anxious' | 'inspired' | 'tired';

const ALL_SCREENS: Set<string> = new Set([
  'splash','onboarding','login','signup','mood-home','mood-diary','diary-saved',
  'sync-result','meditation','ai-insights','profile','premium','mood-journey',
  'weekly-recap','friends-feed','mood-shift','guided-journey','spotify-connect',
  'mood-buddy','send-vibe','export-data','weekly-report','privacy-policy','settings',
]);

const ALL_MOODS: Set<string> = new Set([
  'happy','motivated','calm','sad','lonely','angry','anxious','inspired','tired',
]);

export const MOOD_LABELS: Record<Mood, string> = {
  happy: 'Happy', motivated: 'Motivated', calm: 'Calm', sad: 'Sad',
  lonely: 'Lonely', angry: 'Angry', anxious: 'Anxious', inspired: 'Inspired', tired: 'Tired',
};

// ─── Persistence ───

const PERSIST_KEY = 'moodsync_state';

interface PersistedState {
  screen: Screen;
  mood: Mood;
  isLoggedIn: boolean;
}

function loadPersisted(): PersistedState | null {
  try {
    const raw = localStorage.getItem(PERSIST_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (ALL_SCREENS.has(parsed.screen) && ALL_MOODS.has(parsed.mood)) {
      return parsed as PersistedState;
    }
  } catch { /* corrupt */ }
  return null;
}

function savePersisted(s: PersistedState) {
  localStorage.setItem(PERSIST_KEY, JSON.stringify(s));
}

function screenFromHash(): Screen | null {
  const h = window.location.hash.replace('#', '');
  return ALL_SCREENS.has(h) ? h as Screen : null;
}

// ─── State ───

export type MusicSource = 'youtube' | 'spotify';
export type MusicLang = 'english' | 'hindi';

const SOURCE_KEY = 'moodsync_music_source';
const LANG_KEY = 'moodsync_music_lang';

function getPersistedSource(): MusicSource {
  return (localStorage.getItem(SOURCE_KEY) as MusicSource) || 'spotify';
}

function getPersistedLang(): MusicLang {
  return (localStorage.getItem(LANG_KEY) as MusicLang) || 'english';
}

interface AppState {
  screen: Screen;
  mood: Mood;
  targetMood: Mood | null;
  isLoggedIn: boolean;
  userName: string | null;
  userEmail: string | null;
  toast: string | null;
  musicVideoId: string | null;
  musicSpotifyId: string | null;
  musicSource: MusicSource;
  musicLang: MusicLang;
  musicOpen: boolean;
  activeJourneyId: string | null;
  history: Screen[];
}

interface AppContextType extends AppState {
  navigate: (screen: Screen) => void;
  goBack: () => void;
  setMood: (mood: Mood) => void;
  setTargetMood: (mood: Mood | null) => void;
  login: () => void;
  logout: () => void;
  showToast: (msg: string) => void;
  playMusic: (videoId: string, spotifyId?: string) => void;
  closeMusic: () => void;
  setMusicSource: (source: MusicSource) => void;
  setMusicLang: (lang: MusicLang) => void;
  startJourney: (journeyId: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

function getInitialState(): AppState {
  const persisted = loadPersisted();
  const hashScreen = screenFromHash();

  let screen: Screen = 'splash';
  let isLoggedIn = false;
  let mood: Mood = 'happy';

  if (persisted && persisted.isLoggedIn) {
    isLoggedIn = true;
    mood = persisted.mood;
    screen = hashScreen && hashScreen !== 'splash' && hashScreen !== 'onboarding'
      ? hashScreen
      : persisted.screen;
    // Don't restore to auth screens if logged in
    if (screen === 'splash' || screen === 'onboarding' || screen === 'login' || screen === 'signup') {
      screen = 'mood-home';
    }
  }

  return {
    screen,
    mood,
    targetMood: null,
    isLoggedIn,
    userName: null,
    userEmail: null,
    toast: null,
    musicVideoId: null,
    musicSpotifyId: null,
    musicSource: getPersistedSource(),
    musicLang: getPersistedLang(),
    musicOpen: false,
    activeJourneyId: null,
    history: [],
  };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(getInitialState);
  const isPopstateRef = useRef(false);

  useEffect(() => { seedDemoData(); }, []);

  // Supabase auth session sync (only when env vars are set)
  useEffect(() => {
    if (!supabaseConfigured) return;

    supabase.auth.getSession().then(({ data }) => {
      const session = data.session;
      if (session) {
        setState(s => ({
          ...s,
          isLoggedIn: true,
          userEmail: session.user.email ?? null,
          userName: (session.user.user_metadata?.full_name as string) || null,
          screen: s.screen === 'login' || s.screen === 'signup' || s.screen === 'splash' ? 'mood-home' : s.screen,
        }));
      }
    }).catch(() => {});

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setState(s => ({
        ...s,
        isLoggedIn: !!session,
        userEmail: session?.user.email ?? null,
        userName: session ? ((session.user.user_metadata?.full_name as string) || null) : null,
        screen: session
          ? (s.screen === 'login' || s.screen === 'signup' || s.screen === 'splash' || s.screen === 'onboarding' ? 'mood-home' : s.screen)
          : 'login',
        history: session ? s.history : [],
      }));
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  // Sync hash when screen changes (skip if triggered by popstate)
  useEffect(() => {
    if (isPopstateRef.current) {
      isPopstateRef.current = false;
      return;
    }
    const currentHash = window.location.hash.replace('#', '');
    if (currentHash !== state.screen) {
      window.history.pushState({ screen: state.screen }, '', `#${state.screen}`);
    }
  }, [state.screen]);

  // Persist important state
  useEffect(() => {
    savePersisted({ screen: state.screen, mood: state.mood, isLoggedIn: state.isLoggedIn });
  }, [state.screen, state.mood, state.isLoggedIn]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopstate = (e: PopStateEvent) => {
      const targetScreen = e.state?.screen || screenFromHash();
      if (targetScreen && ALL_SCREENS.has(targetScreen)) {
        isPopstateRef.current = true;
        setState(s => ({ ...s, screen: targetScreen as Screen }));
      }
    };

    window.addEventListener('popstate', handlePopstate);

    // Set initial history entry
    if (!window.history.state?.screen) {
      window.history.replaceState({ screen: state.screen }, '', `#${state.screen}`);
    }

    return () => window.removeEventListener('popstate', handlePopstate);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const navigate = useCallback((screen: Screen) => {
    setState(s => ({
      ...s,
      history: [...s.history, s.screen],
      screen,
    }));
  }, []);

  const goBack = useCallback(() => {
    setState(s => {
      const history = [...s.history];
      const prev = history.pop() || 'mood-home';
      return { ...s, screen: prev, history };
    });
  }, []);

  const setMood = useCallback((mood: Mood) => {
    setState(s => ({ ...s, mood }));
  }, []);

  const setTargetMood = useCallback((targetMood: Mood | null) => {
    setState(s => ({ ...s, targetMood }));
  }, []);

  const login = useCallback(() => {
    // Supabase auth listener will handle isLoggedIn and screen.
    setState(s => ({ ...s }));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(PERSIST_KEY);
    if (supabaseConfigured) {
      supabase.auth.signOut().catch(() => {}).finally(() => {
        setState(s => ({ ...s, isLoggedIn: false, screen: 'login', history: [] }));
      });
    } else {
      setState(s => ({ ...s, isLoggedIn: false, screen: 'login', history: [] }));
    }
  }, []);

  const showToast = useCallback((msg: string) => {
    setState(s => ({ ...s, toast: msg }));
    setTimeout(() => setState(s => ({ ...s, toast: null })), 2800);
  }, []);

  const playMusic = useCallback((videoId: string, spotifyId?: string) => {
    setState(s => ({ ...s, musicVideoId: videoId, musicSpotifyId: spotifyId || null, musicOpen: true }));
  }, []);

  const closeMusic = useCallback(() => {
    setState(s => ({ ...s, musicOpen: false }));
  }, []);

  const setMusicSource = useCallback((source: MusicSource) => {
    localStorage.setItem(SOURCE_KEY, source);
    setState(s => ({ ...s, musicSource: source }));
  }, []);

  const setMusicLang = useCallback((lang: MusicLang) => {
    localStorage.setItem(LANG_KEY, lang);
    setState(s => ({ ...s, musicLang: lang }));
  }, []);

  const startJourney = useCallback((journeyId: string) => {
    setState(s => ({
      ...s,
      activeJourneyId: journeyId,
      history: [...s.history, s.screen],
      screen: 'guided-journey',
    }));
  }, []);

  return (
    <AppContext.Provider value={{
      ...state, navigate, goBack, setMood, setTargetMood,
      login, logout, showToast, playMusic, closeMusic, setMusicSource, setMusicLang, startJourney,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
