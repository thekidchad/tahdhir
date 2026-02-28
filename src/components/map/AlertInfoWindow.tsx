"use client";

import { InfoWindow } from "@vis.gl/react-google-maps";
import { useLocale } from "next-intl";
import type { Alert } from "@/types/alert";

interface AlertInfoWindowProps {
  alert: Alert;
  onClose: () => void;
}

const severityConfig = {
  critical: {
    label: "CRITICAL",
    labelAr: "حرج",
    bg: "bg-red-500/15",
    text: "text-red-400",
    border: "border-red-500/30",
    icon: "🔴",
    barColor: "#EF4444",
  },
  warning: {
    label: "WARNING",
    labelAr: "تحذير",
    bg: "bg-orange-500/15",
    text: "text-orange-400",
    border: "border-orange-500/30",
    icon: "🟠",
    barColor: "#F59E0B",
  },
  info: {
    label: "INFO",
    labelAr: "معلومات",
    bg: "bg-yellow-500/15",
    text: "text-yellow-400",
    border: "border-yellow-500/30",
    icon: "🟡",
    barColor: "#FCD34D",
  },
};

const eventTypeLabels: Record<string, { en: string; ar: string; icon: string }> = {
  missile: { en: "Missile Strike", ar: "ضربة صاروخية", icon: "💥" },
  drone: { en: "Drone Threat", ar: "تهديد طائرة مسيرة", icon: "✈️" },
  rocket: { en: "Rocket Attack", ar: "هجوم صاروخي", icon: "🚀" },
  explosion: { en: "Explosion", ar: "انفجار", icon: "💣" },
  threat: { en: "Security Threat", ar: "تهديد أمني", icon: "⚠️" },
  other: { en: "Incident", ar: "حادث", icon: "📍" },
};

function extractCasualties(text: string | null): { dead: number; injured: number } | null {
  if (!text) return null;
  const lower = text.toLowerCase();
  let dead = 0;
  let injured = 0;

  const deathMatch = lower.match(/(\d+)\s*(death|dead|killed|fatality|fatalities)/);
  const injuredMatch = lower.match(/(\d+)\s*(injured|hurt|wound)/);
  if (lower.includes("one death") || lower.includes("one fatality") || lower.includes("1 fatality")) dead = 1;
  if (deathMatch) dead = parseInt(deathMatch[1]);
  if (injuredMatch) injured = parseInt(injuredMatch[1]);

  if (dead === 0 && injured === 0) return null;
  return { dead, injured };
}

function formatTimeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMin = Math.floor((now - then) / 60000);
  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH}h ago`;
  return `${Math.floor(diffH / 24)}d ago`;
}

export default function AlertInfoWindow({ alert, onClose }: AlertInfoWindowProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const config = severityConfig[alert.severity];
  const eventType = alert.event_type ? eventTypeLabels[alert.event_type] || eventTypeLabels.other : null;

  const title = isAr && alert.title_ar ? alert.title_ar : alert.title_en;
  const description = isAr && alert.description_ar ? alert.description_ar : alert.description_en;

  const casualties = extractCasualties(alert.description_en) || extractCasualties(alert.source_text);
  const cities = alert.alert_cities
    ?.map((ac) => (isAr && ac.city?.name_ar ? ac.city.name_ar : ac.city?.name_en))
    .filter(Boolean);

  return (
    <InfoWindow
      position={{ lat: alert.lat, lng: alert.lng }}
      onCloseClick={onClose}
      pixelOffset={[0, -25]}
    >
      <div style={{ background: "#0F1117", color: "#fff", borderRadius: 12, padding: 0, minWidth: "min(300px, 80vw)", maxWidth: "min(360px, 90vw)", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.5)", border: "1px solid #2D3142" }}>
        {/* Severity top bar */}
        <div style={{ height: 4, background: config.barColor, width: "100%" }} />

        <div style={{ padding: "12px 14px" }}>
          {/* Header row: severity + time */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.05em",
              padding: "3px 10px", borderRadius: 20,
              background: alert.severity === "critical" ? "rgba(239,68,68,0.15)" : alert.severity === "warning" ? "rgba(245,158,11,0.15)" : "rgba(252,211,77,0.15)",
              color: config.barColor,
              border: `1px solid ${config.barColor}33`,
            }}>
              {isAr ? config.labelAr : config.label}
            </span>
            <span style={{ fontSize: 12, color: "#EF4444", fontWeight: 500 }}>
              {formatTimeAgo(alert.detected_at)}
            </span>
          </div>

          {/* Title */}
          <h3 style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.3, marginBottom: 8, color: "#fff" }}>
            {title}
          </h3>

          {/* Event type tag */}
          {eventType && (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: "#9CA3AF", marginBottom: 12, background: "#1A1D27", padding: "4px 10px", borderRadius: 6 }}>
              <span>{eventType.icon}</span>
              <span>{isAr ? eventType.ar : eventType.en}</span>
            </div>
          )}

          {/* Casualties banner */}
          {casualties && (casualties.dead > 0 || casualties.injured > 0) && (
            <div style={{
              background: casualties.dead > 0 ? "rgba(239,68,68,0.1)" : "rgba(245,158,11,0.1)",
              border: `1px solid ${casualties.dead > 0 ? "rgba(239,68,68,0.25)" : "rgba(245,158,11,0.25)"}`,
              borderRadius: 8, padding: "8px 12px", marginBottom: 12,
              display: "flex", gap: 16,
            }}>
              {casualties.dead > 0 && (
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 18 }}>☠️</span>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#EF4444", lineHeight: 1 }}>{casualties.dead}</div>
                    <div style={{ fontSize: 10, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {isAr ? "وفاة" : "Dead"}
                    </div>
                  </div>
                </div>
              )}
              {casualties.injured > 0 && (
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 18 }}>🏥</span>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#F59E0B", lineHeight: 1 }}>{casualties.injured}</div>
                    <div style={{ fontSize: 10, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {isAr ? "مصاب" : "Injured"}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          {description && (
            <p style={{ fontSize: 13, lineHeight: 1.5, color: "#9CA3AF", marginBottom: 12 }}>
              {description}
            </p>
          )}

          {/* Affected areas */}
          {cities && cities.length > 0 && (
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 10, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
                {isAr ? "المناطق المتأثرة" : "Affected Areas"}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {cities.map((city, i) => (
                  <span key={i} style={{
                    fontSize: 11, background: "#1A1D27", color: "#D1D5DB",
                    padding: "2px 8px", borderRadius: 4, border: "1px solid #2D3142",
                  }}>
                    {city}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Footer: coordinates + source */}
          <div style={{ borderTop: "1px solid #2D3142", paddingTop: 8, marginTop: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 10, color: "#6B7280", fontFamily: "monospace" }}>
              {alert.lat.toFixed(4)}, {alert.lng.toFixed(4)}
            </span>
            {alert.source_url && (
              <a
                href={alert.source_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 11, color: "#60A5FA", textDecoration: "none" }}
              >
                {isAr ? "المصدر ←" : "Source →"}
              </a>
            )}
          </div>
        </div>
      </div>
    </InfoWindow>
  );
}
