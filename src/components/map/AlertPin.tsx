"use client";

import { AdvancedMarker } from "@vis.gl/react-google-maps";
import type { Alert, AlertSeverity } from "@/types/alert";
import { useAlertStore } from "@/stores/alertStore";

interface AlertPinProps {
  alert: Alert;
  isSelected: boolean;
}

const severityColors: Record<AlertSeverity, { main: string; glow: string }> = {
  critical: { main: "#EF4444", glow: "rgba(239,68,68,0.4)" },
  warning: { main: "#F59E0B", glow: "rgba(245,158,11,0.4)" },
  info: { main: "#FCD34D", glow: "rgba(252,211,77,0.4)" },
};

export default function AlertPin({ alert, isSelected }: AlertPinProps) {
  const selectAlert = useAlertStore((state) => state.selectAlert);
  const isActive = alert.status === "active";
  const colors = isActive ? severityColors[alert.severity] : { main: "#6B7280", glow: "rgba(107,114,128,0.3)" };

  const outerSize = isSelected ? 48 : 32;
  const innerSize = isSelected ? 18 : 12;

  // Short label for the pin
  const shortTitle = alert.title_en.length > 25
    ? alert.title_en.slice(0, 22) + "..."
    : alert.title_en;

  return (
    <AdvancedMarker
      position={{ lat: alert.lat, lng: alert.lng }}
      onClick={() => selectAlert(alert)}
      zIndex={isSelected ? 1000 : alert.severity === "critical" ? 100 : 10}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          filter: isSelected ? `drop-shadow(0 0 12px ${colors.main})` : "none",
        }}
      >
        {/* Pulsating dot */}
        <div
          style={{
            position: "relative",
            width: outerSize,
            height: outerSize,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Outer pulse ring */}
          <div
            style={{
              position: "absolute",
              width: outerSize,
              height: outerSize,
              borderRadius: "50%",
              backgroundColor: colors.main,
              opacity: 0.25,
              animation: isActive
                ? "pulse-alert 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
                : "none",
            }}
          />
          {/* Middle ring */}
          {isActive && alert.severity === "critical" && (
            <div
              style={{
                position: "absolute",
                width: outerSize * 0.7,
                height: outerSize * 0.7,
                borderRadius: "50%",
                border: `2px solid ${colors.main}`,
                opacity: 0.5,
                animation: "pulse-alert 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.5s",
              }}
            />
          )}
          {/* Core dot */}
          <div
            style={{
              position: "relative",
              width: innerSize,
              height: innerSize,
              borderRadius: "50%",
              backgroundColor: colors.main,
              boxShadow: `0 0 ${isSelected ? 16 : 8}px ${colors.glow}, 0 0 ${isSelected ? 32 : 16}px ${colors.glow}`,
              border: "2px solid rgba(255,255,255,0.3)",
            }}
          />
        </div>

        {/* Label below pin */}
        <div
          style={{
            marginTop: 4,
            background: "rgba(15,17,23,0.9)",
            backdropFilter: "blur(4px)",
            border: `1px solid ${colors.main}44`,
            borderRadius: 6,
            padding: "2px 8px",
            maxWidth: 160,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: 10,
            fontWeight: 600,
            color: colors.main,
            textAlign: "center",
            letterSpacing: "0.02em",
          }}
        >
          {shortTitle}
        </div>
      </div>
    </AdvancedMarker>
  );
}
