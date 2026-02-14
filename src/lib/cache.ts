import type { PortfolioCache } from '../types/github';

export const CACHE_KEY = 'portfolio_cache_v1';
export const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

export function readPortfolioCache(): PortfolioCache | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(CACHE_KEY);
    if (!rawValue) {
      return null;
    }

    const parsed = JSON.parse(rawValue) as PortfolioCache;
    if (!parsed || typeof parsed.timestamp !== 'number' || !Array.isArray(parsed.repos) || !parsed.user) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function writePortfolioCache(cacheData: PortfolioCache): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
}

export function isCacheFresh(cacheData: PortfolioCache | null, now: number = Date.now()): boolean {
  if (!cacheData) {
    return false;
  }

  return now - cacheData.timestamp <= CACHE_TTL_MS;
}
