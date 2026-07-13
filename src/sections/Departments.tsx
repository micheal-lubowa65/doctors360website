import { useState } from 'react';
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
  const [active, setActive] = useState(0);

  return (
    <section id="departments" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-20 left-0 w-72 h-72 bg-seafoam-50 rounded-full blur-3xl opacity-50" />

      <div className="container-x relative">
        <ScrollReveal animation="fade-up" className="max-w-2xl mx-auto text-center">
          <span className="section-eyebrow">Our Departments</span>
          <h2 className="section-title">
            Specialized care across <span className="gradient-text">every field</span>
          </h2>
          <p className="mt-4 text-slate-brand text-lg">
            With 20+ specialties under one roof, you never have to look far for the right expert.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid lg:grid-cols-3 gap-6">
          {/* Department list */}
          <ScrollReveal animation="fade-right" className="lg:col-span-1">
            <div className="space-y-2">
              {departments.map((d, i) => (
                <button
                  key={d.name}
                  onClick={() => setActive(i)}
                  className={`w-full flex items-center gap-3 p-4 rounded-2xl text-left transition-all duration-300 ${
                    active === i
                      ? 'bg-gradient-to-r from-primary-500 to-teal-deep text-white shadow-lg scale-[1.02]'
                      : 'bg-seafoam-50 text-primary-500 hover:bg-seafoam-100 hover:scale-[1.01]'
                  }`}
                >
                  <span className={`flex items-center justify-center w-10 h-10 rounded-xl transition-colors ${
                    active === i ? 'bg-white/15 text-white' : 'bg-white text-teal-deep'
                  }`}>
                    <d.icon className="w-5 h-5" />
                  </span>
                  <span className="font-medium">{d.name}</span>
                  <span className={`ml-auto text-xs ${active === i ? 'text-seafoam-100' : 'text-slate-brand'}`}>
                    {d.doctors} doctors
                  </span>
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Detail panel */}
          <ScrollReveal animation="fade-left" delay={150} className="lg:col-span-2">
            <div className="relative bg-gradient-to-br from-seafoam-50 via-white to-teal-light/10 rounded-3xl p-8 lg:p-10 border border-seafoam-100 overflow-hidden h-full">
              {/* Decorative circle */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-seafoam-100/40 rounded-full blur-2xl" />

              <div className="relative">
                <div className="flex items-start gap-5">
                  <span className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-teal-deep text-white shadow-lg">
                    {(() => {
                      const Icon = departments[active].icon;
                      return <Icon className="w-8 h-8" />;
                    })()}
                  </span>
                  <div>
                    <h3 className="text-2xl font-bold text-primary-500">{departments[active].name}</h3>
                    <p className="mt-2 text-slate-brand leading-relaxed">{departments[active].desc}</p>
                  </div>
                </div>

                <div className="mt-8 grid sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Specialists', value: `${departments[active].doctors}` },
                    { label: 'Procedures / yr', value: '4.2k+' },
                    { label: 'Satisfaction', value: '99%' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-slate-50 hover:shadow-md transition-shadow">
                      <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                      <p className="text-xs text-slate-brand mt-1 uppercase tracking-wider">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-4 justify-center sm:justify-start">
                  <a href="#contact" className="btn-primary">
                    Book a Consultation
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a href="#services" className="btn-outline">
                    View All Services
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
