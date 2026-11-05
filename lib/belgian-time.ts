export const BELGIAN_TIME_ZONE = 'Europe/Brussels'

const DATE_TIME_FORMATTER = new Intl.DateTimeFormat('en-CA', {
  timeZone: BELGIAN_TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
})

function partsToRecord(parts: Intl.DateTimeFormatPart[]): Record<string, string> {
  return Object.fromEntries(parts.map((part) => [part.type, part.value]))
}

/** Décalage de Bruxelles par rapport à UTC, en minutes (60 en hiver, 120 en été). */
export function getBelgianOffsetMinutes(date: Date): number {
  const parts = partsToRecord(DATE_TIME_FORMATTER.formatToParts(date))
  const asUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second),
  )
  return Math.round((asUtc - Math.floor(date.getTime() / 1000) * 1000) / 60000)
}

/** Date ISO 8601 exprimée en heure belge, avec l'offset UTC+1 ou UTC+2. */
export function toBelgianISOString(date: Date = new Date()): string {
  const parts = partsToRecord(DATE_TIME_FORMATTER.formatToParts(date))
  const offset = getBelgianOffsetMinutes(date)
  const sign = offset >= 0 ? '+' : '-'
  const absolute = Math.abs(offset)
  const offsetHours = String(Math.floor(absolute / 60)).padStart(2, '0')
  const offsetMinutes = String(absolute % 60).padStart(2, '0')
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0')
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}.${milliseconds}${sign}${offsetHours}:${offsetMinutes}`
}

/** Normalise une date distante (souvent UTC) vers l'heure belge, ou null si invalide. */
export function normalizeBelgianISOString(value: string | null | undefined): string | null {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return toBelgianISOString(date)
}

export function formatBelgianTime(value: string | null): string {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleTimeString('fr-BE', {
    timeZone: BELGIAN_TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
  })
}
