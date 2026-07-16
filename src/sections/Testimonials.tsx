import { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const testimonials = [
  {
    name: 'Achol Deng',
    role: 'Maternity Patient (Juba)',
    image: '/images/testimonial-1.png',
    quote: 'During my high-risk pregnancy, the maternal health team at Doctors360 gave me the support and antenatal care I needed. Thanks to their skilled midwives and modern Juba clinic, I delivered a healthy baby girl safely.',
    rating: 5,
  },
  {
    name: 'James Dut',
    role: 'Community Outreach Patient (Yei)',
    image: '/images/testimonial-2.png',
    quote: 'When my children fell severely ill with malaria, the Doctors360 mobile outreach team in Yei responded immediately. They tested, treated, and provided us with protective mosquito nets. They are a lifeline for our community.',
    rating: 5,
  },
  {
    name: 'Nyabol Nyuon',
    role: 'Pediatrics Parent (Malakal)',
    image: '/images/testimonial-3.png',
    quote: 'My son was suffering from severe malnutrition, but the nutrition program screening identified it early. The therapeutic feeding and care from the pediatricians saved his life. I am forever grateful to Doctors360.',
    rating: 5,
  },
  {
    name: 'Emmanuel Lado',
    role: 'Emergency Care Patient (Juba)',
    image: '/images/testimonial-4.png',
    quote: 'After a severe motorcycle accident in Juba, I was rushed to the newly expanded Doctors360 Emergency Department. The trauma team acted quickly, stabilized me, and provided exceptional critical care.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);


  const go = (dir: 'left' | 'right') => {
    setIndex((i) =>
      dir === 'right' ? (i + 1) % testimonials.length : (i - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-gradient-to-b from-white via-seafoam-50/30 to-white relative overflow-hidden">
      <div className="absolute top-10 right-10 w-72 h-72 bg-seafoam-100/30 rounded-full blur-3xl" />

      <div className="container-x relative">
        <ScrollReveal animation="fade-up" className="max-w-2xl mx-auto text-center">
          <span className="section-eyebrow">Patient Stories</span>
          <h2 className="section-title">
            Real care, <span className="gradient-text">real outcomes</span>
          </h2>
          <p className="mt-4 text-slate-brand text-lg">
            Nothing matters more than the trust of the people we serve.
          </p>
        </ScrollReveal>

        <ScrollReveal animation="scale-up" delay={150} className="mt-14 max-w-4xl mx-auto">
          <div className="relative bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-seafoam-50 overflow-hidden">
            <Quote className="absolute top-8 right-8 w-16 h-16 text-seafoam-200" />

            {/* Slide content with key for re-animation */}
            <div key={index} className="relative">
              <div className="flex items-center gap-0.5 text-coral mb-5 animate-fade-up">
                {Array.from({ length: testimonials[index].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              <blockquote className="text-xl lg:text-2xl text-primary-500 leading-relaxed font-medium animate-fade-up" style={{ animationDelay: '0.1s' }}>
                "{testimonials[index].quote}"
              </blockquote>

              <div className="mt-8 flex items-center gap-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                <img
                  src={testimonials[index].image}
                  alt={testimonials[index].name}
                  loading="lazy"
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-seafoam-300"
                />
                <div>
                  <p className="font-semibold text-primary-500">{testimonials[index].name}</p>
                  <p className="text-sm text-slate-brand">{testimonials[index].role}</p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setIndex(i); }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === index ? 'w-8 bg-teal-deep' : 'w-2 bg-slate-200 hover:bg-slate-300'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => go('left')}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-seafoam-50 text-primary-500 hover:bg-seafoam-100 hover:scale-110 transition-all duration-300"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => go('right')}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-seafoam-50 text-primary-500 hover:bg-seafoam-100 hover:scale-110 transition-all duration-300"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
