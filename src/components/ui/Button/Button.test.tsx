import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when the disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('applies variant and fullWidth classes correctly', () => {
    const { rerender } = render(<Button variant="outline" fullWidth>Outline</Button>);
    let button = screen.getByRole('button');
    expect(button.className).toContain('outline');
    expect(button.className).toContain('fullWidth');

    rerender(<Button>Default</Button>);
    button = screen.getByRole('button');
    expect(button.className).toContain('primary');
  });

  it('handles custom className', () => {
    render(<Button className="custom-class">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('custom-class');
  });

  it('handles missing className gracefully', () => {
    render(<Button>No Class</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toBeDefined();
  });

  it('forwards additional props', () => {
    render(<Button data-testid="test-btn">Click me</Button>);
    expect(screen.getByTestId('test-btn')).toBeInTheDocument();
  });
});
