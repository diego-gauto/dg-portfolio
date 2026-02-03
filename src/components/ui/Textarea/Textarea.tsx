import styles from './Textarea.module.css';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export function Textarea({ className, error, ...props }: TextareaProps) {
  return (
    <textarea 
      className={`
        ${styles.textarea} 
        ${error ? styles.error : ''} 
        ${className || ''}
      `}
      {...props} 
    />
  );
}
