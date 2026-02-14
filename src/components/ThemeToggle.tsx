import type { Theme } from '../types/github';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDarkTheme = theme === 'dark';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label="Alternar tema"
      title="Alternar tema"
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {isDarkTheme ? '☀︎' : '☾'}
      </span>
      <span className="theme-toggle__label">{isDarkTheme ? 'Light' : 'Dark'}</span>
    </button>
  );
}
