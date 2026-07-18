import { useState, useRef } from 'react';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { logActivity } from '../../lib/logger';
import { UserPlus, Save, Loader, AlertCircle, CheckCircle2 } from 'lucide-react';

// Sanitize helper (duplicated from supabaseClient to avoid modifying it)
function sanitize(value: string): string {
  // eslint-disable-next-line no-control-regex
  return value.replace(/[^\x20-\x7E]/g, '').trim();
}

const supabaseUrl = sanitize(import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co');
const supabaseAnonKey = sanitize(import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key');

export default function AddUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const clientRef = useRef<SupabaseClient | null>(null);

  const getClient = () => {
    if (!clientRef.current) {
      clientRef.current = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
          storageKey: 'supabase.auth.token.secondary'
        }
      });
    }
    return clientRef.current;
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const { error } = await getClient().auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(`User ${email} created successfully! Note: Depending on your Supabase settings, they might need to confirm their email before logging in.`);
      logActivity('CREATE', 'USER', `Created new admin user: ${email}`);
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Add Admin User</h1>
          <p className="text-slate-400 mt-1">Create a new administrator account to manage the dashboard.</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-2xl">
        <h2 className="text-lg font-semibold text-white mb-4">New User Details</h2>

        {error && (
          <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/20 p-4 flex gap-3 text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-xl bg-teal-500/10 border border-teal-500/20 p-4 flex gap-3 text-teal-400 text-sm">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleCreateUser} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-400 block mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserPlus className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-950 border border-slate-800 rounded-xl block w-full pl-10 pr-3 py-3 text-white placeholder-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all"
                placeholder="newadmin@example.com"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-400 block mb-2">Temporary Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserPlus className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-slate-950 border border-slate-800 rounded-xl block w-full pl-10 pr-3 py-3 text-white placeholder-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all"
                placeholder="Enter password (min. 6 characters)"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-teal-500 text-white font-medium rounded-xl hover:bg-teal-600 transition-colors disabled:opacity-50"
            >
              {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              Create Admin User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
