"use client";

import { useRealtimeClock } from "@/hooks/useRealtimeClock";
import { cn } from "@/lib/utils";

interface ClockProps {
  className?: string;
}

function Clock({ className }: ClockProps) {
  const { time, date } = useRealtimeClock();

  return (
    <div className={cn("border-b border-border-subtle px-4 py-3 md:py-4", className)}>
      <div className="text-2xl md:text-3xl font-bold tabular-nums tracking-tight text-alert-red">
        {time}
      </div>
      <div className="text-sm text-text-muted">{date}</div>
    </div>
  );
}

export { Clock };
