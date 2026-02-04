import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './Input';

describe('Input Component', () => {
  it('renders correctly', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('handles change events', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    fireEvent.change(input, { target: { value: 'Hello' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('applies error class when error prop is true', () => {
    render(<Input error data-testid="error-input" />);
    expect(screen.getByTestId('error-input').className).toContain('error');
  });

  it('handles missing className gracefully', () => {
    render(<Input data-testid="no-class-input" />);
    expect(screen.getByTestId('no-class-input').className).toBeDefined();
  });
});
