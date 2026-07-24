import { Microscope, Stethoscope, ShieldPlus, ClipboardCheck, ArrowRight } from 'lucide-react';

import ScrollReveal from '../components/ScrollReveal';

const services = [
  {
    icon: ShieldPlus,
    title: 'Prevention & Wellness',
    text: 'Annual check-ups, vaccinations, lifestyle counseling, and preventive screenings to keep you ahead of illness.',
    points: ['Health risk assessments', 'Vaccination programs', 'Nutrition counseling'],
    accent: 'from-seafoam-100 to-teal-light/20',
    iconBg: 'bg-seafoam-100 text-teal-deep',
    dot: 'bg-seafoam-300',
  },
  {
    icon: Microscope,
    title: 'Advanced Diagnostics',
    text: 'State-of-the-art imaging and lab services delivering fast, accurate results you can trust.',
    points: ['Expanding diagnostic capacity including imaging and lab services as we grow across South Sudan and Uganda.'],
    accent: 'from-teal-light/20 to-seafoam-100',
    iconBg: 'bg-teal-light/20 text-teal-deep',
    dot: 'bg-teal-light',
  },
  {
    icon: Stethoscope,
    title: 'Treatment & Therapy',
    text: 'Personalized care plans delivered by a dedicated multidisciplinary team, using evidence-based approaches suited to the communities we serve.',
    points: ['Chronic disease management', 'Minor surgical procedures', 'Physical therapy & rehabilitation', "We're working to expand our surgical and specialist capacity as we grow across South Sudan and Uganda."],
    accent: 'from-coral/10 to-coral-light/10',
    iconBg: 'bg-coral/10 text-coral',
    dot: 'bg-coral-light',
  },
  {
    icon: ClipboardCheck,
    title: 'Follow-up & Recovery',
    text: "We stay connected with our patients after treatment, checking in to make sure recovery stays on track and care doesn't stop at the clinic door.",
    points: ['Patient follow-up visits', 'Progress check-ins', 'Referrals for continued care'],
    accent: 'from-slate-100 to-slate-warm/20',
    iconBg: 'bg-slate-100 text-slate-brand',
    dot: 'bg-slate-warm',
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
