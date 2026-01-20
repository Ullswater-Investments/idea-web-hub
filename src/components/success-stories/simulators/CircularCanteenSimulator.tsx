import React, { useState, useMemo } from 'react';
import { Apple, MapPin, Leaf, FileText, Sparkles, TrendingUp, Truck } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis, Cell } from 'recharts';

interface CircularCanteenSimulatorProps {
  onValuesChange?: (values: { meals: number; localPercent: number; co2Saved: number }) => void;
}

export const CircularCanteenSimulator = ({ onValuesChange }: CircularCanteenSimulatorProps) => {
  const [mealsPerDay, setMealsPerDay] = useState(1500);
  const [localPercent, setLocalPercent] = useState(65);

  const calculations = useMemo(() => {
    // CO2 per meal: local (<150km) = 0.8kg, non-local = 2.5kg
    const localMeals = mealsPerDay * localPercent / 100;
    const nonLocalMeals = mealsPerDay - localMeals;
    
    const co2Local = localMeals * 0.8;
    const co2NonLocal = nonLocalMeals * 2.5;
    const co2Total = co2Local + co2NonLocal;
    const co2Baseline = mealsPerDay * 2.5;
    const co2Saved = (co2Baseline - co2Total) * 365 / 1000; // Annual in tons
    
    // Economic reinvestment in local economy
    const avgMealCost = 4.5; // €
    const localReinvestment = localMeals * avgMealCost * 22 * 12; // Monthly working days * months
    
    // km0 certification score
    const km0Score = Math.min(100, Math.round(localPercent * 1.1 + (mealsPerDay > 1000 ? 10 : 0)));
    
    return { 
      localMeals: Math.round(localMeals),
      nonLocalMeals: Math.round(nonLocalMeals),
      co2Saved,
      localReinvestment,
      km0Score
    };
  }, [mealsPerDay, localPercent]);

  // Simulated supplier data for bubble chart
  const supplierData = useMemo(() => {
    const baseSuppliers = [
      { name: 'Huerta Valencia', distance: 45, volume: 25, local: true },
      { name: 'Granja Eco', distance: 80, volume: 15, local: true },
      { name: 'Pescado Costa', distance: 120, volume: 18, local: true },
      { name: 'Frutas Levante', distance: 65, volume: 22, local: true },
      { name: 'Lácteos Sierra', distance: 95, volume: 12, local: true },
      { name: 'Import Foods', distance: 850, volume: 30, local: false },
      { name: 'Global Meat', distance: 1200, volume: 20, local: false },
      { name: 'Euro Dairy', distance: 600, volume: 15, local: false },
    ];
    
    // Adjust volumes based on local percentage
    return baseSuppliers.map(s => ({
      ...s,
      volume: s.local 
        ? Math.round(s.volume * (localPercent / 50)) 
        : Math.round(s.volume * ((100 - localPercent) / 50))
    })).filter(s => s.volume > 0);
  }, [localPercent]);

  const pontusHash = useMemo(() => 
    `0x${(mealsPerDay + localPercent * 100).toString(16).padStart(8, '0')}...km0_trace`, 
    [mealsPerDay, localPercent]
  );

  React.useEffect(() => {
    onValuesChange?.({ meals: mealsPerDay, localPercent, co2Saved: calculations.co2Saved });
  }, [mealsPerDay, localPercent, calculations.co2Saved, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7">
        <Card className="bg-gradient-to-br from-lime-950/40 to-green-950/30 border-lime-500/20 shadow-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-lime-500/20">
                <Apple className="w-6 h-6 text-lime-400" />
              </div>
              <div>
                <h3 className="text-lime-400 font-bold text-sm">COMEDOR KM0 SOSTENIBLE</h3>
                <p className="text-[10px] text-slate-400 font-mono">{pontusHash}</p>
              </div>
            </div>
            <Badge className="bg-lime-500/20 text-lime-400 border-lime-500/30">
              <MapPin className="w-3 h-3 mr-1" />
              {localPercent}% Local
            </Badge>
          </div>

          <div className="bg-slate-900/80 rounded-2xl p-4 border border-lime-900/30 mb-6">
            <p className="text-xs text-slate-400 uppercase font-bold mb-3 text-center">
              Mapa de Proveedores (Distancia vs Volumen)
            </p>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    type="number" 
                    dataKey="distance" 
                    name="Distancia" 
                    unit="km" 
                    tick={{ fill: '#94a3b8', fontSize: 10 }}
                    label={{ value: 'Distancia (km)', position: 'bottom', fill: '#94a3b8', fontSize: 10 }}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="volume" 
                    name="Volumen" 
                    unit="%" 
                    tick={{ fill: '#94a3b8', fontSize: 10 }}
                  />
                  <ZAxis type="number" dataKey="volume" range={[100, 500]} />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                    formatter={(value: number, name: string) => [
                      name === 'distance' ? `${value} km` : `${value}%`,
                      name === 'distance' ? 'Distancia' : 'Volumen'
                    ]}
                  />
                  <Scatter data={supplierData} name="Proveedores">
                    {supplierData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.local ? '#84cc16' : '#f97316'} 
                        fillOpacity={0.7}
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-lime-500"></div>
                <span className="text-xs text-slate-400">Local (&lt;150km)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-xs text-slate-400">No local (&gt;150km)</span>
              </div>
            </div>
          </div>

          <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-lime-900/20 mb-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Comidas Diarias</span>
                <span className="font-bold text-lime-400">{mealsPerDay.toLocaleString()}</span>
              </div>
              <Slider 
                value={[mealsPerDay]} 
                onValueChange={(v) => setMealsPerDay(v[0])} 
                min={500} 
                max={5000} 
                step={100} 
                className="[&>span]:bg-lime-600" 
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">% Proveedores Locales (&lt;150km)</span>
                <span className="font-bold text-green-400">{localPercent}%</span>
              </div>
              <Slider 
                value={[localPercent]} 
                onValueChange={(v) => setLocalPercent(v[0])} 
                min={30} 
                max={100} 
                step={5} 
                className="[&>span]:bg-green-600" 
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-lime-900/50 to-green-900/50 p-4 rounded-xl border border-lime-500/30 text-center">
              <p className="text-[10px] uppercase font-bold text-lime-300 mb-1">tCO₂ Evitadas/Año</p>
              <p className="text-2xl font-black text-white">{calculations.co2Saved.toFixed(0)}</p>
            </div>
            <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 p-4 rounded-xl border border-green-500/30 text-center">
              <p className="text-[10px] uppercase font-bold text-green-300 mb-1">€ Economía Local</p>
              <p className="text-2xl font-black text-white">{(calculations.localReinvestment / 1000).toFixed(0)}k</p>
            </div>
            <div className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 p-4 rounded-xl border border-emerald-500/30 text-center">
              <p className="text-[10px] uppercase font-bold text-emerald-300 mb-1">Score Km0</p>
              <p className="text-2xl font-black text-white">{calculations.km0Score}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-lime-500/20 shadow-2xl h-full p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-500 to-green-600 flex items-center justify-center text-white font-black text-lg">A</div>
            <div>
              <h4 className="text-white font-bold">ARIA</h4>
              <p className="text-[10px] text-slate-400">Asesora de Alimentación Sostenible</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900/60 rounded-xl p-4 border border-lime-900/30">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-lime-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">Impacto Ambiental</p>
                  <p className="text-xs text-slate-400">
                    Con <span className="text-lime-400 font-bold">{localPercent}%</span> de proveedores locales 
                    reduces <span className="text-white font-bold">{calculations.co2Saved.toFixed(0)} tCO₂</span> al año. 
                    Cada comida km0 ahorra <span className="text-emerald-400 font-bold">1.7 kg CO₂</span> vs importada.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-4 border border-green-900/30">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">Impacto Económico Local</p>
                  <p className="text-xs text-slate-400">
                    <span className="text-green-400 font-bold">{calculations.localReinvestment.toLocaleString()}€</span> reinvertidos 
                    anualmente en la economía local. Apoyas a <span className="text-white font-bold">{Math.round(localPercent / 10 + 3)}</span> productores de proximidad.
                  </p>
                </div>
              </div>
            </div>

            {localPercent >= 70 && (
              <div className="bg-gradient-to-r from-lime-900/30 to-green-900/30 rounded-xl p-4 border border-lime-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="w-5 h-5 text-lime-400" />
                  <span className="text-sm font-bold text-lime-300">Certificación Km0</span>
                </div>
                <p className="text-xs text-slate-300">
                  Con {localPercent}% local, tu comedor cumple los criterios de la Generalitat para la 
                  certificación de comedor sostenible.
                </p>
              </div>
            )}

            {calculations.km0Score >= 90 && (
              <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-xl p-4 border border-emerald-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-bold text-emerald-300">Referente Regional</span>
                </div>
                <p className="text-xs text-slate-300">
                  Tu puntuación km0 de {calculations.km0Score} te posiciona como modelo de comedor sostenible.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <Button className="w-full bg-gradient-to-r from-lime-600 to-green-600 hover:from-lime-500 hover:to-green-500">
              <FileText className="w-4 h-4 mr-2" />
              Descargar Pasaporte Km0
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
