import { useApp } from '../context/AppContext';
import Icon from '../components/Icon';

export default function Onboarding() {
  const { navigate } = useApp();

  return (
    <div className="min-h-dvh flex flex-col bg-dark">
      <div className="relative h-64 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=800&h=600&fit=crop"
          alt="Gaming club"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/50 to-dark" />
      </div>

      <div className="flex-1 px-6 -mt-8 relative z-10 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <Icon name="graphic_eq" className="text-primary" size={28} />
          <button
            onClick={() => navigate('login')}
            className="text-text-dim text-sm hover:text-white transition"
          >
            Skip
          </button>
        </div>

        <div className="flex gap-3 mb-4">
          <Icon name="sports_esports" className="text-accent" size={32} />
          <Icon name="groups" className="text-accent" size={32} />
        </div>

        <h1 className="text-3xl font-bold mb-3 leading-tight">
          Welcome to<br />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">91 Play Club</span>
        </h1>

        <p className="text-text-dim leading-relaxed mb-8">
          Your social hub for gamers. Discover events, find squads, and play together.
        </p>

        <div className="mt-auto pb-12">
          <button
            onClick={() => navigate('login')}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold text-base flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] transition-all"
          >
            Get Started
            <Icon name="arrow_forward" size={20} />
          </button>

          <div className="flex justify-center gap-1.5 mt-6">
            <span className="w-6 h-1.5 rounded-full bg-primary" />
            <span className="w-1.5 h-1.5 rounded-full bg-surface-lighter" />
            <span className="w-1.5 h-1.5 rounded-full bg-surface-lighter" />
          </div>
        </div>
      </div>
    </div>
  );
}
