import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AIExpertise } from './AIExpertise';

describe('AIExpertise Section', () => {
  it('renders title and pillars correctly', () => {
    render(<AIExpertise />);
    expect(screen.getByText(/Ingeniería de IA Aplicada/i)).toBeInTheDocument();
    expect(screen.getByText(/Agentic Workflows/i)).toBeInTheDocument();
    expect(screen.getByText(/RAG Empresarial/i)).toBeInTheDocument();
  });
});
