import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Shirt, Layers, Clock, Shield, FileText, CheckCircle, Award, Package } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface BioCottonTraceSimulatorProps {
  onValuesChange?: (values: {
    tonsCotton: number;
    auditLevel: number;
    timeSaved: number;
    balesWithDID: number;
  }) => void;
}

export const BioCottonTraceSimulator: React.FC<BioCottonTraceSimulatorProps> = ({ onValuesChange }) => {
  const [tonsCotton, setTonsCotton] = useState(250);
  const [auditLevel, setAuditLevel] = useState(2);

  // Lógica de cálculo - Cadena de custodia GOTS/GRS
  const baseAuditDays = 5;
  const digitalAuditHours = 2 + (auditLevel * 0.5);
  const timeSaved = (baseAuditDays * 24) - digitalAuditHours;
  const balesWithDID = Math.floor(tonsCotton * 4.5); // 4.5 balas/ton
  const chainVisibility = auditLevel >= 3 ? 100 : auditLevel * 33;
  const gotsCertified = auditLevel >= 2 && tonsCotton >= 100;

  // Hash dinámico Pontus-X
  const pontusHash = `0x${((tonsCotton * auditLevel * 1000) % 0xFFFFFF).toString(16).padStart(6, '0')}...${((balesWithDID) % 0xFFFF).toString(16).padStart(4, '0')}`;

  // Datos para el BarChart escalonado - Cadena de Custodia
  const custodyChainData = [
    { stage: 'Semilla', verified: auditLevel >= 1 ? 100 : 0, label: 'Origen Orgánico' },
    { stage: 'Desmote', verified: auditLevel >= 1 ? 95 : 0, label: 'Procesamiento' },
    { stage: 'Hilado', verified: auditLevel >= 2 ? 90 : 0, label: 'Transformación' },
    { stage: 'Bala', verified: auditLevel >= 3 ? 100 : 0, label: 'Producto Final' },
  ];

  const tierLabels = ['Tier 1 (Básico)', 'Tier 2 (Intermedio)', 'Tier 3 (Completo)'];

  useEffect(() => {
    onValuesChange?.({
      tonsCotton,
      auditLevel,
      timeSaved,
      balesWithDID,
    });
  }, [tonsCotton, auditLevel, timeSaved, balesWithDID, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Columna Izquierda - Simulador Principal */}
      <div className="lg:col-span-7 space-y-6">
        <Card className="overflow-hidden border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-background to-violet-950/20">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/20">
                  <Shirt className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Bio-Cotton Trace</h3>
                  <p className="text-sm text-muted-foreground">Certificación GOTS/GRS Digital</p>
                </div>
              </div>
              <Badge variant="outline" className="font-mono text-xs border-emerald-500/50 text-emerald-300">
                {pontusHash}
              </Badge>
            </div>

            {/* Gráfico BarChart - Cadena de Custodia Verificada */}
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={custodyChainData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" domain={[0, 100]} stroke="#9CA3AF" fontSize={12} />
                  <YAxis type="category" dataKey="stage" stroke="#9CA3AF" fontSize={12} width={80} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                    formatter={(value: number, name: string, props: any) => [`${value}%`, props.payload.label]}
                  />
                  <Bar dataKey="verified" radius={[0, 4, 4, 0]}>
                    {custodyChainData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.verified > 0 ? '#10B981' : '#374151'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Sliders */}
            <div className="space-y-6 mb-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Package className="h-4 w-4 text-emerald-400" />
                    Producción de Algodón
                  </label>
                  <span className="text-sm font-bold text-emerald-400">{tonsCotton} toneladas</span>
                </div>
                <Slider
                  value={[tonsCotton]}
                  onValueChange={(v) => setTonsCotton(v[0])}
                  min={10}
                  max={1000}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>10 toneladas</span>
                  <span>1.000 toneladas</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Layers className="h-4 w-4 text-violet-400" />
                    Nivel de Auditoría
                  </label>
                  <span className="text-sm font-bold text-violet-400">{tierLabels[auditLevel - 1]}</span>
                </div>
                <Slider
                  value={[auditLevel]}
                  onValueChange={(v) => setAuditLevel(v[0])}
                  min={1}
                  max={3}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Tier 1</span>
                  <span>Tier 3</span>
                </div>
              </div>
            </div>

            {/* KPIs Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Package className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs text-muted-foreground">Balas con DID</span>
                </div>
                <p className="text-2xl font-bold text-emerald-400">{balesWithDID.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Identidad Digital Única</p>
              </div>
              <div className="bg-violet-500/10 rounded-xl p-4 border border-violet-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-4 w-4 text-violet-400" />
                  <span className="text-xs text-muted-foreground">Tiempo Ahorrado</span>
                </div>
                <p className="text-2xl font-bold text-violet-400">{timeSaved.toFixed(0)}h</p>
                <p className="text-xs text-muted-foreground">vs. auditoría tradicional</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Columna Derecha - Panel ARIA */}
      <div className="lg:col-span-5">
        <Card className="h-full bg-[#020617] border-emerald-500/30">
          <CardContent className="p-6 flex flex-col h-full">
            {/* Header ARIA */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div>
                <h4 className="font-semibold text-white">ARIA</h4>
                <p className="text-xs text-slate-400">Asesora de Moda Sostenible</p>
              </div>
            </div>

            {/* Insights dinámicos */}
            <div className="space-y-4 flex-1">
              <div className={`p-4 rounded-lg ${gotsCertified ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-violet-500/10 border-violet-500/20'} border`}>
                <div className="flex items-start gap-3">
                  <CheckCircle className={`h-5 w-5 ${gotsCertified ? 'text-emerald-400' : 'text-violet-400'} mt-0.5 flex-shrink-0`} />
                  <div>
                    <p className="text-sm text-slate-200">
                      Cada bala de algodón tiene un DID único. Has reducido el tiempo de auditoría GOTS 
                      de 5 días a {digitalAuditHours.toFixed(1)} horas mediante el acceso soberano a datos de origen.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-start gap-3">
                  <Layers className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-200">
                      Visibilidad de cadena: {chainVisibility}%. 
                      {auditLevel >= 3 
                        ? ' Trazabilidad completa desde semilla hasta bala.' 
                        : ` Sube a Tier 3 para cubrir el 100% de la cadena de custodia.`
                      }
                    </p>
                  </div>
                </div>
              </div>

              {gotsCertified && (
                <div className="p-4 rounded-lg bg-violet-500/10 border border-violet-500/20">
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-violet-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-slate-200">
                        👕 Certificación GOTS verificable en blockchain. Tu algodón orgánico 
                        ahora es elegible para marcas como Patagonia, H&M Conscious y Zara Join Life.
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
                <button className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
                  <FileText className="h-3 w-3" />
                  Exportar GOTS
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
