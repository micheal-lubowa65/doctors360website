import { MapPin, Phone, Mail, Navigation, CheckCircle2, Clock, CalendarCheck, Send, Loader2 } from 'lucide-react';
import { useState } from 'react';

import ScrollReveal from '../components/ScrollReveal';
import { dbService } from '../services/dbService';
import { emailService } from '../services/emailService';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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

const position: [number, number] = [4.859363, 31.57125];

const customIcon = L.divIcon({
  className: 'custom-leaflet-icon',
  html: `
    <div class="relative flex items-center justify-center w-8 h-8">
      <div class="absolute w-full h-full rounded-full bg-teal-500 animate-ping opacity-60"></div>
      <div class="w-3.5 h-3.5 rounded-full bg-teal-600 shadow-[0_0_12px_rgba(13,148,136,0.9)] border-2 border-white"></div>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<{
    name: string;
    email: string;
    phone: string;
    services: string[];
    date: string;
    message: string;
  }>({
    name: '', email: '', phone: '', services: [], date: '', message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (service: string) => {
    setForm(prev => {
      const services = prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service];
      return { ...prev, services };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.services.length === 0) {
      alert('Please select at least one service.');
      return;
    }
    setLoading(true);
    try {
      // 1. Save to Supabase database
      await dbService.submitAppointment({
        name: form.name,
        email: form.email,
        phone: form.phone,
        services: form.services,
        date: form.date,
        message: form.message || undefined
      });

      // 2. Send email notification via SMTP
      const emailResult = await emailService.sendAppointmentEmail({
        name: form.name,
        email: form.email,
        phone: form.phone,
        services: form.services,
        date: form.date,
        message: form.message || undefined,
      });

      if (!emailResult.success) {
        console.warn('Email notification failed:', emailResult.message);
        // Still show success since the appointment was saved to DB
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting appointment:', err);
      alert('Failed to submit appointment request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-primary-500 relative overflow-hidden noise-overlay">
      <div className="absolute -top-20 -left-20 w-[28rem] h-[28rem] bg-teal-deep/30 rounded-full blur-3xl " />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-seafoam-300/10 rounded-full blur-3xl -alt" />

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
                    <span className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-seafoam-300 text-primary-700 group-hover:bg-white group-hover:text-primary-500 transition-all duration-300 group-hover:scale-110">
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
              <div className="mt-8 rounded-2xl overflow-hidden shadow-xl h-64 border border-white/10 relative z-10">
                <MapContainer 
                  center={position} 
                  zoom={14} 
                  className="w-full h-full bg-slate-100 outline-none"
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://maps.google.com/">Google Maps</a>'
                    url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                  />
                  <Marker position={position} icon={customIcon} />
                </MapContainer>
              </div>
              <div className="mt-4 flex justify-center lg:justify-center relative z-20">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=4.859363,31.57125"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2 text-sm"
                >
                  <Navigation className="w-4 h-4" />
                  Navigate to Doctors360
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: form */}
          <ScrollReveal animation="fade-left" delay={200}>
            <div className="bg-seafoam-300 rounded-3xl p-8 lg:p-10 shadow-2xl relative z-20">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <span className="flex items-center justify-center w-20 h-20 rounded-full bg-seafoam-100 text-teal-deep mb-6 ">
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
                      setForm({ name: '', email: '', phone: '', services: [], date: '', message: '' });
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
                          className="mt-1 w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-teal-light focus:ring-2 focus:ring-teal-light/20 outline-none transition-all"
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
                          className="mt-1 w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-teal-light focus:ring-2 focus:ring-teal-light/20 outline-none transition-all"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-primary-500 block mb-2">Services Required <span className="text-red-500">*</span></label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                        {departments.map((d) => (
                          <label key={d} className="flex items-start gap-2 cursor-pointer group p-1.5 hover:bg-white rounded-lg transition-colors">
                            <input
                              type="checkbox"
                              checked={form.services.includes(d)}
                              onChange={() => handleServiceChange(d)}
                              className="mt-0.5 w-4 h-4 text-teal-500 rounded border-slate-300 focus:ring-teal-500/30 transition-all cursor-pointer accent-teal-500"
                            />
                            <span className="text-sm text-slate-600 group-hover:text-primary-500 transition-colors leading-tight">
                              {d}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-primary-500">Email</label>
                        <input
                          required
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          className="mt-1 w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-teal-light focus:ring-2 focus:ring-teal-light/20 outline-none transition-all"
                          placeholder="jane@example.com"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-primary-500">Preferred Date</label>
                        <input
                          required
                          type="date"
                          name="date"
                          value={form.date}
                          onChange={handleChange}
                          className="mt-1 w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-teal-light focus:ring-2 focus:ring-teal-light/20 outline-none transition-all"
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
                        className="mt-1 w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-teal-light focus:ring-2 focus:ring-teal-light/20 outline-none transition-all resize-none"
                        placeholder="Tell us about your symptoms or concerns..."
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Confirm Appointment Request
                        </>
                      )}
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

