import { useEffect, useState } from 'react';
import { fallbackProjects } from '../data/fallbackProjects';
import { isCacheFresh, readPortfolioCache, writePortfolioCache } from '../lib/cache';
import { buildProjectsFromRepos, fetchGithubRepos, fetchGithubUser } from '../lib/github';
import type { PortfolioCache, ProjectCardModel, ProjectSource } from '../types/github';
import { useLanguage } from '../i18n/context';

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

export function resolveProjectsOnFailure(cacheData: PortfolioCache | null, lang: string = 'pt'): FailureResolution {
  if (cacheData && cacheData.repos.length > 0) {
    return {
      projects: buildProjectsFromRepos(cacheData.repos, 8, lang),
      source: 'github',
      error: 'projects.error_cache',
      refreshedAt: new Date(cacheData.timestamp).toISOString(),
    };
  }

  return {
    projects: fallbackProjects,
    source: 'fallback',
    error: 'projects.error_fallback',
    refreshedAt: null,
  };
}

export function useGithubProjects(): UseGithubProjectsResult {
  const [projects, setProjects] = useState<ProjectCardModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<ProjectSource>('github');
  const [refreshedAt, setRefreshedAt] = useState<string | null>(null);
  const { lang } = useLanguage();

  useEffect(() => {
    const abortController = new AbortController();

    const initialCache = readPortfolioCache();
    const freshCache = isCacheFresh(initialCache) ? initialCache : null;

    if (freshCache && freshCache.repos.length > 0) {
      setProjects(buildProjectsFromRepos(freshCache.repos, 8, lang));
      setSource('github');
      setRefreshedAt(new Date(freshCache.timestamp).toISOString());
      setLoading(false);
    }

    const fetchData = async () => {
      try {
        const [user, repos] = await Promise.all([
          fetchGithubUser(abortController.signal, lang),
          fetchGithubRepos(abortController.signal, lang),
        ]);

        const now = Date.now();
        writePortfolioCache({
          timestamp: now,
          user,
          repos,
        });

        setProjects(buildProjectsFromRepos(repos, 8, lang));
        setError(null);
        setSource('github');
        setRefreshedAt(new Date(now).toISOString());
      } catch (fetchError) {
        if (abortController.signal.aborted) {
          return;
        }

        const resolvedFailure = resolveProjectsOnFailure(freshCache ?? initialCache, lang);
        setProjects(resolvedFailure.projects);
        setSource(resolvedFailure.source);
        setRefreshedAt(resolvedFailure.refreshedAt);
        setError(fetchError instanceof Error ? resolvedFailure.error : 'projects.error_unexpected');
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
  }, [lang]);

  return {
    projects,
    loading,
    error,
    source,
    refreshedAt,
  };
}
