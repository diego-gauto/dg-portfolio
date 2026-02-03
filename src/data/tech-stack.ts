export interface TechItem {
  name: string;
  icon?: string; // Placeholder for icon name or path
  description: string;
}

export interface TechCategory {
  id: string;
  title: string;
  items: TechItem[];
}

export const techStack: TechCategory[] = [
  {
    id: 'architecture',
    title: 'Arquitectura & Backend',
    items: [
      { name: 'Next.js 15', description: 'Framework React de Producción (App Router, Server Actions)' },
      { name: 'Node.js', description: 'Runtime para microservicios y APIs escalables' },
      { name: 'PostgreSQL', description: 'Base de datos relacional para datos críticos' },
      { name: 'Docker/K8s', description: 'Containerización y orquestación para despliegues robustos' }
    ]
  },
  {
    id: 'ai',
    title: 'Inteligencia Artificial',
    items: [
      { name: 'LangChain / LangGraph', description: 'Orquestación de agentes autónomos y flujos complejos' },
      { name: 'RAG Systems', description: 'Recuperación Aumentada de Generación para contexto empresarial' },
      { name: 'OpenAI / Anthropic APIs', description: 'Integración avanzada de LLMs SOTA' },
      { name: 'Pinecone / Milvus', description: 'Bases de datos vectoriales para búsqueda semántica' }
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend de Élite',
    items: [
      { name: 'TypeScript', description: 'Tipado estricto para bases de código mantenibles' },
      { name: 'CSS Modules', description: 'Estilos encapsulados de alto rendimiento (Zero-Runtime)' },
      { name: 'React Server Components', description: 'Arquitectura híbrida optimizada para SEO y carga' }
    ]
  }
];
