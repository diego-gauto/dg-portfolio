import { CaseStudy } from '@/types/case-study';
import { SectionContainer } from '@/components/ui/SectionContainer/SectionContainer';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import styles from './CaseStudyDetail.module.css';

interface CaseStudyDetailProps {
  study: CaseStudy;
}

export function CaseStudyDetail({ study }: CaseStudyDetailProps) {
  return (
    <article className={styles.article}>
      {/* Header */}
      <header className={styles.header}>
        <SectionContainer className={styles.headerContainer}>
          <Link href="/#case-studies" className={styles.backLink}>← Volver a Casos</Link>
          <span className={styles.industry}>{study.businessContext.industry}</span>
          <h1 className={styles.title}>{study.title}</h1>
          <p className={styles.summary}>{study.summary}</p>
          
          <div className={styles.metaGrid}>
            <div>
              <span className={styles.label}>Cliente</span>
              <span className={styles.value}>{study.businessContext.clientSize}</span>
            </div>
            <div>
              <span className={styles.label}>Fecha</span>
              <span className={styles.value}>{study.publishDate}</span>
            </div>
            <div>
              <span className={styles.label}>Stack Core</span>
              <div className={styles.stackTags}>
                {study.stack.map(tech => (
                  <span key={tech} className={styles.techTag}>{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </SectionContainer>
      </header>

      {/* Main Content */}
      <SectionContainer>
        <div className={styles.contentGrid}>
          
          {/* Left Column: Context & Challenge */}
          <div className={styles.mainColumn}>
            <section className={styles.section}>
              <h2>Contexto de Negocio</h2>
              <p>{study.businessContext.problem}</p>
            </section>

            <section className={styles.section}>
              <h2>Reto Técnico</h2>
              <p>{study.technicalChallenge.description}</p>
              <ul className={styles.constraintsList}>
                {study.technicalChallenge.constraints.map((constraint, i) => (
                  <li key={i}>{constraint}</li>
                ))}
              </ul>
            </section>
            
            <section className={styles.section}>
              <h2>Decisiones de Arquitectura y Trade-offs</h2>
              <div className={styles.decisionsList}>
                {study.decisions.map((decision, index) => (
                  <div key={index} className={styles.decisionCard}>
                    <h3>{index + 1}. {decision.title}</h3>
                    <p className={styles.rationale}>{decision.rationale}</p>
                    
                    <div className={styles.tradeOffGrid}>
                      <div className={styles.pros}>
                        <h4>Ventajas (Pros)</h4>
                        <ul>
                          {decision.tradeOffs.pros.map((pro, i) => <li key={i}>{pro}</li>)}
                        </ul>
                      </div>
                      <div className={styles.cons}>
                        <h4>Desventajas (Cons)</h4>
                        <ul>
                          {decision.tradeOffs.cons.map((con, i) => <li key={i}>{con}</li>)}
                        </ul>
                      </div>
                    </div>

                    <div className={styles.alternatives}>
                      <h4>Alternativas Descartadas:</h4>
                      <ul>
                        {decision.alternativesDiscarded.map((alt, i) => (
                          <li key={i}>
                            <strong>{alt.option}:</strong> {alt.reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Metrics & CTA */}
          <aside className={styles.sidebar}>
            <div className={styles.metricsCard}>
              <h3>Impacto de Negocio</h3>
              <div className={styles.metricsList}>
                {study.metrics.map((metric, i) => (
                  <div key={i} className={styles.metricItem}>
                    <span className={styles.metricValue}>{metric.value}</span>
                    <span className={styles.metricLabel}>{metric.label}</span>
                    {metric.description && (
                      <span className={styles.metricDesc}>{metric.description}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.ctaCard}>
              <h3>¿Desafíos similares?</h3>
              <p>Analicemos cómo esta arquitectura puede aplicarse a tu caso.</p>
              <Button fullWidth>Agendar Reunión Técnica</Button>
            </div>
          </aside>
          
        </div>
      </SectionContainer>
    </article>
  );
}
