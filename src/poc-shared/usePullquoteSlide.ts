import { useEffect } from 'react';

/**
 * Drives both halves of the pull-quote's entrance. Scroll-linked, so the
 * user is always in control — no one-shot reveal that hides content.
 *
 * - The black author panel slides in from the LEFT  (-100% → 0%) via
 *   `--pq-author-x` on the section element.
 * - The mint quote text slides in from the RIGHT (+100% → 0%) via
 *   `--pq-text-x` on the section element.
 *
 * Both ends meet at the middle as the pullquote settles. The mint
 * background and structural layout are always present underneath, so
 * neither content disappears — only the type drifts into place.
 *
 * Trigger window: starts when the pullquote top reaches the lower 85%
 * of the viewport, fully settled by the time it reaches the mid-line.
 */
export function usePullquoteSlide(selector: string = '.poc2-pullquote') {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = document.querySelector<HTMLElement>(selector);
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.style.setProperty('--pq-author-x', '0%');
      el.style.setProperty('--pq-text-x', '0%');
      return;
    }

    let raf = 0;

    // Two stages so the panels arrive sequentially:
    // 0%   → 60%  scroll progress: black author panel slides in from the left.
    // 60%  → 100% scroll progress: quote text slides in from the right.
    const HANDOFF = 0.6;

    const remap = (p: number, start: number, end: number) =>
      Math.max(0, Math.min(1, (p - start) / (end - start)));

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const triggerStart = vh * 0.9;
      const triggerEnd = vh * 0.25;
      const progress = Math.max(
        0,
        Math.min(1, (triggerStart - rect.top) / (triggerStart - triggerEnd)),
      );

      const authorProgress = remap(progress, 0, HANDOFF);
      const textProgress = remap(progress, HANDOFF, 1);
      const authorX = (1 - authorProgress) * -100;
      const textX = (1 - textProgress) * 100;

      el.style.setProperty('--pq-author-x', `${authorX.toFixed(2)}%`);
      el.style.setProperty('--pq-text-x', `${textX.toFixed(2)}%`);
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
  }, [selector]);
}
