import type { GithubRepo, GithubUser, ProjectCardModel } from '../types/github';

export const GITHUB_USERNAME = 'jotavsevla';
const API_BASE_URL = 'https://api.github.com';
const JSON_HEADERS = {
  Accept: 'application/vnd.github+json',
};

export const DEFAULT_REPO_DESCRIPTION = '';

function toErrorMessage(response: Response, lang: string): string {
  if (response.status === 403) {
    return lang === 'pt' ? 'Limite da API do GitHub atingido no momento.' : 'GitHub API rate limit reached.';
  }

  if (response.status === 404) {
    return lang === 'pt' ? 'Perfil do GitHub não encontrado.' : 'GitHub profile not found.';
  }

  return lang === 'pt'
    ? `Falha ao consultar GitHub (${response.status}).`
    : `GitHub request failed (${response.status}).`;
}

async function fetchJson<T>(url: string, signal?: AbortSignal, lang: string = 'pt'): Promise<T> {
  const response = await fetch(url, {
    headers: JSON_HEADERS,
    signal,
  });

  if (!response.ok) {
    throw new Error(toErrorMessage(response, lang));
  }

  return (await response.json()) as T;
}

export async function fetchGithubUser(signal?: AbortSignal, lang: string = 'pt'): Promise<GithubUser> {
  return fetchJson<GithubUser>(`${API_BASE_URL}/users/${GITHUB_USERNAME}`, signal, lang);
}

export async function fetchGithubRepos(signal?: AbortSignal, lang: string = 'pt'): Promise<GithubRepo[]> {
  return fetchJson<GithubRepo[]>(
    `${API_BASE_URL}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
    signal,
    lang,
  );
}

export function selectTopRepositories(repos: GithubRepo[], limit: number = 8): GithubRepo[] {
  return repos
    .filter((repo) => !repo.fork && !repo.archived && repo.name !== GITHUB_USERNAME)
    .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
    .slice(0, limit);
}

export function buildRepositoryDescription(repo: GithubRepo, lang: string = 'pt'): string {
  if (repo.description && repo.description.trim().length > 0) {
    return repo.description.trim();
  }

  const languageLabel = repo.language ?? (lang === 'pt' ? 'stack diversa' : 'diverse stack');
  return lang === 'pt'
    ? `Projeto em ${languageLabel} com foco em implementação prática, organização de código e evolução técnica.`
    : `Project in ${languageLabel} focused on practical implementation, code organization, and technical evolution.`;
}

export function mapRepoToProject(repo: GithubRepo, source: ProjectCardModel['source'] = 'github', lang: string = 'pt'): ProjectCardModel {
  return {
    id: repo.name,
    name: repo.name,
    description: buildRepositoryDescription(repo, lang) || (lang === 'pt'
      ? 'Projeto técnico com foco em backend, fundamentos de software e evolução contínua de qualidade.'
      : 'Technical project focused on backend, software fundamentals, and continuous quality evolution.'),
    language: repo.language ?? (lang === 'pt' ? 'Não definido' : 'Not defined'),
    updatedAt: repo.updated_at,
    repoUrl: repo.html_url,
    source,
  };
}

export function buildProjectsFromRepos(repos: GithubRepo[], limit: number = 8, lang: string = 'pt'): ProjectCardModel[] {
  return selectTopRepositories(repos, limit).map((repo) => mapRepoToProject(repo, 'github', lang));
}

export function formatDate(isoDate: string, lang: string = 'pt'): string {
  const parsedDate = new Date(isoDate);
  if (Number.isNaN(parsedDate.getTime())) {
    return lang === 'pt' ? 'data inválida' : 'invalid date';
  }

  return new Intl.DateTimeFormat(lang === 'pt' ? 'pt-BR' : 'en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(parsedDate);
}
