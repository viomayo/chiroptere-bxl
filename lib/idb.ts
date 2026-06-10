const DB_NAME = 'chiroptere-bxl'
const DB_VERSION = 2
const STORE_SESSIONS = 'sessions'
const STORE_POINTS = 'points'

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
  syncedAt: string | null
}

export interface PointData {
  id: string
  sessionId: string
  numero: number
  heureDebut: string | null
  heureFin: string | null
  nbEspeces: number
  statut: 'non_demarre' | 'en_cours' | 'termine'
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
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
    }
    req.onsuccess = (e) => resolve((e.target as IDBOpenDBRequest).result)
    req.onerror = () => reject(req.error)
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

export async function getSessions(): Promise<SessionData[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_SESSIONS, 'readonly')
    const req = tx.objectStore(STORE_SESSIONS).getAll()
    req.onsuccess = () => resolve(req.result as SessionData[])
    req.onerror = () => reject(req.error)
  })
}

export async function getPointsBySession(sessionId: string): Promise<PointData[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_POINTS, 'readonly')
    const req = tx.objectStore(STORE_POINTS).index('sessionId').getAll(sessionId)
    req.onsuccess = () =>
      resolve((req.result as PointData[]).sort((a, b) => a.numero - b.numero))
    req.onerror = () => reject(req.error)
  })
}

export async function initSessionPoints(session: SessionData): Promise<PointData[]> {
  const existing = await getPointsBySession(session.id)
  if (existing.length > 0) return existing

  const points: PointData[] = Array.from({ length: session.nbPointsEcoute }, (_, i) => ({
    id: `${session.id}-pt-${i + 1}`,
    sessionId: session.id,
    numero: i + 1,
    heureDebut: null,
    heureFin: null,
    nbEspeces: 0,
    statut: 'non_demarre' as const,
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

export async function updatePoint(point: PointData): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_POINTS, 'readwrite')
    tx.objectStore(STORE_POINTS).put(point)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}
