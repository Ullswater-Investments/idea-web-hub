import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Timer, Truck, TrendingUp, Shield, FileText, CheckCircle, Package, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';

interface TropicalFlashSimulatorProps {
  onValuesChange?: (values: {
    preClearanceLevel: number;
    transitDays: number;
    finalShelfLife: number;
    marginBoost: number;
  }) => void;
}

export const TropicalFlashSimulator: React.FC<TropicalFlashSimulatorProps> = ({ onValuesChange }) => {
  const [preClearanceLevel, setPreClearanceLevel] = useState(80);
  const [transitDays, setTransitDays] = useState(6);

  // Lógica de cálculo - Aduana Express
  const baseShelfLife = 14; // días de vida base
  const transitLoss = transitDays * 0.8; // días perdidos en tránsito
  const clearanceGain = (preClearanceLevel / 100) * 3; // hasta 3 días ganados
  const finalShelfLife = Math.max(1, baseShelfLife - transitLoss + clearanceGain);
  const marginBoost = clearanceGain >= 2 ? 8 : clearanceGain >= 1 ? 4 : 0;
  const wastageReduction = Math.round(clearanceGain * 12); // % merma evitada
  const expressEnabled = preClearanceLevel >= 70;

  // Hash dinámico Pontus-X
  const pontusHash = `0x${((preClearanceLevel * transitDays * 1000) % 0xFFFFFF).toString(16).padStart(6, '0')}...${((finalShelfLife * 100) % 0xFFFF).toString(16).padStart(4, '0')}`;

  // Datos para el BarChart comparativo
  const comparisonData = [
    { 
      method: 'Tradicional', 
      shelfLife: Math.max(1, baseShelfLife - transitLoss), 
      color: '#F97316' 
    },
    { 
      method: 'ProcureData', 
      shelfLife: finalShelfLife, 
      color: '#22C55E' 
    },
  ];

  useEffect(() => {
    onValuesChange?.({
      preClearanceLevel,
      transitDays,
      finalShelfLife,
      marginBoost,
    });
  }, [preClearanceLevel, transitDays, finalShelfLife, marginBoost, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Columna Izquierda - Simulador Principal */}
      <div className="lg:col-span-7 space-y-6">
        <Card className="overflow-hidden border-orange-500/30 bg-gradient-to-br from-orange-950/40 via-background to-yellow-950/20">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/20">
                  <Timer className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Tropical Flash</h3>
                  <p className="text-sm text-muted-foreground">Aduana Express - Frescura Máxima</p>
                </div>
              </div>
              <Badge variant="outline" className="font-mono text-xs border-orange-500/50 text-orange-300">
                {pontusHash}
              </Badge>
            </div>

            {/* Gráfico BarChart comparativo */}
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" domain={[0, 16]} stroke="#9CA3AF" fontSize={12} label={{ value: 'Días de frescura en tienda', position: 'bottom', fill: '#9CA3AF' }} />
                  <YAxis type="category" dataKey="method" stroke="#9CA3AF" fontSize={12} width={100} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                    formatter={(value: number) => [`${value.toFixed(1)} días`, 'Vida útil']}
                  />
                  <Bar dataKey="shelfLife" radius={[0, 8, 8, 0]} barSize={40}>
                    {comparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Visual de ganancia */}
            <div className="bg-gradient-to-r from-orange-500/10 to-green-500/10 rounded-xl p-4 mb-6 border border-orange-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-400" />
                  <span className="text-sm font-medium">Días de frescura ganados:</span>
                </div>
                <span className="text-2xl font-bold text-green-400">+{clearanceGain.toFixed(1)} días</span>
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-6 mb-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Package className="h-4 w-4 text-orange-400" />
                    Pre-validación Digital
                  </label>
                  <span className="text-sm font-bold text-orange-400">{preClearanceLevel}%</span>
                </div>
                <Slider
                  value={[preClearanceLevel]}
                  onValueChange={(v) => setPreClearanceLevel(v[0])}
                  min={0}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0% (sin pre-validar)</span>
                  <span>100% (IDS completo)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Truck className="h-4 w-4 text-yellow-400" />
                    Días de Tránsito
                  </label>
                  <span className="text-sm font-bold text-yellow-400">{transitDays} días</span>
                </div>
                <Slider
                  value={[transitDays]}
                  onValueChange={(v) => setTransitDays(v[0])}
                  min={3}
                  max={12}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>3 días (aéreo)</span>
                  <span>12 días (marítimo)</span>
                </div>
              </div>
            </div>

            {/* KPIs Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Timer className="h-4 w-4 text-orange-400" />
                  <span className="text-xs text-muted-foreground">Vida Útil Final</span>
                </div>
                <p className="text-2xl font-bold text-orange-400">{finalShelfLife.toFixed(1)} días</p>
                <p className="text-xs text-muted-foreground">en lineal de tienda</p>
              </div>
              <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-yellow-400" />
                  <span className="text-xs text-muted-foreground">Boost de Margen</span>
                </div>
                <p className="text-2xl font-bold text-yellow-400">+{marginBoost}%</p>
                <p className="text-xs text-muted-foreground">por reducción mermas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Columna Derecha - Panel ARIA */}
      <div className="lg:col-span-5">
        <Card className="h-full bg-[#020617] border-orange-500/30">
          <CardContent className="p-6 flex flex-col h-full">
            {/* Header ARIA */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div>
                <h4 className="font-semibold text-white">ARIA</h4>
                <p className="text-xs text-slate-400">Asesora de Logística Tropical</p>
              </div>
            </div>

            {/* Insights dinámicos */}
            <div className="space-y-4 flex-1">
              <div className={`p-4 rounded-lg ${expressEnabled ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-orange-500/10 border-orange-500/20'} border`}>
                <div className="flex items-start gap-3">
                  <CheckCircle className={`h-5 w-5 ${expressEnabled ? 'text-emerald-400' : 'text-orange-400'} mt-0.5 flex-shrink-0`} />
                  <div>
                    <p className="text-sm text-slate-200">
                      Al enviar el dossier 48h antes vía IDS, has ganado {clearanceGain.toFixed(1)} días de frescura comercial. 
                      Esto supone un {marginBoost}% de margen extra por reducción de mermas.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-200">
                      Tránsito de {transitDays} días. Merma evitada: {wastageReduction}%. 
                      {transitDays <= 5 
                        ? ' Ruta aérea óptima para máxima frescura.' 
                        : ' Considera transporte aéreo para productos ultra-frescos.'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {marginBoost >= 8 && (
                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-slate-200">
                        🥭 Modo Express activado. Tu mango/papaya ahora llega con +{clearanceGain.toFixed(0)} días 
                        de vida útil, desbloqueando contratos con Lidl Fresh y Amazon Fresh.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Shield className="h-3 w-3" />
                  <span>Pontus-X: {pontusHash}</span>
                </div>
                <button className="flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 transition-colors">
                  <FileText className="h-3 w-3" />
                  Exportar Dossier
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
