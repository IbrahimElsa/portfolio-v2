"use client";

import { useVisitorNotification } from "@/lib/notify-service";

/** Fires the one-time visitor email notification; renders nothing. */
export default function VisitorPing() {
  useVisitorNotification();
  return null;
}
