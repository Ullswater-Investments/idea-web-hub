import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Database, FileWarning, Cloud } from "lucide-react";

const problems = [
  {
    icon: Database,
    title: "Silos de Datos Agrícolas",
    description: "Datos dispersos entre cooperativas, sensores IoT, sistemas ERP y plataformas de gestión sin interoperabilidad.",
    color: "text-[hsl(var(--telenatura-earth))]",
    bgColor: "bg-[hsl(var(--telenatura-earth)/0.1)]",
  },
  {
    icon: FileWarning,
    title: "Pérdida de Trazabilidad",
    description: "Imposibilidad de demostrar origen, prácticas sostenibles y certificaciones a lo largo de toda la cadena de valor.",
    color: "text-[hsl(var(--telenatura-water))]",
    bgColor: "bg-[hsl(var(--telenatura-water)/0.1)]",
  },
  {
    icon: Cloud,
    title: "Dependencia de Plataformas",
    description: "Agricultores atrapados en ecosistemas cerrados que explotan sus datos sin compensación ni control.",
    color: "text-[hsl(var(--telenatura-green))]",
    bgColor: "bg-[hsl(var(--telenatura-green)/0.1)]",
  },
  {
    icon: AlertTriangle,
    title: "Ineficiencia en Recursos",
    description: "Decisiones de riego, fertilización y tratamiento basadas en estimaciones en lugar de datos en tiempo real.",
    color: "text-[hsl(var(--telenatura-leaf))]",
    bgColor: "bg-[hsl(var(--telenatura-leaf)/0.1)]",
  },
];

export const ProblemSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            El Problema: <span className="telenatura-gradient">Silos de Datos en el Agro</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            El sector agroalimentario genera enormes volúmenes de datos valiosos, pero la fragmentación impide aprovechar su potencial.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl ${problem.bgColor} flex items-center justify-center mb-4`}>
                    <problem.icon className={`h-6 w-6 ${problem.color}`} />
                  </div>
                  <CardTitle className="text-xl">{problem.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{problem.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
