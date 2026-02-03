import { SectionContainer } from '@/components/ui/SectionContainer/SectionContainer';
import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <SectionContainer className={styles.container}>
        <div className={styles.content}>
          <div className={styles.copyright}>
            © {year} Diego Gauto. Arquitectura de Software & IA.
          </div>
          
          <div className={styles.links}>
            <Link href="https://linkedin.com/in/diegogauto" target="_blank" rel="noopener noreferrer" className={styles.link}>
              LinkedIn
            </Link>
            <Link href="https://github.com/diegogauto" target="_blank" rel="noopener noreferrer" className={styles.link}>
              GitHub
            </Link>
          </div>
        </div>
      </SectionContainer>
    </footer>
  );
}
