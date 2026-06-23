'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  getPointById,
  getPointsBySession,
  getSessionById,
  updatePoint,
  defaultCounts,
  type PointData,
  type PointCounts,
  type GroupCount,
  type PointTimerState,
  type SessionData,
} from '@/lib/idb'
import { getSiteConfig, type SiteTypeConfig } from '@/lib/site-config'
import { Pause, Play, RotateCcw } from 'lucide-react'

type GroupKey = keyof PointCounts

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

const GROUP_KEYS: GroupKey[] = ['pipistrelles', 'murins', 'serotules', 'autres']

const SPECIES: Record<GroupKey, string[]> = {
  pipistrelles: [
    'Pip. commune',
    'Pip. de Nathusius/Kuhl',
    'Pip. pygmée',
  ],
  murins: [
    'M. de Daubenton',
    'M. de Natterer',
    'M. museaux sombres',
    'M. à oreilles échancrées',
    'Grand Murin / M. de Bechstein',
  ],
  serotules: [
    'Sérotine commune',
    'Noctule de Leisler',
    'Noctule commune',
  ],
  autres: [
    'Oreillard sp',
    'Grand Rhinolophe',
    'Autres',
  ],
}

function p2(n: number) {
  return String(n).padStart(2, '0')
}

function formatHMS(d: Date) {
  return `${p2(d.getHours())}:${p2(d.getMinutes())}:${p2(d.getSeconds())}`
}

function announce(text: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'fr-FR'
  u.rate = 0.95
  window.speechSynthesis.speak(u)
}

function countSpecies(counts: PointCounts): number {
  return (
    GROUP_KEYS.reduce((acc, g) => acc + counts[g].species.filter((s) => s.count > 0).length, 0) ||
    GROUP_KEYS.filter((g) => counts[g].total > 0).length
  )
}

function buildTimerState({
  started,
  paused,
  finished,
  currentTranche,
  trancheElapsed,
  pointStartTime,
  trancheStartTime,
}: {
  started: boolean
  paused: boolean
  finished: boolean
  currentTranche: number
  trancheElapsed: number
  pointStartTime: Date | null
  trancheStartTime: Date | null
}): PointTimerState | null {
  if (!started) return null
  return {
    started,
    paused,
    finished,
    currentTranche,
    trancheElapsed,
    pointStartTime: pointStartTime?.toISOString() ?? null,
    trancheStartTime: trancheStartTime?.toISOString() ?? null,
    updatedAt: new Date().toISOString(),
  }
}

// ── Tranche dots ──────────────────────────────────────────────────────────────

function TrancheDots({
  history,
  nbTranches,
  onAdd,
}: {
  history: number[]
  nbTranches: number
  onAdd: (t: number) => void
}) {
  const set = new Set(history)
  return (
    <div className="flex flex-wrap gap-1">
      {Array.from({ length: nbTranches }, (_, i) => i + 1).map((t) => {
        const filled = set.has(t)
        return (
          <button
            key={t}
            type="button"
            onClick={() => { if (!filled) onAdd(t) }}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              filled
                ? 'bg-foreground cursor-default'
                : 'bg-foreground/12 hover:bg-foreground/40 active:bg-foreground/60 cursor-pointer'
            }`}
          />
        )
      })}
    </div>
  )
}

// ── Species summary (dots for all tranches) ──────────────────────────────────

function SpeciesSummary({
  groupKey,
  count,
  nbTranches,
}: {
  groupKey: GroupKey
  count: GroupCount
  nbTranches: number
}) {
  const speciesWithData = count.species.filter((s) => s.count > 0)
  if (speciesWithData.length === 0) return null

  return (
    <div className="flex flex-col gap-2 pt-2 border-t border-foreground/8">
      <span className="text-xs font-medium tracking-wide text-foreground/45">
        Espèces
      </span>
      {SPECIES[groupKey].map((sp) => {
        const entry = count.species.find((s) => s.name === sp)
        const n = entry?.count ?? 0
        const history = entry?.trancheHistory ?? []
        if (n === 0) return null
        return (
          <div key={sp} className="flex items-center justify-between gap-2">
            <span className="text-xs text-foreground/70">{sp}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs tabular-nums text-foreground/40">{n}</span>
              <TrancheDots history={history} nbTranches={nbTranches} onAdd={() => {}} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── Inline species picker (immediate toggles, no confirm) ────────────────────

function InlineSpeciesPicker({
  groupKey,
  count,
  tranche,
  onToggle,
}: {
  groupKey: GroupKey
  count: GroupCount
  tranche: number
  onToggle: (sp: string, tranche: number) => void
}) {
  return (
    <div className="flex flex-col gap-1 pt-2 border-t border-foreground/8">
      <span className="text-xs font-medium text-foreground/45">
        Tranche {tranche}
      </span>
      {SPECIES[groupKey].map((sp) => {
        const entry = count.species.find((s) => s.name === sp)
        const isChecked = entry?.trancheHistory.includes(tranche) ?? false
        return (
          <label
            key={sp}
            className="flex items-center gap-2 py-1 rounded-lg hover:bg-foreground/3 active:bg-foreground/6 -mx-1 px-1 transition-colors cursor-pointer select-none"
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => onToggle(sp, tranche)}
              className="w-3.5 h-3.5 rounded border-foreground/20 accent-foreground"
            />
            <span className="text-xs text-foreground/70">{sp}</span>
          </label>
        )
      })}
    </div>
  )
}

// ── Group card ────────────────────────────────────────────────────────────────

function GroupCard({
  groupKey,
  count,
  nbTranches,
  canAdd,
  onAdd,
  onRemove,
  onMax,
  onAddTranche,
  detailTranche,
  onToggleSpecies,
}: {
  groupKey: GroupKey
  count: GroupCount
  nbTranches: number
  canAdd: boolean
  onAdd: () => void
  onRemove: () => void
  onMax: () => void
  onAddTranche: (t: number) => void
  detailTranche: number | null
  onToggleSpecies: (sp: string, tranche: number) => void
}) {
  return (
    <div className="rounded-xl border border-foreground/8 bg-background p-3 flex flex-col gap-2.5">
      <div className="flex items-center justify-between min-h-4.5">
        <span className="text-base font-bold" style={{ color: GROUP_COLORS[groupKey], fontVariant: 'small-caps' }}>
          {GROUP_LABELS[groupKey]}
        </span>
      </div>

      <div className="text-center leading-none select-none">
        <span className="text-3xl font-bold tabular-nums">{count.total}</span>
        <span className="text-sm text-foreground/20"> /{nbTranches}</span>
      </div>

      <div className="flex gap-1.5">
        <button
          type="button"
          onClick={onRemove}
          disabled={count.total === 0}
          className="flex-1 h-10 rounded-lg border text-xl text-foreground/55 hover:bg-foreground/5 active:bg-foreground/10 disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
          style={{ borderColor: GROUP_COLORS[groupKey] }}
        >
          −
        </button>
        <button
          type="button"
          onClick={onAdd}
          disabled={!canAdd}
          className="flex-1 h-10 rounded-lg text-foreground text-xl font-medium hover:brightness-150 disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer"
          style={{ backgroundColor: GROUP_COLORS[groupKey] + '26' }}
        >
          +
        </button>
        <button
          type="button"
          onClick={onMax}
          className="px-2.5 h-10 rounded-lg border border-foreground/10 text-xs font-medium text-foreground/55 hover:bg-foreground/5 active:bg-foreground/10 transition-colors cursor-pointer"
        >
          MAX
        </button>
      </div>

      <TrancheDots history={count.trancheHistory} nbTranches={nbTranches} onAdd={onAddTranche} />

      <SpeciesSummary groupKey={groupKey} count={count} nbTranches={nbTranches} />

      {detailTranche != null && (
        <InlineSpeciesPicker
          groupKey={groupKey}
          count={count}
          tranche={detailTranche}
          onToggle={onToggleSpecies}
        />
      )}
    </div>
  )
}

// ── Main screen ───────────────────────────────────────────────────────────────

export default function CompteurScreen() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pointId = searchParams.get('pointId')

  const [point, setPoint] = useState<PointData | null>(null)
  const [session, setSession] = useState<SessionData | null>(null)
  const [config, setConfig] = useState<SiteTypeConfig>({ trancheDurationSec: 10, nbTranches: 12 })
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  // Timer
  const [started, setStarted] = useState(false)
  const [paused, setPaused] = useState(false)
  const [finished, setFinished] = useState(false)
  const [currentTranche, setCurrentTranche] = useState(1)
  const [trancheElapsed, setTrancheElapsed] = useState(0)
  const [pointStartTime, setPointStartTime] = useState<Date | null>(null)
  const [trancheStartTime, setTrancheStartTime] = useState<Date | null>(null)

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const currentTrancheRef = useRef(1)
  const trancheElapsedRef = useRef(0)
  const trancheStartRef = useRef<Date | null>(null)
  const configRef = useRef(config)

  const [countdown, setCountdown] = useState<number | null>(null)

  // Counts
  const [counts, setCounts] = useState<PointCounts>(defaultCounts())
  const [commentaire, setCommentaire] = useState('')

  // Per-group detail tranche (non-null = detail open for that tranche)
  const [detailTranche, setDetailTranche] = useState<Record<GroupKey, number | null>>({
    pipistrelles: null,
    murins: null,
    serotules: null,
    autres: null,
  })

  // Load
  useEffect(() => {
    let active = true
    async function load() {
      if (!pointId) { setLoadError('Aucun point sélectionné.'); setLoading(false); return }
      const pt = await getPointById(pointId)
      if (!active) return
      if (!pt) { setLoadError('Point introuvable.'); setLoading(false); return }
      const sess = await getSessionById(pt.sessionId)
      if (!active) return
      if (!sess) { setLoadError('Session introuvable.'); setLoading(false); return }
      const cfg = getSiteConfig(sess.typeSite)
      setPoint(pt)
      setSession(sess)
      setConfig(cfg)
      configRef.current = cfg
      setCounts(pt.counts)
      setCommentaire(pt.commentaire)
      if (pt.timerState) {
        const start = pt.timerState.pointStartTime ? new Date(pt.timerState.pointStartTime) : null
        const trancheStart = pt.timerState.trancheStartTime ? new Date(pt.timerState.trancheStartTime) : null
        setStarted(pt.timerState.started)
        setPaused(pt.statut === 'en_cours' ? true : pt.timerState.paused)
        setFinished(pt.timerState.finished || pt.statut === 'termine')
        setCurrentTranche(pt.timerState.currentTranche)
        setTrancheElapsed(pt.timerState.trancheElapsed)
        setPointStartTime(start)
        setTrancheStartTime(trancheStart)
        currentTrancheRef.current = pt.timerState.currentTranche
        trancheElapsedRef.current = pt.timerState.trancheElapsed
        trancheStartRef.current = trancheStart
      } else if (pt.statut === 'termine') {
        setFinished(true)
        setStarted(true)
      } else if (pt.statut === 'en_cours') {
        const start = pt.heureDebut ? new Date(pt.heureDebut) : null
        setStarted(true)
        setPaused(true)
        setPointStartTime(start)
        setTrancheStartTime(start)
        trancheStartRef.current = start
      }
      setLoading(false)
    }
    load()
    return () => { active = false }
  }, [pointId])

  useEffect(() => { configRef.current = config }, [config])

  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (countdownRef.current) clearInterval(countdownRef.current)
  }, [])

  useEffect(() => {
    if (loading || !point) return

    const timerState = buildTimerState({
      started,
      paused,
      finished,
      currentTranche,
      trancheElapsed,
      pointStartTime,
      trancheStartTime,
    })
    const draft: PointData = {
      ...point,
      counts,
      commentaire,
      nbEspeces: countSpecies(counts),
      timerState,
    }

    const save = window.setTimeout(() => {
      void updatePoint(draft)
    }, 500)

    return () => window.clearTimeout(save)
  }, [
    loading,
    point,
    counts,
    commentaire,
    started,
    paused,
    finished,
    currentTranche,
    trancheElapsed,
    pointStartTime,
    trancheStartTime,
  ])

  function startInterval() {
    timerRef.current = setInterval(() => {
      trancheElapsedRef.current += 1
      setTrancheElapsed(trancheElapsedRef.current)

      if (trancheElapsedRef.current >= configRef.current.trancheDurationSec) {
        const next = currentTrancheRef.current + 1
        if (next > configRef.current.nbTranches) {
          clearInterval(timerRef.current!)
          timerRef.current = null
          setFinished(true)
          setDetailTranche({ pipistrelles: null, murins: null, serotules: null, autres: null })
          announce('Fin du point')
        } else {
          const newStart = new Date()
          currentTrancheRef.current = next
          trancheElapsedRef.current = 0
          trancheStartRef.current = newStart
          setCurrentTranche(next)
          setTrancheStartTime(newStart)
          setTrancheElapsed(0)
          setDetailTranche({ pipistrelles: null, murins: null, serotules: null, autres: null })
          announce(`Tranche ${next}`)
        }
      }
    }, 1000)
  }

  async function handleStart() {
    if (!point) return
    setCountdown(3)
    await new Promise<void>((resolve) => {
      let n = 3
      countdownRef.current = setInterval(() => {
        n -= 1
        if (n <= 0) {
          clearInterval(countdownRef.current!)
          countdownRef.current = null
          setCountdown(null)
          resolve()
        } else {
          setCountdown(n)
        }
      }, 1000)
    })

    const now = new Date()
    const updated: PointData = {
      ...point,
      heureDebut: now.toISOString(),
      statut: 'en_cours',
      timerState: {
        started: true,
        paused: false,
        finished: false,
        currentTranche: 1,
        trancheElapsed: 0,
        pointStartTime: now.toISOString(),
        trancheStartTime: now.toISOString(),
        updatedAt: now.toISOString(),
      },
    }
    await updatePoint(updated)
    setPoint(updated)

    setStarted(true)
    setPointStartTime(now)
    setTrancheStartTime(now)
    trancheStartRef.current = now
    currentTrancheRef.current = 1
    trancheElapsedRef.current = 0
    announce('Tranche 1')
    startInterval()
  }

  function handlePause() {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
    setPaused(true)
  }

  function handleResume() {
    setPaused(false)
    startInterval()
  }

  async function handleReset() {
    if (countdownRef.current) { clearInterval(countdownRef.current); countdownRef.current = null }
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
    setCountdown(null)
    if (point) {
      const emptyCounts = defaultCounts()
      const updated: PointData = {
        ...point,
        heureDebut: null,
        heureFin: null,
        nbEspeces: 0,
        statut: 'non_demarre',
        counts: emptyCounts,
        commentaire: '',
        timerState: null,
      }
      await updatePoint(updated)
      setPoint(updated)
      setCounts(emptyCounts)
      setCommentaire('')
    }
    setStarted(false)
    setPaused(false)
    setFinished(false)
    setCurrentTranche(1)
    setTrancheElapsed(0)
    setPointStartTime(null)
    setTrancheStartTime(null)
    currentTrancheRef.current = 1
    trancheElapsedRef.current = 0
    trancheStartRef.current = null
    setDetailTranche({ pipistrelles: null, murins: null, serotules: null, autres: null })
  }

  // ── Count handlers ────────────────────────────────────────────────────────

  function handleAdd(group: GroupKey) {
    const t = currentTrancheRef.current
    const g = counts[group]
    if (!g.trancheHistory.includes(t)) {
      setCounts((prev) => {
        const g = prev[group]
        if (g.trancheHistory.includes(t)) return prev
        return { ...prev, [group]: { ...g, total: g.total + 1, trancheHistory: [...g.trancheHistory, t] } }
      })
    }
    setDetailTranche((prev) => ({ ...prev, [group]: t }))
  }

  function handleAddTranche(group: GroupKey, tranche: number) {
    const g = counts[group]
    if (!g.trancheHistory.includes(tranche)) {
      setCounts((prev) => {
        const g = prev[group]
        if (g.trancheHistory.includes(tranche)) return prev
        return { ...prev, [group]: { ...g, total: g.total + 1, trancheHistory: [...g.trancheHistory, tranche] } }
      })
    }
    setDetailTranche((prev) => ({ ...prev, [group]: tranche }))
  }

  function handleToggleSpecies(group: GroupKey, sp: string, tranche: number) {
    setCounts((prev) => {
      const g = prev[group]
      const existing = g.species.find((s) => s.name === sp)
      if (existing?.trancheHistory.includes(tranche)) {
        const species = g.species
          .map((s) =>
            s.name === sp
              ? { ...s, count: s.count - 1, trancheHistory: s.trancheHistory.filter((t) => t !== tranche) }
              : s
          )
          .filter((s) => s.count > 0)
        return { ...prev, [group]: { ...g, species } }
      }
      const species = existing
        ? g.species.map((s) =>
            s.name === sp
              ? { ...s, count: s.count + 1, trancheHistory: [...s.trancheHistory, tranche] }
              : s
          )
        : [...g.species, { name: sp, count: 1, trancheHistory: [tranche] }]
      return { ...prev, [group]: { ...g, species } }
    })
  }

  function handleRemove(group: GroupKey) {
    setCounts((prev) => {
      const g = prev[group]
      if (g.total === 0) return prev
      const lastTranche = g.trancheHistory[g.trancheHistory.length - 1]
      return {
        ...prev,
        [group]: {
          ...g,
          total: g.total - 1,
          trancheHistory: g.trancheHistory.slice(0, -1),
          species: g.species
            .map((s) => {
              if (s.trancheHistory.includes(lastTranche)) {
                return {
                  ...s,
                  count: s.count - 1,
                  trancheHistory: s.trancheHistory.filter((t) => t !== lastTranche),
                }
              }
              return s
            })
            .filter((s) => s.count > 0),
        },
      }
    })
    setDetailTranche((prev) => ({ ...prev, [group]: null }))
  }

  function handleGroupMax(group: GroupKey) {
    const allTranches = Array.from({ length: config.nbTranches }, (_, i) => i + 1)
    setCounts((prev) => ({
      ...prev,
      [group]: { ...prev[group], total: config.nbTranches, trancheHistory: allTranches },
    }))
    setDetailTranche((prev) => ({ ...prev, [group]: currentTrancheRef.current }))
  }

  async function handleValidate() {
    if (!point) return
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
    const now = new Date()
    const nbEspeces = countSpecies(counts)
    const updated: PointData = {
      ...point,
      heureDebut: pointStartTime?.toISOString() ?? point.heureDebut,
      heureFin: now.toISOString(),
      nbEspeces,
      statut: 'termine',
      counts,
      commentaire,
      timerState: buildTimerState({
        started: true,
        paused: false,
        finished: true,
        currentTranche: config.nbTranches,
        trancheElapsed: config.trancheDurationSec,
        pointStartTime,
        trancheStartTime,
      }),
    }
    await updatePoint(updated)
    const allPoints = await getPointsBySession(point.sessionId)
    const next = allPoints.find((p) => p.numero === point.numero + 1)
    router.push(next ? `/compteur?pointId=${next.id}` : '/points')
  }

  // ── Derived display values ──
  const displayTranche = Math.min(currentTranche, config.nbTranches)
  const trancheEndTime = trancheStartTime
    ? new Date(trancheStartTime.getTime() + config.trancheDurationSec * 1000)
    : null
  const pointLabel =
    session && point
      ? `${session.acronyme}-${p2(point.numero)}`
      : '—'
  const progress = (trancheElapsed / config.trancheDurationSec) * 100

  // ── Render ──

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-sm text-foreground/30">Chargement...</p>
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center">
        <p className="text-sm text-foreground/50">{loadError}</p>
        <button
          onClick={() => router.push('/points')}
          className="text-sm underline underline-offset-2 cursor-pointer"
        >
          Retour aux points
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-base font-semibold">{pointLabel}</h1>

      {/* ── Timer card ── */}
      <div className="rounded-xl border border-foreground/8 bg-background p-4 flex flex-col gap-3">
        {/* Tranche bubbles */}
        <div className="flex gap-1 justify-center">
          {Array.from({ length: config.nbTranches }, (_, i) => {
            const t = i + 1
            const done = finished || (started && t < currentTranche)
            const active = !finished && started && t === displayTranche
            return (
              <span
                key={t}
                className={`w-3 h-3 shrink-0 rounded-full transition-colors duration-300 ${
                  done
                    ? 'bg-foreground'
                    : active
                    ? 'bg-foreground/45'
                    : 'bg-foreground/10'
                }`}
              />
            )
          })}
        </div>

        {/* Tranche label + action */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium">
              Tranche {displayTranche} / {config.nbTranches}
            </p>
            <p className="text-xs text-foreground/38 mt-0.5 tabular-nums">
              {trancheStartTime ? formatHMS(trancheStartTime) : '—'}
              <span className="mx-1 text-foreground/20">→</span>
              {trancheEndTime ? formatHMS(trancheEndTime) : '—'}
            </p>
          </div>

          {!started && countdown === null && (
            <button
              type="button"
              onClick={handleStart}
              className="shrink-0 px-4 py-2 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 active:scale-[0.99] transition-all cursor-pointer"
            >
              Démarrer
            </button>
          )}

          {countdown !== null && (
            <span className="shrink-0 text-4xl font-bold tabular-nums font-mono text-foreground">
              {countdown}
            </span>
          )}

          {started && !finished && (
            <div className="flex items-center gap-2 shrink-0">
              <div className="text-right">
                <span className="text-2xl font-bold tabular-nums font-mono leading-none">
                  {p2(trancheElapsed)}
                </span>
                <span className="text-sm text-foreground/25">
                  /{p2(config.trancheDurationSec)}s
                </span>
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={paused ? handleResume : handlePause}
                  title={paused ? 'Reprendre' : 'Pause'}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-foreground/10 text-foreground/60 hover:bg-foreground/5 hover:text-foreground transition-colors cursor-pointer"
                >
                  {paused ? <Play size={14} /> : <Pause size={14} />}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  title="Réinitialiser"
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-foreground/10 text-foreground/60 hover:bg-foreground/5 hover:text-foreground transition-colors cursor-pointer"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>
          )}

          {finished && (
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#4d8c5c]/12 text-[#4d8c5c]">
                Terminé
              </span>
              <button
                type="button"
                onClick={handleReset}
                title="Réinitialiser"
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-foreground/10 text-foreground/60 hover:bg-foreground/5 hover:text-foreground transition-colors cursor-pointer"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Progress bar */}
        {started && !finished && (
          <div className="h-0.5 rounded-full bg-foreground/8 overflow-hidden">
            <div
              className={`h-full bg-foreground rounded-full ${paused ? '' : 'transition-all duration-1000 ease-linear'}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* ── Group cards ── */}
      <div className="grid grid-cols-2 gap-3 items-start">
        {GROUP_KEYS.map((group) => {
          const canAdd = started && (finished || !counts[group].trancheHistory.includes(currentTranche))
          return (
            <GroupCard
              key={group}
              groupKey={group}
              count={counts[group]}
              nbTranches={config.nbTranches}
              canAdd={canAdd}
              onAdd={() => handleAdd(group)}
              onRemove={() => handleRemove(group)}
              onMax={() => handleGroupMax(group)}
              onAddTranche={(t) => handleAddTranche(group, t)}
              detailTranche={detailTranche[group]}
              onToggleSpecies={(sp, t) => handleToggleSpecies(group, sp, t)}
            />
          )
        })}
      </div>

      {/* ── Comment ── */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">
          Remarques{' '}
          <span className="text-foreground/35 font-normal text-xs">(optionnel)</span>
        </label>
        <textarea
          value={commentaire}
          onChange={(e) => setCommentaire(e.target.value)}
          rows={3}
          placeholder="Observations particulières pour ce point..."
          className="w-full rounded-lg border border-foreground/8 bg-background px-3 py-2.5 text-sm text-foreground resize-none focus:outline-none focus:ring-1 focus:ring-foreground/30"
        />
      </div>

      {/* ── Validate ── */}
      <button
        type="button"
        onClick={handleValidate}
        disabled={!finished}
        className="w-full rounded-lg bg-foreground text-background py-3 text-sm font-medium hover:bg-foreground/90 active:scale-[0.99] transition-all disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
      >
        Valider le point
      </button>
    </div>
  )
}
