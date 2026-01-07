import React, { useState } from 'react';
import { Ship, Clock, Container, ArrowRight, Anchor } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface PortBCNSimulatorProps {
  onValuesChange?: (values: { teuVolume: number; digitalEfficiency: number; savings: number }) => void;
}

export const PortBCNSimulator = ({ onValuesChange }: PortBCNSimulatorProps) => {
  const [teuVolume, setTeuVolume] = useState(1500);
  const [digitalEfficiency, setDigitalEfficiency] = useState(80);
  
  const costPerTEU = 450; // €/TEU estancia
  const costSaved = teuVolume * costPerTEU * (digitalEfficiency / 100);
  const traditionalHours = 72;
  const pdHours = 6;
  const hoursSaved = traditionalHours - pdHours;

  React.useEffect(() => {
    onValuesChange?.({ teuVolume, digitalEfficiency, savings: costSaved });
  }, [teuVolume, digitalEfficiency, costSaved, onValuesChange]);

  return (
    <Card className="bg-gradient-to-br from-slate-900 to-cyan-950/40 border-cyan-500/20 shadow-2xl overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-cyan-400 flex items-center gap-2 text-sm font-bold">
          <Ship className="w-5 h-5" />
          CUSTOMS CLEARANCE ACCELERATOR - Despacho Digital
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Visual de Eficiencia */}
        <div className="relative bg-slate-900/80 rounded-2xl p-6 border border-cyan-900/30">
          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-cyan-900/50 flex items-center justify-center border-2 border-cyan-500">
                <Anchor className="text-cyan-400 w-8 h-8" />
              </div>
              <span className="text-xs text-cyan-300 font-bold">PUERTO BCN</span>
            </div>
            
            <div className="flex-1 mx-6 space-y-2">
              <div className="flex items-center gap-2">
                <Container className="w-4 h-4 text-slate-500" />
                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                    style={{ width: `${digitalEfficiency}%` }}
                  />
                </div>
              </div>
              <p className="text-center text-xs text-slate-400">Eficiencia Digital: <span className="text-cyan-400 font-bold">{digitalEfficiency}%</span></p>
            </div>
            
            <div className="text-center">
              <p className="text-3xl font-black text-white">{teuVolume}</p>
              <p className="text-[10px] text-slate-400 uppercase">TEUs/mes</p>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="flex justify-between bg-black/40 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-mono text-green-400">IDS_CHANNEL: ACTIVE</span>
            </div>
            <div className="flex gap-1">
              {[1,2,3,4,5].map(i => (
                <div 
                  key={i} 
                  className={`w-2 h-4 rounded-sm transition-all ${i <= Math.floor(digitalEfficiency/20) ? 'bg-cyan-500' : 'bg-slate-700'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Comparativa de Tiempos */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-cyan-900/20">
          <p className="text-xs text-slate-400 mb-3 uppercase font-bold">Tiempo de Despacho</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 w-24">Tradicional</span>
              <div className="flex-1 h-6 bg-slate-700 rounded-full overflow-hidden relative">
                <div className="absolute inset-y-0 left-0 w-full bg-slate-600 rounded-full" />
                <span className="absolute inset-0 flex items-center justify-center text-xs text-slate-300 font-bold">72h</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-cyan-400 w-24 font-bold">ProcureData</span>
              <div className="flex-1 h-6 bg-slate-700 rounded-full overflow-hidden relative">
                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" style={{ width: `${(pdHours/traditionalHours)*100}%` }} />
                <span className="absolute left-3 inset-y-0 flex items-center text-xs text-white font-bold">6h</span>
              </div>
            </div>
          </div>
          <Badge className="mt-3 bg-cyan-500/20 text-cyan-400">-{((1 - pdHours/traditionalHours) * 100).toFixed(0)}% Tiempo de Despacho</Badge>
        </div>

        {/* Sliders */}
        <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-cyan-900/20">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Volumen Mensual (TEUs)</span>
              <span className="font-bold text-cyan-400">{teuVolume.toLocaleString()}</span>
            </div>
            <Slider
              value={[teuVolume]}
              onValueChange={(v) => setTeuVolume(v[0])}
              min={100}
              max={5000}
              step={100}
              className="[&>span]:bg-cyan-600"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Eficiencia Digital</span>
              <span className="font-bold text-blue-400">{digitalEfficiency}%</span>
            </div>
            <Slider
              value={[digitalEfficiency]}
              onValueChange={(v) => setDigitalEfficiency(v[0])}
              min={0}
              max={100}
              step={5}
              className="[&>span]:bg-blue-600"
            />
          </div>
        </div>

        {/* KPI Principal */}
        <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 p-5 rounded-2xl border border-cyan-500/30">
          <p className="text-[10px] uppercase font-black text-cyan-300 mb-2">Ahorro en Tasas Portuarias</p>
          <p className="text-4xl font-black text-white">{costSaved.toLocaleString()} <span className="text-lg text-cyan-400">EUROe</span></p>
          <p className="text-xs text-slate-400 mt-1">Basado en 450€/TEU de estancia evitada</p>
        </div>
      </CardContent>
    </Card>
  );
};
