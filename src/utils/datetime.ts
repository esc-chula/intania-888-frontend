/**
 * Timezone utilities for handling UTC <-> Bangkok time conversions
 * Bangkok timezone is UTC+7
 */

const BANGKOK_OFFSET_MS = 7 * 60 * 60 * 1000; // 7 hours in milliseconds

/**
 * Converts UTC datetime string to Bangkok time for datetime-local input
 * @param utcDateString - ISO datetime string in UTC (e.g., "2025-10-17T08:00:00.000Z")
 * @returns Formatted datetime string for datetime-local input (e.g., "2025-10-17T15:00")
 */
export function convertUTCToBangkok(utcDateString: string): string {
  const utcDate = new Date(utcDateString);
  const bangkokDate = new Date(utcDate.getTime() + BANGKOK_OFFSET_MS);

  // Format as YYYY-MM-DDTHH:MM for datetime-local input
  return bangkokDate.toISOString().slice(0, 16);
}

/**
 * Converts datetime-local input value (which is in local/Bangkok time) to UTC ISO string
 * Note: datetime-local input values don't include timezone, they're treated as local time
 * @param localDateTimeString - Value from datetime-local input (e.g., "2025-10-17T15:00")
 * @returns ISO datetime string in UTC (e.g., "2025-10-17T08:00:00.000Z")
 */
export function convertBangkokToUTC(localDateTimeString: string): string {
  // datetime-local gives us a string like "2025-10-17T15:00"
  // We need to treat this as Bangkok time and convert to UTC
  const localDate = new Date(localDateTimeString);
  const utcDate = new Date(localDate.getTime() - BANGKOK_OFFSET_MS);

  return utcDate.toISOString();
}
