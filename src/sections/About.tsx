import { Target, Eye, HeartHandshake, Shield, Wifi, Users, Sprout } from 'lucide-react';
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
  { icon: Shield, label: 'Trust & Integrity' },
  { icon: Wifi, label: 'Accessibility & Convenience' },
  { icon: Sprout, label: 'Innovation & Technology' },
  { icon: HeartHandshake, label: 'Patient-Centered Care' },
  { icon: Users, label: 'Community & National Health' },
];

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-20 right-0 w-72 h-72 bg-seafoam-50 rounded-full blur-3xl opacity-60" />

      <div className="container-x relative grid lg:grid-cols-2 gap-14 items-center">
        {/* Left: images */}
        <ScrollReveal animation="fade-right">
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl overflow-hidden shadow-xl aspect-[3/4] group">
                <img
                  src="https://images.pexels.com/photos/5215028/pexels-photo-5215028.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Medical team"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-xl aspect-[3/4] mt-8 group">
                <img
                  src="https://images.pexels.com/photos/4225920/pexels-photo-4225920.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Patient care"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Stat badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-br from-primary-500 to-teal-deep text-white rounded-2xl shadow-2xl px-8 py-5 text-center">
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
              Founded in 2019, Doctors360 began with a simple belief: healthcare should wrap around
              the patient — covering prevention, diagnosis, treatment, and follow-up, both digitally
              and physically across Africa.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={200}>
            <p className="mt-4 text-slate-brand leading-relaxed">
              We are an integrated medical services provider — bringing together trusted professionals
              and innovative digital solutions so that quality, ethical, patient-centred care is
              accessible to all.
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
