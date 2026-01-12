import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/AnimatedSection";
import { 
  Rocket, 
  Settings, 
  TrendingUp, 
  Target, 
  Users, 
  Wallet, 
  CheckCircle2,
  Zap,
  Brain,
  Link2,
  Banknote,
  ArrowRight,
  Euro,
  Database,
  Shield,
  Globe,
  BadgeCheck,
  Sparkles,
  Network,
  FileCheck,
  AlertTriangle,
  GraduationCap
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import kitLogo from "@/assets/kit-espacios-datos-logo.png";
import agileProcurementLogo from "@/assets/agile-procurement-logo.png";

// FASE 1 Data - Modelo de Negocio Agile Procurement + ITBID
const fase1Deliverables = [
  { 
    icon: Globe, 
    title: "Nodo GAIA-X Propio", 
    description: "ITBID obtiene su propio punto de conexión certificado al ecosistema europeo de datos federados" 
  },
  { 
    icon: Network, 
    title: "Conectores EDC", 
    description: "Eclipse Dataspace Components certificados para interoperabilidad con otros espacios de datos" 
  },
  { 
    icon: Wallet, 
    title: "Wallets Digitales", 
    description: "Identidad digital soberana para ITBID y sus usuarios dentro del ecosistema" 
  },
  { 
    icon: GraduationCap, 
    title: "Formación", 
    description: "Capacitación técnica y operativa completa del equipo ITBID" 
  }
];

const fase1EconomicFlow = [
  { concept: "Pago anticipado ITBID", amount: "5.000€", timing: "Inicio del proyecto", actor: "ITBID → Agile Procurement" },
  { concept: "Ejecución completa del proyecto", amount: "30.000€ (valor)", timing: "Meses 1-2", actor: "Agile Procurement" },
  { concept: "Subvención Red.es", amount: "30.000€", timing: "Post-justificación", actor: "Red.es → ITBID" },
  { concept: "Pago diferido ITBID", amount: "25.000€", timing: "Al recibir subvención", actor: "ITBID → Agile Procurement" },
];

// FASE 2 Data - Modelo de Escalado Ecosistema ITBID
const fase2Benefits = [
  { 
    icon: BadgeCheck, 
    title: "Membresía 3 años", 
    description: "Acceso completo al Nodo Web3 ITBID durante 36 meses" 
  },
  { 
    icon: Database, 
    title: "Servicios del Catálogo", 
    description: "Acceso a todos los servicios ofertados en el ecosistema ITBID" 
  },
  { 
    icon: Shield, 
    title: "Identidad Digital", 
    description: "Wallet digital soberana para operar en el ecosistema GAIA-X" 
  },
  { 
    icon: Network, 
    title: "Interoperabilidad", 
    description: "Conexión con otros espacios de datos europeos" 
  }
];

const fase2EconomicFlow = [
  { concept: "Pago anticipado empresa", amount: "2.000€", timing: "Al iniciar solicitud", actor: "Empresa → Agile Procurement" },
  { concept: "Gestión y tramitación", amount: "15.000€ (objetivo)", timing: "Tramitación", actor: "Agile Procurement gestiona" },
  { concept: "Subvención Red.es", amount: "15.000€", timing: "Post-justificación", actor: "Red.es → Empresa" },
  { concept: "Pago diferido empresa", amount: "8.000€", timing: "Al recibir subvención", actor: "Empresa → Agile Procurement" },
];

const fase2Scenarios = [
  { scenario: "Conservador", companies: 10, revenueAP: "100.000€", subsidiesTotal: "150.000€", netBenefitCompanies: "50.000€" },
  { scenario: "Realista", companies: 25, revenueAP: "250.000€", subsidiesTotal: "375.000€", netBenefitCompanies: "125.000€", highlight: true },
  { scenario: "Éxito", companies: 50, revenueAP: "500.000€", subsidiesTotal: "750.000€", netBenefitCompanies: "250.000€" }
];

const phases = [
  {
    phase: 1,
    title: "Adhesión al Nodo GAIA-X",
    period: "Mes 1",
    icon: Rocket,
    color: "itbid-cyan",
    objective: "Establecer a ITBID como nodo certificado dentro del ecosistema GAIA-X",
    description: "Agile Procurement subroga sus capacidades de Gobernanza del ecosistema PROCUREDATA para que ITBID obtenga su propio Nodo dentro de la Web3 de Espacios de Datos Federados Europeos GAIA-X.",
    isCustomPhase1: true
  },
  {
    phase: 2,
    title: "Escalado del Ecosistema ITBID",
    period: "Meses 3-6",
    icon: Users,
    color: "itbid-magenta",
    objective: "Incorporar empresas del ecosistema ITBID al Nodo Web3 mediante subvenciones de 15.000€",
    description: "Una vez ITBID tiene su Nodo GAIA-X operativo, promovemos la adhesión de empresas de su ecosistema, ayudándolas a solicitar ayudas de 15.000€ para cubrir los costes de membresía de 3 años al Nodo Web3 de ITBID.",
    isCustomPhase2: true
  },
  {
    phase: 3,
    title: "Servicios Premium y Expansión",
    period: "Mes 6+",
    icon: TrendingUp,
    color: "itbid-lime",
    objective: "Desarrollar servicios de alto valor para las empresas miembro del ecosistema.",
    description: "Con el ecosistema consolidado, desarrollamos servicios premium que las empresas miembro pueden consumir para maximizar el valor de su membresía.",
    services: [
      {
        icon: Brain,
        name: "Servicio A: Inteligencia Artificial Federada (AVI-A 2.0)",
        desc: "Entrenamiento de modelos distribuidos usando los datos de las empresas miembro (sin mover sus datos)."
      },
      {
        icon: Link2,
        name: "Servicio B: Visibilidad Tier-N",
        desc: "Habilitar las consultas en cadena para clientes del sector industrial."
      },
      {
        icon: Banknote,
        name: "Servicio C: Módulo Financiero",
        desc: "Conectar con un banco partner para ofrecer factoring a los proveedores de estas empresas."
      }
    ],
    expansion: "Abrir el Nodo ITBID-X a proveedores externos y otros ecosistemas (Catena-X)."
  }
];

const simulatorData = [
  { 
    scenario: "Conservador", 
    companies: 10, 
    funds: "150.000 €", 
    cost: "80.000 €", 
    budget: "+ 70.000 €",
    highlight: false
  },
  { 
    scenario: "Realista", 
    companies: 25, 
    funds: "375.000 €", 
    cost: "120.000 € (Economía de escala)", 
    budget: "+ 255.000 €",
    highlight: true
  },
  { 
    scenario: "Éxito", 
    companies: 50, 
    funds: "750.000 €", 
    cost: "200.000 €", 
    budget: "+ 550.000 €",
    highlight: false
  }
];

export const DocHojaDeRuta = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[hsl(var(--itbid-cyan)/0.1)] text-[hsl(var(--itbid-cyan))] border-[hsl(var(--itbid-cyan)/0.3)]">
              <Target className="h-3 w-3 mr-1" />
              Sección 9 - Estrategia de Despliegue
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hoja de Ruta: Despliegue Financiado de ITBID-X
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Estrategia de <strong>Co-Inversión</strong> basada en Volumen de Adhesión
            </p>
          </div>
        </FadeIn>

        {/* Kit Espacio de Datos Hero */}
        <FadeIn delay={0.1}>
          <Card className="mb-8 bg-gradient-to-r from-[hsl(var(--itbid-cyan)/0.1)] via-[hsl(var(--itbid-magenta)/0.05)] to-[hsl(var(--itbid-lime)/0.1)] border-[hsl(var(--itbid-cyan)/0.3)] overflow-hidden">
            <CardContent className="py-8">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="shrink-0">
                  <img 
                    src={kitLogo} 
                    alt="Kit Espacio de Datos" 
                    className="h-24 w-auto object-contain"
                  />
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <Badge className="mb-4 bg-[hsl(var(--itbid-lime)/0.2)] text-[hsl(var(--itbid-lime))] border-[hsl(var(--itbid-lime)/0.3)]">
                    <Euro className="h-3 w-3 mr-1" />
                    SUBVENCIÓN KIT ESPACIO DE DATOS
                  </Badge>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">
                    Subvención de hasta <span className="text-[hsl(var(--itbid-lime))]">30.000€</span> para adherirse a Espacios de Datos Federados
                  </h3>
                  <p className="text-muted-foreground">
                    Fondos europeos a través de <strong>Red.es</strong> para impulsar la soberanía digital y la economía del dato en España
                  </p>
                </div>
              </div>

              {/* 4 Pillars */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {[
                  { icon: Database, label: "Datos Fiables", color: "itbid-cyan" },
                  { icon: Brain, label: "IA de Calidad", color: "itbid-magenta" },
                  { icon: Shield, label: "Confianza", color: "itbid-lime" },
                  { icon: Zap, label: "Velocidad", color: "itbid-cyan" }
                ].map((pillar) => (
                  <div 
                    key={pillar.label}
                    className={`flex flex-col items-center p-4 rounded-xl bg-[hsl(var(--${pillar.color})/0.1)] border border-[hsl(var(--${pillar.color})/0.3)]`}
                  >
                    <pillar.icon className={`h-8 w-8 text-[hsl(var(--${pillar.color}))] mb-2`} />
                    <span className="font-semibold text-sm text-center">{pillar.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Pricing Options */}
        <FadeIn delay={0.15}>
          <div className="mb-12">
            <div className="text-center mb-6">
              <Badge variant="outline" className="bg-[hsl(var(--itbid-lime)/0.1)] border-[hsl(var(--itbid-lime)/0.3)] text-[hsl(var(--itbid-lime))]">
                <Globe className="h-3 w-3 mr-1" />
                Fondos Públicos Red.es — 100% a fondo perdido
              </Badge>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Option A - 15.000€ */}
              <Card className="border-[hsl(var(--itbid-cyan)/0.3)] relative">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-[hsl(var(--itbid-cyan)/0.2)] text-[hsl(var(--itbid-cyan))] border-[hsl(var(--itbid-cyan)/0.3)]">
                      Opción A
                    </Badge>
                    <span className="text-3xl font-bold text-[hsl(var(--itbid-cyan))]">15.000€</span>
                  </div>
                  <CardTitle className="text-xl">Adhesión Espacio de datos PROCUREDATA</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {[
                      { icon: Network, text: "Conector IDS/Gaia-X certificado" },
                      { icon: Shield, text: "Wallet de Identidad Soberana" },
                      { icon: Users, text: "Asociación y Formación especializada" }
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[hsl(var(--itbid-cyan)/0.1)] flex items-center justify-center shrink-0">
                          <item.icon className="h-4 w-4 text-[hsl(var(--itbid-cyan))]" />
                        </div>
                        <span className="text-sm">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="p-4 rounded-lg bg-muted/50 text-center">
                    <p className="text-sm text-muted-foreground">Coste inicial cliente</p>
                    <p className="text-2xl font-bold">2.000€</p>
                    <p className="text-xs text-muted-foreground">(recuperables con la subvención)</p>
                  </div>
                </CardContent>
              </Card>

              {/* Option B - 30.000€ */}
              <Card className="border-2 border-[hsl(var(--itbid-lime)/0.5)] relative bg-gradient-to-b from-[hsl(var(--itbid-lime)/0.05)] to-transparent">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-[hsl(var(--itbid-lime))] text-white">
                    <Sparkles className="h-3 w-3 mr-1" />
                    RECOMENDADO
                  </Badge>
                </div>
                <CardHeader className="pt-8">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-[hsl(var(--itbid-lime)/0.2)] text-[hsl(var(--itbid-lime))] border-[hsl(var(--itbid-lime)/0.3)]">
                      Opción B
                    </Badge>
                    <span className="text-3xl font-bold text-[hsl(var(--itbid-lime))]">30.000€</span>
                  </div>
                  <CardTitle className="text-xl">Adhesión + Caso de uso</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {[
                      { icon: CheckCircle2, text: "Todo incluido de la Opción A", highlight: true },
                      { icon: BadgeCheck, text: "Consultoría personalizada de Caso de Uso" },
                      { icon: Settings, text: "Desarrollo a Medida (API/IoT)" },
                      { icon: TrendingUp, text: "Visibilidad como Pionero del ecosistema" }
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg ${item.highlight ? 'bg-[hsl(var(--itbid-cyan)/0.1)]' : 'bg-[hsl(var(--itbid-lime)/0.1)]'} flex items-center justify-center shrink-0`}>
                          <item.icon className={`h-4 w-4 ${item.highlight ? 'text-[hsl(var(--itbid-cyan))]' : 'text-[hsl(var(--itbid-lime))]'}`} />
                        </div>
                        <span className={`text-sm ${item.highlight ? 'text-muted-foreground' : ''}`}>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="p-4 rounded-lg bg-[hsl(var(--itbid-lime)/0.1)] border border-[hsl(var(--itbid-lime)/0.3)] text-center">
                    <p className="text-sm text-muted-foreground">Coste inicial cliente</p>
                    <p className="text-2xl font-bold text-[hsl(var(--itbid-lime))]">5.000€</p>
                    <p className="text-xs text-muted-foreground">(recuperables con la subvención)</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </FadeIn>

        {/* 3 Phases Timeline */}
        <div className="space-y-8 mb-12">
          {phases.map((phase, idx) => (
            <FadeIn key={phase.phase} delay={0.15 + idx * 0.1}>
              <Card className={`border-l-4 border-l-[hsl(var(--${phase.color}))]`}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-[hsl(var(--${phase.color})/0.1)] flex items-center justify-center shrink-0`}>
                      <phase.icon className={`h-7 w-7 text-[hsl(var(--${phase.color}))]`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={`bg-[hsl(var(--${phase.color})/0.2)] text-[hsl(var(--${phase.color}))] border-[hsl(var(--${phase.color})/0.3)]`}>
                          Fase {phase.phase}
                        </Badge>
                        <Badge variant="outline">{phase.period}</Badge>
                      </div>
                      <CardTitle className="text-xl md:text-2xl">{phase.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        <strong>Objetivo:</strong> {phase.objective}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{phase.description}</p>

                  {/* FASE 1 - Custom Content: Modelo Agile Procurement + ITBID */}
                  {'isCustomPhase1' in phase && phase.isCustomPhase1 && (
                    <div className="space-y-6">
                      {/* Logo y Propuesta de Valor */}
                      <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-xl bg-gradient-to-r from-[hsl(var(--itbid-cyan)/0.1)] to-[hsl(var(--itbid-magenta)/0.05)] border border-[hsl(var(--itbid-cyan)/0.3)]">
                        <img 
                          src={agileProcurementLogo} 
                          alt="Agile Procurement" 
                          className="h-20 w-auto object-contain"
                        />
                        <div className="text-center md:text-left">
                          <h4 className="text-lg font-bold mb-2">Agile Procurement = PROCUREDATA</h4>
                          <p className="text-muted-foreground">
                            Agile Procurement subroga sus capacidades de Gobernanza del ecosistema PROCUREDATA 
                            para que ITBID obtenga su propio Nodo dentro de la Web3 de Espacios de Datos Federados Europeos GAIA-X.
                          </p>
                        </div>
                      </div>

                      {/* 4 Entregables del Proyecto */}
                      <div>
                        <p className="font-semibold mb-4 flex items-center gap-2 text-lg">
                          <CheckCircle2 className="h-5 w-5 text-[hsl(var(--itbid-lime))]" />
                          Entregables del Proyecto (30.000€)
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {fase1Deliverables.map((item) => (
                            <div 
                              key={item.title} 
                              className="p-4 rounded-xl border bg-card hover:bg-[hsl(var(--itbid-cyan)/0.05)] transition-colors"
                            >
                              <div className="w-12 h-12 rounded-xl bg-[hsl(var(--itbid-cyan)/0.1)] flex items-center justify-center mb-3">
                                <item.icon className="h-6 w-6 text-[hsl(var(--itbid-cyan))]" />
                              </div>
                              <p className="font-semibold mb-1">{item.title}</p>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Flujo Financiero Visual */}
                      <div className="p-6 rounded-xl bg-muted/30 border">
                        <p className="font-semibold mb-4 flex items-center gap-2 text-lg">
                          <Euro className="h-5 w-5 text-[hsl(var(--itbid-lime))]" />
                          Modelo Financiero
                        </p>
                        
                        {/* Diagrama Visual del Flujo */}
                        <div className="grid md:grid-cols-3 gap-4 mb-6">
                          {/* ITBID */}
                          <div className="p-4 rounded-xl border-2 border-[hsl(var(--itbid-cyan)/0.5)] bg-[hsl(var(--itbid-cyan)/0.05)] text-center">
                            <p className="font-bold text-lg text-[hsl(var(--itbid-cyan))]">ITBID</p>
                            <p className="text-sm text-muted-foreground">Solicita subvención</p>
                            <div className="mt-3 space-y-1">
                              <Badge className="bg-[hsl(var(--itbid-cyan)/0.2)] text-[hsl(var(--itbid-cyan))]">
                                Paga 5.000€ anticipado
                              </Badge>
                              <p className="text-xs text-muted-foreground">+25.000€ al recibir subvención</p>
                            </div>
                          </div>

                          {/* Arrow */}
                          <div className="flex items-center justify-center">
                            <div className="flex flex-col items-center gap-2">
                              <ArrowRight className="h-8 w-8 text-muted-foreground hidden md:block" />
                              <div className="text-center">
                                <Badge variant="outline" className="bg-background">
                                  <FileCheck className="h-3 w-3 mr-1" />
                                  Proyecto ejecutado
                                </Badge>
                              </div>
                            </div>
                          </div>

                          {/* Agile Procurement */}
                          <div className="p-4 rounded-xl border-2 border-[hsl(var(--itbid-magenta)/0.5)] bg-[hsl(var(--itbid-magenta)/0.05)] text-center">
                            <p className="font-bold text-lg text-[hsl(var(--itbid-magenta))]">Agile Procurement</p>
                            <p className="text-sm text-muted-foreground">Ejecuta proyecto completo</p>
                            <div className="mt-3 space-y-1">
                              <Badge className="bg-[hsl(var(--itbid-magenta)/0.2)] text-[hsl(var(--itbid-magenta))]">
                                Valor: 30.000€
                              </Badge>
                              <p className="text-xs text-muted-foreground">Usando capacidades PROCUREDATA</p>
                            </div>
                          </div>
                        </div>

                        {/* Tabla de Flujo Económico */}
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Concepto</TableHead>
                              <TableHead>Importe</TableHead>
                              <TableHead>Momento</TableHead>
                              <TableHead className="hidden md:table-cell">Flujo</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {fase1EconomicFlow.map((row, i) => (
                              <TableRow key={i}>
                                <TableCell className="font-medium">{row.concept}</TableCell>
                                <TableCell className="font-semibold text-[hsl(var(--itbid-lime))]">{row.amount}</TableCell>
                                <TableCell className="text-muted-foreground">{row.timing}</TableCell>
                                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{row.actor}</TableCell>
                              </TableRow>
                            ))}
                            <TableRow className="bg-[hsl(var(--itbid-lime)/0.1)]">
                              <TableCell className="font-bold">Coste neto ITBID</TableCell>
                              <TableCell className="font-bold text-2xl text-[hsl(var(--itbid-lime))]">0€</TableCell>
                              <TableCell className="text-muted-foreground">—</TableCell>
                              <TableCell className="hidden md:table-cell font-semibold">Proyecto 100% financiado</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>

                      {/* Subvención Red.es */}
                      <div className="p-4 rounded-xl bg-[hsl(var(--itbid-lime)/0.1)] border border-[hsl(var(--itbid-lime)/0.3)]">
                        <div className="flex items-start gap-4">
                          <img 
                            src={kitLogo} 
                            alt="Kit Espacio de Datos" 
                            className="h-12 w-auto object-contain hidden md:block"
                          />
                          <div>
                            <p className="font-semibold flex items-center gap-2 mb-1">
                              <Euro className="h-4 w-4 text-[hsl(var(--itbid-lime))]" />
                              Subvención Kit Espacio de Datos — Red.es
                            </p>
                            <p className="text-sm text-muted-foreground">
                              La subvención Kit Espacio de Datos de Red.es requiere presentar la <strong>justificación de ejecución 
                              y finalización del proyecto</strong> en el momento de solicitar la ayuda. Por esto, Agile Procurement 
                              debe ejecutar completamente el proyecto antes de que ITBID reciba los fondos.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Card de Asunción de Riesgo */}
                      <div className="p-6 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-2 border-amber-500/30">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                            <Shield className="h-7 w-7 text-amber-500" />
                          </div>
                          <div>
                            <p className="text-xl font-bold mb-2 text-amber-600 dark:text-amber-400">
                              Compromiso de Agile Procurement
                            </p>
                            <p className="text-muted-foreground mb-4">
                              Para demostrar nuestra confianza en el proyecto y en ITBID como cliente estratégico, 
                              Agile Procurement asume el riesgo de ejecución anticipada:
                            </p>
                            <ul className="space-y-2 mb-4">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                                <span>Ejecutamos el <strong>100% del proyecto</strong> antes de recibir el 83% del pago</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                                <span>Asumimos el <strong>riesgo de que la subvención no sea concedida</strong></span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Shield className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                                <span>ITBID <strong>no tiene riesgo financiero significativo</strong></span>
                              </li>
                            </ul>
                            <div className="p-3 rounded-lg bg-amber-500/20 border border-amber-500/30">
                              <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                                Este modelo requiere la <strong>aprobación formal de ITBID</strong> para proceder.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FASE 2 - Custom Content: Modelo de Escalado Ecosistema ITBID */}
                  {'isCustomPhase2' in phase && phase.isCustomPhase2 && (
                    <div className="space-y-6">
                      {/* Logo y Propuesta de Valor */}
                      <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-xl bg-gradient-to-r from-[hsl(var(--itbid-magenta)/0.1)] to-[hsl(var(--itbid-cyan)/0.05)] border border-[hsl(var(--itbid-magenta)/0.3)]">
                        <img 
                          src={agileProcurementLogo} 
                          alt="Agile Procurement" 
                          className="h-20 w-auto object-contain"
                        />
                        <div className="text-center md:text-left">
                          <h4 className="text-lg font-bold mb-2">Membresía al Nodo Web3 ITBID</h4>
                          <p className="text-muted-foreground">
                            Agile Procurement ayuda a las empresas del ecosistema ITBID a solicitar la subvención de 15.000€ 
                            para cubrir los costes de membresía al Nodo Web3, otorgando <strong>3 años de acceso completo</strong> al ecosistema de datos federados.
                          </p>
                        </div>
                      </div>

                      {/* 4 Beneficios para las Empresas */}
                      <div>
                        <p className="font-semibold mb-4 flex items-center gap-2 text-lg">
                          <CheckCircle2 className="h-5 w-5 text-[hsl(var(--itbid-magenta))]" />
                          Beneficios de la Membresía (3 años)
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {fase2Benefits.map((item) => (
                            <div 
                              key={item.title} 
                              className="p-4 rounded-xl border bg-card hover:bg-[hsl(var(--itbid-magenta)/0.05)] transition-colors"
                            >
                              <div className="w-12 h-12 rounded-xl bg-[hsl(var(--itbid-magenta)/0.1)] flex items-center justify-center mb-3">
                                <item.icon className="h-6 w-6 text-[hsl(var(--itbid-magenta))]" />
                              </div>
                              <p className="font-semibold mb-1">{item.title}</p>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Flujo Financiero Visual */}
                      <div className="p-6 rounded-xl bg-muted/30 border">
                        <p className="font-semibold mb-4 flex items-center gap-2 text-lg">
                          <Euro className="h-5 w-5 text-[hsl(var(--itbid-magenta))]" />
                          Modelo Financiero por Empresa
                        </p>
                        
                        {/* Diagrama Visual del Flujo */}
                        <div className="grid md:grid-cols-3 gap-4 mb-6">
                          {/* Empresa */}
                          <div className="p-4 rounded-xl border-2 border-[hsl(var(--itbid-cyan)/0.5)] bg-[hsl(var(--itbid-cyan)/0.05)] text-center">
                            <p className="font-bold text-lg text-[hsl(var(--itbid-cyan))]">Empresa Ecosistema</p>
                            <p className="text-sm text-muted-foreground">Solicita subvención</p>
                            <div className="mt-3 space-y-1">
                              <Badge className="bg-[hsl(var(--itbid-cyan)/0.2)] text-[hsl(var(--itbid-cyan))]">
                                Paga 2.000€ anticipado
                              </Badge>
                              <p className="text-xs text-muted-foreground">+8.000€ al recibir subvención</p>
                            </div>
                          </div>

                          {/* Arrow */}
                          <div className="flex items-center justify-center">
                            <div className="flex flex-col items-center gap-2">
                              <ArrowRight className="h-8 w-8 text-muted-foreground hidden md:block" />
                              <div className="text-center">
                                <Badge variant="outline" className="bg-background">
                                  <FileCheck className="h-3 w-3 mr-1" />
                                  Membresía 3 años
                                </Badge>
                              </div>
                            </div>
                          </div>

                          {/* Agile Procurement */}
                          <div className="p-4 rounded-xl border-2 border-[hsl(var(--itbid-magenta)/0.5)] bg-[hsl(var(--itbid-magenta)/0.05)] text-center">
                            <p className="font-bold text-lg text-[hsl(var(--itbid-magenta))]">Agile Procurement</p>
                            <p className="text-sm text-muted-foreground">Gestiona solicitud + activa membresía</p>
                            <div className="mt-3 space-y-1">
                              <Badge className="bg-[hsl(var(--itbid-magenta)/0.2)] text-[hsl(var(--itbid-magenta))]">
                                Ingreso: 10.000€
                              </Badge>
                              <p className="text-xs text-muted-foreground">Por empresa adherida</p>
                            </div>
                          </div>
                        </div>

                        {/* Tabla de Flujo Económico */}
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Concepto</TableHead>
                              <TableHead>Importe</TableHead>
                              <TableHead>Momento</TableHead>
                              <TableHead className="hidden md:table-cell">Flujo</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {fase2EconomicFlow.map((row, i) => (
                              <TableRow key={i}>
                                <TableCell className="font-medium">{row.concept}</TableCell>
                                <TableCell className="font-semibold text-[hsl(var(--itbid-magenta))]">{row.amount}</TableCell>
                                <TableCell className="text-muted-foreground">{row.timing}</TableCell>
                                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{row.actor}</TableCell>
                              </TableRow>
                            ))}
                            <TableRow className="bg-[hsl(var(--itbid-lime)/0.1)]">
                              <TableCell className="font-bold">Total a Agile Procurement</TableCell>
                              <TableCell className="font-bold text-xl text-[hsl(var(--itbid-magenta))]">10.000€</TableCell>
                              <TableCell className="text-muted-foreground">—</TableCell>
                              <TableCell className="hidden md:table-cell font-semibold">Por empresa</TableCell>
                            </TableRow>
                            <TableRow className="bg-[hsl(var(--itbid-cyan)/0.1)]">
                              <TableCell className="font-bold">Beneficio neto empresa</TableCell>
                              <TableCell className="font-bold text-xl text-[hsl(var(--itbid-lime))]">+5.000€</TableCell>
                              <TableCell className="text-muted-foreground">—</TableCell>
                              <TableCell className="hidden md:table-cell font-semibold">+ Membresía 3 años</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>

                      {/* Card de Asunción de Riesgo */}
                      <div className="p-6 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-2 border-amber-500/30">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                            <Shield className="h-7 w-7 text-amber-500" />
                          </div>
                          <div>
                            <p className="text-xl font-bold mb-2 text-amber-600 dark:text-amber-400">
                              Modelo de Mitigación de Riesgo
                            </p>
                            <p className="text-muted-foreground mb-4">
                              Agile Procurement asume el riesgo de gestión anticipada para las empresas del ecosistema ITBID:
                            </p>
                            <ul className="space-y-2 mb-4">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                                <span>Gestiona la <strong>solicitud completa</strong> antes de recibir el 80% del pago</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                                <span>Asume el <strong>riesgo de no-concesión</strong> de la subvención</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Shield className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                                <span>La empresa solo arriesga <strong>2.000€ iniciales</strong></span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Tabla de Escenarios de Escalado */}
                      <div className="p-6 rounded-xl bg-[hsl(var(--itbid-magenta)/0.05)] border border-[hsl(var(--itbid-magenta)/0.2)]">
                        <p className="font-semibold mb-4 flex items-center gap-2 text-lg">
                          <TrendingUp className="h-5 w-5 text-[hsl(var(--itbid-magenta))]" />
                          Potencial de Escalado del Ecosistema
                        </p>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Escenario</TableHead>
                              <TableHead className="text-center">Empresas</TableHead>
                              <TableHead className="text-right">Ingresos AP</TableHead>
                              <TableHead className="text-right">Subvenciones Totales</TableHead>
                              <TableHead className="text-right">Beneficio Empresas</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {fase2Scenarios.map((row) => (
                              <TableRow 
                                key={row.scenario} 
                                className={row.highlight ? "bg-[hsl(var(--itbid-magenta)/0.1)]" : ""}
                              >
                                <TableCell className="font-medium">
                                  {row.highlight && (
                                    <Badge className="mr-2 bg-[hsl(var(--itbid-magenta))]">Objetivo</Badge>
                                  )}
                                  {row.scenario}
                                </TableCell>
                                <TableCell className="text-center font-mono">{row.companies}</TableCell>
                                <TableCell className="text-right font-mono text-[hsl(var(--itbid-magenta))]">{row.revenueAP}</TableCell>
                                <TableCell className="text-right font-mono text-[hsl(var(--itbid-cyan))]">{row.subsidiesTotal}</TableCell>
                                <TableCell className="text-right font-mono font-bold text-[hsl(var(--itbid-lime))]">{row.netBenefitCompanies}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  )}

                  {/* Phase 3 specific content */}
                  {phase.services && (
                    <div className="mb-4">
                      <p className="font-semibold mb-3">Servicios Premium:</p>
                      <div className="space-y-3">
                        {phase.services.map((service) => (
                          <div key={service.name} className="flex items-start gap-3 p-3 rounded-lg border bg-card">
                            <div className="w-10 h-10 rounded-lg bg-[hsl(var(--itbid-lime)/0.1)] flex items-center justify-center shrink-0">
                              <service.icon className="h-5 w-5 text-[hsl(var(--itbid-lime))]" />
                            </div>
                            <div>
                              <p className="font-medium">{service.name}</p>
                              <p className="text-sm text-muted-foreground">{service.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {phase.expansion && (
                    <div className="p-4 rounded-lg bg-[hsl(var(--itbid-lime)/0.1)] border border-[hsl(var(--itbid-lime)/0.3)]">
                      <p className="font-semibold flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-[hsl(var(--itbid-lime))]" />
                        Escalado:
                      </p>
                      <p className="text-muted-foreground">{phase.expansion}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>

        {/* Financial Simulator */}
        <FadeIn delay={0.5}>
          <Card className="border-[hsl(var(--itbid-cyan)/0.3)]">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <TrendingUp className="h-5 w-5 text-[hsl(var(--itbid-cyan))]" />
                Simulador de Impacto Financiero
              </CardTitle>
              <p className="text-center text-muted-foreground">
                Análisis de escenarios para la toma de decisiones
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Escenario</TableHead>
                      <TableHead className="text-center">Empresas Adheridas</TableHead>
                      <TableHead className="text-right">Fondos Movilizados</TableHead>
                      <TableHead className="text-right">Coste Infraestructura</TableHead>
                      <TableHead className="text-right">Presupuesto I+D+i</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {simulatorData.map((row) => (
                      <TableRow 
                        key={row.scenario} 
                        className={row.highlight ? "bg-[hsl(var(--itbid-cyan)/0.05)]" : ""}
                      >
                        <TableCell className="font-medium">
                          {row.highlight && (
                            <Badge className="mr-2 bg-[hsl(var(--itbid-cyan))]">Recomendado</Badge>
                          )}
                          {row.scenario}
                        </TableCell>
                        <TableCell className="text-center font-mono">{row.companies}</TableCell>
                        <TableCell className="text-right font-mono text-[hsl(var(--itbid-lime))]">{row.funds}</TableCell>
                        <TableCell className="text-right font-mono text-muted-foreground">{row.cost}</TableCell>
                        <TableCell className="text-right font-mono font-bold text-[hsl(var(--itbid-cyan))]">{row.budget}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Key Message */}
        <FadeIn delay={0.6}>
          <Card className="mt-8 bg-gradient-to-r from-[hsl(var(--itbid-cyan)/0.15)] via-[hsl(var(--itbid-magenta)/0.1)] to-[hsl(var(--itbid-lime)/0.15)] border-2 border-[hsl(var(--itbid-cyan)/0.3)]">
            <CardContent className="py-8">
              <div className="text-center max-w-3xl mx-auto">
                <Zap className="h-12 w-12 text-[hsl(var(--itbid-cyan))] mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">La Decisión Obvia ("No-Brainer")</h3>
                <p className="text-lg text-muted-foreground">
                  Con solo <strong className="text-[hsl(var(--itbid-lime))]">25 clientes</strong> (una fracción pequeña de la cartera de ITBID), 
                  generamos <strong className="text-[hsl(var(--itbid-cyan))]">un cuarto de millón de euros</strong> de "Free Cash Flow" 
                  para desarrollar tecnología punta, <strong>sin que ITBID toque su caja</strong> y <strong>sin coste para el cliente</strong>.
                </p>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
};
