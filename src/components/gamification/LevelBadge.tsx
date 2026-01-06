import { motion } from "framer-motion";
import { Star, Award, Trophy, Crown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface LevelBadgeProps {
  level: number;
  maxLevel?: number;
  progress?: number;
  title?: string;
  className?: string;
  showProgress?: boolean;
  size?: "sm" | "md" | "lg";
}

const levelConfig = [
  { icon: Star, label: "Starter", color: "text-slate-500" },
  { icon: Award, label: "Active", color: "text-blue-500" },
  { icon: Trophy, label: "Pro", color: "text-amber-500" },
  { icon: Crown, label: "Expert", color: "text-purple-500" },
  { icon: Sparkles, label: "Master", color: "text-emerald-500" }
];

export const LevelBadge = ({
  level,
  maxLevel = 5,
  progress = 0,
  title,
  className,
  showProgress = true,
  size = "md"
}: LevelBadgeProps) => {
  const safeLevel = Math.min(Math.max(level, 1), maxLevel);
  const config = levelConfig[safeLevel - 1] || levelConfig[0];
  const Icon = config.icon;

  const sizeClasses = {
    sm: { container: "p-2", icon: "h-4 w-4", text: "text-xs" },
    md: { container: "p-3", icon: "h-5 w-5", text: "text-sm" },
    lg: { container: "p-4", icon: "h-6 w-6", text: "text-base" }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "flex items-center gap-3 bg-card rounded-lg border",
        sizeClasses[size].container,
        className
      )}
    >
      <motion.div
        whileHover={{ rotate: 15, scale: 1.1 }}
        className={cn(
          "flex items-center justify-center rounded-full bg-muted p-2",
          config.color
        )}
      >
        <Icon className={sizeClasses[size].icon} />
      </motion.div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className={cn("font-medium truncate", sizeClasses[size].text)}>
            {title || config.label}
          </span>
          <span className={cn("text-muted-foreground", sizeClasses[size].text)}>
            Nivel {safeLevel}/{maxLevel}
          </span>
        </div>
        
        {showProgress && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-1"
          >
            <Progress value={progress} className="h-1.5" />
            <span className="text-xs text-muted-foreground mt-0.5 block">
              {progress}% al siguiente nivel
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
