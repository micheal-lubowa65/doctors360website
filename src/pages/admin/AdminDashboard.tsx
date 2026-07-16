import { Loader, Users, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { FileText, People, Globe, Image, Heart, Calendar, ArrowRight, ArrowClockwise, GraphUp } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    news: 0,
    testimonials: 0,
    programs: 0,
    gallery: 0,
    donations: 0,
    appointments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [
          { count: newsCount },
          { count: testCount },
          { count: progCount },
          { count: gallCount },
          { count: donCount },
          { count: appCount }
        ] = await Promise.all([
          supabase.from('news_blogs').select('*', { count: 'exact', head: true }),
          supabase.from('testimonials').select('*', { count: 'exact', head: true }),
          supabase.from('programs').select('*', { count: 'exact', head: true }),
          supabase.from('gallery_images').select('*', { count: 'exact', head: true }),
          supabase.from('donations').select('*', { count: 'exact', head: true }),
          supabase.from('requested_appointments').select('*', { count: 'exact', head: true }),
        ]);

        setStats({
          news: newsCount || 0,
          testimonials: testCount || 0,
          programs: progCount || 0,
          gallery: gallCount || 0,
          donations: donCount || 0,
          appointments: appCount || 0
        });
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center py-20">
        <Loader className="w-10 h-10 text-teal-500 animate-spin" />
      </div>
    );
  }

  const statCards = [
    { name: 'Articles & Blogs', value: stats.news, icon: FileText, color: 'from-blue-500 to-indigo-500', path: '/admin/news' },
    { name: 'Patient Testimonials', value: stats.testimonials, icon: Users, color: 'from-pink-500 to-rose-500', path: '/admin/testimonials' },
    { name: 'NGO Programs', value: stats.programs, icon: Globe, color: 'from-amber-500 to-orange-500', path: '/admin/programs' },
    { name: 'Gallery Assets', value: stats.gallery, icon: Image, color: 'from-green-500 to-emerald-500', path: '/admin/gallery' },
    { name: 'Donations & Inquiries', value: stats.donations, icon: Heart, color: 'from-purple-500 to-violet-500', path: '/admin/submissions' },
    { name: 'Appointments Booked', value: stats.appointments, icon: Calendar, color: 'from-teal-500 to-cyan-500', path: '/admin/submissions' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Overview Dashboard</h1>
        <p className="mt-2 text-sm text-slate-400">
          Real-time statistics and summary of Doctors360 contents and submissions.
        </p>
      </div>

      {/* Grid of stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card) => (
          <div 
            key={card.name}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden group hover:border-slate-700 transition-all duration-300 shadow-xl"
          >
            {/* Background glowing gradient */}
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${card.color} opacity-10 rounded-bl-full group-hover:scale-125 transition-transform duration-500`} />
            
            <div className="flex justify-between items-start">
              <div className="space-y-4">
                <span className="text-slate-400 text-sm font-semibold block">{card.name}</span>
                <span className="text-4xl font-extrabold text-white block">{card.value}</span>
              </div>
              <span className={`flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-800 text-white`}>
                <card.icon className="w-6 h-6 text-slate-200" />
              </span>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-between items-center text-xs">
              <Link 
                to={card.path}
                className="text-teal-400 font-semibold flex items-center gap-1 hover:text-teal-300"
              >
                Manage Assets <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-slate-500">Live Database</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick tips panel */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/20 border border-slate-800 rounded-3xl p-8 shadow-xl flex items-start gap-5">
        <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 flex-shrink-0">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-white">Dynamic Site Synced!</h3>
          <p className="mt-2 text-slate-400 text-sm leading-relaxed max-w-2xl">
            Any addition, update, or deletion made in this manager dashboard instantly reflects on the live public website.
            When uploading photos for stories, testimonials, or gallery items, they are automatically placed into public Supabase Storage buckets, returning clean public URLs.
          </p>
        </div>
      </div>
    </div>
  );
}
