import { Clock, Users, Award, HeartHandshake, Activity, Lock } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const features = [
  { icon: Clock, title: '24/7 Availability', text: 'Round-the-clock emergency response and telehealth support — wherever you are across Africa.' },
  { icon: Users, title: 'Multidisciplinary Teams', text: 'Trusted specialists across all key disciplines collaborate on your personalised 360 Care plan.' },
  { icon: Award, title: 'Patient-Centred Ethics', text: 'Every clinical decision upholds the highest standards of medical ethics, dignity, and transparency.' },
  { icon: HeartHandshake, title: 'Accessible Healthcare', text: 'Both digitally and physically — we bring quality care closer to patients across underserved communities.' },
  { icon: Activity, title: 'Digital Health Innovation', text: 'Cutting-edge technology powers faster diagnostics, secure records, and seamless patient experiences.' },
  { icon: Lock, title: 'Trust & Integrity', text: 'Your health data and personal information are handled with the utmost care, security, and respect.' },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 bg-primary-500 relative overflow-hidden noise-overlay">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-teal-deep/30 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-seafoam-300/10 rounded-full blur-3xl animate-float-alt" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="container-x relative">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <ScrollReveal animation="fade-up">
              <span className="section-eyebrow text-seafoam-300">Why Doctors360</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
                The difference is in the{' '}
                <span className="gradient-text-seafoam">details</span>
              </h2>
              <p className="mt-5 text-seafoam-100 leading-relaxed">
                We have reimagined what healthcare can be when expertise, technology, and genuine
                compassion come together across Africa. Here's what sets Doctors360 apart.
              </p>
              <a href="#contact" className="btn-secondary mt-8">
                Experience the Difference
              </a>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} animation="fade-up" delay={i * 80}>
                <div className="group glass-card p-6 hover:bg-white/12 hover:border-seafoam-300/40 transition-all duration-400 h-full">
                  <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-seafoam-300 text-primary-500 mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    <f.icon className="w-6 h-6" />
                  </span>
                  <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                  <p className="mt-2 text-sm text-seafoam-100 leading-relaxed">{f.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
