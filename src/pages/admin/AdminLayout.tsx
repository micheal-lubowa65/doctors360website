import { useState, useEffect } from 'react';
import { useNavigate, Link, Routes, Route, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

import { Loader, LayoutDashboard, Users, X, Menu, LogOut, User, UserPlus, Activity, FileText, Globe, Image, Calendar, Mail } from 'lucide-react';

import AdminDashboard from './AdminDashboard';
import ManageNews from './ManageNews';
import ManageTestimonials from './ManageTestimonials';
import ManagePrograms from './ManagePrograms';
import ManageGallery from './ManageGallery';
import ViewSubmissions from './ViewSubmissions';
import Profile from './Profile';
import AddUser from './AddUser';
import ActivityLogs from './ActivityLogs';
import ManageSubscribers from './ManageSubscribers';

export default function AdminLayout() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session: activeSession } }) => {
      setSession(activeSession);
      setLoading(false);
      if (!activeSession) {
        navigate('/admin/login');
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, activeSession) => {
      setSession(activeSession);
      if (!activeSession) {
        navigate('/admin/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader className="w-10 h-10 text-teal-500 animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  const menuItems = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Stories & Blogs', path: '/admin/news', icon: FileText },
    { name: 'Subscribers', path: '/admin/subscribers', icon: Mail },
    { name: 'Testimonials', path: '/admin/testimonials', icon: Users },
    { name: 'NGO Programs', path: '/admin/programs', icon: Globe },
    { name: 'Gallery', path: '/admin/gallery', icon: Image },
    { name: 'Submissions', path: '/admin/submissions', icon: Calendar },
    { name: 'Activity Logs', path: '/admin/activity-logs', icon: Activity },
    { name: 'Profile', path: '/admin/profile', icon: User },
    { name: 'Add User', path: '/admin/add-user', icon: UserPlus },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Mobile Sidebar toggle */}
      <div className="lg:hidden absolute top-4 left-4 z-50">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-white hover:bg-slate-700"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-6 transition-transform duration-300 lg:translate-x-0 lg:static lg:h-screen
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/doctors360logo1nobg.png"
              alt="Doctors360"
              className="h-10 w-10 object-contain drop-shadow-md"
            />
            <div>
              <span className="font-bold text-lg tracking-wide block">Doctors360</span>
              <span className="text-[10px] text-teal-400 font-semibold uppercase tracking-wider">Management Console</span>
            </div>
          </div>

          {/* Menu */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                    ${active 
                      ? 'bg-gradient-to-r from-primary-500/20 to-teal-500/20 border-l-4 border-teal-500 text-teal-300' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                  `}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User / Sign Out */}
        <div className="space-y-4 pt-6 border-t border-slate-800">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-teal-400 text-sm">
              {session.user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <span className="text-sm font-semibold block truncate text-slate-200">{session.user.email}</span>
              <span className="text-xs text-slate-500">Administrator</span>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen bg-slate-950 flex flex-col p-6 lg:p-10 pt-20 lg:pt-10 overflow-y-auto max-w-7xl mx-auto w-full">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/news" element={<ManageNews />} />
          <Route path="/subscribers" element={<ManageSubscribers />} />
          <Route path="/testimonials" element={<ManageTestimonials />} />
          <Route path="/programs" element={<ManagePrograms />} />
          <Route path="/gallery" element={<ManageGallery />} />
          <Route path="/submissions" element={<ViewSubmissions />} />
          <Route path="/activity-logs" element={<ActivityLogs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-user" element={<AddUser />} />
        </Routes>
      </main>
    </div>
  );
}
