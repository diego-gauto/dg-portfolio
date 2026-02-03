import { SectionContainer } from '@/components/ui/SectionContainer/SectionContainer';
import { QualificationForm } from '@/components/ui/QualificationForm/QualificationForm';
import styles from './Contact.module.css';

export function Contact() {
  return (
    <SectionContainer id="contact" className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2>¿Listo para Escalar tu Arquitectura?</h2>
          <p>
            Agenda una reunión técnica inicial para evaluar si podemos colaborar. 
            El formulario nos ayuda a garantizar que soy el partner adecuado para tu desafío.
          </p>
        </div>
        
        <QualificationForm />
      </div>
    </SectionContainer>
  );
}

