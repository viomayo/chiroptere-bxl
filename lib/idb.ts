const DB_NAME = 'chiroptere-bxl'
const DB_VERSION = 1
const STORE_SESSIONS = 'sessions'

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

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_SESSIONS)) {
        db.createObjectStore(STORE_SESSIONS, { keyPath: 'id' })
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
