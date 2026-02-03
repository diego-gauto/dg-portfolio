# CSS Architecture - Reglas OBLIGATORIAS

> [!IMPORTANT]
> Estas reglas son **ABSOLUTAMENTE OBLIGATORIAS** y deben ser seguidas por todos los agentes y desarrolladores. La violación de estas reglas bloqueará cualquier merge.

## Objetivo

Establecer una arquitectura de estilos basada exclusivamente en **CSS Modules**, prohibiendo el uso de Tailwind CSS u otras librerías de utilidades CSS. El objetivo es mantener un código CSS mantenible, modular y de alta calidad.

---

## Reglas Críticas

### [OBLIGATORIO] Regla 1: Prohibición Absoluta de Tailwind CSS

**ID:** `css-architecture/no-tailwind`

**Descripción:**
Queda **TERMINANTEMENTE PROHIBIDO** el uso de Tailwind CSS o cualquier otra librería de utilidades CSS (UnoCSS, Windi CSS, etc.). Solo se permite CSS Modules.

**Razón:**
- Mantener control total sobre los estilos
- Evitar dependencias externas innecesarias
- Código CSS más limpio y mantenible
- **Performance optimizado:** Decisión crítica para alcanzar el objetivo de < 100KB bundle size definido en el PRD (sin clases no utilizadas)

**Ejemplo Correcto:**
```tsx
// Button.tsx
import styles from './Button.module.css';

export function Button({ children }: { children: React.ReactNode }) {
  return <button className={styles.button}>{children}</button>;
}
```

```css
/* Button.module.css */
.button {
  padding: 0.75rem 1.5rem;
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.button:hover {
  background-color: var(--color-primary-dark);
}
```

**Ejemplo Incorrecto:**
```tsx
// ❌ PROHIBIDO - NO USAR TAILWIND
export function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
      {children}
    </button>
  );
}
```

**Detección:**
- [ ] Code review manual (rechazar inmediatamente)
- [ ] Verificar que `package.json` NO contenga `tailwindcss`
- [ ] Verificar que NO exista `tailwind.config.js`
- [ ] Grep search por clases de Tailwind (`className=".*bg-.*"`)

**Excepciones Permitidas:**
- **NINGUNA** - Esta regla no tiene excepciones

---

### [OBLIGATORIO] Regla 2: CSS Modules Exclusivamente

**ID:** `css-architecture/css-modules-only`

**Descripción:**
Todos los componentes deben usar **CSS Modules** (`.module.css`) para sus estilos. No se permite CSS-in-JS (styled-components, emotion), ni inline styles para estilos complejos.

**Razón:**
- Scope local automático (evita colisiones de nombres)
- Performance superior (CSS estático, no runtime)
- Mejor experiencia de desarrollador (autocompletado en IDE)
- Facilita el debugging (DevTools estándar)

**Ejemplo Correcto:**
```tsx
// Card.tsx
import styles from './Card.module.css';

interface CardProps {
  title: string;
  children: React.ReactNode;
  variant?: 'default' | 'highlighted';
}

export function Card({ title, children, variant = 'default' }: CardProps) {
  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
```

```css
/* Card.module.css */
.card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
}

.title {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
}

.content {
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.highlighted {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
}
```

**Ejemplo Incorrecto:**
```tsx
// ❌ PROHIBIDO - No usar styled-components
import styled from 'styled-components';

const CardStyled = styled.div`
  background-color: white;
  padding: 1rem;
`;

// ❌ PROHIBIDO - No usar inline styles complejos
export function Card() {
  return (
    <div style={{ 
      backgroundColor: 'white', 
      padding: '1rem',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      {/* ... */}
    </div>
  );
}
```

**Detección:**
- [ ] Code review manual
- [ ] Verificar que cada componente `.tsx` tenga su `.module.css`
- [ ] ESLint: prohibir imports de `styled-components`, `@emotion/react`
- [ ] Lint rule custom para inline styles complejos

**Excepciones Permitidas:**
- Inline styles dinámicos simples (ej: `style={{ transform: `translateX(${x}px)` }}`)
- Valores calculados en runtime que no se pueden resolver en CSS

---

### [OBLIGATORIO] Regla 3: Variables CSS Globales

**ID:** `css-architecture/css-variables`

**Descripción:**
Todos los valores de diseño (colores, espaciados, tipografía, radios, sombras) deben definirse como **CSS Custom Properties** en `globals.css` y usarse consistentemente.

**Razón:**
- Single source of truth para el sistema de diseño
- Facilita cambios globales (ej: tema oscuro)
- Mejor mantenibilidad
- Consistencia visual garantizada

**Ejemplo Correcto:**
```css
/* globals.css */
:root {
  /* Colores - Light Mode */
  --color-background: #ffffff;
  --color-surface: #f9fafb;
  --color-border: #e5e7eb;
  --color-text-primary: #111827;
  --color-text-secondary: #6b7280;
  --color-text-inverse: #ffffff;
  --color-primary: #2563eb;
  --color-primary-dark: #1d4ed8;
  
  /* Espaciados */
  --spacing-xs: 0.25rem;  /* 4px */
  --spacing-sm: 0.5rem;   /* 8px */
  --spacing-md: 1rem;     /* 16px */
  --spacing-lg: 1.5rem;   /* 24px */
  --spacing-xl: 2rem;     /* 32px */
  --spacing-2xl: 3rem;    /* 48px */
  
  /* Tipografía */
  --font-family-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-family-mono: 'Fira Code', 'Courier New', monospace;
  --font-size-xs: 0.75rem;   /* 12px */
  --font-size-sm: 0.875rem;  /* 14px */
  --font-size-base: 1rem;    /* 16px */
  --font-size-lg: 1.125rem;  /* 18px */
  --font-size-xl: 1.25rem;   /* 20px */
  --font-size-2xl: 1.5rem;   /* 24px */
  --font-size-3xl: 1.875rem; /* 30px */
  --font-size-4xl: 2.25rem;  /* 36px */
  
  /* Border Radius */
  --radius-sm: 0.25rem;  /* 4px */
  --radius-md: 0.5rem;   /* 8px */
  --radius-lg: 0.75rem;  /* 12px */
  --radius-xl: 1rem;     /* 16px */
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;
}

/* Dark Mode */
[data-theme='dark'] {
  --color-background: #0a0a0a;
  --color-surface: #1f1f1f;
  --color-border: #2d2d2d;
  --color-text-primary: #ffffff;
  --color-text-secondary: #a1a1a1;
  --color-primary: #3b82f6;
  --color-primary-dark: #2563eb;
  
  /* Estados de Formulario (Formulario de Calificación) */
  --color-error: #dc2626;           /* Errores de validación */
  --color-success: #16a34a;         /* Confirmación exitosa */
  --color-warning: #f59e0b;         /* Advertencias */
  --form-input-border: #d1d5db;     /* Border normal de inputs */
  --form-input-focus: #3b82f6;      /* Border en focus */
  --form-input-error: #fca5a5;      /* Border en error */
  --form-input-bg: #ffffff;         /* Background de inputs */
}
```

```css
/* Component.module.css - USAR VARIABLES */
.container {
  background-color: var(--color-surface);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  color: var(--color-text-primary);
}
```

**Ejemplo Incorrecto:**
```css
/* ❌ PROHIBIDO - No hardcodear valores */
.container {
  background-color: #f9fafb;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  color: #111827;
}
```

**Detección:**
- [ ] Code review manual
- [ ] Stylelint rule: `declaration-property-value-no-unknown` (validar solo vars permitidas)
- [ ] Custom lint rule: rechazar valores hardcodeados (hex colors, px sin var())

**Excepciones Permitidas:**
- Valores únicos específicos de un componente que no se reutilizan
- Valores dinámicos calculados en JavaScript

---

### [OBLIGATORIO] Regla 4: Estructura de Archivos CSS

**ID:** `css-architecture/file-structure`

**Descripción:**
Cada componente en `src/components` debe tener su propio archivo `.module.css` en la **misma carpeta**. Los estilos globales van en `src/app/globals.css`.

**Razón:**
- Co-location: componente y estilos juntos
- Fácil de encontrar y mantener
- Imports claros y explícitos

**Ejemplo Correcto:**
```
src/
├── app/
│   ├── globals.css              ← Estilos globales + variables
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── sections/
│   │   ├── Hero/
│   │   │   ├── Hero.tsx         ← Componente
│   │   │   └── Hero.module.css  ← Estilos del componente
│   │   ├── TechStack/
│   │   │   ├── TechStack.tsx
│   │   │   └── TechStack.module.css
│   │   └── Contact/
│   │       ├── Contact.tsx
│   │       └── Contact.module.css
│   └── ui/
│       ├── Button/
│       │   ├── Button.tsx
│       │   └── Button.module.css
│       └── Card/
│           ├── Card.tsx
│           └── Card.module.css
```

**Ejemplo Incorrecto:**
```
❌ PROHIBIDO - NO centralizar estilos en carpeta separada
src/
├── components/
│   └── Button.tsx
└── styles/
    └── Button.module.css  ← Estilos lejos del componente
```

**Detección:**
- [ ] Code review manual
- [ ] Custom script: verificar que cada `.tsx` tenga `.module.css` correspondiente

---

### [RECOMENDADO] Regla 5: Naming Convention CSS

**ID:** `css-architecture/naming-convention`

**Descripción:**
Usar **camelCase** dentro de CSS Modules para nombres de clases. Alternativamente, se puede usar BEM si el equipo lo prefiere, pero debe ser consistente en todo el proyecto.

**Razón:**
- Consistencia en todo el codebase
- camelCase facilita destructuring en TypeScript
- Mejor autocompletado en IDE

**Ejemplo Correcto (camelCase):**
```css
/* Button.module.css */
.button { }
.buttonPrimary { }
.buttonSecondary { }
.buttonDisabled { }
```

```tsx
import styles from './Button.module.css';

<button className={styles.button}>Click</button>
<button className={styles.buttonPrimary}>Primary</button>
```

**Ejemplo Correcto (BEM - si se prefiere):**
```css
/* Button.module.css */
.button { }
.button--primary { }
.button--secondary { }
.button--disabled { }
```

**Ejemplo Incorrecto:**
```css
/* ❌ PROHIBIDO - Mezclar convenciones */
.button { }
.button-primary { }    /* kebab-case */
.ButtonDisabled { }    /* PascalCase */
```

**Detección:**
- [ ] Code review manual
- [ ] Stylelint: configurar regla de naming

---

### [OBLIGATORIO] Regla 6: No Librerías de Componentes CSS

**ID:** `css-architecture/no-ui-libraries`

**Descripción:**
No se permite el uso de librerías de componentes pre-estilizadas (Material-UI, Ant Design, Chakra UI, etc.). Todos los componentes deben ser custom con CSS Modules.

**Razón:**
- Control total sobre el diseño
- Bundle size optimizado
- Performance superior
- Diseño único y diferenciado

**Detección:**
- [ ] Verificar `package.json` - NO debe contener:
  - `@mui/material`
  - `antd`
  - `@chakra-ui/react`
  - `react-bootstrap`
  - Cualquier otra UI library

**Excepciones Permitidas:**
- Radix UI (headless components, sin estilos) - SE PERMITE
- React Hook Form - SE PERMITE (no es UI library)

---

### [OBLIGATORIO] Regla 7: Responsive Design con Media Queries

**ID:** `css-architecture/responsive-design`

**Descripción:**
Usar **media queries** en CSS Modules para diseño responsive. Definir breakpoints como variables CSS.

**Razón:**
- Enfoque estándar y mantenible
- No depende de JavaScript
- Performance optimizado

**Ejemplo Correcto:**
```css
/* globals.css - Definir breakpoints */
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
}
```

```css
/* Component.module.css */
.container {
  padding: var(--spacing-md);
}

@media (min-width: 768px) {
  .container {
    padding: var(--spacing-lg);
  }
}

@media (min-width: 1024px) {
  .container {
    padding: var(--spacing-xl);
  }
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

**Detección:**
- [ ] Code review manual
- [ ] Verificar que NO se use JavaScript para responsive logic (excepto casos específicos)

---

## Validación

Para verificar el cumplimiento de estas reglas:

```bash
# Verificar que NO exista Tailwind (todas las variantes)
grep -rE "tailwindcss|tailwind|@tailwindcss" package.json && echo "ERROR: Tailwind detectado" || echo "OK"

# Verificar estructura de archivos
find src/components -name "*.tsx" | while read file; do
  module_css="${file%.tsx}.module.css"
  [ ! -f "$module_css" ] && echo "MISSING: $module_css"
done

# Type check
pnpm run type-check
```

---

## Excepciones

Las siguientes situaciones pueden justificar excepciones:

- Inline styles para valores dinámicos calculados en runtime
- Radix UI (componentes headless sin estilos)

**Proceso para excepciones:**
1. Documentar la razón en comentario
2. Obtener aprobación en code review
3. Agregar comentario `// @rule-exception: css-architecture/[rule-id]`

---

## Referencias

- [CSS Modules Documentation](https://github.com/css-modules/css-modules)
- [CSS Custom Properties (Variables)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Modern CSS Solutions](https://moderncss.dev/)
