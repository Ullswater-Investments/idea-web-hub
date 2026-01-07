import React, { useState } from 'react';
import { HeartPulse, ShieldAlert, Activity, Stethoscope, Lock } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BioMedSimulatorProps {
  onValuesChange?: (values: { numDevices: number; predictivePower: number; savings: number }) => void;
}

export const BioMedSimulator = ({ onValuesChange }: BioMedSimulatorProps) => {
  const [numDevices, setNumDevices] = useState(20);
  const [predictivePower, setPredictivePower] = useState(75);
  
  const costPerDay = 15000; // €/día parada
  const savedAmount = numDevices * costPerDay * (predictivePower / 100) * 0.4;
  const humanHoursSaved = numDevices * 120;
  const fteEquivalent = (humanHoursSaved / 1760).toFixed(1);

  React.useEffect(() => {
    onValuesChange?.({ numDevices, predictivePower, savings: savedAmount });
  }, [numDevices, predictivePower, savedAmount, onValuesChange]);

  // Generate heartbeat animation points
  const heartbeatPath = "M 0,50 L 20,50 L 25,30 L 30,70 L 35,50 L 55,50 L 60,20 L 65,80 L 70,50 L 90,50 L 95,40 L 100,50";

  return (
    <Card className="bg-gradient-to-br from-slate-900 to-rose-950/30 border-rose-500/20 shadow-2xl overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-rose-400 flex items-center gap-2 text-sm font-bold">
          <Stethoscope className="w-5 h-5" />
          MEDICAL DEVICE INTEGRITY MONITOR - MDR Compliant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Heartbeat Monitor Visual */}
        <div className="relative bg-slate-950 rounded-2xl p-6 border border-rose-900/30 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0" />
                  <stop offset="50%" stopColor="#ef4444" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path 
                d={heartbeatPath} 
                fill="none" 
                stroke="url(#heartGradient)" 
                strokeWidth="2"
                className="animate-pulse"
              />
            </svg>
          </div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <HeartPulse className="w-16 h-16 text-rose-500 animate-pulse" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <Lock className="w-2 h-2 text-white" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-black text-white">{numDevices}</p>
                <p className="text-xs text-slate-400">Equipos en Red</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-green-950/50 px-4 py-2 rounded-lg border border-green-500/30">
              <Activity className="w-4 h-4 text-green-400" />
              <div>
                <p className="text-[10px] font-mono text-green-400">MDR_STATUS</p>
                <p className="text-sm font-bold text-green-300">FULLY_COMPLIANT</p>
              </div>
            </div>
          </div>
        </div>

        {/* KPIs Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-rose-950/40 p-4 rounded-xl border border-rose-800/30 text-center">
            <p className="text-[10px] uppercase font-black text-rose-400 mb-1">Predictivo</p>
            <p className="text-2xl font-black text-white">{predictivePower}%</p>
            <p className="text-[10px] text-slate-400">Cobertura</p>
          </div>
          <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-800/30 text-center">
            <p className="text-[10px] uppercase font-black text-emerald-400 mb-1">FTEs Liberados</p>
            <p className="text-2xl font-black text-white">{fteEquivalent}</p>
            <p className="text-[10px] text-slate-400">Personas</p>
          </div>
          <div className="bg-blue-950/40 p-4 rounded-xl border border-blue-800/30 text-center">
            <p className="text-[10px] uppercase font-black text-blue-400 mb-1">Riesgo MDR</p>
            <p className="text-2xl font-black text-white">0%</p>
            <p className="text-[10px] text-slate-400">Certificado</p>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-rose-900/20">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Equipos Médicos en Red</span>
              <span className="font-bold text-rose-400">{numDevices}</span>
            </div>
            <Slider
              value={[numDevices]}
              onValueChange={(v) => setNumDevices(v[0])}
              min={5}
              max={100}
              step={5}
              className="[&>span]:bg-rose-600"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Nivel Mantenimiento Predictivo</span>
              <span className="font-bold text-emerald-400">{predictivePower}%</span>
            </div>
            <Slider
              value={[predictivePower]}
              onValueChange={(v) => setPredictivePower(v[0])}
              min={0}
              max={100}
              step={5}
              className="[&>span]:bg-emerald-600"
            />
          </div>
        </div>

        {/* Total Savings */}
        <div className="bg-gradient-to-r from-rose-900/50 to-pink-900/50 p-5 rounded-2xl border border-rose-500/30">
          <p className="text-[10px] uppercase font-black text-rose-300 mb-2">Ahorro en Paradas de Línea</p>
          <p className="text-4xl font-black text-white">{savedAmount.toLocaleString()} <span className="text-lg text-rose-400">EUROe</span></p>
          <div className="flex gap-2 mt-2">
            <Badge className="bg-rose-500/20 text-rose-300">-30% Fallos Críticos</Badge>
            <Badge className="bg-green-500/20 text-green-300">100% GDPR</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
