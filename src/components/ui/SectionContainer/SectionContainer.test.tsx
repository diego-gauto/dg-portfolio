import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SectionContainer } from './SectionContainer';

describe('SectionContainer Component', () => {
  it('renders children correctly', () => {
    render(<SectionContainer>Content</SectionContainer>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies id correctly', () => {
    render(<SectionContainer id="test-id">Content</SectionContainer>);
    expect(document.getElementById('test-id')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<SectionContainer className="custom-section">Content</SectionContainer>);
    const section = screen.getByText('Content').closest('section');
    expect(section?.className).toContain('custom-section');
  });

  it('handles missing className and id gracefully', () => {
    render(<SectionContainer>No Extras</SectionContainer>);
    const section = screen.getByText('No Extras').closest('section');
    expect(section).toBeInTheDocument();
  });
});
