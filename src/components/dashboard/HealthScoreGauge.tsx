import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ScoreRing } from "@/components/gamification/ScoreRing";
import { Badge } from "@/components/ui/badge";
import { Award, TrendingUp, Leaf, Database } from "lucide-react";
import { cn } from "@/lib/utils";

interface HealthScoreGaugeProps {
  dataQuality: number;
  sustainability: number;
  activity: number;
  className?: string;
}

export const HealthScoreGauge = ({
  dataQuality,
  sustainability,
  activity,
  className
}: HealthScoreGaugeProps) => {
  // Calculate overall score (weighted average)
  const overallScore = Math.round(
    (dataQuality * 0.35) + (sustainability * 0.35) + (activity * 0.30)
  );

  const isExcellent = overallScore >= 80;

  const metrics = [
    { label: "Datos", value: dataQuality, icon: Database, color: "text-blue-500" },
    { label: "ESG", value: sustainability, icon: Leaf, color: "text-emerald-500" },
    { label: "Actividad", value: activity, icon: TrendingUp, color: "text-amber-500" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={cn(
        "relative overflow-hidden transition-all duration-500",
        isExcellent && "ring-2 ring-emerald-500/30 shadow-[0_0_30px_-5px_hsl(var(--chart-2))]",
        className
      )}>
        {/* Glow effect for excellent scores */}
        {isExcellent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none"
          />
        )}

        <CardHeader className="relative z-10 pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Salud del Ecosistema
            </CardTitle>
            {isExcellent && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
              >
                <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                  <Award className="h-3 w-3 mr-1" />
                  Excelencia Operativa
                </Badge>
              </motion.div>
            )}
          </div>
        </CardHeader>

        <CardContent className="relative z-10">
          <div className="flex items-center gap-6">
            {/* Main Score Ring */}
            <ScoreRing
              score={overallScore}
              size={100}
              strokeWidth={10}
              label="Score"
              glowOnHigh={true}
            />

            {/* Individual Metrics */}
            <div className="flex-1 space-y-3">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <metric.icon className={cn("h-4 w-4", metric.color)} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{metric.label}</span>
                      <span className="font-medium">{metric.value}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden mt-1">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.value}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                        className={cn(
                          "h-full rounded-full",
                          metric.value >= 80 ? "bg-emerald-500" :
                          metric.value >= 50 ? "bg-amber-500" :
                          "bg-red-500"
                        )}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
