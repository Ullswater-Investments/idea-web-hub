import React, { useState, useMemo } from 'react';
import { Car, Zap, Leaf, FileText, Sparkles, TrendingDown, Battery } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface GreenFleetSimulatorProps {
  onValuesChange?: (values: { vehicles: number; electrification: number; co2Saved: number }) => void;
}

export const GreenFleetSimulator = ({ onValuesChange }: GreenFleetSimulatorProps) => {
  const [vehicles, setVehicles] = useState(180);
  const [electrification, setElectrification] = useState(45);

  const calculations = useMemo(() => {
    const electricVehicles = Math.round(vehicles * electrification / 100);
    const combustionVehicles = vehicles - electricVehicles;
    
    // Emissions: diesel avg 2.4 tCO2/year per vehicle, electric 0.3 tCO2/year
    const beforeCO2 = vehicles * 2.4;
    const afterCO2 = combustionVehicles * 2.4 + electricVehicles * 0.3;
    const co2Saved = beforeCO2 - afterCO2;
    const reductionPercent = Math.round((co2Saved / beforeCO2) * 100);
    
    // Fuel savings: avg €3,500/year diesel vs €800/year electricity per vehicle
    const fuelSavings = electricVehicles * (3500 - 800);
    
    // PNIEC score (Spanish National Energy Plan)
    const pniecScore = Math.min(100, Math.round(electrification * 0.9 + (vehicles > 100 ? 15 : 5)));
    
    return { 
      electricVehicles, 
      combustionVehicles, 
      beforeCO2, 
      afterCO2, 
      co2Saved, 
      reductionPercent,
      fuelSavings,
      pniecScore
    };
  }, [vehicles, electrification]);

  const chartData = useMemo(() => {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return months.map((month, i) => {
      const progress = (i + 1) / 12;
      const transitioning = progress * electrification / 100;
      return {
        month,
        antes: Math.round(calculations.beforeCO2 / 12),
        despues: Math.round((calculations.beforeCO2 * (1 - transitioning * 0.875)) / 12)
      };
    });
  }, [calculations, electrification]);

  const pontusHash = useMemo(() => 
    `0x${(vehicles * 100 + electrification).toString(16).padStart(8, '0')}...fleet_carbon`, 
    [vehicles, electrification]
  );

  React.useEffect(() => {
    onValuesChange?.({ vehicles, electrification, co2Saved: calculations.co2Saved });
  }, [vehicles, electrification, calculations.co2Saved, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7">
        <Card className="bg-gradient-to-br from-cyan-950/40 to-teal-950/30 border-cyan-500/20 shadow-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/20">
                <Car className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-cyan-400 font-bold text-sm">FLOTA MUNICIPAL ZERO EMISIONES</h3>
                <p className="text-[10px] text-slate-400 font-mono">{pontusHash}</p>
              </div>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
              <TrendingDown className="w-3 h-3 mr-1" />
              -{calculations.reductionPercent}% CO₂
            </Badge>
          </div>

          <div className="bg-slate-900/80 rounded-2xl p-4 border border-cyan-900/30 mb-6">
            <p className="text-xs text-slate-400 uppercase font-bold mb-3 text-center">
              Comparativa Emisiones Anuales (tCO₂)
            </p>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorAntes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorDespues" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                    labelStyle={{ color: '#e2e8f0' }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="antes" name="Sin electrificar" stroke="#ef4444" fillOpacity={1} fill="url(#colorAntes)" />
                  <Area type="monotone" dataKey="despues" name="Con electrificación" stroke="#22d3ee" fillOpacity={1} fill="url(#colorDespues)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-cyan-900/20 mb-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Vehículos en Flota</span>
                <span className="font-bold text-cyan-400">{vehicles}</span>
              </div>
              <Slider 
                value={[vehicles]} 
                onValueChange={(v) => setVehicles(v[0])} 
                min={50} 
                max={500} 
                step={10} 
                className="[&>span]:bg-cyan-600" 
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">% Electrificación</span>
                <span className="font-bold text-teal-400">{electrification}%</span>
              </div>
              <Slider 
                value={[electrification]} 
                onValueChange={(v) => setElectrification(v[0])} 
                min={0} 
                max={100} 
                step={5} 
                className="[&>span]:bg-teal-600" 
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-cyan-900/50 to-teal-900/50 p-4 rounded-xl border border-cyan-500/30 text-center">
              <p className="text-[10px] uppercase font-bold text-cyan-300 mb-1">tCO₂ Evitadas/Año</p>
              <p className="text-2xl font-black text-white">{calculations.co2Saved.toFixed(0)}</p>
            </div>
            <div className="bg-gradient-to-r from-teal-900/50 to-emerald-900/50 p-4 rounded-xl border border-teal-500/30 text-center">
              <p className="text-[10px] uppercase font-bold text-teal-300 mb-1">Ahorro Combustible</p>
              <p className="text-2xl font-black text-white">{(calculations.fuelSavings / 1000).toFixed(0)}k€</p>
            </div>
            <div className="bg-gradient-to-r from-emerald-900/50 to-green-900/50 p-4 rounded-xl border border-emerald-500/30 text-center">
              <p className="text-[10px] uppercase font-bold text-emerald-300 mb-1">Score PNIEC</p>
              <p className="text-2xl font-black text-white">{calculations.pniecScore}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-cyan-500/20 shadow-2xl h-full p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center text-white font-black text-lg">A</div>
            <div>
              <h4 className="text-white font-bold">ARIA</h4>
              <p className="text-[10px] text-slate-400">Asesora de Movilidad Sostenible</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900/60 rounded-xl p-4 border border-cyan-900/30">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-cyan-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">Reducción de Emisiones</p>
                  <p className="text-xs text-slate-400">
                    Con <span className="text-cyan-400 font-bold">{calculations.electricVehicles}</span> vehículos eléctricos 
                    estás evitando <span className="text-white font-bold">{calculations.co2Saved.toFixed(0)} tCO₂</span> anuales. 
                    Equivale a plantar <span className="text-emerald-400 font-bold">{Math.round(calculations.co2Saved * 45)}</span> árboles.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-4 border border-teal-900/30">
              <div className="flex items-start gap-3">
                <Battery className="w-5 h-5 text-teal-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">Composición de Flota</p>
                  <p className="text-xs text-slate-400">
                    <span className="text-teal-400 font-bold">{calculations.electricVehicles}</span> eléctricos + 
                    <span className="text-orange-400 font-bold"> {calculations.combustionVehicles}</span> combustión. 
                    Ahorro anual en combustible: <span className="text-white font-bold">{calculations.fuelSavings.toLocaleString()}€</span>.
                  </p>
                </div>
              </div>
            </div>

            {calculations.pniecScore >= 80 && (
              <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-xl p-4 border border-emerald-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-bold text-emerald-300">Elegible Fondos PNIEC</span>
                </div>
                <p className="text-xs text-slate-300">
                  Tu puntuación de <span className="font-bold">{calculations.pniecScore}</span> te cualifica para acceder a 
                  fondos europeos de movilidad sostenible.
                </p>
              </div>
            )}

            {electrification >= 75 && (
              <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-xl p-4 border border-cyan-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-bold text-cyan-300">Flota Líder</span>
                </div>
                <p className="text-xs text-slate-300">
                  Con {electrification}% de electrificación, tu flota está entre las más sostenibles de España.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <Button className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500">
              <FileText className="w-4 h-4 mr-2" />
              Descargar Certificado PNIEC
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
