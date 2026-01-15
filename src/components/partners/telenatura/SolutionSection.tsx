import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wifi, Shield, Network, Leaf } from "lucide-react";

const pillars = [
  {
    icon: Wifi,
    title: "Sensores IoT Conectados",
    description: "Red de sensores agroclimáticos, de suelo y de cultivo que alimentan el espacio de datos en tiempo real.",
    features: ["Estaciones meteorológicas", "Sondas de humedad", "Sensores de riego", "Cámaras multiespectrales"],
    color: "text-[hsl(var(--telenatura-sky))]",
    bgColor: "bg-[hsl(var(--telenatura-sky)/0.1)]",
  },
  {
    icon: Shield,
    title: "Soberanía del Agricultor",
    description: "El dato nunca abandona la explotación agrícola. Solo se comparte acceso bajo consentimiento explícito.",
    features: ["Control criptográfico", "Revocación instantánea", "Trazabilidad de accesos", "Políticas ODRL"],
    color: "text-[hsl(var(--telenatura-green))]",
    bgColor: "bg-[hsl(var(--telenatura-green)/0.1)]",
  },
  {
    icon: Network,
    title: "Conectores EDC Federados",
    description: "Eclipse Dataspace Connectors que permiten interoperabilidad con otros espacios de datos Gaia-X.",
    features: ["Catálogo federado", "Identidad descentralizada", "Smart contracts", "APIs estandarizadas"],
    color: "text-[hsl(var(--telenatura-water))]",
    bgColor: "bg-[hsl(var(--telenatura-water)/0.1)]",
  },
  {
    icon: Leaf,
    title: "Certificación Sostenible",
    description: "Trazabilidad completa para demostrar prácticas agrícolas sostenibles y certificaciones ecológicas.",
    features: ["Huella de carbono", "Uso de agua", "Biodiversidad", "Origen verificable"],
    color: "text-[hsl(var(--telenatura-leaf))]",
    bgColor: "bg-[hsl(var(--telenatura-leaf)/0.1)]",
  },
];

export const SolutionSection = () => {
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
            La Solución
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Espacio de Datos Federado <span className="telenatura-gradient">Agrícola</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            TeleNatura-X conecta agricultores, cooperativas, técnicos y certificadoras en un ecosistema de datos soberano, 
            permitiendo compartir información sin perder el control.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl ${pillar.bgColor} flex items-center justify-center mb-4`}>
                    <pillar.icon className={`h-6 w-6 ${pillar.color}`} />
                  </div>
                  <CardTitle className="text-xl">{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{pillar.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {pillar.features.map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
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
