import React, { useState } from 'react';
import { Sun, AlertTriangle, Zap, Thermometer, Droplets } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

interface HeliosFieldsSimulatorProps {
  onValuesChange?: (values: { numPanels: number; dirtyDays: number; mwhRecovered: number }) => void;
}

export const HeliosFieldsSimulator = ({ onValuesChange }: HeliosFieldsSimulatorProps) => {
  const [numPanels, setNumPanels] = useState(10000);
  const [dirtyDays, setDirtyDays] = useState(15);
  
  const efficiencyLoss = dirtyDays * 0.002;
  const mwhRecovered = numPanels * 0.015 * (1 - efficiencyLoss);
  const revenueGain = mwhRecovered * 52; // €/MWh

  // Generate production curve data
  const productionData = [
    { hour: '06:00', mwh: 0 },
    { hour: '09:00', mwh: mwhRecovered * 0.4 },
    { hour: '12:00', mwh: mwhRecovered },
    { hour: '15:00', mwh: mwhRecovered * 0.8 },
    { hour: '18:00', mwh: mwhRecovered * 0.3 },
    { hour: '21:00', mwh: 0 },
  ];

  React.useEffect(() => {
    onValuesChange?.({ numPanels, dirtyDays, mwhRecovered });
  }, [numPanels, dirtyDays, mwhRecovered, onValuesChange]);

  // Generate panel grid with dirt levels
  const dirtLevel = Math.min(dirtyDays / 60, 1);

  return (
    <Card className="bg-gradient-to-br from-yellow-950/40 to-orange-950/30 border-yellow-500/20 shadow-2xl overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-yellow-400 flex items-center gap-2 text-sm font-bold">
          <Sun className="w-5 h-5" />
          SOLAR FIELD OPTIMIZER - Mantenimiento Predictivo IoT
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Panel Grid Visual */}
        <div className="bg-slate-900/80 rounded-2xl p-4 border border-yellow-900/30">
          <div className="grid grid-cols-10 gap-1 mb-4">
            {Array.from({ length: 40 }).map((_, i) => {
              const isDirty = Math.random() < dirtLevel;
              return (
                <div 
                  key={i}
                  className={`aspect-square rounded transition-all ${
                    isDirty 
                      ? 'bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border border-orange-600/50' 
                      : 'bg-gradient-to-br from-yellow-500/30 to-amber-500/30 border border-yellow-500/50'
                  }`}
                >
                  {!isDirty && <div className="w-full h-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse" />
                  </div>}
                </div>
              );
            })}
          </div>
          
          {/* Status Bar */}
          <div className="flex justify-between items-center bg-black/40 rounded-lg p-2">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-orange-400" />
              <span className="text-[10px] text-slate-300">Suciedad: <span className={`font-bold ${dirtyDays > 30 ? 'text-red-400' : 'text-yellow-400'}`}>{dirtyDays} días</span></span>
            </div>
            {dirtyDays > 30 && (
              <Badge className="bg-red-500/20 text-red-400 text-[10px]">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Limpieza Urgente
              </Badge>
            )}
          </div>
        </div>

        {/* Production Chart */}
        <div className="bg-slate-900/60 rounded-xl p-4 border border-yellow-900/20">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs text-slate-400 uppercase font-bold">Generación Real-Time</span>
            <span className="text-lg font-black text-yellow-400">{mwhRecovered.toFixed(1)} MWh</span>
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productionData}>
                <defs>
                  <linearGradient id="solarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#facc15" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#facc15" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="hour" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="mwh" 
                  stroke="#facc15" 
                  strokeWidth={2}
                  fill="url(#solarGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-yellow-900/20">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Número de Paneles</span>
              <span className="font-bold text-yellow-400">{numPanels.toLocaleString()}</span>
            </div>
            <Slider
              value={[numPanels]}
              onValueChange={(v) => setNumPanels(v[0])}
              min={1000}
              max={50000}
              step={1000}
              className="[&>span]:bg-yellow-600"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Días sin Limpieza</span>
              <span className={`font-bold ${dirtyDays > 30 ? 'text-red-400' : 'text-orange-400'}`}>{dirtyDays}</span>
            </div>
            <Slider
              value={[dirtyDays]}
              onValueChange={(v) => setDirtyDays(v[0])}
              min={1}
              max={60}
              step={1}
              className="[&>span]:bg-orange-600"
            />
          </div>
        </div>

        {/* Revenue Impact */}
        <div className="bg-gradient-to-r from-yellow-900/50 to-amber-900/50 p-5 rounded-2xl border border-yellow-500/30">
          <p className="text-[10px] uppercase font-black text-yellow-300 mb-2">Ingresos por Generación Optimizada</p>
          <p className="text-4xl font-black text-white">{revenueGain.toLocaleString()} <span className="text-lg text-yellow-400">EUROe/día</span></p>
          <div className="flex gap-2 mt-2">
            <Badge className="bg-yellow-500/20 text-yellow-300">+5% Eficiencia</Badge>
            <Badge className="bg-emerald-500/20 text-emerald-300">IoT Activo</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
