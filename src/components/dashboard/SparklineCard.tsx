import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";
import { TrendIndicator } from "@/components/gamification/TrendIndicator";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SparklineCardProps {
  title: string;
  value: string | number;
  data: { value: number; date?: string }[];
  trend?: number;
  icon: LucideIcon;
  iconColor?: string;
  positive?: boolean;
  currency?: boolean;
  className?: string;
}

export const SparklineCard = ({
  title,
  value,
  data,
  trend,
  icon: Icon,
  iconColor = "text-primary",
  positive = true,
  currency = false,
  className
}: SparklineCardProps) => {
  const gradientId = `gradient-${title.replace(/\s/g, '-')}`;
  const chartColor = positive ? "hsl(var(--chart-2))" : "hsl(var(--chart-1))";

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className={cn("relative overflow-hidden", className)}>
        {/* Background Sparkline */}
        <div className="absolute inset-0 opacity-20">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartColor} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={chartColor}
                fill={`url(#${gradientId})`}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <CardHeader className="relative z-10 flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <Icon className={cn("h-5 w-5", iconColor)} />
        </CardHeader>

        <CardContent className="relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="text-3xl font-bold"
          >
            {formatValue(value)}
          </motion.div>
          
          {trend !== undefined && (
            <div className="mt-2">
              <TrendIndicator value={trend} suffix="% esta semana" size="sm" />
            </div>
          )}
        </CardContent>

        {/* Mini sparkline preview at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-12 opacity-60">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <Tooltip 
                contentStyle={{ 
                  background: 'hsl(var(--popover))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(val: number) => [currency ? `€${val.toLocaleString()}` : val, '']}
                labelFormatter={() => ''}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={chartColor}
                fill={`url(#${gradientId})`}
                strokeWidth={1.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
};
