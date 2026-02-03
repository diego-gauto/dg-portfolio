# Tech Stack - Reglas OBLIGATORIAS

> [!IMPORTANT]
> Este archivo define el **stack técnico oficial** del proyecto. Cualquier dependencia no listada aquí debe ser aprobada antes de instalarse.

## Objetivo

Definir explícitamente qué tecnologías están **PERMITIDAS** y **PROHIBIDAS**, manteniendo el proyecto minimalista y enfocado. Las dependencias se agregan **SOLO cuando son necesarias según el plan de desarrollo**, no de forma anticipada.

---

## 📦 Dependencias BÁSICAS (Inicio del Proyecto)

### Core Framework (OBLIGATORIAS)
```json
{
  "next": "latest",        // ✅ Framework principal (SIEMPRE última versión estable)
  "react": "latest",       // ✅ React (SIEMPRE última versión estable)
  "react-dom": "latest"    // ✅ React DOM (SIEMPRE última versión estable)
}
```

**Regla Crítica:** 
- **NUNCA anclar versiones específicas** (ej: `"^15.1.0"`, `"^19.0.0"`)
- **SIEMPRE usar "latest"** o dejar que el gestor de paquetes instale la última estable
- Actualizar regularmente con `pnpm update`

### DevDependencies Básicas (OBLIGATORIAS)
```json
{
  "typescript": "latest",                          // ✅ TypeScript
  "@types/node": "latest",                         // ✅ Types de Node.js
  "@types/react": "latest",                        // ✅ Types de React
  "@types/react-dom": "latest",                    // ✅ Types de React DOM
  "eslint": "latest",                              // ✅ Linter
  "eslint-config-next": "latest",                  // ✅ Config ESLint Next.js  
  "prettier": "latest",                            // ✅ Formateador
  "@typescript-eslint/parser": "latest",           // ✅ Parser TS para ESLint
  "@typescript-eslint/eslint-plugin": "latest"     // ✅ Plugin TS para ESLint
}
```

---

## 🔍 Proceso para Agregar Nuevas Dependencias

**Antes de instalar CUALQUIER dependencia adicional**, el agente debe:

### 1. Evaluar Necesidad Real
- ¿Qué problema específico resuelve?
- ¿Por qué la solución nativa/built-in no es suficiente?
- ¿Cuál es el bundle size impact?
- ¿Es realmente necesaria AHORA o puede implementarse custom?

### 2. Criterios de Evaluación
- [ ] Bundle size < 50KB (gzipped)
- [ ] Activamente mantenida (commit en últimos 6 meses)
- [ ] No duplica funcionalidad existente o nativa
- [ ] Compatible con Next.js App Router
- [ ] TypeScript support nativo

### 3. Explorar Alternativas Nativas
- ¿Se puede implementar custom en < 100 líneas?
- ¿Existe API nativa del navegador/Next.js que resuelva esto?
- ¿Existe alternativa más ligera?

### 4. Documentar Decisión
- Agregar justificación en este archivo
- Actualizar `package.json`
- Especificar uso permitido y restricciones

---

## ❌ Dependencias PROHIBIDAS (Blacklist)

### CSS Frameworks / Utilidades
```json
{
  "tailwindcss": "❌ PROHIBIDO",              // NO usar Tailwind CSS
  "unocss": "❌ PROHIBIDO",                   // NO usar UnoCSS
  "windicss": "❌ PROHIBIDO",                 // NO usar Windi CSS
  "twind": "❌ PROHIBIDO",                    // NO usar Twind
  "styled-components": "❌ PROHIBIDO",        // NO usar CSS-in-JS
  "@emotion/react": "❌ PROHIBIDO",           // NO usar Emotion
  "@emotion/styled": "❌ PROHIBIDO",          // NO usar Emotion
  "styled-jsx": "❌ PROHIBIDO",               // NO usar styled-jsx
  "@vanilla-extract/css": "❌ PROHIBIDO",     // NO usar Vanilla Extract
  "linaria": "❌ PROHIBIDO"                   // NO usar Linaria
}
```

**Razón:**
- El proyecto usa **CSS Modules exclusivamente**
- **Tailwind CSS:** Garantizar control total sobre el diseño y optimización extrema del bundle
- Ver reglas en `css-architecture.md`

---

### UI Component Libraries
```json
{
  "@mui/material": "❌ PROHIBIDO",            // NO usar Material-UI
  "antd": "❌ PROHIBIDO",                     // NO usar Ant Design
  "@chakra-ui/react": "❌ PROHIBIDO",         // NO usar Chakra UI
  "react-bootstrap": "❌ PROHIBIDO",          // NO usar React Bootstrap
  "semantic-ui-react": "❌ PROHIBIDO",        // NO usar Semantic UI
  "mantine": "❌ PROHIBIDO",                  // NO usar Mantine
  "@nextui-org/react": "❌ PROHIBIDO"         // NO usar NextUI
}
```

**Razón:**
- Componentes custom con CSS Modules
- Control total sobre diseño y performance
- Bundle size optimizado

---

### State Management (NO necesario para este proyecto)
```json
{
  "redux": "❌ NO NECESARIO",                 // Proyecto no requiere Redux
  "@reduxjs/toolkit": "❌ NO NECESARIO",      // Proyecto no requiere Redux
  "zustand": "❌ NO NECESARIO",               // Proyecto no requiere state global
  "jotai": "❌ NO NECESARIO",                 // Proyecto no requiere state global
  "recoil": "❌ NO NECESARIO",                // Proyecto no requiere state global
  "mobx": "❌ NO NECESARIO"                   // Proyecto no requiere state global
}
```

**Razón:**
- Portfolio estático, sin estado global complejo
- React Context API suficiente (si se necesita dark mode)
- Server Components manejan data fetching

---

### Data Fetching (NO necesario para este proyecto)
```json
{
  "@tanstack/react-query": "❌ NO NECESARIO", // Proyecto no tiene API calls
  "swr": "❌ NO NECESARIO",                   // Proyecto no tiene API calls
  "axios": "❌ NO NECESARIO",                 // Proyecto no tiene API calls
  "react-query": "❌ NO NECESARIO"            // Proyecto no tiene API calls
}
```

**Razón:**
- Portfolio estático (SSG), sin llamadas a APIs
- Contenido definido en archivos TypeScript (`data/`)

---

### Form Libraries (NO necesario para este proyecto)
```json
{
  "react-hook-form": "❌ NO NECESARIO",       // Proyecto no tiene formularios
  "formik": "❌ NO NECESARIO",                // Proyecto no tiene formularios
  "react-final-form": "❌ NO NECESARIO"       // Proyecto no tiene formularios
}
```

**Razón:**
- Portfolio sin formularios complejos
- CTA es link directo (Calendly, LinkedIn)

---

### SEO Libraries (NO necesario)
```json
{
  "next-seo": "❌ NO NECESARIO"               // Usar Metadata API nativa
}
```

**Razón:**
- Next.js tiene Metadata API nativa
- Ver reglas en `frontend-architecture.md`

---

### Testing (Futuro, post-MVP)
```json
{
  "vitest": "⏳ FUTURO",                      // Agregar post-MVP
  "@testing-library/react": "⏳ FUTURO",      // Agregar post-MVP
  "playwright": "⏳ FUTURO"                   // Agregar post-MVP
}
```

**Razón:**
- Priorizar MVP funcional primero
- Agregar tests en fase de refinamiento

---

## 📋 Stack Inicial (Comando de Instalación)

### Instalación Básica
```bash
# Crear proyecto Next.js
pnpm create next-app@latest ./ --typescript --eslint --app --src-dir --no-tailwind

# Instalar Prettier
pnpm add -D prettier

# Configurar TypeScript plugins para ESLint
pnpm add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

**Dependencias resultantes:**
- `next` (latest)
- `react` (latest)
- `react-dom` (latest)
- `typescript` (latest)
- `eslint` + plugins (latest)
- `prettier` (latest)

**Total:** ~3 deps producción, ~6-8 desarrollo

---

## 🔍 Proceso de Aprobación para Nuevas Dependencias

Antes de instalar **cualquier dependencia adicional**:

### 1. Justificación Requerida
- ¿Qué problema específico resuelve?
- ¿Por qué la solución nativa no es suficiente?
- ¿Cuál es el bundle size impact?
- ¿Es realmente necesaria AHORA o puede esperar?

### 2. Evaluación
- [ ] Bundle size < 50KB (gzipped)
- [ ] Activamente mantenida (commit en últimos 6 meses)
- [ ] No duplica funcionalidad existente o nativa
- [ ] Compatible con Next.js App Router
- [ ] TypeScript support nativo

### 3. Alternativas Nativas
- ¿Se puede implementar custom en < 100 líneas?
- ¿Existe API nativa del navegador/Next.js?
- ¿Existe alternativa más ligera?

### 4. Aprobación
- Documentar decisión en este archivo
- Actualizar `package.json`
- Mover de "PENDIENTE" a "PERMITIDAS"

---

## 🚫 Reglas de Instalación

### ❌ PROHIBIDO
```bash
# NO instalar dependencias sin revisar este archivo primero
pnpm add <cualquier-paquete>
```

### ✅ PROCESO CORRECTO
```bash
# 1. Consultar este archivo
# 2. Si está en BÁSICAS → Instalar
pnpm add next react react-dom

# 3. Si está en PENDIENTE → Justificar necesidad según plan de desarrollo
# 4. Si está en PROHIBIDAS → RECHAZAR inmediatamente
# 5. Si NO está listada → Justificar y documentar
```

---

## 📊 Métricas de Success

### Bundle Size (objetivo)
- Initial JS: < 100KB (gzipped)
- CSS: < 50KB (gzipped)
- Total Page Size: < 500KB

### Performance (objetivo)
- Lighthouse Performance: **98-100 (obligatorio)**
- Time to Interactive (TTI): **< 1.8s**
- First Contentful Paint (FCP): **< 0.8s**

**Verificación:**
```bash
pnpm run build
# Revisar output en terminal
```

---

## 🔄 Actualización de Dependencias

### Política de Versiones
- **SIEMPRE usar "latest"** en instalación inicial
- **NO anclar versiones** a menos que haya breaking change crítico

### Comando de Actualización
```bash
# Ver dependencias desactualizadas
pnpm outdated

# Actualizar todas a última versión
pnpm update --latest

# Actualizar específica
pnpm update <package>@latest
```

### Frecuencia
- **Semanal:** Revisar actualizaciones disponibles
- **Mensual:** Ejecutar `pnpm update --latest`
- **Pre-deploy:** Siempre actualizar y re-testear

---

## ✅ Validación

### Script de Validación
```bash
# Verificar que NO existan dependencias prohibidas
cat package.json | grep -E "tailwindcss|@mui|antd|chakra|redux|next-seo" && \
  echo "❌ ERROR: Dependencia prohibida detectada" || \
  echo "✅ OK: No hay dependencias prohibidas"

# Contar dependencias de producción
cat package.json | jq '.dependencies | length'
# Objetivo: < 10 (empezar con ~3)

# Verificar bundle size (después de build)
pnpm run build
# Revisar output en terminal
```

---

**Última actualización:** 2026-02-02

**Mantenedor:** Diego Gauto

---

## 🔍 Proceso de Aprobación para Nuevas Dependencias

Si necesitas agregar una dependencia NO listada aquí:

### 1. Justificación Requerida
- ¿Por qué es necesaria?
- ¿Qué problema resuelve que no se puede resolver sin ella?
- ¿Cuál es el bundle size impact?

### 2. Evaluación
- [ ] Bundle size < 50KB (gzipped)
- [ ] Activamente mantenida (commit en últimos 6 meses)
- [ ] No duplica funcionalidad existente
- [ ] Compatible con Next.js 15 App Router
- [ ] TypeScript support nativo

### 3. Alternativas
- ¿Se puede implementar custom en < 100 líneas?
- ¿Existe alternativa más ligera?

### 4. Aprobación
- Documentar decisión en este archivo
- Actualizar `package.json`
- Agregar a sección "PERMITIDAS"

---

## 🚫 Reglas de Instalación

### ❌ PROHIBIDO
```bash
# NO instalar dependencias sin revisar este archivo primero
pnpm add <cualquier-paquete>
```

### ✅ PROCESO CORRECTO
```bash
# 1. Consultar este archivo
# 2. Si está en PERMITIDAS → Instalar
pnpm add framer-motion

# 3. Si NO está listada → Justificar y solicitar aprobación
# 4. Si está en PROHIBIDAS → RECHAZAR inmediatamente
```

---

## 📊 Métricas de Success

### Bundle Size (objetivo)
- Initial JS: < 100KB (gzipped)
- CSS: < 50KB (gzipped)
- Total Page Size: < 500KB

### Performance (objetivo)
- Lighthouse Performance: **98-100 (obligatorio)**
- Time to Interactive (TTI): **< 1.8s**
- First Contentful Paint (FCP): **< 0.8s**

**Verificación:**
```bash
pnpm run build
pnpm run analyze  # Si se configura bundle analyzer
```

---

## 🔄 Actualización de Dependencias

### Política
- **Patch versions** (x.x.1 → x.x.2): Auto-update semanal
- **Minor versions** (x.1.0 → x.2.0): Revisar changelog, update mensual
- **Major versions** (1.x.x → 2.x.x): Revisar breaking changes, planificar migración

### Comando
```bash
# Ver dependencias desactualizadas
pnpm outdated

# Actualizar patch + minor (seguro)
pnpm update

# Actualizar major (revisar breaking changes primero)
pnpm update <package>@latest
```

---

## 📚 Referencias

- [Next.js Dependencies](https://nextjs.org/docs/getting-started/installation)
- [Bundle Size Analyzer](https://bundlephobia.com/)
- [npm trends](https://npmtrends.com/) - Comparar popularidad de paquetes

---

## ✅ Validación

### Script de Validación
```bash
# Verificar que NO existan dependencias prohibidas (incluyendo todas las variantes de Tailwind)
cat package.json | grep -E "tailwindcss|tailwind|@tailwindcss|@mui|antd|chakra|redux|next-seo" && \
  echo "❌ ERROR: Dependencia prohibida detectada" || \
  echo "✅ OK: No hay dependencias prohibidas"

# Contar dependencias de producción
cat package.json | jq '.dependencies | length'
# Objetivo: < 10

# Verificar bundle size (después de build)
ls -lh .next/static/chunks/*.js | awk '{print $5, $9}'
```

---

**Última actualización:** 2026-02-02

**Mantenedor:** Diego Gauto
