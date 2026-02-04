import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TechStack } from './TechStack';
import { techStack } from '@/data/tech-stack';

describe('TechStack Section', () => {
  it('renders all categories from data', () => {
    render(<TechStack />);
    techStack.forEach(cat => {
      expect(screen.getByText(cat.title)).toBeInTheDocument();
    });
  });

  it('renders tech items', () => {
    render(<TechStack />);
    // Check one item from each category
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('LangChain / LangGraph')).toBeInTheDocument();
    expect(screen.getByText('Next.js 15')).toBeInTheDocument();
  });
});
