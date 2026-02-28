import { useApp } from '../context/AppContext';
import Icon from '../components/Icon';

export default function DiarySaved() {
  const { navigate } = useApp();

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 bg-dark animate-fadeIn">
      <button
        onClick={() => navigate('mood-home')}
        className="absolute top-6 right-6 p-2 rounded-full glass hover:bg-surface-light transition"
      >
        <Icon name="close" size={20} />
      </button>

      <div className="flex flex-col items-center text-center max-w-xs">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 shadow-lg shadow-primary/30"
          style={{ animation: 'breathe 2s ease-in-out infinite' }}
        >
          <Icon name="auto_awesome" size={36} className="text-white" />
        </div>

        <h1 className="text-2xl font-bold mb-2">Thought Saved</h1>
        <p className="text-text-dim text-sm mb-8">Mood Synced to Cloud</p>

        <div className="glass rounded-2xl p-5 w-full mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="psychology" className="text-primary" size={20} />
            <h3 className="text-sm font-semibold">Daily Insight</h3>
          </div>
          <p className="text-sm text-text-dim leading-relaxed">
            Your focus today is shifting toward growth. This energy is perfectly aligned with your recent trends. Keep going.
          </p>
        </div>

        <button
          onClick={() => navigate('mood-home')}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] transition-all"
        >
          <Icon name="check_circle" size={20} />
          Done
        </button>
      </div>
    </div>
  );
}
