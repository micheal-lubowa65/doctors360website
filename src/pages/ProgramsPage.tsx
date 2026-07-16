import { useState, useEffect } from 'react';
import { GeoAlt, ArrowRight } from 'react-bootstrap-icons';
import { MapPin, Globe, HeartHandshake, BookOpen, Users, Flame, Home, HelpCircle } from 'lucide-react';

const iconMap: Record<string, any> = {
  Globe,
  HeartHandshake,
  BookOpen,
  Users,
  Flame,
  Home
};
import ScrollReveal from '../components/ScrollReveal';
import ProgramsMap from '../components/ProgramsMap';
import AnimatedCounter from '../components/AnimatedCounter';
import { dbService, Program } from '../services/dbService';

const impactStats = [
  { value: '50K+', label: 'Patients Served' },
  { value: '200+', label: 'CHWs Trained' },
  { value: '12K+', label: 'Outreach Visits / yr' },
  { value: '6', label: 'Counties Active' },
  { value: '8', label: 'Active Partnerships' },
  { value: '3', label: 'Countries Reached' },
];

const partners = [
  'Ministry of Health, South Sudan',
  'World Health Organization (WHO)',
  'UNICEF South Sudan',
  'MSF (Médecins Sans Frontières)',
  'African Development Bank',
  'German Development Cooperation (GIZ)',
];
export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dbService.getPrograms()
      .then(data => {
        setPrograms(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching programs:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="pt-36 pb-20 bg-gradient-to-br from-primary-500 via-teal-deep to-primary-700 relative overflow-hidden noise-overlay">
        <div className="absolute -top-20 right-0 w-96 h-96 bg-seafoam-300/10 rounded-full blur-3xl " />
        <div className="absolute bottom-0 -left-20 w-80 h-80 bg-white rounded-full blur-3xl -alt" />
        <div className="container-x relative text-center">
          <ScrollReveal animation="fade-up">
            <span className="section-eyebrow text-seafoam-300">NGO Programs</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mt-4">
              Health without boundaries —<br />
              <span className="gradient-text-seafoam">reaching every community</span>
            </h1>
            <p className="mt-6 text-seafoam-100 text-lg max-w-2xl mx-auto leading-relaxed">
              Beyond our medical centre walls, Doctors360 runs a portfolio of community health programs
              that bring prevention, education, and care directly to the people who need it most.
            </p>
            <div className="mt-12 md:mt-16 w-full max-w-lg mx-auto relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
              <img 
                src="/images/health projects doctors360.jpeg" 
                alt="Doctors360 Health Projects" 
                className="w-full h-auto block hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-white border-b border-seafoam-50">
        <div className="container-x">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {impactStats.map((s, i) => (
              <ScrollReveal key={s.label} animation="fade-up" delay={i * 60}>
                <div className="text-center">
                  <p className="text-3xl font-bold gradient-text">
                    <AnimatedCounter value={s.value} duration={3500} />
                  </p>
                  <p className="text-xs text-slate-brand uppercase tracking-wider mt-1">{s.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Programs accordion */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-20 left-0 w-72 h-72 bg-seafoam-50 rounded-full blur-3xl opacity-50" />
        <div className="container-x relative">
          <ScrollReveal animation="fade-up" className="max-w-2xl mx-auto text-center">
            <span className="section-eyebrow">What We Do</span>
            <h2 className="section-title">Our programs, <span className="gradient-text">your community</span></h2>
            <p className="mt-4 text-slate-brand text-lg">
              Four interconnected program areas that together create a comprehensive community health system.
            </p>
          </ScrollReveal>

          <div className="mt-14 space-y-4">
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : programs.length === 0 ? (
              <p className="text-center text-slate-brand py-10">No programs found.</p>
            ) : (
              programs.map((prog, i) => {
                const IconComponent = iconMap[prog.icon_name] || HelpCircle;
                return (
                  <ScrollReveal key={prog.id} animation="fade-up" delay={i * 80}>
                    <div className="rounded-3xl bg-white border border-seafoam-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6 lg:p-8">
                      <div className="flex items-start gap-5 mb-6">
                        <span className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-teal-deep text-white">
                          <IconComponent className="w-7 h-7" />
                        </span>
                        <div className="flex-1 pt-1">
                          <span className="inline-block text-xs text-teal-deep font-semibold uppercase tracking-wider mb-1">{prog.tag}</span>
                          <h3 className="text-xl font-bold text-primary-500">{prog.title}</h3>
                        </div>
                      </div>
                      <div>
                        <p className="text-slate-brand leading-relaxed whitespace-pre-line">{prog.description}</p>
                        <ul className="mt-6 space-y-2">
                          {prog.impact.map((point) => (
                            <li key={point} className="flex items-center gap-2 text-sm text-primary-500 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-seafoam-400 flex-shrink-0" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 lg:py-24 bg-seafoam-50/50 relative overflow-hidden">
        <div className="container-x relative">
          <ScrollReveal animation="fade-up" className="max-w-2xl mx-auto text-center">
            <span className="section-eyebrow">Partnerships</span>
            <h2 className="section-title">Better together — our <span className="gradient-text">partners</span></h2>
            <p className="mt-4 text-slate-brand text-lg">
              We collaborate with government bodies, international agencies, and private sector organisations
              to multiply impact across Africa.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners.map((p, i) => (
              <ScrollReveal key={p} animation="fade-up" delay={i * 60}>
                <div className="flex items-center gap-3 p-5 bg-white rounded-2xl border border-seafoam-100 shadow-sm hover:shadow-md hover:border-seafoam-200 transition-all duration-300">
                  <span className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-seafoam-400" />
                  <p className="text-primary-500 font-medium text-sm">{p}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Geographic reach */}
      <section className="py-20 lg:py-28 bg-primary-500 relative overflow-hidden noise-overlay">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-deep/20 rounded-full blur-3xl" />
        <div className="container-x relative">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <ScrollReveal animation="fade-right">
              <span className="section-eyebrow text-seafoam-300">Where We Work</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
                Active across <span className="gradient-text-seafoam">East Africa</span>
              </h2>
              <p className="mt-5 text-seafoam-100 leading-relaxed">
                Our programs are currently active in South Sudan and Uganda. We are expanding
                into two additional countries by the end of 2026.
              </p>
              <div className="mt-8 space-y-3">
                {['South Sudan — Primary operations', 'Uganda — Community health programs'].map((loc) => (
                  <div key={loc} className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-seafoam-300 flex-shrink-0" />
                    <span className="text-seafoam-100 text-sm">{loc}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" delay={150}>
              <div className="h-80 md:h-96 lg:h-[450px]">
                <ProgramsMap />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container-x text-center">
          <ScrollReveal animation="scale-up">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-500">Want to support our programs?</h2>
            <p className="mt-3 text-slate-brand">Every contribution directly funds community health work across Africa.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="/donate" className="btn-primary">
                Donate Now <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/donate#volunteer" className="btn-outline">Volunteer With Us</a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
