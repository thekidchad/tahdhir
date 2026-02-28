"use client";

import { cn } from "@/lib/utils";
import { Clock } from "@/components/sidebar/Clock";
import { LanguageToggle } from "@/components/sidebar/LanguageToggle";
import { AlertSoundControls } from "@/components/sidebar/AlertSoundControls";
import { NotificationSettings } from "@/components/sidebar/NotificationSettings";
import { AlertList } from "@/components/sidebar/AlertList";
import { CitySearch } from "@/components/sidebar/CitySearch";

interface SidebarProps {
  className?: string;
}

function Sidebar({ className }: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-screen w-80 flex-col bg-sidebar",
        className
      )}
    >
      {/* App branding */}
      <div className="flex items-center justify-between border-b border-border-subtle px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-alert-red animate-pulse" />
          <span className="text-lg font-bold text-white tracking-tight">
            Tahdhir
          </span>
          <span className="text-lg font-bold text-text-muted tracking-tight">
            تحذير
          </span>
        </div>
        <LanguageToggle />
      </div>

      <Clock />

      <div className="border-b border-border-subtle">
        <AlertSoundControls />
      </div>

      <div className="border-b border-border-subtle">
        <NotificationSettings />
      </div>

      <CitySearch />

      <AlertList className="flex-1 overflow-hidden" />
    </aside>
  );
}

export { Sidebar };
