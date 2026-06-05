import { useEffect } from 'react';

/**
 * Drives the pull-quote's black author panel slide-in. Scroll-linked, so
 * the user is always in control — no one-shot reveal that hides content.
 *
 * - The mint quote panel is always visible (full background).
 * - The black panel translates from -100% (off-screen left) to 0% as the
 *   pull-quote crosses the viewport. Set via CSS custom property
 *   `--pq-author-x` on the section element.
 *
 * Trigger window: starts sliding in once the pull-quote top reaches the
 * lower 85% of the viewport, fully settled by the time it reaches the
 * mid-line. Stays settled while inside the viewport.
 */
export function usePullquoteSlide(selector: string = '.poc2-pullquote', prop = '--pq-author-x') {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = document.querySelector<HTMLElement>(selector);
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.style.setProperty(prop, '0%');
      return;
    }

    let raf = 0;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Below the trigger zone (top of pullquote below 85% of viewport) → -100%.
      // Past the trigger zone (top reaches 40% of viewport) → 0%.
      const triggerStart = vh * 0.85;
      const triggerEnd = vh * 0.4;
      const progress = Math.max(
        0,
        Math.min(1, (triggerStart - rect.top) / (triggerStart - triggerEnd)),
      );
      const x = (1 - progress) * -100;
      el.style.setProperty(prop, `${x.toFixed(2)}%`);
      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [selector, prop]);
}
