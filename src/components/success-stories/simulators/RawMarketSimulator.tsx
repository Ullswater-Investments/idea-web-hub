import React, { useState } from 'react';
import { ShoppingCart, Leaf, ArrowUpRight, Recycle, Package, TrendingUp } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RawMarketSimulatorProps {
  onValuesChange?: (values: { wasteVolume: number; purityLevel: number; income: number }) => void;
}

export const RawMarketSimulator = ({ onValuesChange }: RawMarketSimulatorProps) => {
  const [wasteVolume, setWasteVolume] = useState(2000);
  const [purityLevel, setPurityLevel] = useState(95);
  
  const basePrice = 1.2; // €/kg
  const income = wasteVolume * (basePrice * (purityLevel / 100));
  const landfillSavings = wasteVolume * 0.15;
  const premiumPercent = Math.round((purityLevel - 80) * 1.1);

  React.useEffect(() => {
    onValuesChange?.({ wasteVolume, purityLevel, income });
  }, [wasteVolume, purityLevel, income, onValuesChange]);

  return (
    <Card className="bg-gradient-to-br from-emerald-950/40 to-slate-950/50 border-emerald-500/20 shadow-2xl overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-emerald-400 flex items-center gap-2 text-sm font-bold">
          <ShoppingCart className="w-5 h-5" />
          SECONDARY RAW MATERIAL EXCHANGE - Marketplace Circular
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Marketplace Card Visual */}
        <div className="bg-slate-900/80 rounded-2xl p-5 border border-emerald-900/30">
          {/* Header with Purity Badge */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-900/50 flex items-center justify-center">
                <Package className="text-emerald-400 w-6 h-6" />
              </div>
              <div>
                <p className="text-white font-bold">Lote #{Math.floor(wasteVolume / 100)}</p>
                <p className="text-xs text-slate-400">Aluminio Secundario</p>
              </div>
            </div>
            <Badge className={`${purityLevel >= 95 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
              Pureza: {purityLevel}%
            </Badge>
          </div>

          {/* Marketplace Valuation */}
          <div className="bg-slate-800/50 rounded-xl p-4 mb-4">
            <p className="text-[10px] uppercase font-black text-slate-400 mb-2">Valoración en Marketplace</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-black text-emerald-400">{income.toLocaleString()}</p>
              <span className="text-lg text-slate-400">EUROe</span>
            </div>
          </div>

          {/* Buyers Interest */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-slate-300 text-sm">
              <ShoppingCart className="w-4 h-4 text-emerald-400" />
              <span>Compradores activos</span>
            </div>
            <span className="text-emerald-400 font-bold">12 interesados</span>
          </div>

          {/* Premium Badge */}
          {premiumPercent > 0 && (
            <div className="mt-3 flex items-center gap-2 bg-emerald-950/50 rounded-lg p-2 border border-emerald-500/30">
              <ArrowUpRight className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-300">+{premiumPercent}% sobre precio de chatarra</span>
            </div>
          )}
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-800/30">
            <Recycle className="w-5 h-5 text-emerald-400 mb-2" />
            <p className="text-[10px] uppercase font-black text-emerald-400 mb-1">Evitado Vertedero</p>
            <p className="text-xl font-black text-white">{landfillSavings.toLocaleString()}</p>
            <p className="text-xs text-slate-400">EUROe ahorrados</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
            <TrendingUp className="w-5 h-5 text-blue-400 mb-2" />
            <p className="text-[10px] uppercase font-black text-blue-400 mb-1">Ciclo de Venta</p>
            <p className="text-xl font-black text-white">48h</p>
            <p className="text-xs text-slate-400">vs 15 días tradicional</p>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-emerald-900/20">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Volumen de Merma</span>
              <span className="font-bold text-emerald-400">{wasteVolume.toLocaleString()} kg</span>
            </div>
            <Slider
              value={[wasteVolume]}
              onValueChange={(v) => setWasteVolume(v[0])}
              min={100}
              max={10000}
              step={100}
              className="[&>span]:bg-emerald-600"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Pureza del Material</span>
              <span className="font-bold text-blue-400">{purityLevel}%</span>
            </div>
            <Slider
              value={[purityLevel]}
              onValueChange={(v) => setPurityLevel(v[0])}
              min={80}
              max={100}
              step={1}
              className="[&>span]:bg-blue-600"
            />
          </div>
        </div>

        {/* Total Impact */}
        <div className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 p-5 rounded-2xl border border-emerald-500/30">
          <p className="text-[10px] uppercase font-black text-emerald-300 mb-2">De Residuo a Recurso</p>
          <p className="text-4xl font-black text-white">{income.toLocaleString()} <span className="text-lg text-emerald-400">EUROe</span></p>
          <div className="flex gap-2 mt-2">
            <Badge className="bg-emerald-500/20 text-emerald-300">Quality Assured</Badge>
            <Badge className="bg-blue-500/20 text-blue-300">ODRL Certified</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
