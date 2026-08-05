import { describe, expect, it, vi } from 'vitest'
import { csvCell, downloadText, sessionToCSV, sessionToJSON } from './exports'
import { defaultCounts, type PointData, type SessionData } from './idb'

const session: SessionData = { id: '00000000-0000-0000-0000-000000000001', ownerId: 'user-a', typeSite: 'Étang', nomSite: 'Bois, test', acronyme: 'BT', debutSession: '2026-08-05T20:00:00Z', finSession: '', compteurPrincipal: 'Alice', autresCompteurs: '', nbPointsEcoute: 1, detecteurs: ['D1'], commentaire: '', createdAt: '2026-08-05T20:00:00Z', updatedAt: '2026-08-05T20:00:00Z', syncedAt: null, dirty: true, lastSyncedRemoteRevision: null, syncError: null }
const point: PointData = { id: 'p1', ownerId: 'user-a', sessionId: session.id, numero: 1, heureDebut: null, heureFin: null, nbEspeces: 0, statut: 'non_demarre', counts: defaultCounts(), localisation: '', commentaire: 'ligne\n2', timerState: null, coordX: 1, coordY: 2, updatedAt: session.updatedAt }

describe('exports', () => {
  it('escapes CSV values', () => expect(csvCell('a,"b"')).toBe('"a,""b"""'))
  it('keeps empty points in CSV without technical sync fields', () => {
    const csv = sessionToCSV(session, [point])
    expect(csv).toContain('BT-01')
    expect(csv).toContain('"Bois, test"')
    expect(csv).not.toContain('lastSyncedRemoteRevision')
  })
  it('creates deterministic JSON when given a date', () => {
    expect(JSON.parse(sessionToJSON(session, [point], 'now'))).toMatchObject({ exportedAt: 'now', session: { id: session.id }, points: [{ id: 'p1' }] })
  })
  it('downloads generated text', () => {
    const create = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:test')
    const revoke = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {})
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {})
    downloadText('data', 'test.csv', 'text/csv')
    expect(create).toHaveBeenCalled()
    expect(click).toHaveBeenCalled()
    expect(revoke).toHaveBeenCalledWith('blob:test')
  })
})
