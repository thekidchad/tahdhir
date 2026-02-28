"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAlertStore } from "@/stores/alertStore";
import type { Alert } from "@/types/alert";

export function useAlerts() {
  const setAlerts = useAlertStore((state) => state.setAlerts);
  const addAlert = useAlertStore((state) => state.addAlert);
  const updateAlert = useAlertStore((state) => state.updateAlert);

  useEffect(() => {
    const fetchAlerts = async () => {
      const since = new Date();
      since.setHours(since.getHours() - 24);

      const { data, error } = await supabase
        .from("alerts")
        .select(
          `
          *,
          alert_cities(
            *,
            city:cities(*),
            region:regions(*)
          )
        `
        )
        .gte("detected_at", since.toISOString())
        .order("detected_at", { ascending: false });

      if (error) {
        console.error("Error fetching alerts:", error);
        return;
      }

      if (data) {
        setAlerts(data as Alert[]);
      }
    };

    fetchAlerts();

    const channel = supabase
      .channel("alerts-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "alerts" },
        (payload) => {
          addAlert(payload.new as Alert);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "alerts" },
        (payload) => {
          updateAlert(payload.new as Alert);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [setAlerts, addAlert, updateAlert]);
}
