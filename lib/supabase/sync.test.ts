import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { PointData, SessionData } from '@/lib/idb'

const mocks = vi.hoisted(() => ({
  getSessions: vi.fn(),
  getPointsBySession: vi.fn(),
  getSessionById: vi.fn(),
  getTombstones: vi.fn(),
  saveSession: vi.fn(),
  removeTombstone: vi.fn(),
  saveTombstone: vi.fn(),
  saveRemoteSession: vi.fn(),
  saveRemotePoint: vi.fn(),
  clearRemoteData: vi.fn(),
  rpc: vi.fn(),
  deleteEq: vi.fn(),
  orderSessions: vi.fn(),
  orderPoints: vi.fn(),
  snapshot: vi.fn(),
  profilesIn: vi.fn(),
}))

vi.mock('@/lib/idb', async (importOriginal) => ({
  ...await importOriginal<typeof import('@/lib/idb')>(),
  getSessions: mocks.getSessions,
  getPointsBySession: mocks.getPointsBySession,
  getSessionById: mocks.getSessionById,
  getTombstones: mocks.getTombstones,
  saveSession: mocks.saveSession,
  removeTombstone: mocks.removeTombstone,
  saveTombstone: mocks.saveTombstone,
  saveRemoteSession: mocks.saveRemoteSession,
  saveRemotePoint: mocks.saveRemotePoint,
  clearRemoteData: mocks.clearRemoteData,
}))

vi.mock('./client', () => ({
  createClient: () => ({
    rpc: mocks.rpc,
    from: (table: string) => {
      if (table === 'profiles') return { select: () => ({ in: mocks.profilesIn }) }
      if (table === 'observations') return { select: () => ({ eq: () => ({ data: [], error: null }) }) }
      if (table === 'points') return { select: () => ({ eq: () => ({ order: mocks.orderPoints }) }) }
      return {
        delete: () => ({ eq: mocks.deleteEq }),
        select: () => ({
          eq: () => ({ single: mocks.snapshot, order: mocks.orderSessions }),
          order: mocks.orderSessions,
        }),
      }
    },
  }),
}))

import { buildLocalSnapshot, buildSyncConflict, clearStoredConflicts, deleteSessionFromSupabase, getStoredConflicts, mapSessionRow, pullAllSessionsForSupervisor, pullMySessions, rebuildCounts, resolveConflict, syncAll } from './sync'
import { defaultCounts } from '@/lib/idb'

const session: SessionData = { id: '00000000-0000-0000-0000-000000000001', ownerId: 'a', typeSite: 'Parc', nomSite: 'Test', acronyme: 'T', debutSession: '2026-08-05T20:00:00Z', finSession: '', compteurPrincipal: 'Alice', autresCompteurs: '', nbPointsEcoute: 1, detecteurs: [], commentaire: '', createdAt: '2026-08-05T20:00:00Z', updatedAt: '2026-08-05T21:00:00Z', syncedAt: '2026-08-05T20:30:00Z', dirty: true, lastSyncedRemoteRevision: 4, syncError: null }
const point: PointData = { id: `${session.id}-p1`, ownerId: 'a', sessionId: session.id, numero: 1, heureDebut: null, heureFin: null, nbEspeces: 0, statut: 'non_demarre', counts: defaultCounts(), localisation: '', commentaire: '', timerState: null, coordX: null, coordY: null, chouetteHulotte: false, updatedAt: session.updatedAt }

describe('snapshot synchronization', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    mocks.getSessions.mockResolvedValue([session])
    mocks.getPointsBySession.mockResolvedValue([point])
    mocks.getSessionById.mockResolvedValue(session)
    mocks.getTombstones.mockResolvedValue([])
    mocks.rpc.mockResolvedValue({ data: { status: 'ok', revision: 5 }, error: null })
    mocks.deleteEq.mockResolvedValue({ error: null })
    mocks.orderSessions.mockResolvedValue({ data: [], error: null })
    mocks.orderPoints.mockResolvedValue({ data: [], error: null })
    mocks.snapshot.mockResolvedValue({ data: null, error: null })
    mocks.profilesIn.mockResolvedValue({ data: [], error: null })
    mocks.saveRemoteSession.mockResolvedValue(undefined)
    mocks.saveRemotePoint.mockResolvedValue(undefined)
    mocks.clearRemoteData.mockResolvedValue(undefined)
  })

  it('pushes dirty point snapshots even with no observations', async () => {
    const result = await syncAll('a')
    expect(result.synced).toBe(1)
    expect(mocks.rpc).toHaveBeenCalledWith('sync_session_snapshot', expect.objectContaining({
      p_expected_revision: 4,
      p_force: false,
      p_snapshot: expect.objectContaining({ observations: [] }),
    }))
    expect(mocks.saveSession).toHaveBeenCalledWith(expect.objectContaining({ dirty: false, lastSyncedRemoteRevision: 5 }))
  })

  it('does not push clean sessions', async () => {
    mocks.getSessions.mockResolvedValue([{ ...session, dirty: false }])
    await syncAll('a')
    expect(mocks.rpc).not.toHaveBeenCalled()
  })

  it('reports snapshot RPC failures', async () => {
    mocks.rpc.mockResolvedValue({ data: null, error: { message: 'offline' } })
    const result = await syncAll('a')
    expect(result.errors).toBe(1)
    expect(mocks.saveSession).toHaveBeenCalledWith(expect.objectContaining({ syncError: 'offline' }))
  })

  it('retries tombstone deletion and removes it only after server success', async () => {
    mocks.getSessions.mockResolvedValue([])
    mocks.getTombstones.mockResolvedValue([{ id: `a:${session.id}`, ownerId: 'a', sessionId: session.id, deletedAt: 'now', lastError: null }])
    const result = await syncAll('a')
    expect(result.deleted).toBe(1)
    expect(mocks.removeTombstone).toHaveBeenCalledWith('a', session.id)
  })

  it('keeps a failed tombstone with its error', async () => {
    mocks.getSessions.mockResolvedValue([])
    mocks.getTombstones.mockResolvedValue([{ id: `a:${session.id}`, ownerId: 'a', sessionId: session.id, deletedAt: 'now', lastError: null }])
    mocks.deleteEq.mockResolvedValue({ error: { message: 'offline' } })
    const result = await syncAll('a')
    expect(result.errors).toBe(1)
    expect(mocks.saveTombstone).toHaveBeenCalledWith(expect.objectContaining({ lastError: 'offline' }))
  })

  it('forces the local snapshot after explicit conflict resolution', async () => {
    await resolveConflict(session.id, 'local', 'a')
    expect(mocks.rpc).toHaveBeenCalledWith('sync_session_snapshot', expect.objectContaining({ p_force: true }))
  })

  it('does nothing when a conflict session disappeared locally', async () => {
    mocks.getSessionById.mockResolvedValue(undefined)
    await expect(resolveConflict(session.id, 'local', 'a')).resolves.toBeUndefined()
    expect(mocks.rpc).not.toHaveBeenCalled()
  })

  it('returns structured direct deletion status', async () => {
    expect(await deleteSessionFromSupabase(session.id)).toBe('ok')
    mocks.deleteEq.mockResolvedValue({ error: { message: 'denied' } })
    expect(await deleteSessionFromSupabase(session.id)).toBe('error')
  })

  it('reports initial pull failures', async () => {
    mocks.orderSessions.mockResolvedValue({ data: null, error: { message: 'offline' } })
    expect(await pullMySessions('a')).toMatchObject({ errors: 1, failures: [{ sessionId: '*', message: 'offline' }] })
  })

  it('does not clear supervisor cache after a failed pull', async () => {
    mocks.orderSessions.mockResolvedValue({ data: null, error: { message: 'denied' } })
    await expect(pullAllSessionsForSupervisor('a')).rejects.toThrow('denied')
  })

  it('stores controlled profile names for remote session owners', async () => {
    const owner = '00000000-0000-0000-0000-0000000000ab'
    const remoteRow = { id: session.id, user_id: owner, type_site: 'Parc', nom_site: 'Distant', acronyme: 'D', debut_session: '2026-08-05T20:00:00Z', compteur_principal: 'Alice', nb_points_ecoute: 1, created_at: '2026-08-05T20:00:00Z', updated_at: '2026-08-05T21:00:00Z', sync_revision: 1 }
    mocks.orderSessions.mockResolvedValue({ data: [remoteRow], error: null })
    mocks.orderPoints.mockResolvedValue({ data: [{ id: 'p1', numero: 1, session_id: session.id, statut: 'termine' }], error: null })
    mocks.snapshot.mockResolvedValue({ data: remoteRow, error: null })
    mocks.profilesIn.mockResolvedValue({ data: [{ id: owner, nom: '  Violette Mayaux  ' }], error: null })

    await pullAllSessionsForSupervisor('supervisor-a')

    expect(mocks.profilesIn).toHaveBeenCalledWith('id', [owner])
    expect(mocks.saveRemoteSession).toHaveBeenCalledWith(expect.objectContaining({ userId: owner, userName: 'Violette Mayaux', cachedBy: 'supervisor-a' }))
    expect(mocks.saveRemotePoint).toHaveBeenCalledWith(expect.objectContaining({ userId: owner, userName: 'Violette Mayaux' }))
    expect(mocks.clearRemoteData).toHaveBeenCalledWith('supervisor-a')
  })

  it('falls back to a null name when the profile row is missing', async () => {
    const owner = '00000000-0000-0000-0000-0000000000ab'
    const remoteRow = { id: session.id, user_id: owner, type_site: 'Parc', nom_site: 'Distant', acronyme: 'D', debut_session: '2026-08-05T20:00:00Z', compteur_principal: 'Alice', nb_points_ecoute: 1, created_at: '2026-08-05T20:00:00Z', updated_at: '2026-08-05T21:00:00Z', sync_revision: 1 }
    mocks.orderSessions.mockResolvedValue({ data: [remoteRow], error: null })
    mocks.orderPoints.mockResolvedValue({ data: [{ id: 'p1', numero: 1, session_id: session.id, statut: 'termine' }], error: null })
    mocks.snapshot.mockResolvedValue({ data: remoteRow, error: null })
    mocks.profilesIn.mockResolvedValue({ data: [{ id: owner, nom: '  ' }], error: null })

    await pullAllSessionsForSupervisor('supervisor-a')

    expect(mocks.saveRemoteSession).toHaveBeenCalledWith(expect.objectContaining({ userId: owner, userName: null }))
    expect(mocks.saveRemotePoint).toHaveBeenCalledWith(expect.objectContaining({ userId: owner, userName: null }))
  })

  it('tolerates a failing profiles lookup during supervisor pull', async () => {
    const owner = '00000000-0000-0000-0000-0000000000ab'
    const remoteRow = { id: session.id, user_id: owner, type_site: 'Parc', nom_site: 'Distant', acronyme: 'D', debut_session: '2026-08-05T20:00:00Z', compteur_principal: 'Alice', nb_points_ecoute: 1, created_at: '2026-08-05T20:00:00Z', updated_at: '2026-08-05T21:00:00Z', sync_revision: 1 }
    mocks.orderSessions.mockResolvedValue({ data: [remoteRow], error: null })
    mocks.snapshot.mockResolvedValue({ data: remoteRow, error: null })
    mocks.profilesIn.mockResolvedValue({ data: null, error: { message: 'denied' } })

    await pullAllSessionsForSupervisor('supervisor-a')

    expect(mocks.saveRemoteSession).toHaveBeenCalledWith(expect.objectContaining({ userName: null }))
  })

  it('serializes group and species observations', async () => {
    const counted = structuredClone(point)
    counted.counts.pipistrelles = { total: 1, trancheHistory: [2], species: [{ name: 'Pip. commune', count: 1, trancheHistory: [2] }] }
    mocks.getPointsBySession.mockResolvedValue([counted])
    const snapshot = await buildLocalSnapshot(session)
    expect(snapshot.observations).toEqual([
      expect.objectContaining({ espece: '__groupe__', total: 1 }),
      expect.objectContaining({ espece: 'Pip. commune', tranches: [2] }),
    ])
  })

  it('maps remote sessions and reconstructs counts safely', () => {
    const mapped = mapSessionRow('a', { id: session.id, type_site: 'Parc', nom_site: 'Test', acronyme: 'T', debut_session: session.debutSession, compteur_principal: 'Alice', nb_points_ecoute: 1, created_at: session.createdAt, updated_at: session.updatedAt, sync_revision: 8 })
    expect(mapped).toMatchObject({ ownerId: 'a', dirty: false, lastSyncedRemoteRevision: 8 })
    const counts = rebuildCounts([
      { groupe: 'pipistrelles', espece: '__groupe__', total: 2, tranches: [1, 2] },
      { groupe: 'pipistrelles', espece: 'Pip. commune', total: 1, tranches: [1] },
      { groupe: 'invalid', espece: 'ignored', total: 9 },
    ])
    expect(counts.pipistrelles).toMatchObject({ total: 2, trancheHistory: [1, 2], species: [{ name: 'Pip. commune' }] })
  })

  it('builds snapshot-wide diffs', async () => {
    mocks.getPointsBySession.mockResolvedValue([point])
    const conflict = await buildSyncConflict(session, { session: { ...session, nomSite: 'Distant' }, points: [{ ...point, commentaire: 'distant' }] })
    expect(conflict.fields.map((field) => field.field)).toContain('Site')
    expect(conflict.fields.map((field) => field.field)).toContain('Points et observations')
  })

  it('serializes the tawny owl flag in point snapshots', async () => {
    const counted = { ...point, chouetteHulotte: true }
    mocks.getPointsBySession.mockResolvedValue([counted])
    const snapshot = await buildLocalSnapshot(session)
    expect(snapshot.points[0]).toMatchObject({ chouette_hulotte: true })
  })

  it('stores and clears conflict state', () => {
    localStorage.setItem('chiroptere-bxl-conflicts', JSON.stringify([{ sessionId: 's', sessionLabel: 'S', fields: [] }]))
    expect(getStoredConflicts()).toHaveLength(1)
    clearStoredConflicts()
    expect(getStoredConflicts()).toEqual([])
    localStorage.setItem('chiroptere-bxl-conflicts', '{')
    expect(getStoredConflicts()).toEqual([])
  })
})
