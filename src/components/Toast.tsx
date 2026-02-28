import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-[100] animate-slideUp">
      <div
        className="px-5 py-2.5 rounded-2xl text-[13px] font-medium shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(40,40,60,0.9), rgba(20,20,35,0.95))',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        {toast}
      </div>
    </div>
  );
}
