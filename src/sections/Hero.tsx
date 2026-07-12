import { ShieldCheck, HeartPulse, CalendarCheck, Star, Activity, Users, Clock } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const stats = [
  { icon: Users, value: '50K+', label: 'Patients Served' },
  { icon: Activity, value: '120+', label: 'Expert Specialists' },
  { icon: Clock, value: '24/7', label: 'Emergency Care' },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-36 pb-20 lg:pt-44 lg:pb-28 bg-gradient-to-br from-seafoam-50 via-white to-teal-light/10"
    >
      {/* Decorative blobs */}
      <div className="absolute -top-32 -right-24 w-[28rem] h-[28rem] bg-seafoam-200/40 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 -left-32 w-96 h-96 bg-teal-light/20 rounded-full blur-3xl animate-float-alt" />
      <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-coral/5 rounded-full blur-3xl" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#003B4A 1px, transparent 1px), linear-gradient(90deg, #003B4A 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container-x relative grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div>
          <ScrollReveal animation="fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm text-sm font-medium text-teal-deep border border-seafoam-100">
              <ShieldCheck className="w-4 h-4 text-seafoam-400" />
              Trusted by 50,000+ patients
            </span>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={100}>
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-primary-500 leading-[1.08] tracking-tight">
              Your health,{' '}
              <span className="gradient-text">360°</span>
              <br />
              care without compromise
            </h1>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={200}>
            <p className="mt-6 text-lg text-slate-brand max-w-xl leading-relaxed">
              doctors360 brings together world-class physicians, modern diagnostics, and a
              personalized care plan — all under one roof. From prevention to recovery, we're
              with you at every degree.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={300}>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#contact" className="btn-primary">
                <CalendarCheck className="w-5 h-5" />
                Book an Appointment
              </a>
              <a href="#services" className="btn-outline">
                Explore Services
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={400}>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-2.5">
                  {[
                    'https://images.pexels.com/photos/5997988/pexels-photo-5997988.jpeg?auto=compress&cs=tinysrgb&w=80',
                    'https://images.pexels.com/photos/5997987/pexels-photo-5997987.jpeg?auto=compress&cs=tinysrgb&w=80',
                    'https://images.pexels.com/photos/5997996/pexels-photo-5997996.jpeg?auto=compress&cs=tinysrgb&w=80',
                    'https://images.pexels.com/photos/5997991/pexels-photo-5997991.jpeg?auto=compress&cs=tinysrgb&w=80',
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Patient"
                      loading="lazy"
                      className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-0.5 text-coral">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-brand mt-0.5">4.9/5 from 2,400+ reviews</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={500}>
            <div className="mt-8 flex flex-wrap items-center gap-6 pt-6 border-t border-slate-100">
              {stats.map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-seafoam-100 text-teal-deep">
                    <s.icon className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="text-xl font-bold text-primary-500">{s.value}</p>
                    <p className="text-xs text-slate-brand">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Right visual */}
        <ScrollReveal animation="scale-up" delay={200} className="relative">
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] max-w-md mx-auto">
            <img
              src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Doctor consulting with patient"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-500/40 via-transparent to-transparent" />
          </div>

          {/* Floating card top */}
          <div className="absolute top-6 -left-2 lg:-left-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 flex items-center gap-3 animate-float">
            <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-seafoam-100 text-teal-deep">
              <HeartPulse className="w-6 h-6" />
            </span>
            <div>
              <p className="text-sm font-semibold text-primary-500">Live Monitoring</p>
              <p className="text-xs text-slate-brand">Real-time vitals</p>
            </div>
          </div>

          {/* Floating card bottom */}
          <div
            className="absolute bottom-10 -right-2 lg:-right-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 flex items-center gap-3 animate-float-alt"
            style={{ animationDelay: '1s' }}
          >
            <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-coral/10 text-coral animate-pulse-ring">
              <ShieldCheck className="w-6 h-6" />
            </span>
            <div>
              <p className="text-sm font-semibold text-primary-500">98% Accuracy</p>
              <p className="text-xs text-slate-brand">Diagnostic precision</p>
            </div>
          </div>

          {/* Decorative ring */}
          <div className="absolute -top-8 -right-8 w-24 h-24 border-2 border-dashed border-seafoam-300 rounded-full animate-spin-slow opacity-60" />
        </ScrollReveal>
      </div>
    </section>
  );
}
