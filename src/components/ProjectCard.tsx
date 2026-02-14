import { formatDatePtBr } from '../lib/github';
import type { ProjectCardModel } from '../types/github';

interface ProjectCardProps {
  project: ProjectCardModel;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card" data-reveal>
      <div className="project-card__top">
        <h3>{project.name}</h3>
        <span className="project-card__language">{project.language}</span>
      </div>
      <p>{project.description}</p>
      <div className="project-card__footer">
        <span>Atualizado em {formatDatePtBr(project.updatedAt)}</span>
        <a href={project.repoUrl} target="_blank" rel="noreferrer">
          Repositório
        </a>
      </div>
    </article>
  );
}
