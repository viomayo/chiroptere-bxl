const DB_NAME = 'chiroptere-bxl'
const DB_VERSION = 5
const STORE_SESSIONS = 'sessions'
const STORE_POINTS = 'points'
const STORE_REMOTE_SESSIONS = 'remote_sessions'
const STORE_REMOTE_POINTS = 'remote_points'
const STORE_TOMBSTONES = 'tombstones'
export const LEGACY_OWNER_ID = '__legacy__'

export interface SessionData {
  id: string
  ownerId: string
  typeSite: string
  nomSite: string
  acronyme: string
  debutSession: string
  finSession: string
  compteurPrincipal: string
  autresCompteurs: string
  nbPointsEcoute: number
  detecteurs: string[]
  commentaire: string
  createdAt: string
  updatedAt: string
  syncedAt: string | null
  dirty: boolean
  lastSyncedRemoteRevision: number | null
  syncError: string | null
}

export interface RemoteSessionData extends SessionData {
  userId: string
  userName: string | null
  cachedBy: string
}

export interface RemotePointData extends PointData {
  userId: string
  userName: string | null
  cachedBy: string
}

export interface SpeciesCount {
  name: string
  count: number
  trancheHistory: number[]
}

export interface GroupCount {
  total: number
  trancheHistory: number[]
  species: SpeciesCount[]
}

export interface PointCounts {
  pipistrelles: GroupCount
  murins: GroupCount
  serotules: GroupCount
  autres: GroupCount
}

export interface PointTimerState {
  started: boolean
  paused: boolean
  finished: boolean
  currentTranche: number
  trancheElapsed: number
  pointStartTime: string | null
  trancheStartTime: string | null
  updatedAt: string
}

export interface PointData {
  id: string
  ownerId: string
  sessionId: string
  numero: number
  heureDebut: string | null
  heureFin: string | null
  nbEspeces: number
  statut: 'non_demarre' | 'en_cours' | 'termine'
  counts: PointCounts
  localisation: string
  commentaire: string
  timerState: PointTimerState | null
  coordX: number | null
  coordY: number | null
  chouetteHulotte: boolean
  updatedAt: string
}

export interface SessionTombstone {
  id: string
  sessionId: string
  ownerId: string
  deletedAt: string
  lastError: string | null
}

export function defaultCounts(): PointCounts {
  const empty = (): GroupCount => ({ total: 0, trancheHistory: [], species: [] })
  return { pipistrelles: empty(), murins: empty(), serotules: empty(), autres: empty() }
}

let _db: Promise<IDBDatabase> | null = null

export async function resetDatabaseForTests(): Promise<void> {
  if (process.env.NODE_ENV !== 'test') throw new Error('Disponible uniquement dans les tests')
  const current = await _db?.catch(() => null)
  current?.close()
  _db = null
  await new Promise<void>((resolve, reject) => {
    const request = indexedDB.deleteDatabase(DB_NAME)
    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
    request.onblocked = () => reject(new Error('Suppression IndexedDB bloquée'))
  })
}

function openDB(): Promise<IDBDatabase> {
  if (!_db) {
    _db = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION)
      req.onupgradeneeded = (e) => {
        const db = (e.target as IDBOpenDBRequest).result
        const tx = (e.target as IDBOpenDBRequest).transaction!
        if (!db.objectStoreNames.contains(STORE_SESSIONS)) {
          db.createObjectStore(STORE_SESSIONS, { keyPath: 'id' })
        }
        if (!db.objectStoreNames.contains(STORE_POINTS)) {
          const store = db.createObjectStore(STORE_POINTS, { keyPath: 'id' })
          store.createIndex('sessionId', 'sessionId', { unique: false })
        }
        if (!db.objectStoreNames.contains(STORE_REMOTE_SESSIONS)) {
          const rs = db.createObjectStore(STORE_REMOTE_SESSIONS, { keyPath: 'id' })
          rs.createIndex('userId', 'userId', { unique: false })
        }
        if (!db.objectStoreNames.contains(STORE_REMOTE_POINTS)) {
          const rp = db.createObjectStore(STORE_REMOTE_POINTS, { keyPath: 'id' })
          rp.createIndex('sessionId', 'sessionId', { unique: false })
          rp.createIndex('userId', 'userId', { unique: false })
        }
        if (!db.objectStoreNames.contains(STORE_TOMBSTONES)) {
          const tombstones = db.createObjectStore(STORE_TOMBSTONES, { keyPath: 'id' })
          tombstones.createIndex('ownerId', 'ownerId', { unique: false })
        }

        for (const storeName of [STORE_SESSIONS, STORE_POINTS]) {
          const store = tx.objectStore(storeName)
          if (!store.indexNames.contains('ownerId')) store.createIndex('ownerId', 'ownerId', { unique: false })
          const cursor = store.openCursor()
          cursor.onsuccess = () => {
            const current = cursor.result
            if (!current) return
            if (!current.value.ownerId) current.update({ ...current.value, ownerId: LEGACY_OWNER_ID })
            current.continue()
          }
        }
        for (const storeName of [STORE_REMOTE_SESSIONS, STORE_REMOTE_POINTS]) {
          const store = tx.objectStore(storeName)
          if (!store.indexNames.contains('cachedBy')) store.createIndex('cachedBy', 'cachedBy', { unique: false })
        }
      }
      req.onsuccess = (e) => resolve((e.target as IDBOpenDBRequest).result)
      req.onerror = () => { _db = null; reject(req.error) }
    })
  }
  return _db
}

function hydrateSpeciesCount(raw: unknown): SpeciesCount {
  if (!raw || typeof raw !== 'object') return { name: '', count: 0, trancheHistory: [] }
  const s = raw as Record<string, unknown>
  return {
    name: typeof s.name === 'string' ? s.name : '',
    count: typeof s.count === 'number' ? s.count : 0,
    trancheHistory: Array.isArray(s.trancheHistory) ? (s.trancheHistory as number[]) : [],
  }
}

function hydrateGroupCount(raw: unknown): GroupCount {
  if (!raw || typeof raw !== 'object') return { total: 0, trancheHistory: [], species: [] }
  const g = raw as Record<string, unknown>
  return {
    total: typeof g.total === 'number' ? g.total : 0,
    trancheHistory: Array.isArray(g.trancheHistory) ? (g.trancheHistory as number[]) : [],
    species: Array.isArray(g.species) ? (g.species as unknown[]).map(hydrateSpeciesCount) : [],
  }
}

function hydratePoint(raw: Record<string, unknown>): PointData {
  const rc = raw.counts as Record<string, unknown> | undefined
  const timerState = raw.timerState as PointTimerState | null | undefined
  const counts: PointCounts = rc ? {
    pipistrelles: hydrateGroupCount(rc.pipistrelles),
    murins: hydrateGroupCount(rc.murins),
    serotules: hydrateGroupCount(rc.serotules),
    autres: hydrateGroupCount(rc.autres),
  } : defaultCounts()
  return {
    id: raw.id as string,
    ownerId: (raw.ownerId as string) || LEGACY_OWNER_ID,
    sessionId: raw.sessionId as string,
    numero: raw.numero as number,
    heureDebut: (raw.heureDebut as string | null) ?? null,
    heureFin: (raw.heureFin as string | null) ?? null,
    nbEspeces: (raw.nbEspeces as number) ?? 0,
    statut: (raw.statut as PointData['statut']) ?? 'non_demarre',
    counts,
    localisation: (raw.localisation as string) ?? '',
    commentaire: (raw.commentaire as string) ?? '',
    timerState: timerState ?? null,
    coordX: (raw.coordX as number | null) ?? null,
    coordY: (raw.coordY as number | null) ?? null,
    chouetteHulotte: raw.chouetteHulotte === true,
    updatedAt: (raw.updatedAt as string) ?? new Date().toISOString(),
  }
}

function hydrateSession(raw: Record<string, unknown>): SessionData {
  if (!raw.id || !raw.typeSite || !raw.nomSite) throw new Error('Session IndexedDB invalide')
  return {
    ...(raw as unknown as SessionData),
    ownerId: (raw.ownerId as string) || LEGACY_OWNER_ID,
    dirty: typeof raw.dirty === 'boolean' ? raw.dirty : !raw.syncedAt,
    lastSyncedRemoteRevision: typeof raw.lastSyncedRemoteRevision === 'number' ? raw.lastSyncedRemoteRevision : null,
    syncError: typeof raw.syncError === 'string' ? raw.syncError : null,
  }
}

export async function deleteSession(ownerId: string, sessionId: string, createTombstone = true): Promise<void> {
  const db = await openDB()
  const session = await getSessionById(ownerId, sessionId)
  if (!session) return
  const points = await getPointsBySession(ownerId, sessionId)
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_SESSIONS, STORE_POINTS, STORE_TOMBSTONES], 'readwrite')
    tx.objectStore(STORE_SESSIONS).delete(sessionId)
    for (const p of points) {
      tx.objectStore(STORE_POINTS).delete(p.id)
    }
    if (createTombstone && session.syncedAt) {
      const tombstone: SessionTombstone = {
        id: `${ownerId}:${sessionId}`,
        sessionId,
        ownerId,
        deletedAt: new Date().toISOString(),
        lastError: null,
      }
      tx.objectStore(STORE_TOMBSTONES).put(tombstone)
    }
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function saveSession(session: SessionData): Promise<void> {
  if (!session.ownerId || session.ownerId === LEGACY_OWNER_ID) throw new Error('Propriétaire de session invalide')
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_SESSIONS, 'readwrite')
    tx.objectStore(STORE_SESSIONS).put(session)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function saveSessionWithPoints(session: SessionData, points: PointData[]): Promise<void> {
  if (points.some((point) => point.ownerId !== session.ownerId)) throw new Error('Propriétaire incohérent')
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_SESSIONS, STORE_POINTS], 'readwrite')
    tx.objectStore(STORE_SESSIONS).put(session)
    points.forEach((p) => tx.objectStore(STORE_POINTS).put(p))
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function replaceSessionWithPoints(session: SessionData, points: PointData[]): Promise<void> {
  if (points.some((point) => point.ownerId !== session.ownerId)) throw new Error('Propriétaire incohérent')
  const db = await openDB()
  const existing = await getPointsBySession(session.ownerId, session.id)
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_SESSIONS, STORE_POINTS], 'readwrite')
    tx.objectStore(STORE_SESSIONS).put(session)
    existing.forEach((point) => tx.objectStore(STORE_POINTS).delete(point.id))
    points.forEach((point) => tx.objectStore(STORE_POINTS).put(point))
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function getSessions(ownerId: string): Promise<SessionData[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_SESSIONS, 'readonly')
    const req = tx.objectStore(STORE_SESSIONS).index('ownerId').getAll(ownerId)
    req.onsuccess = () => {
      try { resolve((req.result as Record<string, unknown>[]).map(hydrateSession)) } catch (error) { reject(error) }
    }
    req.onerror = () => reject(req.error)
  })
}

export async function getSessionById(ownerId: string, id: string): Promise<SessionData | undefined> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_SESSIONS, 'readonly')
    const req = tx.objectStore(STORE_SESSIONS).get(id)
    req.onsuccess = () => {
      const raw = req.result as Record<string, unknown> | undefined
      resolve(raw && raw.ownerId === ownerId ? hydrateSession(raw) : undefined)
    }
    req.onerror = () => reject(req.error)
  })
}

export async function getPointsBySession(ownerId: string, sessionId: string): Promise<PointData[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_POINTS, 'readonly')
    const req = tx.objectStore(STORE_POINTS).index('sessionId').getAll(sessionId)
    req.onsuccess = () => {
      const points = (req.result as Record<string, unknown>[])
        .filter((point) => point.ownerId === ownerId)
        .map(hydratePoint)
        .sort((a, b) => a.numero - b.numero)
      resolve(points)
    }
    req.onerror = () => reject(req.error)
  })
}

export async function getPointById(ownerId: string, id: string): Promise<PointData | undefined> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_POINTS, 'readonly')
    const req = tx.objectStore(STORE_POINTS).get(id)
    req.onsuccess = () => {
      const raw = req.result as Record<string, unknown> | undefined
      resolve(raw && raw.ownerId === ownerId ? hydratePoint(raw) : undefined)
    }
    req.onerror = () => reject(req.error)
  })
}

export async function initSessionPoints(session: SessionData): Promise<PointData[]> {
  const existing = await getPointsBySession(session.ownerId, session.id)
  if (existing.length > 0) return existing

  const now = new Date().toISOString()
  const points: PointData[] = Array.from({ length: session.nbPointsEcoute }, (_, i) => ({
    id: `${session.id}-pt-${i + 1}`,
    ownerId: session.ownerId,
    sessionId: session.id,
    numero: i + 1,
    heureDebut: null,
    heureFin: null,
    nbEspeces: 0,
    statut: 'non_demarre' as const,
    counts: defaultCounts(),
    localisation: '',
    commentaire: '',
    timerState: null,
    coordX: null,
    coordY: null,
    chouetteHulotte: false,
    updatedAt: now,
  }))

  const db = await openDB()
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_POINTS, 'readwrite')
    points.forEach((p) => tx.objectStore(STORE_POINTS).put(p))
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })

  return points
}

export async function getAllPoints(ownerId: string): Promise<PointData[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_POINTS, 'readonly')
    const req = tx.objectStore(STORE_POINTS).index('ownerId').getAll(ownerId)
    req.onsuccess = () => {
      const points = (req.result as Record<string, unknown>[]).map(hydratePoint)
      resolve(points)
    }
    req.onerror = () => reject(req.error)
  })
}

export async function updatePoint(ownerId: string, point: PointData): Promise<void> {
  if (point.ownerId !== ownerId) throw new Error('Propriétaire de point incohérent')
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_POINTS, STORE_SESSIONS], 'readwrite')
    tx.objectStore(STORE_POINTS).put(point)
    const sessionRequest = tx.objectStore(STORE_SESSIONS).get(point.sessionId)
    sessionRequest.onsuccess = () => {
      const session = sessionRequest.result as SessionData | undefined
      if (session?.ownerId === ownerId) {
        tx.objectStore(STORE_SESSIONS).put({
          ...session,
          dirty: true,
          updatedAt: point.updatedAt,
          syncError: null,
        })
      }
    }
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function getLegacySessions(): Promise<SessionData[]> {
  return getSessions(LEGACY_OWNER_ID)
}

export async function claimLegacyData(ownerId: string): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_SESSIONS, STORE_POINTS], 'readwrite')
    for (const storeName of [STORE_SESSIONS, STORE_POINTS]) {
      const request = tx.objectStore(storeName).index('ownerId').openCursor(LEGACY_OWNER_ID)
      request.onsuccess = () => {
        const cursor = request.result
        if (!cursor) return
        cursor.update({ ...cursor.value, ownerId, dirty: storeName === STORE_SESSIONS ? true : cursor.value.dirty })
        cursor.continue()
      }
    }
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function getTombstones(ownerId: string): Promise<SessionTombstone[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const req = db.transaction(STORE_TOMBSTONES).objectStore(STORE_TOMBSTONES).index('ownerId').getAll(ownerId)
    req.onsuccess = () => resolve(req.result as SessionTombstone[])
    req.onerror = () => reject(req.error)
  })
}

export async function saveTombstone(tombstone: SessionTombstone): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_TOMBSTONES, 'readwrite')
    tx.objectStore(STORE_TOMBSTONES).put(tombstone)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function removeTombstone(ownerId: string, sessionId: string): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_TOMBSTONES, 'readwrite')
    tx.objectStore(STORE_TOMBSTONES).delete(`${ownerId}:${sessionId}`)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

// ── Remote data stores (supervisor pull) ─────────────────────────────────────

export async function saveRemoteSession(session: RemoteSessionData): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_REMOTE_SESSIONS, 'readwrite')
    tx.objectStore(STORE_REMOTE_SESSIONS).put(session)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function saveRemotePoint(point: RemotePointData): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_REMOTE_POINTS, 'readwrite')
    tx.objectStore(STORE_REMOTE_POINTS).put(point)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function getRemoteSessionById(cachedBy: string, id: string): Promise<RemoteSessionData | undefined> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_REMOTE_SESSIONS, 'readonly')
    const req = tx.objectStore(STORE_REMOTE_SESSIONS).get(id)
    req.onsuccess = () => {
      const result = req.result as RemoteSessionData | undefined
      resolve(result?.cachedBy === cachedBy ? result : undefined)
    }
    req.onerror = () => reject(req.error)
  })
}

export async function getRemoteSessions(cachedBy: string): Promise<RemoteSessionData[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_REMOTE_SESSIONS, 'readonly')
    const req = tx.objectStore(STORE_REMOTE_SESSIONS).index('cachedBy').getAll(cachedBy)
    req.onsuccess = () => resolve(req.result as RemoteSessionData[])
    req.onerror = () => reject(req.error)
  })
}

export async function getRemotePointsBySession(cachedBy: string, sessionId: string): Promise<RemotePointData[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_REMOTE_POINTS, 'readonly')
    const req = tx.objectStore(STORE_REMOTE_POINTS).index('sessionId').getAll(sessionId)
    req.onsuccess = () => {
      const points = (req.result as RemotePointData[])
        .filter((point) => point.cachedBy === cachedBy)
        .sort((a, b) => a.numero - b.numero)
      resolve(points)
    }
    req.onerror = () => reject(req.error)
  })
}

export async function getAllRemotePoints(cachedBy: string): Promise<RemotePointData[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_REMOTE_POINTS, 'readonly')
    const req = tx.objectStore(STORE_REMOTE_POINTS).index('cachedBy').getAll(cachedBy)
    req.onsuccess = () => {
      const points = (req.result as RemotePointData[]).sort((a, b) => a.numero - b.numero)
      resolve(points)
    }
    req.onerror = () => reject(req.error)
  })
}

export async function clearRemoteData(cachedBy: string): Promise<void> {
  const db = await openDB()
  const [sessions, points] = await Promise.all([getRemoteSessions(cachedBy), getAllRemotePoints(cachedBy)])
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction([STORE_REMOTE_SESSIONS, STORE_REMOTE_POINTS], 'readwrite')
    sessions.forEach((session) => tx.objectStore(STORE_REMOTE_SESSIONS).delete(session.id))
    points.forEach((point) => tx.objectStore(STORE_REMOTE_POINTS).delete(point.id))
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}
