import styles from './SectionContainer.module.css';

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function SectionContainer({ children, className, id }: SectionContainerProps) {
  return (
    <section id={id} className={`${styles.container} ${className || ''}`}>
      <div className={styles.wrapper}>
        {children}
      </div>
    </section>
  );
}
