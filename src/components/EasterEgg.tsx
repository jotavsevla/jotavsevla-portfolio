import { useEffect, useRef, useState } from 'react';
import { gsap } from '../hooks/useGsap';
import '../styles/easter.css';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export const EasterEgg = () => {
  const [active, setActive] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let toastTimerId: ReturnType<typeof setTimeout> | undefined;

    const activate = () => {
      if (sessionStorage.getItem('easter_egg_played') === 'true') {
        return;
      }
      sessionStorage.setItem('easter_egg_played', 'true');
      setActive(true);
      setShowToast(true);

      toastTimerId = setTimeout(() => {
        setShowToast(false);
      }, 5500);
    };

    let seq: string[] = [];
    const handler = (e: KeyboardEvent) => {
      seq = [...seq, e.key].slice(-10);
      if (seq.join(',') === KONAMI.join(',')) {
        activate();
      }
    };
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
      clearTimeout(toastTimerId);
    };
  }, []);

  useEffect(() => {
    if (!active || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cols = Math.floor(canvas.width / 20);
    const drops = Array(cols).fill(1);
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMN01234567890ジョアオ';

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '16px monospace';

      drops.forEach((y, i) => {
        const color = Math.random() > 0.5 ? '#a855f7' : '#ec4899';
        ctx.fillStyle = color;
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * 20, y * 20);
        if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, [active]);

  useEffect(() => {
    if (!active || !overlayRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = setTimeout(() => {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: prefersReduced ? 0 : 0.8,
        onComplete: () => setActive(false),
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <>
      {showToast && (
        <div className="easter-toast" role="status" aria-live="assertive">
          🎮 Secret Found!
        </div>
      )}
      {active && (
        <div ref={overlayRef} className="easter-overlay" aria-hidden="true">
          <canvas ref={canvasRef} className="easter-canvas" />
        </div>
      )}
    </>
  );
};
