import { describe, expect, it } from 'vitest'
import { formatBelgianTime, getBelgianOffsetMinutes, normalizeBelgianISOString, toBelgianISOString } from './belgian-time'

describe('belgian-time', () => {
  it('uses UTC+1 en hiver', () => {
    expect(toBelgianISOString(new Date('2026-01-15T12:34:56.789Z'))).toBe('2026-01-15T13:34:56.789+01:00')
    expect(getBelgianOffsetMinutes(new Date('2026-01-15T12:00:00Z'))).toBe(60)
  })

  it('uses UTC+2 en été', () => {
    expect(toBelgianISOString(new Date('2026-07-15T12:34:56.789Z'))).toBe('2026-07-15T14:34:56.789+02:00')
    expect(getBelgianOffsetMinutes(new Date('2026-07-15T12:00:00Z'))).toBe(120)
  })

  it('suit les changements d’heure de mars et d’octobre', () => {
    expect(toBelgianISOString(new Date('2026-03-29T00:59:00Z'))).toBe('2026-03-29T01:59:00.000+01:00')
    expect(toBelgianISOString(new Date('2026-03-29T01:00:00Z'))).toBe('2026-03-29T03:00:00.000+02:00')
    expect(toBelgianISOString(new Date('2026-10-25T00:59:00Z'))).toBe('2026-10-25T02:59:00.000+02:00')
    expect(toBelgianISOString(new Date('2026-10-25T01:00:00Z'))).toBe('2026-10-25T02:00:00.000+01:00')
  })

  it('normalise une date distante vers l’heure belge', () => {
    expect(normalizeBelgianISOString('2026-08-05T20:00:00+00:00')).toBe('2026-08-05T22:00:00.000+02:00')
    expect(normalizeBelgianISOString('2026-01-15T12:00:00Z')).toBe('2026-01-15T13:00:00.000+01:00')
    expect(normalizeBelgianISOString(null)).toBeNull()
    expect(normalizeBelgianISOString('not-a-date')).toBeNull()
  })

  it('affiche une heure belge ou un tiret si la valeur est absente', () => {
    expect(formatBelgianTime('2026-08-05T20:00:00.000Z')).toBe('22:00')
    expect(formatBelgianTime(null)).toBe('—')
    expect(formatBelgianTime('not-a-date')).toBe('—')
  })
})
