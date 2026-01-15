import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MermaidDiagram } from "@/components/MermaidDiagram";

const architectureDiagram = `
graph TB
    subgraph FIELD["🌾 Campo / Parcela"]
        SENSORS["📡 Sensores IoT<br/>(Clima, Suelo, Riego)"]
        GATEWAY["🔌 Gateway<br/>Edge Computing"]
    end
    
    subgraph TELENATURA["🏢 Infraestructura TeleNatura"]
        FRONTEND["💻 Dashboard Web"]
        BACKEND["⚙️ Backend API"]
        DB["🗄️ Base de Datos<br/>Time-Series"]
    end
    
    subgraph CONNECTOR["📦 Kit Espacio de Datos"]
        EDC["🔗 Eclipse Dataspace<br/>Connector (EDC)"]
        WALLET["👛 Wallet Digital<br/>(Identity)"]
        POLICY["📋 Motor de<br/>Políticas ODRL"]
    end
    
    subgraph PROCURE["🌐 PROCUREDATA Core"]
        REGISTRY["📚 Registry de<br/>Participantes"]
        CATALOG["📂 Catálogo<br/>Federado"]
        TRUST["🛡️ Trust<br/>Framework"]
    end
    
    SENSORS --> GATEWAY
    GATEWAY --> BACKEND
    FRONTEND --> BACKEND
    BACKEND --> DB
    BACKEND <--> EDC
    EDC <--> WALLET
    EDC <--> POLICY
    EDC <--> REGISTRY
    EDC <--> CATALOG
    WALLET <--> TRUST

    style FIELD fill:#f0fdf4,stroke:#22c55e
    style TELENATURA fill:#ecfeff,stroke:#0891b2
    style CONNECTOR fill:#fef3c7,stroke:#f59e0b
    style PROCURE fill:#ede9fe,stroke:#8b5cf6
`;

const layers = [
  {
    title: "Capa de Campo",
    description: "Sensores IoT y gateways que capturan datos en tiempo real desde las parcelas agrícolas.",
    color: "bg-[hsl(var(--telenatura-green)/0.1)]",
    borderColor: "border-[hsl(var(--telenatura-green))]",
  },
  {
    title: "Infraestructura TeleNatura",
    description: "Plataforma de gestión con dashboard, APIs y base de datos temporal para análisis.",
    color: "bg-[hsl(var(--telenatura-sky)/0.1)]",
    borderColor: "border-[hsl(var(--telenatura-sky))]",
  },
  {
    title: "Kit Espacio de Datos",
    description: "Conector EDC, wallet digital e identidad y motor de políticas ODRL para gobernanza.",
    color: "bg-[hsl(var(--telenatura-earth)/0.1)]",
    borderColor: "border-[hsl(var(--telenatura-earth))]",
  },
  {
    title: "PROCUREDATA Core",
    description: "Infraestructura compartida: registro de participantes, catálogo federado y trust framework.",
    color: "bg-purple-50 dark:bg-purple-900/20",
    borderColor: "border-purple-500",
  },
];

export const ArchitectureSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-[hsl(var(--telenatura-green)/0.1)] text-[hsl(var(--telenatura-green))] border-[hsl(var(--telenatura-green)/0.3)]">
            Arquitectura Técnica
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Arquitectura <span className="telenatura-gradient">telenatura-x</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Una arquitectura de cuatro capas que conecta el campo con el ecosistema de datos europeo.
          </p>
        </motion.div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <MermaidDiagram chart={architectureDiagram} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Layer Descriptions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {layers.map((layer, index) => (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`h-full ${layer.color} border-l-4 ${layer.borderColor}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{layer.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{layer.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
