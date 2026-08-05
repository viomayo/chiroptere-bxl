import { beforeEach, describe, expect, it } from 'vitest'
import { claimLegacyData, clearRemoteData, defaultCounts, deleteSession, getAllPoints, getAllRemotePoints, getLegacySessions, getPointById, getPointsBySession, getRemotePointsBySession, getRemoteSessionById, getRemoteSessions, getSessionById, getSessions, getTombstones, initSessionPoints, removeTombstone, replaceSessionWithPoints, resetDatabaseForTests, saveRemotePoint, saveRemoteSession, saveSession, saveSessionWithPoints, saveTombstone, updatePoint, type PointData, type SessionData } from './idb'

function session(ownerId: string, id: string, synced = false): SessionData {
  return { id, ownerId, typeSite: 'Parc', nomSite: 'Test', acronyme: 'T', debutSession: '2026-08-05T20:00:00Z', finSession: '', compteurPrincipal: 'Test', autresCompteurs: '', nbPointsEcoute: 1, detecteurs: [], commentaire: '', createdAt: '2026-08-05T20:00:00Z', updatedAt: '2026-08-05T20:00:00Z', syncedAt: synced ? '2026-08-05T20:01:00Z' : null, dirty: !synced, lastSyncedRemoteRevision: synced ? 2 : null, syncError: null }
}
function point(ownerId: string, sessionId: string): PointData {
  return { id: `${sessionId}-p1`, ownerId, sessionId, numero: 1, heureDebut: null, heureFin: null, nbEspeces: 0, statut: 'non_demarre', counts: defaultCounts(), localisation: '', commentaire: '', timerState: null, coordX: null, coordY: null, updatedAt: '2026-08-05T20:00:00Z' }
}

describe('user-scoped IndexedDB', () => {
  beforeEach(() => resetDatabaseForTests())

  it('isolates sessions and points by owner', async () => {
    await saveSessionWithPoints(session('a', '00000000-0000-0000-0000-000000000001'), [point('a', '00000000-0000-0000-0000-000000000001')])
    await saveSession(session('b', '00000000-0000-0000-0000-000000000002'))
    expect(await getSessions('a')).toHaveLength(1)
    expect(await getSessions('b')).toHaveLength(1)
    expect(await getPointsBySession('b', '00000000-0000-0000-0000-000000000001')).toEqual([])
    expect(await getSessionById('b', '00000000-0000-0000-0000-000000000001')).toBeUndefined()
    expect(await getPointById('a', '00000000-0000-0000-0000-000000000001-p1')).toBeDefined()
    expect(await getAllPoints('a')).toHaveLength(1)
  })

  it('marks the parent dirty when a point changes', async () => {
    const value = session('a', '00000000-0000-0000-0000-000000000001', true)
    const child = point('a', value.id)
    await saveSessionWithPoints(value, [child])
    await updatePoint('a', { ...child, commentaire: 'modifié', updatedAt: '2026-08-05T21:00:00Z' })
    expect((await getSessions('a'))[0]).toMatchObject({ dirty: true, updatedAt: '2026-08-05T21:00:00Z' })
  })

  it('replaces removed remote points', async () => {
    const value = session('a', '00000000-0000-0000-0000-000000000001')
    await saveSessionWithPoints(value, [point('a', value.id), { ...point('a', value.id), id: `${value.id}-p2`, numero: 2 }])
    await replaceSessionWithPoints(value, [point('a', value.id)])
    expect(await getPointsBySession('a', value.id)).toHaveLength(1)
  })

  it('creates tombstones only for remotely known sessions', async () => {
    const synced = session('a', '00000000-0000-0000-0000-000000000001', true)
    await saveSession(synced)
    await deleteSession('a', synced.id)
    expect(await getTombstones('a')).toHaveLength(1)
  })

  it('has no legacy records in a fresh database', async () => {
    expect(await getLegacySessions()).toEqual([])
    await claimLegacyData('a')
    expect(await getSessions('a')).toEqual([])
  })

  it('initializes missing points once', async () => {
    const value = { ...session('a', '00000000-0000-0000-0000-000000000001'), nbPointsEcoute: 2 }
    await saveSession(value)
    expect(await initSessionPoints(value)).toHaveLength(2)
    expect(await initSessionPoints(value)).toHaveLength(2)
  })

  it('updates and removes tombstones', async () => {
    const item = { id: 'a:s1', ownerId: 'a', sessionId: 's1', deletedAt: 'now', lastError: 'offline' }
    await saveTombstone(item)
    expect(await getTombstones('a')).toEqual([item])
    await removeTombstone('a', 's1')
    expect(await getTombstones('a')).toEqual([])
  })

  it('isolates supervisor caches by viewer', async () => {
    const remoteSession = { ...session('observed', '00000000-0000-0000-0000-000000000001'), userId: 'observed', userName: null, cachedBy: 'supervisor' }
    const remotePoint = { ...point('observed', remoteSession.id), userId: 'observed', userName: null, cachedBy: 'supervisor' }
    await saveRemoteSession(remoteSession)
    await saveRemotePoint(remotePoint)
    expect(await getRemoteSessions('other')).toEqual([])
    expect(await getRemoteSessionById('other', remoteSession.id)).toBeUndefined()
    expect(await getRemoteSessionById('supervisor', remoteSession.id)).toEqual(remoteSession)
    expect(await getRemotePointsBySession('supervisor', remoteSession.id)).toHaveLength(1)
    expect(await getAllRemotePoints('supervisor')).toHaveLength(1)
    await clearRemoteData('supervisor')
    expect(await getRemoteSessions('supervisor')).toEqual([])
  })

  it('rejects inconsistent owners', async () => {
    await expect(saveSession({ ...session('a', 's'), ownerId: '__legacy__' })).rejects.toThrow()
    await expect(updatePoint('b', point('a', 's'))).rejects.toThrow()
    await expect(saveSessionWithPoints(session('a', 's'), [point('b', 's')])).rejects.toThrow()
  })
})
