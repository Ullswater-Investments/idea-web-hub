import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        brand: "border-transparent bg-[hsl(32_94%_54%)] text-white hover:bg-[hsl(32_94%_48%)]",
        brandOutline: "border-[hsl(32_94%_54%)] text-[hsl(32_94%_44%)] dark:text-[hsl(32_90%_60%)] bg-[hsl(32_94%_54%/0.1)]",
        brandSubtle: "border-transparent bg-[hsl(32_80%_92%)] text-[hsl(32_94%_35%)] dark:bg-[hsl(32_30%_20%)] dark:text-[hsl(32_90%_65%)]",
        success: "border-transparent bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
