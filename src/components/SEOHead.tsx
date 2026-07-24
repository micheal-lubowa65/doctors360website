import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  type?: string;
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const BASE_URL = 'https://www.doctors360.org';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;
const SITE_NAME = 'Doctors360';

/**
 * SEOHead — sets per-page <title>, meta description, Open Graph, Twitter Card,
 * and optional JSON-LD structured data.  Works by imperatively updating the
 * <head> on mount and cleaning up on unmount so React Router transitions get
 * fresh metadata.
 */
export default function SEOHead({
  title,
  description,
  path = '/',
  type = 'website',
  image,
  jsonLd,
}: SEOHeadProps) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const url = `${BASE_URL}${path}`;
    const img = image || DEFAULT_IMAGE;

    // Title
    document.title = fullTitle;

    // Helper to set or create a meta tag
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Standard meta
    setMeta('name', 'description', description);

    // Open Graph
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:image', img);
    setMeta('property', 'og:site_name', SITE_NAME);

    // Twitter
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', img);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // JSON-LD
    const scripts: HTMLScriptElement[] = [];
    if (jsonLd) {
      const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      items.forEach((data) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo-head', 'true');
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
        scripts.push(script);
      });
    }

    return () => {
      scripts.forEach((s) => s.remove());
    };
  }, [title, description, path, type, image, jsonLd]);

  return null;
}
