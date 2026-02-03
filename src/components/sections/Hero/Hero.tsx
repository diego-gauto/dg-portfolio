import { SectionContainer } from '@/components/ui/SectionContainer/SectionContainer';
import { Button } from '@/components/ui/Button/Button';
import Link from 'next/link';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <SectionContainer id="hero" className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.badge}>
          Disponible para Consultoría en LATAM & España
        </div>
        
        <h1 className={styles.title}>
          Arquitecto de Software <br />
          <span className={styles.highlight}>& Especialista en IA</span>
        </h1>
        
        <p className={styles.valueProp}>
          Diseño sistemas escalables y soluciones de IA productizables que 
          resuelven problemas reales de negocio. Transformo deuda técnica 
          en ventaja competitiva.
        </p>
        
        <div className={styles.actions}>
          {/* El enlace dirige al anchor del formulario de calificación, que implementaremos pronto */}
          <Link href="#contact" tabIndex={-1}>
            <Button variant="primary">
              Agendar Reunión Técnica
            </Button>
          </Link>
          
          <Link href="#case-studies" tabIndex={-1}>
            <Button variant="outline">
              Ver Casos de Estudio
            </Button>
          </Link>
        </div>
      </div>
    </SectionContainer>
  );
}
