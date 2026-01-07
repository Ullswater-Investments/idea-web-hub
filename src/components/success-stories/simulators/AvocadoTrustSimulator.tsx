import React, { useState } from 'react';
import { BugOff, Map, CheckCircle, Leaf, Satellite, Apple } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AvocadoTrustSimulatorProps {
  onValuesChange?: (values: { sensorDensity: number; hectares: number; savings: number }) => void;
}

export const AvocadoTrustSimulator = ({ onValuesChange }: AvocadoTrustSimulatorProps) => {
  const [sensorDensity, setSensorDensity] = useState(5);
  const [hectares, setHectares] = useState(100);
  
  const savingsPerLot = 1200; // €/lote
  const annualSavings = hectares * savingsPerLot * (sensorDensity / 10);
  const rejectionRisk = (3.5 * (1 - (sensorDensity / 10))).toFixed(2);

  React.useEffect(() => {
    onValuesChange?.({ sensorDensity, hectares, savings: annualSavings });
  }, [sensorDensity, hectares, annualSavings, onValuesChange]);

  // Generate sensor grid
  const sensorGrid = Array.from({ length: 20 }, (_, i) => ({
    active: i < Math.floor(sensorDensity * 2),
    pest: false
  }));

  return (
    <Card className="bg-gradient-to-br from-emerald-950/40 to-lime-950/30 border-emerald-500/20 shadow-2xl overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-lime-400 flex items-center gap-2 text-sm font-bold">
          <Satellite className="w-5 h-5" />
          PEST-FREE ZONE MONITOR - Vigilancia Fitosanitaria IoT
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mapa de Sensores Visual */}
        <div className="bg-slate-900/80 rounded-2xl p-6 border border-emerald-900/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-900/50 flex items-center justify-center">
              <BugOff className="text-emerald-400 w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-white uppercase">Mapa de Vigilancia Fitosanitaria</span>
          </div>
          
          {/* Grid de Sensores */}
          <div className="bg-emerald-950/50 rounded-xl p-4 border border-emerald-800/30">
            <div className="grid grid-cols-5 gap-2 mb-4">
              {sensorGrid.map((sensor, i) => (
                <div 
                  key={i}
                  className={`aspect-square rounded-lg flex items-center justify-center transition-all ${
                    sensor.active 
                      ? 'bg-emerald-500/30 border border-emerald-500' 
                      : 'bg-slate-800/50 border border-slate-700'
                  }`}
                >
                  {sensor.active && (
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 bg-green-950/50 rounded-lg py-2 border border-green-500/30">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-xs font-mono text-green-400">STATUS: 100% PEST_FREE_ZONE</span>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-800/30 text-center">
            <p className="text-[10px] uppercase font-black text-emerald-400 mb-1">Sensores/Ha</p>
            <p className="text-2xl font-black text-white">{sensorDensity}</p>
          </div>
          <div className="bg-lime-950/40 p-4 rounded-xl border border-lime-800/30 text-center">
            <p className="text-[10px] uppercase font-black text-lime-400 mb-1">Hectáreas</p>
            <p className="text-2xl font-black text-white">{hectares}</p>
          </div>
          <div className="bg-red-950/40 p-4 rounded-xl border border-red-800/30 text-center">
            <p className="text-[10px] uppercase font-black text-red-400 mb-1">Riesgo Rechazo</p>
            <p className="text-2xl font-black text-white">{rejectionRisk}%</p>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-emerald-900/20">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Densidad Sensores (por Ha)</span>
              <span className="font-bold text-emerald-400">{sensorDensity}</span>
            </div>
            <Slider
              value={[sensorDensity]}
              onValueChange={(v) => setSensorDensity(v[0])}
              min={1}
              max={10}
              step={1}
              className="[&>span]:bg-emerald-600"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Hectáreas Monitorizadas</span>
              <span className="font-bold text-lime-400">{hectares}</span>
            </div>
            <Slider
              value={[hectares]}
              onValueChange={(v) => setHectares(v[0])}
              min={10}
              max={500}
              step={10}
              className="[&>span]:bg-lime-600"
            />
          </div>
        </div>

        {/* Despacho Comparison */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-lime-900/20">
          <p className="text-xs text-slate-400 mb-3 uppercase font-bold">Tiempo de Despacho USDA</p>
          <div className="flex items-center gap-4">
            <div className="flex-1 text-center">
              <p className="text-slate-500 text-xs">Tradicional</p>
              <p className="text-xl font-bold text-red-400">5 días</p>
            </div>
            <Leaf className="w-6 h-6 text-emerald-400" />
            <div className="flex-1 text-center">
              <p className="text-lime-400 text-xs">Con IoT</p>
              <p className="text-xl font-bold text-white">4 horas</p>
            </div>
          </div>
        </div>

        {/* Total Savings */}
        <div className="bg-gradient-to-r from-emerald-900/50 to-lime-900/50 p-5 rounded-2xl border border-emerald-500/30">
          <p className="text-[10px] uppercase font-black text-lime-300 mb-2">Ahorro por Merma Evitada</p>
          <p className="text-4xl font-black text-white">{annualSavings.toLocaleString()} <span className="text-lg text-lime-400">EUROe</span></p>
          <Badge className="mt-2 bg-emerald-500/20 text-emerald-300">Pontus-X Notarized</Badge>
        </div>
      </CardContent>
    </Card>
  );
};
