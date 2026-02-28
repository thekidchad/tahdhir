"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "critical" | "warning" | "info" | "active" | "expired";

interface BadgeProps {
  variant: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  critical: "bg-alert-red/20 text-alert-red border border-alert-red/30",
  warning: "bg-alert-orange/20 text-alert-orange border border-alert-orange/30",
  info: "bg-alert-yellow/20 text-alert-yellow border border-alert-yellow/30",
  active: "bg-alert-green/20 text-alert-green border border-alert-green/30",
  expired: "bg-zinc-700/50 text-zinc-400 border border-zinc-600/30",
};

function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export { Badge };
export type { BadgeProps, BadgeVariant };
