'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import { Textarea } from '@/components/ui/Textarea/Textarea';
import styles from './QualificationForm.module.css';

type FormState = 'initial' | 'submitting' | 'qualified' | 'disqualified';

interface FormData {
  name: string;
  email: string;
  company: string;
  budget: string;
  challenge: string;
}

const BUDGET_OPTIONS = [
  { value: 'low', label: 'Menos de $5,000 USD' },
  { value: 'medium', label: '$5,000 - $20,000 USD' },
  { value: 'high', label: 'Más de $20,000 USD' },
  { value: 'consulting', label: 'Solo Consultoría por Hora ($200/hr)' }
];

export function QualificationForm() {
  const [step, setStep] = useState<FormState>('initial');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    budget: '',
    challenge: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('submitting');
    
    // Simulación de latencia de red
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Lógica de Filtrado (Lead Scoring Simple)
    // En producción, esto validaría contra un backend real o lógica más compleja
    const isQualified = formData.budget !== 'low';
    
    if (isQualified) {
      setStep('qualified');
      // En un caso real, aquí enviaríamos los datos a un CRM o Zapier
    } else {
      setStep('disqualified');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (step === 'qualified') {
    return (
      <div className={styles.resultCard}>
        <div className={styles.successIcon}>✓</div>
        <h3 className={styles.resultTitle}>¡Gracias por tu interés!</h3>
        <p className={styles.resultDesc}>
          Según tu perfil, podemos generar un alto impacto en tu proyecto.
          Por favor, selecciona un horario para nuestra sesión inicial.
        </p>
        <div className={styles.actions}>
          <a 
            href="https://calendly.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.calendlyButton}
          >
            Agendar Reunión en Calendly
          </a>
        </div>
      </div>
    );
  }

  if (step === 'disqualified') {
    return (
      <div className={styles.resultCard}>
        <h3 className={styles.resultTitle}>Gracias por contactarme</h3>
        <p className={styles.resultDesc}>
          En este momento, mi enfoque está en proyectos de consultoría a mayor escala.
          Sin embargo, comparto contenido técnico valioso frecuentemente.
        </p>
        <div className={styles.actions}>
          <a 
            href="https://linkedin.com/in/diegogauto" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.linkedinButton}
          >
            Conectar en LinkedIn
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>Nombre</label>
          <Input
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Tu nombre"
          />
        </div>
        
        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>Email Corporativo</label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="nombre@empresa.com"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="company" className={styles.label}>Empresa</label>
          <Input
            id="company"
            name="company"
            required
            value={formData.company}
            onChange={handleChange}
            placeholder="Nombre de tu empresa"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="budget" className={styles.label}>Presupuesto Estimado</label>
          <select 
            id="budget"
            name="budget"
            required
            value={formData.budget}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="" disabled>Selecciona un rango</option>
            {BUDGET_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label htmlFor="challenge" className={styles.label}>Desafío Técnico Principal</label>
          <Textarea
             id="challenge"
             name="challenge"
             required
             value={formData.challenge}
             onChange={handleChange}
             placeholder="Describe brevemente el problema de arquitectura o IA que necesitas resolver..."
          />
        </div>
      </div>

      <div className={styles.submitContainer}>
        <Button 
          type="submit" 
          disabled={step === 'submitting'}
          className={styles.submitButton}
        >
          {step === 'submitting' ? 'Analizando...' : 'Verificar Disponibilidad'}
        </Button>
        <p className={styles.disclaimer}>
          Sin compromiso. Respuesta en 24hs.
        </p>
      </div>
    </form>
  );
}
