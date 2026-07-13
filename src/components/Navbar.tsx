import { useEffect, useState } from 'react';
import { Menu, X, Phone, CalendarCheck, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

// Top-level page navigation
const pageLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  {
    label: 'Programs',
    href: '/programs',
    children: [
      { label: 'Community Outreach', href: '/programs#outreach' },
      { label: 'Health Promotion', href: '/programs#education' },
      { label: 'CHW Training', href: '/programs#training' },
      { label: 'Partnerships', href: '/programs#partners' },
    ],
  },
  { label: 'News & Blog', href: '/news' },
  { label: 'Gallery', href: '/gallery' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const close = () => setDropdown(null);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  const navBg = scrolled || !isHome
    ? 'bg-white/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,59,74,0.08)] py-2.5'
    : 'bg-transparent py-4';

  const textColor = !scrolled && isHome ? 'text-primary-500' : 'text-primary-500';

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${navBg}`}>
      <nav className="container-x flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
          <img 
            src="/doctors360logo1nobg.png" 
            alt="Doctors360" 
            className="w-11 h-11 object-contain group-hover:scale-105 transition-transform duration-300" 
          />
          <div className="h-9 w-[1px] bg-slate-300" />
          <div className="flex flex-col justify-center leading-none">
            <span className={`text-xl font-bold tracking-tight text-primary-500`}>
              Doctors<span className="text-teal-deep">360</span>
            </span>
            <span className="text-[8.5px] text-slate-400 tracking-[0.05em] uppercase mt-1.5 whitespace-nowrap">
              THE CHOICE OF A HEALTHY NATION
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-0.5">
          {pageLinks.map((l) => (
            <li key={l.href} className="relative">
              {l.children ? (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); setDropdown(dropdown === l.href ? null : l.href); }}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                      pathname.startsWith(l.href) ? 'text-teal-deep bg-seafoam-50' : `${textColor} hover:text-teal-deep hover:bg-seafoam-50/50`
                    }`}
                  >
                    {l.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdown === l.href ? 'rotate-180' : ''}`} />
                  </button>
                  {dropdown === l.href && (
                    <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-seafoam-50 py-2 z-50" onClick={(e) => e.stopPropagation()}>
                      {l.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          onClick={() => setDropdown(null)}
                          className="block px-4 py-2.5 text-sm text-primary-500 hover:text-teal-deep hover:bg-seafoam-50 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={l.href}
                  className={`relative px-3 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    pathname === l.href ? 'text-teal-deep bg-seafoam-50' : `${textColor} hover:text-teal-deep hover:bg-seafoam-50/50`
                  }`}
                >
                  {l.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <a
            href="tel:+211927702808"
            className={`flex items-center gap-2 text-sm font-medium transition-colors px-3 py-2 rounded-full hover:bg-seafoam-50 ${textColor} hover:text-teal-deep`}
          >
            <Phone className="w-4 h-4" />
            +211 927 702 808
          </a>
          <Link to="/donate" className="btn-secondary text-sm whitespace-nowrap">
            Donate
          </Link>
          <a href="/#contact" className="btn-primary text-sm whitespace-nowrap">
            <CalendarCheck className="w-4 h-4" />
            Book Appointment
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-seafoam-50 text-primary-500"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ${open ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="container-x pt-4 pb-6">
          <ul className="flex flex-col gap-1 bg-white rounded-2xl shadow-lg p-3 border border-seafoam-100">
            {pageLinks.map((l) => (
              <li key={l.href}>
                <Link to={l.href} onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    pathname === l.href ? 'bg-seafoam-50 text-teal-deep' : 'text-primary-500 hover:bg-seafoam-50'
                  }`}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 space-y-2">
              <Link to="/donate" onClick={() => setOpen(false)} className="btn-secondary w-full">
                Donate to Doctors360
              </Link>
              <a href="/#contact" onClick={() => setOpen(false)} className="btn-primary w-full">
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
