'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSessions, initSessionPoints, type SessionData, type PointData } from '@/lib/idb'
import { ChevronRight, Download } from 'lucide-react'

type Statut = PointData['statut']

const STATUT_LABEL: Record<Statut, string> = {
  non_demarre: 'Non démarré',
  en_cours: 'En cours',
  termine: 'Terminé',
}

const STATUT_DOT: Record<Statut, string> = {
  non_demarre: 'bg-foreground/20',
  en_cours: 'bg-amber-400',
  termine: 'bg-emerald-400',
}

const STATUT_TEXT: Record<Statut, string> = {
  non_demarre: 'text-foreground/35',
  en_cours: 'text-amber-500',
  termine: 'text-emerald-500',
}

function formatTime(iso: string | null): string {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleTimeString('fr-BE', { hour: '2-digit', minute: '2-digit' })
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

function exportCSV(session: SessionData, points: PointData[]) {
  const header = [
    'session_id', 'site_nom', 'site_acronyme', 'type_site',
    'debut_session', 'fin_session', 'point_numero',
    'heure_debut', 'heure_fin', 'nb_especes', 'statut',
  ].join(',')

  const rows = points.map((p) =>
    [
      session.id,
      `"${session.nomSite}"`,
      session.acronyme,
      `"${session.typeSite}"`,
      session.debutSession,
      session.finSession,
      p.numero,
      p.heureDebut ?? '',
      p.heureFin ?? '',
      p.nbEspeces,
      p.statut,
    ].join(',')
  )

  downloadBlob(
    [header, ...rows].join('\n'),
    `${session.acronyme}-session.csv`,
    'text/csv'
  )
}

function exportGeoJSON(session: SessionData, points: PointData[]) {
  const features = points.map((p) => ({
    type: 'Feature',
    geometry: null,
    properties: {
      session_id: session.id,
      site_nom: session.nomSite,
      site_acronyme: session.acronyme,
      type_site: session.typeSite,
      point_numero: p.numero,
      point_label: `${session.acronyme}-${String(p.numero).padStart(2, '0')}`,
      heure_debut: p.heureDebut,
      heure_fin: p.heureFin,
      nb_especes: p.nbEspeces,
      statut: p.statut,
    },
  }))

  downloadBlob(
    JSON.stringify({ type: 'FeatureCollection', features }, null, 2),
    `${session.acronyme}-session.geojson`,
    'application/geo+json'
  )
}

export default function PointsList() {
  const router = useRouter()
  const [session, setSession] = useState<SessionData | null>(null)
  const [points, setPoints] = useState<PointData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    async function load() {
      const sessions = await getSessions()
      if (!active) return
      if (sessions.length === 0) {
        setLoading(false)
        return
      }
      const latest = sessions.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0]
      const pts = latest.nbPointsEcoute > 0 ? await initSessionPoints(latest) : []
      if (!active) return
      setSession(latest)
      setPoints(pts)
      setLoading(false)
    }
    load()
    return () => { active = false }
  }, [])

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
          Aucun point d'écoute défini pour cette session.
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
                <span className={`flex items-center gap-1.5 text-xs ${STATUT_TEXT[point.statut]}`}>
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUT_DOT[point.statut]}`} />
                  {STATUT_LABEL[point.statut]}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-foreground/45">
                <span>
                  {formatTime(point.heureDebut)}
                  <span className="mx-1.5 text-foreground/20">→</span>
                  {formatTime(point.heureFin)}
                </span>
                <span className="text-foreground/20">·</span>
                <span>
                  {point.nbEspeces > 0
                    ? `${point.nbEspeces} espèce${point.nbEspeces > 1 ? 's' : ''}`
                    : '—'}
                </span>
              </div>
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
          onClick={() => exportGeoJSON(session, points)}
          className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-foreground/10 px-4 py-2.5 text-xs font-medium text-foreground/60 hover:bg-foreground/5 hover:text-foreground/80 transition-colors cursor-pointer"
        >
          <Download size={13} />
          Exporter GeoJSON
        </button>
      </div>
    </div>
  )
}
