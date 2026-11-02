import { describe, expect, it, vi } from 'vitest'
import { buildSessionExports, csvCell, downloadText, sessionToCSV, sessionToGeoJSON, sessionToJSON, sessionsToCSV, sessionsToGeoJSON, sessionsToJSON, slugify } from './exports'
import { defaultCounts, type PointData, type SessionData } from './idb'

const session: SessionData = { id: '00000000-0000-0000-0000-000000000001', ownerId: 'user-a', typeSite: 'Étang', nomSite: 'Bois, test', acronyme: 'BT', debutSession: '2026-08-05T20:00:00Z', finSession: '', compteurPrincipal: 'Alice', autresCompteurs: '', nbPointsEcoute: 1, detecteurs: ['D1'], commentaire: '', createdAt: '2026-08-05T20:00:00Z', updatedAt: '2026-08-05T20:00:00Z', syncedAt: null, dirty: true, lastSyncedRemoteRevision: null, syncError: null }
const point: PointData = { id: 'p1', ownerId: 'user-a', sessionId: session.id, numero: 1, heureDebut: null, heureFin: null, nbEspeces: 0, statut: 'non_demarre', counts: defaultCounts(), localisation: '', commentaire: 'ligne\n2', timerState: null, coordX: 1, coordY: 2, chouetteHulotte: false, updatedAt: session.updatedAt }
const otherSession: SessionData = { ...session, id: '00000000-0000-0000-0000-000000000002', acronyme: 'PC', nomSite: 'Parc' }
const otherPoint: PointData = { ...point, id: 'p2', sessionId: otherSession.id, numero: 1 }

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
  it('exports extra counters as species without tranche rows', () => {
    const counts = defaultCounts()
    counts.oiseaux = { total: 2, trancheHistory: [], species: [{ name: 'Chouette hulotte', count: 2, trancheHistory: [] }] }
    const csv = sessionToCSV(session, [{ ...point, commentaire: '', counts, chouetteHulotte: true }])
    const lines = csv.split('\n')
    expect(lines.find((l) => l.includes(';espece;Oiseaux;Chouette hulotte;2;;1'))).toBeTruthy()
    expect(lines.find((l) => l.includes(';groupe;Oiseaux'))).toBeFalsy()
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

describe('slugify', () => {
  it('strips accents and punctuation for safe filenames', () => {
    expect(slugify('Zoë Müller-Apéro')).toBe('zoe-muller-apero')
    expect(slugify('   ')).toBe('')
  })
})

describe('buildSessionExports', () => {
  it('groups points per session and sorts them by number', () => {
    const shuffled = { ...point, id: 'p3', numero: 3 }
    const exports = buildSessionExports([session, otherSession], [shuffled, otherPoint, point])
    expect(exports.map((entry) => entry.session.id)).toEqual([session.id, otherSession.id])
    expect(exports[0].points.map((p) => p.numero)).toEqual([1, 3])
    expect(exports[1].points).toHaveLength(1)
  })

  it('keeps a session with no point', () => {
    const exports = buildSessionExports([session], [])
    expect(exports).toEqual([{ session, points: [] }])
  })

  it('drops points belonging to an unrelated session', () => {
    const exports = buildSessionExports([session], [{ ...point, sessionId: 'inconnue' }])
    expect(exports[0].points).toEqual([])
  })
})

describe('multi-session exports', () => {
  const entries = buildSessionExports([session, otherSession], [point, otherPoint])
  const user = { id: 'user-a', name: 'Alice' }

  it('emits a single CSV header and one row per session', () => {
    const flat = [point, otherPoint].map((p) => ({ ...p, commentaire: '' }))
    const csv = sessionsToCSV(buildSessionExports([session, otherSession], flat), user)
    const lines = csv.split('\n')
    expect(csv.startsWith('\uFEFF')).toBe(true)
    expect(lines[0].replace(/^\uFEFF/, '')).toBe(sessionToCSV(session, [], user).split('\n')[0].replace(/^\uFEFF/, ''))
    expect(lines).toHaveLength(3)
    expect(lines[1]).toContain(`${session.id};user-a;Alice`)
    expect(lines[2]).toContain(`${otherSession.id};user-a;Alice`)
  })

  it('produces a header-only CSV when there is no data', () => {
    expect(sessionsToCSV([]).split('\n')).toHaveLength(1)
  })

  it('aggregates every session and point into one JSON document', () => {
    const json = JSON.parse(sessionsToJSON(entries, 'now', user))
    expect(json).toMatchObject({ exportedAt: 'now', user: { id: 'user-a', name: 'Alice' } })
    expect(json.sessions.map((s: SessionData) => s.id)).toEqual([session.id, otherSession.id])
    expect(json.points.map((p: PointData) => p.id)).toEqual(['p1', 'p2'])
  })

  it('omits the user when the export has no owner identity', () => {
    expect(JSON.parse(sessionsToJSON(entries, 'now')).user).toBeUndefined()
  })

  it('merges all points into a single Lambert 72 FeatureCollection', () => {
    const geojson = JSON.parse(sessionsToGeoJSON(entries, 'now', user, 'chiro-bxl-alice'))
    expect(geojson.type).toBe('FeatureCollection')
    expect(geojson.name).toBe('chiro-bxl-alice')
    expect(geojson.crs).toEqual({ type: 'name', properties: { name: 'EPSG:31370' } })
    expect(geojson.features.map((f: { id: string }) => f.id)).toEqual(['BT-01', 'PC-01'])
    expect(geojson.features[1].properties).toMatchObject({ session_id: otherSession.id, user: { id: 'user-a', name: 'Alice' } })
  })

  it('defaults the FeatureCollection name', () => {
    expect(JSON.parse(sessionsToGeoJSON(entries)).name).toBe('chiroptere-bxl')
  })
})
