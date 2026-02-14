import { describe, expect, it } from 'vitest';
import { CACHE_KEY, CACHE_TTL_MS, isCacheFresh, readPortfolioCache, writePortfolioCache } from './cache';
import type { PortfolioCache } from '../types/github';

const mockCache: PortfolioCache = {
  timestamp: Date.now(),
  user: {
    login: 'jotavsevla',
    name: 'João',
    avatar_url: 'https://avatars.githubusercontent.com/u/121209009?v=4',
    bio: 'backend',
    followers: 20,
    following: 10,
    public_repos: 20,
    html_url: 'https://github.com/jotavsevla',
    location: 'Montes Claros - MG',
  },
  repos: [],
};

describe('cache helpers', () => {
  it('persiste e lê cache no localStorage', () => {
    writePortfolioCache(mockCache);

    const loaded = readPortfolioCache();
    expect(loaded).toEqual(mockCache);
    expect(window.localStorage.getItem(CACHE_KEY)).not.toBeNull();
  });

  it('considera cache fresco dentro da janela de 6 horas', () => {
    const now = Date.now();
    const fresh = { ...mockCache, timestamp: now - CACHE_TTL_MS + 1 };

    expect(isCacheFresh(fresh, now)).toBe(true);
  });

  it('considera cache expirado após a janela de 6 horas', () => {
    const now = Date.now();
    const stale = { ...mockCache, timestamp: now - CACHE_TTL_MS - 1 };

    expect(isCacheFresh(stale, now)).toBe(false);
  });
});
