import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Droplets, Shield, Sprout } from "lucide-react";
import { ProcuredataLogo } from "@/components/ProcuredataLogo";

const metrics = [
  { value: "-40%", label: "Consumo de agua", icon: Droplets, color: "text-[hsl(var(--telenatura-water))]" },
  { value: "100%", label: "Soberanía de datos agrícolas", icon: Shield, color: "text-[hsl(var(--telenatura-green))]" },
  { value: "+25%", label: "Rendimiento de cultivos", icon: Sprout, color: "text-[hsl(var(--telenatura-leaf))]" },
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-[hsl(var(--telenatura-green)/0.05)]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[hsl(var(--telenatura-green)/0.2)] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[hsl(var(--telenatura-sky)/0.15)] rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[hsl(var(--telenatura-leaf)/0.1)] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Dual Logos */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-6 mb-8"
        >
          <ProcuredataLogo size="md" />
          <span className="text-3xl text-muted-foreground">×</span>
          <span className="text-2xl font-bold telenatura-gradient">TeleNatura EBT</span>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <Badge variant="outline" className="px-4 py-2 text-sm bg-[hsl(var(--telenatura-green)/0.1)] border-[hsl(var(--telenatura-green)/0.3)] telenatura-font">
            🌱 Proyecto Estratégico AgriTech 2026
          </Badge>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center space-y-4 mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-light tracking-tight">
            <span className="telenatura-gradient-earth">telenatura-x</span>
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground font-light max-w-4xl mx-auto telenatura-font">
            Hacia la Agricultura Inteligente Soberana
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Espacio de Datos Federado para el Sector Agroalimentario compatible con Gaia-X
          </p>
        </motion.div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          {metrics.map((metric, index) => (
            <div key={index} className="bg-card/50 backdrop-blur-sm border rounded-xl p-6 text-center">
              <metric.icon className={`h-8 w-8 mx-auto mb-3 ${metric.color}`} />
              <div className={`text-3xl font-bold ${metric.color}`}>{metric.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{metric.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-[hsl(var(--telenatura-green)/0.5)] rounded-full flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-[hsl(var(--telenatura-green))] rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
