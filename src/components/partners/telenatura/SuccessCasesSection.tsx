import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quote, TrendingUp, Droplets, Leaf } from "lucide-react";

const successCases = [
  {
    title: "Comunidad de Regantes del Levante",
    sector: "Regadío",
    description: "Optimización del uso del agua en 15.000 hectáreas mediante sensores de humedad y datos meteorológicos compartidos.",
    metrics: [
      { label: "Ahorro de agua", value: "38%", icon: Droplets },
      { label: "Hectáreas conectadas", value: "15.000", icon: TrendingUp },
    ],
    quote: "Por primera vez, podemos tomar decisiones de riego basadas en datos reales sin perder el control de nuestra información.",
    author: "Director Técnico, CR Levante",
    color: "border-[hsl(var(--telenatura-water))]",
  },
  {
    title: "Cooperativa Agroecológica Sierra Norte",
    sector: "Producción Ecológica",
    description: "Trazabilidad completa desde la semilla hasta el lineal del supermercado para certificación ecológica.",
    metrics: [
      { label: "Reducción tiempo cert.", value: "60%", icon: Leaf },
      { label: "Productores integrados", value: "120+", icon: TrendingUp },
    ],
    quote: "La certificación que antes llevaba semanas ahora es casi automática. Nuestros clientes confían más en nosotros.",
    author: "Gerente, Coop. Sierra Norte",
    color: "border-[hsl(var(--telenatura-green))]",
  },
  {
    title: "Viñedos DO Ribera del Duero",
    sector: "Viticultura",
    description: "Predicción de enfermedades fúngicas y optimización de tratamientos fitosanitarios en viñedos de alta gama.",
    metrics: [
      { label: "Reducción tratamientos", value: "35%", icon: Leaf },
      { label: "Bodegas conectadas", value: "45", icon: TrendingUp },
    ],
    quote: "Compartimos datos climáticos sin revelar nuestras prácticas secretas. La federación lo hace posible.",
    author: "Enólogo Jefe, Bodega X",
    color: "border-[hsl(var(--telenatura-earth))]",
  },
];

export const SuccessCasesSection = () => {
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
            Casos de Éxito
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Resultados <span className="telenatura-gradient">Demostrados</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Proyectos piloto que demuestran el valor del espacio de datos federado en el sector agroalimentario.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {successCases.map((successCase, index) => (
            <motion.div
              key={successCase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`h-full hover:shadow-lg transition-shadow border-l-4 ${successCase.color}`}>
                <CardHeader>
                  <Badge variant="outline" className="w-fit mb-2">
                    {successCase.sector}
                  </Badge>
                  <CardTitle className="text-lg">{successCase.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">{successCase.description}</p>
                  
                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    {successCase.metrics.map((metric) => (
                      <div key={metric.label} className="text-center p-3 bg-muted/50 rounded-lg">
                        <metric.icon className="h-5 w-5 mx-auto mb-1 text-[hsl(var(--telenatura-green))]" />
                        <div className="text-xl font-bold text-[hsl(var(--telenatura-green))]">{metric.value}</div>
                        <div className="text-xs text-muted-foreground">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <div className="border-t pt-4">
                    <Quote className="h-4 w-4 text-muted-foreground mb-2" />
                    <p className="text-sm italic text-muted-foreground">"{successCase.quote}"</p>
                    <p className="text-xs text-muted-foreground mt-2">— {successCase.author}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
