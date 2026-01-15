import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Mail, Phone, Calendar, Leaf } from "lucide-react";
import { ProcuredataLogo } from "@/components/ProcuredataLogo";

const contactOptions = [
  {
    icon: Calendar,
    title: "Agendar Demo",
    description: "Solicita una demostración personalizada del espacio de datos agrícola.",
    action: "Reservar cita",
    href: "mailto:demo@telenatura.com?subject=Solicitud%20Demo%20TeleNatura-X",
  },
  {
    icon: Mail,
    title: "Contacto Comercial",
    description: "Habla con nuestro equipo sobre cómo integrar tu explotación.",
    action: "Escribir email",
    href: "mailto:comercial@telenatura.com",
  },
  {
    icon: Phone,
    title: "Soporte Técnico",
    description: "¿Ya eres cliente? Contacta con nuestro equipo de soporte.",
    action: "Llamar ahora",
    href: "tel:+34900000000",
  },
];

export const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[hsl(var(--telenatura-green)/0.05)] to-[hsl(var(--telenatura-sky)/0.05)]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {/* Dual Logos */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <ProcuredataLogo size="sm" />
            <span className="text-2xl text-muted-foreground">×</span>
            <span className="text-xl font-bold telenatura-gradient flex items-center gap-2">
              <Leaf className="h-5 w-5" />
              TeleNatura EBT
            </span>
          </div>

          <Badge className="mb-4 bg-[hsl(var(--telenatura-green)/0.1)] text-[hsl(var(--telenatura-green))] border-[hsl(var(--telenatura-green)/0.3)]">
            Próximos Pasos
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Únete al Espacio de Datos <span className="telenatura-gradient">Agrícola</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Forma parte del ecosistema de datos soberano que está transformando la agricultura de precisión en Europa.
          </p>
        </motion.div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow text-center">
                <CardContent className="pt-6">
                  <div className="w-14 h-14 rounded-full bg-[hsl(var(--telenatura-green)/0.1)] flex items-center justify-center mx-auto mb-4">
                    <option.icon className="h-7 w-7 text-[hsl(var(--telenatura-green))]" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{option.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{option.description}</p>
                  <Button asChild className="bg-[hsl(var(--telenatura-green))] hover:bg-[hsl(var(--telenatura-green)/0.9)]">
                    <a href={option.href}>
                      {option.action}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Footer Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <blockquote className="text-xl italic text-muted-foreground max-w-3xl mx-auto">
            "La agricultura del futuro será data-driven y soberana. TeleNatura-X lo hace posible hoy."
          </blockquote>
          <div className="mt-6 text-sm text-muted-foreground">
            © 2025 TeleNatura EBT × PROCUREDATA | Documento Proyecto v1.0
          </div>
        </motion.div>
      </div>
    </section>
  );
};
