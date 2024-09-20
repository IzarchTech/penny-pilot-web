import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { FirebaseTimestamp } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a currency value with a given currency and language.
 *
 * @param data - The number to format.
 * @param currency - The currency to use. Defaults to "NGN".
 * @param lang - The language to use. Defaults to "en-NG".
 *
 * @returns The formatted currency string.
 */
export function formatCurrency(data: number, currency = "NGN", lang = "en-NG") {
  return Intl.NumberFormat(lang, {
    style: "currency",
    currency,
  }).format(data);
}

/**
 * Format a Firestore Timestamp as a string.
 *
 * If the timestamp is `null` or `undefined`, returns "Now".
 *
 * @param period - The Firestore Timestamp to format.
 *
 * @throws {Error} If the provided timestamp is not a valid date.
 *
 * @returns The formatted timestamp string.
 */
export function formatTime(period: FirebaseTimestamp | null | undefined) {
  if (!period) {
    return "Now";
  }
  const date = new Date(
    (period.seconds + period.nanoseconds / 1e9) * 1000
  );
  if (Number.isNaN(date.getTime())) {
    throw new Error(
      `Provided timestamp is not a valid date: ${JSON.stringify(period)}`
    );
  }
  return date.toLocaleString(undefined, {
    day: "2-digit",
    year: "numeric",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
