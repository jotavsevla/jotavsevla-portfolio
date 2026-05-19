import { useEffect, useRef } from 'react';
import './cursor-dot.css';

/**
 * Editorial cursor: tiny dot that follows the mouse with easing.
 * Expands and goes translucent on top of links/buttons.
 * Hidden on touch devices and when prefers-reduced-motion is set.
 */
export function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || window.matchMedia('(pointer: coarse)').matches);
    if (isTouch) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const dot = dotRef.current;
    if (!dot) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId = 0;

    const tick = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      dot.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      dot.classList.remove('cursor-dot--hidden');
    };

    const onLeave = () => dot.classList.add('cursor-dot--hidden');
    const onEnter = () => dot.classList.remove('cursor-dot--hidden');

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('a, button, [role="button"], input, textarea, select')) {
        dot.classList.add('cursor-dot--hover');
      } else {
        dot.classList.remove('cursor-dot--hover');
      }
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    document.body.classList.add('has-cursor-dot');

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.body.classList.remove('has-cursor-dot');
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot cursor-dot--hidden" aria-hidden="true" />;
}
