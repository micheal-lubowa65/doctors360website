import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, Send } from 'lucide-react';

const linkGroups = [
  {
    title: 'Services',
    links: ['General Medicine', 'Emergency Care', 'Cardiology', 'Pediatrics', 'Obstetrics & Gynecology'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Our Doctors', 'Careers', 'News & Blog', 'Privacy Policy'],
  },
  {
    title: 'Patients',
    links: ['Book Appointment', 'Patient Portal', 'Pharmacy', 'FAQs', 'Emergency'],
  },
];

const socials = [Facebook, Twitter, Instagram, Linkedin];

export default function Footer() {
  return (
    <footer className="bg-primary-700 text-white pt-16 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-deep/20 rounded-full blur-3xl" />

      <div className="container-x relative">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2.5 group">
              <span className="relative flex items-center justify-center w-11 h-11 group-hover:scale-105 transition-transform duration-300">
                <img src="/doctors360logo1nobg.png" alt="Doctors360" className="w-11 h-11 object-contain brightness-0 invert" />
              </span>
              <span>
                <span className="block text-xl font-bold tracking-tight">
                  Doctors<span className="text-seafoam-300">360</span>
                </span>
                <span className="block text-[10px] text-seafoam-100 tracking-[0.15em] uppercase -mt-0.5">Integrated medical services</span>
              </span>
            </a>
            <p className="mt-4 text-seafoam-100 text-sm leading-relaxed max-w-xs">
              Comprehensive, compassionate healthcare for every stage of life.
              Your health, covered from every angle.
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
                  <li key={l}>
                    <a href="#" className="text-sm text-seafoam-100 hover-underline hover:text-white transition-colors">
                      {l}
                    </a>
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
          <form className="flex gap-2 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 md:w-72 px-4 py-2.5 rounded-full bg-white/10 border border-white/15 text-white placeholder-seafoam-100/60 focus:border-seafoam-300 focus:ring-2 focus:ring-seafoam-300/20 outline-none transition-all"
            />
            <button className="btn-secondary whitespace-nowrap">
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
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-seafoam-300 hover:text-primary-500 hover:scale-110 transition-all duration-300"
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
