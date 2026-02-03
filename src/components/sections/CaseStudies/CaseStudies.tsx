import { SectionContainer } from '@/components/ui/SectionContainer/SectionContainer';
import { caseStudies } from '@/data/case-studies';
import { CaseStudyCard } from './CaseStudyCard/CaseStudyCard';
import styles from './CaseStudies.module.css';

export function CaseStudies() {
  return (
    <SectionContainer id="case-studies" className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Casos de Estudio</h2>
        <p className={styles.subheading}>
          Análisis de decisiones arquitectónicas y resultados de negocio en entornos críticos.
        </p>
      </div>

      <div className={styles.grid}>
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.id} study={study} />
        ))}
      </div>
    </SectionContainer>
  );
}
