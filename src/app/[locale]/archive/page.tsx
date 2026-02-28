"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { supabase } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/routing";
import type { Alert } from "@/types/alert";

export default function ArchivePage() {
  const t = useTranslations();
  const locale = useLocale();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 20;

  useEffect(() => {
    async function fetchAlerts() {
      setLoading(true);
      const offset = (page - 1) * limit;
      const { data, count } = await supabase
        .from("alerts")
        .select("*, alert_cities(*, city:cities(*), region:regions(*))", {
          count: "exact",
        })
        .order("detected_at", { ascending: false })
        .range(offset, offset + limit - 1);

      if (data) setAlerts(data as Alert[]);
      if (count !== null) setTotalCount(count);
      setLoading(false);
    }
    fetchAlerts();
  }, [page]);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{t("archive.title")}</h1>
            <p className="text-text-muted text-sm mt-1">
              {totalCount} alerts total
            </p>
          </div>
          <Link href="/">
            <Button variant="secondary" size="sm">
              {t("archive.back")}
            </Button>
          </Link>
        </div>

        {/* Table */}
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-16 bg-card rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : alerts.length === 0 ? (
          <div className="text-center py-20 text-text-muted">
            {t("archive.noAlerts")}
          </div>
        ) : (
          <div className="space-y-2">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-card rounded-lg p-4 flex items-start gap-4 border border-border-subtle"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={alert.severity}>{alert.severity}</Badge>
                    <Badge variant={alert.status === "active" ? "active" : "expired"}>
                      {alert.status}
                    </Badge>
                    <span className="text-alert-red text-xs">
                      {new Date(alert.detected_at).toLocaleString(
                        locale === "ar" ? "ar-AE" : "en-US",
                        { timeZone: "Asia/Dubai" }
                      )}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-white">
                    {locale === "ar" && alert.title_ar
                      ? alert.title_ar
                      : alert.title_en}
                  </p>
                  <p className="text-xs text-text-muted mt-1">
                    {locale === "ar" && alert.description_ar
                      ? alert.description_ar
                      : alert.description_en}
                  </p>
                  {alert.alert_cities && alert.alert_cities.length > 0 && (
                    <p className="text-xs text-text-muted mt-1">
                      {alert.alert_cities
                        .map((ac) =>
                          locale === "ar" && ac.city?.name_ar
                            ? ac.city.name_ar
                            : ac.city?.name_en
                        )
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <Button
              variant="secondary"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <span className="flex items-center text-sm text-text-muted px-4">
              {page} / {totalPages}
            </span>
            <Button
              variant="secondary"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
