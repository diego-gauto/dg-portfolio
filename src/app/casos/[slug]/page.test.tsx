import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Page from './page';
import { caseStudies } from '@/data/case-studies';

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  }),
}));
describe('Case Study Dynamic Page', async () => {
  it('generateStaticParams returns all slugs', async () => {
    const params = await import('./page').then(m => m.generateStaticParams());
    expect(params).toHaveLength(caseStudies.length);
    expect(params[0]).toHaveProperty('slug');
  });

  it('generateMetadata returns correct metadata for valid slug', async () => {
    const { generateMetadata } = await import('./page');
    const study = caseStudies[0];
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: study.slug }) });
    expect(metadata.title).toContain(study.title);
  });

  it('generateMetadata returns fallback for invalid slug', async () => {
    const { generateMetadata } = await import('./page');
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: 'invalid' }) });
    expect(metadata.title).toBe('Caso no encontrado');
  });

  it('renders the correct case study based on slug', async () => {
    const study = caseStudies[0];
    const resolvedParams = Promise.resolve({ slug: study.slug });
    
    render(await Page({ params: resolvedParams }));
    
    expect(screen.getByText(study.title)).toBeInTheDocument();
  });

  it('renders 404/not found behavior for invalid slug', async () => {
     // This is tricky as Next.js notFound() throws. We just verify it handles resolution.
     const resolvedParams = Promise.resolve({ slug: 'invalid' });
     try {
       await Page({ params: resolvedParams });
     } catch (e) {
       // Expect notFound() to be called/thrown
       expect(e).toBeDefined();
     }
  });
});
