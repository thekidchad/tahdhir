"use client";

import { APIProvider, Map, ColorScheme } from "@vis.gl/react-google-maps";
import { useAlertStore, useActiveAlerts } from "@/stores/alertStore";
import AlertPin from "./AlertPin";
import AlertBlastRadius from "./AlertBlastRadius";
import AlertInfoWindow from "./AlertInfoWindow";

const DUBAI_CENTER = { lat: 25.2048, lng: 55.2708 };

export default function MapContainer() {
  const activeAlerts = useActiveAlerts();
  const selectedAlert = useAlertStore((state) => state.selectedAlert);
  const selectAlert = useAlertStore((state) => state.selectAlert);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
      <Map
        className="w-full h-full"
        defaultCenter={DUBAI_CENTER}
        defaultZoom={9}
        colorScheme={ColorScheme.DARK}
        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || "DEMO_MAP_ID"}
        disableDefaultUI={true}
        zoomControl={true}
        scrollwheel={true}
      >
        {activeAlerts.map((alert) => (
          <AlertPin
            key={alert.id}
            alert={alert}
            isSelected={selectedAlert?.id === alert.id}
          />
        ))}

        {activeAlerts.map((alert) => (
          <AlertBlastRadius key={`radius-${alert.id}`} alert={alert} />
        ))}

        {selectedAlert && (
          <AlertInfoWindow
            alert={selectedAlert}
            onClose={() => selectAlert(null)}
          />
        )}
      </Map>
    </APIProvider>
  );
}
