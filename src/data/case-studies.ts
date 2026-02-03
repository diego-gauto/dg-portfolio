import { CaseStudy } from '@/types/case-study';

export const caseStudies: CaseStudy[] = [
  {
    id: 'rag-knowledge-system',
    slug: 'sistema-rag-langgraph-enterprise',
    title: 'Sistema RAG Empresarial con LangGraph',
    summary: 'Arquitectura de agentes autónomos para consulta documental técnica, reduciendo el tiempo de búsqueda en un 70%.',
    publishDate: '2024-02-15',
    featured: true,
    businessContext: {
      industry: 'LegalTech',
      clientSize: 'Enterprise (500+ empleados)',
      problem: 'Ineficiencia crítica en la recuperación de precedentes legales y documentación interna dispersa en silos (SharePoint, GDrive, PDFs Legacy).',
    },
    technicalChallenge: {
      description: 'Orquestar múltiples fuentes de datos no estructurados con alta precisión semántica y trazabilidad completa de las fuentes.',
      constraints: [
        'Privacidad de datos estricta (GDPR)',
        'Latencia de respuesta < 2s',
        'Cero alucinaciones toleradas en citas legales'
      ],
    },
    decisions: [
      {
        title: 'Arquitectura Agéntica vs RAG Lineal',
        rationale: 'Se implementó un grafo de agentes (LangGraph) para permitir razonamiento iterativo y self-correction, superando las limitaciones de un pipeline RAG lineal tradicional.',
        tradeOffs: {
          pros: [
            'Capacidad de descomponer preguntas complejas en sub-tareas',
            'Mecanismos de re-intento y validación de respuestas',
            'Estado persistente para conversaciones multi-turno'
          ],
          cons: [
            'Mayor complejidad de implementación y debugging',
            'Latencia ligeramente superior debido a múltiples llamadas LLM',
            'Costo de inferencia más alto'
          ]
        },
        alternativesDiscarded: [
          {
            option: 'RAG Simple (Chain)',
            reason: 'Incapaz de manejar preguntas ambiguas o que requieren múltiples pasos de razonamiento.'
          }
        ]
      },
      {
        title: 'Vector Database Híbrida (Pinecone + Keyword Search)',
        rationale: 'Combinación de búsqueda semántica (dense) con búsqueda por palabras clave (sparse/BM25) para maximizar recall en términos legales específicos.',
        tradeOffs: {
          pros: [
            'Recuperación precisa de terminología técnica exacta',
            'Mejor manejo de documentos largos'
          ],
          cons: [
            'Gestión de doble índice',
            'Complejidad en el algoritmo de re-ranking'
          ]
        },
        alternativesDiscarded: [
          {
            option: 'Solo Búsqueda Semántica',
            reason: 'Falla al distinguir matices legales sutiles y nombres propios específicos.'
          }
        ]
      }
    ],
    metrics: [
      {
        label: 'Reducción en Tiempo de Investigación',
        value: '70%',
        description: 'De 4 horas promedio a 1.2 horas por caso'
      },
      {
        label: 'Precisión de Citas',
        value: '99.5%',
        description: 'Verificado mediante auditoría manual de 500 consultas'
      }
    ],
    stack: ['Python', 'LangChain', 'LangGraph', 'Pinecone', 'OpenAI API', 'FastAPI', 'React']
  },
  {
    id: 'event-driven-migration',
    slug: 'migracion-arquitectura-eventos',
    title: 'Migración a Arquitectura Event-Driven',
    summary: 'Desacoplamiento de monolito legacy hacia microservicios asíncronos para escalar transacciones financieras.',
    publishDate: '2023-11-10',
    featured: true,
    businessContext: {
      industry: 'Fintech',
      clientSize: 'Scale-up (Serie B)',
      problem: 'Cuellos de botella en procesamiento de pagos durante picos de tráfico (Black Friday), causando pérdidas de ingresos.',
    },
    technicalChallenge: {
      description: 'Migrar un núcleo transaccional síncrono crítico a un modelo asíncrono sin tiempo de inactividad (Zero Downtime Migration).',
      constraints: [
        'Consistencia eventual no permitida en saldos',
        'Compatibilidad con sistemas legacy bancarios',
        'Observabilidad distribuida obligatoria'
      ],
    },
    decisions: [
      {
        title: 'Kafka como Backbone de Eventos',
        rationale: 'Adopción de Apache Kafka para manejar alto throughput y garantizar orden de eventos, crítico para transacciones financieras.',
        tradeOffs: {
          pros: [
            'Alta durabilidad y replayability de eventos',
            'Escalabilidad masiva para picos de carga',
            'Desacoplamiento real de productores y consumidores'
          ],
          cons: [
            'Complejidad operativa (infraestructura Kafka)',
            'Curva de aprendizaje del equipo'
          ]
        },
        alternativesDiscarded: [
          {
            option: 'RabbitMQ',
            reason: 'Menor capacidad de retención y replay de eventos históricos necesarios para auditoría.'
          }
        ]
      },
      {
        title: 'Patrón Strangler Fig para Migración',
        rationale: 'Migración gradual de funcionalidades extrayendo microservicios del borde hacia el núcleo, minimizando riesgo operativo.',
        tradeOffs: {
          pros: [
            'Reducción drástica del riesgo de "Big Bang"',
            'Entrega de valor continuo durante la migración'
          ],
          cons: [
            'Mantenimiento temporal de código duplicado',
            'Complejidad en el enrutamiento de tráfico (API Gateway)'
          ]
        },
        alternativesDiscarded: [
          {
            option: 'Reescritura Completa (Big Bang)',
            reason: 'Riesgo inaceptable de negocio y tiempo de market demasiado largo.'
          }
        ]
      }
    ],
    metrics: [
      {
        label: 'Capacidad de Procesamiento',
        value: '10x',
        description: 'Aumento de 500 a 5,000 TPS estables'
      },
      {
        label: 'Uptime en Picos',
        value: '99.99%',
        description: 'Cero caídas durante el último Black Friday'
      }
    ],
    stack: ['Go', 'Apache Kafka', 'PostgreSQL', 'Kubernetes', 'gRPC', 'Prometheus']
  }
];
