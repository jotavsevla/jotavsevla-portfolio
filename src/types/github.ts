export type Theme = 'dark' | 'light';

export interface GithubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
  location: string | null;
}

export interface GithubRepo {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  updated_at: string;
  fork: boolean;
  archived: boolean;
}

export type ProjectSource = 'github' | 'fallback';

export interface ProjectCardModel {
  id: string;
  name: string;
  description: string;
  language: string;
  updatedAt: string;
  repoUrl: string;
  source: ProjectSource;
}

export interface PortfolioCache {
  timestamp: number;
  user: GithubUser;
  repos: GithubRepo[];
}
