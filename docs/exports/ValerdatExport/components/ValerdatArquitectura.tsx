import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { MermaidDiagram } from "@/components/MermaidDiagram";
import { Factory, Shield, Cog, Brain, ArrowRight } from "lucide-react";

const ValerdatArquitectura = () => {
  const architectureDiagram = `graph TD
    subgraph "Ecosistema PROCUREDATA"
        P[Proveedores Industriales] -->|1. Publican Assets| CAT[Catálogo Federado DCAT-AP]
        P -->|2. Definen ODRL| POL[Política de Uso]
    end

    subgraph "Capa de Confianza - Trust Layer"
        PX[Pontus-X Blockchain] -->|Notarización| AL[Audit Logs]
        DID[Identidad SSI] -->|Verificación KYB| VAL_ID[Identidad VALERDAT]
    end

    subgraph "Servicio a VALERDAT - Consumer"
        VAL_ID -->|3. Solicita Acceso| CAT
        CAT -->|4. Negociación Automática| POL
        
        POL -->|5. Aprobación| SC[Smart Contract]
        
        subgraph "Procesamiento Data Ops"
            RAW[Datos Crudos] -->|6. Ingesta| NORM[Raw Data Normalizer]
            NORM -->|7. Hashing/Limpieza| ANON[Anonimizador GDPR]
        end
        
        SC -->|8. Libera Token Acceso| ANON
    end

    subgraph "Cliente: VALERDAT S.L."
        ANON -->|9. Entrega Segura| IA_MOD[Módulo Data-Driven Procurement]
        IA_MOD -->|10. Output| PRED[Predicción Precios/Riesgos]
    end

    style VAL_ID fill:#3b82f6,color:#fff
    style P fill:#22c55e,color:#fff
    style ANON fill:#f59e0b,color:#fff
    style PX fill:#6366f1,color:#fff`;

  const layers = [
    {
      icon: Factory,
      title: "Ecosistema PROCUREDATA",
      description: "Proveedores industriales publican sus activos de datos en el catálogo federado con políticas ODRL definidas.",
      color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    },
    {
      icon: Shield,
      title: "Capa de Confianza",
      description: "Pontus-X blockchain notariza transacciones y DIDs verifican la identidad de VALERDAT mediante KYB.",
      color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    },
    {
      icon: Cog,
      title: "Servicio a VALERDAT",
      description: "Procesamiento Data Ops: normalización de datos crudos y anonimización GDPR antes de la entrega.",
      color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    },
    {
      icon: Brain,
      title: "Cliente VALERDAT",
      description: "Recibe datos limpios y anonimizados para su módulo de IA de predicción de precios y riesgos.",
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    },
  ];

  return (
    <section className="py-16 px-4 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Section Header */}
          <div className="mb-12">
            <p className="text-sm font-semibold text-blue-600 mb-2">02 —</p>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Arquitectura del Servicio
            </h2>
            <p className="text-muted-foreground max-w-3xl">
              Flujo de datos desde los proveedores industriales del ecosistema PROCUREDATA 
              hacia el motor de IA de VALERDAT, pasando por las capas de seguridad y gobernanza.
            </p>
          </div>

          {/* Mermaid Diagram */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Diagrama de Arquitectura</h3>
              <Badge variant="outline">Interactivo</Badge>
            </div>
            <div className="overflow-x-auto">
              <MermaidDiagram chart={architectureDiagram} />
            </div>
          </div>

          {/* Layers Legend */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {layers.map((layer, index) => (
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-xl p-4 border shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${layer.color}`}>
                    <layer.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{layer.title}</h4>
                    <p className="text-xs text-muted-foreground">{layer.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Data Flow Steps */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border">
            <h3 className="font-semibold mb-6">Flujo de Datos (10 Pasos)</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-center">
                {[
                  { step: "1-2", label: "Publicación", desc: "Assets + ODRL" },
                  { step: "3-4", label: "Solicitud", desc: "Acceso + Negociación" },
                  { step: "5", label: "Aprobación", desc: "Smart Contract" },
                  { step: "6-8", label: "Procesamiento", desc: "Normalizar + Anonimizar" },
                  { step: "9-10", label: "Entrega", desc: "IA + Predicción" },
                ].map((item, index) => (
                  <div key={item.step} className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                      <Badge variant="secondary" className="mb-2">{item.step}</Badge>
                      <p className="font-medium text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    {index < 4 && (
                      <ArrowRight className="h-4 w-4 text-muted-foreground hidden lg:block" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValerdatArquitectura;
