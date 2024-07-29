import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(data: number, currency = "NGN", lang = "en-NG") {
  return Intl.NumberFormat(lang, {
    style: "currency",
    currency,
  }).format(data);
}

export function formatTime(period: number) {
  return new Date(period).toLocaleString(undefined, {
    weekday: "long",
    day: "numeric",
    year: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}
