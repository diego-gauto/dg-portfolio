# Frontend Architecture - Reglas OBLIGATORIAS

> [!IMPORTANT]
> Estas reglas son **OBLIGATORIAS** y deben ser seguidas por todos los agentes y desarrolladores trabajando en el portfolio.

## Objetivo

Establecer estándares de desarrollo para Next.js con App Router y TypeScript estricto, priorizando Server Components, performance y código minimalista.

---

## Reglas de Next.js

### [OBLIGATORIO] Regla 1: Última Versión Estable de Next.js

**ID:** `nextjs/latest-stable-version`

**Descripción:**
Usar siempre la **última versión estable** de Next.js con App Router. No especificar versiones fijas en el PRD, sino "última versión estable".

**Razón:**
- Acceso a las últimas optimizaciones
- Mejor performance
- Security patches actualizados

**Ejemplo Correcto:**
```json
// package.json
{
  "dependencies": {
    "next": "^15.1.0",  // Versión estable más reciente
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}
```

**Detección:**
- [ ] Verificar `package.json` al inicio del proyecto
- [ ] Actualizar periódicamente con `pnpm update next`

---

### [OBLIGATORIO] Regla 2: App Router Exclusivamente

**ID:** `nextjs/app-router-only`

**Descripción:**
Usar exclusivamente **App Router** (`src/app/`). No usar Pages Router (`pages/`).

**Razón:**
- Arquitectura moderna y optimizada
- Server Components por defecto
- Mejor performance y SEO
- Layouts anidados nativos

**Ejemplo Correcto:**
```
src/
├── app/
│   ├── layout.tsx       ← Root layout
│   ├── page.tsx         ← Home page
│   ├── globals.css
│   └── not-found.tsx    ← 404 page
```

**Ejemplo Incorrecto:**
```
❌ PROHIBIDO - No usar Pages Router
pages/
├── _app.tsx
├── _document.tsx
└── index.tsx
```

**Detección:**
- [ ] Verificar que NO exista carpeta `pages/` en la raíz
- [ ] Verificar que exista `src/app/`

---

### [OBLIGATORIO] Regla 3: Server Components por Defecto

**ID:** `nextjs/server-components-first`

**Descripción:**
**Priorizar Server Components** para todo el código. Solo usar Client Components cuando sea estrictamente necesario (interactividad, hooks del cliente).

**Razón:**
- Mejor performance (menos JavaScript al cliente)
- SEO optimizado
- Menor bundle size
- Data fetching optimizado

**Ejemplo Correcto:**
```tsx
// app/page.tsx - Server Component (por defecto)
import { CaseStudies } from '@/components/sections/CaseStudies';

export default async function HomePage() {
  // Data fetching directo en Server Component
  const caseStudies = await getCaseStudies();
  
  return (
    <main>
      <CaseStudies data={caseStudies} />
    </main>
  );
}
```

```tsx
// components/ui/ThemeToggle.tsx - Client Component (necesario)
'use client';

import { useState } from 'react';
import styles from './ThemeToggle.module.css';

export function ThemeToggle() {
  const [theme, setTheme] = useState('light');
  
  // Interactividad requiere Client Component
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return <button className={styles.toggle} onClick={toggleTheme}>Toggle</button>;
}
```

**Ejemplo Incorrecto:**
```tsx
// ❌ PROHIBIDO - No usar 'use client' innecesariamente
'use client';

export function StaticContent() {
  // No hay interactividad, NO necesita ser Client Component
  return <div>Contenido estático</div>;
}
```

**Detección:**
- [ ] Code review: justificar cada uso de `'use client'`
- [ ] Verificar que componentes estáticos NO tengan `'use client'`

**Cuándo usar Client Components:**
- ❌ Hooks: `useState`, `useEffect`, `useContext`
- ✅ Event handlers: `onClick`, `onChange`, `onSubmit`
- ✅ Browser APIs: `localStorage`, `window`, `document`
- ✅ Librerías que dependen del cliente (Framer Motion en casos específicos)

---

### [OBLIGATORIO] Regla 4: Metadata API para SEO

**ID:** `nextjs/metadata-api`

**Descripción:**
Usar la **Metadata API** de Next.js para SEO (meta tags, OpenGraph, etc.). No usar librerías externas como `next-seo`.

**Razón:**
- API nativa optimizada
- Type-safe con TypeScript
- Mejor integración con App Router

**Ejemplo Correcto:**
```tsx
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Diego Gauto - Arquitecto de Software & Especialista en IA',
    template: '%s | Diego Gauto'
  },
  description: 'Portfolio de consultoría técnica senior. Diseño sistemas escalables y soluciones de IA que resuelven problemas reales de negocio.',
  keywords: ['Arquitecto de Software', 'Especialista IA', 'Consultoría LATAM', 'LangChain', 'RAG'],
  authors: [{ name: 'Diego Gauto' }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://diegogauto.dev',
    title: 'Diego Gauto - Arquitecto de Software & Especialista en IA',
    description: 'Portfolio de consultoría técnica senior',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Diego Gauto Portfolio'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diego Gauto - Arquitecto de Software',
    description: 'Portfolio de consultoría técnica senior',
    images: ['/og-image.png']
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
```

**Detección:**
- [ ] Verificar que `app/layout.tsx` exporte `metadata`
- [ ] Verificar que NO se use `next-seo` en `package.json`

---

### [OBLIGATORIO] Regla 5: Static Site Generation (SSG)

**ID:** `nextjs/static-generation`

**Descripción:**
Dado que el portfolio es estático (sin backend), usar **Static Site Generation** para todas las páginas. El uso de `generateStaticParams` es **OBLIGATORIO** para todos los Casos de Estudio.

**Razón:**
- Performance máximo (HTML pre-generado)
- Cumplir con tiempos de carga del PRD (< 0.8s FCP)
- Hosting gratuito (Vercel, GitHub Pages)
- SEO optimizado
- Sin necesidad de servidor

**Ejemplo Correcto:**
```tsx
// app/page.tsx - SSG por defecto
export default function HomePage() {
  return <main>Portfolio content</main>;
}

// app/case-study/[id]/page.tsx - generateStaticParams OBLIGATORIO
export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();
  
  return caseStudies.map((study) => ({
    id: study.id,
  }));
}

export default function CaseStudyPage({ params }: { params: { id: string } }) {
  const caseStudy = getCaseStudyById(params.id);
  return <main>{caseStudy.title}</main>;
}

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Habilita SSG para todo el sitio
};

module.exports = nextConfig;
```

**Detección:**
- [ ] Verificar `output: 'export'` en `next.config.js`
- [ ] Verificar que TODOS los dynamic routes tengan `generateStaticParams`
- [ ] Verificar que NO se use `getServerSideProps` (Pages Router)
- [ ] Validar tiempos de carga: FCP < 0.8s

---

## Reglas de TypeScript

### [OBLIGATORIO] Regla 6: TypeScript Estricto

**ID:** `typescript/strict-mode`

**Descripción:**
Usar TypeScript en **modo estricto** con todas las flags de seguridad habilitadas. **PROHIBICIÓN ABSOLUTA** de `any` y `@ts-ignore`.

**Razón:**
- Prevención de bugs en compile-time
- Mejor autocompletado y refactoring
- Código más mantenible
- **Bloqueo de deploy:** El uso de `any` o `@ts-ignore` disparará un error en el CI/CD que bloqueará el deploy

**Ejemplo Correcto:**
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

**Ejemplo Correcto:**
```typescript
// ✅ Tipos explícitos OBLIGATORIOS
interface CaseStudy {
  id: string;
  title: string;
  challenge: string;
  techStack: string[];
  impact: {
    metric: string;
    value: string;
  }[];
}

// ✅ OBLIGATORIO: Interface para data de Casos de Estudio
export function getCaseStudies(): CaseStudy[] {
  return [
    {
      id: '1',
      title: 'Plataforma de Automatización',
      challenge: 'Reducir intervención manual',
      techStack: ['LangGraph', 'RAG', 'OpenAI API'],
      impact: [
        { metric: 'Tiempo de aprobaciones', value: '-70%' },
        { metric: 'Ahorro anual', value: '$50K' }
      ]
    }
  ];
}
```

**Ejemplo Incorrecto:**
```typescript
// ❌ PROHIBIDO - any disparará error CI/CD
function getCaseStudies(): any {
  return [{ id: 1, title: 'Test' }];
}

// ❌ PROHIBIDO - @ts-ignore bloqueará el deploy
// @ts-ignore
const data = externalLib.getData();

// ❌ PROHIBIDO - Sin interface para data
function getCaseStudies() {  // Falta tipo de retorno
  return [{ id: '1', title: 'Test' }];
}
```

**Detección:**
- [ ] ESLint rule: `@typescript-eslint/no-explicit-any: error` (BLOQUEANTE)
- [ ] ESLint rule: `@typescript-eslint/ban-ts-comment: error` (BLOQUEANTE)
- [ ] CI/CD: `pnpm run type-check` debe pasar sin errores
- [ ] Interfaces obligatorias para toda la data de `src/data/`

**Excepciones Permitidas:**
- **NINGUNA** - `any` y `@ts-ignore` están completamente prohibidos
- Usar `unknown` y type guards si es absolutamente necesario

---

### [OBLIGATORIO] Regla 7: Interfaces para Props

**ID:** `typescript/interface-props`

**Descripción:**
Usar **interfaces** para definir props de componentes React. Exportar interfaces si se reutilizan.

**Razón:**
- Mejor para composición y extensión
- Convención estándar de React + TypeScript
- Mejor documentación auto-generada

**Ejemplo Correcto:**
```typescript
// Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({ 
  children, 
  variant = 'primary', 
  disabled = false,
  onClick 
}: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}
```

**Detección:**
- [ ] Code review manual
- [ ] ESLint rule custom (preferir interfaces para props)

---

### [RECOMENDADO] Regla 8: Readonly para Props

**ID:** `typescript/readonly-props`

**Descripción:**
Marcar props como `readonly` cuando no deben mutar.

**Razón:**
- Previene mutaciones accidentales
- Documenta intención

**Ejemplo Correcto:**
```typescript
interface CardProps {
  readonly title: string;
  readonly content: string;
}
```

---

## Reglas de Performance

### [OBLIGATORIO] Regla 9: Optimización de Imágenes

**ID:** `nextjs/image-optimization`

**Descripción:**
Usar el componente `<Image>` de Next.js para todas las imágenes. Usar formatos modernos (WebP, AVIF).

**Razón:**
- Optimización automática
- Lazy loading nativo
- Responsive images

**Ejemplo Correcto:**
```tsx
import Image from 'next/image';

export function Avatar() {
  return (
    <Image
      src="/avatar.webp"
      alt="Diego Gauto - Arquitecto de Software"
      width={200}
      height={200}
      priority  // Solo para imágenes above-the-fold
    />
  );
}
```

**Ejemplo Incorrecto:**
```tsx
// ❌ PROHIBIDO - No usar <img> tag directo
<img src="/avatar.png" alt="Avatar" />
```

**Detección:**
- [ ] ESLint rule: `@next/next/no-img-element`

---

### [OBLIGATORIO] Regla 10: Bundle Size Mínimo

**ID:** `performance/bundle-size`

**Descripción:**
Mantener el bundle inicial de JavaScript **< 100KB** (gzipped). Usar code splitting y lazy loading.

**Razón:**
- Performance en mobile
- Mejor Core Web Vitals
- Lighthouse score optimizado

**Ejemplo Correcto:**
```tsx
// Lazy load componentes no críticos
import dynamic from 'next/dynamic';

const CaseStudyModal = dynamic(
  () => import('@/components/ui/CaseStudyModal'),
  { ssr: false }
);
```

**Detección:**
- [ ] Analizar bundle con `pnpm build && pnpm analyze`
- [ ] Lighthouse audit: verificar Performance > 90

---

## Reglas de Estructura de Código

### [OBLIGATORIO] Regla 11: Estructura de Carpetas

**ID:** `architecture/folder-structure`

**Descripción:**
Seguir la estructura definida en el PRD. Co-location de componentes con estilos.

**Razón:**
- Consistencia
- Fácil navegación
- Escalabilidad

**Estructura Obligatoria:**
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── not-found.tsx
├── components/
│   ├── sections/
│   │   ├── Hero/
│   │   │   ├── Hero.tsx
│   │   │   └── Hero.module.css
│   │   ├── TechStack/
│   │   ├── CaseStudies/
│   │   ├── About/
│   │   └── Contact/
│   └── ui/
│       ├── Button/
│       ├── Card/
│       └── Badge/
├── data/                    ← Archivos .ts con exportaciones constantes
│   ├── case-studies.ts      ← Tipado estricto OBLIGATORIO
│   ├── tech-stack.ts        ← Interfaces exportadas
│   └── personal-info.ts     ← Data local única
├── lib/
│   └── utils.ts
└── types/
    └── index.ts
```

**OBLIGATORIO - Carpeta `src/data/`:**
- **SOLO archivos `.ts`** con exportaciones constantes
- **Tipado estricto** con interfaces exportadas
- **PROHIBIDO:** fetchs dinámicos a APIs externas en tiempo de ejecución
- **PROHIBIDO:** usar `fetch()`, `axios`, o cualquier llamada HTTP en estos archivos
- **Data local única:** Toda la data de Casos de Estudio debe estar en archivos `.ts` locales

**Ejemplo Correcto:**
```typescript
// src/data/case-studies.ts
import type { CaseStudy } from '@/types';

// ✅ Exportación constante con tipado estricto
export const caseStudies: CaseStudy[] = [
  {
    id: 'platform-automation',
    title: 'Plataforma de Automatización con Agentes de IA',
    techStack: ['LangGraph', 'RAG', 'OpenAI API'],
    // ... más data
  },
];

// ✅ Función helper con tipo de retorno explícito
export function getCaseStudyById(id: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.id === id);
}
```

**Ejemplo Incorrecto:**
```typescript
// ❌ PROHIBIDO - Fetch dinámico
export async function getCaseStudies() {
  const response = await fetch('/api/case-studies');
  return response.json();
}

// ❌ PROHIBIDO - Sin tipado
export const caseStudies = [
  { id: 1, title: 'Test' }  // Falta interface
];
```

**Detección:**
- [ ] Code review manual
- [ ] Script custom para validar estructura
- [ ] Verificar que archivos en `src/data/` NO contengan `fetch`, `axios`, `http`

---

### [OBLIGATORIO] Regla 12: Naming Conventions

**ID:** `architecture/naming-conventions`

**Descripción:**
Seguir convenciones de nombres estrictas para consistencia.

**Convenciones:**
- Componentes: `PascalCase.tsx` (ej: `Hero.tsx`, `Button.tsx`)
- CSS Modules: `PascalCase.module.css` (ej: `Hero.module.css`)
- Datos: `kebab-case.ts` (ej: `case-studies.ts`, `tech-stack.ts`)
- Utilidades: `camelCase.ts` (ej: `formatDate.ts`, `cn.ts`)
- Tipos: `PascalCase` (ej: `CaseStudy`, `TechStack`)

**Ejemplo Correcto:**
```
src/components/sections/Hero/
├── Hero.tsx
└── Hero.module.css

src/data/
├── case-studies.ts
└── tech-stack.ts

src/lib/
└── utils.ts
```

**Detección:**
- [ ] Code review manual

---

## Validación

Para verificar el cumplimiento de estas reglas:

```bash
# Type check (BLOQUEANTE en CI/CD)
pnpm run type-check  # Debe pasar sin errores o bloquea deploy

# Lint
pnpm run lint

# Build (verificar que compile)
pnpm run build

# Analizar bundle size
pnpm run build && pnpm run analyze
```

**IMPORTANTE:**
- `pnpm run type-check` es un **paso bloqueante** en el flujo de trabajo
- Cualquier error de tipo bloqueará el deploy automáticamente
- El CI/CD fallará si existe `any` o `@ts-ignore` en el código

---

## Referencias

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
