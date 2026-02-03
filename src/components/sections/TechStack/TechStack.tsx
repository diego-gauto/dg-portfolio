import { SectionContainer } from '@/components/ui/SectionContainer/SectionContainer';
import { techStack } from '@/data/tech-stack';
import styles from './TechStack.module.css';

export function TechStack() {
  return (
    <SectionContainer id="tech-stack" className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Stack Tecnológico de Referencia</h2>
        <p className={styles.subheading}>
          Selección de herramientas para construir sistemas robustos, 
          mantenibles y preparados para el futuro.
        </p>
      </div>

      <div className={styles.grid}>
        {techStack.map((category) => (
          <div key={category.id} className={styles.categoryCard}>
            <h3 className={styles.categoryTitle}>{category.title}</h3>
            
            <ul className={styles.techList}>
              {category.items.map((tech) => (
                <li key={tech.name} className={styles.techItem}>
                  <strong className={styles.techName}>{tech.name}</strong>
                  <span className={styles.techDesc}>{tech.description}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
