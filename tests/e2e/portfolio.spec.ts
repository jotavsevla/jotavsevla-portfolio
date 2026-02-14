import { expect, test } from '@playwright/test';

const githubUserFixture = {
  login: 'jotavsevla',
  name: 'João Victor Araújo',
  avatar_url: 'https://avatars.githubusercontent.com/u/121209009?v=4',
  bio: 'backend',
  followers: 24,
  following: 56,
  public_repos: 20,
  html_url: 'https://github.com/jotavsevla',
  location: 'Montes Claros - MG',
};

const githubReposFixture = [
  {
    name: 'agua-viva-oop',
    html_url: 'https://github.com/jotavsevla/agua-viva-oop',
    description: 'Sistema logístico Java + PostgreSQL + solver Python.',
    language: 'Java',
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-02-13T22:01:51Z',
    updated_at: '2026-02-13T22:01:51Z',
    fork: false,
    archived: false,
  },
  {
    name: 'tec_heuristica',
    html_url: 'https://github.com/jotavsevla/tec_heuristica',
    description: 'Heurísticas para CVRP',
    language: 'HTML',
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-02-12T00:42:17Z',
    updated_at: '2026-02-12T00:42:17Z',
    fork: false,
    archived: false,
  },
];

test.beforeEach(async ({ page }) => {
  await page.route('https://api.github.com/users/jotavsevla', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(githubUserFixture),
    });
  });

  await page.route('https://api.github.com/users/jotavsevla/repos?per_page=100&sort=updated', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(githubReposFixture),
    });
  });
});

test('renderiza a página, links principais e troca tema com persistência', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /Backend técnico/i })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Enviar e-mail' }).first()).toHaveAttribute('href', /mailto:/);
  await expect(page.getByRole('link', { name: 'Ver CV' })).toHaveAttribute('href', '/cv/JoaoCV.pdf');

  await expect(page.getByRole('heading', { name: 'agua-viva-oop' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Repositório' }).first()).toHaveAttribute(
    'href',
    'https://github.com/jotavsevla/agua-viva-oop',
  );
  await page.locator('.project-card').first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  await expect(
    page.locator('.project-card').first().evaluate((element) => getComputedStyle(element).opacity),
  ).resolves.not.toBe('0');

  const initialTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  await page.getByRole('button', { name: /alternar tema/i }).click();

  const toggledTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  expect(toggledTheme).not.toBe(initialTheme);

  await page.reload();

  await expect.poll(() => page.evaluate(() => document.documentElement.getAttribute('data-theme'))).toBe(toggledTheme);
});
