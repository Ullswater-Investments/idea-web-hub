import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Building2, Sun, Leaf, Shield, FileText, CheckCircle, Award, MapPin } from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface UrbanHydroSimulatorProps {
  onValuesChange?: (values: {
    distanceToConsumer: number;
    renewableRatio: number;
    premiumPrice: number;
    circularScore: number;
  }) => void;
}

export const UrbanHydroSimulator: React.FC<UrbanHydroSimulatorProps> = ({ onValuesChange }) => {
  const [distanceToConsumer, setDistanceToConsumer] = useState(3);
  const [renewableRatio, setRenewableRatio] = useState(95);

  // Lógica de cálculo - Granjas Verticales Km0
  const km0Certified = distanceToConsumer <= 5;
  const logisticFootprint = distanceToConsumer * 0.05; // kgCO2/km
  const renewableBonus = renewableRatio >= 100 ? 60 : renewableRatio * 0.5;
  const premiumPrice = km0Certified && renewableRatio >= 95 ? renewableBonus : renewableRatio * 0.3;
  const circularScore = Math.min(100, (100 - distanceToConsumer) * 0.3 + renewableRatio * 0.7);
  const solarLinked = renewableRatio >= 95;

  // Hash dinámico Pontus-X
  const pontusHash = `0x${((distanceToConsumer * renewableRatio * 1000) % 0xFFFFFF).toString(16).padStart(6, '0')}...${((circularScore * 100) % 0xFFFF).toString(16).padStart(4, '0')}`;

  // Datos para el RadialBarChart
  const circularData = [
    { name: 'Proximidad', value: Math.max(0, 100 - distanceToConsumer * 2), fill: '#84CC16' },
    { name: 'Renovable', value: renewableRatio, fill: '#22D3EE' },
    { name: 'Circular', value: circularScore, fill: '#10B981' },
  ];

  useEffect(() => {
    onValuesChange?.({
      distanceToConsumer,
      renewableRatio,
      premiumPrice,
      circularScore,
    });
  }, [distanceToConsumer, renewableRatio, premiumPrice, circularScore, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Columna Izquierda - Simulador Principal */}
      <div className="lg:col-span-7 space-y-6">
        <Card className="overflow-hidden border-lime-500/30 bg-gradient-to-br from-lime-950/40 via-background to-cyan-950/20">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-lime-500/20">
                  <Building2 className="h-6 w-6 text-lime-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Urban Hydro</h3>
                  <p className="text-sm text-muted-foreground">Granjas Verticales - Km 0 Real</p>
                </div>
              </div>
              <Badge variant="outline" className="font-mono text-xs border-lime-500/50 text-lime-300">
                {pontusHash}
              </Badge>
            </div>

            {/* Gráfico RadialBarChart - Economía Circular */}
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart 
                  cx="50%" 
                  cy="50%" 
                  innerRadius="20%" 
                  outerRadius="90%" 
                  data={circularData} 
                  startAngle={180} 
                  endAngle={0}
                >
                  <RadialBar
                    background
                    dataKey="value"
                    cornerRadius={10}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                    formatter={(value: number) => [`${value.toFixed(0)}%`, '']}
                  />
                  <Legend 
                    iconSize={10} 
                    layout="horizontal" 
                    verticalAlign="bottom"
                    wrapperStyle={{ fontSize: '12px' }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>

            {/* Badge Km0 */}
            {km0Certified && (
              <div className="bg-gradient-to-r from-lime-500/20 to-cyan-500/20 rounded-xl p-4 mb-6 border border-lime-500/30 flex items-center justify-center gap-3">
                <MapPin className="h-6 w-6 text-lime-400" />
                <span className="text-lg font-bold text-lime-400">Certificado Km 0 Real</span>
                <CheckCircle className="h-5 w-5 text-emerald-400" />
              </div>
            )}

            {/* Sliders */}
            <div className="space-y-6 mb-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-lime-400" />
                    Distancia al Consumidor
                  </label>
                  <span className="text-sm font-bold text-lime-400">{distanceToConsumer} km</span>
                </div>
                <Slider
                  value={[distanceToConsumer]}
                  onValueChange={(v) => setDistanceToConsumer(v[0])}
                  min={0}
                  max={50}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0 km (in-situ)</span>
                  <span>50 km</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Sun className="h-4 w-4 text-cyan-400" />
                    Energía Renovable LED
                  </label>
                  <span className="text-sm font-bold text-cyan-400">{renewableRatio}%</span>
                </div>
                <Slider
                  value={[renewableRatio]}
                  onValueChange={(v) => setRenewableRatio(v[0])}
                  min={0}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0% (red eléctrica)</span>
                  <span>100% (solar/eólica)</span>
                </div>
              </div>
            </div>

            {/* KPIs Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-lime-500/10 rounded-xl p-4 border border-lime-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Leaf className="h-4 w-4 text-lime-400" />
                  <span className="text-xs text-muted-foreground">Score Circular</span>
                </div>
                <p className="text-2xl font-bold text-lime-400">{circularScore.toFixed(0)}%</p>
                <p className="text-xs text-muted-foreground">Economía circular</p>
              </div>
              <div className="bg-cyan-500/10 rounded-xl p-4 border border-cyan-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="h-4 w-4 text-cyan-400" />
                  <span className="text-xs text-muted-foreground">Precio Premium</span>
                </div>
                <p className="text-2xl font-bold text-cyan-400">+{premiumPrice.toFixed(0)}%</p>
                <p className="text-xs text-muted-foreground">vs. producto estándar</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Columna Derecha - Panel ARIA */}
      <div className="lg:col-span-5">
        <Card className="h-full bg-[#020617] border-lime-500/30">
          <CardContent className="p-6 flex flex-col h-full">
            {/* Header ARIA */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div>
                <h4 className="font-semibold text-white">ARIA</h4>
                <p className="text-xs text-slate-400">Asesora de Agricultura Urbana</p>
              </div>
            </div>

            {/* Insights dinámicos */}
            <div className="space-y-4 flex-1">
              <div className={`p-4 rounded-lg ${km0Certified ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-lime-500/10 border-lime-500/20'} border`}>
                <div className="flex items-start gap-3">
                  <CheckCircle className={`h-5 w-5 ${km0Certified ? 'text-emerald-400' : 'text-lime-400'} mt-0.5 flex-shrink-0`} />
                  <div>
                    <p className="text-sm text-slate-200">
                      {km0Certified 
                        ? `Producción certificada como Km 0 Real. Tu pasaporte digital vincula el consumo LED con el origen solar, justificando un precio premium del ${premiumPrice.toFixed(0)}%.`
                        : `A ${distanceToConsumer} km del consumidor. Reduce a menos de 5 km para certificar Km 0 Real.`
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                <div className="flex items-start gap-3">
                  <Sun className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-200">
                      Energía LED: {renewableRatio}% renovable. Huella logística: {logisticFootprint.toFixed(2)} kgCO2/kg producto. 
                      {solarLinked && ' Origen solar verificado en blockchain.'}
                    </p>
                  </div>
                </div>
              </div>

              {km0Certified && solarLinked && (
                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-slate-200">
                        🏙️ Triple certificación desbloqueada: Km 0 + Solar + Vertical. 
                        Elegible para el programa "Urban Farm" de El Corte Inglés Gourmet.
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
                <button className="flex items-center gap-1 text-xs text-lime-400 hover:text-lime-300 transition-colors">
                  <FileText className="h-3 w-3" />
                  Exportar Certificado
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
