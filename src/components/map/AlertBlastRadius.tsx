"use client";

import { useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import type { Alert, AlertSeverity } from "@/types/alert";

interface AlertBlastRadiusProps {
  alert: Alert;
}

const severityColors: Record<AlertSeverity, string> = {
  critical: "#EF4444",
  warning: "#F59E0B",
  info: "#FCD34D",
};

export default function AlertBlastRadius({ alert }: AlertBlastRadiusProps) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const color = alert.status === "active" ? severityColors[alert.severity] : "#6B7280";

    const circle = new google.maps.Circle({
      map,
      center: { lat: alert.lat, lng: alert.lng },
      radius: alert.radius_km * 1000,
      fillColor: color,
      fillOpacity: 0.1,
      strokeColor: color,
      strokeOpacity: 0.3,
      strokeWeight: 1,
      clickable: false,
    });

    return () => {
      circle.setMap(null);
    };
  }, [map, alert]);

  return null;
}
