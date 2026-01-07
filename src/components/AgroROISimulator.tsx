import React, { useState, useMemo } from 'react';
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wheat, Globe, ShieldCheck, Coins, ArrowRight, Sparkles, Leaf, Award } from 'lucide-react';

export const AgroROISimulator = () => {
  const [numMarkets, setNumMarkets] = useState([5]);
  const [auditCost, setAuditCost] = useState([3500]);

  const results = useMemo(() => {
    // Coste tradicional: Auditoría + Gestión documental x Número de mercados
    const manualTotal = numMarkets[0] * (auditCost[0] + 1500);
    
    // Coste ProcureData: 1 Auditoría base (30%) + suscripción IoT + tasas por envío
    const pdTotal = (auditCost[0] * 0.3) + 500 + (numMarkets[0] * 1);
    
    const totalSavings = manualTotal - pdTotal;
    const savingsPercent = ((totalSavings / manualTotal) * 100).toFixed(0);
    const exportSpeedBoost = "12 días vs 3 meses";
    const valueIncrease = 12; // Incremento de valor de marca por transparencia

    return { manualTotal, pdTotal, totalSavings, savingsPercent, exportSpeedBoost, valueIncrease };
  }, [numMarkets, auditCost]);

  return (
    <div className="grid lg:grid-cols-2 gap-8 w-full">
      {/* Panel de Control - Estética Verde Esmeralda */}
      <Card className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 border-emerald-200 dark:border-emerald-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl text-emerald-900 dark:text-emerald-100">
            <div className="p-2 bg-emerald-500/20 rounded-xl">
              <Wheat className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            Simulador de Exportación Agro
          </CardTitle>
          <p className="text-emerald-700 dark:text-emerald-300">
            Calcula el ahorro eliminando auditorías redundantes para mercados internacionales.
          </p>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Slider - Número de Mercados */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Nº de Certificaciones/Mercados
              </span>
              <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{numMarkets[0]}</span>
            </div>
            <Slider
              value={numMarkets}
              onValueChange={setNumMarkets}
              min={1}
              max={20}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-emerald-600/70 dark:text-emerald-400/70">
              <span>1 mercado</span>
              <span>10 mercados</span>
              <span>20 mercados</span>
            </div>
          </div>

          {/* Slider - Coste de Auditoría */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Coste Medio por Auditoría (Manual)
              </span>
              <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {auditCost[0].toLocaleString('es-ES')} <span className="text-sm">EUROe</span>
              </span>
            </div>
            <Slider
              value={auditCost}
              onValueChange={setAuditCost}
              min={1500}
              max={6000}
              step={250}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-emerald-600/70 dark:text-emerald-400/70">
              <span>1.500€</span>
              <span>GLOBALG.A.P.</span>
              <span>6.000€</span>
            </div>
          </div>

          {/* Resultado Principal */}
          <div className="bg-white dark:bg-emerald-950/50 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-700 text-center">
            <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 mb-2">
              <Coins className="h-5 w-5" />
              <span className="text-xs uppercase tracking-widest font-bold">Ahorro en Costes de Cumplimiento</span>
            </div>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-5xl font-bold text-emerald-600 dark:text-emerald-400">
                {results.totalSavings.toLocaleString('es-ES')}
              </span>
              <span className="text-xl text-emerald-500">EUROe</span>
            </div>
            <p className="text-sm text-emerald-600/70 dark:text-emerald-400/70 mt-2">
              Reducción del {results.savingsPercent}% vs modelo tradicional
            </p>
          </div>

          {/* Comparativa Visual */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-28 text-xs text-emerald-700 dark:text-emerald-300">Tradicional</div>
              <div className="flex-1 bg-emerald-100 dark:bg-emerald-900/50 rounded-full h-5 overflow-hidden">
                <div 
                  className="bg-red-400 h-full flex items-center justify-end px-3 text-xs font-bold text-white"
                  style={{ width: '100%' }}
                >
                  {results.manualTotal.toLocaleString('es-ES')} €
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-28 text-xs text-emerald-700 dark:text-emerald-300">ProcureData</div>
              <div className="flex-1 bg-emerald-100 dark:bg-emerald-900/50 rounded-full h-5 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full flex items-center justify-end px-3 text-xs font-bold text-white"
                  style={{ width: `${Math.max((results.pdTotal / results.manualTotal) * 100, 10)}%` }}
                >
                  {results.pdTotal.toLocaleString('es-ES')} €
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Panel de ARIA - Informe Agro */}
      <Card className="bg-gradient-to-br from-emerald-900 to-green-950 border-emerald-700 text-white overflow-hidden relative">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10">
            <Leaf className="h-40 w-40" />
          </div>
          <div className="absolute bottom-10 left-10">
            <Wheat className="h-32 w-32" />
          </div>
        </div>
        
        <CardHeader className="relative">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg text-white">ARIA</CardTitle>
              <p className="text-xs text-emerald-300">Análisis de Exportación Verificada</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative space-y-6">
          {/* Insight Principal */}
          <div className="bg-emerald-800/50 rounded-xl p-5 border border-emerald-600/30">
            <div className="flex items-start gap-3">
              <Globe className="h-5 w-5 text-emerald-400 mt-1 flex-shrink-0" />
              <div className="space-y-2">
                <p className="text-emerald-100">
                  Para acceder a <span className="text-white font-bold">{numMarkets[0]} mercados</span>, 
                  hoy gastas <span className="text-red-300 font-bold">{results.manualTotal.toLocaleString('es-ES')}€</span>.
                </p>
                <p className="text-emerald-100">
                  Con ProcureData, el modelo de <span className="text-emerald-300 font-semibold">confianza mutua</span> reduce 
                  este gasto a solo <span className="text-emerald-300 font-bold">{results.pdTotal.toLocaleString('es-ES')}€</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Green Premium */}
          <div className="bg-gradient-to-r from-emerald-600/30 to-green-600/30 rounded-xl p-5 border border-emerald-500/30">
            <div className="flex items-start gap-3">
              <Award className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-widest text-emerald-300 font-bold mb-2">
                  Efecto "Green Premium"
                </p>
                <p className="text-sm text-emerald-100">
                  Al publicar tus datos de huella hídrica y origen en blockchain, el valor de tu producto aumenta 
                  un <span className="text-yellow-300 font-bold">+{results.valueIncrease}%</span> frente a la competencia no transparente.
                </p>
              </div>
            </div>
          </div>

          {/* Success Reference */}
          <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 border border-white/20">
            <ShieldCheck className="h-5 w-5 text-emerald-400 flex-shrink-0" />
            <p className="text-sm text-emerald-100">
              <span className="font-bold text-white">HITO LOGRADO:</span> Igualando el caso OliveTrust Coop. 
              Tiempo de entrada a mercado reducido en un <span className="text-emerald-300 font-bold">80%</span>.
            </p>
          </div>

          {/* Modelo Explicativo */}
          <div className="text-xs text-emerald-300/80 space-y-1 border-t border-emerald-700 pt-4">
            <p><span className="font-semibold text-emerald-200">Modelo "Audit Once, Export Everywhere":</span></p>
            <p>• 1 auditoría base notarizada en blockchain</p>
            <p>• Pasaporte Digital verificable por cualquier comprador</p>
            <p>• Reducción del 70% en auditorías físicas repetitivas</p>
          </div>
          
          {/* CTA */}
          <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white border-0 font-semibold">
            Certificar mis Datos con ARIA
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgroROISimulator;
