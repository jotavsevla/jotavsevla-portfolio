import { useRef } from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { SectionHeading } from '../components/SectionHeading';
import { useLanguage } from '../i18n/context';
import { gsap, useGSAP } from '../hooks/useGsap';
import type { UseGithubProjectsResult } from '../hooks/useGithubProjects';

function formatRefreshedAt(refreshedAt: string | null, fallbackText: string, lang: string): string {
  if (!refreshedAt) {
    return fallbackText;
  }

  const parsed = new Date(refreshedAt);
  if (Number.isNaN(parsed.getTime())) {
    return fallbackText;
  }

  return new Intl.DateTimeFormat(lang === 'pt' ? 'pt-BR' : 'en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(parsed);
}

export function ProjectsSection({ projects, loading, error, source, refreshedAt }: UseGithubProjectsResult) {
  const { t, lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    
    gsap.from('.project-card', {
      opacity: 0, 
      y: 40, 
      duration: 0.7, 
      stagger: 0.12,
      scrollTrigger: { 
        trigger: containerRef.current, 
        start: 'top 80%' 
      }
    });
  }, { scope: containerRef });

  return (
    <div className="section" ref={containerRef}>
      <SectionHeading
        eyebrow={t('projects.eyebrow')}
        title={t('projects.title')}
        description={t('projects.description')}
      />

      {source === 'fallback' ? (
        <div className="status-banner status-banner--warning" role="status">
          {t('projects.fallback_warning')}
        </div>
      ) : null}

      {error ? (
        <div className="status-banner status-banner--info" role="status">
          {t(error)}
        </div>
      ) : null}

      <p className="projects-refresh">
        {t('projects.last_updated')}: {formatRefreshedAt(refreshedAt, t('projects.no_recent'), lang)}
      </p>

      {loading ? (
        <div className="projects-grid" aria-live="polite">
          {[1, 2, 3, 4].map((skeletonId) => (
            <article className="project-card project-card--skeleton" key={skeletonId}>
              <div className="skeleton skeleton--title" />
              <div className="skeleton skeleton--line" />
              <div className="skeleton skeleton--line" />
              <div className="skeleton skeleton--line short" />
            </article>
          ))}
        </div>
      ) : null}

      {!loading && projects.length > 0 ? (
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      ) : null}

      {!loading && projects.length === 0 ? (
        <div className="empty-state">
          {t('projects.empty')}
        </div>
      ) : null}
    </div>
  );
}