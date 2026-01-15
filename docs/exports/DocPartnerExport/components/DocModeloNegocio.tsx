import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { 
  DollarSign, Building2, Package, ShoppingCart, 
  TrendingUp, Shield, Zap, Clock, Award, 
  Wallet, BarChart3, FileCheck 
} from "lucide-react";

const itbidBenefits = [
  {
    icon: DollarSign,
    title: "Nuevos Ingresos",
    description: "Cobro por transacciones de validación (Verification-as-a-Service) y servicios premium de IA Federada.",
  },
  {
    icon: Shield,
    title: "Defensa Competitiva",
    description: "Fidelización extrema del cliente al ser su 'conector' con el mundo de datos verificados.",
  },
  {
    icon: Award,
    title: "Acceso a Fondos UE",
    description: "Elegibilidad para subvenciones del Kit Espacio de Datos y programas de digitalización europea.",
  },
  {
    icon: TrendingUp,
    title: "Escalabilidad",
    description: "Cada nuevo participante en la red aumenta el valor sin incrementar costes operativos proporcionalmente.",
  },
];

const clientBenefits = [
  {
    icon: Clock,
    title: "Reducción de Costes",
    description: "Eliminación de validación manual de documentos. Procesos de homologación 10x más rápidos.",
  },
  {
    icon: FileCheck,
    title: "Compliance Automático",
    description: "Cumplimiento automático de la Directiva CS3D y reducción de riesgos en la cadena de suministro.",
  },
  {
    icon: BarChart3,
    title: "Visibilidad Total",
    description: "Dashboard en tiempo real del estado de todos sus proveedores y sus certificaciones.",
  },
  {
    icon: Shield,
    title: "Auditoría Simplificada",
    description: "Trazabilidad blockchain de cada verificación, lista para auditorías externas.",
  },
];

const providerBenefits = [
  {
    icon: Zap,
    title: "Principio Once-Only",
    description: "Se conecta una vez y sirve a todos los clientes. No más envío repetitivo de documentos.",
  },
  {
    icon: Wallet,
    title: "Acceso a Financiación",
    description: "Servicios financieros (factoring) basados en su reputación verificada en el espacio de datos.",
  },
  {
    icon: TrendingUp,
    title: "Mayor Visibilidad",
    description: "Presencia automática en el marketplace de proveedores verificados de toda la red itbid-x.",
  },
  {
    icon: Shield,
    title: "Control Total",
    description: "Decide exactamente quién ve qué dato y puede revocar accesos instantáneamente.",
  },
];

export const DocModeloNegocio = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[hsl(var(--itbid-cyan)/0.1)] text-[hsl(var(--itbid-cyan))] border-[hsl(var(--itbid-cyan)/0.3)]">
              <DollarSign className="h-3 w-3 mr-1" />
              Sección 7
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Modelo de Negocio del Espacio de Datos
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              El modelo federado crea valor para todos los participantes. 
              itbid como orquestador captura valor en cada transacción mientras habilita nuevos modelos de negocio.
            </p>
          </div>
        </FadeIn>

        {/* ITBID Benefits */}
        <FadeIn delay={0.1}>
          <Card className="mb-8 border-[hsl(var(--itbid-cyan)/0.3)] border-2">
            <CardHeader className="bg-gradient-to-r from-[hsl(var(--itbid-cyan)/0.1)] to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-[hsl(var(--itbid-cyan)/0.2)] flex items-center justify-center">
                  <Building2 className="h-7 w-7 text-[hsl(var(--itbid-cyan))]" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Para itbid</CardTitle>
                  <p className="text-muted-foreground">El Orquestador del Ecosistema</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {itbidBenefits.map((benefit) => (
                  <div key={benefit.title} className="p-4 rounded-xl bg-[hsl(var(--itbid-cyan)/0.05)] border border-[hsl(var(--itbid-cyan)/0.2)]">
                    <benefit.icon className="h-8 w-8 text-[hsl(var(--itbid-cyan))] mb-3" />
                    <h4 className="font-semibold mb-2">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Client & Provider Benefits Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Client Benefits */}
          <FadeIn delay={0.2}>
            <Card className="h-full border-[hsl(var(--itbid-lime)/0.3)] border-2">
              <CardHeader className="bg-gradient-to-r from-[hsl(var(--itbid-lime)/0.1)] to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[hsl(var(--itbid-lime)/0.2)] flex items-center justify-center">
                    <ShoppingCart className="h-6 w-6 text-[hsl(var(--itbid-lime))]" />
                  </div>
                  <div>
                    <CardTitle>Para el Cliente (Comprador)</CardTitle>
                    <p className="text-sm text-muted-foreground">Empresas que usan itbid para gestionar proveedores</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {clientBenefits.map((benefit) => (
                    <div key={benefit.title} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[hsl(var(--itbid-lime)/0.1)] flex items-center justify-center shrink-0">
                        <benefit.icon className="h-5 w-5 text-[hsl(var(--itbid-lime))]" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Provider Benefits */}
          <FadeIn delay={0.3}>
            <Card className="h-full border-[hsl(var(--itbid-magenta)/0.3)] border-2">
              <CardHeader className="bg-gradient-to-r from-[hsl(var(--itbid-magenta)/0.1)] to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[hsl(var(--itbid-magenta)/0.2)] flex items-center justify-center">
                    <Package className="h-6 w-6 text-[hsl(var(--itbid-magenta))]" />
                  </div>
                  <div>
                    <CardTitle>Para el Proveedor</CardTitle>
                    <p className="text-sm text-muted-foreground">Empresas que aportan sus datos al ecosistema</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {providerBenefits.map((benefit) => (
                    <div key={benefit.title} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[hsl(var(--itbid-magenta)/0.1)] flex items-center justify-center shrink-0">
                        <benefit.icon className="h-5 w-5 text-[hsl(var(--itbid-magenta))]" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>

        {/* Revenue Streams Summary */}
        <FadeIn delay={0.4}>
          <Card className="mt-8 bg-gradient-to-br from-[hsl(var(--itbid-cyan)/0.05)] via-background to-[hsl(var(--itbid-magenta)/0.05)]">
            <CardContent className="py-8">
              <h3 className="text-xl font-bold text-center mb-6">Flujos de Ingresos Potenciales para itbid</h3>
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-xl bg-card border">
                  <p className="text-3xl font-bold text-[hsl(var(--itbid-cyan))]">0.5-2%</p>
                  <p className="text-sm text-muted-foreground">Comisión por transacción</p>
                </div>
                <div className="p-4 rounded-xl bg-card border">
                  <p className="text-3xl font-bold text-[hsl(var(--itbid-magenta))]">€/mes</p>
                  <p className="text-sm text-muted-foreground">Suscripciones premium</p>
                </div>
                <div className="p-4 rounded-xl bg-card border">
                  <p className="text-3xl font-bold text-[hsl(var(--itbid-lime))]">€/query</p>
                  <p className="text-sm text-muted-foreground">Verificación bajo demanda</p>
                </div>
                <div className="p-4 rounded-xl bg-card border">
                  <p className="text-3xl font-bold text-primary">€/API</p>
                  <p className="text-sm text-muted-foreground">Integraciones enterprise</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
};
