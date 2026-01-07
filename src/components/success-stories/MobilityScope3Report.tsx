import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Truck, 
  Zap, 
  Fuel, 
  TrendingDown, 
  ShieldCheck, 
  ArrowRight,
  Leaf,
  Building2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  Legend
} from 'recharts';

interface MobilityScope3ReportProps {
  fleetSize?: number;
  electricPercentage?: number;
}

export const MobilityScope3Report = ({ 
  fleetSize = 45, 
  electricPercentage = 35 
}: MobilityScope3ReportProps) => {
  
  const metrics = useMemo(() => {
    const dieselVehicles = Math.round(fleetSize * (1 - electricPercentage / 100));
    const electricVehicles = Math.round(fleetSize * (electricPercentage / 100));
    
    // CO2 coefficients (EU standard)
    const dieselCO2perKm = 0.85; // kg CO2/km for urban delivery truck
    const electricCO2perKm = 0.12; // kg CO2/km (grid mix Spain)
    
    const avgKmPerMonth = 3500;
    const dieselEmissions = dieselVehicles * avgKmPerMonth * dieselCO2perKm;
    const electricEmissions = electricVehicles * avgKmPerMonth * electricCO2perKm;
    const totalEmissions = dieselEmissions + electricEmissions;
    
    // Baseline (100% diesel)
    const baselineEmissions = fleetSize * avgKmPerMonth * dieselCO2perKm;
    const reduction = ((baselineEmissions - totalEmissions) / baselineEmissions) * 100;
    
    // Intensity per tkm
    const avgTonnesPerTrip = 2.5;
    const tripsPerMonth = fleetSize * 120;
    const tkm = tripsPerMonth * avgTonnesPerTrip * 15; // 15km avg trip
    const intensity = totalEmissions / tkm;
    
    return {
      dieselVehicles,
      electricVehicles,
      totalEmissions: Math.round(totalEmissions),
      reduction: reduction.toFixed(1),
      intensity: intensity.toFixed(3),
      scope1: Math.round(dieselEmissions),
      scope2: Math.round(electricEmissions * 0.3), // Charging infrastructure
      scope3: Math.round(totalEmissions * 0.15) // Upstream/downstream
    };
  }, [fleetSize, electricPercentage]);

  // Monthly trend data
  const trendData = [
    { month: 'Ene', diesel: 145, electric: 12, target: 140 },
    { month: 'Feb', diesel: 142, electric: 14, target: 138 },
    { month: 'Mar', diesel: 138, electric: 18, target: 135 },
    { month: 'Abr', diesel: 132, electric: 22, target: 132 },
    { month: 'May', diesel: 125, electric: 28, target: 128 },
    { month: 'Jun', diesel: 118, electric: 35, target: 124 },
  ];

  const scopeData = [
    { name: 'Scope 1', value: metrics.scope1, fill: 'hsl(173, 80%, 40%)' },
    { name: 'Scope 2', value: metrics.scope2, fill: 'hsl(180, 70%, 45%)' },
    { name: 'Scope 3', value: metrics.scope3, fill: 'hsl(187, 60%, 50%)' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
      <Card className="overflow-hidden bg-gradient-to-br from-teal-950 via-cyan-950 to-slate-950 border-teal-800/50">
        <div className="grid lg:grid-cols-5 gap-0">
          {/* Main Content - 3 columns */}
          <div className="lg:col-span-3 p-6 md:p-8 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-teal-300">
                <Truck className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">Reporte Scope 3 - Movilidad</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Descarbonización de Flota
              </h2>
              <p className="text-teal-200/70">
                Telemetría verificada y certificación de emisiones para acceso a financiación verde.
              </p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 bg-teal-900/40 border-teal-700/30">
                <TrendingDown className="w-6 h-6 text-teal-400 mb-2" />
                <p className="text-xs text-teal-300 font-medium">Reducción CO₂</p>
                <p className="text-2xl font-bold text-white">-{metrics.reduction}%</p>
              </Card>
              <Card className="p-4 bg-teal-900/40 border-teal-700/30">
                <Leaf className="w-6 h-6 text-teal-400 mb-2" />
                <p className="text-xs text-teal-300 font-medium">Intensidad</p>
                <p className="text-2xl font-bold text-white">{metrics.intensity} kg/tkm</p>
              </Card>
              <Card className="p-4 bg-teal-900/40 border-teal-700/30">
                <Zap className="w-6 h-6 text-teal-400 mb-2" />
                <p className="text-xs text-teal-300 font-medium">Flota Eléctrica</p>
                <p className="text-2xl font-bold text-white">{electricPercentage}%</p>
              </Card>
            </div>

            {/* Emissions Trend Chart */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-teal-200 uppercase tracking-wider">
                Evolución de Emisiones (Toneladas CO₂)
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="dieselGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(173, 80%, 40%)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(173, 80%, 40%)" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="electricGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(180, 70%, 60%)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(180, 70%, 60%)" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(20, 184, 166, 0.2)" />
                    <XAxis dataKey="month" stroke="#5eead4" fontSize={12} />
                    <YAxis stroke="#5eead4" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(173, 80%, 10%)', 
                        border: '1px solid hsl(173, 80%, 30%)',
                        borderRadius: '8px'
                      }}
                      labelStyle={{ color: '#99f6e4' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="diesel" 
                      stackId="1"
                      stroke="hsl(173, 80%, 40%)" 
                      fill="url(#dieselGradient)"
                      name="Diesel"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="electric" 
                      stackId="1"
                      stroke="hsl(180, 70%, 60%)" 
                      fill="url(#electricGradient)"
                      name="Eléctrico"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Scope Breakdown */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-teal-200 uppercase tracking-wider">
                  Desglose por Alcance
                </h3>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={scopeData} layout="vertical">
                      <XAxis type="number" hide />
                      <YAxis type="category" dataKey="name" width={60} stroke="#5eead4" fontSize={11} />
                      <Tooltip 
                        formatter={(value: number) => [`${value.toLocaleString()} kg CO₂`, '']}
                        contentStyle={{ 
                          backgroundColor: 'hsl(173, 80%, 10%)', 
                          border: '1px solid hsl(173, 80%, 30%)',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {scopeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-teal-200 uppercase tracking-wider">
                  Composición de Flota
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Fuel className="w-4 h-4 text-amber-400" />
                      <span className="text-teal-100">Diesel</span>
                    </div>
                    <span className="font-bold text-white">{metrics.dieselVehicles} vehículos</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-teal-400" />
                      <span className="text-teal-100">Eléctrico</span>
                    </div>
                    <span className="font-bold text-white">{metrics.electricVehicles} vehículos</span>
                  </div>
                  <Progress value={electricPercentage} className="h-3 bg-amber-900/50" />
                </div>
              </div>
            </div>
          </div>

          {/* ARIA Side Panel - 2 columns */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 md:p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-foreground">ARIA</p>
                <p className="text-xs text-muted-foreground">Informe CSRD Automático</p>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-teal-600 border-teal-300 bg-teal-50 dark:bg-teal-950">
                  <Building2 className="w-3 h-3 mr-1" />
                  Green Finance Bank
                </Badge>
                <div className="flex items-center gap-1 text-[10px] text-teal-600 font-mono">
                  <ShieldCheck className="w-3 h-3" />
                  Verificado
                </div>
              </div>

              <Card className="p-4 bg-teal-50 dark:bg-teal-950/50 border-teal-200 dark:border-teal-800">
                <p className="text-sm font-semibold text-teal-700 dark:text-teal-300 mb-2">
                  Certificación de Descarbonización
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Tu flota ha logrado una reducción verificada de{' '}
                  <strong className="text-teal-600 dark:text-teal-400">-{metrics.reduction}%</strong>{' '}
                  en emisiones respecto al baseline. Esto te califica para:
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="flex items-center gap-2 text-teal-700 dark:text-teal-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    Bonificación tipo interés (-0.25%)
                  </li>
                  <li className="flex items-center gap-2 text-teal-700 dark:text-teal-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    Sello "Proveedor Preferente"
                  </li>
                  <li className="flex items-center gap-2 text-teal-700 dark:text-teal-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    Acceso a licitaciones verdes
                  </li>
                </ul>
              </Card>

              <div className="p-4 border rounded-xl space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  Intensidad Certificada
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                    {metrics.intensity}
                  </span>
                  <span className="text-sm text-muted-foreground">kg CO₂/tkm</span>
                </div>
                <p className="text-xs text-muted-foreground italic">
                  Umbral "Green Logistics": &lt; 0.15 kg/tkm ✓
                </p>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground italic border-l-2 border-teal-500 pl-3">
                  "Gracias a la telemetría directa integrada con ProcureData, el Green Finance Bank aprobó el crédito verde en tiempo récord. La transparencia de datos eliminó las 12 semanas habituales de due diligence."
                </p>
              </div>
            </div>

            <button className="mt-6 w-full py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all">
              Descargar Informe CSRD <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};
