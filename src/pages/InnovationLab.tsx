import { useState, useMemo } from "react";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { 
  Bot, 
  BrainCircuit, 
  RefreshCw, 
  ShieldCheck, 
  AlertTriangle,
  TrendingUp,
  Microscope
} from "lucide-react";
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
  Legend
} from "recharts";

export default function InnovationLab() {
  const { activeOrg } = useOrganizationContext();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [qualityScore, setQualityScore] = useState(72);
  
  // --- Estado para el Simulador ---
  const [demandFactor, setDemandFactor] = useState([50]); // 0-100
  const [supplyVolatility, setSupplyVolatility] = useState([20]); // 0-100
  const [innovationImpact, setInnovationImpact] = useState([30]); // 0-100

  // --- Lógica del Simulador (Generación de datos reactiva) ---
  const simulationData = useMemo(() => {
    const baseData = [];
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    let previousValue = 1000;

    for (let i = 0; i < 12; i++) {
      // Factores de simulación
      const growth = (demandFactor[0] - 50) / 10; // -5% a +5% crecimiento mensual
      const volatility = (Math.random() - 0.5) * (supplyVolatility[0] * 5); // Ruido aleatorio
      const innovationBoost = i > 5 ? (innovationImpact[0] * i * 2) : 0; // Impacto exponencial tras 6 meses

      const newValue = previousValue * (1 + growth / 100) + volatility + innovationBoost;
      previousValue = newValue;

      baseData.push({
        name: months[i],
        proyeccion: Math.round(newValue),
        limite_seguridad: Math.round(newValue * 0.8),
        capacidad_max: Math.round(newValue * 1.2)
      });
    }
    return baseData;
  }, [demandFactor, supplyVolatility, innovationImpact]);

  // --- Simulación de Auditoría AI ---
  const runAiAudit = () => {
    setIsAnalyzing(true);
    setQualityScore(0);
    
    // Simular proceso de carga
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        clearInterval(interval);
        setIsAnalyzing(false);
        setQualityScore(Math.floor(Math.random() * 15) + 80); // Score entre 80-95
        toast.success("Análisis de Inteligencia Artificial completado");
      } else {
        setQualityScore(Math.min(Math.round(progress), 99));
      }
    }, 300);
  };

  return (
    <div className="container py-8 space-y-8 fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Microscope className="h-8 w-8 text-purple-600" />
            Innovation Lab <Badge variant="secondary" className="ml-2 text-xs">BETA</Badge>
          </h2>
          <p className="text-muted-foreground mt-1">
            Entorno experimental para simulación de escenarios y auditoría de datos mediante IA.
          </p>
        </div>
      </div>

      <Tabs defaultValue="simulator" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="simulator">Simulador Predictivo</TabsTrigger>
          <TabsTrigger value="quality">AI Data Auditor</TabsTrigger>
          <TabsTrigger value="insights">Market Insights</TabsTrigger>
        </TabsList>

        {/* --- TAB 1: SIMULADOR --- */}
        <TabsContent value="simulator" className="space-y-4">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Controles */}
            <Card className="lg:col-span-1 h-fit">
              <CardHeader>
                <CardTitle className="text-lg">Variables</CardTitle>
                <CardDescription>Ajusta los parámetros para recalcular la proyección.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Demanda de Mercado</span>
                    <span className="text-muted-foreground">{demandFactor}%</span>
                  </div>
                  <Slider value={demandFactor} onValueChange={setDemandFactor} max={100} step={1} className="[&>span]:bg-blue-600" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Volatilidad Suministro</span>
                    <span className="text-muted-foreground">{supplyVolatility}%</span>
                  </div>
                  <Slider value={supplyVolatility} onValueChange={setSupplyVolatility} max={100} step={1} className="[&>span]:bg-orange-600" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Inversión I+D</span>
                    <span className="text-muted-foreground">{innovationImpact}%</span>
                  </div>
                  <Slider value={innovationImpact} onValueChange={setInnovationImpact} max={100} step={1} className="[&>span]:bg-purple-600" />
                </div>

                <div className="pt-4 p-3 bg-muted/30 rounded-lg border text-xs text-muted-foreground">
                  <p><strong>Nota:</strong> Este modelo utiliza regresión lineal simple con inyección de ruido estocástico basada en los sliders.</p>
                </div>
              </CardContent>
            </Card>

            {/* Gráfico Interactivo */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Proyección de Suministro (12 Meses)
                </CardTitle>
                <CardDescription>Simulación en tiempo real basada en las variables configuradas.</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={simulationData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorProy" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="proyeccion" 
                      stroke="#2563eb" 
                      fillOpacity={1} 
                      fill="url(#colorProy)" 
                      name="Proyección Volumétrica"
                      animationDuration={500}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="capacidad_max" 
                      stroke="#16a34a" 
                      strokeDasharray="5 5"
                      fill="transparent" 
                      name="Capacidad Máxima Teórica"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* --- TAB 2: AI AUDITOR --- */}
        <TabsContent value="quality">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Auditoría de Calidad de Datos</CardTitle>
                <CardDescription>Análisis heurístico de metadatos mediante IA.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-8 space-y-6">
                <div className="relative flex items-center justify-center w-48 h-48">
                  {/* Círculo animado */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="transparent"
                      className="text-muted/20"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="transparent"
                      strokeDasharray={552}
                      strokeDashoffset={552 - (552 * qualityScore) / 100}
                      className={`transition-all duration-1000 ease-out ${
                        isAnalyzing ? "text-blue-500 animate-pulse" : 
                        qualityScore > 80 ? "text-green-500" : 
                        qualityScore > 50 ? "text-yellow-500" : "text-red-500"
                      }`}
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-4xl font-bold">{qualityScore}</span>
                    <span className="text-sm text-muted-foreground">/ 100</span>
                  </div>
                </div>

                <div className="w-full space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Integridad Estructural</span>
                    <span className="font-medium">{isAnalyzing ? "..." : "92%"}</span>
                  </div>
                  <Progress value={isAnalyzing ? 50 : 92} className="h-2" />
                  
                  <div className="flex justify-between text-sm pt-2">
                    <span>Completitud de Metadatos</span>
                    <span className="font-medium">{isAnalyzing ? "..." : "78%"}</span>
                  </div>
                  <Progress value={isAnalyzing ? 30 : 78} className="h-2" />
                </div>

                <Button 
                  size="lg" 
                  className="w-full gap-2" 
                  onClick={runAiAudit} 
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Bot className="mr-2 h-4 w-4" />
                  )}
                  {isAnalyzing ? "Analizando..." : "Ejecutar Auditoría IA"}
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-green-600" /> Puntos Fuertes
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>✅ Esquemas JSON validados correctamente.</p>
                  <p>✅ Políticas ODRL 2.0 bien formadas en el 95% de los activos.</p>
                  <p>✅ Tiempos de respuesta de API dentro del umbral (200ms).</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" /> Áreas de Mejora
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>⚠️ 3 productos carecen de descripción detallada en inglés.</p>
                  <p>⚠️ La frecuencia de actualización de "Inventario" es irregular.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4 flex gap-4 items-start">
                  <BrainCircuit className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-sm">Recomendación de la IA</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Se recomienda activar la validación automática en el endpoint de ingesta para reducir la tasa de error en un 15%.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* --- TAB 3: INSIGHTS --- */}
        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle>Comparativa de Mercado</CardTitle>
              <CardDescription>Rendimiento de {activeOrg?.name} vs Promedio del Sector</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Time-to-Market', empresa: 85, sector: 60 },
                    { name: 'Calidad Datos', empresa: qualityScore, sector: 65 },
                    { name: 'Eficiencia API', empresa: 90, sector: 75 },
                    { name: 'Adopción', empresa: 45, sector: 55 },
                    { name: 'Compliance', empresa: 98, sector: 80 },
                  ]}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                  <Legend />
                  <Bar dataKey="empresa" name="Tu Organización" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="sector" name="Promedio Sector" fill="hsl(var(--muted-foreground))" opacity={0.3} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
