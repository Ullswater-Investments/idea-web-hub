import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  UserPlus, 
  Database, 
  Cog, 
  CheckSquare,
  Shield,
  FileJson,
  Cpu,
  ClipboardCheck
} from "lucide-react";

const ValerdatCronograma = () => {
  const fases = [
    {
      mes: 1,
      titulo: "Onboarding y Diagnóstico",
      periodo: "21/07 - 20/08/2025",
      color: "bg-blue-600",
      bgLight: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
      icon: UserPlus,
      accion: "Alta de VALERDAT S.L. como organización consumer en el ecosistema PROCUREDATA",
      servicios: [
        {
          nombre: "Identidad SSI",
          descripcion: "Generación de DID y verificación de credenciales corporativas (KYB)",
          icon: Shield,
        },
        {
          nombre: "Consultoría",
          descripcion: "Definición de necesidades de datos en el marketplace_opportunities",
          icon: ClipboardCheck,
        },
      ],
      hitos: ["DID generado", "KYB verificado", "Necesidades documentadas"],
    },
    {
      mes: 2,
      titulo: "Preparación del Dato",
      periodo: "21/08 - 20/09/2025",
      color: "bg-amber-600",
      bgLight: "bg-amber-50 dark:bg-amber-900/20",
      borderColor: "border-amber-200 dark:border-amber-800",
      icon: Database,
      accion: "Selección de datasets de 'Industrial' (Sector Prioritario 1, Target Share 51%)",
      servicios: [
        {
          nombre: "Raw Data Normalizer",
          descripcion: "Estandarización de formatos heterogéneos a JSON-LD",
          icon: FileJson,
        },
        {
          nombre: "Anonimizador GDPR",
          descripcion: "Hashing irreversible a los IDs de proveedores antes de la entrega",
          icon: Shield,
        },
      ],
      hitos: ["3 datasets seleccionados", "Normalización completa", "IDs anonimizados"],
    },
    {
      mes: 3,
      titulo: "Integración Técnica",
      periodo: "21/09 - 20/10/2025",
      color: "bg-purple-600",
      bgLight: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800",
      icon: Cog,
      accion: "Conexión del módulo IA de Valerdat con los conectores PROCUREDATA",
      servicios: [
        {
          nombre: "Edge Functions",
          descripcion: "Despliegue de función erp-data-uploader para inyectar datos limpios",
          icon: Cpu,
        },
        {
          nombre: "Modelo IDSA",
          descripcion: "Configuración del conector para intercambio soberano de datos",
          icon: Shield,
        },
      ],
      hitos: ["Conector EDC activo", "API integrada", "Primer dataset ingestado"],
    },
    {
      mes: 4,
      titulo: "Validación y Cierre",
      periodo: "21/10 - 11/11/2025",
      color: "bg-green-600",
      bgLight: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800",
      icon: CheckSquare,
      accion: "Ejecución de casos de uso y generación de justificación para la subvención",
      servicios: [
        {
          nombre: "Audit Logs",
          descripcion: "Generación del reporte forense con hashes de Pontus-X",
          icon: ClipboardCheck,
        },
        {
          nombre: "Innovation Lab",
          descripcion: "Validación de la mejora en los modelos de predicción usando InnovationChart",
          icon: Cpu,
        },
      ],
      hitos: ["Caso de uso validado", "Reporte generado", "Subvención justificada"],
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
            <p className="text-sm font-semibold text-blue-600 mb-2">04 —</p>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Cronograma del Proyecto (4 Meses)
            </h2>
            <p className="text-muted-foreground max-w-3xl">
              Desarrollo del servicio basado en el catálogo de capacidades de PROCUREDATA, 
              desde el onboarding hasta la validación y justificación de la subvención.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-amber-600 via-purple-600 to-green-600 hidden md:block" />

            {/* Phases */}
            <div className="space-y-8">
              {fases.map((fase, index) => (
                <motion.div
                  key={fase.mes}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className={`${fase.bgLight} ${fase.borderColor} border-2`}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Phase Indicator */}
                        <div className="flex md:flex-col items-center gap-4 md:gap-2">
                          <div className={`w-16 h-16 rounded-full ${fase.color} flex items-center justify-center text-white shadow-lg`}>
                            <fase.icon className="h-8 w-8" />
                          </div>
                          <div className="text-center">
                            <Badge className={`${fase.color} text-white`}>
                              Mes {fase.mes}
                            </Badge>
                          </div>
                        </div>

                        {/* Phase Content */}
                        <div className="flex-1 space-y-4">
                          {/* Header */}
                          <div>
                            <h3 className="text-xl font-bold mb-1">{fase.titulo}</h3>
                            <p className="text-sm text-muted-foreground">{fase.periodo}</p>
                          </div>

                          {/* Action */}
                          <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm">
                            <p className="text-sm font-medium mb-3">
                              <span className="text-muted-foreground">Acción: </span>
                              {fase.accion}
                            </p>
                          </div>

                          {/* Services */}
                          <div className="grid md:grid-cols-2 gap-3">
                            {fase.servicios.map((servicio) => (
                              <div 
                                key={servicio.nombre}
                                className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm flex items-start gap-3"
                              >
                                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                                  <servicio.icon className="h-4 w-4 text-foreground" />
                                </div>
                                <div>
                                  <p className="font-medium text-sm">{servicio.nombre}</p>
                                  <p className="text-xs text-muted-foreground">{servicio.descripcion}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Milestones */}
                          <div className="flex flex-wrap gap-2">
                            {fase.hitos.map((hito) => (
                              <Badge key={hito} variant="outline" className="text-xs">
                                ✓ {hito}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValerdatCronograma;
