import { Target, Eye, HeartHandshake, Award } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const pillars = [
  {
    icon: Target,
    title: 'Our Mission',
    text: 'To deliver accessible, compassionate, and evidence-based healthcare that empowers every patient to live their healthiest life.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    text: 'A world where comprehensive care is not a privilege but a standard — available to every family, at every stage of life.',
  },
  {
    icon: HeartHandshake,
    title: 'Our Promise',
    text: 'We treat every patient as we would our own family — with dignity, transparency, and unwavering commitment to outcomes.',
  },
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
                  src="https://images.pexels.com/photos/5217592/pexels-photo-5217592.jpeg?auto=compress&cs=tinysrgb&w=600"
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
              <p className="text-3xl font-bold">15+</p>
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
              A circle of care built around <span className="gradient-text">you</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={100}>
            <p className="mt-5 text-lg text-slate-brand leading-relaxed">
              Founded in 2009, doctors360 began with a simple belief: healthcare should be
              seamless, personal, and complete. What started as a single clinic has grown into
              a network of 40+ facilities, yet our core remains unchanged — every patient is
              treated as a whole person, not a chart number.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={200}>
            <p className="mt-4 text-slate-brand leading-relaxed">
              Our multidisciplinary teams collaborate across specialties to ensure nothing
              falls through the cracks. Because your health isn't one moment — it's every
              moment, 360 degrees.
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

          {/* Trust badges */}
          <ScrollReveal animation="fade-up" delay={600}>
            <div className="mt-8 flex flex-wrap gap-4">
              {['JCI Accredited', 'HIPAA Compliant', 'ISO 9001'].map((badge) => (
                <span key={badge} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-seafoam-50 text-teal-deep text-xs font-semibold">
                  <Award className="w-3.5 h-3.5" />
                  {badge}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
