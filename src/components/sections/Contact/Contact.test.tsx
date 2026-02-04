import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Contact } from './Contact';

describe('Contact Section', () => {
  it('renders header and qualification form', () => {
    render(<Contact />);
    expect(screen.getByText(/¿Listo para Escalar tu Arquitectura?/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
  });
});
