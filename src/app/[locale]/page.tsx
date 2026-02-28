"use client";

import { useState } from "react";
import { useAlerts } from "@/hooks/useAlerts";
import { Sidebar } from "@/components/layout/Sidebar";
import MapContainer from "@/components/map/MapContainer";

export default function DashboardPage() {
  useAlerts();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden relative">
      {/* Mobile hamburger button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-3 left-3 z-50 flex md:hidden items-center justify-center h-10 w-10 rounded-lg bg-sidebar border border-border-subtle shadow-lg"
        aria-label="Open menu"
      >
        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - drawer on mobile, fixed on desktop */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-80 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:transition-none
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar className="flex-shrink-0" onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Map - full width on mobile */}
      <div className="flex-1 h-full">
        <MapContainer />
      </div>
    </div>
  );
}
