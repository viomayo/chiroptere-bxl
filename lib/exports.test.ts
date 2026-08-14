import { describe, expect, it, vi } from 'vitest'
import { csvCell, downloadText, sessionToCSV, sessionToGeoJSON, sessionToJSON } from './exports'
import { defaultCounts, type PointData, type SessionData } from './idb'

const session: SessionData = { id: '00000000-0000-0000-0000-000000000001', ownerId: 'user-a', typeSite: 'Étang', nomSite: 'Bois, test', acronyme: 'BT', debutSession: '2026-08-05T20:00:00Z', finSession: '', compteurPrincipal: 'Alice', autresCompteurs: '', nbPointsEcoute: 1, detecteurs: ['D1'], commentaire: '', createdAt: '2026-08-05T20:00:00Z', updatedAt: '2026-08-05T20:00:00Z', syncedAt: null, dirty: true, lastSyncedRemoteRevision: null, syncError: null }
const point: PointData = { id: 'p1', ownerId: 'user-a', sessionId: session.id, numero: 1, heureDebut: null, heureFin: null, nbEspeces: 0, statut: 'non_demarre', counts: defaultCounts(), localisation: '', commentaire: 'ligne\n2', timerState: null, coordX: 1, coordY: 2, chouetteHulotte: false, updatedAt: session.updatedAt }

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
  it('exports a semicolon-separated UTF-8 file with the tawny owl flag last', () => {
    const csv = sessionToCSV(session, [pointWithSpecies()], { id: 'user-a', name: 'Alice' })
    const lines = csv.split('\n')
    const header = lines[0].replace(/^\uFEFF/, '').split(';')
    expect(csv.startsWith('\uFEFF')).toBe(true)
    expect(header).toEqual(expect.arrayContaining(['session_id', 'user_id', 'user_name']))
    expect(header).toEqual(expect.arrayContaining(['groupe', 'espece', 'total', 'tranches']))
    expect(header.at(-1)).toBe('chouette_hulotte')
    expect(lines[1]).toContain('user-a;Alice')
  })
  it('omits the group row when all species share the same positive tranches', () => {
    const counts = defaultCounts()
    counts.pipistrelles = { total: 4, trancheHistory: [1, 2], species: [{ name: 'Pipistrelle commune', count: 2, trancheHistory: [1, 2] }, { name: 'Pipistrelle de Kuhl', count: 2, trancheHistory: [1, 2] }] }
    const csv = sessionToCSV(session, [{ ...point, counts }], { id: 'user-a', name: 'Alice' })
    const lines = csv.split('\n')
    expect(lines.find((l) => l.includes(';groupe;Pipistrelles'))).toBeFalsy()
    expect(lines.find((l) => l.includes(';espece;Pipistrelles;Pipistrelle commune;2;1|2;0'))).toBeTruthy()
    expect(lines.find((l) => l.includes(';espece;Pipistrelles;Pipistrelle de Kuhl;2;1|2;0'))).toBeTruthy()
  })
  it('keeps the group row when species differ by at least one tranche', () => {
    const counts = defaultCounts()
    counts.pipistrelles = { total: 4, trancheHistory: [1, 2, 3], species: [{ name: 'Pipistrelle commune', count: 2, trancheHistory: [1, 2] }, { name: 'Pipistrelle de Kuhl', count: 2, trancheHistory: [1, 3] }] }
    const csv = sessionToCSV(session, [{ ...point, counts }], { id: 'user-a', name: 'Alice' })
    const lines = csv.split('\n')
    expect(lines.find((l) => l.includes(';groupe;Pipistrelles;;0;'))).toBeTruthy()
    expect(lines.find((l) => l.includes(';espece;Pipistrelles;Pipistrelle commune;2;1|2;0'))).toBeTruthy()
    expect(lines.find((l) => l.includes(';espece;Pipistrelles;Pipistrelle de Kuhl;2;1|3;0'))).toBeTruthy()
  })
  it('keeps the group row for unassigned contacts alongside species rows', () => {
    const csv = sessionToCSV(session, [pointWithSpecies()], { id: 'user-a', name: 'Alice' })
    const lines = csv.split('\n')
    expect(lines.find((l) => l.includes(';groupe;Pipistrelles;;1;4;0'))).toBeTruthy()
    expect(lines.find((l) => l.includes(';espece;Pipistrelles;Pipistrelle commune;3;1|2|3;0'))).toBeTruthy()
  })
  it('clamps the unassigned count to zero but keeps the unassigned tranche', () => {
    const counts = defaultCounts()
    counts.pipistrelles = { total: 1, trancheHistory: [1, 2], species: [{ name: 'Pipistrelle commune', count: 1, trancheHistory: [1] }] }
    const csv = sessionToCSV(session, [{ ...point, counts }], { id: 'user-a', name: 'Alice' })
    const lines = csv.split('\n')
    expect(lines.find((l) => l.includes(';groupe;Pipistrelles;;0;2;0'))).toBeTruthy()
  })
  it('emits the tawny owl flag per point', () => {
    const csv = sessionToCSV(session, [{ ...point, commentaire: '', chouetteHulotte: true }])
    const lines = csv.split('\n')
    expect(lines.find((l) => l.includes(';point;;;0;;1'))).toBeTruthy()
  })
  it('creates deterministic JSON when given a date', () => {
    expect(JSON.parse(sessionToJSON(session, [point], 'now'))).toMatchObject({ exportedAt: 'now', session: { id: session.id }, points: [{ id: 'p1' }] })
  })
  it('adds the user to the JSON export', () => {
    const json = JSON.parse(sessionToJSON(session, [point], 'now', { id: 'user-a', name: 'Alice' }))
    expect(json.user).toEqual({ id: 'user-a', name: 'Alice' })
  })
  it('exports a GeoJSON FeatureCollection in Lambert 72 with raw coordinates', () => {
    const geojson = JSON.parse(sessionToGeoJSON(session, [pointWithSpecies()], 'now', { id: 'user-a', name: 'Alice' }))
    expect(geojson.type).toBe('FeatureCollection')
    expect(geojson.name).toBe('BT-session')
    expect(geojson.crs).toEqual({ type: 'name', properties: { name: 'EPSG:31370' } })
    expect(geojson.features).toHaveLength(1)
    const feature = geojson.features[0]
    expect(feature.type).toBe('Feature')
    expect(feature.id).toBe('BT-01')
    expect(feature.geometry).toEqual({ type: 'Point', coordinates: [1, 2] })
    expect(feature.properties).toMatchObject({
      exportedAt: 'now',
      user: { id: 'user-a', name: 'Alice' },
      session_id: session.id,
      point: 'BT-01',
      chouette_hulotte: false,
    })
  })
  it('embeds group counts in the GeoJSON properties', () => {
    const geojson = JSON.parse(sessionToGeoJSON(session, [pointWithSpecies()], 'now'))
    expect(geojson.features[0].properties.groupes).toEqual({
      pipistrelles: { total: 4, tranches: [1, 2, 3, 4], especes: [{ nom: 'Pipistrelle commune', count: 3, tranches: [1, 2, 3] }] },
    })
  })
  it('emits null geometry for points without coordinates', () => {
    const geojson = JSON.parse(sessionToGeoJSON(session, [{ ...point, coordX: null, coordY: null }]))
    expect(geojson.features[0].geometry).toBeNull()
    expect(geojson.features[0].properties.coord_x).toBeNull()
  })
  it('excludes empty groups from the GeoJSON properties', () => {
    const geojson = JSON.parse(sessionToGeoJSON(session, [point]))
    expect(geojson.features[0].properties.groupes).toEqual({})
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
