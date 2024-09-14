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
    day: "2-digit",
    year: "numeric",
    month: "numeric",
  });
}
