import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { XLg, ZoomIn } from 'react-bootstrap-icons';
import { dbService, GalleryImage } from '../services/dbService';

export default function GalleryPage() {
  const [photoGallery, setPhotoGallery] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  useEffect(() => {
    dbService.getGalleryImages()
      .then(data => {
        setPhotoGallery(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching gallery images:', err);
        setLoading(false);
      });
  }, []);

  const galleryCategories = ['All', ...Array.from(new Set(photoGallery.map(p => p.category)))];
  const filtered = filter === 'All' ? photoGallery : photoGallery.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="pt-36 pb-20 bg-gradient-to-br from-primary-500 via-teal-deep to-primary-700 relative overflow-hidden noise-overlay">
        <div className="absolute -top-20 right-0 w-96 h-96 bg-seafoam-300/10 rounded-full blur-3xl " />
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
      <section className="sticky top-0 z-30 bg-white/90  border-b border-seafoam-50 shadow-sm py-4">
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
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-slate-brand py-20">No images found in the gallery.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((photo, i) => {
                const whiteBg = photo.category === 'Partnerships';
                return (
                  <ScrollReveal key={photo.id} animation="fade-up" delay={i * 50}>
                    <button
                      onClick={() => setLightbox(photo)}
                      className={`group relative block w-full overflow-hidden rounded-3xl shadow-sm hover:shadow-xl transition-all duration-400 aspect-square ${
                        whiteBg ? 'bg-white p-6 md:p-8 flex items-center justify-center border border-slate-100' : 'bg-slate-100'
                      }`}
                    >
                      <img
                        src={photo.image_url}
                        alt={photo.title}
                        loading="lazy"
                        className={`w-full h-full transition-transform duration-700 ${
                          whiteBg 
                            ? 'object-contain mix-blend-multiply group-hover:scale-110' 
                            : 'object-cover group-hover:scale-105'
                        }`}
                      />
                      {!whiteBg && (
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-700/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end pb-4 px-4">
                          <ZoomIn className="w-8 h-8 text-white mb-2 drop-shadow-lg" />
                          <p className="text-white text-sm font-medium text-center drop-shadow-md">{photo.title}</p>
                        </div>
                      )}
                      <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-black/50 text-white text-[10px] font-semibold  opacity-0 group-hover:opacity-100 transition-opacity">
                        {photo.category}
                      </span>
                    </button>
                  </ScrollReveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-up "
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 flex items-center justify-center w-12 h-12 rounded-full bg-white text-white hover:bg-white/20 hover:scale-110 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-5xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const whiteBg = lightbox.category === 'Partnerships';
              return (
                <img
                  src={lightbox.image_url}
                  alt={lightbox.title}
                  className={`w-full rounded-2xl object-contain max-h-[75vh] ${
                    whiteBg ? 'bg-white p-8 mix-blend-normal' : 'shadow-2xl'
                  }`}
                />
              );
            })()}
            <p className="mt-6 text-center text-white font-medium text-lg bg-black/60 px-6 py-2 rounded-full ">{lightbox.title}</p>
          </div>
        </div>
      )}
    </div>
  );
}
