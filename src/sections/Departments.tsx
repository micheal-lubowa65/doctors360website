import { Heart, Brain, Bone, Baby, Eye, BrainCog, Stethoscope, Syringe, ArrowRight, Ambulance, FlaskConical, Microscope, Pill } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const departments = [
  { icon: Stethoscope, name: 'General Medicine', desc: 'Comprehensive primary care for all ages — prevention, diagnosis, and management of everyday health concerns.', doctors: 14 },
  { icon: Ambulance, name: 'Emergency Care', desc: 'Rapid-response emergency services available around the clock, equipped for critical and acute conditions.', doctors: 10 },
  { icon: Heart, name: 'Cardiology', desc: 'Comprehensive heart care from prevention and diagnostics to advanced cardiac interventions.', doctors: 8 },
  { icon: Baby, name: 'Pediatrics', desc: 'Compassionate, evidence-based care for infants, children, and adolescents across Africa.', doctors: 12 },
  { icon: BrainCog, name: 'Mental Health', desc: 'Holistic mental health services including counselling, therapy, and psychiatric support.', doctors: 7 },
  { icon: Bone, name: 'Orthopedics', desc: 'Bone, joint, and musculoskeletal care including trauma management and rehabilitation.', doctors: 6 },
  { icon: Eye, name: 'Ophthalmology', desc: 'Full-spectrum eye care — routine checks, surgical correction, and specialised retinal treatment.', doctors: 5 },
  { icon: Syringe, name: 'Obstetrics & Gynecology', desc: 'Safe motherhood, antenatal care, skilled birth attendance, and women\'s reproductive health.', doctors: 9 },
  { icon: Brain, name: 'Radiology & Imaging', desc: 'Digital X-ray, ultrasound, and advanced imaging to support accurate diagnosis across all departments.', doctors: 4 },
  { icon: Microscope, name: 'Laboratory Services', desc: 'Accredited diagnostic laboratory providing rapid, reliable results for blood, urine, and pathology tests.', doctors: 6 },
  { icon: Pill, name: 'Pharmacy Services', desc: 'In-facility and online pharmacy dispensing prescription and over-the-counter medications safely.', doctors: 5 },
  { icon: FlaskConical, name: 'Dermatology', desc: 'Skin, hair, and nail care — treating conditions common across tropical and sub-Saharan climates.', doctors: 4 },
];

export default function Departments() {
  return (
    <section id="departments" className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-seafoam-100/40 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-light/20 rounded-full blur-3xl opacity-60 translate-y-1/3 -translate-x-1/4" />

      <div className="container-x relative">
        <ScrollReveal animation="fade-up" className="max-w-2xl mx-auto text-center mb-16">
          <span className="section-eyebrow">Our Departments</span>
          <h2 className="section-title">
            Specialized care across <span className="gradient-text">every field</span>
          </h2>
          <p className="mt-4 text-slate-brand text-lg">
            With 20+ specialties under one roof, you never have to look far for the right expert.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {departments.map((d, i) => (
            <ScrollReveal key={d.name} animation="fade-up" delay={i * 50}>
              <div className="bg-white rounded-3xl p-6 lg:p-8 h-full flex flex-col shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-seafoam-50 text-teal-deep flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-primary-500 group-hover:to-teal-deep group-hover:text-white transition-all duration-300 group-hover:scale-110">
                  <d.icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-bold text-primary-500 mb-3 group-hover:text-teal-deep transition-colors">{d.name}</h3>
                <p className="text-sm text-slate-brand leading-relaxed mb-6 flex-grow">{d.desc}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                  <span className="text-xs font-bold text-teal-deep uppercase tracking-wider bg-seafoam-50 px-3 py-1 rounded-full group-hover:bg-teal-50 transition-colors">
                    {d.doctors} Specialists
                  </span>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-teal-deep group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal animation="fade-up" delay={400} className="mt-16 flex flex-wrap gap-4 justify-center">
          <a href="#contact" className="btn-primary shadow-lg shadow-teal-deep/20 hover:shadow-teal-deep/30">
            Book a Consultation
            <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#services" className="btn-outline bg-white hover:bg-slate-50">
            View All Services
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
