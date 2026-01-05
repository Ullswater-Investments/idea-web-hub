import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Bot,
  Cpu,
  Leaf,
  Link2,
  Lightbulb,
  TrendingUp,
  Clock,
  Target,
  AlertTriangle,
  Rocket,
  ThumbsUp,
  Zap,
} from "lucide-react";

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

interface ConceptDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  concept: InnovationConcept | null;
}

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

const CHART_COLORS = ['hsl(var(--primary))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

// Simulated metrics based on maturity level
const getSimulatedMetrics = (maturityLevel: number) => {
  const baseROI = 15 + (maturityLevel * 12);
  const timeToMarket = 18 - (maturityLevel * 2);
  const riskLevel = Math.max(1, 5 - maturityLevel);
  
  return {
    roi: `${baseROI}-${baseROI + 20}%`,
    timeToMarket: `${timeToMarket} meses`,
    riskLevel,
  };
};

// Generate projection data
const generateProjectionData = (maturityLevel: number) => {
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  let baseValue = 10 + (maturityLevel * 5);
  
  return months.map((month, index) => {
    const growth = Math.pow(1.15 + (maturityLevel * 0.05), index);
    const value = Math.round(baseValue * growth);
    return { month, adopcion: value, proyeccion: Math.round(value * 1.2) };
  });
};

export function ConceptDetailModal({ isOpen, onClose, concept }: ConceptDetailModalProps) {
  if (!concept) return null;

  const CategoryIcon = getCategoryIcon(concept.category);
  const metrics = getSimulatedMetrics(concept.maturity_level || 1);
  const projectionData = generateProjectionData(concept.maturity_level || 1);
  const chartData = concept.chart_data as Array<Record<string, unknown>>;
  const chartConfig = concept.chart_config as Record<string, unknown>;

  const renderConceptChart = () => {
    if (!chartData || chartData.length === 0) return null;

    switch (concept.chart_type) {
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey={chartConfig?.dataKey as string || 'value'}
                nameKey={chartConfig?.nameKey as string || 'name'}
                cx="50%"
                cy="50%"
                outerRadius={70}
                innerRadius={40}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
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
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="gradientDetail" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                fill="url(#gradientDetail)"
              />
            </AreaChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge 
                  variant="outline" 
                  className={`${CATEGORY_COLORS[concept.category] || ''}`}
                >
                  <CategoryIcon className="h-3 w-3 mr-1" />
                  {concept.category}
                </Badge>
                {concept.maturity_level && (
                  <Badge variant="secondary">
                    Nivel {concept.maturity_level}/5
                  </Badge>
                )}
              </div>
              <DialogTitle className="text-2xl">{concept.title}</DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Executive Summary */}
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Resumen Ejecutivo
            </h4>
            <p className="text-foreground">{concept.short_description}</p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-green-500/5 border-green-500/20">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">ROI Estimado</p>
                  <p className="font-bold text-green-600">{metrics.roi}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-500/5 border-blue-500/20">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Time to Market</p>
                  <p className="font-bold text-blue-600">{metrics.timeToMarket}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-orange-500/5 border-orange-500/20">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Nivel de Riesgo</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-2 w-4 rounded ${
                          level <= metrics.riskLevel 
                            ? 'bg-orange-500' 
                            : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Original Chart */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Datos del Concepto
            </h4>
            <Card>
              <CardContent className="pt-4">
                {renderConceptChart()}
              </CardContent>
            </Card>
          </div>

          {/* Full Analysis */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Análisis Completo
            </h4>
            <div className="bg-muted/30 rounded-lg p-4 text-sm leading-relaxed">
              {concept.full_analysis}
            </div>
          </div>

          {/* Business Impact */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Impacto de Negocio
            </h4>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <p className="text-sm">{concept.business_impact}</p>
              </CardContent>
            </Card>
          </div>

          {/* Adoption Projection Chart */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Proyección de Adopción (12 meses)
            </h4>
            <Card>
              <CardContent className="pt-4">
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={projectionData}>
                    <defs>
                      <linearGradient id="adoptionGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                      formatter={(value: number) => [`${value}%`, 'Adopción']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="adopcion" 
                      stroke="hsl(var(--primary))" 
                      fill="url(#adoptionGradient)"
                      name="Adopción"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Maturity Progress */}
          {concept.maturity_level && (
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Estado de Madurez
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Concepto → Desarrollo → Piloto → Producción → Escalado</span>
                  <span className="font-medium">{concept.maturity_level}/5</span>
                </div>
                <Progress value={(concept.maturity_level / 5) * 100} className="h-2" />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button className="flex-1 gap-2">
              <ThumbsUp className="h-4 w-4" />
              Votar por este concepto
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <Rocket className="h-4 w-4" />
              Solicitar Piloto
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}