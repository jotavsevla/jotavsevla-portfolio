import { useRef } from 'react';
import { profileData } from '../data/profile';
import { useLanguage } from '../i18n/context';
import { gsap, useGSAP } from '../hooks/useGsap';
import { useTextReveal } from '../hooks/useTextReveal';
import { useParallax } from '../hooks/useParallax';
import { useGlitch } from '../hooks/useGlitch';

export function HeroSection() {
  const { t, dict } = useLanguage();
  const mailtoLink = `mailto:${profileData.email}?subject=${encodeURIComponent(t('contact.email_subject'))}`;
  
  const containerRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const avatarRef = useRef<HTMLImageElement>(null);

  useTextReveal(nameRef, true);
  useParallax(avatarRef, 0.4);
  useGlitch(containerRef);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero__bg-gradient', { opacity: 0, duration: 1.5 })
        .from('.hero__eyebrow', { y: 20, opacity: 0, duration: 0.8 }, '-=0.5')
        .from('.hero__role', { y: 30, opacity: 0, duration: 0.8 }, '+=0.2')
        .from('.hero__highlights li', { x: -20, opacity: 0, duration: 0.6, stagger: 0.08 }, '-=0.4')
        .from('.hero__actions .btn', { scale: 0.85, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)' }, '-=0.2')
        .from('.hero__avatar-container', { x: 60, opacity: 0, duration: 1 }, '-=1');
    },
    { scope: containerRef }
  );

  return (
    <section className="hero hero--fullscreen" ref={containerRef}>
      <div className="hero__bg-gradient"></div>
      
      <div className="hero__layout">
        <div className="hero__content">
          <p className="hero__eyebrow">{t('hero.eyebrow')}</p>
          
          <h1 className="hero__title">
            <span className="hero__name-glitch glitch" ref={nameRef} data-glitch={profileData.displayName} data-text={profileData.displayName}>
              {profileData.displayName}
            </span>
          </h1>
          
          <p className="hero__role">{t('hero.role')}</p>
          
          <ul className="hero__highlights">
            {dict.hero.highlights.map((highlight: string) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          
          <div className="hero__actions">
            <a className="btn btn--primary" href={mailtoLink}>
              {t('hero.cta_email')}
            </a>
            <a className="btn btn--secondary" href={profileData.linkedin} target="_blank" rel="noreferrer">
              {t('hero.cta_linkedin')}
            </a>
            <a className="btn btn--ghost" href={profileData.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>

        <aside className="hero__panel">
          <div className="hero__avatar-container">
            <img 
              ref={avatarRef}
              src={profileData.avatarUrl} 
              alt={profileData.displayName} 
              className="hero__avatar" 
              loading="eager" 
            />
          </div>
        </aside>
      </div>

      <div className="hero__scroll-indicator">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Scroll down">
          <title>Scroll down</title>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </div>
    </section>
  );
}
