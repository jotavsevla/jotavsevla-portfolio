import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { useTheme } from '../hooks/useTheme';
import { ThemeToggle } from './ThemeToggle';

function Harness() {
  const { theme, toggleTheme } = useTheme();
  return <ThemeToggle theme={theme} onToggle={toggleTheme} />;
}

describe('ThemeToggle', () => {
  it('altera data-theme ao clicar no botão', async () => {
    const user = userEvent.setup();
    render(<Harness />);

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    await user.click(screen.getByRole('button', { name: /alternar tema/i }));

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });
});
