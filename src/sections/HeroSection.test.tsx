import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HeroSection } from './HeroSection';

describe('HeroSection', () => {
  it('renderiza CTAs principais de conversão', () => {
    render(<HeroSection />);

    expect(screen.getByRole('link', { name: 'Enviar e-mail' })).toHaveAttribute('href', expect.stringContaining('mailto:'));

    const linkedinLinks = screen.getAllByRole('link', { name: 'LinkedIn' });
    expect(linkedinLinks[0]).toHaveAttribute('href', expect.stringContaining('linkedin.com'));

    expect(screen.getByRole('link', { name: 'Ver CV' })).toHaveAttribute('href', '/cv/JoaoCV.pdf');
  });
});
