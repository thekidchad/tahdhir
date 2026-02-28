import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SoundType, UserSettings } from "@/types/settings";
import { DEFAULT_SETTINGS } from "@/types/settings";

interface SettingsActions {
  setSoundEnabled: (enabled: boolean) => void;
  setSoundType: (soundType: SoundType) => void;
  setVolume: (volume: number) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setTtsEnabled: (enabled: boolean) => void;
}

export const useSettingsStore = create<UserSettings & SettingsActions>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,

      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),

      setSoundType: (soundType) => set({ soundType }),

      setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),

      setNotificationsEnabled: (enabled) =>
        set({ notificationsEnabled: enabled }),

      setTtsEnabled: (enabled) => set({ ttsEnabled: enabled }),
    }),
    {
      name: "tahdhir-settings",
    }
  )
);
