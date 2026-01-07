import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Citrus, CloudRain, TrendingDown, Shield, FileText, CheckCircle, Globe } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface CitrusCheckSimulatorProps {
  onValuesChange?: (values: {
    daysSinceApp: number;
    rainfallMm: number;
    currentLevel: number;
    babyFoodReady: boolean;
  }) => void;
}

export const CitrusCheckSimulator: React.FC<CitrusCheckSimulatorProps> = ({ onValuesChange }) => {
  const [daysSinceApp, setDaysSinceApp] = useState(45);
  const [rainfallMm, setRainfallMm] = useState(60);

  // Lógica de cálculo - LMR (Límites Máximos de Residuos)
  const baseResidueLevel = 0.5; // mg/kg inicial
  const degradation = daysSinceApp * 0.008 + rainfallMm * 0.001;
  const currentLevel = Math.max(0.005, baseResidueLevel - degradation);
  const euCompliant = currentLevel < 0.01;
  const usaCompliant = currentLevel < 0.02;
  const chinaCompliant = currentLevel < 0.05;
  const ukCompliant = currentLevel < 0.015;
  const babyFoodReady = currentLevel < 0.01;
  const profitBoost = babyFoodReady ? 30 : usaCompliant ? 15 : 0;

  // Hash dinámico Pontus-X
  const pontusHash = `0x${((daysSinceApp * rainfallMm * 1000) % 0xFFFFFF).toString(16).padStart(6, '0')}...${((currentLevel * 100000) % 0xFFFF).toString(16).padStart(4, '0')}`;

  // Datos para el RadarChart de cumplimiento por mercados
  const complianceData = [
    { market: 'UE', compliance: euCompliant ? 100 : Math.round((0.01 / currentLevel) * 100), limit: 0.01 },
    { market: 'USA', compliance: usaCompliant ? 100 : Math.round((0.02 / currentLevel) * 100), limit: 0.02 },
    { market: 'UK', compliance: ukCompliant ? 100 : Math.round((0.015 / currentLevel) * 100), limit: 0.015 },
    { market: 'China', compliance: chinaCompliant ? 100 : Math.round((0.05 / currentLevel) * 100), limit: 0.05 },
    { market: 'Baby Food', compliance: babyFoodReady ? 100 : Math.round((0.01 / currentLevel) * 100), limit: 0.01 },
  ];

  useEffect(() => {
    onValuesChange?.({
      daysSinceApp,
      rainfallMm,
      currentLevel,
      babyFoodReady,
    });
  }, [daysSinceApp, rainfallMm, currentLevel, babyFoodReady, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Columna Izquierda - Simulador Principal */}
      <div className="lg:col-span-7 space-y-6">
        <Card className="overflow-hidden border-yellow-500/30 bg-gradient-to-br from-yellow-950/40 via-background to-orange-950/20">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/20">
                  <Citrus className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Citrus Check</h3>
                  <p className="text-sm text-muted-foreground">Límites de Residuos LMR - 150 países</p>
                </div>
              </div>
              <Badge variant="outline" className="font-mono text-xs border-yellow-500/50 text-yellow-300">
                {pontusHash}
              </Badge>
            </div>

            {/* Gráfico RadarChart - Cumplimiento por mercados */}
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={complianceData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="market" stroke="#9CA3AF" fontSize={12} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#9CA3AF" fontSize={10} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                    labelStyle={{ color: '#F3F4F6' }}
                    formatter={(value: number) => [`${value}%`, 'Cumplimiento']}
                  />
                  <Radar
                    name="Cumplimiento LMR"
                    dataKey="compliance"
                    stroke="#EAB308"
                    fill="#EAB308"
                    fillOpacity={0.5}
                    strokeWidth={2}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Sliders */}
            <div className="space-y-6 mb-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-yellow-400" />
                    Días desde Aplicación
                  </label>
                  <span className="text-sm font-bold text-yellow-400">{daysSinceApp} días</span>
                </div>
                <Slider
                  value={[daysSinceApp]}
                  onValueChange={(v) => setDaysSinceApp(v[0])}
                  min={0}
                  max={90}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0 días (reciente)</span>
                  <span>90 días</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <CloudRain className="h-4 w-4 text-orange-400" />
                    Precipitación Acumulada
                  </label>
                  <span className="text-sm font-bold text-orange-400">{rainfallMm} mm</span>
                </div>
                <Slider
                  value={[rainfallMm]}
                  onValueChange={(v) => setRainfallMm(v[0])}
                  min={0}
                  max={200}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0 mm (seco)</span>
                  <span>200 mm</span>
                </div>
              </div>
            </div>

            {/* KPIs Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Citrus className="h-4 w-4 text-yellow-400" />
                  <span className="text-xs text-muted-foreground">Nivel Residuo</span>
                </div>
                <p className={`text-2xl font-bold ${babyFoodReady ? 'text-emerald-400' : 'text-yellow-400'}`}>
                  {currentLevel.toFixed(3)} mg/kg
                </p>
                <p className="text-xs text-muted-foreground">{babyFoodReady ? 'Baby Food Ready' : 'Verificar mercado'}</p>
              </div>
              <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Globe className="h-4 w-4 text-orange-400" />
                  <span className="text-xs text-muted-foreground">Boost Rentabilidad</span>
                </div>
                <p className="text-2xl font-bold text-orange-400">+{profitBoost}%</p>
                <p className="text-xs text-muted-foreground">por lote certificado</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Columna Derecha - Panel ARIA */}
      <div className="lg:col-span-5">
        <Card className="h-full bg-[#020617] border-yellow-500/30">
          <CardContent className="p-6 flex flex-col h-full">
            {/* Header ARIA */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div>
                <h4 className="font-semibold text-white">ARIA</h4>
                <p className="text-xs text-slate-400">Asesora de Exportación Cítrica</p>
              </div>
            </div>

            {/* Insights dinámicos */}
            <div className="space-y-4 flex-1">
              <div className={`p-4 rounded-lg ${babyFoodReady ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-yellow-500/10 border-yellow-500/20'} border`}>
                <div className="flex items-start gap-3">
                  <CheckCircle className={`h-5 w-5 ${babyFoodReady ? 'text-emerald-400' : 'text-yellow-400'} mt-0.5 flex-shrink-0`} />
                  <div>
                    <p className="text-sm text-slate-200">
                      Tus niveles están por debajo de {currentLevel.toFixed(3)} mg/kg. 
                      {babyFoodReady 
                        ? ` He actualizado tu Pasaporte para el sector Baby Food, incrementando tu rentabilidad por lote en un ${profitBoost}%.`
                        : ` Espera ${Math.max(0, Math.ceil((0.01 - currentLevel) / 0.008))} días más para calificar Baby Food.`
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-200">
                      Mercados habilitados: {[euCompliant && 'UE', usaCompliant && 'USA', ukCompliant && 'UK', chinaCompliant && 'China'].filter(Boolean).join(', ') || 'Ninguno aún'}.
                      {!euCompliant && ' Aumenta los días de carencia para desbloquear más destinos.'}
                    </p>
                  </div>
                </div>
              </div>

              {babyFoodReady && (
                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-slate-200">
                        🍋 Certificación Baby Food desbloqueada. Tu cítrico ahora puede 
                        exportarse a Nestlé, Hero Baby y HiPP con márgenes premium del +30%.
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
                <button className="flex items-center gap-1 text-xs text-yellow-400 hover:text-yellow-300 transition-colors">
                  <FileText className="h-3 w-3" />
                  Exportar Pasaporte
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
