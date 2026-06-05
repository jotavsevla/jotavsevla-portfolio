import { useEffect } from 'react';

/**
 * Sets a CSS custom property `--num-parallax` on every element matching
 * `selector` based on its position in the viewport. Range is ±`amount` px,
 * centered when the element is in the middle of the viewport.
 *
 * Always visible — this only shifts the element by a few px to give a
 * sense of depth without revealing/hiding any content.
 */
export function useParallaxRefs(selector: string, amount = 32, prop = '--num-parallax') {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let raf = 0;
    let nodes: HTMLElement[] = Array.from(document.querySelectorAll<HTMLElement>(selector));

    const update = () => {
      const vh = window.innerHeight;
      nodes.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        // -1 when element center is below viewport, 0 when at center, +1 when above
        const t = Math.max(-1, Math.min(1, (vh / 2 - center) / (vh / 2)));
        el.style.setProperty(prop, `${(t * amount).toFixed(2)}px`);
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
  }, [selector, amount, prop]);
}
