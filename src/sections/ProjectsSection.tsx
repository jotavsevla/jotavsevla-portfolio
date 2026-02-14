import { ProjectCard } from '../components/ProjectCard';
import { SectionHeading } from '../components/SectionHeading';
import type { UseGithubProjectsResult } from '../hooks/useGithubProjects';

function formatRefreshedAt(refreshedAt: string | null): string {
  if (!refreshedAt) {
    return 'sem atualização recente';
  }

  const parsed = new Date(refreshedAt);
  if (Number.isNaN(parsed.getTime())) {
    return 'sem atualização recente';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(parsed);
}

export function ProjectsSection({ projects, loading, error, source, refreshedAt }: UseGithubProjectsResult) {
  return (
    <section id="projetos" className="section">
      <SectionHeading
        eyebrow="Projetos"
        title="Repositórios em destaque"
        description="Lista automática do GitHub com foco em projetos técnicos relevantes para backend e fundamentos de engenharia."
      />

      {source === 'fallback' ? (
        <div className="status-banner status-banner--warning" role="status" data-reveal>
          Modo fallback ativo: exibindo projetos locais por indisponibilidade temporária da API do GitHub.
        </div>
      ) : null}

      {error ? (
        <div className="status-banner status-banner--info" role="status" data-reveal>
          {error}
        </div>
      ) : null}

      <p className="projects-refresh" data-reveal>
        Última atualização: {formatRefreshedAt(refreshedAt)}
      </p>

      {loading ? (
        <div className="projects-grid" aria-live="polite">
          {Array.from({ length: 4 }).map((_, index) => (
            <article className="project-card project-card--skeleton" key={`skeleton-${index}`}>
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
        <div className="empty-state" data-reveal>
          Nenhum projeto disponível no momento.
        </div>
      ) : null}
    </section>
  );
}
