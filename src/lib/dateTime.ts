export const SOUTH_SUDAN_TIME_ZONE = 'Africa/Juba';

export function getSouthSudanDate(date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: SOUTH_SUDAN_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);

  const value = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${value.year}-${value.month}-${value.day}`;
}

export function formatSouthSudanDateTime(value: string | Date): string {
  return new Date(value).toLocaleString('en-GB', {
    timeZone: SOUTH_SUDAN_TIME_ZONE,
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
