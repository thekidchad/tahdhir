export type AlertSeverity = "critical" | "warning" | "info";
export type AlertStatus = "active" | "expired" | "resolved";
export type EventType =
  | "missile"
  | "drone"
  | "rocket"
  | "explosion"
  | "threat"
  | "other";

export interface Alert {
  id: string;
  title_en: string;
  title_ar: string | null;
  description_en: string | null;
  description_ar: string | null;
  severity: AlertSeverity;
  status: AlertStatus;
  lat: number;
  lng: number;
  radius_km: number;
  event_type: EventType | null;
  source_url: string | null;
  source_text: string | null;
  detected_at: string;
  expires_at: string | null;
  created_at: string;
  alert_cities?: AlertCity[];
}

export interface Region {
  id: string;
  name_en: string;
  name_ar: string;
  code: string;
  center_lat: number;
  center_lng: number;
}

export interface City {
  id: string;
  name_en: string;
  name_ar: string;
  lat: number;
  lng: number;
  region_id: string;
  region?: Region;
}

export interface AlertCity {
  id: string;
  alert_id: string;
  city_id: string;
  region_id: string;
  city?: City;
  region?: Region;
}

export interface ParsedAlert {
  is_alert: boolean;
  severity: AlertSeverity;
  event_type: EventType;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  locations: {
    name_en: string;
    name_ar: string;
    type: "city" | "district" | "landmark" | "address";
  }[];
}
