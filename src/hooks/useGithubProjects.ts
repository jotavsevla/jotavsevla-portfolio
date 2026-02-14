import { useEffect, useState } from 'react';
import { fallbackProjects } from '../data/fallbackProjects';
import { isCacheFresh, readPortfolioCache, writePortfolioCache } from '../lib/cache';
import { buildProjectsFromRepos, fetchGithubRepos, fetchGithubUser } from '../lib/github';
import type { PortfolioCache, ProjectCardModel, ProjectSource } from '../types/github';

export interface UseGithubProjectsResult {
  projects: ProjectCardModel[];
  loading: boolean;
  error: string | null;
  source: ProjectSource;
  refreshedAt: string | null;
}

export interface FailureResolution {
  projects: ProjectCardModel[];
  source: ProjectSource;
  error: string;
  refreshedAt: string | null;
}

export function resolveProjectsOnFailure(cacheData: PortfolioCache | null): FailureResolution {
  if (cacheData && cacheData.repos.length > 0) {
    return {
      projects: buildProjectsFromRepos(cacheData.repos),
      source: 'github',
      error: 'GitHub indisponível no momento. Exibindo dados salvos em cache.',
      refreshedAt: new Date(cacheData.timestamp).toISOString(),
    };
  }

  return {
    projects: fallbackProjects,
    source: 'fallback',
    error: 'GitHub indisponível no momento. Exibindo seleção local de projetos.',
    refreshedAt: null,
  };
}

export function useGithubProjects(): UseGithubProjectsResult {
  const [projects, setProjects] = useState<ProjectCardModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<ProjectSource>('github');
  const [refreshedAt, setRefreshedAt] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const initialCache = readPortfolioCache();
    const freshCache = isCacheFresh(initialCache) ? initialCache : null;

    if (freshCache && freshCache.repos.length > 0) {
      setProjects(buildProjectsFromRepos(freshCache.repos));
      setSource('github');
      setRefreshedAt(new Date(freshCache.timestamp).toISOString());
      setLoading(false);
    }

    const fetchData = async () => {
      try {
        const [user, repos] = await Promise.all([
          fetchGithubUser(abortController.signal),
          fetchGithubRepos(abortController.signal),
        ]);

        const now = Date.now();
        writePortfolioCache({
          timestamp: now,
          user,
          repos,
        });

        setProjects(buildProjectsFromRepos(repos));
        setError(null);
        setSource('github');
        setRefreshedAt(new Date(now).toISOString());
      } catch (fetchError) {
        if (abortController.signal.aborted) {
          return;
        }

        const resolvedFailure = resolveProjectsOnFailure(freshCache ?? initialCache);
        setProjects(resolvedFailure.projects);
        setSource(resolvedFailure.source);
        setRefreshedAt(resolvedFailure.refreshedAt);
        setError(fetchError instanceof Error ? resolvedFailure.error : 'Erro inesperado ao carregar projetos.');
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void fetchData();

    return () => {
      abortController.abort();
    };
  }, []);

  return {
    projects,
    loading,
    error,
    source,
    refreshedAt,
  };
}
