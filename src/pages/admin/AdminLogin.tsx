import { AlertCircle, Mail, Loader } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { Lock, Envelope, ExclamationCircle, ArrowClockwise } from 'react-bootstrap-icons';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl" />

      <div className="max-w-md w-full space-y-8 bg-slate-800 p-10 rounded-3xl border border-slate-700/50 shadow-2xl relative z-10">
        <div>
          <div className="mx-auto flex items-center justify-center">
            <img
              src="/doctors360logo1nobg.png"
              alt="Doctors360"
              className="h-16 w-16 object-contain drop-shadow-md"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Admin Portal
          </h2>
          <p className="mt-2 text-center text-sm text-slate-400">
            Sign in to manage Doctors360 platform
          </p>
        </div>

        {error && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 flex gap-3 text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-900 border border-slate-700/60 rounded-xl block w-full pl-10 pr-3 py-3 text-white placeholder-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all text-sm"
                  placeholder="admin@doctors360.com"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-900 border border-slate-700/60 rounded-xl block w-full pl-10 pr-3 py-3 text-white placeholder-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-primary-500 hover:bg-primary-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 focus:ring-offset-slate-900 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-sm"
            >
              {loading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
