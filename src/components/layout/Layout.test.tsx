import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Navbar } from './Navbar/Navbar';
import { Footer } from './Footer/Footer';

describe('Layout Components', () => {
  it('Navbar renders brand and links', () => {
    render(<Navbar />);
    expect(screen.getByText(/Diego Gauto/i)).toBeInTheDocument();
    expect(screen.getByText(/Casos de Estudio/i)).toBeInTheDocument();
    expect(screen.getByText(/Stack/i)).toBeInTheDocument();
  });

  it('Footer renders copyright and credits', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2026/i)).toBeInTheDocument();
    expect(screen.getByText(/Arquitectura de Software & IA/i)).toBeInTheDocument();
  });
});
