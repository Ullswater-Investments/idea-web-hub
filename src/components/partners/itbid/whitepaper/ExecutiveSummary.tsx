import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Lightbulb, Target, TrendingUp, ArrowRight } from "lucide-react";

const summaryPoints = [
  {
    icon: AlertTriangle,
    title: "El Problema",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    glowColor: "shadow-amber-500/10",
    content: "Las cadenas de suministro actuales operan con silos de datos fragmentados. Cada empresa gestiona su información de proveedores de forma aislada, generando duplicación de esfuerzos, falta de trazabilidad y dependencia de plataformas cerradas que no respetan la soberanía del dato."
  },
  {
    icon: Lightbulb,
    title: "La Solución",
    color: "text-[hsl(var(--itbid-cyan))]",
    bgColor: "bg-[hsl(var(--itbid-cyan)/0.1)]",
    borderColor: "border-[hsl(var(--itbid-cyan)/0.2)]",
    glowColor: "shadow-[hsl(var(--itbid-cyan)/0.1)]",
    content: "ITBID-X implementa un Espacio de Datos Federado basado en los estándares Gaia-X e IDSA. Esto permite a las organizaciones compartir datos de forma selectiva, manteniendo control absoluto sobre quién accede, bajo qué condiciones y durante cuánto tiempo."
  },
  {
    icon: Target,
    title: "Propuesta de Valor",
    color: "text-[hsl(var(--itbid-lime))]",
    bgColor: "bg-[hsl(var(--itbid-lime)/0.1)]",
    borderColor: "border-[hsl(var(--itbid-lime)/0.2)]",
    glowColor: "shadow-[hsl(var(--itbid-lime)/0.1)]",
    content: "Una infraestructura de confianza que permite validar proveedores, compartir certificaciones ESG y colaborar con socios comerciales sin ceder el control de la información. Todo ello con trazabilidad inmutable en blockchain y cumplimiento normativo europeo."
  },
  {
    icon: TrendingUp,
    title: "Impacto Esperado",
    color: "text-[hsl(var(--itbid-purple))]",
    bgColor: "bg-[hsl(var(--itbid-purple)/0.1)]",
    borderColor: "border-[hsl(var(--itbid-purple)/0.2)]",
    glowColor: "shadow-[hsl(var(--itbid-purple)/0.1)]",
    content: "Reducción del 40% en tiempos de validación de proveedores, eliminación de auditorías redundantes, y preparación para la regulación CSRD de reporting de sostenibilidad. ITBID-X posiciona a sus clientes como líderes de la transformación digital industrial europea."
  }
];

const metrics = [
  { value: "28", label: "Tablas RLS", color: "itbid-cyan" },
  { value: "100%", label: "Trazabilidad", color: "itbid-lime" },
  { value: "GDPR", label: "Compliant", color: "itbid-purple" },
  { value: "Web3", label: "Enabled", color: "itbid-magenta" },
];

export const ExecutiveSummary = () => {
  return (
    <div className="py-20 px-4 border-b relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[hsl(var(--itbid-cyan)/0.05)] to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[hsl(var(--itbid-purple)/0.05)] to-transparent rounded-full blur-3xl" />
      
      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <motion.span 
            className="inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--itbid-cyan))] uppercase tracking-wider px-3 py-1 rounded-full bg-[hsl(var(--itbid-cyan)/0.1)] border border-[hsl(var(--itbid-cyan)/0.2)]"
            whileHover={{ scale: 1.02 }}
          >
            <span className="w-2 h-2 rounded-full bg-[hsl(var(--itbid-cyan))] animate-pulse" />
            01 — Resumen Ejecutivo
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-light mt-4 itbid-gradient-gray">
            De la Digitalización a la Federación
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl">
            Un nuevo paradigma para la gestión de datos en la cadena de suministro industrial.
          </p>
        </motion.div>

        {/* Timeline-style cards */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-[29px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-amber-500/20 via-[hsl(var(--itbid-cyan)/0.2)] to-[hsl(var(--itbid-purple)/0.2)] hidden md:block" />
          
          <div className="space-y-6">
            {summaryPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Card className={`overflow-hidden border-2 ${point.borderColor} hover:shadow-xl ${point.glowColor} transition-all duration-300 group`}>
                  <CardContent className="p-6">
                    <div className="flex gap-5">
                      <motion.div 
                        className={`shrink-0 p-4 rounded-2xl ${point.bgColor} relative z-10`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <point.icon className={`h-7 w-7 ${point.color}`} />
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`font-bold text-xl ${point.color}`}>
                            {point.title}
                          </h3>
                          <motion.div
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            initial={{ x: -10 }}
                            whileHover={{ x: 0 }}
                          >
                            <ArrowRight className={`h-4 w-4 ${point.color}`} />
                          </motion.div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {point.content}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Key Metrics with enhanced design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Métricas Clave
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`relative text-center p-6 rounded-2xl bg-gradient-to-br from-[hsl(var(--${metric.color})/0.1)] to-[hsl(var(--${metric.color})/0.02)] border border-[hsl(var(--${metric.color})/0.2)] overflow-hidden group cursor-pointer`}
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-[hsl(var(--${metric.color})/0.05)] opacity-0 group-hover:opacity-100 transition-opacity`} />
                <motion.p 
                  className={`text-3xl md:text-4xl font-bold text-[hsl(var(--${metric.color}))] relative`}
                >
                  {metric.value}
                </motion.p>
                <p className="text-sm text-muted-foreground mt-1 relative">{metric.label}</p>
                
                {/* Corner decoration */}
                <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-full bg-[hsl(var(--${metric.color})/0.1)] blur-xl`} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
