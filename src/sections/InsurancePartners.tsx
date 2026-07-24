import { useState, useEffect, useRef } from 'react';
import { ShieldCheck } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { dbService, GalleryImage } from '../services/dbService';

export default function InsurancePartners() {
  const [partners, setPartners] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dbService.getGalleryImages()
      .then(data => {
        const partnerImages = data.filter(img => img.category === 'Partnerships');
        setPartners(partnerImages);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching partner images:', err);
        setLoading(false);
      });
  }, []);

  if (loading || partners.length === 0) return null;

  // Double the array for seamless infinite scroll
  const duplicated = [...partners, ...partners];

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-seafoam-50/20 to-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-seafoam-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-light/10 rounded-full blur-3xl" />

      <div className="container-x relative">
        <ScrollReveal animation="fade-up" className="max-w-3xl mx-auto text-center">
          <span className="section-eyebrow">Insurance</span>
          <h2 className="section-title">
            We Accept <span className="gradient-text">Insurance</span>
          </h2>
          <p className="mt-5 text-slate-brand text-lg leading-relaxed max-w-2xl mx-auto">
            Doctors360 proudly accepts most major insurance plans. Simply present your insurance card at check-in, and our billing team will handle the rest.
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={150}>
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-seafoam-50 to-teal-light/10 rounded-2xl p-6 lg:p-8 border border-seafoam-100">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-seafoam-300 text-primary-700">
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <p className="text-sm text-slate-brand leading-relaxed">
                  As a nonprofit medical center, our mission goes beyond patient care. A portion of our proceeds is reinvested directly into community health projects, including free clinics, health education programs, and equipment upgrades. When you choose Doctors360, you're helping fund the programs that keep our community healthy.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Insurance Logos Marquee */}
        <ScrollReveal animation="fade-up" delay={300}>
          <div className="mt-14">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-teal-deep mb-8">
              Insurance Plans We Accept
            </p>

            <div className="relative overflow-hidden">
              {/* Fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

              {/* Scrolling track */}
              <div
                ref={scrollRef}
                className="flex items-center gap-12 animate-marquee"
                style={{
                  width: 'max-content',
                }}
              >
                {duplicated.map((partner, i) => (
                  <div
                    key={`${partner.id}-${i}`}
                    className="flex-shrink-0 w-36 h-24 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center p-4 group"
                  >
                    <img
                      src={partner.image_url}
                      alt={partner.title}
                      loading="lazy"
                      className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
