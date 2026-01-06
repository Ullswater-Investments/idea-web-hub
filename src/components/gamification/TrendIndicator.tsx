import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TrendIndicatorProps {
  value: number;
  suffix?: string;
  className?: string;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
}

export const TrendIndicator = ({ 
  value, 
  suffix = "%", 
  className,
  showIcon = true,
  size = "md"
}: TrendIndicatorProps) => {
  const isPositive = value > 0;
  const isNeutral = value === 0;
  
  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base font-medium"
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex items-center gap-1",
        isPositive ? "text-emerald-600 dark:text-emerald-400" : 
        isNeutral ? "text-muted-foreground" : 
        "text-red-600 dark:text-red-400",
        sizeClasses[size],
        className
      )}
    >
      {showIcon && (
        isPositive ? <TrendingUp className={iconSizes[size]} /> :
        isNeutral ? <Minus className={iconSizes[size]} /> :
        <TrendingDown className={iconSizes[size]} />
      )}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {isPositive ? "+" : ""}{value.toFixed(1)}{suffix}
      </motion.span>
    </motion.div>
  );
};
