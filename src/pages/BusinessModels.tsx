import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Coins, Shield, FileCheck, Activity, Cpu, Network, 
  ArrowLeft, ArrowRight, Calculator, Sparkles, TrendingUp
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MODELS = [
  {
    id: "fee",
    title: "Marketplace Fee",
    desc: "Monetización transaccional automática.",
    detail: "Comisión del 2-5% vía Smart Contract en cada pago EUROe. Cobro atómico garantizado sin perseguir facturas.",
    icon: Coins,
    color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
    gradient: "from-yellow-500/20 to-orange-500/10",
  },
  {
    id: "saas",
    title: "Soberanía SaaS",
    desc: "Suscripción por herramientas de privacidad.",
    detail: "Tiers Free/Pro/Enterprise con Kill-Switch, conectores ERP ilimitados y trazabilidad blockchain completa.",
    icon: Shield,
    color: "bg-blue-500/10 text-blue-600 border-blue-500/30",
    gradient: "from-blue-500/20 to-cyan-500/10",
  },
  {
    id: "audit",
    title: "Auditoría Blockchain",
    desc: "Verificación de certificados inmutables.",
    detail: "Cobro por emisión de credenciales on-chain y por acceso a API de validación histórica para terceros.",
    icon: FileCheck,
    color: "bg-green-500/10 text-green-600 border-green-500/30",
    gradient: "from-green-500/20 to-emerald-500/10",
  },
  {
    id: "iot",
    title: "IoT Data Streams",
    desc: "Pay-as-you-go por volumen de datos.",
    detail: "€0.01 por cada 1,000 lecturas de sensores notarizadas en Pontus-X. Optimización de gas incluida.",
    icon: Activity,
    color: "bg-purple-500/10 text-purple-600 border-purple-500/30",
    gradient: "from-purple-500/20 to-pink-500/10",
  },
  {
    id: "compute",
    title: "Compute-to-Data",
    desc: "Sandboxing seguro para IA.",
    detail: "Alquiler de entornos donde algoritmos aprenden sin ver datos crudos. Soberanía matemáticamente garantizada.",
    icon: Cpu,
    color: "bg-red-500/10 text-red-600 border-red-500/30",
    gradient: "from-red-500/20 to-rose-500/10",
  },
  {
    id: "network",
    title: "Network Builder",
    desc: "Digitalización masiva de proveedores.",
    detail: "Tarifa corporativa (ej. 50k€/año) para subsidiar acceso Pro a 5,000 proveedores de tu cadena.",
    icon: Network,
    color: "bg-indigo-500/10 text-indigo-600 border-indigo-500/30",
    gradient: "from-indigo-500/20 to-violet-500/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5 }
  },
};

export default function BusinessModels() {
  const [volume, setVolume] = useState([50000]);
  const [suppliers, setSuppliers] = useState([100]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Cálculos gamificados
  const feeRevenue = volume[0] * 0.03; // 3% fee promedio
  const networkSavings = suppliers[0] * 150; // €150 ahorro por proveedor
  const saasRevenue = suppliers[0] * 0.3 * 99; // 30% conversión a Pro €99/mes

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Volver</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="procuredata-gradient font-bold text-xl">PROCUREDATA</span>
            <Badge variant="outline" className="text-xs">v3.1</Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4" variant="secondary">
            <Sparkles className="h-3 w-3 mr-1" />
            Economía Híbrida Web2/Web3
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Ecosistema de Valor PROCUREDATA
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Seis modelos de monetización que combinan la estabilidad del SaaS Enterprise 
            con el potencial exponencial de la economía de tokens.
          </p>
        </motion.div>

        {/* Grid Interactivo de Modelos */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {MODELS.map((model) => {
            const Icon = model.icon;
            const isHovered = hoveredCard === model.id;
            
            return (
              <motion.div
                key={model.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                onHoverStart={() => setHoveredCard(model.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative"
              >
                <Card className={`h-full border-2 transition-all duration-300 overflow-hidden ${
                  isHovered ? 'shadow-2xl' : 'shadow-md'
                } ${model.color}`}>
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${model.gradient} opacity-0 transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : ''
                  }`} />
                  
                  <CardHeader className="relative z-10">
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-xl ${model.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                      </motion.div>
                    </div>
                    <CardTitle className="text-xl mt-4">{model.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="relative z-10">
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: isHovered ? 'auto' : '2.5rem',
                        opacity: 1
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className={`text-sm transition-colors duration-300 ${
                        isHovered ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {isHovered ? model.detail : model.desc}
                      </p>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 10
                      }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                      className="mt-4"
                    >
                      <Button variant="outline" size="sm" className="w-full">
                        Ver flujo técnico <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Simulador ROI Gamificado */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent rounded-3xl" />
          
          <div className="relative z-10 p-8 md:p-12 rounded-3xl text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Calculator className="h-5 w-5 text-primary" />
              </div>
              <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                Interactivo
              </Badge>
            </div>
            
            <h2 className="text-3xl font-bold mb-2">Simulador de Impacto</h2>
            <p className="text-gray-400 mb-8 max-w-xl">
              Ajusta las variables para estimar el valor generado para tu organización 
              usando los modelos de monetización de PROCUREDATA.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              {/* Slider 1: Volumen */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-300">
                    Volumen Transaccional Mensual
                  </label>
                  <span className="text-lg font-bold text-primary">
                    €{volume[0].toLocaleString('es-ES')}
                  </span>
                </div>
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  min={1000}
                  max={500000}
                  step={1000}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>€1,000</span>
                  <span>€500,000</span>
                </div>
              </div>

              {/* Slider 2: Proveedores */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-300">
                    Proveedores Conectados
                  </label>
                  <span className="text-lg font-bold text-primary">
                    {suppliers[0]} orgs
                  </span>
                </div>
                <Slider
                  value={suppliers}
                  onValueChange={setSuppliers}
                  min={10}
                  max={1000}
                  step={10}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>10</span>
                  <span>1,000</span>
                </div>
              </div>
            </div>

            {/* Resultados */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                key={`fee-${volume[0]}`}
                initial={{ scale: 0.95, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-br from-yellow-500/20 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Coins className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-yellow-400">Ingresos por Comisión</span>
                </div>
                <p className="text-3xl font-bold text-white">
                  €{feeRevenue.toLocaleString('es-ES', { maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-gray-400 mt-1">Mensuales (3% fee)</p>
              </motion.div>

              <motion.div
                key={`savings-${suppliers[0]}`}
                initial={{ scale: 0.95, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-400">Ahorro Operativo</span>
                </div>
                <p className="text-3xl font-bold text-white">
                  €{networkSavings.toLocaleString('es-ES')}
                </p>
                <p className="text-xs text-gray-400 mt-1">En onboarding digital</p>
              </motion.div>

              <motion.div
                key={`saas-${suppliers[0]}`}
                initial={{ scale: 0.95, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-blue-400">Potencial SaaS</span>
                </div>
                <p className="text-3xl font-bold text-white">
                  €{saasRevenue.toLocaleString('es-ES', { maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-gray-400 mt-1">Mensuales (30% → Pro)</p>
              </motion.div>
            </div>

            {/* CTA */}
            <div className="mt-10 text-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/auth">
                  Comenzar ahora <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <p className="text-xs text-gray-500 mt-3">
                Sin compromiso. Acceso demo disponible.
              </p>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer simple */}
      <footer className="bg-slate-950 text-white py-8 mt-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="procuredata-gradient font-bold">PROCUREDATA</span>
            <span className="text-gray-500 text-sm">© 2026</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link to="/whitepaper" className="hover:text-white transition-colors">Whitepaper</Link>
            <Link to="/architecture" className="hover:text-white transition-colors">Arquitectura</Link>
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
