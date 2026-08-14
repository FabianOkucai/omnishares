import React, { useState } from 'react';

interface AuthViewProps {
  onLogin: (email: string, name: string) => void;
}

type AuthMode = 'login' | 'register';

export const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (mode === 'register' && name.trim().length < 2) {
      setError('Please enter your full name.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const displayName = mode === 'register' ? name.trim() : email.split('@')[0];
      onLogin(email, displayName);
      setIsLoading(false);
    }, 1200);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      onLogin('user@gmail.com', 'Google Investor');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] flex flex-col">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/6 rounded-full blur-3xl" />
        <div className="absolute top-[30%] left-[20%] w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-2xl" />
      </div>

      <div className="flex flex-1 flex-col lg:flex-row relative z-10">

        {/* Left Panel – Branding */}
        <div className="hidden lg:flex lg:flex-1 flex-col justify-center px-16 py-20 border-r border-[#1a2236]">
          <div className="max-w-md">
            {/* Logo mark */}
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-emerald-500 flex items-center justify-center">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  OMNISHARES
                </h1>
                <p className="text-xs text-emerald-400 font-semibold uppercase tracking-widest">NSE Kenya</p>
              </div>
            </div>

            <h2 className="text-4xl font-black leading-tight text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Your complete<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">
                investment intelligence
              </span><br />
              platform.
            </h2>

            <p className="text-slate-400 text-base leading-relaxed mb-10">
              Professional-grade NSE equity analysis, portfolio management, and AI-powered insights — all in one place.
            </p>

            {/* Feature list */}
            <div className="space-y-4">
              {[
                { label: 'OmniScore™ 7-factor equity rating engine', color: 'text-indigo-400' },
                { label: 'Real-time NSE portfolio command centre', color: 'text-emerald-400' },
                { label: 'OmniAI investment intelligence assistant', color: 'text-purple-400' },
                { label: 'Dividend income tracking & forecasting', color: 'text-amber-400' },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full ${f.color} bg-current flex-shrink-0`} />
                  <span className="text-slate-300 text-sm">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel – Auth Form */}
        <div className="flex flex-1 flex-col justify-center items-center px-6 py-16 lg:px-16">
          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <div className="flex items-center gap-3 mb-10 lg:hidden">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-emerald-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight text-white" style={{ fontFamily: "'Playfair Display', serif" }}>OMNISHARES</h1>
                <p className="text-[10px] text-emerald-400 font-semibold uppercase tracking-widest">NSE Kenya</p>
              </div>
            </div>

            <h2 className="text-3xl font-black text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="text-slate-400 text-sm mb-8">
              {mode === 'login'
                ? 'Sign in to your OmniShares investment dashboard'
                : 'Start your investment intelligence journey today'}
            </p>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3.5 mb-6 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              {isLoading ? 'Connecting...' : 'Continue with Google'}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-[#1f2937]" />
              <span className="text-xs text-slate-500 font-medium">or continue with email</span>
              <div className="flex-1 h-px bg-[#1f2937]" />
            </div>

            {/* Email / Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Kamau"
                    className="w-full px-4 py-3 rounded-xl bg-[#111827] border border-[#1f2937] text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="investor@gmail.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#111827] border border-[#1f2937] text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">Password</label>
                  {mode === 'login' && (
                    <button type="button" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                      Forgot password?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-[#111827] border border-[#1f2937] text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              {error && (
                <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-2.5">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {isLoading
                  ? 'Please wait...'
                  : mode === 'login'
                  ? 'Sign In to Dashboard'
                  : 'Create Account'}
              </button>
            </form>

            {/* Toggle mode */}
            <p className="text-center text-sm text-slate-400 mt-6">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
                className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
              >
                {mode === 'login' ? 'Create one' : 'Sign in'}
              </button>
            </p>

            <p className="text-center text-xs text-slate-600 mt-8">
              By continuing, you agree to OmniShares Terms of Service and Privacy Policy.
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};
