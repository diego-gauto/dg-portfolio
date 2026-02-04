import { describe, it, expect } from 'vitest';
import { getCaseStudyBySlug } from './get-case-studies';
import { caseStudies } from '@/data/case-studies';

describe('getCaseStudyBySlug', () => {
  it('should return a case study for a valid slug', () => {
    const slug = caseStudies[0].slug;
    const result = getCaseStudyBySlug(slug);
    expect(result).toBeDefined();
    expect(result?.slug).toBe(slug);
  });

  it('should return undefined for an invalid slug', () => {
    const result = getCaseStudyBySlug('invalid-slug');
    expect(result).toBeUndefined();
  });
});
