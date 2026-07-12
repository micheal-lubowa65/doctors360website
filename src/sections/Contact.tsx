import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CalendarCheck, CheckCircle2, Send } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const contactInfo = [
  { icon: MapPin, label: 'Visit Us', value: 'Juba, South Sudan — serving patients across Africa' },
  { icon: Phone, label: 'Call Us', value: '+211 927 702 808' },
  { icon: Mail, label: 'Email Us', value: 'care@doctors360.com' },
  { icon: Clock, label: 'Open Hours', value: 'Mon–Sat: 8:00 AM – 10:00 PM' },
];

const departments = [
  'General Medicine', 'Emergency Care', 'Cardiology', 'Pediatrics',
  'Obstetrics & Gynecology', 'Orthopedics', 'Mental Health', 'Dermatology',
  'Ophthalmology', 'Pharmacy Services', 'Laboratory Services', 'Radiology',
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', department: '', date: '', message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-primary-500 relative overflow-hidden noise-overlay">
      <div className="absolute -top-20 -left-20 w-[28rem] h-[28rem] bg-teal-deep/30 rounded-full blur-3xl animate-float" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-seafoam-300/10 rounded-full blur-3xl animate-float-alt" />

      <div className="container-x relative">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: info */}
          <div>
            <ScrollReveal animation="fade-up">
              <span className="section-eyebrow text-seafoam-300">Book Appointment</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
                Your 360° care journey{' '}
                <span className="gradient-text-seafoam">starts here</span>
              </h2>
              <p className="mt-5 text-seafoam-100 leading-relaxed max-w-md">
                Schedule a visit with one of our specialists. We'll confirm your appointment
                within 2 hours during business days.
              </p>
            </ScrollReveal>

            <div className="mt-10 grid sm:grid-cols-2 gap-5">
              {contactInfo.map((c, i) => (
                <ScrollReveal key={c.label} animation="fade-up" delay={i * 80}>
                  <div className="flex gap-3 items-start group">
                    <span className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 text-seafoam-300 group-hover:bg-seafoam-300 group-hover:text-primary-500 transition-all duration-300 group-hover:scale-110">
                      <c.icon className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="text-xs text-seafoam-100 uppercase tracking-wider">{c.label}</p>
                      <p className="text-sm text-white font-medium mt-0.5">{c.value}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal animation="fade-up" delay={400}>
              <div className="mt-8 rounded-2xl overflow-hidden shadow-xl h-56 border border-white/10">
                <iframe
                  title="Doctors360 Location — Juba, South Sudan"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=31.5%2C4.8%2C31.7%2C4.9&layer=mapnik&marker=4.859363%2C31.57125"
                  className="w-full h-full"
                  style={{ filter: 'grayscale(0.3) invert(0.9) hue-rotate(180deg)' }}
                  loading="lazy"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Right: form */}
          <ScrollReveal animation="fade-left" delay={200}>
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <span className="flex items-center justify-center w-20 h-20 rounded-full bg-seafoam-100 text-teal-deep mb-6 animate-pulse-ring">
                    <CheckCircle2 className="w-10 h-10" />
                  </span>
                  <h3 className="text-2xl font-bold text-primary-500">Request Received!</h3>
                  <p className="mt-3 text-slate-brand max-w-xs">
                    Thank you, {form.name || 'friend'}. Our team will reach out to
                    confirm your appointment shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', phone: '', department: '', date: '', message: '' });
                    }}
                    className="btn-outline mt-8"
                  >
                    Book Another
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-6">
                    <CalendarCheck className="w-6 h-6 text-teal-deep" />
                    <h3 className="text-xl font-bold text-primary-500">Request an Appointment</h3>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-primary-500">Full Name</label>
                        <input
                          required
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          className="mt-1 w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-light focus:ring-2 focus:ring-teal-light/20 outline-none transition-all"
                          placeholder="Jane Doe"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-primary-500">Phone</label>
                        <input
                          required
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          className="mt-1 w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-light focus:ring-2 focus:ring-teal-light/20 outline-none transition-all"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-primary-500">Email</label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="mt-1 w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-light focus:ring-2 focus:ring-teal-light/20 outline-none transition-all"
                        placeholder="jane@example.com"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-primary-500">Department</label>
                        <select
                          required
                          name="department"
                          value={form.department}
                          onChange={handleChange}
                          className="mt-1 w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-light focus:ring-2 focus:ring-teal-light/20 outline-none transition-all bg-white"
                        >
                          <option value="">Select...</option>
                          {departments.map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-primary-500">Preferred Date</label>
                        <input
                          required
                          type="date"
                          name="date"
                          value={form.date}
                          onChange={handleChange}
                          className="mt-1 w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-light focus:ring-2 focus:ring-teal-light/20 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-primary-500">Message (optional)</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={3}
                        className="mt-1 w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-light focus:ring-2 focus:ring-teal-light/20 outline-none transition-all resize-none"
                        placeholder="Tell us about your symptoms or concerns..."
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full">
                      <Send className="w-4 h-4" />
                      Confirm Appointment Request
                    </button>
                    <p className="text-xs text-slate-brand text-center">
                      By submitting, you agree to our privacy policy. We never share your data.
                    </p>
                  </form>
                </>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
