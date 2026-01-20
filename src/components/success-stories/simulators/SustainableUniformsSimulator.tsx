import React, { useState, useMemo } from 'react';
import { Shirt, Droplet, Recycle, FileText, Sparkles, Award, Users } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface SustainableUniformsSimulatorProps {
  onValuesChange?: (values: { uniforms: number; recycledPercent: number; waterSaved: number }) => void;
}

export const SustainableUniformsSimulator = ({ onValuesChange }: SustainableUniformsSimulatorProps) => {
  const [uniformsPerYear, setUniformsPerYear] = useState(1200);
  const [recycledPercent, setRecycledPercent] = useState(55);

  const calculations = useMemo(() => {
    const recycledUniforms = Math.round(uniformsPerYear * recycledPercent / 100);
    const virginUniforms = uniformsPerYear - recycledUniforms;
    
    // Water footprint: virgin cotton = 10,000 L/kg, recycled = 2,500 L/kg
    // Avg uniform weight: 1.2 kg
    const avgWeight = 1.2;
    const waterVirgin = virginUniforms * avgWeight * 10000;
    const waterRecycled = recycledUniforms * avgWeight * 2500;
    const waterSaved = (uniformsPerYear * avgWeight * 10000) - (waterVirgin + waterRecycled);
    
    // CO2: virgin = 8 kg CO2/kg textile, recycled = 2.5 kg CO2/kg
    const co2Virgin = virginUniforms * avgWeight * 8;
    const co2Recycled = recycledUniforms * avgWeight * 2.5;
    const co2Saved = (uniformsPerYear * avgWeight * 8) - (co2Virgin + co2Recycled);
    
    // SA8000 score (social accountability)
    const sa8000Score = Math.min(100, Math.round(
      50 + recycledPercent * 0.3 + (uniformsPerYear > 1000 ? 15 : 5)
    ));
    
    return { 
      recycledUniforms,
      virginUniforms,
      waterSaved,
      waterSavedM3: Math.round(waterSaved / 1000),
      co2Saved,
      sa8000Score
    };
  }, [uniformsPerYear, recycledPercent]);

  const pieData = useMemo(() => [
    { name: 'Fibra Reciclada', value: recycledPercent, color: '#14b8a6' },
    { name: 'Fibra Virgen', value: 100 - recycledPercent, color: '#f43f5e' },
  ], [recycledPercent]);

  const pontusHash = useMemo(() => 
    `0x${(uniformsPerYear + recycledPercent * 100).toString(16).padStart(8, '0')}...textile_circ`, 
    [uniformsPerYear, recycledPercent]
  );

  React.useEffect(() => {
    onValuesChange?.({ uniforms: uniformsPerYear, recycledPercent, waterSaved: calculations.waterSaved });
  }, [uniformsPerYear, recycledPercent, calculations.waterSaved, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7">
        <Card className="bg-gradient-to-br from-rose-950/40 to-teal-950/30 border-rose-500/20 shadow-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-rose-500/20">
                <Shirt className="w-6 h-6 text-rose-400" />
              </div>
              <div>
                <h3 className="text-rose-400 font-bold text-sm">TEXTIL PÚBLICO CIRCULAR</h3>
                <p className="text-[10px] text-slate-400 font-mono">{pontusHash}</p>
              </div>
            </div>
            <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30">
              <Recycle className="w-3 h-3 mr-1" />
              {recycledPercent}% Reciclado
            </Badge>
          </div>

          <div className="bg-slate-900/80 rounded-2xl p-4 border border-rose-900/30 mb-6">
            <p className="text-xs text-slate-400 uppercase font-bold mb-3 text-center">
              Composición Textil
            </p>
            <div className="h-52 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${value}%`}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                    formatter={(value: number) => [`${value}%`]}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value) => <span className="text-slate-300 text-xs">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-rose-900/20 mb-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Uniformes/Año</span>
                <span className="font-bold text-rose-400">{uniformsPerYear.toLocaleString()}</span>
              </div>
              <Slider 
                value={[uniformsPerYear]} 
                onValueChange={(v) => setUniformsPerYear(v[0])} 
                min={500} 
                max={5000} 
                step={100} 
                className="[&>span]:bg-rose-600" 
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">% Fibra Reciclada Certificada</span>
                <span className="font-bold text-teal-400">{recycledPercent}%</span>
              </div>
              <Slider 
                value={[recycledPercent]} 
                onValueChange={(v) => setRecycledPercent(v[0])} 
                min={0} 
                max={100} 
                step={5} 
                className="[&>span]:bg-teal-600" 
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-cyan-900/50 to-teal-900/50 p-4 rounded-xl border border-cyan-500/30 text-center">
              <p className="text-[10px] uppercase font-bold text-cyan-300 mb-1">m³ Agua Ahorrados</p>
              <p className="text-2xl font-black text-white">{calculations.waterSavedM3.toLocaleString()}</p>
            </div>
            <div className="bg-gradient-to-r from-teal-900/50 to-emerald-900/50 p-4 rounded-xl border border-teal-500/30 text-center">
              <p className="text-[10px] uppercase font-bold text-teal-300 mb-1">kg CO₂ Evitados</p>
              <p className="text-2xl font-black text-white">{calculations.co2Saved.toFixed(0)}</p>
            </div>
            <div className="bg-gradient-to-r from-rose-900/50 to-pink-900/50 p-4 rounded-xl border border-rose-500/30 text-center">
              <p className="text-[10px] uppercase font-bold text-rose-300 mb-1">Score SA8000</p>
              <p className="text-2xl font-black text-white">{calculations.sa8000Score}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-rose-500/20 shadow-2xl h-full p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-teal-600 flex items-center justify-center text-white font-black text-lg">A</div>
            <div>
              <h4 className="text-white font-bold">ARIA</h4>
              <p className="text-[10px] text-slate-400">Asesora de Textil Circular</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900/60 rounded-xl p-4 border border-rose-900/30">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-rose-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">Huella Hídrica</p>
                  <p className="text-xs text-slate-400">
                    Con <span className="text-teal-400 font-bold">{recycledPercent}%</span> de fibra reciclada 
                    ahorras <span className="text-cyan-400 font-bold">{calculations.waterSavedM3.toLocaleString()} m³</span> de agua. 
                    Equivale a <span className="text-white font-bold">{Math.round(calculations.waterSavedM3 / 150)}</span> piscinas olímpicas.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-4 border border-teal-900/30">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-teal-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">Auditoría Social SA8000</p>
                  <p className="text-xs text-slate-400">
                    Tu puntuación de <span className="text-teal-400 font-bold">{calculations.sa8000Score}</span> verifica 
                    condiciones laborales éticas. <span className="text-white font-bold">{calculations.recycledUniforms}</span> uniformes 
                    con trazabilidad completa.
                  </p>
                </div>
              </div>
            </div>

            {recycledPercent >= 70 && (
              <div className="bg-gradient-to-r from-teal-900/30 to-emerald-900/30 rounded-xl p-4 border border-teal-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Recycle className="w-5 h-5 text-teal-400" />
                  <span className="text-sm font-bold text-teal-300">Textil Circular Verificado</span>
                </div>
                <p className="text-xs text-slate-300">
                  Con {recycledPercent}% reciclado, tus uniformes cumplen criterios de economía circular de la UE.
                </p>
              </div>
            )}

            {calculations.sa8000Score >= 85 && (
              <div className="bg-gradient-to-r from-rose-900/30 to-pink-900/30 rounded-xl p-4 border border-rose-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-rose-400" />
                  <span className="text-sm font-bold text-rose-300">Contrato Ejemplar</span>
                </div>
                <p className="text-xs text-slate-300">
                  Tu puntuación SA8000 de {calculations.sa8000Score} te posiciona como referente en compra ética.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <Button className="w-full bg-gradient-to-r from-rose-600 to-teal-600 hover:from-rose-500 hover:to-teal-500">
              <FileText className="w-4 h-4 mr-2" />
              Descargar Pasaporte Textil
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
