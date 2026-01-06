import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { TrendIndicator } from "@/components/gamification/TrendIndicator";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ProgressCardProps {
  title: string;
  value: string | number;
  progress: number;
  progressLabel?: string;
  trend?: number;
  icon: LucideIcon;
  iconColor?: string;
  currency?: boolean;
  className?: string;
}

export const ProgressCard = ({
  title,
  value,
  progress,
  progressLabel = "del presupuesto",
  trend,
  icon: Icon,
  iconColor = "text-primary",
  currency = false,
  className
}: ProgressCardProps) => {
  const formatValue = (val: string | number) => {
    if (currency && typeof val === 'number') {
      return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0
      }).format(val);
    }
    return val;
  };

  const getProgressColor = () => {
    if (progress >= 90) return "bg-red-500";
    if (progress >= 70) return "bg-amber-500";
    return "bg-emerald-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className={cn("relative", className)}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <Icon className={cn("h-5 w-5", iconColor)} />
        </CardHeader>

        <CardContent>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold"
          >
            {formatValue(value)}
          </motion.div>

          {/* Progress bar */}
          <div className="mt-3 space-y-1">
            <div className="relative h-2 overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                className={cn("h-full rounded-full", getProgressColor())}
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                {progress}% {progressLabel}
              </span>
              {trend !== undefined && (
                <TrendIndicator value={trend} size="sm" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
