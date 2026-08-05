import { createClient } from './client'
import {
  clearRemoteData,
  defaultCounts,
  getPointsBySession,
  getSessionById,
  getSessions,
  getTombstones,
  removeTombstone,
  replaceSessionWithPoints,
  saveRemotePoint,
  saveRemoteSession,
  saveSession,
  saveTombstone,
  type PointCounts,
  type PointData,
  type SessionData,
} from '@/lib/idb'

type GroupKey = keyof PointCounts
const GROUP_KEYS: GroupKey[] = ['pipistrelles', 'murins', 'serotules', 'autres']
const CONFLICTS_KEY = 'chiroptere-bxl-conflicts'
export const SYNC_STATE_EVENT = 'chiroptere-sync-state'

export interface ObservationRow {
  point_id: string
  groupe: string
  espece: string
  total: number
  tranches: number[]
}

interface SessionSnapshot {
  session: Record<string, unknown>
  points: Record<string, unknown>[]
  observations: ObservationRow[]
}

export interface SyncConflict {
  sessionId: string
  sessionLabel: string
  fields: { field: string; local: string; remote: string }[]
}

export interface SyncFailure {
  sessionId: string
  message: string
}

export interface SyncResult {
  synced: number
  deleted: number
  errors: number
  conflicts: SyncConflict[]
  failures: SyncFailure[]
}

export interface PullResult {
  imported: number
  merged: number
  errors: number
  conflicts: SyncConflict[]
  failures: SyncFailure[]
}

function emitSyncState() {
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent(SYNC_STATE_EVENT))
}

function extractObservations(point: PointData): ObservationRow[] {
  const rows: ObservationRow[] = []
  for (const group of GROUP_KEYS) {
    const count = point.counts[group]
    if (count.total > 0) rows.push({ point_id: point.id, groupe: group, espece: '__groupe__', total: count.total, tranches: count.trancheHistory })
    for (const species of count.species) {
      if (species.count > 0) rows.push({ point_id: point.id, groupe: group, espece: species.name, total: species.count, tranches: species.trancheHistory })
    }
  }
  return rows
}

async function localSnapshot(session: SessionData): Promise<SessionSnapshot> {
  const points = await getPointsBySession(session.ownerId, session.id)
  return {
    session: {
      id: session.id,
      type_site: session.typeSite,
      nom_site: session.nomSite,
      acronyme: session.acronyme,
      debut_session: session.debutSession,
      fin_session: session.finSession || null,
      compteur_principal: session.compteurPrincipal,
      autres_compteurs: session.autresCompteurs,
      nb_points_ecoute: session.nbPointsEcoute,
      detecteurs: session.detecteurs,
      commentaire: session.commentaire,
      created_at: session.createdAt,
    },
    points: points.map((point) => ({
      id: point.id,
      numero: point.numero,
      heure_debut: point.heureDebut,
      heure_fin: point.heureFin,
      nb_especes: point.nbEspeces,
      statut: point.statut,
      localisation: point.localisation,
      commentaire: point.commentaire,
      coord_x: point.coordX,
      coord_y: point.coordY,
      updated_at: point.updatedAt,
    })),
    observations: points.flatMap(extractObservations),
  }
}

function sessionFromRow(ownerId: string, row: Record<string, unknown>): SessionData {
  return {
    id: row.id as string,
    ownerId,
    typeSite: row.type_site as string,
    nomSite: row.nom_site as string,
    acronyme: row.acronyme as string,
    debutSession: row.debut_session as string,
    finSession: (row.fin_session as string) || '',
    compteurPrincipal: row.compteur_principal as string,
    autresCompteurs: (row.autres_compteurs as string) || '',
    nbPointsEcoute: row.nb_points_ecoute as number,
    detecteurs: (row.detecteurs as string[]) || [],
    commentaire: (row.commentaire as string) || '',
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
    syncedAt: new Date().toISOString(),
    dirty: false,
    lastSyncedRemoteRevision: Number(row.sync_revision ?? 0),
    syncError: null,
  }
}

function countsFromRows(rows: Record<string, unknown>[]): PointCounts {
  const counts = defaultCounts()
  for (const row of rows) {
    const group = row.groupe as GroupKey
    if (!GROUP_KEYS.includes(group)) continue
    const total = Number(row.total ?? 0)
    const tranches = (row.tranches as number[]) || []
    if (row.espece === '__groupe__') {
      counts[group].total = total
      counts[group].trancheHistory = tranches
    } else {
      counts[group].species.push({ name: row.espece as string, count: total, trancheHistory: tranches })
    }
  }
  return counts
}

async function fetchRemoteSnapshot(ownerId: string, sessionId: string): Promise<{ session: SessionData; points: PointData[] } | null> {
  const supabase = createClient()
  const [{ data: row, error: sessionError }, { data: pointRows, error: pointError }, { data: observations, error: observationError }] = await Promise.all([
    supabase.from('sessions').select('*').eq('id', sessionId).single(),
    supabase.from('points').select('*').eq('session_id', sessionId).order('numero'),
    supabase.from('observations').select('*').eq('session_id', sessionId),
  ])
  if (sessionError || pointError || observationError || !row || !pointRows || !observations) return null
  const obsByPoint = new Map<string, Record<string, unknown>[]>()
  for (const observation of observations as Record<string, unknown>[]) {
    const list = obsByPoint.get(observation.point_id as string) ?? []
    list.push(observation)
    obsByPoint.set(observation.point_id as string, list)
  }
  const session = sessionFromRow(ownerId, row as Record<string, unknown>)
  const points = (pointRows as Record<string, unknown>[]).map((point) => ({
    id: point.id as string,
    ownerId,
    sessionId,
    numero: point.numero as number,
    heureDebut: (point.heure_debut as string) || null,
    heureFin: (point.heure_fin as string) || null,
    nbEspeces: Number(point.nb_especes ?? 0),
    statut: (point.statut as PointData['statut']) || 'non_demarre',
    counts: countsFromRows(obsByPoint.get(point.id as string) ?? []),
    localisation: (point.localisation as string) || '',
    commentaire: (point.commentaire as string) || '',
    timerState: null,
    coordX: (point.coord_x as number | null) ?? null,
    coordY: (point.coord_y as number | null) ?? null,
    updatedAt: (point.updated_at as string) || session.updatedAt,
  }))
  return { session, points }
}

function format(value: unknown): string {
  return typeof value === 'string' ? value : JSON.stringify(value ?? null)
}

async function buildConflict(local: SessionData, remote: { session: SessionData; points: PointData[] }): Promise<SyncConflict> {
  const localPoints = await getPointsBySession(local.ownerId, local.id)
  const fields: SyncConflict['fields'] = []
  const pairs: Array<[string, unknown, unknown]> = [
    ['Site', { type: local.typeSite, nom: local.nomSite, acronyme: local.acronyme }, { type: remote.session.typeSite, nom: remote.session.nomSite, acronyme: remote.session.acronyme }],
    ['Horaires et compteurs', { debut: local.debutSession, fin: local.finSession, compteurs: [local.compteurPrincipal, local.autresCompteurs] }, { debut: remote.session.debutSession, fin: remote.session.finSession, compteurs: [remote.session.compteurPrincipal, remote.session.autresCompteurs] }],
    ['Commentaire session', local.commentaire, remote.session.commentaire],
    ['Points et observations', localPoints, remote.points],
  ]
  for (const [field, localValue, remoteValue] of pairs) {
    const left = format(localValue)
    const right = format(remoteValue)
    if (left !== right) fields.push({ field, local: left, remote: right })
  }
  return { sessionId: local.id, sessionLabel: `${local.acronyme} — ${local.nomSite}`, fields }
}

function storeConflicts(conflicts: SyncConflict[]) {
  if (typeof localStorage === 'undefined') return
  if (conflicts.length) localStorage.setItem(CONFLICTS_KEY, JSON.stringify(conflicts))
  else localStorage.removeItem(CONFLICTS_KEY)
  emitSyncState()
}

export function getStoredConflicts(): SyncConflict[] {
  try { return JSON.parse(localStorage.getItem(CONFLICTS_KEY) || '[]') } catch { return [] }
}

export function clearStoredConflicts() { storeConflicts([]) }

async function pushSession(session: SessionData, force = false): Promise<'ok' | 'conflict' | 'error'> {
  const supabase = createClient()
  const snapshot = await localSnapshot(session)
  const { data, error } = await supabase.rpc('sync_session_snapshot', {
    p_snapshot: snapshot,
    p_expected_revision: session.lastSyncedRemoteRevision,
    p_force: force,
  })
  if (error) {
    await saveSession({ ...session, syncError: error.message })
    return 'error'
  }
  const response = data as { status?: string; revision?: number } | null
  if (response?.status === 'conflict') return 'conflict'
  await saveSession({
    ...session,
    syncedAt: new Date().toISOString(),
    dirty: false,
    lastSyncedRemoteRevision: Number(response?.revision ?? 0),
    syncError: null,
  })
  return 'ok'
}

async function pushTombstones(ownerId: string, result: SyncResult) {
  const supabase = createClient()
  for (const tombstone of await getTombstones(ownerId)) {
    const { error } = await supabase.from('sessions').delete().eq('id', tombstone.sessionId)
    if (error) {
      result.errors++
      result.failures.push({ sessionId: tombstone.sessionId, message: error.message })
      await saveTombstone({ ...tombstone, lastError: error.message })
    } else {
      result.deleted++
      await removeTombstone(ownerId, tombstone.sessionId)
    }
  }
}

export async function syncAll(ownerId: string): Promise<SyncResult> {
  const result: SyncResult = { synced: 0, deleted: 0, errors: 0, conflicts: [], failures: [] }
  await pushTombstones(ownerId, result)
  for (const session of await getSessions(ownerId)) {
    if (!session.dirty) continue
    const status = await pushSession(session)
    if (status === 'ok') result.synced++
    else if (status === 'error') {
      result.errors++
      result.failures.push({ sessionId: session.id, message: 'Échec du snapshot distant' })
    } else {
      const remote = await fetchRemoteSnapshot(ownerId, session.id)
      if (remote) result.conflicts.push(await buildConflict(session, remote))
      else {
        result.errors++
        result.failures.push({ sessionId: session.id, message: 'Conflit distant illisible' })
      }
    }
  }
  storeConflicts(result.conflicts)
  return result
}

export async function pullMySessions(ownerId: string): Promise<PullResult> {
  const result: PullResult = { imported: 0, merged: 0, errors: 0, conflicts: [], failures: [] }
  const supabase = createClient()
  const { data, error } = await supabase.from('sessions').select('*').eq('user_id', ownerId).order('created_at', { ascending: false })
  if (error || !data) {
    result.errors++
    result.failures.push({ sessionId: '*', message: error?.message || 'Réponse distante vide' })
    return result
  }
  const tombstones = new Set((await getTombstones(ownerId)).map((item) => item.sessionId))
  for (const row of data as Record<string, unknown>[]) {
    const sessionId = row.id as string
    if (tombstones.has(sessionId)) continue
    const existing = await getSessionById(ownerId, sessionId)
    const revision = Number(row.sync_revision ?? 0)
    if (existing && existing.lastSyncedRemoteRevision === revision) continue
    const remote = await fetchRemoteSnapshot(ownerId, sessionId)
    if (!remote) {
      result.errors++
      result.failures.push({ sessionId, message: 'Snapshot distant incomplet' })
      continue
    }
    if (existing?.dirty) {
      result.conflicts.push(await buildConflict(existing, remote))
      continue
    }
    await replaceSessionWithPoints(remote.session, remote.points)
    if (existing) result.merged++
    else result.imported++
  }
  if (result.conflicts.length) storeConflicts(result.conflicts)
  return result
}

export async function resolveConflict(sessionId: string, resolution: 'local' | 'remote', ownerId: string): Promise<void> {
  const local = await getSessionById(ownerId, sessionId)
  if (!local) return
  if (resolution === 'local') {
    if (await pushSession(local, true) !== 'ok') throw new Error('Impossible de forcer le snapshot local')
  } else {
    const remote = await fetchRemoteSnapshot(ownerId, sessionId)
    if (!remote) throw new Error('Snapshot distant indisponible')
    await replaceSessionWithPoints(remote.session, remote.points)
  }
  storeConflicts(getStoredConflicts().filter((conflict) => conflict.sessionId !== sessionId))
}

export async function deleteSessionFromSupabase(sessionId: string): Promise<'ok' | 'error'> {
  const { error } = await createClient().from('sessions').delete().eq('id', sessionId)
  return error ? 'error' : 'ok'
}

export async function pullAllSessionsForSupervisor(cachedBy: string): Promise<{ imported: number }> {
  const supabase = createClient()
  const { data: sessions, error } = await supabase.from('sessions').select('*').order('created_at', { ascending: false })
  if (error || !sessions) throw new Error(error?.message || 'Sessions distantes indisponibles')

  const staged: Array<{ session: ReturnType<typeof sessionFromRow>; points: PointData[]; userId: string }> = []
  for (const row of sessions as Record<string, unknown>[]) {
    const userId = row.user_id as string
    if (userId === cachedBy) continue
    const remote = await fetchRemoteSnapshot(userId, row.id as string)
    if (!remote) throw new Error(`Snapshot incomplet: ${String(row.id)}`)
    staged.push({ session: remote.session, points: remote.points, userId })
  }

  await clearRemoteData(cachedBy)
  for (const item of staged) {
    await saveRemoteSession({ ...item.session, userId: item.userId, userName: null, cachedBy })
    for (const point of item.points) await saveRemotePoint({ ...point, userId: item.userId, userName: null, cachedBy })
  }
  return { imported: staged.length }
}
