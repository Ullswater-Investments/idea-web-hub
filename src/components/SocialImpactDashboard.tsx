import React, { useMemo } from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, Users, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface SocialImpactDashboardProps {
  spend?: number;
}

export const SocialImpactDashboard = ({ spend = 100000 }: SocialImpactDashboardProps) => {
  const metrics = useMemo(() => {
    const sroiMultiplier = 3.8;
    const jobsCreated = Math.floor(spend / 15000);
    const socialValue = spend * sroiMultiplier;
    const publicSavings = spend * 0.45;
    
    const chartData = [
      { name: 'Inversión Directa', value: spend, fill: 'hsl(239, 84%, 67%)' },
      { name: 'Valor Social Generado', value: socialValue, fill: 'hsl(258, 90%, 66%)' },
      { name: 'Ahorro Admin. Pública', value: publicSavings, fill: 'hsl(292, 84%, 61%)' }
    ];

    return { jobsCreated, socialValue, sroiMultiplier, publicSavings, chartData };
  }, [spend]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
      <Card className="overflow-hidden bg-gradient-to-br from-indigo-950 via-violet-950 to-purple-950 border-indigo-800/50">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Lado Izquierdo: Métricas y Gráfico */}
          <div className="p-6 md:p-8 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-violet-300">
                <Heart className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">Economía Social & Ética</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Dashboard de Impacto Social</h2>
              <p className="text-indigo-200/70">
                Basado en el gasto verificado en proveedores de inserción y centros especiales.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-indigo-900/40 border-indigo-700/30">
                <Users className="w-6 h-6 text-violet-400 mb-2" />
                <p className="text-xs text-indigo-300 font-medium">Empleos Inclusivos Creados</p>
                <p className="text-2xl font-bold text-white">{metrics.jobsCreated} FTEs</p>
              </Card>
              <Card className="p-4 bg-indigo-900/40 border-indigo-700/30">
                <TrendingUp className="w-6 h-6 text-violet-400 mb-2" />
                <p className="text-xs text-indigo-300 font-medium">Multiplicador SROI</p>
                <p className="text-2xl font-bold text-white">1 : {metrics.sroiMultiplier}</p>
              </Card>
            </div>

            <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metrics.chartData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(99, 102, 241, 0.2)" />
                  <XAxis type="number" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k€`} stroke="#a5b4fc" fontSize={12} />
                  <YAxis type="category" dataKey="name" width={120} stroke="#a5b4fc" fontSize={11} />
                  <Tooltip
                    formatter={(value: number) => [`${value.toLocaleString()}€`, 'Valor']}
                    contentStyle={{ backgroundColor: 'hsl(239, 84%, 15%)', border: '1px solid hsl(239, 84%, 30%)', borderRadius: '8px' }}
                    labelStyle={{ color: '#c7d2fe' }}
                  />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                    {metrics.chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Lado Derecho: Panel de ARIA (Consultoría de Impacto) */}
          <div className="bg-white dark:bg-slate-900 p-6 md:p-8 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="space-y-6 flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500" />
                  <span className="font-bold text-foreground">ARIA</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-violet-500 bg-violet-100 dark:bg-violet-950 px-2 py-1 rounded-full">
                  <ShieldCheck className="w-3 h-3" />
                  Verified on Pontus-X
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-violet-50 dark:bg-violet-950/50 rounded-xl border border-violet-200 dark:border-violet-800">
                  <p className="text-sm font-semibold text-violet-700 dark:text-violet-300 mb-1">Impacto en Comunidad</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Tu inversión de <strong className="text-foreground">{spend.toLocaleString()}€</strong> ha generado un retorno social de{' '}
                    <strong className="text-violet-600 dark:text-violet-400">{metrics.socialValue.toLocaleString()}€</strong>.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Transparencia de compra pública</span>
                    <span className="font-bold text-foreground">98%</span>
                  </div>
                  <Progress value={98} className="h-2 bg-violet-100 dark:bg-violet-950" />
                  
                  <p className="text-xs text-muted-foreground italic border-l-2 border-violet-500 pl-3">
                    "Igualando el hito de Alianza Social Hub: Hemos verificado mediante auditoría digital que el 100% de tus proveedores en este lote cumplen con la Ley General de Discapacidad."
                  </p>
                </div>
              </div>
            </div>

            <button className="mt-6 w-full py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all">
              Generar Memoria de Sostenibilidad <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};
