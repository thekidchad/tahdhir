"use client";

import { useState, useCallback, useEffect } from "react";
import type { Alert } from "@/types/alert";

export function useNotifications() {
  const [permission, setPermission] =
    useState<NotificationPermission>("default");

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return;
    }

    const result = await Notification.requestPermission();
    setPermission(result);
  }, []);

  const showNotification = useCallback(
    (alert: Alert) => {
      if (typeof window === "undefined" || !("Notification" in window)) {
        return;
      }

      if (permission !== "granted") {
        return;
      }

      const cityNames = alert.alert_cities
        ?.map((ac) => ac.city?.name_en)
        .filter(Boolean)
        .join(", ");

      new Notification(alert.title_en, {
        body: cityNames
          ? `Areas affected: ${cityNames}`
          : (alert.description_en ?? undefined),
        icon: "/icons/alert-icon.png",
        tag: alert.id,
      });
    },
    [permission]
  );

  return {
    permission,
    requestPermission,
    showNotification,
  };
}
