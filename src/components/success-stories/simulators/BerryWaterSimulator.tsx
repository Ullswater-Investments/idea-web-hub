import React, { useState } from 'react';
import { Droplet, Wheat, Waves, Leaf, CheckCircle2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface BerryWaterSimulatorProps {
  onValuesChange?: (values: { numProbes: number; hectares: number; waterSaved: number }) => void;
}

export const BerryWaterSimulator = ({ onValuesChange }: BerryWaterSimulatorProps) => {
  const [numProbes, setNumProbes] = useState(8);
  const [hectares, setHectares] = useState(50);
  
  const waterPerHectare = 1560; // m3/ha baseline
  const waterSaved = hectares * waterPerHectare * (numProbes / 10) * 0.3; // 30% reduction
  const efficiencyIndex = 72 + (numProbes * 1.3);

  // Moisture data simulation
  const moistureData = [
    { week: 'S1', level: 100 },
    { week: 'S2', level: 70 },
    { week: 'S3', level: 100 },
    { week: 'S4', level: 60 },
  ];

  React.useEffect(() => {
    onValuesChange?.({ numProbes, hectares, waterSaved });
  }, [numProbes, hectares, waterSaved, onValuesChange]);

  return (
    <Card className="bg-gradient-to-br from-emerald-950/40 to-lime-950/30 border-emerald-500/20 shadow-2xl overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-emerald-400 flex items-center gap-2 text-sm font-bold">
          <Droplet className="w-5 h-5" />
          WATER FOOTPRINT OPTIMIZER - Certificación Hídrica
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Soil Moisture Visual */}
        <div className="bg-slate-900/80 rounded-2xl p-4 border border-emerald-900/30">
          <div className="flex items-center gap-3 mb-4">
            <Waves className="w-6 h-6 text-blue-400 animate-pulse" />
            <div className="flex-1 h-3 bg-gradient-to-r from-amber-600 via-emerald-500 to-blue-500 rounded-full relative">
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-emerald-500"
                style={{ left: `${efficiencyIndex - 72}%` }}
              />
            </div>
          </div>
          
          {/* Efficiency Gauge */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-950/50 rounded-xl p-4 border border-blue-800/30 text-center">
              <Droplet className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-[10px] uppercase font-black text-blue-400">Eficiencia Riego</p>
              <p className="text-2xl font-black text-white">{efficiencyIndex.toFixed(0)}%</p>
            </div>
            <div className="bg-lime-950/50 rounded-xl p-4 border border-lime-800/30 text-center">
              <Wheat className="w-6 h-6 text-lime-400 mx-auto mb-2" />
              <p className="text-[10px] uppercase font-black text-lime-400">Sondas/Ha</p>
              <p className="text-2xl font-black text-white">{numProbes}</p>
            </div>
          </div>
        </div>

        {/* Moisture Chart */}
        <div className="bg-slate-900/60 rounded-xl p-4 border border-emerald-900/20">
          <p className="text-xs text-slate-400 mb-3 uppercase font-bold">Nivel de Humedad del Suelo</p>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={moistureData}>
                <defs>
                  <linearGradient id="moistureGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} />
                <YAxis hide domain={[0, 120]} />
                <Area 
                  type="monotone" 
                  dataKey="level" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fill="url(#moistureGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-between mt-2 text-[10px]">
            <span className="text-amber-400">🔸 Seco</span>
            <span className="text-emerald-400">🔹 Óptimo</span>
            <span className="text-blue-400">🔵 Saturado</span>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-emerald-900/20">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Sondas de Humedad</span>
              <span className="font-bold text-blue-400">{numProbes}</span>
            </div>
            <Slider
              value={[numProbes]}
              onValueChange={(v) => setNumProbes(v[0])}
              min={1}
              max={20}
              step={1}
              className="[&>span]:bg-blue-600"
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
              min={5}
              max={200}
              step={5}
              className="[&>span]:bg-lime-600"
            />
          </div>
        </div>

        {/* Auditoría Status */}
        <div className="flex items-center justify-between bg-green-950/50 rounded-xl p-4 border border-green-500/30">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <span className="text-sm text-green-300">GlobalG.A.P. Audit</span>
          </div>
          <Badge className="bg-green-500/20 text-green-400">PASSED - Digital</Badge>
        </div>

        {/* Water Savings */}
        <div className="bg-gradient-to-r from-blue-900/50 to-emerald-900/50 p-5 rounded-2xl border border-blue-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Droplet className="w-5 h-5 text-blue-400" />
            <p className="text-[10px] uppercase font-black text-blue-300">Ahorro de Agua Anual</p>
          </div>
          <p className="text-4xl font-black text-white">{waterSaved.toLocaleString()} <span className="text-lg text-blue-400">m³</span></p>
          <p className="text-xs text-slate-400 mt-1">-30% consumo con IoT certificado en blockchain</p>
        </div>
      </CardContent>
    </Card>
  );
};
