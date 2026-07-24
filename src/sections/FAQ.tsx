import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const faqs = [
  {
    question: 'What is Doctors360?',
    answer:
      'Doctors360 is an integrated medical services provider and registered NGO based in Juba, South Sudan. Founded in 2019, we provide accessible, ethical, patient-centred healthcare across East Africa through both clinical facilities and community health programs. We have served over 50,000 patients across South Sudan and Uganda.',
  },
  {
    question: 'Where is Doctors360 located?',
    answer:
      'Our main medical centre is located in Juba, South Sudan. We also run community health programs in Uganda. We are expanding into additional East African countries by 2027.',
  },
  {
    question: 'What medical services does Doctors360 offer?',
    answer:
      'We offer 12 medical specialties: General Medicine, Emergency Care (24/7), Cardiology, Pediatrics, Mental Health, Orthopedics, Ophthalmology, Obstetrics & Gynecology, Radiology & Imaging, Laboratory Services, Pharmacy Services, and Dermatology. Our care model follows four pillars: Prevention & Wellness, Advanced Diagnostics, Treatment & Therapy, and Follow-up & Recovery.',
  },
  {
    question: 'Is Doctors360 a nonprofit organization?',
    answer:
      'Yes. Doctors360 is a registered NGO in South Sudan. We provide approximately 30% of our care free of charge and operate community health programs funded by donors and partnerships with organizations including WHO, UNICEF, and MSF.',
  },
  {
    question: 'How can I book an appointment with Doctors360?',
    answer:
      'You can book an appointment through our website at www.doctors360.org, call us at +211 927 702 808, or email care@doctors360.com. We confirm appointments within 2 hours during business days. Our clinic is open Monday through Saturday, 8:00 AM to 10:00 PM.',
  },
  {
    question: 'Does Doctors360 provide free healthcare?',
    answer:
      'Yes. Approximately 30% of all care we provide is free of charge, particularly through our community health outreach programs. We believe no one should be denied quality care because of where they live or their ability to pay.',
  },
  {
    question: 'What countries does Doctors360 operate in?',
    answer:
      'We are currently active in South Sudan (primary operations) and Uganda (community health programs). We are expanding into two additional East African countries by end of 2026.',
  },
  {
    question: 'How can I donate to or volunteer with Doctors360?',
    answer:
      'Visit www.doctors360.org/donate to contribute. Donation tiers start at $25 (Community Supporter), $100 (Health Champion), and $500 (Program Partner). Volunteer roles include Medical Volunteer, Training Facilitator, Digital & Tech Support, Communications & Media, Fundraising & Partnerships, and Research & Evaluation. Corporate partnerships are also available.',
  },
];

// Generate FAQPage JSON-LD for structured data
export const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

function FAQItem({ faq, isOpen, onToggle }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 ${
        isOpen
          ? 'border-seafoam-200 bg-seafoam-50/50 shadow-md'
          : 'border-slate-100 bg-white hover:border-seafoam-100 hover:shadow-sm'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold text-primary-500 pr-4">{faq.question}</h3>
        <span
          className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
            isOpen
              ? 'bg-teal-deep text-white rotate-180'
              : 'bg-seafoam-50 text-teal-deep'
          }`}
        >
          <ChevronDown className="w-5 h-5" />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="px-6 pb-6 text-slate-brand leading-relaxed">{faq.answer}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-20 lg:py-28 bg-gradient-to-b from-white via-seafoam-50/20 to-white relative overflow-hidden"
      aria-label="Frequently Asked Questions about Doctors360"
    >
      <div className="absolute top-20 -right-20 w-80 h-80 bg-seafoam-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 -left-16 w-64 h-64 bg-teal-light/10 rounded-full blur-3xl" />

      <div className="container-x relative">
        <ScrollReveal animation="fade-up" className="max-w-2xl mx-auto text-center">
          <span className="section-eyebrow">Common Questions</span>
          <h2 className="section-title">
            Everything you need to{' '}
            <span className="gradient-text">know</span>
          </h2>
          <p className="mt-4 text-slate-brand text-lg">
            Quick answers to the questions our patients and supporters ask most.
          </p>
        </ScrollReveal>

        <div className="mt-14 max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <ScrollReveal key={faq.question} animation="fade-up" delay={i * 60}>
              <FAQItem
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal animation="fade-up" delay={500} className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-seafoam-50 border border-seafoam-100">
            <HelpCircle className="w-5 h-5 text-teal-deep flex-shrink-0" />
            <p className="text-sm text-primary-500">
              Still have questions?{' '}
              <a href="#contact" className="font-semibold text-teal-deep hover:underline">
                Contact our team
              </a>{' '}
              or call{' '}
              <a href="tel:+211927702808" className="font-semibold text-teal-deep hover:underline">
                +211 927 702 808
              </a>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
