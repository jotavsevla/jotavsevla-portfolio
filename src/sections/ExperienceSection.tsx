import { useRef } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { experiences } from '../data/profile';
import { useLanguage } from '../i18n/context';
import { gsap, useGSAP } from '../hooks/useGsap';

export function ExperienceSection() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.from('.timeline-card', {
      opacity: 0,
      x: -60,
      stagger: 0.2,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
    });

    gsap.from('.timeline-card li', {
      opacity: 0,
      x: -20,
      stagger: 0.08,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
      },
    });
  }, { scope: containerRef });

  return (
    <section id="experiencia" className="section" ref={containerRef}>
      <SectionHeading
        eyebrow={t('experience.eyebrow')}
        title={t('experience.title')}
        description={t('experience.description')}
      />

      <div className="timeline">
        {experiences.map((experience) => (
          <div className="timeline-entry" key={experience.role}>
            <div className="timeline-node"></div>
            <article className="timeline-card">
              <div className="timeline-card__header">
                <h3>{experience.role}</h3>
                <div className="timeline-card__meta">
                  <span className="timeline-card__period">{experience.period}</span>
                  <span className="timeline-card__location">• {experience.location}</span>
                </div>
              </div>
              <ul>
                {experience.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
