import { describe, expect, it } from 'vitest';
import { resolveProjectsOnFailure } from './useGithubProjects';
import type { PortfolioCache } from '../types/github';

const cacheWithRepos: PortfolioCache = {
  timestamp: 1700000000000,
  user: {
    login: 'jotavsevla',
    name: 'João Victor',
    avatar_url: 'https://avatars.githubusercontent.com/u/121209009?v=4',
    bio: 'bio',
    followers: 1,
    following: 1,
    public_repos: 10,
    html_url: 'https://github.com/jotavsevla',
    location: 'Montes Claros - MG',
  },
  repos: [
    {
      name: 'agua-viva-oop',
      html_url: 'https://github.com/jotavsevla/agua-viva-oop',
      description: 'Projeto principal',
      language: 'Java',
      stargazers_count: 0,
      forks_count: 0,
      pushed_at: '2026-02-13T22:01:51Z',
      updated_at: '2026-02-13T22:01:51Z',
      fork: false,
      archived: false,
    },
  ],
};

describe('fallback strategy', () => {
  it('usa cache quando falha de API e cache existe', () => {
    const result = resolveProjectsOnFailure(cacheWithRepos);

    expect(result.source).toBe('github');
    expect(result.projects).toHaveLength(1);
    expect(result.error).toContain('dados salvos em cache');
  });

  it('usa fallback local quando não há cache', () => {
    const result = resolveProjectsOnFailure(null);

    expect(result.source).toBe('fallback');
    expect(result.projects.length).toBeGreaterThan(0);
    expect(result.error).toContain('seleção local');
  });
});
