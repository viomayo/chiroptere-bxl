const DB_NAME = 'chiroptere-bxl'
const DB_VERSION = 4
const STORE_SESSIONS = 'sessions'
const STORE_POINTS = 'points'
const STORE_REMOTE_SESSIONS = 'remote_sessions'
const STORE_REMOTE_POINTS = 'remote_points'

export interface SessionData {
  id: string
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
}

export interface RemoteSessionData extends SessionData {
  userId: string
  userName: string | null
}

export interface RemotePointData extends PointData {
  userId: string
  userName: string | null
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
  updatedAt: string
}

export function defaultCounts(): PointCounts {
  const empty = (): GroupCount => ({ total: 0, trancheHistory: [], species: [] })
  return { pipistrelles: empty(), murins: empty(), serotules: empty(), autres: empty() }
}

let _db: Promise<IDBDatabase> | null = null

function openDB(): Promise<IDBDatabase> {
  if (!_db) {
    _db = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION)
      req.onupgradeneeded = (e) => {
        const db = (e.target as IDBOpenDBRequest).result
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
    updatedAt: (raw.updatedAt as string) ?? new Date().toISOString(),
  }
}

export async function deleteSession(sessionId: string): Promise<void> {
  const db = await openDB()
  const points = await getPointsBySession(sessionId)
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_SESSIONS, STORE_POINTS], 'readwrite')
    tx.objectStore(STORE_SESSIONS).delete(sessionId)
    for (const p of points) {
      tx.objectStore(STORE_POINTS).delete(p.id)
    }
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function saveSession(session: SessionData): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_SESSIONS, 'readwrite')
    tx.objectStore(STORE_SESSIONS).put(session)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function saveSessionWithPoints(session: SessionData, points: PointData[]): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_SESSIONS, STORE_POINTS], 'readwrite')
    tx.objectStore(STORE_SESSIONS).put(session)
    points.forEach((p) => tx.objectStore(STORE_POINTS).put(p))
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function getSessions(): Promise<SessionData[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_SESSIONS, 'readonly')
    const req = tx.objectStore(STORE_SESSIONS).getAll()
    req.onsuccess = () => resolve(req.result as SessionData[])
    req.onerror = () => reject(req.error)
  })
}

export async function getSessionById(id: string): Promise<SessionData | undefined> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_SESSIONS, 'readonly')
    const req = tx.objectStore(STORE_SESSIONS).get(id)
    req.onsuccess = () => resolve(req.result as SessionData | undefined)
    req.onerror = () => reject(req.error)
  })
}

export async function getPointsBySession(sessionId: string): Promise<PointData[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_POINTS, 'readonly')
    const req = tx.objectStore(STORE_POINTS).index('sessionId').getAll(sessionId)
    req.onsuccess = () => {
      const points = (req.result as Record<string, unknown>[])
        .map(hydratePoint)
        .sort((a, b) => a.numero - b.numero)
      resolve(points)
    }
    req.onerror = () => reject(req.error)
  })
}

export async function getPointById(id: string): Promise<PointData | undefined> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_POINTS, 'readonly')
    const req = tx.objectStore(STORE_POINTS).get(id)
    req.onsuccess = () => {
      const raw = req.result as Record<string, unknown> | undefined
      resolve(raw ? hydratePoint(raw) : undefined)
    }
    req.onerror = () => reject(req.error)
  })
}

export async function initSessionPoints(session: SessionData): Promise<PointData[]> {
  const existing = await getPointsBySession(session.id)
  if (existing.length > 0) return existing

  const now = new Date().toISOString()
  const points: PointData[] = Array.from({ length: session.nbPointsEcoute }, (_, i) => ({
    id: `${session.id}-pt-${i + 1}`,
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

export async function getAllPoints(): Promise<PointData[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_POINTS, 'readonly')
    const req = tx.objectStore(STORE_POINTS).getAll()
    req.onsuccess = () => {
      const points = (req.result as Record<string, unknown>[]).map(hydratePoint)
      resolve(points)
    }
    req.onerror = () => reject(req.error)
  })
}

export async function updatePoint(point: PointData): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_POINTS, 'readwrite')
    tx.objectStore(STORE_POINTS).put(point)
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

export async function getRemoteSessionById(id: string): Promise<RemoteSessionData | undefined> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_REMOTE_SESSIONS, 'readonly')
    const req = tx.objectStore(STORE_REMOTE_SESSIONS).get(id)
    req.onsuccess = () => resolve(req.result as RemoteSessionData | undefined)
    req.onerror = () => reject(req.error)
  })
}

export async function getRemoteSessions(): Promise<RemoteSessionData[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_REMOTE_SESSIONS, 'readonly')
    const req = tx.objectStore(STORE_REMOTE_SESSIONS).getAll()
    req.onsuccess = () => resolve(req.result as RemoteSessionData[])
    req.onerror = () => reject(req.error)
  })
}

export async function getRemotePointsBySession(sessionId: string): Promise<RemotePointData[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_REMOTE_POINTS, 'readonly')
    const req = tx.objectStore(STORE_REMOTE_POINTS).index('sessionId').getAll(sessionId)
    req.onsuccess = () => {
      const points = (req.result as RemotePointData[]).sort((a, b) => a.numero - b.numero)
      resolve(points)
    }
    req.onerror = () => reject(req.error)
  })
}

export async function getAllRemotePoints(): Promise<RemotePointData[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_REMOTE_POINTS, 'readonly')
    const req = tx.objectStore(STORE_REMOTE_POINTS).getAll()
    req.onsuccess = () => {
      const points = (req.result as RemotePointData[]).sort((a, b) => a.numero - b.numero)
      resolve(points)
    }
    req.onerror = () => reject(req.error)
  })
}

export async function clearRemoteData(): Promise<void> {
  const db = await openDB()
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction([STORE_REMOTE_SESSIONS, STORE_REMOTE_POINTS], 'readwrite')
    tx.objectStore(STORE_REMOTE_SESSIONS).clear()
    tx.objectStore(STORE_REMOTE_POINTS).clear()
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}
