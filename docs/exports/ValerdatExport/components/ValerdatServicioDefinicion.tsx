import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ShoppingCart, ShieldCheck, Database, Cog, FileJson, Network } from "lucide-react";

const ValerdatServicioDefinicion = () => {
  const servicios = [
    {
      icon: ShieldCheck,
      nombre: "Anonimizador GDPR",
      categoria: "Data Ops",
      descripcion: "Hashing irreversible de IDs de proveedores para cumplir con el requisito de mitigación de riesgos de VALERDAT.",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      icon: FileJson,
      nombre: "Modelo IDSA / DCAT-AP",
      categoria: "Gobernanza",
      descripcion: "Asegura que los datasets adquiridos cumplan con los estándares de metadatos FAIR requeridos por la convocatoria.",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      icon: Cog,
      nombre: "Edge Functions + EDC",
      categoria: "Integración",
      descripcion: "Despliegue de conectores Eclipse EDC y funciones serverless para la ingesta de datos hacia los modelos de IA.",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      icon: Network,
      nombre: "Raw Data Normalizer",
      categoria: "Data Ops",
      descripcion: "Estandarización de formatos heterogéneos de múltiples proveedores a JSON-LD interoperable.",
      color: "text-amber-600",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
    },
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
            <p className="text-sm font-semibold text-blue-600 mb-2">01 —</p>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Definición del Servicio
            </h2>
            <p className="text-muted-foreground max-w-3xl">
              En el contexto de PROCUREDATA, <strong>VALERDAT S.L.</strong> actuará principalmente 
              bajo el rol de <Badge variant="outline" className="ml-1">Consumer (Comprador de Datos)</Badge>, 
              con el objetivo de ingestar datos externos para entrenar sus algoritmos de IA.
            </p>
          </div>

          {/* Role Card */}
          <Card className="mb-8 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">VALERDAT S.L. como Consumer</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Rol principal en el ecosistema PROCUREDATA
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                VALERDAT requiere datos industriales para alimentar su módulo de IA "Data-Driven Procurement", 
                especializado en predicción de precios y análisis de riesgos de proveedores. 
                PROCUREDATA actúa como habilitador técnico y de gobernanza.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Predicción de Precios</Badge>
                <Badge variant="secondary">Análisis de Riesgos</Badge>
                <Badge variant="secondary">Ingesta de Datos</Badge>
                <Badge variant="secondary">Entrenamiento IA</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Services Grid */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-6">
              Capacidades Enterprise Utilizadas
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {servicios.map((servicio, index) => (
                <motion.div
                  key={servicio.nombre}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className={`h-full ${servicio.bgColor} border-0`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl bg-white dark:bg-slate-800 shadow-sm`}>
                          <servicio.icon className={`h-6 w-6 ${servicio.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{servicio.nombre}</h4>
                            <Badge variant="outline" className="text-xs">
                              {servicio.categoria}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {servicio.descripcion}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Compliance Note */}
          <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Database className="h-6 w-6 text-amber-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-2">Cumplimiento "Kit Espacios de Datos"</h4>
                  <p className="text-sm text-muted-foreground">
                    La provisión del servicio se estructura utilizando las Capacidades Enterprise 
                    del motor PROCUREDATA para cumplir con todos los requisitos de la convocatoria: 
                    gobernanza ODRL, anonimización GDPR, calidad FAIR/DCAT-AP e integración técnica 
                    mediante Eclipse EDC.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ValerdatServicioDefinicion;
