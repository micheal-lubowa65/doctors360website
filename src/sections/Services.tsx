import { HeartPulse, UserRound, Syringe, Smile, ArrowRight } from 'lucide-react';

import ScrollReveal from '../components/ScrollReveal';

const services = [
  {
    icon: HeartPulse,
    title: 'Reproductive Health',
    text: 'Comprehensive reproductive healthcare services including family planning, prenatal and postnatal care, and sexual health education.',
    points: ['Family planning counseling', 'Prenatal & postnatal care', 'Sexual health screening'],
    accent: 'from-rose-50 to-pink-100/40',
    iconBg: 'bg-rose-100 text-rose-600',
    dot: 'bg-rose-400',
  },
  {
    icon: UserRound,
    title: "Men's Health",
    text: 'Dedicated men\'s health services addressing the unique medical needs of men at every stage of life.',
    points: ['Prostate health screening', 'Hormonal health assessment', 'Lifestyle & wellness coaching'],
    accent: 'from-blue-50 to-indigo-100/40',
    iconBg: 'bg-blue-100 text-blue-600',
    dot: 'bg-blue-400',
  },
  {
    icon: Syringe,
    title: 'Vaccination Clinic',
    text: 'Up-to-date immunisation services for children and adults, following WHO and national guidelines.',
    points: ['Childhood vaccination programs', 'Adult & travel vaccines', 'Catch-up immunisation schedules'],
    accent: 'from-seafoam-100 to-teal-light/20',
    iconBg: 'bg-seafoam-100 text-teal-deep',
    dot: 'bg-seafoam-300',
  },
  {
    icon: Smile,
    title: 'Dental',
    text: 'Professional dental care covering preventive, restorative, and cosmetic dentistry for the whole family.',
    points: ['Routine check-ups & cleaning', 'Fillings & extractions', 'Oral health education'],
    accent: 'from-amber-50 to-yellow-100/40',
    iconBg: 'bg-amber-100 text-amber-600',
    dot: 'bg-amber-400',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-gradient-to-b from-seafoam-50/50 to-white relative overflow-hidden" aria-label="Doctors360 Medical Services — Prevention, Diagnostics, Treatment, and Follow-up">
      <div className="absolute top-40 -right-20 w-80 h-80 bg-seafoam-100/40 rounded-full blur-3xl" />

      <div className="container-x relative">
        <ScrollReveal animation="fade-up" className="max-w-2xl mx-auto text-center">
          <span className="section-eyebrow">What We Do</span>
          <h2 className="section-title">
            Complete care, <span className="gradient-text">every step</span> of the way
          </h2>
          <p className="mt-4 text-slate-brand text-lg">
            Our four-pillar approach ensures your health journey is covered from every angle.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <ScrollReveal key={s.title} animation="fade-up" delay={i * 120}>
              <div className="group relative bg-white rounded-3xl p-7 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${s.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative">
                  <span className={`flex items-center justify-center w-14 h-14 rounded-2xl ${s.iconBg} mb-5 mx-auto sm:mx-0 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500`}>
                    <s.icon className="w-7 h-7" />
                  </span>
                   <h3 className="text-xl font-semibold text-primary-500 text-center sm:text-left">{s.title}</h3>
                  <p className="mt-2 text-sm text-slate-brand leading-relaxed text-center sm:text-left">{s.text}</p>
                  <ul className="mt-5 space-y-2.5 flex flex-col items-center sm:items-start">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm text-primary-500 justify-center sm:justify-start">
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-center sm:justify-start">
                    <a
                      href="#contact"
                      className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-teal-deep hover:gap-2 transition-all duration-300"
                    >
                      Learn more <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
