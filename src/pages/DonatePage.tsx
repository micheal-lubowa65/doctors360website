import { Users, Handshake, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Heart, People, CheckCircle, Send, ArrowRight } from 'react-bootstrap-icons';
import ScrollReveal from '../components/ScrollReveal';
import { dbService } from '../services/dbService';

const tiers = [
  {
    amount: '$25',
    label: 'Community Supporter',
    description: 'Provides a malaria rapid test and treatment for one child.',
    color: 'from-seafoam-100 to-teal-light/20',
    iconColor: 'text-teal-deep',
    icon: Heart,
  },
  {
    amount: '$100',
    label: 'Health Champion',
    description: 'Funds a community health education session reaching 30+ families.',
    color: 'from-primary-500/10 to-teal-deep/10',
    iconColor: 'text-primary-500',
    icon: Users,
    featured: true,
  },
  {
    amount: '$500',
    label: 'Program Partner',
    description: 'Trains and equips one community health worker for three months.',
    color: 'from-seafoam-100 to-teal-light/20',
    iconColor: 'text-teal-deep',
    icon: Handshake,
  },
];

const volunteerRoles = [
  {
    title: 'Medical Volunteer',
    commitment: '2–4 weeks on-site',
    description: 'Doctors, nurses, and clinical officers — support our medical centre or outreach teams directly in South Sudan.',
  },
  {
    title: 'Training Facilitator',
    commitment: '1–3 weeks on-site or remote',
    description: 'Support the delivery of our community health worker training curriculum with facilitation and mentoring.',
  },
  {
    title: 'Digital & Tech Support',
    commitment: 'Remote, flexible',
    description: 'Help build our digital health platform, patient management system, website, or data tools.',
  },
  {
    title: 'Communications & Media',
    commitment: 'Remote, flexible',
    description: 'Contribute writing, photography, videography, or social media skills to amplify our impact stories.',
  },
  {
    title: 'Fundraising & Partnerships',
    commitment: 'Remote, flexible',
    description: 'Help us grow our donor and partner network. Ideal for individuals with NGO, corporate, or development backgrounds.',
  },
  {
    title: 'Research & Evaluation',
    commitment: 'Remote or on-site',
    description: 'Support monitoring, evaluation, and learning for our programs — data analysis, surveys, and impact reporting.',
  },
];

const corporateOptions = [
  'Cause-related marketing partnership',
  'Employee volunteering programs',
  'In-kind equipment or supplies donation',
  'Multi-year program sponsorship',
  'Employee health education workshops',
  'Joint grant applications',
];

type FormState = { name: string; email: string; type: string; amount: string; message: string };

export default function DonatePage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({ name: '', email: '', type: 'donation', amount: '', message: '' });
  const [selected, setSelected] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dbService.submitDonation({
        name: form.name,
        email: form.email,
        type: form.type,
        amount: form.type === 'donation' ? form.amount : undefined,
        message: form.message || undefined
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting donation:', err);
      alert('Failed to submit donation. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="pt-36 pb-20 lg:pt-44 lg:pb-28 bg-gradient-to-br from-primary-500 via-teal-deep to-primary-700 relative overflow-hidden noise-overlay">
        <div className="absolute -top-20 right-0 w-96 h-96 bg-seafoam-300/10 rounded-full blur-3xl " />
        <div className="absolute bottom-0 -left-20 w-80 h-80 bg-white rounded-full blur-3xl -alt" />
        <div className="container-x relative grid lg:grid-cols-2 gap-12 items-center text-left">
          <ScrollReveal animation="fade-right">
            <span className="section-eyebrow text-seafoam-300">Donate & Support</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mt-4">
              Your support saves lives<br />
              <span className="gradient-text-seafoam">across Africa</span>
            </h1>
            <p className="mt-6 text-seafoam-100 text-lg max-w-xl leading-relaxed">
              Every contribution to Doctors360 directly funds free community clinics, health worker training,
              emergency care, and life-saving medicines for the most vulnerable.
            </p>
          </ScrollReveal>
          <ScrollReveal animation="scale-up" delay={200} className="relative hidden lg:block">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/3] max-w-lg ml-auto border border-white/10">
              <img
                src="/images/donate-impact.png"
                alt="African child smiling with doctor"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Donation tiers */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-seafoam-50 rounded-full blur-3xl opacity-50" />
        <div className="container-x relative">
          <ScrollReveal animation="fade-up" className="max-w-2xl mx-auto text-center">
            <span className="section-eyebrow">How Your Donation Helps</span>
            <h2 className="section-title">Every amount <span className="gradient-text">makes a difference</span></h2>
            <p className="mt-4 text-slate-brand text-lg">Choose a giving level or make a custom donation below.</p>
          </ScrollReveal>

          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <ScrollReveal key={tier.amount} animation="fade-up" delay={i * 100}>
                <div
                  onClick={() => { setSelected(tier.amount); setForm(f => ({ ...f, amount: tier.amount })); }}
                  className={`cursor-pointer group relative p-8 rounded-3xl bg-gradient-to-br ${tier.color} border-2 transition-all duration-300 ${
                    selected === tier.amount
                      ? 'border-primary-500 shadow-xl scale-[1.02]'
                      : 'border-transparent hover:border-seafoam-200 hover:shadow-lg'
                  }`}
                >
                  {tier.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary-500 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                      Most Popular
                    </span>
                  )}
                  <span className={`flex items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-sm mb-5 ${tier.iconColor}`}>
                    <tier.icon className="w-7 h-7" />
                  </span>
                  <p className="text-4xl font-bold text-primary-500">{tier.amount}</p>
                  <p className="text-sm font-semibold text-teal-deep uppercase tracking-wider mt-1">{tier.label}</p>
                  <p className="mt-3 text-slate-brand text-sm leading-relaxed">{tier.description}</p>
                  {selected === tier.amount && (
                    <CheckCircle2 className="absolute top-4 right-4 w-5 h-5 text-primary-500" />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Donation / contact form */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-seafoam-50/50 to-white relative overflow-hidden">
        <div className="container-x relative">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <ScrollReveal animation="fade-right">
              <span className="section-eyebrow">Get Involved</span>
              <h2 className="section-title">Choose how you <span className="gradient-text">want to help</span></h2>
              <p className="mt-4 text-slate-brand leading-relaxed">
                Whether you want to make a one-time donation, volunteer your skills, or explore a corporate partnership,
                we would love to hear from you. Fill in the form and our team will respond within 48 hours.
              </p>

              {/* Volunteer roles */}
              <div id="volunteer" className="mt-10">
                <h3 className="text-lg font-bold text-primary-500 mb-4">Volunteer Opportunities</h3>
                <div className="space-y-3">
                  {volunteerRoles.map((role) => (
                    <div key={role.title} className="flex gap-4 p-4 rounded-2xl bg-white border border-seafoam-100 hover:border-seafoam-200 hover:shadow-sm transition-all">
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-seafoam-400 mt-2" />
                      <div>
                        <p className="font-semibold text-primary-500 text-sm">{role.title}</p>
                        <p className="text-xs text-teal-deep mt-0.5">{role.commitment}</p>
                        <p className="text-xs text-slate-brand mt-1 leading-relaxed">{role.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Corporate */}
              <div className="mt-10">
                <h3 className="text-lg font-bold text-primary-500 mb-4">Corporate Partnership Options</h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {corporateOptions.map((opt) => (
                    <div key={opt} className="flex items-center gap-2 text-sm text-slate-brand">
                      <ArrowRight className="w-3.5 h-3.5 text-seafoam-400 flex-shrink-0" />
                      {opt}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Form */}
            <ScrollReveal animation="fade-left" delay={150}>
              <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl border border-seafoam-50">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <span className="flex items-center justify-center w-20 h-20 rounded-full bg-seafoam-100 text-teal-deep mb-6 ">
                      <CheckCircle2 className="w-10 h-10" />
                    </span>
                    <h3 className="text-2xl font-bold text-primary-500">Thank You!</h3>
                    <p className="mt-3 text-slate-brand max-w-xs">
                      We have received your submission. Our team will be in touch within 48 hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', type: 'donation', amount: '', message: '' }); setSelected(null); }}
                      className="btn-outline mt-8"
                    >
                      Submit Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h3 className="text-xl font-bold text-primary-500 mb-2">Your Details</h3>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-primary-500">Full Name</label>
                        <input required name="name" value={form.name} onChange={handleChange}
                          className="mt-1 w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-light focus:ring-2 focus:ring-teal-light/20 outline-none transition-all"
                          placeholder="Jane Doe" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-primary-500">Email</label>
                        <input required type="email" name="email" value={form.email} onChange={handleChange}
                          className="mt-1 w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-light focus:ring-2 focus:ring-teal-light/20 outline-none transition-all"
                          placeholder="jane@example.com" />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-primary-500">How Would You Like to Help?</label>
                      <select name="type" value={form.type} onChange={handleChange}
                        className="mt-1 w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-light focus:ring-2 focus:ring-teal-light/20 outline-none transition-all bg-white">
                        <option value="donation">Make a Donation</option>
                        <option value="volunteer">Volunteer My Skills</option>
                        <option value="corporate">Corporate Partnership / Sponsorship</option>
                        <option value="inkind">In-kind Donation (Equipment / Supplies)</option>
                      </select>
                    </div>

                    {form.type === 'donation' && (
                      <div>
                        <label className="text-sm font-medium text-primary-500">Donation Amount</label>
                        <input name="amount" value={form.amount} onChange={handleChange}
                          className="mt-1 w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-light focus:ring-2 focus:ring-teal-light/20 outline-none transition-all"
                          placeholder="e.g. $50, $100, $500" />
                        <p className="text-xs text-slate-brand mt-1">Or select a tier above.</p>
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-medium text-primary-500">Message or Details (optional)</label>
                      <textarea name="message" value={form.message} onChange={handleChange} rows={4}
                        className="mt-1 w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-light focus:ring-2 focus:ring-teal-light/20 outline-none transition-all resize-none"
                        placeholder="Tell us more about how you'd like to get involved..." />
                    </div>

                    <button type="submit" className="btn-primary w-full">
                      <Send className="w-4 h-4" />
                      Submit
                    </button>
                    <p className="text-xs text-slate-brand text-center">
                      Your details are kept private and secure. We never share your information.
                    </p>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
