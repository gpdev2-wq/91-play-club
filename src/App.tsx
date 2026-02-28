import { useApp } from './context/AppContext';
import { MOOD_DATA } from './data/moodData';
import Toast from './components/Toast';
import MusicPlayer from './components/MusicPlayer';
import Splash from './screens/Splash';
import Onboarding from './screens/Onboarding';
import Login from './screens/Login';
import Signup from './screens/Signup';
import MoodHome from './screens/MoodHome';
import MoodDiary from './screens/MoodDiary';
import DiarySaved from './screens/DiarySaved';
import SyncResult from './screens/SyncResult';
import Meditation from './screens/Meditation';
import AIInsights from './screens/AIInsights';
import Profile from './screens/Profile';
import Premium from './screens/Premium';
import MoodJourney from './screens/MoodJourney';
import WeeklyRecap from './screens/WeeklyRecap';
import FriendsFeed from './screens/FriendsFeed';
import MoodShift from './screens/MoodShift';
import GuidedJourney from './screens/GuidedJourney';
import SpotifyConnect from './screens/SpotifyConnect';
import MoodBuddy from './screens/MoodBuddy';
import SendVibe from './screens/SendVibe';
import WeeklyReport from './screens/WeeklyReport';
import PrivacyPolicy from './screens/PrivacyPolicy';
import Settings from './screens/Settings';

const SCREENS: Record<string, React.ComponentType> = {
  splash: Splash,
  onboarding: Onboarding,
  login: Login,
  signup: Signup,
  'mood-home': MoodHome,
  'mood-diary': MoodDiary,
  'diary-saved': DiarySaved,
  'sync-result': SyncResult,
  meditation: Meditation,
  'ai-insights': AIInsights,
  profile: Profile,
  premium: Premium,
  'mood-journey': MoodJourney,
  'weekly-recap': WeeklyRecap,
  'friends-feed': FriendsFeed,
  'mood-shift': MoodShift,
  'guided-journey': GuidedJourney,
  'spotify-connect': SpotifyConnect,
  'mood-buddy': MoodBuddy,
  'send-vibe': SendVibe,
  'weekly-report': WeeklyReport,
  'privacy-policy': PrivacyPolicy,
  settings: Settings,
};

export default function App() {
  const { screen, mood } = useApp();
  const ScreenComponent = SCREENS[screen] || MoodHome;
  const moodColor = MOOD_DATA[mood].accentHex;

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-dark">
      {/* Mood-reactive ambient glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden transition-all duration-[1500ms]">
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[200px] transition-all duration-[1500ms]"
          style={{ background: moodColor, opacity: 0.04 }}
        />
        <div
          className="absolute -bottom-60 -right-40 w-[500px] h-[500px] rounded-full blur-[180px] transition-all duration-[1500ms]"
          style={{ background: moodColor, opacity: 0.03 }}
        />
      </div>

      <ScreenComponent />
      <Toast />
      <MusicPlayer />
    </div>
  );
}
