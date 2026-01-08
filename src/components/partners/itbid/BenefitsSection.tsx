import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { ScoreRing } from "@/components/gamification/ScoreRing";
import { 
  ShoppingCart, Users, TrendingUp, Shield, Clock, Heart, 
  ToggleRight, Zap, Euro, Award
} from "lucide-react";

const stakeholders = [
  {
    title: "Para el Comprador",
    icon: ShoppingCart,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    score: 95,
    benefits: [
      { icon: Shield, label: "Resiliencia", desc: "Anticipar disrupciones en Tier 2-3" },
      { icon: Heart, label: "Confianza", desc: "Datos no 'secuestrados' en la plataforma" },
      { icon: Zap, label: "Compliance", desc: "Cumplimiento automático de normativas UE" },
    ],
  },
  {
    title: "Para el Proveedor",
    icon: Users,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    score: 90,
    benefits: [
      { icon: Clock, label: "Once-Only", desc: "Certificarse una vez, servir a todos" },
      { icon: ToggleRight, label: "Control Total", desc: "Ver quién accede y revocar con un clic" },
      { icon: Shield, label: "Kill Switch", desc: "Desactivar acceso instantáneamente" },
    ],
  },
  {
    title: "Para ITBID (Negocio)",
    icon: TrendingUp,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    score: 100,
    benefits: [
      { icon: Award, label: "Diferenciación", desc: "Única SRM integrada con Catena-X" },
      { icon: Euro, label: "Nuevos Ingresos", desc: "Micro-transacciones por validación" },
      { icon: TrendingUp, label: "Liderazgo", desc: "Posición dominante en Data Economy" },
    ],
  },
];

export const BenefitsSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Award className="h-4 w-4" />
              <span className="text-sm font-medium">Ventajas Competitivas</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Beneficios por Stakeholder</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Valor diferenciado para cada participante del ecosistema
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {stakeholders.map((stakeholder) => (
            <StaggerItem key={stakeholder.title}>
              <Card className={`h-full border-2 ${stakeholder.borderColor} hover:shadow-lg transition-all duration-300`}>
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 rounded-2xl ${stakeholder.bgColor} flex items-center justify-center mx-auto mb-4`}>
                    <stakeholder.icon className={`h-8 w-8 ${stakeholder.color}`} />
                  </div>
                  <CardTitle className="text-xl">{stakeholder.title}</CardTitle>
                  <div className="flex justify-center mt-4">
                    <ScoreRing
                      score={stakeholder.score}
                      size={70}
                      strokeWidth={5}
                      label="Impacto"
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {stakeholder.benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.label}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-background/50"
                    >
                      <div className={`p-2 rounded-lg ${stakeholder.bgColor}`}>
                        <benefit.icon className={`h-4 w-4 ${stakeholder.color}`} />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{benefit.label}</p>
                        <p className="text-xs text-muted-foreground">{benefit.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Quote */}
        <FadeIn delay={0.4}>
          <Card className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-primary/5 to-orange-500/5 border-primary/20">
            <CardContent className="py-8 text-center">
              <blockquote className="text-xl md:text-2xl font-medium italic text-foreground/90">
                "La próxima ventaja competitiva no es tener los mejores datos, 
                sino tener las mejores conexiones seguras a los datos de los demás."
              </blockquote>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
};
