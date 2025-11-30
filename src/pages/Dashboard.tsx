import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ActivityFeed } from "@/components/ActivityFeed";
import { DashboardStats } from "@/components/DashboardStats";
import { DynamicBreadcrumbs } from "@/components/DynamicBreadcrumbs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { DollarSign, ShoppingCart, Users, TrendingUp, Package } from "lucide-react";

// --- DATOS SINTÉTICOS PARA GRÁFICOS ---
const REVENUE_DATA = [
  { name: 'Ene', revenue: 4000, orders: 24 },
  { name: 'Feb', revenue: 3000, orders: 18 },
  { name: 'Mar', revenue: 2000, orders: 12 },
  { name: 'Abr', revenue: 2780, orders: 20 },
  { name: 'May', revenue: 1890, orders: 15 },
  { name: 'Jun', revenue: 2390, orders: 22 },
  { name: 'Jul', revenue: 3490, orders: 30 },
];

const SPENDING_DATA = [
  { name: 'Ene', spent: 1200, savings: 200 },
  { name: 'Feb', spent: 1900, savings: 150 },
  { name: 'Mar', spent: 1500, savings: 300 },
  { name: 'Abr', spent: 2200, savings: 100 },
  { name: 'May', spent: 1800, savings: 400 },
  { name: 'Jun', spent: 2500, savings: 200 },
];

export default function Dashboard() {
  const { activeOrg } = useOrganizationContext();
  const isProvider = activeOrg?.type === 'provider' || activeOrg?.type === 'data_holder';

  return (
    <div className="container py-8 space-y-8 fade-in bg-muted/10 min-h-screen">
      <DynamicBreadcrumbs />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Hola, {activeOrg?.name}</h2>
          <p className="text-muted-foreground">
            {isProvider 
              ? "Aquí tienes el resumen de tu rendimiento de ventas y activos." 
              : "Resumen de tus adquisiciones de datos y consumo."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground bg-background px-3 py-1 rounded-full border">
            {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Stats Cards Genéricas (Componente Existente) */}
      <DashboardStats />

      {/* --- SECCIÓN FINANCIERA ESPECÍFICA POR ROL --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Gráfico Principal (2 Columnas) */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle>
              {isProvider ? "Ingresos Recurrentes (MRR)" : "Gasto en Datos"}
            </CardTitle>
            <CardDescription>
              {isProvider 
                ? "Evolución de ventas de activos en los últimos 7 meses." 
                : "Análisis de costes por suscripciones activas."}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              {isProvider ? (
                <AreaChart data={REVENUE_DATA}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#2563eb" fillOpacity={1} fill="url(#colorRev)" name="Ingresos (€)" />
                </AreaChart>
              ) : (
                <BarChart data={SPENDING_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px' }} />
                  <Bar dataKey="spent" fill="#0f172a" radius={[4, 4, 0, 0]} name="Gasto Real (€)" />
                  <Bar dataKey="savings" fill="#22c55e" radius={[4, 4, 0, 0]} name="Ahorro (€)" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Widgets Laterales (1 Columna) */}
        <div className="space-y-6">
          {/* Widget 1 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {isProvider ? "Tasa de Conversión" : "Suscripciones Activas"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center gap-2">
                {isProvider ? "4.5%" : "12"}
                <span className="text-xs text-green-600 flex items-center bg-green-100 px-1.5 py-0.5 rounded-full">
                  <TrendingUp className="h-3 w-3 mr-1" /> +12%
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Comparado con el mes anterior</p>
            </CardContent>
          </Card>

          {/* Widget 2 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {isProvider ? "Ventas Totales" : "Proveedores Conectados"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center gap-2">
                {isProvider ? "1,240 €" : "8"}
              </div>
              <div className="h-2 w-full bg-muted mt-3 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 w-[70%]" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">70% del objetivo anual</p>
            </CardContent>
          </Card>

          {/* Accesos Rápidos */}
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Acciones Rápidas</h3>
              <div className="space-y-2">
                {isProvider ? (
                  <>
                    <button className="w-full text-left text-sm p-2 hover:bg-white/10 rounded flex items-center gap-2 transition-colors">
                      <Package className="h-4 w-4" /> Publicar nuevo activo
                    </button>
                    <button className="w-full text-left text-sm p-2 hover:bg-white/10 rounded flex items-center gap-2 transition-colors">
                      <DollarSign className="h-4 w-4" /> Configurar Payouts
                    </button>
                  </>
                ) : (
                  <>
                    <button className="w-full text-left text-sm p-2 hover:bg-white/10 rounded flex items-center gap-2 transition-colors">
                      <ShoppingCart className="h-4 w-4" /> Explorar Marketplace
                    </button>
                    <button className="w-full text-left text-sm p-2 hover:bg-white/10 rounded flex items-center gap-2 transition-colors">
                      <Users className="h-4 w-4" /> Publicar Oportunidad
                    </button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* --- FEED DE ACTIVIDAD (Componente Existente) --- */}
      <div className="grid gap-4">
        <h3 className="text-lg font-semibold">Última Actividad</h3>
        <ActivityFeed />
      </div>
    </div>
  );
}
