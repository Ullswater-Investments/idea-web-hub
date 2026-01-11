import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Server, Lock, FileX, Zap, Shield, Network, TrendingUp, TrendingDown } from 'lucide-react';

export const ComparisonSlider = () => {
  const [position, setPosition] = useState(50);
  
  const efficiency = Math.round(15 + (position / 100) * 80);
  const isNewWorld = position > 50;

  return (
    <section className="py-24 bg-slate-900">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            El Cambio de <span className="text-orange-400">Paradigma</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Desliza para ver la transformación de silos aislados a una federación soberana
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Efficiency Counter */}
          <motion.div 
            className="text-center mb-8"
            key={efficiency}
          >
            <div className="inline-flex items-center gap-3 bg-slate-800/50 rounded-full px-6 py-3 border border-slate-700">
              {isNewWorld ? (
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              ) : (
                <TrendingDown className="w-6 h-6 text-red-400" />
              )}
              <span className="text-slate-400">Eficiencia:</span>
              <motion.span
                className={`text-3xl font-bold ${isNewWorld ? 'text-emerald-400' : 'text-red-400'}`}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {efficiency}%
              </motion.span>
            </div>
          </motion.div>

          {/* Comparison Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Old World */}
            <motion.div
              className={`relative rounded-2xl p-8 transition-all duration-500 ${
                position < 50 
                  ? 'bg-gradient-to-br from-red-950/50 to-slate-900 border-2 border-red-500/50 shadow-lg shadow-red-500/10' 
                  : 'bg-slate-800/30 border border-slate-700/50 opacity-50'
              }`}
              animate={{ scale: position < 50 ? 1.02 : 0.98 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-red-500/20">
                  <Server className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Silos de Datos</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-300">
                  <Lock className="w-5 h-5 text-red-400" />
                  <span>Datos aislados y duplicados</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <FileX className="w-5 h-5 text-red-400" />
                  <span>Procesos manuales lentos</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <TrendingDown className="w-5 h-5 text-red-400" />
                  <span>Sin trazabilidad ni auditoría</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-red-500/20">
                <p className="text-red-400 font-semibold">Costoso • Lento • Inseguro</p>
              </div>
            </motion.div>

            {/* New World */}
            <motion.div
              className={`relative rounded-2xl p-8 transition-all duration-500 ${
                position >= 50 
                  ? 'bg-gradient-to-br from-emerald-950/50 to-slate-900 border-2 border-emerald-500/50 shadow-lg shadow-emerald-500/10' 
                  : 'bg-slate-800/30 border border-slate-700/50 opacity-50'
              }`}
              animate={{ scale: position >= 50 ? 1.02 : 0.98 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-emerald-500/20">
                  <Network className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Federación Soberana</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-300">
                  <Zap className="w-5 h-5 text-emerald-400" />
                  <span>Intercambio instantáneo</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <span>Blockchain inmutable</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <span>Monetización automática</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-emerald-500/20">
                <p className="text-emerald-400 font-semibold">Monetizable • Seguro • Estándar Europeo</p>
              </div>
            </motion.div>
          </div>

          {/* Slider */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-slate-500 mb-3">
              <span>Viejo Mundo</span>
              <span>Nuevo Mundo</span>
            </div>
            <Slider
              value={[position]}
              onValueChange={(v) => setPosition(v[0])}
              min={0}
              max={100}
              step={1}
              className="cursor-pointer"
            />
            <p className="text-center text-slate-500 text-sm mt-4">
              Desliza para comparar los modelos
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
