import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { DollarSign, Eye, ShoppingBag, TrendingUp } from "lucide-react";

// Mock Data para la demo
const VISITS_DATA = [
  { day: 'Lun', visits: 120, conversion: 2.4 },
  { day: 'Mar', visits: 150, conversion: 3.1 },
  { day: 'Mie', visits: 180, conversion: 2.8 },
  { day: 'Jue', visits: 220, conversion: 3.5 },
  { day: 'Vie', visits: 190, conversion: 3.2 },
  { day: 'Sab', visits: 90, conversion: 1.8 },
  { day: 'Dom', visits: 80, conversion: 1.5 },
];

const TOP_PRODUCTS = [
  { name: 'Telemetry Pack', value: 12000 },
  { name: 'Market Trends', value: 8500 },
  { name: 'User Behavior', value: 6000 },
  { name: 'Sensor Logs', value: 4000 },
];

export default function SellerAnalytics() {
  const { activeOrg } = useOrganizationContext();

  // Redirigir o mostrar error si no es provider
  if (activeOrg?.type === 'consumer') {
    return (
      <div className="container py-16 text-center space-y-4">
        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground opacity-50" />
        <h2 className="text-2xl font-semibold">Acceso Restringido</h2>
        <p className="text-muted-foreground">
          Esta sección está reservada para Vendedores de Datos y Data Holders.
        </p>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8 fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Seller Studio</h2>
        <p className="text-muted-foreground">Analítica de rendimiento de tus activos de datos.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% respecto al mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas (Transacciones)</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+24</div>
            <p className="text-xs text-muted-foreground">+4 nuevas esta semana</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vistas de Catálogo</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,204</div>
            <p className="text-xs text-muted-foreground">Tasa de conversión global: 2.8%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5.0</div>
            <p className="text-xs text-muted-foreground">Basado en 32 reseñas</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tráfico vs Conversión</CardTitle>
            <CardDescription>Visitas a tus productos en la última semana.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={VISITS_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="visits" stroke="hsl(var(--primary))" strokeWidth={2} name="Visitas" />
                <Line yAxisId="right" type="monotone" dataKey="conversion" stroke="hsl(142 76% 36%)" strokeWidth={2} name="Conversión %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Productos</CardTitle>
            <CardDescription>Ingresos generados por activo.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TOP_PRODUCTS} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
