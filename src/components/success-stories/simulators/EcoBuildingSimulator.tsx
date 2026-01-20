import React, { useState, useMemo } from 'react';
import { Building2, Recycle, Award, FileText, Sparkles, Leaf, Package } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface EcoBuildingSimulatorProps {
  onValuesChange?: (values: { surface: number; circularPercent: number; leedPoints: number }) => void;
}

export const EcoBuildingSimulator = ({ onValuesChange }: EcoBuildingSimulatorProps) => {
  const [surface, setSurface] = useState(8000);
  const [circularPercent, setCircularPercent] = useState(45);

  const calculations = useMemo(() => {
    // LEED points calculation (Materials & Resources category)
    // Max 13 points for recycled content, regional materials, etc.
    const leedMaterialPoints = Math.min(13, Math.round(circularPercent * 0.26));
    const leedTotalPoints = 40 + leedMaterialPoints + (surface > 10000 ? 5 : 0); // Base points + materials + scale bonus
    
    // Certification level
    let leedLevel = 'Certified';
    if (leedTotalPoints >= 60) leedLevel = 'Gold';
    if (leedTotalPoints >= 50) leedLevel = 'Silver';
    if (leedTotalPoints >= 80) leedLevel = 'Platinum';
    
    // Embodied carbon saved (avg 0.5 tCO2/m² for conventional, 30% reduction for circular)
    const baseCarbon = surface * 0.5;
    const carbonSaved = baseCarbon * (circularPercent / 100) * 0.3;
    
    // Waste fee savings (€15/ton, avg 0.15 ton/m² waste, 40% reduction)
    const baseWaste = surface * 0.15;
    const wasteReduced = baseWaste * (circularPercent / 100) * 0.4;
    const wasteSavings = wasteReduced * 15;
    
    return { 
      leedMaterialPoints,
      leedTotalPoints,
      leedLevel,
      carbonSaved,
      wasteReduced,
      wasteSavings
    };
  }, [surface, circularPercent]);

  const materialData = useMemo(() => [
    { 
      category: 'Estructura', 
      circular: Math.round(circularPercent * 0.8), 
      virgin: 100 - Math.round(circularPercent * 0.8) 
    },
    { 
      category: 'Acabados', 
      circular: Math.round(circularPercent * 1.1), 
      virgin: 100 - Math.round(circularPercent * 1.1) 
    },
    { 
      category: 'Instalaciones', 
      circular: Math.round(circularPercent * 0.6), 
      virgin: 100 - Math.round(circularPercent * 0.6) 
    },
    { 
      category: 'Aislamiento', 
      circular: Math.round(circularPercent * 1.3), 
      virgin: 100 - Math.round(circularPercent * 1.3) 
    },
    { 
      category: 'Carpintería', 
      circular: Math.round(circularPercent * 0.9), 
      virgin: 100 - Math.round(circularPercent * 0.9) 
    },
  ].map(d => ({
    ...d,
    circular: Math.min(100, Math.max(0, d.circular)),
    virgin: Math.min(100, Math.max(0, d.virgin))
  })), [circularPercent]);

  const pontusHash = useMemo(() => 
    `0x${(surface + circularPercent * 1000).toString(16).padStart(8, '0')}...epd_verify`, 
    [surface, circularPercent]
  );

  React.useEffect(() => {
    onValuesChange?.({ surface, circularPercent, leedPoints: calculations.leedTotalPoints });
  }, [surface, circularPercent, calculations.leedTotalPoints, onValuesChange]);

  const getLeedColor = (level: string) => {
    switch(level) {
      case 'Platinum': return 'text-slate-200';
      case 'Gold': return 'text-yellow-400';
      case 'Silver': return 'text-slate-300';
      default: return 'text-emerald-400';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7">
        <Card className="bg-gradient-to-br from-emerald-950/40 to-slate-950/30 border-emerald-500/20 shadow-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <Building2 className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-emerald-400 font-bold text-sm">LICITACIÓN CONSTRUCCIÓN VERDE</h3>
                <p className="text-[10px] text-slate-400 font-mono">{pontusHash}</p>
              </div>
            </div>
            <Badge className={`bg-emerald-500/20 ${getLeedColor(calculations.leedLevel)} border-emerald-500/30`}>
              <Award className="w-3 h-3 mr-1" />
              LEED {calculations.leedLevel}
            </Badge>
          </div>

          <div className="bg-slate-900/80 rounded-2xl p-4 border border-emerald-900/30 mb-6">
            <p className="text-xs text-slate-400 uppercase font-bold mb-3 text-center">
              % Materiales Circulares por Categoría
            </p>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={materialData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis type="category" dataKey="category" tick={{ fill: '#94a3b8', fontSize: 10 }} width={80} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                    formatter={(value: number) => [`${value}%`]}
                  />
                  <Bar dataKey="circular" name="Circular/Reciclado" stackId="a" fill="#10b981" />
                  <Bar dataKey="virgin" name="Material Virgen" stackId="a" fill="#475569" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-emerald-900/20 mb-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Superficie Construida (m²)</span>
                <span className="font-bold text-emerald-400">{surface.toLocaleString()}</span>
              </div>
              <Slider 
                value={[surface]} 
                onValueChange={(v) => setSurface(v[0])} 
                min={1000} 
                max={50000} 
                step={500} 
                className="[&>span]:bg-emerald-600" 
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">% Materiales Circulares (EPD verificado)</span>
                <span className="font-bold text-teal-400">{circularPercent}%</span>
              </div>
              <Slider 
                value={[circularPercent]} 
                onValueChange={(v) => setCircularPercent(v[0])} 
                min={10} 
                max={80} 
                step={5} 
                className="[&>span]:bg-teal-600" 
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 p-4 rounded-xl border border-emerald-500/30 text-center">
              <p className="text-[10px] uppercase font-bold text-emerald-300 mb-1">Puntos LEED</p>
              <p className="text-2xl font-black text-white">{calculations.leedTotalPoints}</p>
            </div>
            <div className="bg-gradient-to-r from-teal-900/50 to-cyan-900/50 p-4 rounded-xl border border-teal-500/30 text-center">
              <p className="text-[10px] uppercase font-bold text-teal-300 mb-1">tCO₂ Embebidas</p>
              <p className="text-2xl font-black text-white">-{calculations.carbonSaved.toFixed(0)}</p>
            </div>
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 p-4 rounded-xl border border-slate-500/30 text-center">
              <p className="text-[10px] uppercase font-bold text-slate-300 mb-1">Ahorro Residuos</p>
              <p className="text-2xl font-black text-white">{(calculations.wasteSavings / 1000).toFixed(0)}k€</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-emerald-500/20 shadow-2xl h-full p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-black text-lg">A</div>
            <div>
              <h4 className="text-white font-bold">ARIA</h4>
              <p className="text-[10px] text-slate-400">Asesora de Construcción Sostenible</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900/60 rounded-xl p-4 border border-emerald-900/30">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-emerald-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">Certificación LEED</p>
                  <p className="text-xs text-slate-400">
                    Con <span className="text-emerald-400 font-bold">{calculations.leedTotalPoints}</span> puntos alcanzas 
                    nivel <span className={`font-bold ${getLeedColor(calculations.leedLevel)}`}>{calculations.leedLevel}</span>. 
                    Los materiales circulares aportan <span className="text-white font-bold">{calculations.leedMaterialPoints}</span> puntos extra.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-4 border border-teal-900/30">
              <div className="flex items-start gap-3">
                <Recycle className="w-5 h-5 text-teal-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">Carbono Embebido</p>
                  <p className="text-xs text-slate-400">
                    Evitas <span className="text-teal-400 font-bold">{calculations.carbonSaved.toFixed(0)} tCO₂</span> embebidas 
                    usando materiales con EPD verificado. Reduces <span className="text-white font-bold">{calculations.wasteReduced.toFixed(0)} t</span> de residuos.
                  </p>
                </div>
              </div>
            </div>

            {calculations.leedLevel === 'Gold' || calculations.leedLevel === 'Platinum' ? (
              <div className="bg-gradient-to-r from-yellow-900/30 to-amber-900/30 rounded-xl p-4 border border-yellow-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm font-bold text-yellow-300">Elegible Licitación Verde</span>
                </div>
                <p className="text-xs text-slate-300">
                  Tu nivel LEED {calculations.leedLevel} cumple los requisitos de contratación pública verde de la UE.
                </p>
              </div>
            ) : null}

            {circularPercent >= 50 && (
              <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-xl p-4 border border-emerald-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-bold text-emerald-300">Pasaporte Digital Activo</span>
                </div>
                <p className="text-xs text-slate-300">
                  Todos los materiales tienen trazabilidad blockchain con EPD verificado para auditorías futuras.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500">
              <FileText className="w-4 h-4 mr-2" />
              Descargar Informe LEED
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
