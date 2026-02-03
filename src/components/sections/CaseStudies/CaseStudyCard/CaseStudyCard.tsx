import Link from 'next/link';
import { CaseStudy } from '@/types/case-study';
import styles from './CaseStudyCard.module.css';

interface CaseStudyCardProps {
  study: CaseStudy;
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.industry}>{study.businessContext.industry}</span>
          <h3 className={styles.title}>
            <Link href={`/casos/${study.slug}`}>
              {study.title}
            </Link>
          </h3>
        </div>
        
        <p className={styles.summary}>{study.summary}</p>
        
        <div className={styles.metrics}>
          {study.metrics.slice(0, 2).map((metric, index) => (
            <div key={index} className={styles.metric}>
              <span className={styles.metricValue}>{metric.value}</span>
              <span className={styles.metricLabel}>{metric.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.stack}>
          {study.stack.slice(0, 3).map((tech) => (
            <span key={tech} className={styles.techTag}>{tech}</span>
          ))}
          {study.stack.length > 3 && (
            <span className={styles.techTag}>+{study.stack.length - 3}</span>
          )}
        </div>
        
        <div className={styles.action}>
            <Link href={`/casos/${study.slug}`} className={styles.link}>
              Ver Estudio de Arquitectura →
            </Link>
        </div>
      </div>
    </article>
  );
}
