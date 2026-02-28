import { create } from "zustand";
import { useShallow } from "zustand/shallow";
import type { Alert } from "@/types/alert";

interface AlertState {
  alerts: Alert[];
  selectedAlert: Alert | null;
}

interface AlertActions {
  setAlerts: (alerts: Alert[]) => void;
  addAlert: (alert: Alert) => void;
  updateAlert: (alert: Alert) => void;
  selectAlert: (alert: Alert | null) => void;
  clearAlerts: () => void;
}

export const useAlertStore = create<AlertState & AlertActions>((set) => ({
  alerts: [],
  selectedAlert: null,

  setAlerts: (alerts) => set({ alerts }),

  addAlert: (alert) =>
    set((state) => ({
      alerts: [alert, ...state.alerts],
    })),

  updateAlert: (alert) =>
    set((state) => ({
      alerts: state.alerts.map((a) => (a.id === alert.id ? alert : a)),
    })),

  selectAlert: (alert) => set({ selectedAlert: alert }),

  clearAlerts: () => set({ alerts: [], selectedAlert: null }),
}));

export const useActiveAlerts = () =>
  useAlertStore(
    useShallow((state) =>
      state.alerts.filter((alert) => alert.status === "active")
    )
  );
