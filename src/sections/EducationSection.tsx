import { useRef } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { education, languages } from '../data/profile';
import { useLanguage } from '../i18n/context';
import { gsap, useGSAP } from '../hooks/useGsap';

export function EducationSection() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      gsap.from('.edu-tag', {
        opacity: 0,
        scale: 0.8,
        stagger: 0.07,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });

      gsap.from('.lang-bar__fill', {
        width: '0%',
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      });
    },
    { scope: containerRef }
  );

  const getLevelPercent = (level: string): number => {
    const lower = level.toLowerCase();
    if (lower === 'nativo' || lower === 'native') return 100;
    if (lower === 'intermediário' || lower === 'intermediate') return 60;
    if (lower === 'básico' || lower === 'basic') return 30;
    return 50;
  };

  const langEyebrow = t('education.lang_eyebrow');
  const langTitle = t('education.lang_title');

  return (
    <section id="formacao" className="section" ref={containerRef}>
      <div className="edu-grid">
        <article className="edu-card" data-reveal>
          <SectionHeading 
            eyebrow={t('education.eyebrow')} 
            title={t('education.title')} 
          />
          
          <h3 className="edu-card__course">{education.course}</h3>
          
          <div className="edu-card__meta">
            <span className="edu-badge">{education.institution}</span>
            <span className="edu-badge">{education.period}</span>
          </div>

          <div className="edu-card__subjects">
            <p className="edu-card__subjects-label">{t('education.subjects_label')}</p>
            <div className="edu-card__tags">
              {education.subjects.map((subject) => (
                <span key={subject} className="edu-tag">
                  {subject}
                </span>
              ))}
            </div>
          </div>
        </article>

        <article className="lang-card" data-reveal>
          <SectionHeading 
            eyebrow={langEyebrow}
            title={langTitle}
          />
          
          {languages.map((language) => (
            <div className="lang-row" key={language.name}>
              <div className="lang-row__header">
                <span className="lang-row__name">{language.name}</span>
                <span className="lang-row__level">{language.level}</span>
              </div>
              <div className="lang-bar">
                <div 
                  className="lang-bar__fill" 
                  style={{ width: `${getLevelPercent(language.level)}%` }} 
                />
              </div>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}
