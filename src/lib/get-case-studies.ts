import { caseStudies } from '@/data/case-studies';
import { CaseStudy } from '@/types/case-study';

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
