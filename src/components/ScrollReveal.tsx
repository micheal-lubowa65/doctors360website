import { ReactNode, useEffect, useRef } from 'react';

type Animation = 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right' | 'scale-up' | 'fade-down';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: Animation;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  animation = 'fade-up',
  threshold = 0.12,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('sr-visible'), delay);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div ref={ref} className={`sr-base sr-${animation} ${className}`}>
      {children}
    </div>
  );
}
