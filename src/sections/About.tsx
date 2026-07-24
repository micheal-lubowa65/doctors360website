import { Target, HeartHandshake, Users, Eye, Shield, Smartphone, Zap } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const pillars = [
  {
    icon: Target,
    title: 'Our Mission',
    text: 'To provide accessible, trusted, and patient-centered healthcare digitally and physically across Africa.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    text: 'A healthy nation where quality healthcare is within reach for everyone.',
  },
  {
    icon: HeartHandshake,
    title: 'Our Purpose',
    text: 'To make quality, ethical, and patient-centred healthcare accessible through trusted medical professionals and innovative digital solutions.',
  },
];

const values = [
  { icon: Shield, label: 'Trust & Integrity', color: 'text-blue-600', bg: 'bg-blue-100', hoverBg: 'group-hover:bg-blue-500', hoverText: 'group-hover:text-white', border: 'hover:border-blue-200' },
  { icon: Smartphone, label: 'Accessibility & Convenience', color: 'text-emerald-600', bg: 'bg-emerald-100', hoverBg: 'group-hover:bg-emerald-500', hoverText: 'group-hover:text-white', border: 'hover:border-emerald-200' },
  { icon: Zap, label: 'Innovation & Technology', color: 'text-amber-500', bg: 'bg-amber-100', hoverBg: 'group-hover:bg-amber-500', hoverText: 'group-hover:text-white', border: 'hover:border-amber-200' },
  { icon: HeartHandshake, label: 'Patient-Centered Care', color: 'text-rose-500', bg: 'bg-rose-100', hoverBg: 'group-hover:bg-rose-500', hoverText: 'group-hover:text-white', border: 'hover:border-rose-200' },
  { icon: Users, label: 'Community & National Health', color: 'text-purple-600', bg: 'bg-purple-100', hoverBg: 'group-hover:bg-purple-500', hoverText: 'group-hover:text-white', border: 'hover:border-purple-200' },
];

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white relative overflow-hidden" aria-label="About Doctors360 — Our mission, vision, purpose, and values">
      <div className="absolute top-20 right-0 w-72 h-72 bg-seafoam-50 rounded-full blur-3xl opacity-60" />

      <div className="container-x relative grid lg:grid-cols-2 gap-14 items-center">
        {/* Left: images */}
        <ScrollReveal animation="fade-right">
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl overflow-hidden shadow-xl group flex bg-slate-50">
                <img
                  src="/images/about clinical doctors360.jpeg"
                  alt="Medical team"
                  loading="lazy"
                  className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-xl mt-8 group flex bg-slate-50">
                <img
                  src="/images/about community doctors360.png"
                  alt="Patient care"
                  loading="lazy"
                  className="w-full h-auto object-contain scale-[1.25] group-hover:scale-[1.3] transition-transform duration-700"
                />
              </div>
            </div>

            {/* Stat badge */}
            <div className="relative mt-8 mx-auto w-max md:absolute md:-bottom-6 md:left-1/2 md:-translate-x-1/2 md:mt-0 bg-gradient-to-br from-primary-500 to-teal-deep text-white rounded-2xl shadow-2xl px-8 py-5 text-center z-10">
              <p className="text-3xl font-bold">7+</p>
              <p className="text-xs text-seafoam-100 uppercase tracking-wider mt-0.5">Years of Care</p>
            </div>

            {/* Decorative dot pattern */}
            <div className="absolute -top-6 -right-6 grid grid-cols-4 gap-2 opacity-30">
              {Array.from({ length: 16 }).map((_, i) => (
                <span key={i} className="w-2 h-2 rounded-full bg-teal-deep" />
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Right: content */}
        <div>
          <ScrollReveal animation="fade-up">
            <span className="section-eyebrow">Our Story</span>
            <h2 className="section-title">
              Healthcare that surrounds <span className="gradient-text">the patient</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={100}>
            <p className="mt-5 text-lg text-slate-brand leading-relaxed">
              Doctors360 was founded in 2019 in Juba, South Sudan, out of a conviction that no one should be denied quality care because of where they live. We set out to build a model of healthcare that wraps around the patient — prevention, diagnosis, treatment, and follow-up — reaching people both digitally and in person.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={200}>
            <p className="mt-4 text-slate-brand leading-relaxed">
              What began as a small effort in Juba has since grown into Uganda, as we work alongside trusted healthcare professionals and communities to close gaps in access. Every service we provide is guided by one purpose: making ethical, patient-centred care available to those who need it most, regardless of ability to pay or distance from a clinic.
            </p>
          </ScrollReveal>

          <div className="mt-8 space-y-3">
            {pillars.map((p, i) => (
              <ScrollReveal key={p.title} animation="fade-left" delay={300 + i * 100}>
                <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-100 hover:border-seafoam-200 hover:shadow-lg hover:bg-seafoam-50/50 transition-all duration-300 group">
                  <span className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-seafoam-100 to-teal-light/20 text-teal-deep group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <p.icon className="w-6 h-6" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-primary-500">{p.title}</h3>
                    <p className="text-sm text-slate-brand mt-1 leading-relaxed">{p.text}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Brand Values */}
          <ScrollReveal animation="fade-up" delay={650}>
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-deep mb-3">Our Values</p>
              <div className="flex flex-wrap gap-2">
                {values.map((v) => (
                  <span
                    key={v.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-seafoam-50 text-teal-deep text-xs font-semibold border border-seafoam-100 hover:bg-seafoam-100 transition-colors"
                  >
                    <v.icon className="w-3.5 h-3.5" />
                    {v.label}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
