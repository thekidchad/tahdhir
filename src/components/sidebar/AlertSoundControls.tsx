"use client";

import { useTranslations } from "next-intl";
import { useSettingsStore } from "@/stores/settingsStore";
import { alertSoundManager } from "@/lib/alerts/sounds";
import { Checkbox } from "@/components/ui/Checkbox";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { SoundType } from "@/types/settings";

interface AlertSoundControlsProps {
  className?: string;
}

function AlertSoundControls({ className }: AlertSoundControlsProps) {
  const t = useTranslations();
  const soundEnabled = useSettingsStore((s) => s.soundEnabled);
  const soundType = useSettingsStore((s) => s.soundType);
  const volume = useSettingsStore((s) => s.volume);
  const setSoundEnabled = useSettingsStore((s) => s.setSoundEnabled);
  const setSoundType = useSettingsStore((s) => s.setSoundType);

  const soundOptions = [
    { value: "siren", label: t("sounds.siren") },
    { value: "bell", label: t("sounds.bell") },
    { value: "chime", label: t("sounds.chime") },
    { value: "none", label: t("sounds.none") },
  ];

  const handleTest = () => {
    if (soundType === "none") return;
    alertSoundManager.setVolume(volume);
    alertSoundManager.play(soundType);
  };

  return (
    <div className={cn("flex flex-col gap-3 px-4 py-3", className)}>
      <Checkbox
        checked={soundEnabled}
        onChange={setSoundEnabled}
        label={t("sidebar.alertSound")}
      />
      {soundEnabled && (
        <div className="flex items-center gap-2">
          <Select
            options={soundOptions}
            value={soundType}
            onChange={(value) => setSoundType(value as SoundType)}
            className="flex-1"
          />
          <Button variant="secondary" size="sm" onClick={handleTest}>
            {t("sidebar.testSound")}
          </Button>
        </div>
      )}
    </div>
  );
}

export { AlertSoundControls };
