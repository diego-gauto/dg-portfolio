# Content Guidelines - Reglas OBLIGATORIAS

> [!IMPORTANT]
> Estas reglas son **OBLIGATORIAS** para todo el contenido del portfolio.

## Objetivo

Establecer estándares de contenido, idioma y tono para el portfolio de consultoría técnica senior de Diego Gauto.

---

## Reglas de Idioma

### [OBLIGATORIO] Regla 1: Español Profesional Exclusivamente

**ID:** `content/spanish-only`

**Descripción:**
Todo el contenido del sitio debe estar en **Español profesional** (neutro, estándar LATAM/España). No usar inglés excepto para términos técnicos sin traducción adecuada.

**Razón:**
- Mercado objetivo es LATAM y España
- Mejor conexión con audiencia local
- SEO optimizado para búsquedas en español

**Ejemplo Correcto:**
```tsx
// Hero.tsx
<h1>Arquitecto de Software & Especialista en IA</h1>
<p>
  Diseño sistemas escalables y soluciones de IA que resuelven 
  problemas reales de negocio.
</p>
```

**Ejemplo Incorrecto:**
```tsx
// ❌ PROHIBIDO - No usar inglés
<h1>Software Architect & AI Specialist</h1>
<p>
  I design scalable systems and AI solutions that solve real 
  business problems.
</p>
```

**Términos Técnicos Permitidos en Inglés:**
- Stack técnico: Python, Node.js, TypeScript, LangChain, RAG, OpenAI API
- Conceptos sin traducción estándar: Agentic Workflows, Microservicios, Event-Driven
- GitHub, LinkedIn, etc. (nombres propios)

**Detección:**
- [ ] Code review manual
- [ ] Spell checker configurado para español

**Excepciones Permitidas:**
- Código de ejemplo (puede estar en inglés si es convención estándar)
- URLs y slugs (pueden usar inglés para SEO internacional)

---

### [OBLIGATORIO] Regla 2: Tono de Consultor Senior

**ID:** `content/consultant-tone`

**Descripción:**
El tono debe ser de **consultor técnico senior** que ofrece soluciones, NO de candidato que busca trabajo.

**Razón:**
- Posicionamiento de autoridad y expertise
- Atraer clientes de consultoría, no empleadores
- Diferenciación vs portfolios genéricos

**Ejemplo Correcto:**
```tsx
// Contact.tsx
<h2>¿Listo para Escalar tu Arquitectura?</h2>
<p>
  Ofrezco consultoría técnica senior en arquitectura de software 
  e implementación de IA para empresas de tecnología.
</p>
<p>
  Servicios:
  • Revisión de arquitectura existente
  • Diseño de soluciones escalables con IA
  • Implementación de Agentic Workflows
  • Migración de monolitos a microservicios
</p>
<button>Agendar Reunión Técnica</button>
```

**Ejemplo Incorrecto:**
```tsx
// ❌ PROHIBIDO - Tono de "busco trabajo"
<h2>Contáctame</h2>
<p>
  Estoy buscando oportunidades como arquitecto de software.
  Si tu empresa necesita un desarrollador...
</p>
<button>Enviar CV</button>
```

**Palabras Clave a Usar:**
- ✅ "Ofrezco", "Consultoría", "Soluciones", "Expertise", "Experiencia"
- ✅ "Diseño", "Implemento", "Optimizo", "Escalo"
- ✅ "Agendar reunión técnica", "Conversemos sobre tu proyecto"

**Palabras Clave a Evitar:**
- ❌ "Busco", "Necesito", "Candidato", "Aplicar"
- ❌ "Hire me", "Descargar CV", "Postulación"

**Detección:**
- [ ] Code review manual del contenido
- [ ] Revisar CTAs y headlines

---

### [OBLIGATORIO] Regla 3: Enfoque en Casos de Estudio de Arquitectura

**ID:** `content/architecture-case-studies`

**Descripción:**
La sección de proyectos debe presentar **Casos de Estudio de Arquitectura**, NO galería de screenshots o apps terminadas.

**Razón:**
- Demostrar cómo Diego piensa como arquitecto
- Mostrar proceso de toma de decisiones
- Enfocarse en arquitectura, no en UI/UX

**Ejemplo Correcto:**
```typescript
// data/case-studies.ts
export const caseStudies: CaseStudy[] = [
  {
    id: 'agentic-platform',
    title: 'Plataforma de Automatización con Agentes de IA',
    tagline: 'Reducción de 70% en tiempo de aprobaciones con LangGraph',
    businessContext: {
      industry: 'SaaS B2B',
      companySize: '30 empleados',
      challenge: 'Reducir intervención manual en procesos de aprobación que causaban cuello de botella en el crecimiento.'
    },
    technicalChallenge: {
      problem: 'Sistema legacy requería aprobación manual para cada operación crítica, limitando escalabilidad.',
      constraints: [
        'Budget limitado ($20K)',
        'Timeline de 6 semanas',
        'Integración con sistemas existentes'
      ],
      requirements: [
        'Mantener compliance regulatorio',
        'Auditabilidad completa',
        'Fallback manual si IA falla'
      ]
    },
    solution: {
      approach: 'Implementación de Agentic Workflow con LangGraph, permitiendo orquestación de agentes especializados con estado persistente.',
      architectureDiagram: '/images/case-studies/agentic-platform-architecture.svg',
      keyDecisions: [
        {
          decision: 'LangGraph vs AutoGPT',
          rationale: 'LangGraph permite control granular del estado y mejor debugging. AutoGPT es más autónomo pero menos predecible.',
          alternatives: 'Consideramos AutoGPT y CrewAI, descartados por falta de control sobre el flujo.'
        },
        {
          decision: 'RAG sobre knowledge base vs Fine-tuning',
          rationale: 'RAG permite actualización en tiempo real de reglas de negocio sin reentrenamiento. Más flexible y económico.',
          alternatives: 'Fine-tuning de GPT-3.5 descartado por costo y rigidez.'
        }
      ],
      techStack: ['Python', 'LangChain', 'LangGraph', 'OpenAI API', 'Pinecone', 'FastAPI', 'PostgreSQL']
    },
    impact: {
      metrics: [
        {
          metric: '70% reducción en tiempo de aprobaciones',
          description: 'De 48 horas promedio a 14 horas'
        },
        {
          metric: '95% de casos resueltos sin intervención humana',
          description: '5% de casos complejos escalados a humanos'
        },
        {
          metric: '$50K ahorro anual en costos operativos',
          description: 'Reducción de headcount necesario'
        }
      ],
      businessOutcome: 'Habilitó escalamiento del negocio de 100 a 500 clientes sin aumentar equipo de operaciones.'
    },
    year: 2024,
    featured: true,
    tags: ['LangGraph', 'RAG', 'Agentic Workflows', 'IA en Producción']
  }
];
```

**Ejemplo Incorrecto:**
```typescript
// ❌ PROHIBIDO - No solo describir la app
{
  id: 'todo-app',
  title: 'Todo App con React',
  description: 'Una app de tareas construida con React y TypeScript',
  image: '/projects/todo-app-screenshot.png',
  github: 'https://github.com/diego/todo-app',
  demo: 'https://todo-app.vercel.app'
}
```

**Detección:**
- [ ] Code review de `data/case-studies.ts`
- [ ] Verificar que cada caso incluya: Contexto, Desafío, Solución, Decisiones, Impacto

---

### [OBLIGATORIO] Regla 4: Métricas de Impacto Cuantificables

**ID:** `content/quantifiable-metrics`

**Descripción:**
Todos los casos de estudio deben incluir **métricas de impacto cuantificables** (porcentajes, números concretos).

**Razón:**
- Credibilidad técnica
- Demuestra impacto real de negocio
- Diferenciación vs portfolios genéricos

**Ejemplo Correcto:**
```typescript
impact: {
  metrics: [
    {
      metric: '50% reducción de latencia p95',
      description: 'De 800ms a 400ms en endpoints críticos'
    },
    {
      metric: '3x mejora en deployment frequency',
      description: 'De 1 deploy/semana a 3 deploys/día'
    }
  ]
}
```

**Ejemplo Incorrecto:**
```typescript
// ❌ PROHIBIDO - No usar métricas vagas
impact: {
  description: 'Mejoró significativamente el performance del sistema'
}
```

**Detección:**
- [ ] Code review manual
- [ ] Verificar que cada caso tenga al menos 2 métricas cuantificables

---

### [OBLIGATORIO] Regla 5: Perfiles de Usuario LATAM/España

**ID:** `content/latam-spain-personas`

**Descripción:**
Todos los perfiles de usuario (personas) deben reflejar el mercado de **LATAM y España**, no EE.UU./Europa.

**Razón:**
- Alineación con mercado objetivo
- Ubicaciones geográficas correctas
- Contexto cultural apropiado

**Ejemplo Correcto:**
```markdown
### Perfil 1: CTO de Startup en Crecimiento (LATAM/España)

**Demografía:**
- Ubicación: Buenos Aires, Ciudad de México, Santiago, Madrid, Barcelona
- Empresa: Startup Serie A-B (20-100 empleados)
```

**Ejemplo Incorrecto:**
```markdown
// ❌ PROHIBIDO - No usar ubicaciones de EE.UU./Europa
**Demografía:**
- Ubicación: San Francisco, Nueva York, Londres
```

**Detección:**
- [ ] Code review del PRD y contenido

---

## Reglas de SEO

### [OBLIGATORIO] Regla 6: Keywords en Español

**ID:** `content/spanish-keywords`

**Descripción:**
Todos los meta tags, títulos y descripciones deben usar **keywords en español** optimizadas para LATAM/España.

**Razón:**
- SEO optimizado para búsquedas locales
- Mejor ranking en Google.es, Google.mx, etc.

**Ejemplo Correcto:**
```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: 'Diego Gauto - Arquitecto de Software & Especialista en IA',
  description: 'Consultoría técnica senior en arquitectura de software e implementación de IA para empresas de tecnología en LATAM y España.',
  keywords: [
    'Arquitecto de Software LATAM',
    'Especialista IA España',
    'Consultoría Arquitectura Software',
    'LangChain Consultor',
    'RAG Implementación',
    'Agentic Workflows LATAM'
  ]
};
```

**Ejemplo Incorrecto:**
```typescript
// ❌ PROHIBIDO - No usar keywords en inglés
keywords: [
  'Software Architect',
  'AI Specialist',
  'LangChain Consultant'
]
```

**Detección:**
- [ ] Verificar metadata en `app/layout.tsx`
- [ ] Google Search Console: verificar keywords indexadas

---

## Reglas de CTAs

### [OBLIGATORIO] Regla 7: CTA Enfocado en Consultoría

**ID:** `content/consultation-cta`

**Descripción:**
El CTA principal debe ser **"Agendar Reunión Técnica"**, pero debe dirigir primero al **Formulario de Calificación Técnica** antes de permitir acceso a Calendly.

**Razón:**
- Posicionamiento como consultor senior
- Filtrar leads cualificados
- Optimizar tiempo de consultoría
- Mayor valor percibido

**Flujo OBLIGATORIO:**
```
Botón CTA "Agendar Reunión Técnica" 
  → Formulario de Calificación (Filtro)
    → Calendly (Solo si califica)
```

**Ejemplo Correcto:**
```tsx
// Contact.tsx
<button onClick={openQualificationForm}>
  Agendar Reunión Técnica
</button>

// Flujo:
// 1. Click en botón → Abre modal/sección con formulario
// 2. Usuario completa formulario (empresa, rol, reto técnico, presupuesto)
// 3. Envío formulario → Redirige a Calendly con datos pre-poblados
// 4. Alternativas: LinkedIn directo, Email (sin formulario)
```

**Alternativas sin Formulario:**
```tsx
<button>Conectar en LinkedIn</button>
<a href="mailto:diego@example.com">Enviar Email</a>
```

**Ejemplo Incorrecto:**
```tsx
// ❌ PROHIBIDO - Link directo a Calendly sin filtro
<a href="https://calendly.com/diego">Agendar Reunión</a>

// ❌ PROHIBIDO
<button>Descargar CV</button>
<button>Hire Me</button>
<button>Aplicar</button>
```

**Detección:**
- [ ] Code review de componentes de CTA
- [ ] Verificar que botón principal abra formulario de calificación
- [ ] Validar que Calendly NO sea accesible directamente sin formulario

---

### [OBLIGATORIO] Regla 8: Casos de Estudio - Enfoque Arquitectura y Decisiones

**ID:** `content/case-study-architecture-focus`

**Descripción:**
Los Casos de Estudio deben enfocarse en **Arquitectura y Decisiones de Ingeniería**, NO en descripciones tipo tutorial.

**Razón:**
- Demostrar pensamiento arquitectónico senior
- Mostrar criterio de evaluación de trade-offs
- Diferenciación vs portfolios junior
- Atraer clientes que necesitan consultoría de arquitectura

**OBLIGATORIO - Incluir Sección de Trade-offs:**
Cada caso de estudio DEBE incluir una sección explícita de "Trade-offs" que documente:
- Qué se eligió y por qué
- Qué alternativas se consideraron
- Qué se descartó y por qué
- Ventajas y desventajas de la decisión tomada

**Tono OBLIGATORIO:**
- ✅ Análisis de ingeniería (objetivo, técnico, evaluativo)
- ❌ NO tono descriptivo de tutorial (paso a paso, instructivo)

**Ejemplo Correcto - Análisis de Ingeniería:**
```typescript
keyDecisions: [
  {
    decision: 'PostgreSQL vs MongoDB para almacenamiento de sesiones de agentes',
    chosen: 'PostgreSQL',
    rationale: 'Requerimientos de transaccionalidad y consistencia strong para auditabilidad regulatoria.',
    tradeoffs: {
      advantages: [
        'ACID compliance garantizado',
        'Queries complejas con SQL estándar',
        'Soporte nativo de JSON para flexibilidad'
      ],
      disadvantages: [
        'Escalabilidad horizontal más compleja que Mongo',
        'Schema migrations requieren planificación'
      ]
    },
    alternatives: [
      {
        option: 'MongoDB',
        reason_discarded: 'Eventual consistency no aceptable para compliance. Riesgo de pérdida de datos en replica set failures.'
      },
      {
        option: 'DynamoDB',
        reason_discarded: 'Vendor lock-in y costo predictivo más alto. Queries complejas limitadas.'
      }
    ]
  },
  {
    decision: 'LangGraph vs LangChain Expression Language (LCEL)',
    chosen: 'LangGraph',
    rationale: 'Necesidad de estado persistente entre pasos del workflow y capacidad de branches condicionales complejos.',
    tradeoffs: {
      advantages: [
        'Control granular del flujo con grafo de estados',
        'Debugging superior con visualización de grafo',
        'Manejo de estados complejos built-in'
      ],
      disadvantages: [
        'Curva de aprendizaje más pronunciada',
        'Boilerplate adicional vs LCEL',
        'Comunidad más pequeña (menos ejemplos)'
      ]
    },
    alternatives: [
      {
        option: 'LCEL (LangChain Expression Language)',
        reason_discarded: 'Limitado para workflows con múltiples estados persistentes. Difícil implementar lógica condicional compleja.'
      }
    ]
  }
]
```

**Ejemplo Incorrecto - Tono Tutorial:**
```typescript
// ❌ PROHIBIDO - Tono descriptivo/tutorial
{
  description: 'Primero instalamos LangChain con npm install langchain. 
                Luego creamos un agente siguiendo la documentación oficial.
                El agente procesa las solicitudes y devuelve resultados.'
}

// ❌ PROHIBIDO - Sin trade-offs
{
  decision: 'Usamos PostgreSQL',
  rationale: 'Es una buena base de datos relacional'
  // Falta: alternativas consideradas, trade-offs, análisis de desventajas
}
```

**Estructura Mínima Obligatoria por Caso:**
1. ✅ Contexto de Negocio
2. ✅ Reto Técnico (problema específico, restricciones)
3. ✅ **Decisiones de Arquitectura** (mínimo 2-3 decisiones)
   - Decisión tomada
   - **Trade-offs** (ventajas/desventajas)
   - Alternativas descartadas con justificación
4. ✅ Implementación de IA (si aplica)
5. ✅ Resultados de Negocio (métricas cuantificables)

**Detección:**
- [ ] Code review de `data/case-studies.ts`
- [ ] Verificar que cada decisión tenga sección `tradeoffs`
- [ ] Verificar tono: análisis vs tutorial
- [ ] Verificar mínimo 2 alternativas descartadas documentadas

---

## Validación

Para verificar el cumplimiento de estas reglas:

```bash
# Spell check en español
npx cspell "**/*.{ts,tsx,md}" --config .cspell.json

# Buscar términos prohibidos
grep -r "hire me\|busco trabajo\|candidato" src/ && echo "ERROR: Tono incorrecto"

# Verificar idioma en metadata
grep -A 10 "export const metadata" src/app/layout.tsx

# Verificar integración de formulario de calificación con CTAs
grep -r "formulario-calificacion\|QualificationForm" src/ || echo "ADVERTENCIA: Formulario de calificación no encontrado"

# Verificar que casos de estudio incluyan trade-offs
grep -A 5 "tradeoffs" src/data/case-studies.ts || echo "ERROR: Falta sección de trade-offs en casos de estudio"
```

---

## Referencias

- [Guía de Estilo de Español Profesional](https://www.fundeu.es/)
- [SEO para LATAM - Google Search Central](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
