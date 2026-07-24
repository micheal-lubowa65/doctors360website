import { useEffect, useState } from 'react';
import { Loader, Trash2, Search, Mail, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { logActivity } from '../../lib/logger';

interface Subscriber {
  id: string;
  email: string;
  unsubscribed: boolean;
  created_at: string;
}

type StatusFilter = 'all' | 'active' | 'unsubscribed';

export default function ManageSubscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  async function fetchSubscribers() {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('subscribers')
        .select('id, email, unsubscribed, created_at')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setSubscribers(data || []);
    } catch (err: unknown) {
      console.error('Error loading subscribers:', err);
      setError(err instanceof Error ? err.message : 'Failed to load subscribers');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string, email: string) {
    if (!confirm(`Remove ${email} from the subscriber list?`)) return;

    try {
      const { error: deleteError } = await supabase
        .from('subscribers')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      logActivity('DELETE', 'NEWSLETTER', `Removed subscriber: ${email}`);
      fetchSubscribers();
    } catch (err: unknown) {
      console.error('Delete failed:', err);
      alert(err instanceof Error ? err.message : 'Failed to delete subscriber');
    }
  }

  const filteredSubscribers = subscribers.filter((subscriber) => {
    const matchesSearch = subscriber.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && !subscriber.unsubscribed) ||
      (statusFilter === 'unsubscribed' && subscriber.unsubscribed);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Newsletter Subscribers</h1>
        <p className="mt-1 text-sm text-slate-400">View and manage email subscribers.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all"
            />
          </div>

          <div className="flex gap-2">
            {(['all', 'active', 'unsubscribed'] as StatusFilter[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold capitalize transition-all ${
                  statusFilter === filter
                    ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="w-8 h-8 text-teal-500 animate-spin" />
          </div>
        ) : filteredSubscribers.length === 0 ? (
          <p className="text-slate-400 text-center py-20 text-sm">No subscribers found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/60 text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4 rounded-tl-2xl">Email</th>
                  <th className="px-6 py-4">Subscribed</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 rounded-tr-2xl text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredSubscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-slate-800/20 transition-all">
                    <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-500" />
                      {subscriber.email}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(subscriber.created_at).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          subscriber.unsubscribed
                            ? 'bg-slate-800 text-slate-400'
                            : 'bg-teal-500/10 text-teal-400'
                        }`}
                      >
                        {subscriber.unsubscribed ? 'Unsubscribed' : 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(subscriber.id, subscriber.email)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all"
                        title="Remove subscriber"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
