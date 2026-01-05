import { useState, useMemo } from "react";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { 
  Bot, 
  BrainCircuit, 
  RefreshCw, 
  ShieldCheck, 
  AlertTriangle,
  TrendingUp,
  Microscope,
  Search,
  Lightbulb,
  Cpu,
  Leaf,
  Link2,
  Zap
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
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { ConceptDetailModal } from "@/components/innovation/ConceptDetailModal";

interface InnovationConcept {
  id: string;
  title: string;
  short_description: string;
  full_analysis: string;
  category: string;
  business_impact: string;
  maturity_level: number | null;
  chart_type: string;
  chart_data: unknown;
  chart_config: unknown;
  created_at: string | null;
}

const CATEGORIES = [
  { id: 'all', label: 'Todos', icon: Lightbulb },
  { id: 'AI', label: 'IA', icon: Bot },
  { id: 'Blockchain', label: 'Blockchain', icon: Link2 },
  { id: 'IoT', label: 'IoT', icon: Cpu },
  { id: 'Sustainability', label: 'Sostenibilidad', icon: Leaf },
];

const CATEGORY_COLORS: Record<string, string> = {
  'AI': 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  'Blockchain': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  'IoT': 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  'Sustainability': 'bg-green-500/10 text-green-600 border-green-500/20',
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'AI': return Bot;
    case 'Blockchain': return Link2;
    case 'IoT': return Cpu;
    case 'Sustainability': return Leaf;
    default: return Lightbulb;
  }
};

export default function InnovationLab() {
  const { activeOrg } = useOrganizationContext();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [qualityScore, setQualityScore] = useState(72);
  
  // --- Estado para búsqueda y filtrado ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedConcept, setSelectedConcept] = useState<InnovationConcept | null>(null);
  
  // --- Estado para el Simulador ---
  const [demandFactor, setDemandFactor] = useState([50]);
  const [supplyVolatility, setSupplyVolatility] = useState([20]);
  const [innovationImpact, setInnovationImpact] = useState([30]);

  // --- Fetch concepts from database ---
  const { data: concepts, isLoading: loadingConcepts } = useQuery({
    queryKey: ['innovation-concepts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('innovation_lab_concepts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []) as InnovationConcept[];
    },
  });

  // --- Filter concepts ---
  const filteredConcepts = useMemo(() => {
    if (!concepts) return [];
    
    return concepts.filter(concept => {
      const matchesSearch = searchQuery === "" || 
        concept.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        concept.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        concept.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || 
        concept.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [concepts, searchQuery, selectedCategory]);

  // --- Lógica del Simulador ---
  const simulationData = useMemo(() => {
    const baseData = [];
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    let previousValue = 1000;

    for (let i = 0; i < 12; i++) {
      const growth = (demandFactor[0] - 50) / 10;
      const volatility = (Math.random() - 0.5) * (supplyVolatility[0] * 5);
      const innovationBoost = i > 5 ? (innovationImpact[0] * i * 2) : 0;

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
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        clearInterval(interval);
        setIsAnalyzing(false);
        setQualityScore(Math.floor(Math.random() * 15) + 80);
        toast.success("Análisis de Inteligencia Artificial completado");
      } else {
        setQualityScore(Math.min(Math.round(progress), 99));
      }
    }, 300);
  };

  const renderConceptChart = (concept: InnovationConcept) => {
    const chartData = concept.chart_data as Array<Record<string, unknown>>;
    const chartConfig = concept.chart_config as Record<string, unknown>;
    
    if (!chartData || chartData.length === 0) return null;

    const CHART_COLORS = ['hsl(var(--primary))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

    switch (concept.chart_type) {
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey={chartConfig?.dataKey as string || 'value'}
                nameKey={chartConfig?.nameKey as string || 'name'}
                cx="50%"
                cy="50%"
                outerRadius={45}
                innerRadius={25}
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'area':
      case 'line':
      default:
        return (
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={`gradient-${concept.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                fill={`url(#gradient-${concept.id})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
    }
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

      <Tabs defaultValue="concepts" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
          <TabsTrigger value="concepts">Conceptos I+D</TabsTrigger>
          <TabsTrigger value="simulator">Simulador</TabsTrigger>
          <TabsTrigger value="quality">AI Auditor</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        {/* --- TAB 0: CONCEPTS --- */}
        <TabsContent value="concepts" className="space-y-6">
          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar conceptos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat.id)}
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {cat.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Concepts Grid */}
          {loadingConcepts ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader>
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full mt-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-[120px] w-full" />
                    <Skeleton className="h-4 w-1/2 mt-4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredConcepts.length === 0 ? (
            <div className="py-16 text-center">
              <Lightbulb className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
              <h3 className="text-lg font-medium">No se encontraron conceptos</h3>
              <p className="text-muted-foreground">
                {searchQuery || selectedCategory !== 'all' 
                  ? "Intenta con otros filtros de búsqueda" 
                  : "Aún no hay conceptos de innovación registrados"}
              </p>
            </div>
          ) : (
            <motion.div 
              layout 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredConcepts.map((concept) => {
                  const CategoryIcon = getCategoryIcon(concept.category);
                  return (
                    <motion.div
                      key={concept.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setSelectedConcept(concept)}
                      className="cursor-pointer"
                    >
                      <Card className="overflow-hidden h-full hover:shadow-lg hover:scale-[1.02] transition-all group">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <CardTitle className="text-base line-clamp-2 group-hover:text-primary transition-colors">
                                {concept.title}
                              </CardTitle>
                            </div>
                            <Badge 
                              variant="outline" 
                              className={`shrink-0 ${CATEGORY_COLORS[concept.category] || ''}`}
                            >
                              <CategoryIcon className="h-3 w-3 mr-1" />
                              {concept.category}
                            </Badge>
                          </div>
                          <CardDescription className="line-clamp-2 mt-1">
                            {concept.short_description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {/* Chart Preview */}
                          <div className="bg-muted/30 rounded-lg p-2">
                            {renderConceptChart(concept)}
                          </div>

                          {/* Maturity Level */}
                          {concept.maturity_level && (
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Madurez</span>
                                <span className="font-medium">Nivel {concept.maturity_level}/5</span>
                              </div>
                              <Progress 
                                value={(concept.maturity_level / 5) * 100} 
                                className="h-1.5"
                              />
                            </div>
                          )}

                          {/* Business Impact */}
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Zap className="h-3 w-3" />
                            <span className="line-clamp-1">{concept.business_impact}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Stats Summary */}
          {concepts && concepts.length > 0 && (
            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t">
              <span>
                Mostrando <strong className="text-foreground">{filteredConcepts.length}</strong> de{" "}
                <strong className="text-foreground">{concepts.length}</strong> conceptos
              </span>
              {(searchQuery || selectedCategory !== 'all') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                >
                  Limpiar filtros
                </Button>
              )}
            </div>
          )}
        </TabsContent>

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

      {/* Concept Detail Modal */}
      <ConceptDetailModal
        isOpen={!!selectedConcept}
        onClose={() => setSelectedConcept(null)}
        concept={selectedConcept}
      />
    </div>
  );
}
