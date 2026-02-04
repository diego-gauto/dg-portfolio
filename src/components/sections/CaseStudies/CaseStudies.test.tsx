import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CaseStudies } from './CaseStudies';
import { CaseStudyCard } from './CaseStudyCard/CaseStudyCard';
import { caseStudies } from '@/data/case-studies';

describe('CaseStudies Module', () => {
  it('renders CaseStudies section title', () => {
    render(<CaseStudies />);
    expect(screen.getByText(/Casos de Estudio/i)).toBeInTheDocument();
  });

  it('renders a CaseStudyCard with data', () => {
    const study = caseStudies[0];
    render(<CaseStudyCard study={study} />);
    expect(screen.getByText(study.title)).toBeInTheDocument();
    expect(screen.getByText(study.summary)).toBeInTheDocument();
    study.metrics.forEach(m => {
       expect(screen.getByText(m.label)).toBeInTheDocument();
    });
  });
});
