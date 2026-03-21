import { formatDate } from '../lib/github';
import { useLanguage } from '../i18n/context';
import type { ProjectCardModel } from '../types/github';

interface ProjectCardProps {
  project: ProjectCardModel;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Java: '#b07219',
  Python: '#3572A5',
  Go: '#00ADD8',
  Rust: '#dea584',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  Ruby: '#701516',
  PHP: '#701516',
  Dart: '#00ADD8',
  Swift: '#00539C',
  Kotlin: '#A97BFF',
  Shell: '#89e051',
};

export function ProjectCard({ project }: ProjectCardProps) {
  const { t, lang } = useLanguage();
  const langColor = project.language ? (LANGUAGE_COLORS[project.language] || '#a8a3c0') : '#a8a3c0';

  return (
    <article className="project-card">
      <div className="project-card__top">
        <h3>{project.name}</h3>
        {project.language && (
          <span className="project-card__language">
            <span 
              className="project-card__language-dot" 
              style={{ backgroundColor: langColor }} 
              aria-hidden="true" 
            />
            {project.language}
          </span>
        )}
      </div>
      <p>{project.description}</p>
      <div className="project-card__footer">
        <span>{t('projects.last_updated')} {formatDate(project.updatedAt, lang)}</span>
        <a href={project.repoUrl} target="_blank" rel="noreferrer">
          {t('projects.view_github')}
        </a>
      </div>
    </article>
  );
}