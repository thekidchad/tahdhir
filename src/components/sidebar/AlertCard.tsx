"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { useAlertStore } from "@/stores/alertStore";
import type { Alert, AlertSeverity } from "@/types/alert";

interface AlertCardProps {
  alert: Alert;
  locale: "en" | "ar";
}

const severityBorderColors: Record<AlertSeverity, string> = {
  critical: "border-alert-red",
  warning: "border-alert-orange",
  info: "border-alert-yellow",
};

const severityBadgeVariant: Record<AlertSeverity, "critical" | "warning" | "info"> = {
  critical: "critical",
  warning: "warning",
  info: "info",
};

function getRelativeTime(dateString: string): string {
  const now = new Date();
  const detected = new Date(dateString);
  const diffMs = now.getTime() - detected.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  return `${diffHours}h ago`;
}

function AlertCard({ alert, locale }: AlertCardProps) {
  const selectAlert = useAlertStore((s) => s.selectAlert);

  const title = locale === "ar" && alert.title_ar ? alert.title_ar : alert.title_en;

  const cityNames = alert.alert_cities
    ?.map((ac) =>
      locale === "ar" && ac.city?.name_ar ? ac.city.name_ar : ac.city?.name_en
    )
    .filter(Boolean)
    .join(", ");

  return (
    <div
      onClick={() => selectAlert(alert)}
      className={cn(
        "cursor-pointer rounded-lg border-l-4 bg-card p-3 transition-colors hover:bg-card-hover animate-slide-in",
        severityBorderColors[alert.severity]
      )}
    >
      <div className="flex items-center justify-between">
        <Badge variant={severityBadgeVariant[alert.severity]}>
          {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
        </Badge>
        <span className="text-xs text-alert-red">
          {getRelativeTime(alert.detected_at)}
        </span>
      </div>
      <div className="mt-1.5 text-sm font-medium text-white">{title}</div>
      {cityNames && (
        <div className="mt-1 text-xs text-text-muted">{cityNames}</div>
      )}
    </div>
  );
}

export { AlertCard };
export type { AlertCardProps };
