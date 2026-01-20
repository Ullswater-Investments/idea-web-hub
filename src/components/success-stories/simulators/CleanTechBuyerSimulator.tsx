import React, { useState, useMemo } from 'react';
import { Monitor, Cpu, Zap, FileText, Sparkles, Recycle, Award } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface CleanTechBuyerSimulatorProps {
  onValuesChange?: (values: { budget: number; epeatPercent: number; eWasteSaved: number }) => void;
}

export const CleanTechBuyerSimulator = ({ onValuesChange }: CleanTechBuyerSimulatorProps) => {
  const [budget, setBudget] = useState(2500000);
  const [epeatPercent, setEpeatPercent] = useState(60);

  const calculations = useMemo(() => {
    // Average device cost: €800, EPEAT Gold devices: +15% cost but better specs
    const avgDeviceCost = 800;
    const totalDevices = Math.round(budget / avgDeviceCost);
    const epeatDevices = Math.round(totalDevices * epeatPercent / 100);
    
    // Energy savings: EPEAT Gold saves avg 30% energy (€50/year per device)
    const energySavings = epeatDevices * 50;
    
    // e-Waste reduction: EPEAT extends lifecycle by 2 years, avg device = 3kg
    const baseEwaste = totalDevices * 3; // kg over 5 years
    const ewasteSaved = Math.round(epeatDevices * 3 * 0.4); // 40% reduction
    const ewasteSavedPercent = Math.round((ewasteSaved / baseEwaste) * 100);
    
    // TCO Green Score (Total Cost of Ownership with sustainability)
    const tcoScore = Math.min(100, Math.round(
      epeatPercent * 0.6 + 
      (budget > 2000000 ? 15 : 5) + 
      (epeatPercent > 70 ? 20 : 0)
    ));
    
    return { 
      totalDevices,
      epeatDevices,
      energySavings,
      ewasteSaved,
      ewasteSavedPercent,
      tcoScore
    };
  }, [budget, epeatPercent]);

  const radarData = useMemo(() => [
    { subject: 'Eficiencia', value: Math.min(100, epeatPercent * 1.2), fullMark: 100 },
    { subject: 'Reparabilidad', value: Math.min(100, 40 + epeatPercent * 0.5), fullMark: 100 },
    { subject: 'Reciclabilidad', value: Math.min(100, 50 + epeatPercent * 0.4), fullMark: 100 },
    { subject: 'Durabilidad', value: Math.min(100, 35 + epeatPercent * 0.6), fullMark: 100 },
    { subject: 'Toxicidad', value: Math.min(100, 60 + epeatPercent * 0.35), fullMark: 100 },
    { subject: 'Packaging', value: Math.min(100, 45 + epeatPercent * 0.45), fullMark: 100 },
  ], [epeatPercent]);

  const pontusHash = useMemo(() => 
    `0x${(budget / 1000 + epeatPercent * 100).toString(16).padStart(8, '0')}...epeat_cert`, 
    [budget, epeatPercent]
  );

  React.useEffect(() => {
    onValuesChange?.({ budget, epeatPercent, eWasteSaved: calculations.ewasteSaved });
  }, [budget, epeatPercent, calculations.ewasteSaved, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7">
        <Card className="bg-gradient-to-br from-indigo-950/40 to-purple-950/30 border-indigo-500/20 shadow-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-500/20">
                <Monitor className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-indigo-400 font-bold text-sm">COMPRAS TIC SOSTENIBLES</h3>
                <p className="text-[10px] text-slate-400 font-mono">{pontusHash}</p>
              </div>
            </div>
            <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30">
              <Recycle className="w-3 h-3 mr-1" />
              -{calculations.ewasteSavedPercent}% e-Waste
            </Badge>
          </div>

          <div className="bg-slate-900/80 rounded-2xl p-4 border border-indigo-900/30 mb-6">
            <p className="text-xs text-slate-400 uppercase font-bold mb-3 text-center">
              Radar de Sostenibilidad EPEAT
            </p>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 8 }} />
                  <Radar 
                    name="Puntuación" 
                    dataKey="value" 
                    stroke="#818cf8" 
                    fill="#818cf8" 
                    fillOpacity={0.5} 
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-indigo-900/20 mb-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Presupuesto TIC Anual</span>
                <span className="font-bold text-indigo-400">{(budget / 1000000).toFixed(1)}M€</span>
              </div>
              <Slider 
                value={[budget]} 
                onValueChange={(v) => setBudget(v[0])} 
                min={100000} 
                max={10000000} 
                step={100000} 
                className="[&>span]:bg-indigo-600" 
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">% Equipos EPEAT Gold</span>
                <span className="font-bold text-purple-400">{epeatPercent}%</span>
              </div>
              <Slider 
                value={[epeatPercent]} 
                onValueChange={(v) => setEpeatPercent(v[0])} 
                min={20} 
                max={100} 
                step={5} 
                className="[&>span]:bg-purple-600" 
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 p-4 rounded-xl border border-indigo-500/30 text-center">
              <p className="text-[10px] uppercase font-bold text-indigo-300 mb-1">kWh Ahorrados/Año</p>
              <p className="text-2xl font-black text-white">{(calculations.energySavings * 20).toLocaleString()}</p>
            </div>
            <div className="bg-gradient-to-r from-purple-900/50 to-fuchsia-900/50 p-4 rounded-xl border border-purple-500/30 text-center">
              <p className="text-[10px] uppercase font-bold text-purple-300 mb-1">kg e-Waste Evitados</p>
              <p className="text-2xl font-black text-white">{calculations.ewasteSaved.toLocaleString()}</p>
            </div>
            <div className="bg-gradient-to-r from-fuchsia-900/50 to-pink-900/50 p-4 rounded-xl border border-fuchsia-500/30 text-center">
              <p className="text-[10px] uppercase font-bold text-fuchsia-300 mb-1">Score TCO Verde</p>
              <p className="text-2xl font-black text-white">{calculations.tcoScore}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-indigo-500/20 shadow-2xl h-full p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-lg">A</div>
            <div>
              <h4 className="text-white font-bold">ARIA</h4>
              <p className="text-[10px] text-slate-400">Asesora de TIC Sostenible</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900/60 rounded-xl p-4 border border-indigo-900/30">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-indigo-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">Flota de Equipos</p>
                  <p className="text-xs text-slate-400">
                    Con <span className="text-indigo-400 font-bold">{calculations.epeatDevices.toLocaleString()}</span> equipos EPEAT Gold 
                    de un total de <span className="text-white font-bold">{calculations.totalDevices.toLocaleString()}</span>, 
                    ahorras <span className="text-purple-400 font-bold">{calculations.energySavings.toLocaleString()}€</span> en energía anual.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-4 border border-purple-900/30">
              <div className="flex items-start gap-3">
                <Cpu className="w-5 h-5 text-purple-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">Ciclo de Vida Extendido</p>
                  <p className="text-xs text-slate-400">
                    EPEAT Gold extiende la vida útil media de <span className="text-white font-bold">4 a 6 años</span>. 
                    Evitas <span className="text-purple-400 font-bold">{calculations.ewasteSaved} kg</span> de residuos electrónicos.
                  </p>
                </div>
              </div>
            </div>

            {epeatPercent >= 80 && (
              <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-xl p-4 border border-indigo-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-indigo-400" />
                  <span className="text-sm font-bold text-indigo-300">Compra Ejemplar</span>
                </div>
                <p className="text-xs text-slate-300">
                  Con {epeatPercent}% EPEAT Gold, tu consorcio es referente en compra pública sostenible de TIC.
                </p>
              </div>
            )}

            {calculations.tcoScore >= 85 && (
              <div className="bg-gradient-to-r from-purple-900/30 to-fuchsia-900/30 rounded-xl p-4 border border-purple-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-purple-400" />
                  <span className="text-sm font-bold text-purple-300">TCO Óptimo</span>
                </div>
                <p className="text-xs text-slate-300">
                  Tu puntuación TCO Verde de {calculations.tcoScore} maximiza ahorro y sostenibilidad a largo plazo.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500">
              <FileText className="w-4 h-4 mr-2" />
              Descargar Informe EPEAT
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
