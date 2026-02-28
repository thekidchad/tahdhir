"use client";

import { useState, useEffect } from "react";

interface ClockResult {
  time: string;
  date: string;
}

function formatClock(): ClockResult {
  const now = new Date();

  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dubai",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(now);

  const date = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dubai",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(now);

  return { time, date };
}

export function useRealtimeClock(): ClockResult {
  const [clock, setClock] = useState<ClockResult>({ time: "", date: "" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setClock(formatClock());
    const interval = setInterval(() => {
      setClock(formatClock());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return { time: "", date: "" };
  return clock;
}
