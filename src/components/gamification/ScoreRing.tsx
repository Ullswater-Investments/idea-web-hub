import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScoreRingProps {
  score: number;
  maxScore?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showLabel?: boolean;
  label?: string;
  glowOnHigh?: boolean;
  highThreshold?: number;
}

export const ScoreRing = ({
  score,
  maxScore = 100,
  size = 120,
  strokeWidth = 10,
  className,
  showLabel = true,
  label,
  glowOnHigh = true,
  highThreshold = 80
}: ScoreRingProps) => {
  const percentage = Math.min((score / maxScore) * 100, 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  
  const isHigh = score >= highThreshold;
  
  const getColor = () => {
    if (percentage >= 80) return "hsl(var(--chart-2))"; // Green
    if (percentage >= 50) return "hsl(var(--chart-4))"; // Yellow/Orange
    return "hsl(var(--destructive))"; // Red
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={cn(
            glowOnHigh && isHigh && "drop-shadow-[0_0_8px_hsl(var(--chart-2))]"
          )}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className={cn(
            "font-bold",
            size >= 100 ? "text-2xl" : size >= 60 ? "text-lg" : "text-sm"
          )}
        >
          {Math.round(score)}
        </motion.span>
        {showLabel && label && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xs text-muted-foreground"
          >
            {label}
          </motion.span>
        )}
      </div>
    </div>
  );
};
