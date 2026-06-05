import { useEffect } from 'react';

/**
 * Scroll-linked entrance for chapter bands. Each band has two halves that
 * meet in the middle as the section crosses the viewport:
 *
 * - The colored background slides in from one side
 *   (`--chap-color-x` on the ::before pseudo-element).
 * - The title + description slide in from the OPPOSITE side
 *   (`--chap-title-x` on the matching elements).
 *
 * Even-indexed chapters fill color from the left and bring text from
 * the right; odd-indexed chapters mirror that. The giant numeral and
 * the bullet list stay anchored — they are the user's reference points
 * while the rest is being dealt onto the page.
 */
export function useChapterFill(selector: string = '.poc2-chapter') {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));

    if (prefersReduced) {
      nodes.forEach((el) => {
        el.style.setProperty('--chap-color-x', '0%');
        el.style.setProperty('--chap-title-x', '0%');
      });
      return;
    }

    let raf = 0;

    const update = () => {
      const vh = window.innerHeight;
      nodes.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        const triggerStart = vh * 0.85;
        const triggerEnd = vh * 0.4;
        const progress = Math.max(
          0,
          Math.min(1, (triggerStart - rect.top) / (triggerStart - triggerEnd)),
        );
        // Even index (0, 2): color from left, title from right.
        // Odd index (1):     color from right, title from left.
        const dir = idx % 2 === 0 ? -1 : 1;
        const colorX = (1 - progress) * 100 * dir;
        const titleX = (1 - progress) * 100 * -dir;
        el.style.setProperty('--chap-color-x', `${colorX.toFixed(2)}%`);
        el.style.setProperty('--chap-title-x', `${titleX.toFixed(2)}%`);
      });
      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    const onResize = () => {
      nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
      update();
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [selector]);
}
