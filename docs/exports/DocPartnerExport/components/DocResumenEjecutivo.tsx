import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { 
  Target, Lightbulb, Handshake, TrendingUp, 
  Network, ShieldCheck, Zap 
} from "lucide-react";

const keyPoints = [
  {
    icon: Network,
    title: "Federación, No Centralización",
    description: "PROCUREDATA no es una base de datos ni un portal. Es una infraestructura de espacios de datos federados donde la información fluye sin ser secuestrada.",
    color: "hsl(var(--itbid-cyan))",
  },
  {
    icon: Handshake,
    title: "itbid como Espacio Asociado",
    description: "No proponemos que itbid sea un 'participante'. Proponemos que itbid se constituya como un Espacio de Datos Asociado (itbid-x) con gobernanza propia.",
    color: "hsl(var(--itbid-magenta))",
  },
  {
    icon: ShieldCheck,
    title: "Soberanía Garantizada",
    description: "Los proveedores mantienen el control absoluto de sus datos. itbid gobierna las reglas de su espacio, pero nunca se apropia de la soberanía de los datos.",
    color: "hsl(var(--itbid-lime))",
  },
];

const proposalBenefits = [
  "itbid define las reglas de negocio, derechos y obligaciones para sus clientes y proveedores",
  "Gobernanza autónoma dentro del marco de interoperabilidad PROCUREDATA",
  "Acceso a la red global de espacios de datos europeos",
  "itbid se convierte en el 'regulador' de su propia red de compras",
  "Monitoreo de calidad y seguridad del ecosistema itbid-x",
];

export const DocResumenEjecutivo = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[hsl(var(--itbid-cyan)/0.1)] text-[hsl(var(--itbid-cyan))] border-[hsl(var(--itbid-cyan)/0.3)]">
              <Target className="h-3 w-3 mr-1" />
              Sección 1
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Resumen Ejecutivo
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              PROCUREDATA es un proyecto de infraestructura digital enfocado a la soberanía del dato 
              en procesos de compras y certificación, alineado con la estrategia SEDIA y los estándares Gaia-X.
            </p>
          </div>
        </FadeIn>

        {/* Key Points */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6 mb-12">
          {keyPoints.map((point) => (
            <StaggerItem key={point.title}>
              <Card className="h-full border-t-4 hover:shadow-lg transition-shadow" style={{ borderTopColor: point.color }}>
                <CardHeader>
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${point.color}20` }}
                  >
                    <point.icon className="h-7 w-7" style={{ color: point.color }} />
                  </div>
                  <CardTitle className="text-xl">{point.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{point.description}</p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Proposal Section */}
        <FadeIn delay={0.2}>
          <Card className="bg-gradient-to-br from-[hsl(var(--itbid-cyan)/0.05)] to-[hsl(var(--itbid-magenta)/0.05)] border-[hsl(var(--itbid-cyan)/0.3)]">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[hsl(var(--itbid-cyan)/0.1)] flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-[hsl(var(--itbid-cyan))]" />
                </div>
                <div>
                  <CardTitle className="text-2xl">La Propuesta: itbid-x</CardTitle>
                  <p className="text-muted-foreground">Espacio de Datos Asociado con Gobernanza Propia</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-[hsl(var(--itbid-lime))]" />
                    ¿Qué significa para itbid?
                  </h4>
                  <ul className="space-y-3">
                    {proposalBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Zap className="h-5 w-5 text-[hsl(var(--itbid-cyan))] shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-card/50 rounded-xl p-6 border">
                  <h4 className="font-semibold mb-4">Diferencia Clave</h4>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                      <p className="text-sm font-medium text-destructive">❌ Modelo Tradicional</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        "Recopilar datos, guardarlos y revenderlos" - Son un muro.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-[hsl(var(--itbid-lime)/0.1)] border border-[hsl(var(--itbid-lime)/0.3)]">
                      <p className="text-sm font-medium text-[hsl(var(--itbid-lime))]">✓ Modelo itbid-x</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        "Conectar datos, no acumularlos" - Somos una Red.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
};
