import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { QualificationForm } from './QualificationForm';

describe('QualificationForm Component', () => {
  it('renders initial form correctly', () => {
    render(<QualificationForm />);
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Corporativo')).toBeInTheDocument();
    expect(screen.getByLabelText('Empresa')).toBeInTheDocument();
    expect(screen.getByLabelText('Presupuesto Estimado')).toBeInTheDocument();
    expect(screen.getByLabelText('Desafío Técnico Principal')).toBeInTheDocument();
  });

  it('updates form fields on change', () => {
    render(<QualificationForm />);
    const nameInput = screen.getByLabelText('Nombre') as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'Diego', name: 'name' } });
    expect(nameInput.value).toBe('Diego');
  });

  it('handles qualified lead submission', async () => {
    render(<QualificationForm />);
    
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Diego', name: 'name' } });
    fireEvent.change(screen.getByLabelText('Email Corporativo'), { target: { value: 'diego@test.com', name: 'email' } });
    fireEvent.change(screen.getByLabelText('Empresa'), { target: { value: 'Test Corp', name: 'company' } });
    fireEvent.change(screen.getByLabelText('Presupuesto Estimado'), { target: { value: 'high', name: 'budget' } });
    fireEvent.change(screen.getByLabelText('Desafío Técnico Principal'), { target: { value: 'Scaling RAG', name: 'challenge' } });

    fireEvent.click(screen.getByText('Verificar Disponibilidad'));

    expect(screen.getByText('Analizando...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('¡Gracias por tu interés!')).toBeInTheDocument();
      expect(screen.getByText('Agendar Reunión en Calendly')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('handles disqualified lead submission', async () => {
    render(<QualificationForm />);
    
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Diego', name: 'name' } });
    fireEvent.change(screen.getByLabelText('Email Corporativo'), { target: { value: 'diego@test.com', name: 'email' } });
    fireEvent.change(screen.getByLabelText('Empresa'), { target: { value: 'Test Corp', name: 'company' } });
    fireEvent.change(screen.getByLabelText('Presupuesto Estimado'), { target: { value: 'low', name: 'budget' } });
    fireEvent.change(screen.getByLabelText('Desafío Técnico Principal'), { target: { value: 'Small site', name: 'challenge' } });

    fireEvent.click(screen.getByText('Verificar Disponibilidad'));

    await waitFor(() => {
      expect(screen.getByText('Gracias por contactarme')).toBeInTheDocument();
      expect(screen.getByText('Conectar en LinkedIn')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('handles medium budget lead submission', async () => {
    render(<QualificationForm />);
    
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Diego', name: 'name' } });
    fireEvent.change(screen.getByLabelText('Email Corporativo'), { target: { value: 'diego@test.com', name: 'email' } });
    fireEvent.change(screen.getByLabelText('Empresa'), { target: { value: 'Test Corp', name: 'company' } });
    fireEvent.change(screen.getByLabelText('Presupuesto Estimado'), { target: { value: 'medium', name: 'budget' } });
    fireEvent.change(screen.getByLabelText('Desafío Técnico Principal'), { target: { value: 'Testing', name: 'challenge' } });

    fireEvent.click(screen.getByText('Verificar Disponibilidad'));

    await waitFor(() => {
      // With medium budget (5) + challenge (5) = 10, it should be qualified
      expect(screen.getByText('¡Gracias por tu interés!')).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});
