import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart3, TrendingUp, TrendingDown, Clock, CheckCircle, Download, Calendar, FileSpreadsheet, Zap, Database, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { FadeIn } from "@/components/AnimatedSection";
import { toast } from "sonner";
import { format, subDays, startOfYear, startOfMonth, endOfMonth, eachMonthOfInterval, isSameMonth } from "date-fns";
import { es } from "date-fns/locale";
import jsPDF from "jspdf";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend,
} from "recharts";

const COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#8b5cf6", "#ef4444", "#6366f1"];

type DateRange = "30days" | "90days" | "ytd";

interface OrgKPIs {
  approval_rate: number;
  avg_time_hours: number;
  compliance_percent: number;
  total_volume: number;
}

interface MonthlyTrend {
  month: string;
  gasto: number;
  ingreso: number;
}

interface TopProvider {
  name: string;
  volume: number;
  transactions: number;
}

const Reports = () => {
  const { activeOrg, isDemo } = useOrganizationContext();
  const [dateRange, setDateRange] = useState<DateRange>("90days");

  // Calculate date filter
  const getDateFilter = () => {
    const now = new Date();
    switch (dateRange) {
      case "30days":
        return subDays(now, 30);
      case "90days":
        return subDays(now, 90);
      case "ytd":
        return startOfYear(now);
      default:
        return subDays(now, 30);
    }
  };

  const dateFilter = getDateFilter();

  // Fetch dynamic KPIs using RPC function
  const { data: kpis } = useQuery<OrgKPIs | null>({
    queryKey: ["org-kpis", activeOrg?.id],
    queryFn: async () => {
      if (!activeOrg) return null;
      const { data, error } = await supabase.rpc('get_org_kpis', { 
        target_org_id: activeOrg.id 
      });
      if (error) throw error;
      return data as unknown as OrgKPIs;
    },
    enabled: !!activeOrg,
  });

  // Fetch transactions grouped by status for activeOrg with date filter
  const { data: transactionsByStatus } = useQuery({
    queryKey: ["transactions-by-status", activeOrg?.id, dateRange],
    queryFn: async () => {
      if (!activeOrg) return [];

      const { data, error } = await supabase
        .from("data_transactions")
        .select("status, created_at")
        .or(`consumer_org_id.eq.${activeOrg.id},subject_org_id.eq.${activeOrg.id},holder_org_id.eq.${activeOrg.id}`)
        .gte("created_at", dateFilter.toISOString());

      if (error) throw error;

      const statusCount = data.reduce((acc, t) => {
        const label = t.status === "pending_subject" ? "Pendiente Proveedor" :
                     t.status === "pending_holder" ? "Pendiente Custodio" :
                     t.status === "approved" ? "Aprobado" :
                     t.status === "completed" ? "Completado" :
                     t.status === "cancelled" ? "Cancelado" :
                     t.status === "denied_subject" ? "Rechazado" : "Otro";
        
        acc[label] = (acc[label] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return Object.entries(statusCount).map(([name, value]) => ({ name, value }));
    },
    enabled: !!activeOrg,
  });

  // Fetch top products for activeOrg with date filter
  const { data: topProducts } = useQuery({
    queryKey: ["top-products", activeOrg?.id, dateRange],
    queryFn: async () => {
      if (!activeOrg) return [];

      const { data, error } = await supabase
        .from("data_transactions")
        .select(`
          asset:data_assets (
            product:data_products (
              name
            ),
            price
          ),
          created_at
        `)
        .or(`consumer_org_id.eq.${activeOrg.id},subject_org_id.eq.${activeOrg.id},holder_org_id.eq.${activeOrg.id}`)
        .gte("created_at", dateFilter.toISOString());

      if (error) throw error;

      const productCounts = data.reduce((acc: Record<string, { count: number; revenue: number }>, t) => {
        const productName = t.asset?.product?.name || "Desconocido";
        const price = t.asset?.price || 0;
        if (!acc[productName]) {
          acc[productName] = { count: 0, revenue: 0 };
        }
        acc[productName].count += 1;
        acc[productName].revenue += price;
        return acc;
      }, {});

      return Object.entries(productCounts)
        .map(([name, data]) => ({ name, count: data.count, revenue: data.revenue }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
    },
    enabled: !!activeOrg,
  });

  // Fetch monthly trends for AreaChart
  const { data: monthlyTrends } = useQuery<MonthlyTrend[]>({
    queryKey: ["monthly-trends", activeOrg?.id, dateRange],
    queryFn: async () => {
      if (!activeOrg) return [];

      const { data, error } = await supabase
        .from("data_transactions")
        .select(`
          consumer_org_id,
          holder_org_id,
          created_at,
          asset:data_assets (price)
        `)
        .or(`consumer_org_id.eq.${activeOrg.id},holder_org_id.eq.${activeOrg.id}`)
        .gte("created_at", dateFilter.toISOString())
        .in("status", ["completed", "approved"]);

      if (error) throw error;

      // Generate months for the period
      const months = eachMonthOfInterval({
        start: dateFilter,
        end: new Date()
      });

      const trends: MonthlyTrend[] = months.map(month => {
        const monthData = data.filter(t => isSameMonth(new Date(t.created_at), month));
        
        const gasto = monthData
          .filter(t => t.consumer_org_id === activeOrg.id)
          .reduce((sum, t) => sum + (t.asset?.price || 0), 0);
        
        const ingreso = monthData
          .filter(t => t.holder_org_id === activeOrg.id)
          .reduce((sum, t) => sum + (t.asset?.price || 0), 0);

        return {
          month: format(month, "MMM", { locale: es }),
          gasto,
          ingreso
        };
      });

      return trends;
    },
    enabled: !!activeOrg,
  });

  // Fetch top providers/clients
  const { data: topProviders } = useQuery<TopProvider[]>({
    queryKey: ["top-providers", activeOrg?.id, dateRange],
    queryFn: async () => {
      if (!activeOrg) return [];

      const { data, error } = await supabase
        .from("data_transactions")
        .select(`
          holder_org_id,
          holder:organizations!data_transactions_holder_org_id_fkey (name),
          asset:data_assets (price)
        `)
        .eq("consumer_org_id", activeOrg.id)
        .gte("created_at", dateFilter.toISOString())
        .in("status", ["completed", "approved"]);

      if (error) throw error;

      const providerMap = data.reduce((acc: Record<string, { name: string; volume: number; transactions: number }>, t) => {
        const id = t.holder_org_id;
        const name = t.holder?.name || "Desconocido";
        const price = t.asset?.price || 0;

        if (!acc[id]) {
          acc[id] = { name, volume: 0, transactions: 0 };
        }
        acc[id].volume += price;
        acc[id].transactions += 1;
        return acc;
      }, {});

      return Object.values(providerMap)
        .sort((a, b) => b.volume - a.volume)
        .slice(0, 5);
    },
    enabled: !!activeOrg,
  });

  // Calculate totals from trends
  const totalGasto = monthlyTrends?.reduce((sum, m) => sum + m.gasto, 0) || 0;
  const totalIngreso = monthlyTrends?.reduce((sum, m) => sum + m.ingreso, 0) || 0;
  const datasetsActivos = topProducts?.length || 0;

  // Export PDF function
  const handleExportPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    doc.setFontSize(20);
    doc.setTextColor(33, 33, 33);
    doc.text("PROCUREDATA - Reporte de Analytics", pageWidth / 2, 20, { align: "center" });
    
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    const dateRangeLabel = dateRange === "30days" ? "Últimos 30 días" : 
                           dateRange === "90days" ? "Últimos 90 días" : "Año Actual (YTD)";
    doc.text(`Periodo: ${dateRangeLabel}`, pageWidth / 2, 28, { align: "center" });
    doc.text(`Generado: ${format(new Date(), "PPP", { locale: es })}`, pageWidth / 2, 35, { align: "center" });
    doc.text(`Organización: ${activeOrg?.name || "—"}`, pageWidth / 2, 42, { align: "center" });
    
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 48, pageWidth - 20, 48);
    
    doc.setFontSize(14);
    doc.setTextColor(33, 33, 33);
    doc.text("Métricas Clave", 20, 60);
    
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    
    const kpiData = [
      ["Volumen Total (Gasto)", `€ ${totalGasto.toLocaleString("es-ES")}`],
      ["Ingresos por Datos", `€ ${totalIngreso.toLocaleString("es-ES")}`],
      ["Datasets Activos", `${datasetsActivos}`],
      ["Tasa de Aprobación", `${kpis?.approval_rate ?? 0}%`],
      ["Tiempo Promedio", kpis?.avg_time_hours ? 
        kpis.avg_time_hours >= 24 ? 
          `${(kpis.avg_time_hours / 24).toFixed(1)} días` : 
          `${kpis.avg_time_hours.toFixed(1)} horas` : "—"],
    ];
    
    let yPos = 70;
    kpiData.forEach(([label, value]) => {
      doc.text(`• ${label}: ${value}`, 25, yPos);
      yPos += 8;
    });
    
    doc.setFontSize(14);
    doc.setTextColor(33, 33, 33);
    doc.text("Transacciones por Estado", 20, yPos + 10);
    
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    yPos += 20;
    
    if (transactionsByStatus && transactionsByStatus.length > 0) {
      transactionsByStatus.forEach((item) => {
        doc.text(`• ${item.name}: ${item.value}`, 25, yPos);
        yPos += 8;
      });
    } else {
      doc.text("No hay datos disponibles", 25, yPos);
      yPos += 8;
    }
    
    doc.setFontSize(14);
    doc.setTextColor(33, 33, 33);
    doc.text("Productos Más Solicitados", 20, yPos + 10);
    
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    yPos += 20;
    
    if (topProducts && topProducts.length > 0) {
      topProducts.forEach((item: any, index: number) => {
        doc.text(`${index + 1}. ${item.name}: ${item.count} solicitudes (€ ${item.revenue.toLocaleString("es-ES")})`, 25, yPos);
        yPos += 8;
      });
    } else {
      doc.text("No hay datos disponibles", 25, yPos);
    }
    
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text("Este reporte fue generado automáticamente por PROCUREDATA", pageWidth / 2, 280, { align: "center" });
    
    const fileName = `procuredata-report-${format(new Date(), "yyyy-MM-dd")}.pdf`;
    doc.save(fileName);
    
    toast.success("Reporte PDF generado correctamente", {
      description: fileName,
    });
  };

  // Export CSV function
  const handleExportCSV = () => {
    const rows = [
      ["Tipo", "Nombre", "Valor"],
      ...transactionsByStatus?.map(s => ["Estado", s.name, s.value.toString()]) || [],
      ...topProducts?.map((p: any) => ["Producto", p.name, p.count.toString()]) || [],
      ...topProviders?.map(p => ["Proveedor", p.name, p.volume.toString()]) || [],
    ];
    
    const csvContent = rows.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `procuredata-data-${format(new Date(), "yyyy-MM-dd")}.csv`);
    link.click();
    
    toast.success("Datos exportados a CSV");
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <FadeIn>
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-indigo-500/10 via-background to-background border border-indigo-500/20 p-8">
          <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <Badge variant="secondary" className="mb-4">
                <BarChart3 className="mr-1 h-3 w-3" />
                Analytics
              </Badge>
              <h1 className="text-4xl font-bold mb-3">
                Reportes y Estadísticas
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Analiza el rendimiento del sistema, visualiza tendencias y obtén insights
                sobre las transacciones de datos.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={dateRange} onValueChange={(v) => setDateRange(v as DateRange)}>
                <SelectTrigger className="w-[180px]">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30days">Últimos 30 días</SelectItem>
                  <SelectItem value="90days">Últimos 90 días</SelectItem>
                  <SelectItem value="ytd">Este Año (YTD)</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleExportCSV} variant="outline" className="gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                CSV
              </Button>
              <Button onClick={handleExportPDF} variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                PDF
              </Button>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* KPI Cards Row */}
      <FadeIn delay={0.05}>
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="relative overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Gasto Total</p>
                  <p className="text-3xl font-bold">€ {totalGasto.toLocaleString("es-ES")}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <ArrowUpRight className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <Badge variant="outline" className="text-xs bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border-red-200">
                    Consumo
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ingresos</p>
                  <p className="text-3xl font-bold">€ {totalIngreso.toLocaleString("es-ES")}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <ArrowDownRight className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200">
                    Proveedor
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Datasets Activos</p>
                  <p className="text-3xl font-bold">{datasetsActivos}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200">
                    Productos
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Eficiencia</p>
                  <p className="text-3xl font-bold">{kpis?.compliance_percent ?? 98}%</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400 border-purple-200">
                    Uptime
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </FadeIn>

      {/* Trend Chart */}
      <FadeIn delay={0.1}>
        <Card>
          <CardHeader>
            <CardTitle>Tendencia de Transacciones</CardTitle>
            <CardDescription>
              Evolución de gastos vs ingresos por período
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {monthlyTrends && monthlyTrends.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrends}>
                  <defs>
                    <linearGradient id="gastoGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="ingresoGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(v) => `€${v}`} />
                  <Tooltip 
                    formatter={(value: number) => [`€ ${value.toLocaleString("es-ES")}`, ""]}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="gasto" 
                    stroke="#ef4444" 
                    fill="url(#gastoGradient)" 
                    name="Gasto"
                    strokeWidth={2}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="ingreso" 
                    stroke="#10b981" 
                    fill="url(#ingresoGradient)" 
                    name="Ingreso"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No hay datos de tendencia disponibles
              </div>
            )}
          </CardContent>
        </Card>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Transacciones por Estado</CardTitle>
              <CardDescription>
                Distribución actual de solicitudes en el sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              {transactionsByStatus && transactionsByStatus.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={transactionsByStatus}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {transactionsByStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No hay datos disponibles
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Productos Más Solicitados</CardTitle>
              <CardDescription>
                Top 5 productos de datos más demandados
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              {topProducts && topProducts.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topProducts} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      width={120}
                      tick={{ fontSize: 11 }}
                    />
                    <Tooltip 
                      formatter={(value: number, name: string) => [
                        name === "count" ? `${value} solicitudes` : `€ ${value.toLocaleString("es-ES")}`,
                        name === "count" ? "Cantidad" : "Ingresos"
                      ]}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No hay datos disponibles
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </FadeIn>

      {/* Top Providers Table */}
      <FadeIn delay={0.2}>
        <Card>
          <CardHeader>
            <CardTitle>Top Proveedores de Datos</CardTitle>
            <CardDescription>
              Ranking de proveedores con los que más interactúas
            </CardDescription>
          </CardHeader>
          <CardContent>
            {topProviders && topProviders.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Proveedor</TableHead>
                    <TableHead className="text-right">Volumen (€)</TableHead>
                    <TableHead className="text-right"># Transacciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProviders.map((provider, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{provider.name}</TableCell>
                      <TableCell className="text-right">€ {provider.volume.toLocaleString("es-ES")}</TableCell>
                      <TableCell className="text-right">{provider.transactions}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No hay datos de proveedores disponibles
              </div>
            )}
          </CardContent>
        </Card>
      </FadeIn>

      {/* Original KPIs Card */}
      <FadeIn delay={0.25}>
        <Card>
          <CardHeader>
            <CardTitle>Métricas de Rendimiento</CardTitle>
            <CardDescription>
              Indicadores de eficiencia del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Tasa de Aprobación
                  </p>
                  <p className="text-2xl font-bold">
                    {kpis?.approval_rate ?? 0}%
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {kpis?.total_volume ?? 0} transacciones totales
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <Clock className="h-8 w-8 text-amber-600 dark:text-amber-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Tiempo Promedio
                  </p>
                  <p className="text-2xl font-bold">
                    {kpis?.avg_time_hours ? 
                      kpis.avg_time_hours >= 24 ? 
                        `${(kpis.avg_time_hours / 24).toFixed(1)} días` : 
                        `${kpis.avg_time_hours.toFixed(1)} horas`
                      : '-'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    De solicitud a aprobación
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <CheckCircle className="h-8 w-8 text-blue-600 dark:text-blue-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Cumplimiento
                  </p>
                  <p className="text-2xl font-bold">
                    {kpis?.compliance_percent ?? 0}%
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Políticas ODRL aplicadas
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
};

export default Reports;