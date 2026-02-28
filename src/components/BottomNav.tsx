import { useApp, type Screen } from '../context/AppContext';
import Icon from './Icon';

const NAV_ITEMS: { icon: string; label: string; screen: Screen }[] = [
  { icon: 'home', label: 'Home', screen: 'mood-home' },
  { icon: 'music_note', label: 'Play', screen: 'sync-result' },
  { icon: 'person', label: 'Profile', screen: 'profile' },
];

export default function BottomNav() {
  const { screen, navigate } = useApp();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-[env(safe-area-inset-bottom,8px)] px-5 pointer-events-none">
      <nav
        className="dock-glass pointer-events-auto w-full max-w-[340px] flex items-center justify-between py-2 px-3"
      >
        {NAV_ITEMS.map((item, idx) => {
          const active = item.screen === screen;
          const isCenter = idx === 1;

          if (isCenter) {
            return (
              <button
                key={item.screen}
                onClick={() => navigate(item.screen)}
                className="dock-item relative -translate-y-4 flex flex-col items-center justify-center w-16 h-16 rounded-full transition-all duration-300"
                style={{
                  background: 'radial-gradient(circle at 30% 0%, rgba(255,255,255,0.3) 0, transparent 55%), linear-gradient(145deg, rgba(124,92,252,0.95), rgba(255,107,157,0.95))',
                  boxShadow: '0 18px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.18)',
                }}
              >
                <div className="absolute inset-1 rounded-full border border-white/20 opacity-80" />
                <Icon
                  name={item.icon}
                  filled
                  size={24}
                  className="relative text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.7)]"
                />
                <span className="relative text-[9px] font-semibold mt-0.5 text-white/90">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.screen}
              onClick={() => navigate(item.screen)}
              className="dock-item relative flex flex-col items-center justify-center w-14 h-12 rounded-2xl transition-all duration-300"
              style={active ? {
                background: 'linear-gradient(180deg, rgba(124,92,252,0.35) 0%, rgba(20,20,35,0.9) 100%)',
                boxShadow: '0 0 18px rgba(124,92,252,0.5), inset 0 1px 0 rgba(255,255,255,0.12)',
              } : undefined}
            >
              {active && (
                <div className="absolute -top-0.5 w-4 h-1 rounded-full bg-primary blur-[2px] opacity-80" />
              )}

              <Icon
                name={item.icon}
                filled={active}
                size={20}
                className={`transition-all duration-300 ${active ? 'text-white drop-shadow-[0_0_8px_rgba(124,92,252,0.8)]' : 'text-white/40'}`}
              />
              <span className={`text-[9px] font-semibold mt-0.5 transition-all duration-300 ${active ? 'text-white/85' : 'text-white/30'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
