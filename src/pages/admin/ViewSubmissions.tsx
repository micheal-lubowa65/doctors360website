import { RefreshCw, Loader, Mail, MessageSquare, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Calendar, ArrowClockwise, Envelope, Telephone, Clock, ArrowRepeat, Chat } from 'react-bootstrap-icons';

export default function ViewSubmissions() {
  const [activeTab, setActiveTab] = useState<'donations' | 'appointments'>('donations');
  const [donations, setDonations] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  async function fetchSubmissions() {
    setLoading(true);
    try {
      const [donRes, appRes] = await Promise.all([
        supabase.from('donations').select('*').order('created_at', { ascending: false }),
        supabase.from('requested_appointments').select('*').order('created_at', { ascending: false })
      ]);

      setDonations(donRes.data || []);
      setAppointments(appRes.data || []);
    } catch (err) {
      console.error('Error fetching submissions:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Submissions & Inquiry Logs</h1>
          <p className="mt-1 text-sm text-slate-400">Review patient appointments and donor support forms.</p>
        </div>
        <button 
          onClick={fetchSubmissions}
          className="btn-outline flex items-center gap-1.5 px-4 py-2 border border-slate-800 rounded-xl text-sm font-semibold hover:bg-slate-800"
        >
          <RefreshCw className="w-4 h-4" /> Refresh Data
        </button>
      </div>

      {/* Navigation tabs */}
      <div className="flex border-b border-slate-850 gap-6">
        <button
          onClick={() => setActiveTab('donations')}
          className={`pb-3 font-semibold text-sm transition-all relative ${
            activeTab === 'donations' 
              ? 'text-teal-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-teal-500' 
              : 'text-slate-450 hover:text-white'
          }`}
        >
          Donations & Involvements ({donations.length})
        </button>
        <button
          onClick={() => setActiveTab('appointments')}
          className={`pb-3 font-semibold text-sm transition-all relative ${
            activeTab === 'appointments' 
              ? 'text-teal-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-teal-500' 
              : 'text-slate-450 hover:text-white'
          }`}
        >
          Appointment Bookings ({appointments.length})
        </button>
      </div>

      {/* Content panel */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader className="w-8 h-8 text-teal-500 animate-spin" />
        </div>
      ) : activeTab === 'donations' ? (
        // Donations Tab
        donations.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-20 text-center text-slate-400 text-sm">
            No donations or involvement submissions found.
          </div>
        ) : (
          <div className="space-y-4">
            {donations.map((d) => (
              <div 
                key={d.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4"
              >
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg text-white">{d.name}</h3>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{d.email}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(d.created_at).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-950 text-teal-400 text-xs font-semibold uppercase tracking-wider">
                      {d.type.replace('donation', 'Support').replace('volunteer', 'Volunteer').replace('corporate', 'Corporate').replace('inkind', 'In-Kind')}
                    </span>
                    {d.amount && (
                      <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 text-xs font-bold">
                        {d.amount}
                      </span>
                    )}
                  </div>
                </div>

                {d.message && (
                  <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-850 flex items-start gap-2.5">
                    <MessageSquare className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{d.message}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      ) : (
        // Appointments Tab
        appointments.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-20 text-center text-slate-400 text-sm">
            No appointment requests found.
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((a) => (
              <div 
                key={a.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4"
              >
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg text-white">{a.name}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{a.email}</span>
                      <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{a.phone}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        Requested: {new Date(a.created_at).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Preferred: {new Date(a.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Requested Departments / Services</span>
                  <div className="flex flex-wrap gap-2">
                    {a.services.map((srv: string) => (
                      <span key={srv} className="px-2.5 py-0.5 rounded-full bg-slate-950 text-teal-400 text-xs font-semibold">
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>

                {a.message && (
                  <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-850 flex items-start gap-2.5">
                    <MessageSquare className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{a.message}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
