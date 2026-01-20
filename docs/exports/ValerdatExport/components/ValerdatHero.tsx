import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Wallet, Shield, Calendar, Target } from "lucide-react";

const ValerdatHero = () => {
  // Proyecto: 21/07/2025 - 11/11/2025 (113 días)
  // Simulamos que estamos en progreso (50% para demo)
  const projectProgress = 50;

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-blue-600 text-white hover:bg-blue-700">
              Consumer - Kit Espacios de Datos
            </Badge>
            <Badge variant="outline" className="border-green-500 text-green-600">
              15.000€ Subvención
            </Badge>
            <Badge variant="outline" className="border-purple-500 text-purple-600">
              <Shield className="h-3 w-3 mr-1" />
              Gaia-X Compliant
            </Badge>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Memoria de Ejecución:<br />
              <span className="text-blue-600">Proyecto VALERDAT Data-Driven</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Documentación técnica y de negocio del caso de servicio para VALERDAT S.L. 
              como cliente Consumer de PROCUREDATA, incluyendo arquitectura, fases del 
              proyecto y justificación para la subvención "Kit Espacios de Datos".
            </p>
          </div>

          {/* Project Timeline */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold">Progreso del Proyecto</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>21/07/2025</span>
                <span className="font-medium text-foreground">{projectProgress}% Completado</span>
                <span>11/11/2025</span>
              </div>
              <Progress value={projectProgress} className="h-3" />
              <div className="grid grid-cols-4 gap-2 text-xs text-center">
                <div className="bg-green-100 dark:bg-green-900/30 rounded p-2">
                  <span className="font-medium text-green-700 dark:text-green-400">Mes 1</span>
                  <p className="text-muted-foreground">Onboarding</p>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 rounded p-2">
                  <span className="font-medium text-green-700 dark:text-green-400">Mes 2</span>
                  <p className="text-muted-foreground">Preparación</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded p-2">
                  <span className="font-medium text-blue-700 dark:text-blue-400">Mes 3</span>
                  <p className="text-muted-foreground">Integración</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded p-2">
                  <span className="font-medium text-gray-600 dark:text-gray-400">Mes 4</span>
                  <p className="text-muted-foreground">Validación</p>
                </div>
              </div>
            </div>
          </div>

          {/* Web3 Widget */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Identidad Verificada</p>
                  <p className="font-mono text-sm font-medium">did:ethr:valerdat:0x7a3...</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                  KYB Verificado
                </Badge>
                <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-300">
                  SSI Activo
                </Badge>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Balance EUROe</p>
                  <p className="text-2xl font-bold">12,500 €</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Disponible para adquisición de datasets en el catálogo PROCUREDATA
              </p>
            </div>
          </div>

          {/* Target KPIs Preview */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold">Objetivos del Proyecto</h3>
            </div>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">3+</p>
                <p className="text-sm text-muted-foreground">Datasets Industriales</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">100%</p>
                <p className="text-sm text-muted-foreground">Datos Anonimizados</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">100%</p>
                <p className="text-sm text-muted-foreground">Trazabilidad Blockchain</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-600">-80%</p>
                <p className="text-sm text-muted-foreground">Tiempo Integración</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValerdatHero;
