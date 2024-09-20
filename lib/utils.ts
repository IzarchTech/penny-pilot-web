import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { FirebaseTimestamp } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(data: number, currency = "NGN", lang = "en-NG") {
  return Intl.NumberFormat(lang, {
    style: "currency",
    currency,
  }).format(data);
}

export function formatTime(period: FirebaseTimestamp) {
  if (!period) {
    return "Now";
  }
  return new Date(
    (period.seconds + period.nanoseconds / 1e9) * 1000
  ).toLocaleString(undefined, {
    day: "2-digit",
    year: "numeric",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
