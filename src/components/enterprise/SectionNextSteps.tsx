import { Calendar, Mail, FileDown, ArrowRight, ShieldCheck, Sparkles, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SectionNextSteps = () => {
  return (
    <motion.section 
      id="next-steps" 
      className="py-16 mt-12 border-t border-border"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="relative bg-gradient-to-br from-secondary via-muted to-secondary dark:from-card dark:via-muted dark:to-card rounded-3xl p-8 md:p-12 border border-border overflow-hidden shadow-lg">
        
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          {/* Badge de Estatus */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-sm text-green-600 dark:text-green-400 font-bold animate-pulse">
              <Rocket className="w-4 h-4" />
              Listo para Producción Industrial
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            ¿Listo para transformar su{" "}
            <span className="bg-gradient-to-r from-primary via-orange-500 to-primary bg-clip-text text-transparent">
              Función de Compras?
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Únase al ecosistema líder en soberanía de datos y elimine para siempre 
            la ineficiencia del modelo nxm en su organización.
          </p>

          {/* Grid de Acciones Principales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            
            {/* Opción 1: Demo Técnica */}
            <div className="group bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.1)] shadow-sm">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="w-7 h-7 text-primary" />
              </div>
              <h4 className="text-lg font-bold text-foreground mb-2">Demo Técnica</h4>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Sesión de 30 min con un arquitecto de soluciones para ver la integración real con su ERP.
              </p>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Agendar Demo
              </Button>
            </div>

            {/* Opción 2: Consulta Estratégica */}
            <div className="group bg-card border border-border rounded-2xl p-6 text-center hover:border-blue-500/50 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] shadow-sm">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="text-lg font-bold text-foreground mb-2">Consultoría</h4>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Hable con nuestros expertos sobre el cumplimiento de la directiva CSRD y el impacto ESG.
              </p>
              <Button variant="outline" className="w-full border-blue-500/50 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10">
                Contactar Ventas
              </Button>
            </div>

            {/* Opción 3: Documentación Completa */}
            <div className="group bg-card border border-border rounded-2xl p-6 text-center hover:border-green-500/50 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] shadow-sm">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-green-500/10 border border-green-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileDown className="w-7 h-7 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="text-lg font-bold text-foreground mb-2">Dossier PDF</h4>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Descargue la documentación técnica completa y la memoria del proyecto ProcureData.
              </p>
              <Button variant="outline" className="w-full border-green-500/50 text-green-600 dark:text-green-400 hover:bg-green-500/10">
                Descargar <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

          </div>

          {/* Footer de Confianza */}
          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Estandarizado por:</span>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-muted dark:bg-secondary rounded-lg text-blue-600 dark:text-blue-400 font-mono text-xs">GAIA-X</span>
                <span className="px-3 py-1 bg-muted dark:bg-secondary rounded-lg text-green-600 dark:text-green-400 font-mono text-xs">IDSA</span>
                <span className="px-3 py-1 bg-muted dark:bg-secondary rounded-lg text-purple-600 dark:text-purple-400 font-mono text-xs">MiCA</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <ShieldCheck className="w-4 h-4 text-green-600 dark:text-green-500" />
              INFRAESTRUCTURA_VALIDADA_v1.0.4
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
};

export default SectionNextSteps;
