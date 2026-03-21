import { useEffect } from 'react';
import { gsap } from './useGsap';

export function useTextReveal(
  ref: React.RefObject<HTMLElement | null>,
  trigger?: boolean
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (trigger === false) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const originalText = el.textContent ?? '';
    el.innerHTML = originalText
      .split('')
      .map((char) =>
        char === ' '
          ? '<span class="char" style="display:inline-block">&nbsp;</span>'
          : `<span class="char" style="display:inline-block">${char}</span>`
      )
      .join('');

    const chars = el.querySelectorAll('.char');
    gsap.from(chars, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      stagger: 0.03,
      ease: 'power2.out',
    });

    return () => {
      el.textContent = originalText;
    };
  }, [ref, trigger]);
}
