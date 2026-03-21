import { useEffect } from 'react';

export function useGlitch(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !containerRef.current) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const triggerGlitch = () => {
      if (!containerRef.current) return;

      const elements = containerRef.current.querySelectorAll('[data-glitch]');
      if (elements.length > 0) {
        const randomIndex = Math.floor(Math.random() * elements.length);
        const target = elements[randomIndex] as HTMLElement;

        target.classList.add('glitch--active');

        setTimeout(() => {
          if (target) {
            target.classList.remove('glitch--active');
          }
        }, 200);
      }

      const nextInterval = Math.random() * (15000 - 5000) + 5000;
      timeoutId = setTimeout(triggerGlitch, nextInterval);
    };

    const initialInterval = Math.random() * (15000 - 5000) + 5000;
    timeoutId = setTimeout(triggerGlitch, initialInterval);

    return () => clearTimeout(timeoutId);
  }, [containerRef]);
}
