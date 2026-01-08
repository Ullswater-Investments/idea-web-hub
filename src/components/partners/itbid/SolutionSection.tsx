import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { ScoreRing } from "@/components/gamification/ScoreRing";
import { Fingerprint, PlugZap, Database, CheckCircle2, Globe } from "lucide-react";

const pillars = [
  {
    icon: Fingerprint,
    title: "Identidad Soberana (SSI)",
    description: "Credenciales Verificables y carteras digitales reemplazan usuario/contraseña.",
    features: ["Wallets digitales", "Sin contraseñas", "Control total"],
  },
  {
    icon: PlugZap,
    title: "Conectores de Datos (EDC)",
    description: "Software que actúa como 'aduana', controlando flujo de entrada y salida.",
    features: ["Eclipse Dataspace", "Políticas ODRL", "Auditoría total"],
  },
  {
    icon: Database,
    title: "Catálogos Federados",
    description: "Índice descentralizado donde participantes publican disponibilidad sin exponer datos.",
    features: ["Descentralizado", "Privacidad", "Búsqueda semántica"],
  },
];

export const SolutionSection = () => {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-sm font-medium">La Solución</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light mb-4 itbid-gradient-gray">Espacio de Datos Federado</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              itbid-x no "posee" todos los datos, sino que facilita un intercambio seguro, 
              soberano y auditable entre participantes.
            </p>
          </div>
        </FadeIn>

        {/* Comparison Diagram */}
        <FadeIn delay={0.2}>
          <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
            {/* Traditional */}
            <Card className="border-destructive/30 bg-destructive/5">
              <CardHeader className="text-center">
                <CardTitle className="text-lg text-destructive">Data Lake Tradicional</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-destructive/20 border-2 border-dashed border-destructive/50 flex items-center justify-center">
                    <span className="text-xs text-center text-muted-foreground px-2">
                      Todo centralizado
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                  >
                    {[0, 60, 120, 180, 240, 300].map((deg) => (
                      <div
                        key={deg}
                        className="absolute w-3 h-3 bg-destructive/50 rounded-full"
                        style={{
                          top: `${50 + 45 * Math.sin((deg * Math.PI) / 180)}%`,
                          left: `${50 + 45 * Math.cos((deg * Math.PI) / 180)}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    ))}
                  </motion.div>
                </div>
              </CardContent>
            </Card>

            {/* Federated */}
            <Card className="border-primary/30 bg-primary/5">
              <CardHeader className="text-center">
                <CardTitle className="text-lg text-primary">Espacio Federado Gaia-X</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="relative">
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center"
                      >
                        <span className="text-xs text-primary font-medium">{i}</span>
                      </motion.div>
                    ))}
                  </div>
                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
                    <motion.line
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      x1="30%" y1="30%" x2="70%" y2="70%"
                      stroke="hsl(var(--primary))"
                      strokeWidth="1"
                      strokeOpacity="0.3"
                    />
                    <motion.line
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ delay: 0.2 }}
                      x1="70%" y1="30%" x2="30%" y2="70%"
                      stroke="hsl(var(--primary))"
                      strokeWidth="1"
                      strokeOpacity="0.3"
                    />
                  </svg>
                </div>
              </CardContent>
            </Card>
          </div>
        </FadeIn>

        {/* Pillars */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <StaggerItem key={pillar.title}>
              <Card className="h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:border-primary/50 group">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <pillar.icon className="h-7 w-7 text-primary" />
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
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Gaia-X Badge */}
        <FadeIn delay={0.5}>
          <div className="flex justify-center mt-12">
            <Card className="inline-flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-blue-500/10 to-primary/10 border-blue-500/30">
              <Globe className="h-8 w-8 text-blue-500" />
              <div>
                <p className="font-semibold">Gaia-X Certified Ready</p>
                <p className="text-sm text-muted-foreground">Compatible con el ecosistema europeo de datos</p>
              </div>
            </Card>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
