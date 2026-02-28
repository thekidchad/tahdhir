"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useAlertStore } from "@/stores/alertStore";
import { AlertCard } from "@/components/sidebar/AlertCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";

interface AlertListProps {
  className?: string;
}

function AlertList({ className }: AlertListProps) {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const alerts = useAlertStore((s) => s.alerts);
  const clearAlerts = useAlertStore((s) => s.clearAlerts);

  return (
    <div className={cn("flex flex-1 flex-col overflow-hidden", className)}>
      <div className="flex items-center justify-between bg-alert-red/10 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white">
            {t("sidebar.alertsTitle")}
          </span>
          <Badge variant="critical">{alerts.length}</Badge>
        </div>
        <a
          href="/archive"
          className="text-xs text-alert-red transition-colors hover:text-alert-red/80"
        >
          {t("sidebar.fullArchive")}
        </a>
      </div>

      <div className="sidebar-scroll flex-1 overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
            <p className="text-sm text-text-muted">{t("sidebar.noAlerts")}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 p-3">
            {alerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} locale={locale} />
            ))}
          </div>
        )}
      </div>

      {alerts.length > 0 && (
        <div className="border-t border-border-subtle px-4 py-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAlerts}
            className="w-full"
          >
            {t("sidebar.clearAll")}
          </Button>
        </div>
      )}
    </div>
  );
}

export { AlertList };
