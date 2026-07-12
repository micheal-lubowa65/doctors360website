import { useEffect, useState } from 'react';
import { Menu, X, Stethoscope, Phone, CalendarCheck } from 'lucide-react';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Departments', href: '#departments' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((s) => {
        const rect = s.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) setActive(`#${s.id}`);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,59,74,0.08)] py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <nav className="container-x flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5 group">
          <span className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-primary-500 to-teal-deep text-white shadow-md group-hover:scale-105 transition-transform duration-300">
            <Stethoscope className="w-5 h-5" />
            <span className="absolute inset-0 rounded-2xl bg-seafoam-300/0 group-hover:bg-seafoam-300/20 transition-colors duration-300" />
          </span>
          <span className="text-xl font-bold text-primary-500 tracking-tight">
            doctors<span className="text-teal-deep">360</span>
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  active === l.href
                    ? 'text-teal-deep bg-seafoam-50'
                    : 'text-primary-500 hover:text-teal-deep hover:bg-seafoam-50/50'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+18005550199"
            className="flex items-center gap-2 text-sm font-medium text-primary-500 hover:text-teal-deep transition-colors px-3 py-2 rounded-full hover:bg-seafoam-50"
          >
            <Phone className="w-4 h-4" />
            (800) 555-0199
          </a>
          <a href="#contact" className="btn-primary text-sm">
            <CalendarCheck className="w-4 h-4" />
            Book Appointment
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-seafoam-50 text-primary-500"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ${open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="container-x pt-4 pb-6">
          <ul className="flex flex-col gap-1 bg-white rounded-2xl shadow-lg p-3 border border-seafoam-100">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    active === l.href ? 'bg-seafoam-50 text-teal-deep' : 'text-primary-500 hover:bg-seafoam-50'
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a href="#contact" onClick={() => setOpen(false)} className="btn-primary w-full">
                <CalendarCheck className="w-4 h-4" />
                Book Appointment
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
