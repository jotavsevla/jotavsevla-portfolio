import { useEffect, useRef } from 'react';
import '../styles/cursor.css';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate on non-touch devices
    const isTouch =
      'ontouchstart' in window ||
      window.matchMedia('(pointer: coarse)').matches;

    if (isTouch) return;

    // Dynamically import GSAP to avoid issues if not yet installed
    let quickX: ((v: number) => void) | null = null;
    let quickY: ((v: number) => void) | null = null;

    import('gsap').then(({ gsap }) => {
      const cursor = cursorRef.current;
      if (!cursor) return;

      quickX = gsap.quickTo(cursor, 'x', { duration: 0.25, ease: 'power3.out' });
      quickY = gsap.quickTo(cursor, 'y', { duration: 0.25, ease: 'power3.out' });
    });

    document.body.classList.add('cursor-active');

    const onMove = (e: MouseEvent) => {
      if (quickX && quickY) {
        quickX(e.clientX);
        quickY(e.clientY);
      } else if (cursorRef.current) {
        // Fallback: direct style if GSAP not yet loaded
        cursorRef.current.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
      }
    };

    const onEnterLink = () => {
      cursorRef.current?.classList.add('custom-cursor--hover-link');
    };

    const onLeaveLink = () => {
      cursorRef.current?.classList.remove('custom-cursor--hover-link');
    };

    const onMouseLeave = () => {
      cursorRef.current?.classList.add('custom-cursor--hidden');
    };

    const onMouseEnter = () => {
      cursorRef.current?.classList.remove('custom-cursor--hidden');
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const linked = new Set<Element>();

    const attachLinkListeners = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        if (linked.has(el)) return;
        el.addEventListener('mouseenter', onEnterLink);
        el.addEventListener('mouseleave', onLeaveLink);
        linked.add(el);
      });
    };

    attachLinkListeners();

    // Re-attach on DOM changes (new buttons rendered by React)
    const observer = new MutationObserver(attachLinkListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.classList.remove('cursor-active');
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      observer.disconnect();
      linked.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterLink);
        el.removeEventListener('mouseleave', onLeaveLink);
      });
      linked.clear();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      aria-hidden="true"
    />
  );
}
