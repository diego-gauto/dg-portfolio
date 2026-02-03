import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { caseStudies } from '@/data/case-studies';
import { getCaseStudyBySlug } from '@/lib/get-case-studies';
import { CaseStudyDetail } from '@/components/sections/CaseStudies/CaseStudyDetail/CaseStudyDetail';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// OBLIGATORIO: SSG para todas las rutas dinámicas
export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return {
      title: 'Caso no encontrado',
    };
  }

  return {
    title: `${study.title} | Diego Gauto`,
    description: study.summary,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return (
    <main>
      <CaseStudyDetail study={study} />
    </main>
  );
}
