import { useEffect } from 'react';
import SplitType from 'split-type';

/**
 * Splits text elements (selector) into per-line spans and reveals each line
 * with a small upward translate + opacity transition when scrolled into view.
 * Honors prefers-reduced-motion (no-op).
 */
export function useSplitReveal(selector: string, dependencyKey: unknown = 0) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const targets = Array.from(document.querySelectorAll(selector)) as HTMLElement[];
    if (targets.length === 0) return;

    const splits = targets.map((el) => new SplitType(el, { types: 'lines', tagName: 'span' }));

    // wrap each line in a clip mask so the line slides up from "below"
    targets.forEach((el) => el.classList.add('split-reveal'));

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('split-reveal--in');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '-10% 0px -10% 0px', threshold: 0.1 },
    );

    targets.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      splits.forEach((s) => s.revert());
      targets.forEach((el) => el.classList.remove('split-reveal', 'split-reveal--in'));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, dependencyKey]);
}
