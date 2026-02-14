import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProjectsSection } from './ProjectsSection';
import type { UseGithubProjectsResult } from '../hooks/useGithubProjects';

const baseState: UseGithubProjectsResult = {
  projects: [],
  loading: false,
  error: null,
  source: 'github',
  refreshedAt: '2026-02-14T10:00:00Z',
};

describe('ProjectsSection', () => {
  it('mostra skeleton quando loading=true', () => {
    const { container } = render(<ProjectsSection {...baseState} loading />);

    expect(container.querySelectorAll('.skeleton--title')).toHaveLength(4);
  });

  it('renderiza projetos quando há dados', () => {
    render(
      <ProjectsSection
        {...baseState}
        projects={[
          {
            id: 'agua-viva-oop',
            name: 'agua-viva-oop',
            description: 'Projeto principal',
            language: 'Java',
            updatedAt: '2026-02-13T22:01:51Z',
            repoUrl: 'https://github.com/jotavsevla/agua-viva-oop',
            source: 'github',
          },
        ]}
      />,
    );

    expect(screen.getByRole('heading', { name: 'agua-viva-oop' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Repositório' })).toHaveAttribute('href', 'https://github.com/jotavsevla/agua-viva-oop');
  });

  it('exibe banner de fallback quando source=fallback', () => {
    render(<ProjectsSection {...baseState} source="fallback" />);

    expect(screen.getByText(/Modo fallback ativo/i)).toBeInTheDocument();
  });

  it('exibe mensagem de erro quando error existe', () => {
    render(<ProjectsSection {...baseState} error="erro de rede" />);

    expect(screen.getByText('erro de rede')).toBeInTheDocument();
  });
});
