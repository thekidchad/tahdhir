export type SoundType = "siren" | "bell" | "chime" | "none";

export interface UserSettings {
  soundEnabled: boolean;
  soundType: SoundType;
  volume: number;
  notificationsEnabled: boolean;
  ttsEnabled: boolean;
}

export const DEFAULT_SETTINGS: UserSettings = {
  soundEnabled: true,
  soundType: "siren",
  volume: 0.7,
  notificationsEnabled: false,
  ttsEnabled: false,
};
