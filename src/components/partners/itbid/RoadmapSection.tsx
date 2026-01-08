import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { 
  Calendar, ChevronDown, FlaskConical, Rocket, Globe,
  CheckCircle2, Circle, Clock
} from "lucide-react";

const phases = [
  {
    id: 1,
    title: "Fase 1: Preparación y Sandbox",
    period: "Meses 1-4",
    progress: 100,
    status: "completed",
    icon: FlaskConical,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    tasks: [
      { label: "Análisis de brecha tecnológica", done: true },
      { label: "Despliegue de nodo EDC en entorno de pruebas", done: true },
      { label: "Definición de ontologías de datos", done: true },
      { label: "Mapeo de datos ITBID al estándar Gaia-X", done: true },
    ],
  },
  {
    id: 2,
    title: "Fase 2: PoC Certificados Verificables",
    period: "Meses 5-8",
    progress: 65,
    status: "in-progress",
    icon: Rocket,
    color: "text-primary",
    bgColor: "bg-primary/10",
    tasks: [
      { label: "Selección de 2 clientes Early Adopters", done: true },
      { label: "Selección de 10 proveedores piloto", done: true },
      { label: "Implementación validación ISO/ESG", done: false },
      { label: "Integración con Wallet SSI", done: false },
    ],
  },
  {
    id: 3,
    title: "Fase 3: Integración AVI-A y Escalamiento",
    period: "Meses 9-12",
    progress: 0,
    status: "upcoming",
    icon: Globe,
    color: "text-muted-foreground",
    bgColor: "bg-muted",
    tasks: [
      { label: "Pruebas de Federated Learning con AVI-A", done: false },
      { label: "Conexión con Hub Gaia-X España", done: false },
      { label: "Integración con Catena-X", done: false },
      { label: "Lanzamiento comercial ITBID-X Connectivity", done: false },
    ],
  },
];

export const RoadmapSection = () => {
  const [openPhases, setOpenPhases] = useState<number[]>([2]);

  const togglePhase = (id: number) => {
    setOpenPhases((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-primary" />;
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Completado</Badge>;
      case "in-progress":
        return <Badge className="bg-primary/10 text-primary border-primary/20">En Progreso</Badge>;
      default:
        return <Badge variant="secondary">Próximamente</Badge>;
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">Hoja de Ruta</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Roadmap de Implementación</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Plan de 12 meses para la transformación digital
            </p>
          </div>
        </FadeIn>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar Overview */}
          <FadeIn>
            <Card className="mb-8 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">Progreso Global</span>
                <span className="text-sm text-muted-foreground">55% completado</span>
              </div>
              <Progress value={55} className="h-3" />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-muted-foreground">Mes 1</span>
                <span className="text-xs text-muted-foreground">Mes 6</span>
                <span className="text-xs text-muted-foreground">Mes 12</span>
              </div>
            </Card>
          </FadeIn>

          {/* Phases */}
          <StaggerContainer className="space-y-4">
            {phases.map((phase) => (
              <StaggerItem key={phase.id}>
                <Collapsible
                  open={openPhases.includes(phase.id)}
                  onOpenChange={() => togglePhase(phase.id)}
                >
                  <Card className={`overflow-hidden transition-all duration-300 ${
                    openPhases.includes(phase.id) ? "border-primary/50" : ""
                  }`}>
                    <CollapsibleTrigger className="w-full">
                      <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${phase.bgColor}`}>
                              <phase.icon className={`h-6 w-6 ${phase.color}`} />
                            </div>
                            <div className="text-left">
                              <CardTitle className="text-lg">{phase.title}</CardTitle>
                              <p className="text-sm text-muted-foreground">{phase.period}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            {getStatusBadge(phase.status)}
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{phase.progress}%</span>
                              <motion.div
                                animate={{ rotate: openPhases.includes(phase.id) ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown className="h-5 w-5 text-muted-foreground" />
                              </motion.div>
                            </div>
                          </div>
                        </div>
                        <Progress value={phase.progress} className="h-2 mt-4" />
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <div className="grid gap-3 pl-4 border-l-2 border-muted ml-6">
                          {phase.tasks.map((task, index) => (
                            <motion.div
                              key={task.label}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center gap-3 py-2"
                            >
                              {task.done ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                              ) : (
                                <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              )}
                              <span className={task.done ? "text-muted-foreground line-through" : ""}>
                                {task.label}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};
