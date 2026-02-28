import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Icon from '../components/Icon';
import { supabase, supabaseConfigured } from '../lib/supabaseClient';

export default function Login() {
  const { login, navigate, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || loading) return;
    setLoading(true);
    if (!supabaseConfigured) {
      login();
      setLoading(false);
      return;
    }
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        showToast(error.message || 'Login failed. Check your details.');
        setLoading(false);
        return;
      }
      login();
    } catch {
      showToast('Auth service unavailable. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="auth-bg flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm animate-fadeIn">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center ring-2 ring-primary/40 shadow-lg shadow-black/70 mb-3 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-accent-teal opacity-80" />
            <div className="relative w-12 h-12 rounded-full bg-black/80 flex items-center justify-center">
              <span className="text-xl font-extrabold tracking-tight">91</span>
              <div className="absolute -right-1 -bottom-1 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-md shadow-black/60">
                <Icon name="play_arrow" size={14} className="text-primary" />
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-1">Welcome back</h1>
          <p className="text-text-dim text-sm">Sign in to continue your session.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 glass rounded-3xl px-5 py-6 border border-white/10 bg-white/5 shadow-[0_22px_60px_rgba(0,0,0,0.85)]"
        >
          <div className="glass rounded-2xl flex items-center px-4 gap-3 focus-within:border-primary/50 transition">
            <Icon name="mail" className="text-text-dim" size={20} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 bg-transparent py-3.5 text-sm outline-none placeholder:text-text-dim"
              required
            />
          </div>

          <div className="glass rounded-2xl flex items-center px-4 gap-3 focus-within:border-primary/50 transition">
            <Icon name="lock" className="text-text-dim" size={20} />
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="flex-1 bg-transparent py-3.5 text-sm outline-none placeholder:text-text-dim"
              required
            />
            <button type="button" onClick={() => setShowPass(!showPass)}>
              <Icon name={showPass ? 'visibility_off' : 'visibility'} className="text-text-dim" size={20} />
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in…' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-6">
          <button
            onClick={() => navigate('signup')}
            className="text-sm text-primary hover:text-primary-light transition"
          >
            New to 91 Play Club? <span className="font-semibold">Join the squad</span>
          </button>
        </p>

        <p className="text-center text-[10px] text-white/30 mt-8 leading-relaxed">
          By continuing, you agree to our{' '}
          <button onClick={() => navigate('privacy-policy')} className="underline text-white/40 hover:text-white/60 transition">Privacy Policy</button>
          {' '}and{' '}
          <button onClick={() => navigate('privacy-policy')} className="underline text-white/40 hover:text-white/60 transition">Terms of Service</button>
        </p>
      </div>
    </div>
  );
}
