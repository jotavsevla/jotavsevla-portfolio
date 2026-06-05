import { useEffect } from 'react';

/**
 * Scroll-linked colored fill for chapter bands. Each band starts on the
 * cream background (text fully legible) and the colored layer slides in
 * from the left or right — alternating per chapter — as the section
 * crosses the viewport. Acts like proposals being dealt onto the page.
 *
 * The hook sets `--chap-translate-x` on each matched element. CSS uses
 * that value on the band's ::before (the color layer) to translate it
 * from off-screen to its settled position.
 */
export function useChapterFill(selector: string = '.poc2-chapter') {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));

    if (prefersReduced) {
      nodes.forEach((el) => el.style.setProperty('--chap-translate-x', '0%'));
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
        // Alternate sides: even index (0, 2) slides from left, odd from right.
        const dir = idx % 2 === 0 ? -1 : 1;
        const x = (1 - progress) * 100 * dir;
        el.style.setProperty('--chap-translate-x', `${x.toFixed(2)}%`);
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
