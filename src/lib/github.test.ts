import { describe, expect, it } from 'vitest';
import {
  buildProjectsFromRepos,
  buildRepositoryDescription,
  mapRepoToProject,
  selectTopRepositories,
} from './github';
import type { GithubRepo } from '../types/github';

const baseRepo: GithubRepo = {
  name: 'repo-base',
  html_url: 'https://github.com/jotavsevla/repo-base',
  description: 'Descrição',
  language: 'TypeScript',
  stargazers_count: 0,
  forks_count: 0,
  pushed_at: '2026-02-10T10:00:00Z',
  updated_at: '2026-02-10T10:00:00Z',
  fork: false,
  archived: false,
};

describe('github mapping', () => {
  it('filtra forks/arquivados/repo de perfil e ordena por pushed_at desc', () => {
    const repos: GithubRepo[] = [
      { ...baseRepo, name: 'jotavsevla', pushed_at: '2026-02-14T10:00:00Z' },
      { ...baseRepo, name: 'repo-antigo', pushed_at: '2026-01-01T10:00:00Z' },
      { ...baseRepo, name: 'repo-top', pushed_at: '2026-02-13T10:00:00Z' },
      { ...baseRepo, name: 'repo-fork', fork: true, pushed_at: '2026-02-12T10:00:00Z' },
      { ...baseRepo, name: 'repo-archived', archived: true, pushed_at: '2026-02-11T10:00:00Z' },
    ];

    const selected = selectTopRepositories(repos, 8);

    expect(selected.map((repo) => repo.name)).toEqual(['repo-top', 'repo-antigo']);
  });

  it('gera descrição padrão quando descrição do repo está vazia', () => {
    const repoWithoutDescription: GithubRepo = {
      ...baseRepo,
      description: null,
      language: 'Java',
    };

    expect(buildRepositoryDescription(repoWithoutDescription)).toContain('Projeto em Java');
  });

  it('normaliza projeto para card com campos esperados', () => {
    const mappedProject = mapRepoToProject(baseRepo);

    expect(mappedProject).toMatchObject({
      id: 'repo-base',
      name: 'repo-base',
      language: 'TypeScript',
      repoUrl: 'https://github.com/jotavsevla/repo-base',
      source: 'github',
    });
  });

  it('constrói lista final de projetos já limitada para o top definido', () => {
    const repos: GithubRepo[] = [
      { ...baseRepo, name: 'repo-1', pushed_at: '2026-02-10T10:00:00Z' },
      { ...baseRepo, name: 'repo-2', pushed_at: '2026-02-11T10:00:00Z' },
      { ...baseRepo, name: 'repo-3', pushed_at: '2026-02-12T10:00:00Z' },
    ];

    const projects = buildProjectsFromRepos(repos, 2);

    expect(projects).toHaveLength(2);
    expect(projects[0].name).toBe('repo-3');
    expect(projects[1].name).toBe('repo-2');
  });
});
