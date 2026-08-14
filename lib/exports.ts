import type { PointData, PointCounts, SessionData } from './idb'

type GroupKey = keyof PointCounts
const GROUP_KEYS: GroupKey[] = ['pipistrelles', 'murins', 'serotules', 'autres']
const GROUP_LABELS: Record<GroupKey, string> = { pipistrelles: 'Pipistrelles', murins: 'Murins', serotules: 'Sérotules', autres: 'Autres' }

export function csvCell(value: string | number | null | undefined): string {
  const text = value == null ? '' : String(value)
  return /[;",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text
}

export function sessionToCSV(session: SessionData, points: PointData[], user?: { id?: string | null; name?: string | null }): string {
  const header = ['session_id', 'user_id', 'user_name', 'site_nom', 'site_acronyme', 'type_site', 'debut_session', 'fin_session', 'compteur_principal', 'autres_compteurs', 'detecteurs', 'point', 'heure_debut', 'heure_fin', 'nb_especes', 'statut', 'point_commentaire', 'coord_x', 'coord_y', 'niveau', 'groupe', 'espece', 'total', 'tranches', 'chouette_hulotte'].join(';')
  const rows = points.flatMap((point) => {
    const chouetteFlag = point.chouetteHulotte ? '1' : '0'
    const base = [session.id, user?.id ?? '', user?.name ?? '', session.nomSite, session.acronyme, session.typeSite, session.debutSession, session.finSession, session.compteurPrincipal, session.autresCompteurs, session.detecteurs.join('|'), `${session.acronyme}-${String(point.numero).padStart(2, '0')}`, point.heureDebut, point.heureFin, point.nbEspeces, point.statut, point.commentaire, point.coordX, point.coordY]
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
  return `\uFEFF${[header, ...rows].join('\n')}`
}

export function sessionToJSON(session: SessionData, points: PointData[], exportedAt = new Date().toISOString(), user?: { id?: string | null; name?: string | null }): string {
  return JSON.stringify({ exportedAt, user: user ? { id: user.id, name: user.name } : undefined, session, points }, null, 2)
}

export interface GeoJSONGroup {
  total: number
  tranches: number[]
  especes: { nom: string; count: number; tranches: number[] }[]
}

export function sessionToGeoJSON(session: SessionData, points: PointData[], exportedAt = new Date().toISOString(), user?: { id?: string | null; name?: string | null }): string {
  const crs = { type: 'name', properties: { name: 'EPSG:31370' } }
  const features = points.map((point) => {
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
  return JSON.stringify({ type: 'FeatureCollection', name: `${session.acronyme}-session`, crs, features }, null, 2)
}

export function downloadText(content: string, filename: string, mime: string) {
  const url = URL.createObjectURL(new Blob([content], { type: mime }))
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}
