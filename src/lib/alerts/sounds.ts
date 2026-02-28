const SOUND_PATHS: Record<string, string> = {
  siren: "/sounds/alert-siren.mp3",
  bell: "/sounds/alert-bell.mp3",
  chime: "/sounds/alert-chime.mp3",
};

class AlertSoundManager {
  private audio: HTMLAudioElement | null = null;

  play(soundType: string): void {
    const path = SOUND_PATHS[soundType];
    if (!path) {
      console.warn(`Unknown sound type: ${soundType}`);
      return;
    }

    this.stop();
    this.audio = new Audio(path);
    this.audio.play().catch((err) => {
      console.error("Error playing alert sound:", err);
    });
  }

  stop(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
    }
  }

  setVolume(volume: number): void {
    const clamped = Math.max(0, Math.min(1, volume));
    if (this.audio) {
      this.audio.volume = clamped;
    }
  }
}

export const alertSoundManager = new AlertSoundManager();
