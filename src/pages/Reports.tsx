import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, TrendingUp, Clock, CheckCircle, Download, Calendar } from "lucide-react";
import { FadeIn } from "@/components/AnimatedSection";
import { toast } from "sonner";
import { format, subDays, startOfYear } from "date-fns";
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
} from "recharts";

const COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#8b5cf6", "#ef4444"];

type DateRange = "30days" | "90days" | "ytd";

interface OrgKPIs {
  approval_rate: number;
  avg_time_hours: number;
  compliance_percent: number;
  total_volume: number;
}

const Reports = () => {
  const { activeOrg, isDemo } = useOrganizationContext();
  const [dateRange, setDateRange] = useState<DateRange>("30days");

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
                     t.status === "completed" ? "Completado" : "Otro";
        
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
            )
          ),
          created_at
        `)
        .or(`consumer_org_id.eq.${activeOrg.id},subject_org_id.eq.${activeOrg.id},holder_org_id.eq.${activeOrg.id}`)
        .gte("created_at", dateFilter.toISOString());

      if (error) throw error;

      const productCounts = data.reduce((acc: any, t) => {
        const productName = t.asset?.product?.name || "Desconocido";
        acc[productName] = (acc[productName] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(productCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a: any, b: any) => b.count - a.count)
        .slice(0, 5);
    },
    enabled: !!activeOrg,
  });

  // Export PDF function
  const handleExportPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Title
    doc.setFontSize(20);
    doc.setTextColor(33, 33, 33);
    doc.text("PROCUREDATA - Reporte de Analytics", pageWidth / 2, 20, { align: "center" });
    
    // Subtitle with date
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    const dateRangeLabel = dateRange === "30days" ? "Últimos 30 días" : 
                           dateRange === "90days" ? "Últimos 90 días" : "Año Actual (YTD)";
    doc.text(`Periodo: ${dateRangeLabel}`, pageWidth / 2, 28, { align: "center" });
    doc.text(`Generado: ${format(new Date(), "PPP", { locale: es })}`, pageWidth / 2, 35, { align: "center" });
    doc.text(`Organización: ${activeOrg?.name || "—"}`, pageWidth / 2, 42, { align: "center" });
    
    // Separator line
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 48, pageWidth - 20, 48);
    
    // KPIs Section
    doc.setFontSize(14);
    doc.setTextColor(33, 33, 33);
    doc.text("Métricas Clave", 20, 60);
    
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    
    const kpiData = [
      ["Tasa de Aprobación", `${kpis?.approval_rate ?? 0}%`],
      ["Tiempo Promedio", kpis?.avg_time_hours ? 
        kpis.avg_time_hours >= 24 ? 
          `${(kpis.avg_time_hours / 24).toFixed(1)} días` : 
          `${kpis.avg_time_hours.toFixed(1)} horas` : "—"],
      ["Cumplimiento ODRL", `${kpis?.compliance_percent ?? 0}%`],
      ["Volumen Total", `${kpis?.total_volume ?? 0} transacciones`],
    ];
    
    let yPos = 70;
    kpiData.forEach(([label, value]) => {
      doc.text(`• ${label}: ${value}`, 25, yPos);
      yPos += 8;
    });
    
    // Transactions by Status
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
    
    // Top Products
    doc.setFontSize(14);
    doc.setTextColor(33, 33, 33);
    doc.text("Productos Más Solicitados", 20, yPos + 10);
    
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    yPos += 20;
    
    if (topProducts && topProducts.length > 0) {
      topProducts.forEach((item: any, index: number) => {
        doc.text(`${index + 1}. ${item.name}: ${item.count} solicitudes`, 25, yPos);
        yPos += 8;
      });
    } else {
      doc.text("No hay datos disponibles", 25, yPos);
    }
    
    // Footer
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text("Este reporte fue generado automáticamente por PROCUREDATA", pageWidth / 2, 280, { align: "center" });
    
    // Save
    const fileName = `procuredata-report-${format(new Date(), "yyyy-MM-dd")}.pdf`;
    doc.save(fileName);
    
    toast.success("Reporte PDF generado correctamente", {
      description: fileName,
    });
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
              <Button onClick={handleExportPDF} variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Exportar PDF
              </Button>
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
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
                      label={(entry) => entry.name}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {transactionsByStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
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
                  <BarChart data={topProducts}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8b5cf6" />
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

      <FadeIn delay={0.2}>
        <Card>
          <CardHeader>
            <CardTitle>Métricas Clave</CardTitle>
            <CardDescription>
              Indicadores de rendimiento del sistema
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