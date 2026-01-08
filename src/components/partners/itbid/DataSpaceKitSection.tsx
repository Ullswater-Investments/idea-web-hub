import { motion } from "framer-motion";
import { 
  DoorOpen, 
  Euro, 
  CheckCircle2, 
  Building, 
  Factory, 
  Warehouse,
  FileSignature,
  Settings,
  Rocket,
  AlertTriangle,
  Gift,
  Sparkles,
  ArrowRight,
  Users,
  Cpu,
  Brain
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Bloque 1: La Barrera Levantada
const BarrierLiftedBlock = () => (
  <motion.div
    variants={itemVariants}
    className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/20 via-yellow-500/10 to-cyan-500/20 p-8 md:p-12 border border-amber-500/30"
  >
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-400/10 via-transparent to-transparent" />
    
    <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
      {/* Animación de barrera */}
      <div className="flex-shrink-0 relative w-48 h-48">
        {/* Barrera que sube */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: -60 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="absolute inset-x-4 top-8 h-16 bg-gradient-to-r from-red-500/80 to-orange-500/80 rounded-lg border-4 border-red-600/50 flex items-center justify-center"
        >
          <span className="text-white font-bold text-xs tracking-wide">COSTE DE ENTRADA</span>
        </motion.div>
        
        {/* Postes */}
        <div className="absolute left-4 top-8 w-4 h-32 bg-slate-600 rounded-t-lg" />
        <div className="absolute right-4 top-8 w-4 h-32 bg-slate-600 rounded-t-lg" />
        
        {/* Camino digital revelado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute inset-x-8 bottom-4 h-20 bg-gradient-to-t from-cyan-500/40 to-transparent rounded-xl flex items-end justify-center pb-2"
        >
          <Sparkles className="h-8 w-8 text-cyan-400 animate-pulse" />
        </motion.div>
      </div>

      {/* Texto */}
      <div className="flex-1 text-center lg:text-left">
        <Badge className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30">
          <Gift className="h-3 w-3 mr-1" />
          Financiación 100%
        </Badge>
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
          El coste de entrada <span className="text-amber-400">ya no existe</span>
        </h3>
        <p className="text-lg text-slate-300 max-w-xl">
          Las <strong className="text-cyan-400">Ayudas Red.es</strong> y el <strong className="text-cyan-400">Kit Digital</strong> financian 
          tu acceso completo al espacio de datos <strong className="text-lime-400">ITBID-X</strong>. 
          Sin inversión inicial. Sin riesgo.
        </p>
      </div>

      <DoorOpen className="hidden lg:block h-24 w-24 text-amber-400/50" />
    </div>
  </motion.div>
);

// Bloque 2: Las Dos Vías a Coste Cero
const PricingComparisonBlock = () => {
  const optionA = {
    title: "Opción A: Estándar",
    value: "15.000€",
    color: "cyan",
    features: [
      "Conector IDS/Gaia-X certificado",
      "Wallet de Identidad Soberana",
      "Asociación y Formación especializada"
    ]
  };

  const optionB = {
    title: "Opción B: Early Adopter",
    value: "hasta 30.000€",
    color: "purple",
    featured: true,
    features: [
      "Todo incluido de la Opción A",
      "Consultoría personalizada de Caso de Uso",
      "Desarrollo a Medida (API/IoT)",
      "Visibilidad como Pionero del ecosistema"
    ]
  };

  return (
    <motion.div variants={itemVariants} className="space-y-8">
      {/* Flujo de dinero público */}
      <div className="flex items-center justify-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-green-500/10 via-emerald-500/20 to-green-500/10 border border-green-500/20">
        <div className="flex items-center gap-2 text-green-400">
          <Euro className="h-6 w-6" />
          <span className="font-semibold">Fondos Públicos Red.es</span>
        </div>
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex items-center gap-1 text-green-400"
        >
          <ArrowRight className="h-5 w-5" />
          <ArrowRight className="h-5 w-5" />
          <ArrowRight className="h-5 w-5" />
        </motion.div>
        <Badge variant="outline" className="border-green-500/50 text-green-400">
          Cubre el 100% de ambas opciones
        </Badge>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Opción A */}
        <Card className="relative overflow-hidden bg-slate-900/50 border-cyan-500/30 hover:border-cyan-400/50 transition-colors">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-cyan-400" />
          <CardHeader className="text-center pb-4">
            <Badge className="w-fit mx-auto mb-2 bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
              Valorado en {optionA.value}
            </Badge>
            <CardTitle className="text-xl text-white">{optionA.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {optionA.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-slate-700">
              <div className="text-center p-4 rounded-xl bg-gradient-to-r from-cyan-500/20 to-cyan-400/10 border border-cyan-500/30">
                <p className="text-sm text-slate-400 mb-1">Coste final para ti</p>
                <p className="text-4xl font-bold text-cyan-400">0 €</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Opción B - Featured */}
        <Card className="relative overflow-hidden bg-slate-900/50 border-purple-500/50 hover:border-purple-400/60 transition-colors ring-2 ring-purple-500/20">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-500" />
          <div className="absolute top-4 right-4">
            <Badge className="bg-purple-500 text-white border-0">
              <Sparkles className="h-3 w-3 mr-1" />
              Recomendado
            </Badge>
          </div>
          <CardHeader className="text-center pb-4">
            <Badge className="w-fit mx-auto mb-2 bg-purple-500/20 text-purple-300 border-purple-500/30">
              Valorado en {optionB.value}
            </Badge>
            <CardTitle className="text-xl text-white">{optionB.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {optionB.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300">
                  <CheckCircle2 className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-slate-700">
              <div className="text-center p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-fuchsia-500/10 border border-purple-500/30">
                <p className="text-sm text-slate-400 mb-1">Coste final para ti</p>
                <p className="text-4xl font-bold text-purple-400">0 €</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

// Bloque 3: El Efecto Red Financiero
const NetworkEffectBlock = () => {
  const companies = [
    Building, Factory, Warehouse, Building, Factory,
    Warehouse, Building, Factory, Warehouse, Building,
    Factory, Warehouse, Building, Factory, Warehouse
  ];

  return (
    <motion.div variants={itemVariants} className="space-y-6">
      <div className="text-center mb-8">
        <Badge className="mb-4 bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
          Efecto Multiplicador
        </Badge>
        <h3 className="text-2xl md:text-3xl font-bold text-white">
          El <span className="text-emerald-400">Efecto Red</span> Financiero
        </h3>
        <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
          Cada subvención individual contribuye a un fondo común que permite construir infraestructura robusta para todos
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr,auto,1fr] gap-6 items-center">
        {/* Empresas */}
        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
          <p className="text-sm text-slate-400 text-center mb-4">15-20 empresas participantes</p>
          <div className="grid grid-cols-5 gap-3">
            {companies.map((Icon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="p-2 rounded-lg bg-slate-700/50 flex items-center justify-center"
              >
                <Icon className="h-5 w-5 text-cyan-400" />
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-slate-500 text-center mt-3">Subvención Kit Digital individual</p>
        </div>

        {/* Flechas */}
        <div className="flex lg:flex-col items-center gap-2 py-4">
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="hidden lg:flex items-center"
          >
            <ArrowRight className="h-8 w-8 text-emerald-400" />
          </motion.div>
          <div className="lg:hidden flex items-center rotate-90">
            <ArrowRight className="h-8 w-8 text-emerald-400" />
          </div>
        </div>

        {/* Fondo Común */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
          <div className="text-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 mb-4"
            >
              <Euro className="h-10 w-10 text-emerald-400" />
            </motion.div>
            <h4 className="text-xl font-bold text-white mb-2">Fondo Común de Desarrollo</h4>
            <p className="text-3xl font-bold text-emerald-400">150K€ - 300K€</p>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-cyan-500/20">
            <Cpu className="h-6 w-6 text-cyan-400" />
          </div>
          <div>
            <h5 className="font-semibold text-white">Infraestructura Robusta ITBID-X</h5>
            <p className="text-sm text-slate-400">Conectores, APIs y servicios compartidos</p>
          </div>
        </div>
        <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-purple-500/20">
            <Brain className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h5 className="font-semibold text-white">Servicios Comunes Avanzados</h5>
            <p className="text-sm text-slate-400">IA Federada, analytics, gobernanza</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Bloque 4: Timeline Sin Burocracia
const SimplifiedTimelineBlock = () => {
  const steps = [
    {
      number: 1,
      title: "Adhesión",
      description: "Firmas la carta de interés",
      icon: FileSignature,
      color: "cyan"
    },
    {
      number: 2,
      title: "Tramitación Integral",
      description: "ProcureData gestiona toda la burocracia con Red.es por ti",
      icon: Settings,
      color: "lime",
      highlighted: true
    },
    {
      number: 3,
      title: "Implementación",
      description: "Desplegamos la tecnología y empezamos",
      icon: Rocket,
      color: "purple"
    }
  ];

  return (
    <motion.div variants={itemVariants} className="space-y-8">
      <div className="text-center">
        <Badge className="mb-4 bg-lime-500/20 text-lime-300 border-lime-500/30">
          Proceso Simplificado
        </Badge>
        <h3 className="text-2xl md:text-3xl font-bold text-white">
          Tu Camino <span className="text-lime-400">Sin Burocracia</span>
        </h3>
      </div>

      {/* Timeline */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
            className={`relative p-6 rounded-2xl border transition-all ${
              step.highlighted
                ? "bg-gradient-to-br from-lime-500/20 to-emerald-500/20 border-lime-500/50 ring-2 ring-lime-500/20 scale-105"
                : "bg-slate-800/50 border-slate-700 hover:border-slate-600"
            }`}
          >
            {/* Connector lines */}
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-3 md:-right-6 w-6 md:w-12 h-0.5 bg-gradient-to-r from-slate-600 to-transparent" />
            )}

            <div className="flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                step.highlighted
                  ? "bg-lime-500/30"
                  : step.color === "cyan" ? "bg-cyan-500/20" : "bg-purple-500/20"
              }`}>
                <step.icon className={`h-8 w-8 ${
                  step.highlighted
                    ? "text-lime-400"
                    : step.color === "cyan" ? "text-cyan-400" : "text-purple-400"
                }`} />
              </div>
              
              <Badge variant="outline" className={`mb-2 ${
                step.highlighted
                  ? "border-lime-500/50 text-lime-300"
                  : "border-slate-600 text-slate-400"
              }`}>
                Paso {step.number}
              </Badge>
              
              <h4 className={`text-lg font-bold mb-2 ${
                step.highlighted ? "text-lime-300" : "text-white"
              }`}>
                {step.title}
              </h4>
              
              <p className="text-sm text-slate-400">{step.description}</p>

              {step.highlighted && (
                <Badge className="mt-3 bg-lime-500/20 text-lime-300 border-lime-500/30">
                  <Users className="h-3 w-3 mr-1" />
                  Nosotros lo hacemos
                </Badge>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Urgency CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 border border-amber-500/30"
      >
        <div className="flex items-center gap-2 text-amber-400">
          <AlertTriangle className="h-5 w-5 animate-pulse" />
          <span className="font-semibold">Convocatoria Limitada</span>
        </div>
        <p className="text-slate-300 text-center sm:text-left">
          Plazas restringidas por convocatoria. ¡Reserva la tuya ahora!
        </p>
        <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
          <Rocket className="h-4 w-4 mr-2" />
          Reservar Plaza
        </Button>
      </motion.div>
    </motion.div>
  );
};

export const DataSpaceKitSection = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="space-y-16 md:space-y-24"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border-cyan-500/30 px-4 py-1">
              <Euro className="h-4 w-4 mr-2" />
              Acelerador Financiero
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Tu <span className="bg-gradient-to-r from-cyan-400 via-lime-400 to-purple-400 bg-clip-text text-transparent">Kit Espacio de Datos</span>
            </h2>
            <p className="text-lg text-slate-400">
              Accede a tecnología de vanguardia Gaia-X sin inversión inicial. 
              Las ayudas públicas cubren el 100% del coste.
            </p>
          </motion.div>

          {/* Bloque 1: La Barrera Levantada */}
          <BarrierLiftedBlock />

          {/* Bloque 2: Las Dos Vías */}
          <PricingComparisonBlock />

          {/* Bloque 3: Efecto Red */}
          <NetworkEffectBlock />

          {/* Bloque 4: Timeline */}
          <SimplifiedTimelineBlock />
        </motion.div>
      </div>
    </section>
  );
};
