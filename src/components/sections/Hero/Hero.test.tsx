import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Hero } from './Hero';

describe('Hero Section', () => {
  it('renders correctly with headline and subtext', () => {
    render(<Hero />);
    expect(screen.getByText(/Arquitecto de Software/i)).toBeInTheDocument();
    expect(screen.getByText(/Especialista en IA/i)).toBeInTheDocument();
    expect(screen.getByText(/Diseño sistemas escalables/i)).toBeInTheDocument();
  });

  it('renders call to action buttons', () => {
    render(<Hero />);
    const ctaPrimary = screen.getByText(/Agendar Reunión Técnica/i);
    const ctaSecondary = screen.getByText(/Ver Casos de Estudio/i);
    expect(ctaPrimary).toBeInTheDocument();
    expect(ctaSecondary).toBeInTheDocument();
  });
});
