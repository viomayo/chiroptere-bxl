import { createClient } from './client'
import {
  getSessions,
  getPointsBySession,
  saveSession,
  type SessionData,
  type PointData,
  type PointCounts,
} from '@/lib/idb'

type GroupKey = keyof PointCounts

const GROUP_KEYS: GroupKey[] = ['pipistrelles', 'murins', 'serotules', 'autres']

export interface ObservationRow {
  point_id: string
  session_id: string
  user_id: string
  groupe: string
  espece: string
  total: number
  tranches: number[]
}

export interface SyncConflict {
  sessionId: string
  sessionLabel: string
  fields: { field: string; local: string; remote: string }[]
}

export interface SyncResult {
  synced: number
  errors: number
  conflicts: SyncConflict[]
}

function extractObservations(
  point: PointData,
  userId: string
): ObservationRow[] {
  const rows: ObservationRow[] = []
  for (const group of GROUP_KEYS) {
    const gc = point.counts[group]
    if (gc.total > 0) {
      rows.push({
        point_id: point.id,
        session_id: point.sessionId,
        user_id: userId,
        groupe: group,
        espece: `__groupe__`,
        total: gc.total,
        tranches: gc.trancheHistory,
      })
    }
    for (const sp of gc.species) {
      if (sp.count > 0) {
        rows.push({
          point_id: point.id,
          session_id: point.sessionId,
          user_id: userId,
          groupe: group,
          espece: sp.name,
          total: sp.count,
          tranches: sp.trancheHistory,
        })
      }
    }
  }
  return rows
}

function sessionLabel(s: SessionData): string {
  return `${s.acronyme} — ${s.nomSite} (${new Date(s.debutSession).toLocaleDateString('fr-BE')})`
}

function formatVal(v: unknown): string {
  if (v === null || v === undefined) return '—'
  if (Array.isArray(v)) return v.join(', ')
  if (typeof v === 'object') return JSON.stringify(v)
  return String(v)
}

async function syncSession(
  session: SessionData,
  userId: string
): Promise<'ok' | 'conflict' | 'error'> {
  const supabase = createClient()

  const sessionPayload = {
    id: session.id,
    user_id: userId,
    type_site: session.typeSite,
    nom_site: session.nomSite,
    acronyme: session.acronyme,
    debut_session: session.debutSession,
    fin_session: session.finSession || null,
    compteur_principal: session.compteurPrincipal,
    autres_compteurs: session.autresCompteurs || '',
    nb_points_ecoute: session.nbPointsEcoute,
    detecteurs: session.detecteurs,
    commentaire: session.commentaire || '',
    created_at: session.createdAt,
    updated_at: session.updatedAt,
    synced_at: new Date().toISOString(),
  }

  if (session.syncedAt) {
    const { data: remote } = await supabase
      .from('sessions')
      .select('updated_at')
      .eq('id', session.id)
      .single()

    if (remote && remote.updated_at) {
      const remoteTime = new Date(remote.updated_at).getTime()
      const syncedTime = new Date(session.syncedAt).getTime()
      if (remoteTime > syncedTime) {
        return 'conflict'
      }
    }
  }

  const { error: sessionErr } = await supabase
    .from('sessions')
    .upsert(sessionPayload)
  if (sessionErr) return 'error'

  const points = await getPointsBySession(session.id)

  for (const point of points) {
    const pointPayload = {
      id: point.id,
      session_id: point.sessionId,
      user_id: userId,
      numero: point.numero,
      heure_debut: point.heureDebut || null,
      heure_fin: point.heureFin || null,
      nb_especes: point.nbEspeces,
      statut: point.statut,
      localisation: point.localisation || '',
      commentaire: point.commentaire || '',
      coord_x: point.coordX,
      coord_y: point.coordY,
      updated_at: point.updatedAt,
    }

    const { error: pointErr } = await supabase
      .from('points')
      .upsert(pointPayload)
    if (pointErr) return 'error'

    const obs = extractObservations(point, userId)

    if (obs.length > 0) {
      const { error: delErr } = await supabase
        .from('observations')
        .delete()
        .eq('point_id', point.id)
      if (delErr) return 'error'

      const { error: insErr } = await supabase
        .from('observations')
        .insert(obs)
      if (insErr) return 'error'
    }
  }

  session.syncedAt = new Date().toISOString()
  await saveSession(session)

  return 'ok'
}

const CONFLICTS_KEY = 'chiroptere-bxl-conflicts'

export function getStoredConflicts(): SyncConflict[] {
  try {
    return JSON.parse(localStorage.getItem(CONFLICTS_KEY) || '[]')
  } catch {
    return []
  }
}

export function clearStoredConflicts() {
  try {
    localStorage.removeItem(CONFLICTS_KEY)
  } catch {
    // ignore
  }
}

export async function syncAll(userId: string): Promise<SyncResult> {
  const result: SyncResult = { synced: 0, errors: 0, conflicts: [] }
  const sessions = await getSessions()

  for (const session of sessions) {
    if (session.syncedAt && session.updatedAt <= session.syncedAt) continue

    const status = await syncSession(session, userId)
    if (status === 'ok') {
      result.synced++
    } else if (status === 'conflict') {
      const fields: SyncConflict['fields'] = []

      const supabase = createClient()
      const { data: remote } = await supabase
        .from('sessions')
        .select('*')
        .eq('id', session.id)
        .single()

      if (remote) {
        const pairs: [string, keyof SessionData, string][] = [
          ['type_site', 'typeSite', 'Type de site'],
          ['nom_site', 'nomSite', 'Nom du site'],
          ['debut_session', 'debutSession', 'Début session'],
          ['fin_session', 'finSession', 'Fin session'],
          ['nb_points_ecoute', 'nbPointsEcoute', 'Nb points'],
          ['commentaire', 'commentaire', 'Commentaire'],
        ]
        for (const [rKey, lKey, label] of pairs) {
          const lv = formatVal(session[lKey])
          const rv = formatVal((remote as Record<string, unknown>)[rKey])
          if (lv !== rv) {
            fields.push({ field: label, local: lv, remote: rv })
          }
        }
      }

      result.conflicts.push({
        sessionId: session.id,
        sessionLabel: sessionLabel(session),
        fields,
      })
    } else {
      result.errors++
    }
  }

  if (result.conflicts.length > 0) {
    try {
      localStorage.setItem(CONFLICTS_KEY, JSON.stringify(result.conflicts))
    } catch {
      // ignore
    }
  }

  return result
}

export async function resolveConflict(
  sessionId: string,
  resolution: 'local' | 'remote',
  userId: string
): Promise<void> {
  const supabase = createClient()

  if (resolution === 'local') {
    const sessions = await getSessions()
    const session = sessions.find((s) => s.id === sessionId)
    if (!session) return
    await syncSession(session, userId)
  } else {
    const { data: remoteSession } = await supabase
      .from('sessions')
      .select('*')
      .eq('id', sessionId)
      .single()

    if (!remoteSession) return
    const r = remoteSession as Record<string, unknown>

    const session: SessionData = {
      id: r.id as string,
      typeSite: r.type_site as string,
      nomSite: r.nom_site as string,
      acronyme: r.acronyme as string,
      debutSession: r.debut_session as string,
      finSession: (r.fin_session as string) || '',
      compteurPrincipal: r.compteur_principal as string,
      autresCompteurs: (r.autres_compteurs as string) || '',
      nbPointsEcoute: r.nb_points_ecoute as number,
      detecteurs: (r.detecteurs as string[]) || [],
      commentaire: (r.commentaire as string) || '',
      createdAt: r.created_at as string,
      updatedAt: r.updated_at as string,
      syncedAt: r.synced_at as string || null,
    }

    await saveSession(session)

    const { data: remotePoints } = await supabase
      .from('points')
      .select('*')
      .eq('session_id', sessionId)

    if (remotePoints && Array.isArray(remotePoints)) {
      const { updatePoint, defaultCounts } = await import('@/lib/idb')
      for (const rp of remotePoints as Record<string, unknown>[]) {
        await updatePoint({
          id: rp.id as string,
          sessionId: rp.session_id as string,
          numero: rp.numero as number,
          heureDebut: (rp.heure_debut as string) || null,
          heureFin: (rp.heure_fin as string) || null,
          nbEspeces: (rp.nb_especes as number) || 0,
          statut: (rp.statut as PointData['statut']) || 'non_demarre',
          counts: defaultCounts(),
          localisation: (rp.localisation as string) || '',
          commentaire: (rp.commentaire as string) || '',
          timerState: null,
          coordX: (rp.coord_x as number) || null,
          coordY: (rp.coord_y as number) || null,
          updatedAt: (rp.updated_at as string) || new Date().toISOString(),
        })
      }
    }

    const { data: remoteObs } = await supabase
      .from('observations')
      .select('*')
      .eq('session_id', sessionId)

    if (remoteObs && Array.isArray(remoteObs)) {
      const localSessions = await getSessions()
      const localSession = localSessions.find((s) => s.id === sessionId)
      if (localSession) {
        const points = await getPointsBySession(sessionId)
        const countsMap = new Map<string, PointCounts>()
        for (const p of points) {
          countsMap.set(p.id, p.counts)
        }

        for (const ro of remoteObs as Record<string, unknown>[]) {
          const pointId = ro.point_id as string
          const group = ro.groupe as string
          const espece = ro.espece as string
          const total = ro.total as number
          const tranches = ro.tranches as number[]

          let counts = countsMap.get(pointId)
          if (!counts) {
            const { defaultCounts } = await import('@/lib/idb')
            counts = defaultCounts()
            countsMap.set(pointId, counts)
          }

          if (espece === '__groupe__') {
            if (group in counts) {
              ;(counts as unknown as Record<string, unknown>)[group] = {
                ...(counts as unknown as Record<string, unknown>)[group] as object,
                total,
                trancheHistory: tranches,
              }
            }
          } else {
            if (group in counts) {
              const gc = (counts as unknown as Record<string, unknown>)[group] as {
                total: number
                trancheHistory: number[]
                species: { name: string; count: number; trancheHistory: number[] }[]
              }
              const existing = gc.species.find((s) => s.name === espece)
              if (existing) {
                existing.count = total
                existing.trancheHistory = tranches
              } else {
                gc.species.push({ name: espece, count: total, trancheHistory: tranches })
              }
            }
          }
        }

        const { updatePoint } = await import('@/lib/idb')
        for (const p of points) {
          const updatedCounts = countsMap.get(p.id)
          if (updatedCounts) {
            await updatePoint({ ...p, counts: updatedCounts, updatedAt: new Date().toISOString() })
          }
        }
      }
    }
  }
}
