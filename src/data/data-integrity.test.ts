import { describe, it, expect } from 'vitest';
import { caseStudies } from './case-studies';
import { techStack } from './tech-stack';

describe('Data Files Integrity', () => {
  it('caseStudies has required fields', () => {
    expect(caseStudies.length).toBeGreaterThan(0);
    caseStudies.forEach(s => {
      expect(s.title).toBeDefined();
      expect(s.slug).toBeDefined();
    });
  });

  it('techStack has categories', () => {
    expect(techStack.length).toBeGreaterThan(0);
    techStack.forEach(c => {
      expect(c.title).toBeDefined();
      expect(c.items.length).toBeGreaterThan(0);
    });
  });
});
