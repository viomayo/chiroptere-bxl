import type { PointData, PointCounts, SessionData } from './idb'

type GroupKey = keyof PointCounts
const GROUP_KEYS: GroupKey[] = ['pipistrelles', 'murins', 'serotules', 'autres']
const GROUP_LABELS: Record<GroupKey, string> = { pipistrelles: 'Pipistrelles', murins: 'Murins', serotules: 'Sérotules', autres: 'Autres' }

export function csvCell(value: string | number | null | undefined): string {
  const text = value == null ? '' : String(value)
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text
}

export function sessionToCSV(session: SessionData, points: PointData[]): string {
  const header = ['session_id', 'site_nom', 'site_acronyme', 'type_site', 'debut_session', 'fin_session', 'compteur_principal', 'autres_compteurs', 'detecteurs', 'point', 'heure_debut', 'heure_fin', 'nb_especes', 'statut', 'point_commentaire', 'coord_x', 'coord_y', 'niveau', 'groupe', 'espece', 'total', 'tranches'].join(',')
  const rows = points.flatMap((point) => {
    const base = [session.id, session.nomSite, session.acronyme, session.typeSite, session.debutSession, session.finSession, session.compteurPrincipal, session.autresCompteurs, session.detecteurs.join('|'), `${session.acronyme}-${String(point.numero).padStart(2, '0')}`, point.heureDebut, point.heureFin, point.nbEspeces, point.statut, point.commentaire, point.coordX, point.coordY]
    const observations: string[] = []
    for (const group of GROUP_KEYS) {
      const count = point.counts[group]
      if (count.total > 0) observations.push([...base, 'groupe', GROUP_LABELS[group], '', count.total, count.trancheHistory.join('|')].map(csvCell).join(','))
      for (const species of count.species) if (species.count > 0) observations.push([...base, 'espece', GROUP_LABELS[group], species.name, species.count, species.trancheHistory.join('|')].map(csvCell).join(','))
    }
    return observations.length ? observations : [[...base, 'point', '', '', 0, ''].map(csvCell).join(',')]
  })
  return [header, ...rows].join('\n')
}

export function sessionToJSON(session: SessionData, points: PointData[], exportedAt = new Date().toISOString()): string {
  return JSON.stringify({ exportedAt, session, points }, null, 2)
}

export function downloadText(content: string, filename: string, mime: string) {
  const url = URL.createObjectURL(new Blob([content], { type: mime }))
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}
