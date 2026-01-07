import React, { useState } from 'react';
import { Zap, TrendingDown, Coins, Gauge, Activity } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

interface GridFlexSimulatorProps {
  onValuesChange?: (values: { reductionCapacity: number; incentivePrice: number; earnings: number }) => void;
}

export const GridFlexSimulator = ({ onValuesChange }: GridFlexSimulatorProps) => {
  const [reductionCapacity, setReductionCapacity] = useState(1000);
  const [incentivePrice, setIncentivePrice] = useState(250);
  
  const monthlyIncentive = (reductionCapacity / 1000) * incentivePrice * 4;
  const gridReliability = Math.min(100, 85 + (reductionCapacity / 500));

  const loadData = [
    { name: 'Base', load: 100 },
    { name: 'Reducción', load: 100 - (reductionCapacity / 50) }
  ];

  React.useEffect(() => {
    onValuesChange?.({ reductionCapacity, incentivePrice, earnings: monthlyIncentive });
  }, [reductionCapacity, incentivePrice, monthlyIncentive, onValuesChange]);

  return (
    <Card className="bg-gradient-to-br from-purple-950/40 to-indigo-950/30 border-purple-500/20 shadow-2xl overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-purple-400 flex items-center gap-2 text-sm font-bold">
          <Activity className="w-5 h-5" />
          GRID FLEXIBILITY MONETIZER - Gestión de Demanda
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Load Status Header */}
        <div className="bg-slate-900/80 rounded-2xl p-4 border border-purple-900/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-purple-400" />
              <span className="text-sm font-bold text-white uppercase">Estado de Carga de Red Industrial</span>
            </div>
            <Badge className={`${gridReliability > 95 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
              Estabilidad: {gridReliability.toFixed(0)}%
            </Badge>
          </div>
          
          {/* Load Chart */}
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={loadData} layout="vertical">
                <XAxis type="number" domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8', fontSize: 10 }} width={70} />
                <Bar dataKey="load" radius={[0, 8, 8, 0]}>
                  {loadData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#6b7280' : '#a855f7'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* KPIs Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-purple-950/40 p-4 rounded-xl border border-purple-800/30 text-center">
            <TrendingDown className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-black text-white">{reductionCapacity}</p>
            <p className="text-[10px] text-purple-300 uppercase">kW Reducción</p>
          </div>
          <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-800/30 text-center">
            <Gauge className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
            <p className="text-2xl font-black text-white">{incentivePrice}</p>
            <p className="text-[10px] text-indigo-300 uppercase">€/MWh Incentivo</p>
          </div>
          <div className="bg-fuchsia-950/40 p-4 rounded-xl border border-fuchsia-800/30 text-center">
            <Activity className="w-6 h-6 text-fuchsia-400 mx-auto mb-2" />
            <p className="text-2xl font-black text-white">4</p>
            <p className="text-[10px] text-fuchsia-300 uppercase">Eventos/Mes</p>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-purple-900/20">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Capacidad de Reducción</span>
              <span className="font-bold text-purple-400">{reductionCapacity.toLocaleString()} kW</span>
            </div>
            <Slider
              value={[reductionCapacity]}
              onValueChange={(v) => setReductionCapacity(v[0])}
              min={50}
              max={5000}
              step={50}
              className="[&>span]:bg-purple-600"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Precio Incentivo</span>
              <span className="font-bold text-indigo-400">{incentivePrice} €/MWh</span>
            </div>
            <Slider
              value={[incentivePrice]}
              onValueChange={(v) => setIncentivePrice(v[0])}
              min={100}
              max={500}
              step={25}
              className="[&>span]:bg-indigo-600"
            />
          </div>
        </div>

        {/* Total Earnings */}
        <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 p-5 rounded-2xl border border-purple-500/30">
          <p className="text-[10px] uppercase font-black text-purple-300 mb-2">Incentivos por Flexibilidad (Mensual)</p>
          <p className="text-4xl font-black text-white">{monthlyIncentive.toLocaleString()} <span className="text-lg text-purple-400">EUROe</span></p>
          <div className="flex items-center gap-2 mt-2 text-[10px] font-mono text-green-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            BALANCE_STABILITY: OPTIMAL
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
