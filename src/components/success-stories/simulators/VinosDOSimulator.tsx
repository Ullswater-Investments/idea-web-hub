import React, { useState } from 'react';
import { Globe, MapPin, ShieldCheck, Wine, Grape } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface VinosDOSimulatorProps {
  onValuesChange?: (values: { exportedLots: number; fraudRisk: number; saved: number }) => void;
}

export const VinosDOSimulator = ({ onValuesChange }: VinosDOSimulatorProps) => {
  const [exportedLots, setExportedLots] = useState(10000);
  const [fraudRisk, setFraudRisk] = useState(8);
  
  const pricePerBottle = 62; // EUROe
  const savedRevenue = exportedLots * pricePerBottle * (fraudRisk / 100);
  const brandEquityBoost = savedRevenue * 0.38;
  const totalImpact = savedRevenue + brandEquityBoost;

  React.useEffect(() => {
    onValuesChange?.({ exportedLots, fraudRisk, saved: totalImpact });
  }, [exportedLots, fraudRisk, totalImpact, onValuesChange]);

  return (
    <Card className="bg-gradient-to-br from-rose-950/40 to-amber-950/20 border-rose-800/30 shadow-2xl overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-amber-400 flex items-center gap-2 text-sm font-bold">
          <Wine className="w-5 h-5" />
          PASAPORTE DIGITAL DE BOTELLA - Trazabilidad Geográfica
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mapa de Trazabilidad Visual */}
        <div className="relative h-48 bg-slate-900/80 rounded-2xl overflow-hidden border border-rose-900/30">
          <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-rose-500 to-amber-500" />
          
          <div className="flex justify-between items-center h-full px-8 py-4">
            {/* Origen */}
            <div className="flex flex-col items-center gap-2 z-10">
              <div className="w-12 h-12 rounded-full bg-rose-900/60 flex items-center justify-center border-2 border-rose-500 animate-pulse">
                <Grape className="text-rose-400 w-6 h-6" />
              </div>
              <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">Ribera del Duero</span>
              <Badge className="bg-rose-900/50 text-rose-300 text-[8px]">D.O. Verificada</Badge>
            </div>
            
            {/* Línea de Conexión Animada */}
            <div className="flex-1 h-1 mx-4 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-amber-500 to-amber-400 rounded-full opacity-50" />
              <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full animate-ping shadow-lg shadow-amber-500/50" 
                   style={{ left: '50%', transform: 'translate(-50%, -50%)' }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 px-2 py-1 rounded">
                <span className="text-[8px] font-mono text-green-400">NFC_SCAN</span>
              </div>
            </div>
            
            {/* Destino */}
            <div className="flex flex-col items-center gap-2 z-10">
              <div className="w-12 h-12 rounded-full bg-amber-900/60 flex items-center justify-center border-2 border-amber-500">
                <Globe className="text-amber-400 w-6 h-6 animate-spin" style={{ animationDuration: '20s' }} />
              </div>
              <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">Shanghai</span>
              <Badge className="bg-green-900/50 text-green-300 text-[8px]">Autenticado</Badge>
            </div>
          </div>
          
          {/* Status Bar */}
          <div className="absolute bottom-3 right-3 bg-black/60 px-3 py-1.5 rounded-lg border border-green-500/30">
            <p className="text-[9px] font-mono text-green-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              BLOCKCHAIN: VERIFIED_ON_CHAIN
            </p>
          </div>
        </div>

        {/* Sliders de Control */}
        <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-rose-900/20">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Botellas Exportadas</span>
              <span className="font-bold text-amber-400">{exportedLots.toLocaleString()}</span>
            </div>
            <Slider
              value={[exportedLots]}
              onValueChange={(v) => setExportedLots(v[0])}
              min={1000}
              max={100000}
              step={1000}
              className="[&>span]:bg-rose-700"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Riesgo de Fraude en Destino</span>
              <span className="font-bold text-red-400">{fraudRisk}%</span>
            </div>
            <Slider
              value={[fraudRisk]}
              onValueChange={(v) => setFraudRisk(v[0])}
              min={0}
              max={15}
              step={1}
              className="[&>span]:bg-red-600"
            />
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-rose-950/50 p-4 rounded-xl border border-rose-800/30">
            <p className="text-[10px] uppercase font-black text-rose-400 mb-1">Revenue Protegido</p>
            <p className="text-2xl font-black text-white">{savedRevenue.toLocaleString()}</p>
            <p className="text-xs text-slate-400">EUROe</p>
          </div>
          <div className="bg-amber-950/50 p-4 rounded-xl border border-amber-800/30">
            <p className="text-[10px] uppercase font-black text-amber-400 mb-1">Boost de Marca +38%</p>
            <p className="text-2xl font-black text-white">{brandEquityBoost.toLocaleString()}</p>
            <p className="text-xs text-slate-400">EUROe</p>
          </div>
        </div>

        {/* Total Impact */}
        <div className="bg-gradient-to-r from-rose-900/50 to-amber-900/50 p-5 rounded-2xl border border-amber-500/30">
          <p className="text-[10px] uppercase font-black text-amber-300 mb-2">Impacto Total Protegido</p>
          <p className="text-4xl font-black text-white">{totalImpact.toLocaleString()} <span className="text-lg text-amber-400">EUROe</span></p>
        </div>
      </CardContent>
    </Card>
  );
};
