# Reglas de Desarrollo - Portfolio Diego Gauto

Este directorio contiene las **reglas obligatorias** de desarrollo para el Portfolio Profesional de Arquitectura e IA de Diego Gauto.

## 📋 Archivos de Reglas

### 1. [`tech-stack.md`](./tech-stack.md)
**Stack Técnico Permitido/Prohibido**

- ✅ Core: Next.js (latest), React (latest), TypeScript (latest)
- ❌ Blacklist: Tailwind CSS, UI libraries, State management, Form libraries
- 📦 Política: Agregar dependencias SOLO cuando justificadas por plan de desarrollo
- 🎯 Objetivo: Bundle < 100KB (gzipped), Lighthouse 98-100 (obligatorio)
- ⚡ Performance: FCP < 0.8s, TTI < 1.8s

**Prioridad:** 🔴 CRÍTICO - Revisar antes de instalar cualquier dependencia

---

### 2. [`css-architecture.md`](./css-architecture.md)
**Reglas de CSS y Estilos**

- ❌ **PROHIBICIÓN ABSOLUTA de Tailwind CSS** (Garantizar bundle < 100KB del PRD)
- ✅ CSS Modules exclusivamente (`.module.css`)
- ✅ Variables CSS globales en `globals.css` (incluyendo estados de formulario)
- ✅ Co-location: componente + estilos en misma carpeta
- ✅ Naming convention: camelCase o BEM (consistente)
- 🎨 Variables de Formulario: `--color-error`, `--form-input-focus`, etc.

**Prioridad:** 🔴 CRÍTICO - Violación bloquea merge

---

### 3. [`frontend-architecture.md`](./frontend-architecture.md)
**Reglas de Next.js y TypeScript**

- ✅ Next.js última versión estable (App Router)
- 🚫 **TypeScript: PROHIBICIÓN ABSOLUTA de `any` y `@ts-ignore`** (Bloqueo CI/CD)
- ✅ Server Components por defecto
- ✅ Metadata API para SEO (no `next-seo`)
- ✅ **Static Site Generation (SSG)** con `generateStaticParams` OBLIGATORIO
- ✅ Optimización de imágenes (Next.js Image)
- 📁 **Data 100% Local:** Archivos `.ts` en `src/data/`, prohibido `fetch()` dinámico
- 🔒 **type-check es BLOQUEANTE** en flujo de trabajo

**Prioridad:** 🔴 CRÍTICO - Violación bloquea merge y deploy

---

### 4. [`content-guidelines.md`](./content-guidelines.md)
**Reglas de Contenido y Tono**

- ✅ Español profesional exclusivamente
- ✅ Tono de Consultor Senior (no "busco trabajo")
- ✅ **Casos de Estudio: Enfoque Arquitectura y Decisiones**
  - **Trade-offs OBLIGATORIOS** (ventajas/desventajas de cada decisión)
  - Tono: Análisis de ingeniería (NO tutorial)
  - Alternativas descartadas con justificación
- ✅ Métricas de impacto cuantificables
- ✅ Mercado objetivo: LATAM y España
- 🎯 **CTA con Formulario de Calificación OBLIGATORIO:**
  - Botón CTA → Formulario Filtro → Calendly (solo si califica)
  - Prohibido link directo a Calendly sin filtro

**Prioridad:** 🟡 IMPORTANTE - Revisar en code review

---

## 🚨 Reglas Críticas (No Negociables)

### 1. NO Tailwind CSS (Cero Tolerancia)
```bash
# Verificar que NO exista Tailwind (todas las variantes)
grep -rE "tailwindcss|tailwind|@tailwindcss" package.json && echo "❌ ERROR: Tailwind detectado"

# Verificar que NO exista tailwind.config
[ -f "tailwind.config.js" ] && echo "❌ ERROR: Config de Tailwind encontrado"
```

### 2. CSS Modules Obligatorio
Cada componente `.tsx` debe tener su `.module.css`:
```
src/components/sections/Hero/
├── Hero.tsx              ✅
└── Hero.module.css       ✅ OBLIGATORIO
```

### 3. TypeScript Estricto (Prohibido `any`)
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,  // ← BLOQUEANTE en CI/CD
    // ... todas las flags estrictas
  }
}
```

```bash
# Buscar uso prohibido de 'any'
grep -r ": any" src/ && echo "❌ ERROR: Uso de 'any' detectado - Bloquea deploy"
```

### 4. Todo en Español
```tsx
// ✅ CORRECTO
<h1>Arquitecto de Software & Especialista en IA</h1>

// ❌ PROHIBIDO
<h1>Software Architect & AI Specialist</h1>
```

---

## ✅ Validación de Reglas

### Antes de cada commit:
```bash
# 1. Verificar que NO exista Tailwind (todas las variantes)
grep -rE "tailwindcss|tailwind|@tailwindcss" package.json && echo "❌ TAILWIND DETECTADO - REMOVER" || echo "✅ OK"

# 2. Type check (BLOQUEANTE - debe pasar sin errores)
pnpm run type-check

# 3. Verificar prohibición de 'any'
grep -r ": any" src/ && echo "❌ 'any' DETECTADO - Bloquea deploy"

# 4. Lint
pnpm run lint

# 5. Verificar estructura de archivos CSS
find src/components -name "*.tsx" | while read file; do
  module_css="${file%.tsx}.module.css"
  [ ! -f "$module_css" ] && echo "⚠️  MISSING: $module_css"
done

# 6. Verificar formulario de calificación vinculado a CTAs
grep -r "formulario-calificacion\|QualificationForm" src/ || echo "⚠️  ADVERTENCIA: Formulario no encontrado"
```

### Antes de merge (code review):
- [ ] NO se usa Tailwind CSS en ninguna parte
- [ ] Todos los componentes tienen `.module.css`
- [ ] TypeScript compile sin errores ni warnings
- [ ] Contenido en español profesional
- [ ] Tono de consultor senior (no "busco trabajo")
- [ ] Métricas cuantificables en casos de estudio

---

## 🛠️ Setup del Proyecto

### Dependencias PERMITIDAS (Mínimas):
```json
{
  "dependencies": {
    "next": "latest",           // ✅ Framework principal
    "react": "latest",          // ✅ React
    "react-dom": "latest"       // ✅ React DOM
    // Agregar SOLO cuando justificado por plan de desarrollo
  },
  "devDependencies": {
    "typescript": "latest",     // ✅ TypeScript
    "eslint": "latest",         // ✅ Linter
    "prettier": "latest"        // ✅ Formatter
  }
}
```

### Dependencias PROHIBIDAS:
```json
{
  "dependencies": {
    "tailwindcss": "x.x",          // ❌ PROHIBIDO
    "@mui/material": "x.x",        // ❌ PROHIBIDO
    "styled-components": "x.x",    // ❌ PROHIBIDO
    "@emotion/react": "x.x",       // ❌ PROHIBIDO
    "antd": "x.x",                 // ❌ PROHIBIDO
    "@chakra-ui/react": "x.x"      // ❌ PROHIBIDO
  }
}
```

---

## 📚 Recursos

### CSS Modules
- [CSS Modules Documentation](https://github.com/css-modules/css-modules)
- [Next.js CSS Modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules)

### Next.js App Router
- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

### TypeScript Strict
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React + TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

---

## 🔄 Proceso de Excepciones

Si excepcionalmente necesitas violar una regla:

1. **Documentar en código:**
```typescript
// @rule-exception: css-architecture/css-modules-only
// Razón: Valor dinámico calculado en runtime que no se puede resolver en CSS
const dynamicStyle = { transform: `translateX(${x}px)` };
```

2. **Obtener aprobación en code review**

3. **Actualizar documentación si es necesario**

**Nota:** Las reglas sobre Tailwind CSS NO tienen excepciones.

---

## 📝 Contribuir

Al agregar nuevas reglas:

1. Seguir el formato estándar (ver archivos existentes)
2. Incluir ejemplos correctos e incorrectos
3. Especificar detección automática (ESLint, TypeScript, etc.)
4. Documentar excepciones permitidas
5. Actualizar este README

---

**Última actualización:** 2026-02-02

**Mantenedor:** Diego Gauto
