import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import {
  COUNTRY_CODES,
  DEFAULT_COUNTRY,
  countryFlag,
  findCountryByIso2,
  type CountryCode,
} from '../data/countryCodes';

interface PhoneCountryInputProps {
  phone: string;
  country: CountryCode;
  onPhoneChange: (phone: string) => void;
  onCountryChange: (country: CountryCode) => void;
}

export default function PhoneCountryInput({
  phone,
  country,
  onPhoneChange,
  onCountryChange,
}: PhoneCountryInputProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const onCountryChangeRef = useRef(onCountryChange);
  onCountryChangeRef.current = onCountryChange;

  useEffect(() => {
    let cancelled = false;

    async function detectCountry() {
      try {
        const res = await fetch('https://ipwho.is/', { signal: AbortSignal.timeout(4000) });
        if (!res.ok) throw new Error('geo failed');
        const data = await res.json() as { country_code?: string };
        const match = data.country_code ? findCountryByIso2(data.country_code) : undefined;
        if (!cancelled && match) onCountryChangeRef.current(match);
      } catch {
        // Keep default (South Sudan) if geolocation fails
      }
    }

    detectCountry();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRY_CODES;
    return COUNTRY_CODES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial.includes(q) ||
        c.iso2.toLowerCase().includes(q) ||
        `+${c.dial}`.includes(q)
    );
  }, [query]);

  return (
    <div ref={rootRef} className="mt-1 relative flex rounded-xl bg-white border border-slate-200 focus-within:border-teal-light focus-within:ring-2 focus-within:ring-teal-light/20 transition-all">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-50 border-r border-slate-200 text-slate-700 font-medium shrink-0 hover:bg-slate-100 transition-colors"
        aria-label="Select country code"
        aria-expanded={open}
      >
        <span className="text-base leading-none">{countryFlag(country.iso2)}</span>
        <span className="text-sm">+{country.dial}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <input
        required
        type="tel"
        inputMode="numeric"
        name="phone"
        value={phone}
        onChange={(e) => onPhoneChange(e.target.value.replace(/\D/g, '').slice(0, 15))}
        pattern="[0-9]{4,15}"
        minLength={4}
        maxLength={15}
        className="w-full min-w-0 px-4 py-2.5 outline-none rounded-r-xl"
        placeholder="Phone number"
        autoComplete="tel-national"
      />

      {open && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-100">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country or code..."
              className="w-full text-sm outline-none py-1"
            />
          </div>
          <ul className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-3 py-3 text-sm text-slate-400">No countries found</li>
            ) : (
              filtered.map((c) => (
                <li key={`${c.iso2}-${c.dial}`}>
                  <button
                    type="button"
                    onClick={() => {
                      onCountryChange(c);
                      setOpen(false);
                      setQuery('');
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm hover:bg-teal-50 transition-colors ${
                      c.iso2 === country.iso2 && c.dial === country.dial ? 'bg-teal-50 text-teal-800' : 'text-slate-700'
                    }`}
                  >
                    <span className="text-base leading-none w-6 text-center">{countryFlag(c.iso2)}</span>
                    <span className="flex-1 truncate">{c.name}</span>
                    <span className="text-slate-500 font-medium">+{c.dial}</span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export { DEFAULT_COUNTRY };
