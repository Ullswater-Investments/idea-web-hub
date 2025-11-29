import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Leaf, TrendingUp, Award, ShoppingCart, Recycle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Helper function to extract ESG data from payload (can be in root or nested)
const extractESG = (payload: any) => {
  const data = payload.esg_data || payload;
  return {
    scope1: Number(data.scope1_co2_tons || 0),
    scope2: Number(data.scope2_co2_tons || 0),
    scope3: Number(data.scope3_co2_tons || 0),
    renewable_kwh: Number(data.renewable_energy_kwh || 0),
    waste: Number(data.waste_recycled_tons || 0),
    water: Number(data.water_usage_m3 || 0),
    audit_score: Number(data.audit_score || 0),
    certifications: data.certifications || [],
    provider_name: data.provider_name || '',
    sector: data.sector || '',
  };
};

const Sustainability = () => {
  const navigate = useNavigate();
  const { activeOrg } = useOrganizationContext();

  const { data: esgData, isLoading } = useQuery({
    queryKey: ["sustainability-data", activeOrg?.id],
    queryFn: async () => {
      if (!activeOrg?.id) return [];
      
      const { data, error } = await supabase
        .from("data_payloads")
        .select(`
          *,
          transaction:data_transactions!transaction_id (
            id,
            consumer_org_id,
            subject_org_id,
            holder_org_id,
            subject_org:organizations!subject_org_id (name, sector)
          )
        `)
        .or(`transaction.consumer_org_id.eq.${activeOrg.id},transaction.subject_org_id.eq.${activeOrg.id}`);

      if (error) throw error;
      return data || [];
    },
    enabled: !!activeOrg?.id,
  });

  const processedData = useMemo(() => {
    if (!esgData || esgData.length === 0 || !activeOrg) return [];

    // Filter for consumer org (showing providers' ESG data)
    const relevantPayloads = esgData.filter(
      (p) => p.transaction?.consumer_org_id === activeOrg.id
    );

    const grouped = relevantPayloads.reduce((acc, payload) => {
      const providerName = payload.transaction?.subject_org?.name || "Unknown";
      const esgInfo = extractESG(payload.data_content);

      if (!acc[providerName]) {
        acc[providerName] = {
          provider: providerName,
          sector: esgInfo.sector || payload.transaction?.subject_org?.sector || '',
          scope1: 0,
          scope2: 0,
          scope3: 0,
          total: 0,
          renewable_kwh: 0,
          waste: 0,
          audit_score: 0,
          certifications: [],
          count: 0,
        };
      }

      acc[providerName].scope1 += esgInfo.scope1;
      acc[providerName].scope2 += esgInfo.scope2;
      acc[providerName].scope3 += esgInfo.scope3;
      acc[providerName].total += esgInfo.scope1 + esgInfo.scope2 + esgInfo.scope3;
      acc[providerName].renewable_kwh += esgInfo.renewable_kwh;
      acc[providerName].waste += esgInfo.waste;
      acc[providerName].audit_score += esgInfo.audit_score;
      acc[providerName].count += 1;

      if (esgInfo.certifications.length > 0) {
        acc[providerName].certifications = Array.from(
          new Set([...acc[providerName].certifications, ...esgInfo.certifications])
        );
      }

      return acc;
    }, {} as Record<string, any>);

    // Calculate averages and sort by total emissions
    return Object.values(grouped)
      .map((p: any) => ({
        ...p,
        audit_score: p.count > 0 ? Math.round(p.audit_score / p.count) : 0,
      }))
      .sort((a: any, b: any) => b.total - a.total);
  }, [esgData, activeOrg]);

  const totalEmissions = processedData?.reduce((sum, p) => sum + p.scope3, 0) || 0;
  const auditedProviders = processedData?.length || 0;
  const avgAuditScore =
    auditedProviders > 0
      ? Math.round(processedData!.reduce((sum, p) => sum + p.audit_score, 0) / auditedProviders)
      : 0;
  const totalWaste = processedData?.reduce((sum, p) => sum + p.waste, 0) || 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Hub de Sostenibilidad</h1>
          <p className="text-muted-foreground">
            Analítica ESG y huella de carbono de tu cadena de suministro
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Leaf className="h-4 w-4 text-green-600" />
                Huella Total Alcance 3
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalEmissions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">tCO₂e de proveedores</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Award className="h-4 w-4 text-blue-600" />
                Proveedores Auditados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{auditedProviders}</div>
              <p className="text-xs text-muted-foreground mt-1">Con reporte ESG verificado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-yellow-600" />
                Score de Auditoría
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{avgAuditScore}/100</div>
              <p className="text-xs text-muted-foreground mt-1">Promedio de calidad</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Recycle className="h-4 w-4 text-emerald-600" />
                Residuos Reciclados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalWaste.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground mt-1">toneladas totales</p>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        {isLoading ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-muted-foreground">Cargando datos...</div>
            </CardContent>
          </Card>
        ) : processedData && processedData.length > 0 ? (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Top 5 Emisores</CardTitle>
                  <CardDescription>Mayores contribuidores a huella de carbono (tCO₂e)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={processedData.slice(0, 5)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="provider" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="scope1" fill="hsl(var(--primary))" name="Alcance 1" />
                      <Bar dataKey="scope2" fill="hsl(var(--accent))" name="Alcance 2" />
                      <Bar dataKey="scope3" fill="hsl(var(--destructive))" name="Alcance 3" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribución de Certificaciones</CardTitle>
                  <CardDescription>Proveedores con certificación ISO-14001</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          {
                            name: "Certificados",
                            value: processedData.filter((p) =>
                              p.certifications.some((c: string) => c.includes("ISO"))
                            ).length,
                          },
                          {
                            name: "Sin Certificar",
                            value: processedData.filter(
                              (p) => !p.certifications.some((c: string) => c.includes("ISO"))
                            ).length,
                          },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="hsl(var(--primary))"
                        dataKey="value"
                      >
                        <Cell fill="hsl(var(--primary))" />
                        <Cell fill="hsl(var(--muted))" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Providers Table */}
            <Card>
              <CardHeader>
                <CardTitle>Desglose por Proveedor</CardTitle>
                <CardDescription>Métricas ESG y certificaciones verificadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Proveedor</TableHead>
                        <TableHead>Sector</TableHead>
                        <TableHead>Emisiones Totales</TableHead>
                        <TableHead>Score Auditoría</TableHead>
                        <TableHead>Residuos Reciclados</TableHead>
                        <TableHead>Certificaciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {processedData.map((provider, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-medium">{provider.provider}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{provider.sector || 'General'}</Badge>
                          </TableCell>
                          <TableCell>{provider.total.toFixed(1)} tCO₂e</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                provider.audit_score >= 90
                                  ? "default"
                                  : provider.audit_score >= 70
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              {provider.audit_score}/100
                            </Badge>
                          </TableCell>
                          <TableCell>{provider.waste.toFixed(1)} t</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {provider.certifications.length > 0 ? (
                                provider.certifications.map((cert: string, i: number) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {cert}
                                  </Badge>
                                ))
                              ) : (
                                <span className="text-xs text-muted-foreground">Sin certificar</span>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card>
            <CardContent className="py-12 text-center space-y-4">
              <Leaf className="mx-auto h-12 w-12 text-muted-foreground" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Sin datos ESG disponibles</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Comienza solicitando reportes de emisiones a tus proveedores en el catálogo.
                </p>
                <Button onClick={() => navigate("/catalog")}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Explorar Catálogo
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Sustainability;
