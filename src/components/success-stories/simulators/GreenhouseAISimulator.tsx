import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Thermometer, Droplets, Brain, Shield, FileText, CheckCircle, Award, AlertTriangle } from 'lucide-react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';

interface GreenhouseAISimulatorProps {
  onValuesChange?: (values: {
    automationLevel: number;
    externalHumidity: number;
    finalRisk: number;
    scoreGrade: string;
  }) => void;
}

export const GreenhouseAISimulator: React.FC<GreenhouseAISimulatorProps> = ({ onValuesChange }) => {
  const [automationLevel, setAutomationLevel] = useState(75);
  const [externalHumidity, setExternalHumidity] = useState(80);

  // Lógica de cálculo - Microclima 4.0
  const baseRisk = externalHumidity * 0.8; // Riesgo base por humedad externa
  const aiReduction = automationLevel * 0.9; // 90% max reduction con 100% automation
  const finalRisk = Math.max(0, baseRisk - aiReduction);
  const fungicideSaved = Math.round(automationLevel * 0.15 * 1200); // EUR ahorrados
  const scoreGrade = finalRisk < 5 ? 'AA' : finalRisk < 15 ? 'A' : finalRisk < 30 ? 'B' : 'C';
  const outbreakPrevented = finalRisk < 10;

  // Hash dinámico Pontus-X
  const pontusHash = `0x${((automationLevel * externalHumidity * 100) % 0xFFFFFF).toString(16).padStart(6, '0')}...${((finalRisk * 1000) % 0xFFFF).toString(16).padStart(4, '0')}`;

  // Datos para el ComposedChart - Temperatura vs Riesgo
  const chartData = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    const tempBase = 22 + Math.sin(i / 4) * 6;
    const temperature = tempBase + (automationLevel > 50 ? 0 : Math.random() * 4);
    const riskBase = (externalHumidity / 100) * (100 - automationLevel) * 0.5;
    const risk = Math.max(0, riskBase + Math.sin(i / 3) * 5);
    return {
      name: `${hour}:00`,
      temperature: Math.round(temperature * 10) / 10,
      risk: Math.round(risk * 10) / 10,
    };
  });

  useEffect(() => {
    onValuesChange?.({
      automationLevel,
      externalHumidity,
      finalRisk,
      scoreGrade,
    });
  }, [automationLevel, externalHumidity, finalRisk, scoreGrade, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Columna Izquierda - Simulador Principal */}
      <div className="lg:col-span-7 space-y-6">
        <Card className="overflow-hidden border-green-500/30 bg-gradient-to-br from-green-950/40 via-background to-teal-950/20">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <Brain className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Greenhouse AI</h3>
                  <p className="text-sm text-muted-foreground">Microclima 4.0 - Control Inteligente</p>
                </div>
              </div>
              <Badge variant="outline" className="font-mono text-xs border-green-500/50 text-green-300">
                {pontusHash}
              </Badge>
            </div>

            {/* Gráfico ComposedChart - Temperatura vs Riesgo */}
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" fontSize={10} interval={3} />
                  <YAxis yAxisId="left" stroke="#22C55E" fontSize={12} domain={[15, 35]} />
                  <YAxis yAxisId="right" orientation="right" stroke="#EF4444" fontSize={12} domain={[0, 50]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                    labelStyle={{ color: '#F3F4F6' }}
                  />
                  <Legend />
                  <ReferenceLine yAxisId="right" y={15} stroke="#EF4444" strokeDasharray="5 5" label={{ value: 'Umbral mildiu', fill: '#EF4444', fontSize: 10 }} />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="temperature"
                    name="Temperatura (°C)"
                    stroke="#22C55E"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="risk"
                    name="Riesgo Fitosanitario (%)"
                    fill="#14B8A6"
                    fillOpacity={0.6}
                    radius={[2, 2, 0, 0]}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Sliders */}
            <div className="space-y-6 mb-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Brain className="h-4 w-4 text-green-400" />
                    Nivel de Automatización IA
                  </label>
                  <span className="text-sm font-bold text-green-400">{automationLevel}%</span>
                </div>
                <Slider
                  value={[automationLevel]}
                  onValueChange={(v) => setAutomationLevel(v[0])}
                  min={0}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0% (manual)</span>
                  <span>100% (IA total)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-teal-400" />
                    Humedad Externa
                  </label>
                  <span className="text-sm font-bold text-teal-400">{externalHumidity}%</span>
                </div>
                <Slider
                  value={[externalHumidity]}
                  onValueChange={(v) => setExternalHumidity(v[0])}
                  min={40}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>40% (seco)</span>
                  <span>100% (lluvioso)</span>
                </div>
              </div>
            </div>

            {/* KPIs Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="h-4 w-4 text-green-400" />
                  <span className="text-xs text-muted-foreground">Score Fitosanitario</span>
                </div>
                <p className={`text-2xl font-bold ${scoreGrade === 'AA' ? 'text-emerald-400' : scoreGrade === 'A' ? 'text-green-400' : 'text-amber-400'}`}>
                  Grado {scoreGrade}
                </p>
                <p className="text-xs text-muted-foreground">Riesgo: {finalRisk.toFixed(1)}%</p>
              </div>
              <div className="bg-teal-500/10 rounded-xl p-4 border border-teal-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Thermometer className="h-4 w-4 text-teal-400" />
                  <span className="text-xs text-muted-foreground">Ahorro Fungicidas</span>
                </div>
                <p className="text-2xl font-bold text-teal-400">{fungicideSaved.toLocaleString()} €</p>
                <p className="text-xs text-muted-foreground">anual estimado</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Columna Derecha - Panel ARIA */}
      <div className="lg:col-span-5">
        <Card className="h-full bg-[#020617] border-green-500/30">
          <CardContent className="p-6 flex flex-col h-full">
            {/* Header ARIA */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div>
                <h4 className="font-semibold text-white">ARIA</h4>
                <p className="text-xs text-slate-400">Asesora de Invernaderos Inteligentes</p>
              </div>
            </div>

            {/* Insights dinámicos */}
            <div className="space-y-4 flex-1">
              <div className={`p-4 rounded-lg ${outbreakPrevented ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-amber-500/10 border-amber-500/20'} border`}>
                <div className="flex items-start gap-3">
                  {outbreakPrevented ? (
                    <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <p className="text-sm text-slate-200">
                      {outbreakPrevented 
                        ? `La IA ha gestionado la ventilación. Has evitado un brote de hongo sin químicos. Tu score fitosanitario ha subido a Grado ${scoreGrade}.`
                        : `Riesgo de mildiu detectado (${finalRisk.toFixed(1)}%). Aumenta la automatización IA para reducir el riesgo por debajo del 10%.`
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-teal-500/10 border border-teal-500/20">
                <div className="flex items-start gap-3">
                  <Brain className="h-5 w-5 text-teal-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-200">
                      Automatización al {automationLevel}%. Ahorro anual en fungicidas sistémicos: {fungicideSaved.toLocaleString()} EUROe. 
                      {automationLevel >= 80 && ' Control óptimo sin químicos alcanzado.'}
                    </p>
                  </div>
                </div>
              </div>

              {scoreGrade === 'AA' && (
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-slate-200">
                        🌿 Grado AA desbloqueado. Tu producción califica para el sello 
                        "Residuo Cero" de Carrefour y el programa Bio de Mercadona.
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
                <button className="flex items-center gap-1 text-xs text-green-400 hover:text-green-300 transition-colors">
                  <FileText className="h-3 w-3" />
                  Exportar Informe
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
