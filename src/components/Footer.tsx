import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);
const Twitter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
);
const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
);
const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
);

const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const linkGroups = [
  {
    title: 'Medical Services',
    links: [
      { label: 'General Medicine', href: '/#departments' },
      { label: 'Emergency Care', href: '/#departments' },
      { label: 'Cardiology', href: '/#departments' },
      { label: 'Pediatrics', href: '/#departments' },
      { label: 'Obstetrics & Gynecology', href: '/#departments' },
    ],
  },
  {
    title: 'Organisation',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'NGO Programs', href: '/programs' },
      { label: 'News & Blog', href: '/news' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Donate & Support', href: '/donate' },
    ],
  },
  {
    title: 'Patients',
    links: [
      { label: 'Book Appointment', href: '/#contact' },
      { label: 'Pharmacy', href: '/#departments' },
      { label: 'FAQs', href: '/#contact' },
      { label: 'Emergency', href: '/#contact' },
      { label: 'Privacy Policy', href: '#' },
    ],
  },
];

const socials = [Facebook, Twitter, Instagram, Linkedin, TiktokIcon];

export default function Footer() {
  return (
    <footer className="bg-primary-700 text-white pt-16 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-deep/20 rounded-full blur-3xl" />

      <div className="container-x relative">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2.5 group">
              <img 
                src="/doctors360logo1nobg.png" 
                alt="Doctors360" 
                className="w-10 h-10 object-contain brightness-0 invert group-hover:scale-105 transition-transform duration-300" 
              />
              <div className="h-10 w-[1.5px] bg-white/20" />
              <div className="flex flex-col justify-center leading-none">
                <span className="text-[22px] font-bold tracking-tight text-white whitespace-nowrap">
                  Doctors <span className="text-seafoam-300">360</span>
                </span>
                <span className="text-[6px] text-seafoam-100 tracking-[0.1em] uppercase mt-0.5 whitespace-nowrap">
                  THE CHOICE OF A HEALTHY NATION
                </span>
              </div>
            </a>
            <p className="mt-4 text-seafoam-100 text-sm leading-relaxed max-w-xs">
              Integrated medical services and community health programs —
              serving patients and communities across Africa since 2019.
            </p>
            <div className="mt-6 space-y-2.5">
              <p className="flex items-center gap-2 text-sm text-seafoam-100">
                <MapPin className="w-4 h-4 text-seafoam-300 flex-shrink-0" /> Juba, South Sudan
              </p>
              <p className="flex items-center gap-2 text-sm text-seafoam-100">
                <Phone className="w-4 h-4 text-seafoam-300 flex-shrink-0" /> +211 927 702 808
              </p>
              <p className="flex items-center gap-2 text-sm text-seafoam-100">
                <Mail className="w-4 h-4 text-seafoam-300 flex-shrink-0" /> care@doctors360.com
              </p>
            </div>
          </div>

          {/* Link groups */}
          {linkGroups.map((g) => (
            <div key={g.title}>
              <h4 className="font-semibold text-seafoam-300 mb-4">{g.title}</h4>
              <ul className="space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith('/') && !l.href.startsWith('/#') ? (
                      <Link to={l.href} className="text-sm text-seafoam-100 hover-underline hover:text-white transition-colors">
                        {l.label}
                      </Link>
                    ) : (
                      <a href={l.href} className="text-sm text-seafoam-100 hover-underline hover:text-white transition-colors">
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-semibold text-white">Stay informed</h4>
            <p className="text-sm text-seafoam-100 mt-1">Health tips and updates, straight to your inbox.</p>
          </div>
          <form className="flex flex-col sm:flex-row gap-2 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 md:w-72 px-5 py-2.5 rounded-full bg-white border border-white/15 text-gray-900 placeholder-gray-500 focus:border-seafoam-300 focus:ring-2 focus:ring-seafoam-300/20 outline-none transition-all"
            />
            <button className="btn-secondary whitespace-nowrap w-full sm:w-auto justify-center">
              <Send className="w-4 h-4" />
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-seafoam-100">
            © {new Date().getFullYear()} Doctors360 Company Limited. All rights reserved.
          </p>
          <div className="flex gap-3">
            {socials.map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-seafoam-300 text-primary-700 hover:bg-white hover:text-primary-500 hover:scale-110 transition-all duration-300"
                aria-label="Social link"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
