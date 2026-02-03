import { SectionContainer } from '@/components/ui/SectionContainer/SectionContainer';
import styles from './AIExpertise.module.css';

export function AIExpertise() {
  return (
    <SectionContainer id="ai-expertise" className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Ingeniería de IA Aplicada</h2>
        <p className={styles.subheading}>
          Más allá de los demos. Arquitecturas de IA robustas, deterministas y 
          listas para producción.
        </p>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Agentic Workflows</h3>
          <p className={styles.cardDesc}>
            Orquestación de sistemas multi-agente con <strong>LangGraph</strong> que pueden 
            planificar, revisar su trabajo y ejecutar tareas complejas de forma autónoma.
          </p>
          <ul className={styles.resultsList}>
            <li>Automatización de procesos de decisión</li>
            <li>Human-in-the-loop patterns</li>
            <li>Gestión de estado persistente</li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>RAG Empresarial</h3>
          <p className={styles.cardDesc}>
            Sistemas de recuperación de información de alta precisión sobre bases de conocimiento privadas, 
            eliminando alucinaciones.
          </p>
          <ul className={styles.resultsList}>
            <li>Búsqueda híbrida (Semántica + Keyword)</li>
            <li>Re-ranking avanzado para precisión</li>
            <li>Citación de fuentes trazaables</li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Evaluación & Métricas</h3>
          <p className={styles.cardDesc}>
            Frameworks de evaluación continua (RAGAS, LangSmith) para garantizar 
            la calidad y seguridad de las respuestas del modelo.
          </p>
          <ul className={styles.resultsList}>
            <li>Detección de regresiones</li>
            <li>Monitoreo de latencia y costos</li>
            <li>Guardrails de seguridad</li>
          </ul>
        </div>
      </div>
    </SectionContainer>
  );
}
