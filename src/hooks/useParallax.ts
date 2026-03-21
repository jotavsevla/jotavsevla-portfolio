import { useEffect } from 'react';
import { gsap, ScrollTrigger } from './useGsap';

export function useParallax(
  ref: React.RefObject<HTMLElement | null>,
  speed: number = 0.3
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const tween = gsap.to(el, {
      y: () => -ScrollTrigger.maxScroll(window) * speed * 0.15,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === el) st.kill();
      });
    };
  }, [ref, speed]);
}
