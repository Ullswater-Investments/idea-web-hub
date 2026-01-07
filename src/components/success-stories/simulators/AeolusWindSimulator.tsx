import React, { useState } from 'react';
import { Wind, Coins, ArrowRight, Zap, Clock } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AeolusWindSimulatorProps {
  onValuesChange?: (values: { windSpeed: number; fixedPrice: number; payout: number }) => void;
}

export const AeolusWindSimulator = ({ onValuesChange }: AeolusWindSimulatorProps) => {
  const [windSpeed, setWindSpeed] = useState(12);
  const [fixedPrice, setFixedPrice] = useState(55);
  
  const instantPayout = windSpeed * 1.5 * fixedPrice;
  const cashFlowBoost = instantPayout * 0.15;
  
  // Turbine rotation speed based on wind
  const rotationDuration = Math.max(0.5, 5 - (windSpeed / 5));

  React.useEffect(() => {
    onValuesChange?.({ windSpeed, fixedPrice, payout: instantPayout });
  }, [windSpeed, fixedPrice, instantPayout, onValuesChange]);

  return (
    <Card className="bg-gradient-to-br from-cyan-950/40 to-blue-950/30 border-cyan-500/20 shadow-2xl overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-cyan-400 flex items-center gap-2 text-sm font-bold">
          <Wind className="w-5 h-5" />
          PPA INSTANT SETTLEMENT - Smart Contract Eólico
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Turbine Visual */}
        <div className="bg-gradient-to-b from-slate-900 to-cyan-950/50 rounded-2xl p-8 border border-cyan-900/30 relative overflow-hidden">
          {/* Wind lines animation */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="absolute h-0.5 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
                style={{
                  top: `${20 + i * 15}%`,
                  left: '-100%',
                  width: '200%',
                  animation: `slideRight ${2 + i * 0.3}s linear infinite`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
          
          <div className="relative flex items-center justify-center">
            {/* Turbine Icon with Rotation */}
            <div className="relative">
              <Wind 
                className="w-24 h-24 text-cyan-400" 
                style={{ 
                  animation: `spin ${rotationDuration}s linear infinite`,
                }}
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-cyan-900/80 px-3 py-1 rounded-full">
                <span className="text-lg font-black text-white">{windSpeed} <span className="text-xs text-cyan-300">m/s</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Instant Settlement Panel */}
        <div className="bg-slate-900/80 rounded-xl p-5 border border-emerald-500/30">
          <div className="flex items-center gap-3 mb-4">
            <Coins className="w-6 h-6 text-emerald-400" />
            <span className="text-sm font-bold text-white uppercase">Liquidación Instantánea</span>
          </div>
          
          <div className="flex items-center justify-between bg-emerald-950/50 rounded-lg p-4">
            <div className="text-center">
              <Zap className="w-6 h-6 text-cyan-400 mx-auto mb-1" />
              <p className="text-xs text-slate-400">Generación</p>
              <p className="text-lg font-bold text-white">{(windSpeed * 1.5).toFixed(1)} MWh</p>
            </div>
            <ArrowRight className="w-6 h-6 text-emerald-400 animate-pulse" />
            <div className="text-center">
              <Coins className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
              <p className="text-xs text-slate-400">Pago en Bloque</p>
              <p className="text-lg font-bold text-emerald-400">{instantPayout.toFixed(0)} EUROe</p>
            </div>
          </div>
          
          <div className="mt-3 flex items-center justify-center gap-2 text-[10px] font-mono text-emerald-400">
            <Clock className="w-3 h-3" />
            <span>TX_HASH: 0x1c2d...wind_settle | Bloque #19,234,567</span>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-cyan-900/20">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Velocidad del Viento</span>
              <span className="font-bold text-cyan-400">{windSpeed} m/s</span>
            </div>
            <Slider
              value={[windSpeed]}
              onValueChange={(v) => setWindSpeed(v[0])}
              min={3}
              max={25}
              step={1}
              className="[&>span]:bg-cyan-600"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Precio PPA Pactado</span>
              <span className="font-bold text-emerald-400">{fixedPrice} €/MWh</span>
            </div>
            <Slider
              value={[fixedPrice]}
              onValueChange={(v) => setFixedPrice(v[0])}
              min={30}
              max={90}
              step={5}
              className="[&>span]:bg-emerald-600"
            />
          </div>
        </div>

        {/* Comparison */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
            <p className="text-[10px] uppercase font-black text-slate-400 mb-1">Tradicional</p>
            <p className="text-xl font-black text-slate-500">45 días</p>
            <p className="text-xs text-slate-500">Tiempo liquidación</p>
          </div>
          <div className="bg-cyan-950/50 p-4 rounded-xl border border-cyan-500/30">
            <p className="text-[10px] uppercase font-black text-cyan-400 mb-1">Smart Contract</p>
            <p className="text-xl font-black text-white">2 seg</p>
            <p className="text-xs text-cyan-300">Tiempo liquidación</p>
          </div>
        </div>

        {/* Cash Flow Boost */}
        <div className="bg-gradient-to-r from-cyan-900/50 to-emerald-900/50 p-5 rounded-2xl border border-cyan-500/30">
          <p className="text-[10px] uppercase font-black text-cyan-300 mb-2">Mejora Flujo de Caja</p>
          <p className="text-4xl font-black text-white">+{cashFlowBoost.toFixed(0)} <span className="text-lg text-cyan-400">EUROe</span></p>
          <Badge className="mt-2 bg-emerald-500/20 text-emerald-300">-12% Coste Financiero</Badge>
        </div>
      </CardContent>
    </Card>
  );
};
