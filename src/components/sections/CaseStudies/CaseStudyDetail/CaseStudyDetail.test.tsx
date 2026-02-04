import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CaseStudyDetail } from './CaseStudyDetail';
import { caseStudies } from '@/data/case-studies';

describe('CaseStudyDetail Component', () => {
  it('renders all sections of a case study', () => {
    const study = caseStudies[0];
    render(<CaseStudyDetail study={study} />);
    
    expect(screen.getByText(study.title)).toBeInTheDocument();
    expect(screen.getByText(study.technicalChallenge.description)).toBeInTheDocument();
    
    study.decisions.forEach(d => {
      expect(screen.getByText(d.title, { exact: false })).toBeInTheDocument();
    });

    study.metrics.forEach(m => {
      expect(screen.getByText(m.label)).toBeInTheDocument();
    });
  });

  it('renders CTAs', () => {
    render(<CaseStudyDetail study={caseStudies[0]} />);
    expect(screen.getByText(/Agendar Reunión Técnica/i)).toBeInTheDocument();
    expect(screen.getByText(/Volver a Casos/i)).toBeInTheDocument();
  });
});
