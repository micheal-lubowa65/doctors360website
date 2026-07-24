import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Activity, Clock, User, Tag, Loader, RefreshCw } from 'lucide-react';
import { formatSouthSudanDateTime } from '../../lib/dateTime';

interface Log {
  id: string;
  created_at: string;
  user_email: string;
  action: string;
  resource: string;
  details: string;
}

export default function ActivityLogs() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100); // Limit to recent 100 for performance

    if (!error && data) {
      setLogs(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const getActionColor = (action: string) => {
    switch (action) {
      case 'CREATE':
      case 'UPLOAD':
        return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'DELETE':
        return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'UPDATE':
      case 'PASSWORD_CHANGE':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      default:
        return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-teal-500" />
            Activity Logs
          </h1>
          <p className="text-slate-400 mt-1">View recent actions performed in the admin dashboard.</p>
        </div>
        <button
          onClick={fetchLogs}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors border border-slate-700 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {loading && logs.length === 0 ? (
          <div className="p-10 flex justify-center">
            <Loader className="w-8 h-8 text-teal-500 animate-spin" />
          </div>
        ) : logs.length === 0 ? (
          <div className="p-10 text-center text-slate-400">
            No activity logs found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/50">
                  <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Date & Time</th>
                  <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">User</th>
                  <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Action</th>
                  <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Resource</th>
                  <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Clock className="w-4 h-4 text-slate-500" />
                        {formatSouthSudanDateTime(log.created_at)} (Juba)
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <User className="w-4 h-4 text-slate-500" />
                        {log.user_email}
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getActionColor(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-slate-300 font-medium">
                        <Tag className="w-4 h-4 text-slate-500" />
                        {log.resource}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-400 max-w-xs truncate" title={log.details}>
                      {log.details}
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
