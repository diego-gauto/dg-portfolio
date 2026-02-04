import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Textarea } from './Textarea';

describe('Textarea Component', () => {
  it('renders correctly', () => {
    render(<Textarea placeholder="Enter msg" />);
    expect(screen.getByPlaceholderText('Enter msg')).toBeInTheDocument();
  });

  it('handles change events', () => {
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} placeholder="Enter msg" />);
    const textarea = screen.getByPlaceholderText('Enter msg');
    fireEvent.change(textarea, { target: { value: 'Hello' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('applies error class when error prop is true', () => {
    render(<Textarea error data-testid="error-textarea" />);
    expect(screen.getByTestId('error-textarea').className).toContain('error');
  });

  it('handles missing className gracefully', () => {
    render(<Textarea data-testid="no-class-textarea" />);
    expect(screen.getByTestId('no-class-textarea').className).toBeDefined();
  });
});
