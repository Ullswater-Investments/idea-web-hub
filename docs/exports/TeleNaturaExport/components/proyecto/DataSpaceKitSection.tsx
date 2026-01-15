import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, CheckCircle, Clock, Wrench } from "lucide-react";

const kitComponents = [
  {
    title: "Eclipse Dataspace Connector",
    description: "Conector preconfigurado para integración con el ecosistema Gaia-X y PROCUREDATA.",
    status: "Incluido",
  },
  {
    title: "Wallet Digital (SSI)",
    description: "Identidad auto-soberana para agricultores y cooperativas con credenciales verificables.",
    status: "Incluido",
  },
  {
    title: "Motor ODRL",
    description: "Políticas de uso de datos configurables: duración, propósito, restricciones geográficas.",
    status: "Incluido",
  },
  {
    title: "Adaptadores IoT",
    description: "Conectores para las principales marcas de sensores agrícolas del mercado.",
    status: "Incluido",
  },
  {
    title: "Dashboard Agricultores",
    description: "Panel de control intuitivo para gestionar consentimientos y visualizar datos.",
    status: "Incluido",
  },
  {
    title: "APIs REST/GraphQL",
    description: "Interfaces programáticas para integración con ERPs y sistemas de gestión agrícola.",
    status: "Incluido",
  },
];

const deploymentPhases = [
  {
    phase: "Fase 1",
    title: "Onboarding",
    duration: "2 semanas",
    tasks: ["Instalación de gateway", "Configuración de sensores", "Alta en el registro"],
  },
  {
    phase: "Fase 2",
    title: "Integración",
    duration: "4 semanas",
    tasks: ["Conexión con ERP", "Mapeo de datos", "Pruebas de conectividad"],
  },
  {
    phase: "Fase 3",
    title: "Producción",
    duration: "Ongoing",
    tasks: ["Monitorización 24/7", "Soporte técnico", "Actualizaciones automáticas"],
  },
];

export const DataSpaceKitSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-[hsl(var(--telenatura-green)/0.1)] text-[hsl(var(--telenatura-green))] border-[hsl(var(--telenatura-green)/0.3)]">
            <Package className="h-3 w-3 mr-1" />
            Kit Espacio de Datos
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Kit <span className="telenatura-gradient">TeleNatura-X</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Todo lo necesario para conectar tu explotación agrícola al espacio de datos federado en semanas, no meses.
          </p>
        </motion.div>

        {/* Kit Components */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-xl font-semibold mb-6 text-center">Componentes del Kit</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {kitComponents.map((component, index) => (
              <Card key={component.title} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{component.title}</CardTitle>
                    <Badge variant="secondary" className="text-xs bg-[hsl(var(--telenatura-green)/0.1)] text-[hsl(var(--telenatura-green))]">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {component.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{component.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Deployment Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold mb-6 text-center">Cronograma de Despliegue</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {deploymentPhases.map((phase, index) => (
              <Card key={phase.phase} className="relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[hsl(var(--telenatura-green))]" />
                <CardHeader>
                  <Badge variant="outline" className="w-fit mb-2">
                    {phase.phase}
                  </Badge>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Wrench className="h-4 w-4" />
                    {phase.title}
                  </CardTitle>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {phase.duration}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {phase.tasks.map((task) => (
                      <li key={task} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-[hsl(var(--telenatura-green))]" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
