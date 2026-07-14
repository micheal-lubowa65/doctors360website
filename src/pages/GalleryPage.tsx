import { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { X, ZoomIn } from 'lucide-react';

const photoGallery = [
  {
    src: '/images/Medical centre Doctor360/medical centre 1 doctors360.jpeg',
    thumb: '/images/Medical centre Doctor360/medical centre 1 doctors360.jpeg',
    caption: 'State-of-the-art Medical Centre Facility',
    category: 'Medical Centre',
  },
  {
    src: '/images/Medical centre Doctor360/medical centre 2 doctors360.jpg',
    thumb: '/images/Medical centre Doctor360/medical centre 2 doctors360.jpg',
    caption: 'Patient Care at Doctors360',
    category: 'Medical Centre',
    whiteBg: true,
  },
  {
    src: '/images/Medical centre Doctor360/medical centre 3 doctors360.jpeg',
    thumb: '/images/Medical centre Doctor360/medical centre 3 doctors360.jpeg',
    caption: 'Advanced Medical Diagnostics',
    category: 'Medical Centre',
  },
  {
    src: '/images/partnerships Doctors360/partner 1 Doctor360.jpeg',
    thumb: '/images/partnerships Doctors360/partner 1 Doctor360.jpeg',
    caption: 'Global Health Partner',
    category: 'Partnerships',
    whiteBg: true,
  },
  {
    src: '/images/partnerships Doctors360/partner 2 Doctor360.jpeg',
    thumb: '/images/partnerships Doctors360/partner 2 Doctor360.jpeg',
    caption: 'Strategic Healthcare Alliance',
    category: 'Partnerships',
    whiteBg: true,
  },
  {
    src: '/images/partnerships Doctors360/partner 3 Doctor360.jpeg',
    thumb: '/images/partnerships Doctors360/partner 3 Doctor360.jpeg',
    caption: 'Community Medical Initiative',
    category: 'Partnerships',
    whiteBg: true,
  },
  {
    src: '/images/partnerships Doctors360/partner 4 Doctor360.jpeg',
    thumb: '/images/partnerships Doctors360/partner 4 Doctor360.jpeg',
    caption: 'Healthcare Infrastructure Partner',
    category: 'Partnerships',
    whiteBg: true,
  },
  {
    src: '/images/partnerships Doctors360/partner 5 Doctor360.jpeg',
    thumb: '/images/partnerships Doctors360/partner 5 Doctor360.jpeg',
    caption: 'Regional Development Fund',
    category: 'Partnerships',
    whiteBg: true,
  },
  {
    src: '/images/partnerships Doctors360/partner 6 Doctor360.jpeg',
    thumb: '/images/partnerships Doctors360/partner 6 Doctor360.jpeg',
    caption: 'Medical Research Council',
    category: 'Partnerships',
    whiteBg: true,
  },
  {
    src: '/images/partnerships Doctors360/partner 7 Doctor360.jpeg',
    thumb: '/images/partnerships Doctors360/partner 7 Doctor360.jpeg',
    caption: 'International Aid Organization',
    category: 'Partnerships',
    whiteBg: true,
  },
];

const galleryCategories = ['All', 'Partnerships', 'Medical Centre'];

export default function GalleryPage() {
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState<typeof photoGallery[0] | null>(null);

  const filtered = filter === 'All' ? photoGallery : photoGallery.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="pt-36 pb-20 bg-gradient-to-br from-primary-500 via-teal-deep to-primary-700 relative overflow-hidden noise-overlay">
        <div className="absolute -top-20 right-0 w-96 h-96 bg-seafoam-300/10 rounded-full blur-3xl animate-float" />
        <div className="container-x relative text-center">
          <ScrollReveal animation="fade-up">
            <span className="section-eyebrow text-seafoam-300">Gallery</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mt-4">
              Our work in <span className="gradient-text-seafoam">pictures</span>
            </h1>
            <p className="mt-6 text-seafoam-100 text-lg max-w-xl mx-auto leading-relaxed">
              A visual story of Doctors360's medical services, community programs, and the people we serve across Africa.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-seafoam-50 shadow-sm py-4">
        <div className="container-x flex flex-wrap gap-2">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === cat
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-seafoam-50 text-primary-500 hover:bg-seafoam-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Uniform Grid */}
      <section className="py-12 lg:py-16 bg-slate-50">
        <div className="container-x">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((photo, i) => (
              <ScrollReveal key={photo.src} animation="fade-up" delay={i * 50}>
                <button
                  onClick={() => setLightbox(photo)}
                  className={`group relative block w-full overflow-hidden rounded-3xl shadow-sm hover:shadow-xl transition-all duration-400 aspect-square ${
                    photo.whiteBg ? 'bg-white p-6 md:p-8 flex items-center justify-center border border-slate-100' : 'bg-slate-100'
                  }`}
                >
                  <img
                    src={photo.thumb}
                    alt={photo.caption}
                    loading="lazy"
                    className={`w-full h-full transition-transform duration-700 ${
                      photo.whiteBg 
                        ? 'object-contain mix-blend-multiply group-hover:scale-110' 
                        : 'object-cover group-hover:scale-105'
                    }`}
                  />
                  {!photo.whiteBg && (
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-700/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end pb-4 px-4">
                      <ZoomIn className="w-8 h-8 text-white mb-2 drop-shadow-lg" />
                      <p className="text-white text-sm font-medium text-center drop-shadow-md">{photo.caption}</p>
                    </div>
                  )}
                  <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-black/50 text-white text-[10px] font-semibold backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                    {photo.category}
                  </span>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-up backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-5xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.src}
              alt={lightbox.caption}
              className={`w-full rounded-2xl object-contain max-h-[75vh] ${
                lightbox.whiteBg ? 'bg-white p-8 mix-blend-normal' : 'shadow-2xl'
              }`}
            />
            <p className="mt-6 text-center text-white font-medium text-lg bg-black/40 px-6 py-2 rounded-full backdrop-blur-md">{lightbox.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}
