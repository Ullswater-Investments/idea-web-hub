import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, FileSignature, Server, Users, Coins, Clock, ArrowRight } from 'lucide-react';

const timelineSteps = [
  {
    week: 'Semana 1',
    title: 'Firma y Solicitud Ayuda 30k',
    description: 'Firma del acuerdo de partnership y tramitación completa de la ayuda "Kit Espacio de Datos" gestionada por ProcureData.',
    icon: FileSignature,
    status: 'completed',
    highlight: '30.000€ garantizados',
  },
  {
    week: 'Semana 4',
    title: 'Despliegue de su Nodo',
    description: 'Instalación y configuración de su nodo federado con marca blanca personalizada y dominio propio.',
    icon: Server,
    status: 'in-progress',
    highlight: 'Marca Blanca',
  },
  {
    week: 'Semana 8',
    title: 'Onboarding de Asociados',
    description: 'Migración e incorporación de sus primeros 10 asociados con formación incluida.',
    icon: Users,
    status: 'upcoming',
    highlight: '10 asociados iniciales',
  },
  {
    week: 'Semana 12',
    title: 'Primeras Transacciones',
    description: 'Activación del marketplace y generación de las primeras comisiones recurrentes.',
    icon: Coins,
    status: 'upcoming',
    highlight: 'Revenue activo',
  },
];

export const OnboardingTimeline = () => {
  return (
    <section className="py-24 bg-slate-900">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            <Clock className="w-4 h-4 mr-2" />
            Roadmap de Onboarding
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            De 0 a Ingresos en <span className="text-emerald-400">12 Semanas</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Proceso estructurado con acompañamiento técnico y comercial en cada fase
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-amber-500 to-slate-700 transform md:-translate-x-1/2" />

            {timelineSteps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={step.week}
                  className={`relative flex items-center mb-12 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  {/* Timeline node */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                    <motion.div
                      className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${
                        step.status === 'completed'
                          ? 'bg-emerald-500 border-emerald-400'
                          : step.status === 'in-progress'
                          ? 'bg-amber-500 border-amber-400'
                          : 'bg-slate-700 border-slate-600'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      animate={
                        step.status === 'in-progress'
                          ? { boxShadow: ['0 0 0 0 rgba(245, 158, 11, 0.4)', '0 0 0 15px rgba(245, 158, 11, 0)', '0 0 0 0 rgba(245, 158, 11, 0.4)'] }
                          : {}
                      }
                      transition={{ duration: 2, repeat: step.status === 'in-progress' ? Infinity : 0 }}
                    >
                      {step.status === 'completed' ? (
                        <CheckCircle2 className="w-8 h-8 text-white" />
                      ) : (
                        <Icon className="w-8 h-8 text-white" />
                      )}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className={`w-full md:w-5/12 pl-28 md:pl-0 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <Card className={`bg-slate-800/50 border-slate-700 overflow-hidden ${
                      step.status === 'in-progress' ? 'ring-2 ring-amber-500/50' : ''
                    }`}>
                      <CardContent className="p-6">
                        <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                          <Badge 
                            className={`${
                              step.status === 'completed'
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                : step.status === 'in-progress'
                                ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                                : 'bg-slate-700/50 text-slate-400 border-slate-600'
                            }`}
                          >
                            {step.week}
                          </Badge>
                          {step.status === 'in-progress' && (
                            <span className="text-xs text-amber-400 animate-pulse">En progreso</span>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-slate-400 text-sm mb-4">{step.description}</p>
                        
                        <div className={`flex items-center gap-2 ${isLeft ? 'md:justify-end' : ''}`}>
                          <span className={`text-sm font-medium ${
                            step.status === 'completed'
                              ? 'text-emerald-400'
                              : step.status === 'in-progress'
                              ? 'text-amber-400'
                              : 'text-slate-500'
                          }`}>
                            {step.highlight}
                          </span>
                          <ArrowRight className={`w-4 h-4 ${
                            step.status === 'completed'
                              ? 'text-emerald-400'
                              : step.status === 'in-progress'
                              ? 'text-amber-400'
                              : 'text-slate-500'
                          }`} />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block md:w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
