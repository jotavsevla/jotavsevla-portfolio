import { useState, useRef } from 'react';
import { gsap, useGSAP } from '../hooks/useGsap';
import { profileData } from '../data/profile';
import '../styles/intro.css';

export function IntroAnimation() {
  const [introActive, setIntroActive] = useState(() => {
    return sessionStorage.getItem('intro_played') !== 'true';
  });

  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    if (!introActive) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIntroActive(false);
      sessionStorage.setItem('intro_played', 'true');
      return;
    }

    if (!overlayRef.current) return;

    const handleComplete = () => {
      setIntroActive(false);
      sessionStorage.setItem('intro_played', 'true');
    };

    const tl = gsap.timeline({ onComplete: handleComplete });
    tlRef.current = tl;

    tl.from(overlayRef.current, { opacity: 0, duration: 0.5 })
      .from('.intro-name span', { opacity: 0, y: 20, stagger: 0.06, duration: 0.05 }, '+=0.1')
      .from('.intro-role', { opacity: 0, duration: 0.8 }, '+=0.2')
      .to(overlayRef.current, { '--glitch': 1, duration: 0.3, yoyo: true, repeat: 1 }, '+=0.3')
      .to(overlayRef.current, { opacity: 0, duration: 0.6 }, '+=0.2');

  }, { scope: overlayRef, dependencies: [introActive] });

  if (!introActive) return null;

  const handleSkip = () => {
    if (tlRef.current) {
      tlRef.current.progress(1);
    }
  };

  const name = profileData.displayName;
  const role = "Backend Developer";

  const nameChars = name.split('').map((char, index) => ({
    id: `name-char-${index}`,
    char
  }));

  return (
    <div
      className="intro-overlay"
      ref={overlayRef}
      style={{ '--glitch': 0 } as React.CSSProperties}
      role="dialog"
      aria-modal="true"
      aria-label="Intro animation"
    >
      <button type="button" className="intro-skip" onClick={handleSkip} aria-label="Skip intro animation">
        Skip &rarr;
      </button>
      <h1 className="intro-name" aria-label={name}>
        {nameChars.map(({ char, id }) => {
          return (
            <span key={id} aria-hidden="true">
              {char === ' ' ? '\u00A0' : char}
            </span>
          );
        })}
      </h1>
      <p className="intro-role">{role}</p>
    </div>
  );
}