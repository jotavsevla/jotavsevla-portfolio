import { useEffect, useRef } from 'react';
import '../styles/background.css';

export function AnimatedBackground() {
  const gridRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Pause CSS animations when tab is not visible (battery saving)
    const handleVisibility = () => {
      const paused = document.hidden ? 'paused' : 'running';
      if (gridRef.current) gridRef.current.style.animationPlayState = paused;
      if (gradientRef.current) gradientRef.current.style.animationPlayState = paused;
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <div className="animated-bg" aria-hidden="true" role="presentation">
      <div className="animated-bg__grid" ref={gridRef} />
      <div className="animated-bg__gradient" ref={gradientRef} />
    </div>
  );
}