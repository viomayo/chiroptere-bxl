'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getSessions, getSessionById, initSessionPoints, type SessionData, type PointData, type PointCounts } from '@/lib/idb'
import { ChevronRight, Download } from 'lucide-react'

type Statut = PointData['statut']
type GroupKey = keyof PointCounts

const GROUP_KEYS: GroupKey[] = ['pipistrelles', 'murins', 'serotules', 'autres']

const GROUP_LABELS: Record<GroupKey, string> = {
  pipistrelles: 'Pipistrelles',
  murins: 'Murins',
  serotules: 'Sérotules',
  autres: 'Autres',
}

const GROUP_COLORS: Record<GroupKey, string> = {
  pipistrelles: '#8b5cf6',
  murins: '#22c55e',
  serotules: '#f97316',
  autres: '#ec4899',
}

const STATUT_LABEL: Record<Statut, string> = {
  non_demarre: 'Non démarré',
  en_cours: 'En cours',
  termine: 'Terminé',
}

const STATUT_DOT: Record<Statut, string> = {
  non_demarre: 'bg-foreground/20',
  en_cours: 'bg-[#b87840]',
  termine: 'bg-[#4d8c5c]',
}

const STATUT_TEXT: Record<Statut, string> = {
  non_demarre: 'text-foreground/35',
  en_cours: 'text-[#b87840]',
  termine: 'text-[#4d8c5c]',
}

function formatTime(iso: string | null): string {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleTimeString('fr-BE', { hour: '2-digit', minute: '2-digit' })
}

function getGroupTotals(counts: PointCounts): { key: GroupKey; label: string; total: number }[] {
  const keys: GroupKey[] = ['pipistrelles', 'murins', 'serotules', 'autres']
  return keys
    .map((key) => ({ key, label: GROUP_LABELS[key], total: counts[key].total }))
    .filter((g) => g.total > 0)
}

function downloadBlob(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function csvCell(value: string | number | null | undefined): string {
  const text = value == null ? '' : String(value)
  if (!/[",\n\r]/.test(text)) return text
  return `"${text.replaceAll('"', '""')}"`
}

function tranches(value: number[]): string {
  return value.join('|')
}

function exportCSV(session: SessionData, points: PointData[]) {
  const header = [
    'session_id',
    'site_nom',
    'site_acronyme',
    'type_site',
    'debut_session',
    'fin_session',
    'compteur_principal',
    'autres_compteurs',
    'detecteurs',
    'point',
    'heure_debut',
    'heure_fin',
    'nb_especes',
    'statut',
    'point_commentaire',
    'coord_x',
    'coord_y',
    'niveau',
    'groupe',
    'espece',
    'total',
    'tranches',
  ].join(',')

  const rows = points.flatMap((p) => {
    const base = [
      session.id,
      session.nomSite,
      session.acronyme,
      session.typeSite,
      session.debutSession,
      session.finSession,
      session.compteurPrincipal,
      session.autresCompteurs,
      session.detecteurs.join('|'),
      `${session.acronyme}-${String(p.numero).padStart(2, '0')}`,
      p.heureDebut,
      p.heureFin,
      p.nbEspeces,
      p.statut,
      p.commentaire,
      p.coordX,
      p.coordY,
    ]

    const observationRows: string[] = []
    for (const group of GROUP_KEYS) {
      const groupCount = p.counts[group]
      if (groupCount.total > 0) {
        observationRows.push(
          [...base, 'groupe', GROUP_LABELS[group], '', groupCount.total, tranches(groupCount.trancheHistory)]
            .map(csvCell)
            .join(',')
        )
      }

      for (const species of groupCount.species) {
        if (species.count <= 0) continue
        observationRows.push(
          [...base, 'espece', GROUP_LABELS[group], species.name, species.count, tranches(species.trancheHistory)]
            .map(csvCell)
            .join(',')
        )
      }
    }

    if (observationRows.length > 0) return observationRows

    return [
      [...base, 'point', '', '', 0, '']
        .map(csvCell)
        .join(','),
    ]
  })

  downloadBlob(
    [header, ...rows].join('\n'),
    `${session.acronyme}-session.csv`,
    'text/csv'
  )
}

function exportJSON(session: SessionData, points: PointData[]) {
  const exportedAt = new Date().toISOString()

  downloadBlob(
    JSON.stringify({ exportedAt, session, points }, null, 2),
    `${session.acronyme}-session.json`,
    'application/json'
  )
}

export default function PointsList() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('sessionId')
  const [session, setSession] = useState<SessionData | null>(null)
  const [points, setPoints] = useState<PointData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    async function load() {
      let target: SessionData | undefined
      if (sessionId) {
        target = await getSessionById(sessionId)
      } else {
        const sessions = await getSessions()
        target = sessions.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0]
      }
      if (!active) return
      if (!target) {
        setLoading(false)
        return
      }
      const pts = target.nbPointsEcoute > 0 ? await initSessionPoints(target) : []
      if (!active) return
      setSession(target)
      setPoints(pts)
      setLoading(false)
    }
    load()
    return () => { active = false }
  }, [sessionId])

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-sm text-foreground/30">Chargement...</p>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="text-sm text-foreground/50">Aucune session en cours.</p>
        <button
          onClick={() => router.push('/site')}
          className="text-sm text-foreground underline underline-offset-2 cursor-pointer"
        >
          Créer une session
        </button>
      </div>
    )
  }

  if (points.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center px-6 text-center">
        <p className="text-sm text-foreground/50">
          Aucun point d&apos;écoute défini pour cette session.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-foreground/40 font-mono tracking-wide uppercase">
        Session · {session.nomSite}
      </p>

      {points.map((point) => {
        const label = `${session.acronyme}-${String(point.numero).padStart(2, '0')}`
        const groups = getGroupTotals(point.counts)
        return (
          <button
            key={point.id}
            type="button"
            onClick={() => router.push(`/compteur?pointId=${point.id}`)}
            className="w-full text-left rounded-xl border border-foreground/8 bg-background px-4 py-3.5 flex items-center gap-3 transition-colors hover:bg-foreground/3 active:bg-foreground/6 cursor-pointer"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-mono text-sm font-medium tracking-wider">{label}</span>
                <span className={`flex items-center gap-1.5 text-xs shrink-0 ${STATUT_TEXT[point.statut]}`}>
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUT_DOT[point.statut]}`} />
                  {STATUT_LABEL[point.statut]}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-foreground/45">
                <span className="tabular-nums">
                  {formatTime(point.heureDebut)}
                  <span className="mx-1 text-foreground/20">→</span>
                  {formatTime(point.heureFin)}
                </span>
              </div>
              {groups.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {groups.map((g) => (
                    <span
                      key={g.label}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs"
                      style={{ borderColor: GROUP_COLORS[g.key] + '40', color: GROUP_COLORS[g.key] }}
                    >
                      {g.label.slice(0, 3)}
                      <span className="font-semibold">{g.total}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <ChevronRight size={15} className="text-foreground/20 shrink-0" />
          </button>
        )
      })}

      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={() => exportCSV(session, points)}
          className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-foreground/10 px-4 py-2.5 text-xs font-medium text-foreground/60 hover:bg-foreground/5 hover:text-foreground/80 transition-colors cursor-pointer"
        >
          <Download size={13} />
          Exporter CSV
        </button>
        <button
          type="button"
          onClick={() => exportJSON(session, points)}
          className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-foreground/10 px-4 py-2.5 text-xs font-medium text-foreground/60 hover:bg-foreground/5 hover:text-foreground/80 transition-colors cursor-pointer"
        >
          <Download size={13} />
          Exporter JSON
        </button>
      </div>
    </div>
  )
}
