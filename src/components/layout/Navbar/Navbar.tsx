import Link from 'next/link';
import styles from './Navbar.module.css';

export function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Link href="/">Diego Gauto</Link>
        </div>
        
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li><Link href="#hero" className={styles.navLink}>Inicio</Link></li>
            <li><Link href="#case-studies" className={styles.navLink}>Casos de Estudio</Link></li>
            <li><Link href="#tech-stack" className={styles.navLink}>Stack</Link></li>
            <li><Link href="#contact" className={styles.navLink}>Contacto</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
