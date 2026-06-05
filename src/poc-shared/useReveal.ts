import { useEffect } from 'react';

/**
 * Tags every element matching `selector` with `.is-in-view` once it crosses
 * `rootMargin` into the viewport. CSS owns the actual animation.
 *
 * Idempotent: respects `prefers-reduced-motion` and never removes the class,
 * so re-scrolling past a revealed element doesn't replay the animation.
 */
export function useReveal(selector: string = '[data-reveal]', rootMargin = '0px 0px -10% 0px') {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (els.length === 0) return;

    if (prefersReduced) {
      els.forEach((el) => el.classList.add('is-in-view'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin, threshold: 0.05 },
    );

    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector, rootMargin]);
}
