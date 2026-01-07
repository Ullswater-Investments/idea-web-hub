import React, { useState } from 'react';
import { Users, TrendingUp, Heart, Award, Building2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SocialHubSimulatorProps {
  onValuesChange?: (values: { ethicalSpend: number; insertionRate: number; socialValue: number }) => void;
}

export const SocialHubSimulator = ({ onValuesChange }: SocialHubSimulatorProps) => {
  const [ethicalSpend, setEthicalSpend] = useState(100000);
  const [insertionRate, setInsertionRate] = useState(15);
  
  const sroiMultiplier = 3.8;
  const socialValue = ethicalSpend * sroiMultiplier;
  const publicSaving = ethicalSpend * 0.45;
  const jobsCreated = Math.floor(ethicalSpend / 15000);

  React.useEffect(() => {
    onValuesChange?.({ ethicalSpend, insertionRate, socialValue });
  }, [ethicalSpend, insertionRate, socialValue, onValuesChange]);

  return (
    <Card className="bg-gradient-to-br from-violet-950/40 to-purple-950/30 border-violet-500/20 shadow-2xl overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-violet-400 flex items-center gap-2 text-sm font-bold">
          <Heart className="w-5 h-5" />
          SROI IMPACT CALCULATOR - Valor Social Certificado
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Visual Header */}
        <div className="bg-gradient-to-r from-violet-900/50 to-purple-900/50 rounded-2xl p-5 border border-violet-500/20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="w-8 h-8 text-violet-400" />
            <span className="text-xl font-black text-white uppercase tracking-wider">Multiplicador de Impacto SROI</span>
          </div>
          
          {/* SROI Visual */}
          <div className="flex items-center justify-center gap-6 py-4">
            <div className="text-center">
              <p className="text-4xl font-black text-white">1</p>
              <p className="text-xs text-violet-300">€ Invertido</p>
            </div>
            <TrendingUp className="w-8 h-8 text-violet-400 animate-pulse" />
            <div className="text-center">
              <p className="text-4xl font-black text-violet-400">{sroiMultiplier}</p>
              <p className="text-xs text-violet-300">€ Valor Social</p>
            </div>
          </div>
        </div>

        {/* Impact Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-violet-950/40 p-4 rounded-xl border border-violet-800/30 text-center">
            <Users className="w-6 h-6 text-violet-400 mx-auto mb-2" />
            <p className="text-2xl font-black text-white">{jobsCreated}</p>
            <p className="text-[10px] text-violet-300 uppercase">Empleos Inclusivos</p>
          </div>
          <div className="bg-purple-950/40 p-4 rounded-xl border border-purple-800/30 text-center">
            <TrendingUp className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-black text-white">1:{sroiMultiplier}</p>
            <p className="text-[10px] text-purple-300 uppercase">Ratio SROI</p>
          </div>
          <div className="bg-fuchsia-950/40 p-4 rounded-xl border border-fuchsia-800/30 text-center">
            <Building2 className="w-6 h-6 text-fuchsia-400 mx-auto mb-2" />
            <p className="text-2xl font-black text-white">99%</p>
            <p className="text-[10px] text-fuchsia-300 uppercase">Ética Verificada</p>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-violet-900/20">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Inversión Ética Anual</span>
              <span className="font-bold text-violet-400">{ethicalSpend.toLocaleString()} €</span>
            </div>
            <Slider
              value={[ethicalSpend]}
              onValueChange={(v) => setEthicalSpend(v[0])}
              min={10000}
              max={1000000}
              step={10000}
              className="[&>span]:bg-violet-600"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Tasa de Inserción Laboral</span>
              <span className="font-bold text-purple-400">{insertionRate}%</span>
            </div>
            <Slider
              value={[insertionRate]}
              onValueChange={(v) => setInsertionRate(v[0])}
              min={1}
              max={50}
              step={1}
              className="[&>span]:bg-purple-600"
            />
          </div>
        </div>

        {/* Public Savings */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-800/30">
            <p className="text-[10px] uppercase font-black text-emerald-400 mb-1">Ahorro Público</p>
            <p className="text-xl font-black text-white">{publicSaving.toLocaleString()}</p>
            <p className="text-xs text-slate-400">EUROe en subsidios</p>
          </div>
          <div className="bg-blue-950/40 p-4 rounded-xl border border-blue-800/30">
            <p className="text-[10px] uppercase font-black text-blue-400 mb-1">Licitaciones</p>
            <p className="text-xl font-black text-white">+191%</p>
            <p className="text-xs text-slate-400">Adjudicaciones</p>
          </div>
        </div>

        {/* Total Social Value */}
        <div className="bg-gradient-to-r from-violet-900/50 to-fuchsia-900/50 p-5 rounded-2xl border border-violet-500/30">
          <p className="text-[10px] uppercase font-black text-violet-300 mb-2">Valor Social Total Generado</p>
          <p className="text-4xl font-black text-white">{socialValue.toLocaleString()} <span className="text-lg text-violet-400">EUROe</span></p>
          <Badge className="mt-2 bg-green-500/20 text-green-300">Certificado Blockchain</Badge>
        </div>
      </CardContent>
    </Card>
  );
};
