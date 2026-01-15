import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, Leaf, Bug, FileCheck, TrendingUp, Truck } from "lucide-react";

const useCases = [
  {
    icon: Droplets,
    title: "Optimización de Riego",
    description: "Ajuste automático del riego basado en datos de humedad del suelo, previsión meteorológica y evapotranspiración.",
    impact: "-40% consumo agua",
    color: "text-[hsl(var(--telenatura-water))]",
    bgColor: "bg-[hsl(var(--telenatura-water)/0.1)]",
  },
  {
    icon: Leaf,
    title: "Trazabilidad de Cosecha",
    description: "Registro inmutable del ciclo completo del cultivo: siembra, tratamientos, cosecha y transporte.",
    impact: "100% trazabilidad",
    color: "text-[hsl(var(--telenatura-green))]",
    bgColor: "bg-[hsl(var(--telenatura-green)/0.1)]",
  },
  {
    icon: Bug,
    title: "Predicción de Plagas",
    description: "Modelos predictivos basados en datos climáticos y fenológicos para anticipar tratamientos fitosanitarios.",
    impact: "-30% pesticidas",
    color: "text-[hsl(var(--telenatura-leaf))]",
    bgColor: "bg-[hsl(var(--telenatura-leaf)/0.1)]",
  },
  {
    icon: FileCheck,
    title: "Certificación Ecológica",
    description: "Demostración automática del cumplimiento de normativas ecológicas mediante datos verificables.",
    impact: "Certificación ágil",
    color: "text-[hsl(var(--telenatura-earth))]",
    bgColor: "bg-[hsl(var(--telenatura-earth)/0.1)]",
  },
  {
    icon: TrendingUp,
    title: "Benchmarking Sectorial",
    description: "Comparativa anónima de rendimientos entre explotaciones para identificar mejores prácticas.",
    impact: "+25% rendimiento",
    color: "text-[hsl(var(--telenatura-sky))]",
    bgColor: "bg-[hsl(var(--telenatura-sky)/0.1)]",
  },
  {
    icon: Truck,
    title: "Logística Optimizada",
    description: "Coordinación de cosecha y transporte basada en datos de maduración y disponibilidad de flota.",
    impact: "-20% mermas",
    color: "text-[hsl(var(--telenatura-soil))]",
    bgColor: "bg-[hsl(var(--telenatura-soil)/0.1)]",
  },
];

export const UseCasesSection = () => {
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
            Casos de Uso
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Agricultura de Precisión <span className="telenatura-gradient">en Acción</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Aplicaciones concretas del espacio de datos federado en explotaciones agrícolas reales.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-12 h-12 rounded-xl ${useCase.bgColor} flex items-center justify-center`}>
                      <useCase.icon className={`h-6 w-6 ${useCase.color}`} />
                    </div>
                    <Badge variant="outline" className={`${useCase.color} border-current`}>
                      {useCase.impact}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{useCase.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
