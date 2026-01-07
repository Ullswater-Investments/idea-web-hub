import React, { useState } from 'react';
import { Recycle, ArrowRight, CheckCircle2, Leaf, Factory } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FiberLoopSimulatorProps {
  onValuesChange?: (values: { tonsCollected: number; shreddingEfficiency: number; netFiber: number }) => void;
}

export const FiberLoopSimulator = ({ onValuesChange }: FiberLoopSimulatorProps) => {
  const [tonsCollected, setTonsCollected] = useState(1000);
  const [shreddingEfficiency, setShreddingEfficiency] = useState(85);
  
  const netFiber = tonsCollected * (shreddingEfficiency / 100);
  const taxSaving = tonsCollected * 0.45 * 1000; // €/ton
  const revenueBoost = tonsCollected * 1.75 * 1000; // Premium 75%

  React.useEffect(() => {
    onValuesChange?.({ tonsCollected, shreddingEfficiency, netFiber });
  }, [tonsCollected, shreddingEfficiency, netFiber, onValuesChange]);

  return (
    <Card className="bg-gradient-to-br from-emerald-950/40 to-violet-950/30 border-emerald-500/20 shadow-2xl overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-emerald-400 flex items-center gap-2 text-sm font-bold">
          <Recycle className="w-5 h-5" />
          FIBER LOOP TRANSFORMER - Economía Circular Certificada
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Flujo de Transformación Visual */}
        <div className="bg-slate-900/80 rounded-2xl p-6 border border-emerald-900/30">
          <div className="flex items-center justify-between">
            {/* Input: Residuo */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-slate-700/50 flex items-center justify-center border-2 border-slate-500 relative">
                <Factory className="text-slate-400 w-8 h-8" />
                <div className="absolute -bottom-1 -right-1 bg-orange-500 rounded-full p-1">
                  <Recycle className="w-3 h-3 text-white" />
                </div>
              </div>
              <span className="text-xs text-slate-400 font-bold uppercase">Post-Consumo</span>
              <Badge className="bg-slate-700/50 text-slate-300 text-[10px]">{tonsCollected}t</Badge>
            </div>
            
            {/* Flecha de Transformación */}
            <div className="flex-1 mx-4 relative">
              <div className="h-2 bg-gradient-to-r from-slate-600 via-emerald-500 to-violet-500 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="bg-emerald-500 rounded-full p-2 animate-pulse shadow-lg shadow-emerald-500/50">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
              <p className="text-center text-[10px] text-emerald-400 mt-2">Eficiencia: {shreddingEfficiency}%</p>
            </div>
            
            {/* Output: Fibra Certificada */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-emerald-900/50 flex items-center justify-center border-2 border-emerald-500">
                <Leaf className="text-emerald-400 w-8 h-8" />
              </div>
              <span className="text-xs text-emerald-400 font-bold uppercase">Fibra Neta</span>
              <Badge className="bg-emerald-900/50 text-emerald-300 text-[10px]">{netFiber.toFixed(0)}t</Badge>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-800/30">
            <p className="text-[10px] uppercase font-black text-emerald-400 mb-1">Impuestos Evitados</p>
            <p className="text-2xl font-black text-white">{taxSaving.toLocaleString()}</p>
            <p className="text-xs text-slate-400">EUROe (Ley Residuos)</p>
          </div>
          <div className="bg-violet-950/40 p-4 rounded-xl border border-violet-800/30">
            <p className="text-[10px] uppercase font-black text-violet-400 mb-1">Index Circularidad</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-black text-white">A+</p>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-xs text-slate-400">DPP Certified</p>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-emerald-900/20">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Toneladas Recogidas</span>
              <span className="font-bold text-emerald-400">{tonsCollected.toLocaleString()}t</span>
            </div>
            <Slider
              value={[tonsCollected]}
              onValueChange={(v) => setTonsCollected(v[0])}
              min={10}
              max={5000}
              step={50}
              className="[&>span]:bg-emerald-600"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Eficiencia de Desfibrado</span>
              <span className="font-bold text-violet-400">{shreddingEfficiency}%</span>
            </div>
            <Slider
              value={[shreddingEfficiency]}
              onValueChange={(v) => setShreddingEfficiency(v[0])}
              min={50}
              max={98}
              step={1}
              className="[&>span]:bg-violet-600"
            />
          </div>
        </div>

        {/* Revenue Boost */}
        <div className="bg-gradient-to-r from-emerald-900/50 to-violet-900/50 p-5 rounded-2xl border border-emerald-500/30">
          <p className="text-[10px] uppercase font-black text-emerald-300 mb-2">Valor de Fibra Certificada (+75% Premium)</p>
          <p className="text-4xl font-black text-white">{revenueBoost.toLocaleString()} <span className="text-lg text-emerald-400">EUROe</span></p>
          <div className="flex gap-2 mt-2">
            <Badge className="bg-emerald-500/20 text-emerald-300">RAP Compliant</Badge>
            <Badge className="bg-violet-500/20 text-violet-300">Blockchain Verified</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
