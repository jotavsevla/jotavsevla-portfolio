import { useRef } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { skillGroups } from '../data/profile';
import { useLanguage } from '../i18n/context';
import { gsap, useGSAP } from '../hooks/useGsap';

export function SkillsSection() {
  const { t, dict } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      gsap.from('.skill-card', {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });
      
      gsap.from('.skill-badge', {
        opacity: 0,
        scale: 0.8,
        stagger: 0.05,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      });
    },
    { scope: containerRef }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    e.currentTarget.style.transform = `perspective(800px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    e.currentTarget.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  const getGroupTitle = (index: number) => {
    switch (index) {
      case 0:
        return dict.skills.groups.stack_principal;
      case 1:
        return dict.skills.groups.quality;
      case 2:
        return dict.skills.groups.fundamentals;
      case 3:
        return dict.skills.groups.learning;
      default:
        return '';
    }
  };

  return (
    <section id="stack" className="section" ref={containerRef}>
      <SectionHeading
        eyebrow={t('skills.eyebrow')}
        title={t('skills.title')}
        description={t('skills.description')}
      />

      <div className="skills-grid">
        {skillGroups.map((group, index) => {
          const isLearning = index === 3;
          
          return (
            <article
              className={`skill-card ${isLearning ? 'skill-card--learning' : ''}`}
              key={group.title}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              data-reveal
            >
              <div className="skill-card__header">
                <h3 className="skill-card__group-title">
                  {getGroupTitle(index)}
                  {isLearning && <span className="skill-card__pulse" aria-hidden="true" />}
                </h3>
              </div>
              <div className="skill-card__items">
                {group.items.map((item) => (
                  <span className="skill-badge" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
