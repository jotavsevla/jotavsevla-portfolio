import type { GithubRepo, GithubUser, ProjectCardModel } from '../types/github';

export const GITHUB_USERNAME = 'jotavsevla';
const API_BASE_URL = 'https://api.github.com';
const JSON_HEADERS = {
  Accept: 'application/vnd.github+json',
};

export const DEFAULT_REPO_DESCRIPTION =
  'Projeto técnico com foco em backend, fundamentos de software e evolução contínua de qualidade.';

function toErrorMessage(response: Response): string {
  if (response.status === 403) {
    return 'Limite da API do GitHub atingido no momento.';
  }

  if (response.status === 404) {
    return 'Perfil do GitHub não encontrado.';
  }

  return `Falha ao consultar GitHub (${response.status}).`;
}

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, {
    headers: JSON_HEADERS,
    signal,
  });

  if (!response.ok) {
    throw new Error(toErrorMessage(response));
  }

  return (await response.json()) as T;
}

export async function fetchGithubUser(signal?: AbortSignal): Promise<GithubUser> {
  return fetchJson<GithubUser>(`${API_BASE_URL}/users/${GITHUB_USERNAME}`, signal);
}

export async function fetchGithubRepos(signal?: AbortSignal): Promise<GithubRepo[]> {
  return fetchJson<GithubRepo[]>(
    `${API_BASE_URL}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
    signal,
  );
}

export function selectTopRepositories(repos: GithubRepo[], limit: number = 8): GithubRepo[] {
  return repos
    .filter((repo) => !repo.fork && !repo.archived && repo.name !== GITHUB_USERNAME)
    .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
    .slice(0, limit);
}

export function buildRepositoryDescription(repo: GithubRepo): string {
  if (repo.description && repo.description.trim().length > 0) {
    return repo.description.trim();
  }

  const languageLabel = repo.language ? repo.language : 'stack diversa';
  return `Projeto em ${languageLabel} com foco em implementação prática, organização de código e evolução técnica.`;
}

export function mapRepoToProject(repo: GithubRepo, source: ProjectCardModel['source'] = 'github'): ProjectCardModel {
  return {
    id: repo.name,
    name: repo.name,
    description: buildRepositoryDescription(repo) || DEFAULT_REPO_DESCRIPTION,
    language: repo.language ?? 'Não definido',
    updatedAt: repo.updated_at,
    repoUrl: repo.html_url,
    source,
  };
}

export function buildProjectsFromRepos(repos: GithubRepo[], limit: number = 8): ProjectCardModel[] {
  return selectTopRepositories(repos, limit).map((repo) => mapRepoToProject(repo, 'github'));
}

export function formatDatePtBr(isoDate: string): string {
  const parsedDate = new Date(isoDate);
  if (Number.isNaN(parsedDate.getTime())) {
    return 'data inválida';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(parsedDate);
}
