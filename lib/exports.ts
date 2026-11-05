import type { PointData, PointCounts, SessionData } from './idb'

type GroupKey = keyof PointCounts
const GROUP_KEYS: GroupKey[] = ['pipistrelles', 'murins', 'serotules', 'autres', 'oiseaux', 'mammiferes', 'insectes', 'amphibiens']
const GROUP_LABELS: Record<GroupKey, string> = {
  pipistrelles: 'Pipistrelles',
  murins: 'Murins',
  serotules: 'Sérotules',
  autres: 'Autres',
  oiseaux: 'Oiseaux',
  mammiferes: 'Autres mammifères',
  insectes: 'Insectes',
  amphibiens: 'Amphibiens',
}

export interface ExportUser {
  id?: string | null
  name?: string | null
}

/** Une session et ses points, unité d'un export multi-sessions. */
export interface SessionExport {
  session: SessionData
  points: PointData[]
}

const CSV_HEADER = ['session_id', 'user_id', 'user_name', 'site_nom', 'site_acronyme', 'type_site', 'annee', 'debut_session', 'fin_session', 'compteur_principal', 'autres_compteurs', 'detecteurs', 'point', 'heure_debut', 'heure_fin', 'nb_especes', 'statut', 'point_commentaire', 'coord_x', 'coord_y', 'niveau', 'groupe', 'espece', 'total', 'tranches', 'chouette_hulotte'].join(';')

const LAMBERT_72_CRS = { type: 'name', properties: { name: 'EPSG:31370' } }

export function csvCell(value: string | number | null | undefined): string {
  const text = value == null ? '' : String(value)
  return /[;",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text
}

export function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Associe chaque session à ses points, sans dupliquer ni perdre de session. */
export function buildSessionExports(sessions: SessionData[], points: PointData[]): SessionExport[] {
  const bySession = new Map<string, PointData[]>()
  for (const point of points) {
    const list = bySession.get(point.sessionId)
    if (list) list.push(point)
    else bySession.set(point.sessionId, [point])
  }
  return sessions.map((session) => ({
    session,
    points: (bySession.get(session.id) ?? []).sort((a, b) => a.numero - b.numero),
  }))
}

function csvRows(session: SessionData, points: PointData[], user?: ExportUser): string[] {
  return points.flatMap((point) => {
    const chouetteFlag = point.chouetteHulotte ? '1' : '0'
    const base = [session.id, user?.id ?? '', user?.name ?? '', session.nomSite, session.acronyme, session.typeSite, session.annee, session.debutSession, session.finSession, session.compteurPrincipal, session.autresCompteurs, session.detecteurs.join('|'), `${session.acronyme}-${String(point.numero).padStart(2, '0')}`, point.heureDebut, point.heureFin, point.nbEspeces, point.statut, point.commentaire, point.coordX, point.coordY]
    const observations: string[] = []
    for (const group of GROUP_KEYS) {
      const count = point.counts[group]
      if (count.total === 0) continue
      const activeSpecies = count.species.filter((sp) => sp.count > 0)
      const speciesTotal = activeSpecies.reduce((acc, sp) => acc + sp.count, 0)
      const unassignedCount = Math.max(0, count.total - speciesTotal)
      const assignedTranches = new Set<number>()
      for (const sp of activeSpecies) for (const t of sp.trancheHistory) assignedTranches.add(t)
      const unassignedTranches = count.trancheHistory.filter((t) => !assignedTranches.has(t))
      const reference = activeSpecies[0]?.trancheHistory.join('|') ?? ''
      const sameTranches = activeSpecies.length > 0 && activeSpecies.every((sp) => sp.trancheHistory.join('|') === reference)
      const hasUnassigned = unassignedCount > 0 || unassignedTranches.length > 0
      if (hasUnassigned || !sameTranches) {
        observations.push([...base, 'groupe', GROUP_LABELS[group], '', unassignedCount, unassignedTranches.join('|'), chouetteFlag].map(csvCell).join(';'))
      }
      for (const species of activeSpecies) observations.push([...base, 'espece', GROUP_LABELS[group], species.name, species.count, species.trancheHistory.join('|'), chouetteFlag].map(csvCell).join(';'))
    }
    return observations.length ? observations : [[...base, 'point', '', '', 0, '', chouetteFlag].map(csvCell).join(';')]
  })
}

function buildCSV(rows: string[]): string {
  return `\uFEFF${[CSV_HEADER, ...rows].join('\n')}`
}

export function sessionToCSV(session: SessionData, points: PointData[], user?: ExportUser): string {
  return buildCSV(csvRows(session, points, user))
}

export function sessionsToCSV(exports: SessionExport[], user?: ExportUser): string {
  return buildCSV(exports.flatMap((entry) => csvRows(entry.session, entry.points, user)))
}

export function sessionToJSON(session: SessionData, points: PointData[], exportedAt = new Date().toISOString(), user?: ExportUser): string {
  return JSON.stringify({ exportedAt, user: user ? { id: user.id, name: user.name } : undefined, session, points }, null, 2)
}

export function sessionsToJSON(exports: SessionExport[], exportedAt = new Date().toISOString(), user?: ExportUser): string {
  return JSON.stringify({
    exportedAt,
    user: user ? { id: user.id, name: user.name } : undefined,
    sessions: exports.map((entry) => entry.session),
    points: exports.flatMap((entry) => entry.points),
  }, null, 2)
}

export interface GeoJSONGroup {
  total: number
  tranches: number[]
  especes: { nom: string; count: number; tranches: number[] }[]
}

function geoJSONFeatures(session: SessionData, points: PointData[], exportedAt: string, user?: ExportUser) {
  return points.map((point) => {
    const label = `${session.acronyme}-${String(point.numero).padStart(2, '0')}`
    const groupes: Record<string, GeoJSONGroup> = {}
    for (const group of GROUP_KEYS) {
      const count = point.counts[group]
      if (count.total === 0) continue
      groupes[group] = {
        total: count.total,
        tranches: count.trancheHistory,
        especes: count.species
          .filter((sp) => sp.count > 0)
          .map((sp) => ({ nom: sp.name, count: sp.count, tranches: sp.trancheHistory })),
      }
    }
    const coordinates: [number, number] | null = point.coordX != null && point.coordY != null ? [point.coordX, point.coordY] : null
    return {
      type: 'Feature',
      id: label,
      geometry: coordinates ? { type: 'Point', coordinates } : null,
      properties: {
        exportedAt,
        user: user ? { id: user.id, name: user.name } : undefined,
        session_id: session.id,
        site_nom: session.nomSite,
        site_acronyme: session.acronyme,
        type_site: session.typeSite,
        annee: session.annee,
        debut_session: session.debutSession,
        fin_session: session.finSession,
        compteur_principal: session.compteurPrincipal,
        autres_compteurs: session.autresCompteurs,
        detecteurs: session.detecteurs,
        point_id: point.id,
        point: label,
        heure_debut: point.heureDebut,
        heure_fin: point.heureFin,
        nb_especes: point.nbEspeces,
        statut: point.statut,
        point_commentaire: point.commentaire,
        localisation: point.localisation,
        coord_x: point.coordX,
        coord_y: point.coordY,
        chouette_hulotte: point.chouetteHulotte,
        groupes,
      },
    }
  })
}

function buildGeoJSON(name: string, features: ReturnType<typeof geoJSONFeatures>): string {
  return JSON.stringify({ type: 'FeatureCollection', name, crs: LAMBERT_72_CRS, features }, null, 2)
}

export function sessionToGeoJSON(session: SessionData, points: PointData[], exportedAt = new Date().toISOString(), user?: ExportUser): string {
  return buildGeoJSON(`${session.acronyme}-session`, geoJSONFeatures(session, points, exportedAt, user))
}

export function sessionsToGeoJSON(exports: SessionExport[], exportedAt = new Date().toISOString(), user?: ExportUser, name = 'chiroptere-bxl'): string {
  return buildGeoJSON(name, exports.flatMap((entry) => geoJSONFeatures(entry.session, entry.points, exportedAt, user)))
}

export function downloadText(content: string, filename: string, mime: string) {
  const url = URL.createObjectURL(new Blob([content], { type: mime }))
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}
