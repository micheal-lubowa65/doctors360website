
import { Users, MapPin, CalendarDays, ShieldCheck, HeartPulse, CalendarCheck, Heart } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import ScrollReveal from '../components/ScrollReveal';

const stats = [
  { icon: Users, value: '50K+', numericValue: 50, suffix: 'K+', label: 'Patients Served Since 2019' },
  { icon: MapPin, value: '5', numericValue: 5, suffix: '', label: 'Communities Reached' },
  { icon: Heart, value: '30%', numericValue: 30, suffix: '%', label: 'of Care Provided Free' },
  { icon: CalendarDays, value: '8', numericValue: 8, suffix: '', label: 'Years in Operation' },
];

function useCountUp(end: number, duration = 2000, startCounting = false) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>();

  const animate = useCallback(() => {
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart for a satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * end));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      }
    };
    frameRef.current = requestAnimationFrame(step);
  }, [end, duration]);

  useEffect(() => {
    if (startCounting) {
      animate();
    }
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [startCounting, animate]);

  return count;
}

function AnimatedStat({ stat, inView }: { stat: typeof stats[0]; inView: boolean }) {
  const count = useCountUp(stat.numericValue, 8000, inView);

  return (
    <div className="flex items-center gap-3">
      <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-seafoam-100 text-teal-deep flex-shrink-0">
        <stat.icon className="w-5 h-5" />
      </span>
      <div className="min-w-0">
        <p className="text-xl font-bold text-primary-500 leading-tight tabular-nums">
          {count}{stat.suffix}
        </p>
        <p className="text-xs text-slate-brand leading-snug">{stat.label}</p>
      </div>
    </div>
  );
}

export default function Hero() {
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-36 pb-20 lg:pt-44 lg:pb-28 bg-gradient-to-br from-seafoam-50 via-white to-teal-light/10"
      aria-label="Doctors360 — Nonprofit healthcare clinic providing 360-degree patient care in South Sudan and East Africa"
    >
      {/* Decorative blobs */}
      <div className="absolute -top-32 -right-24 w-[28rem] h-[28rem] bg-seafoam-200/40 rounded-full blur-3xl " />
      <div className="absolute bottom-0 -left-32 w-96 h-96 bg-teal-light/20 rounded-full blur-3xl -alt" />
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
              A nonprofit clinic bringing world-class care to communities that need it most
              — from prevention to recovery.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={300}>
            <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
              <a href="#contact" className="btn-primary">
                <CalendarCheck className="w-5 h-5" />
                Book an Appointment
              </a>
              <a href="#services" className="btn-outline">
                Explore Services
              </a>
            </div>
          </ScrollReveal>



          <ScrollReveal animation="fade-up" delay={500}>
            <div
              ref={statsRef}
              className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 gap-y-5 gap-x-6"
            >
              {stats.map((s) => (
                <AnimatedStat key={s.label} stat={s} inView={statsInView} />
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Right visual */}
        <ScrollReveal animation="scale-up" delay={200} className="relative">
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] max-w-md mx-auto">
            <img
              src="/images/hero image Doctors360.png"
              alt="Doctor consulting with patient"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-500/40 via-transparent to-transparent" />
          </div>

          {/* Floating card top */}
          <div className="absolute top-6 -left-2 lg:-left-6 bg-white/95  rounded-2xl shadow-xl p-4 flex items-center gap-3 ">
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
            className="absolute bottom-10 -right-2 lg:-right-6 bg-white/95  rounded-2xl shadow-xl p-4 flex items-center gap-3 -alt"
            style={{ animationDelay: '1s' }}
          >
            <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-coral/10 text-coral ">
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
