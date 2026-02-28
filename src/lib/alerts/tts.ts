export function speakCityNames(
  cities: string[],
  locale: "en" | "ar"
): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }

  stopSpeaking();

  const text = cities.join(", ");
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = locale === "ar" ? "ar-AE" : "en-US";
  utterance.rate = 0.9;

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }

  window.speechSynthesis.cancel();
}
