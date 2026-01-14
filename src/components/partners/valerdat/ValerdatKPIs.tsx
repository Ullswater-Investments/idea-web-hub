import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Database, 
  ShieldCheck, 
  Link2, 
  Zap,
  Target,
  TrendingUp,
  CheckCircle2
} from "lucide-react";

const ValerdatKPIs = () => {
  const kpis = [
    {
      icon: Database,
      titulo: "Enriquecimiento de IA",
      descripcion: "Ingesta de al menos 3 datasets externos del sector industrial",
      ejemplos: ["Historial de Pedidos B2B", "Capacidad Productiva", "Certificaciones ISO"],
      meta: 3,
      actual: 2,
      unidad: "datasets",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      progressColor: "bg-blue-600",
    },
    {
      icon: ShieldCheck,
      titulo: "Cumplimiento Normativo",
      descripcion: "100% de los datos personales anonimizados y transacciones gobernadas por ODRL v2.2",
      ejemplos: ["GDPR Compliant", "ODRL v2.2", "FAIR/DCAT-AP"],
      meta: 100,
      actual: 100,
      unidad: "%",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      progressColor: "bg-green-600",
    },
    {
      icon: Link2,
      titulo: "Trazabilidad Blockchain",
      descripcion: "100% de las acciones del proyecto registradas en Pontus-X para auditoría",
      ejemplos: ["Contratos notarizados", "Pagos verificados", "Entregas auditadas"],
      meta: 100,
      actual: 85,
      unidad: "%",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      progressColor: "bg-purple-600",
    },
    {
      icon: Zap,
      titulo: "Eficiencia Operativa",
      descripcion: "Reducción del tiempo de integración de datos de meses a días",
      ejemplos: ["Conectores estandarizados", "APIs automatizadas", "Flujos predefinidos"],
      meta: 80,
      actual: 75,
      unidad: "% reducción",
      color: "text-amber-600",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      progressColor: "bg-amber-600",
    },
  ];

  const objetivosAlcanzados = [
    { texto: "Alta como Consumer verificado en PROCUREDATA", completado: true },
    { texto: "DID generado y KYB aprobado", completado: true },
    { texto: "Primer dataset industrial adquirido", completado: true },
    { texto: "Segundo dataset industrial adquirido", completado: true },
    { texto: "Integración con módulo IA de VALERDAT", completado: false },
    { texto: "Tercer dataset industrial adquirido", completado: false },
    { texto: "Validación de mejora en predicciones", completado: false },
    { texto: "Generación de reporte para subvención", completado: false },
  ];

  return (
    <section className="py-16 px-4 bg-white dark:bg-slate-900">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Section Header */}
          <div className="mb-12">
            <p className="text-sm font-semibold text-blue-600 mb-2">05 —</p>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Objetivos y KPIs de Éxito
            </h2>
            <p className="text-muted-foreground max-w-3xl">
              Métricas alineadas con la memoria de VALERDAT y las capacidades de PROCUREDATA 
              para medir el éxito del proyecto y justificar la subvención.
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {kpis.map((kpi, index) => (
              <motion.div
                key={kpi.titulo}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className={`h-full ${kpi.bgColor} border-0`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl bg-white dark:bg-slate-800 shadow-sm`}>
                        <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{kpi.titulo}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {kpi.descripcion}
                    </p>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progreso</span>
                        <span className="font-bold">
                          {kpi.actual} / {kpi.meta} {kpi.unidad}
                        </span>
                      </div>
                      <div className="relative">
                        <Progress 
                          value={(kpi.actual / kpi.meta) * 100} 
                          className="h-3"
                        />
                      </div>
                    </div>

                    {/* Examples */}
                    <div className="flex flex-wrap gap-2">
                      {kpi.ejemplos.map((ejemplo) => (
                        <Badge key={ejemplo} variant="secondary" className="text-xs">
                          {ejemplo}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Objectives Checklist */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-lg">Checklist de Objetivos</CardTitle>
                <Badge variant="outline" className="ml-auto">
                  {objetivosAlcanzados.filter(o => o.completado).length} / {objetivosAlcanzados.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {objetivosAlcanzados.map((objetivo, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      objetivo.completado 
                        ? 'bg-green-50 dark:bg-green-900/20' 
                        : 'bg-slate-50 dark:bg-slate-800'
                    }`}
                  >
                    <CheckCircle2 className={`h-5 w-5 ${
                      objetivo.completado ? 'text-green-600' : 'text-muted-foreground'
                    }`} />
                    <span className={`text-sm ${
                      objetivo.completado ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {objetivo.texto}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Impact Summary */}
          <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-bold">Impacto Esperado</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-blue-600">+40%</p>
                <p className="text-sm text-muted-foreground">Precisión en predicciones IA</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-600">-60%</p>
                <p className="text-sm text-muted-foreground">Tiempo de due diligence</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-600">100%</p>
                <p className="text-sm text-muted-foreground">Cumplimiento normativo</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValerdatKPIs;
