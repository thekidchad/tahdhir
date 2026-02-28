"use client";

import { useAlerts } from "@/hooks/useAlerts";
import { Sidebar } from "@/components/layout/Sidebar";
import MapContainer from "@/components/map/MapContainer";

export default function DashboardPage() {
  useAlerts();

  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden">
      {/* Left: Sidebar */}
      <Sidebar className="flex-shrink-0" />

      {/* Right: Map */}
      <div className="flex-1">
        <MapContainer />
      </div>
    </div>
  );
}
