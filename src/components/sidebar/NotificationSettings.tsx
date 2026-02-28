"use client";

import { useTranslations } from "next-intl";
import { useSettingsStore } from "@/stores/settingsStore";
import { useNotifications } from "@/hooks/useNotifications";
import { Checkbox } from "@/components/ui/Checkbox";
import { cn } from "@/lib/utils";

interface NotificationSettingsProps {
  className?: string;
}

function NotificationSettings({ className }: NotificationSettingsProps) {
  const t = useTranslations();
  const notificationsEnabled = useSettingsStore((s) => s.notificationsEnabled);
  const ttsEnabled = useSettingsStore((s) => s.ttsEnabled);
  const setNotificationsEnabled = useSettingsStore((s) => s.setNotificationsEnabled);
  const setTtsEnabled = useSettingsStore((s) => s.setTtsEnabled);
  const { requestPermission } = useNotifications();

  const handleNotificationsChange = (checked: boolean) => {
    if (checked) {
      requestPermission();
    }
    setNotificationsEnabled(checked);
  };

  return (
    <div className={cn("flex flex-col gap-3 px-4 py-3", className)}>
      <Checkbox
        checked={notificationsEnabled}
        onChange={handleNotificationsChange}
        label={t("sidebar.desktopNotifications")}
        description={t("sidebar.desktopNotificationsDesc")}
      />
      <Checkbox
        checked={ttsEnabled}
        onChange={setTtsEnabled}
        label={t("sidebar.readCityNames")}
        description={t("sidebar.readCityNamesDesc")}
      />
    </div>
  );
}

export { NotificationSettings };
