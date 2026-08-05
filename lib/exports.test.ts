import { describe, expect, it, vi } from 'vitest'
import { csvCell, downloadText, sessionToCSV, sessionToJSON } from './exports'
import { defaultCounts, type PointData, type SessionData } from './idb'

const session: SessionData = { id: '00000000-0000-0000-0000-000000000001', ownerId: 'user-a', typeSite: 'Étang', nomSite: 'Bois, test', acronyme: 'BT', debutSession: '2026-08-05T20:00:00Z', finSession: '', compteurPrincipal: 'Alice', autresCompteurs: '', nbPointsEcoute: 1, detecteurs: ['D1'], commentaire: '', createdAt: '2026-08-05T20:00:00Z', updatedAt: '2026-08-05T20:00:00Z', syncedAt: null, dirty: true, lastSyncedRemoteRevision: null, syncError: null }
const point: PointData = { id: 'p1', ownerId: 'user-a', sessionId: session.id, numero: 1, heureDebut: null, heureFin: null, nbEspeces: 0, statut: 'non_demarre', counts: defaultCounts(), localisation: '', commentaire: 'ligne\n2', timerState: null, coordX: 1, coordY: 2, updatedAt: session.updatedAt }

function pointWithSpecies(): PointData {
  const counts = defaultCounts()
  counts.pipistrelles = { total: 4, trancheHistory: [1, 2, 3, 4], species: [{ name: 'Pipistrelle commune', count: 3, trancheHistory: [1, 2, 3] }] }
  return { ...point, counts }
}

describe('exports', () => {
  it('escapes CSV values', () => expect(csvCell('a,"b"')).toBe('"a,""b"""'))
  it('keeps empty points in CSV without technical sync fields', () => {
    const csv = sessionToCSV(session, [point])
    expect(csv).toContain('BT-01')
    expect(csv).toContain('"Bois, test"')
    expect(csv).not.toContain('lastSyncedRemoteRevision')
  })
  it('limits the group row to unassigned contacts alongside species rows and includes the user', () => {
    const csv = sessionToCSV(session, [pointWithSpecies()], { id: 'user-a', name: 'Alice' })
    const lines = csv.split('\n')
    expect(lines[0].split(',')).toEqual(expect.arrayContaining(['session_id', 'user_id', 'user_name']))
    expect(lines[0].split(',')).toEqual(expect.arrayContaining(['groupe', 'espece', 'total', 'tranches']))
    expect(lines[1]).toContain('user-a,Alice')
    expect(lines.find((l) => l.includes(',groupe,Pipistrelles,,1,4'))).toBeTruthy()
    expect(lines.find((l) => l.includes(',espece,Pipistrelles,Pipistrelle commune,3,1|2|3'))).toBeTruthy()
  })
  it('keeps the group row when species exceed the group total and clamps to zero', () => {
    const counts = defaultCounts()
    counts.pipistrelles = { total: 1, trancheHistory: [1], species: [{ name: 'Pipistrelle commune', count: 1, trancheHistory: [1] }, { name: 'Pipistrelle de Kuhl', count: 1, trancheHistory: [1] }] }
    const csv = sessionToCSV(session, [{ ...point, counts }], { id: 'user-a', name: 'Alice' })
    const lines = csv.split('\n')
    const groupRow = lines.find((l) => l.includes(',groupe,Pipistrelles,,0,'))
    expect(groupRow).toBeTruthy()
    expect(lines.find((l) => l.includes(',espece,Pipistrelles,Pipistrelle commune,1,1'))).toBeTruthy()
    expect(lines.find((l) => l.includes(',espece,Pipistrelles,Pipistrelle de Kuhl,1,1'))).toBeTruthy()
  })
  it('creates deterministic JSON when given a date', () => {
    expect(JSON.parse(sessionToJSON(session, [point], 'now'))).toMatchObject({ exportedAt: 'now', session: { id: session.id }, points: [{ id: 'p1' }] })
  })
  it('adds the user to the JSON export', () => {
    const json = JSON.parse(sessionToJSON(session, [point], 'now', { id: 'user-a', name: 'Alice' }))
    expect(json.user).toEqual({ id: 'user-a', name: 'Alice' })
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
