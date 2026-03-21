import { useRef } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { profileData } from '../data/profile';
import { useLanguage } from '../i18n/context';
import { gsap, useGSAP } from '../hooks/useGsap';

export function ContactSection() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const mailtoLink = `mailto:${profileData.email}?subject=${encodeURIComponent(t('contact.email_subject'))}`;

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      gsap.from('.contact__heading', {
        opacity: 0,
        y: 30,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });

      gsap.from('.contact__actions .btn', {
        opacity: 0,
        y: 20,
        stagger: 0.12,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="contato" className="section contact-section" ref={containerRef}>
      <div className="contact__orb" aria-hidden="true" />
      <div className="contact__inner">
        <div className="contact__heading">
          <SectionHeading
            eyebrow={t('contact.eyebrow')}
            title={t('contact.title')}
            description={t('contact.description')}
          />
        </div>
        
        <p className="contact__email">{profileData.email}</p>
        
        <div className="contact__actions">
          <a
            className="btn btn--primary btn--glow"
            href={mailtoLink}
          >
            {t('contact.cta_email')}
          </a>
          <a
            className="btn btn--secondary btn--glow"
            href={profileData.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="btn btn--ghost btn--glow"
            href={profileData.github}
            target="_blank"
            rel="noreferrer"
          >
            {t('contact.cta_github')}
          </a>
          <a
            className="btn btn--ghost btn--glow"
            href="/cv/JoaoCV.pdf"
            target="_blank"
            rel="noreferrer"
          >
            {t('contact.cta_cv')}
          </a>
        </div>
      </div>
    </section>
  );
}
