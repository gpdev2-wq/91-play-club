import { useApp } from '../context/AppContext';
import Icon from '../components/Icon';
import ScreenWrapper from '../components/ScreenWrapper';

const SECTIONS = [
  {
    title: 'Information We Collect',
    content: `91 Play Club stores your data locally on your device. We collect:
• Mood entries (mood, energy level, pleasantness, journal text, tags)
• Music preferences (language, source)
• App settings and login state
• Location data (only for weather features, with your permission)

All mood data is stored in your browser's local storage and never sent to our servers.`,
  },
  {
    title: 'Third-Party Services',
    content: `91 Play Club integrates with optional third-party services:
• Spotify — If you connect your Spotify account, we use Spotify's API to display your profile and top tracks. We store your access tokens locally. Spotify's own privacy policy applies to their service.
• YouTube — We embed YouTube videos for music playback. YouTube's privacy policy applies.
• Open-Meteo — We use this free weather API with your approximate location to show weather data. No personal data is shared.`,
  },
  {
    title: 'How We Use Your Data',
    content: `Your mood data is used to:
• Display your mood history and trends
• Generate personalized insights (computed locally on your device)
• Recommend music based on your current mood

We do not sell, share, or transmit your personal data to third parties.`,
  },
  {
    title: 'Data Storage & Security',
    content: `All data is stored locally in your browser's storage. We do not operate backend servers that store your personal information. You can delete all your data at any time from the Profile screen.`,
  },
  {
    title: 'Data Deletion',
    content: `You can delete all your data at any time by going to Profile → Delete All Data. This permanently removes all mood entries, preferences, and connected service tokens from your device.`,
  },
  {
    title: 'Health Disclaimer',
    content: `91 Play Club is a general entertainment app designed for social and wellness-inspired features. It is NOT a medical device and does NOT provide medical advice, diagnosis, or treatment.

The breathing exercises, mood tracking, and insights provided should not be considered a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider with any questions regarding a medical or mental health condition.

If you are experiencing a mental health crisis, please contact emergency services or a crisis helpline immediately.`,
  },
  {
    title: 'Children\'s Privacy',
    content: `91 Play Club is not intended for children under 13. We do not knowingly collect information from children under 13.`,
  },
  {
    title: 'Changes to This Policy',
    content: `We may update this privacy policy from time to time. Changes will be reflected in the app with an updated date.`,
  },
];

export default function PrivacyPolicy() {
  const { goBack } = useApp();

  return (
    <ScreenWrapper>
      <div className="px-5 pt-14 pb-12 animate-fadeIn">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={goBack} className="p-1.5 rounded-xl glass hover:bg-surface-light transition">
            <Icon name="arrow_back" size={20} />
          </button>
          <div>
            <h1 className="text-lg font-bold">Privacy Policy</h1>
            <p className="text-[11px] text-white/40">Last updated: February 2026</p>
          </div>
        </div>

        <div className="glass rounded-2xl p-5 mb-6">
          <p className="text-sm text-white/70 leading-relaxed">
            91 Play Club ("we", "our", "the app") is committed to protecting your privacy. This policy explains what data we collect, how we use it, and your rights.
          </p>
        </div>

        <div className="space-y-4">
          {SECTIONS.map((section, i) => (
            <div key={i} className="glass rounded-2xl p-5">
              <h3 className="text-sm font-semibold mb-3">{section.title}</h3>
              <p className="text-xs text-white/50 leading-relaxed whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 glass rounded-2xl p-4 border border-accent-amber/20">
          <div className="flex items-start gap-3">
            <Icon name="info" className="text-accent-amber flex-shrink-0 mt-0.5" size={18} />
            <p className="text-xs text-white/50 leading-relaxed">
              For questions about this privacy policy, contact us at privacy@moodsync.app
            </p>
          </div>
        </div>

        <button
          onClick={goBack}
          className="w-full mt-6 text-sm text-text-dim hover:text-white transition text-center py-2"
        >
          ← Back
        </button>
      </div>
    </ScreenWrapper>
  );
}
