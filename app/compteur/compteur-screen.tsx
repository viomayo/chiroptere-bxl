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
  type SessionData,
} from '@/lib/idb'
import { getSiteConfig, type SiteTypeConfig } from '@/lib/site-config'
import { ChevronDown, ChevronUp, Pause, Play, RotateCcw } from 'lucide-react'

type GroupKey = keyof PointCounts

const GROUP_LABELS: Record<GroupKey, string> = {
  pipistrelles: 'Pipistrelles',
  murins: 'Murins',
  serotules: 'Sérotules',
  autres: 'Autres',
}

const SPECIES: Record<GroupKey, string[]> = {
  pipistrelles: [
    'Pip. commune',
    'Pip. pygmée',
    'Pip. de Nathusius',
    'Pip. de Kuhl',
  ],
  murins: [
    'M. de Daubenton',
    'M. de Natterer',
    'M. à moustaches',
    'M. de Brandt',
    'Grand Murin',
  ],
  serotules: [
    'Sérotine commune',
    'Grande Noctule',
    'Noctule de Leisler',
    'Sérotine bicolore',
  ],
  autres: [
    'Barbastelle',
    'Oreillard roux',
    'Oreillard gris',
    'Grand Rhinolophe',
    'Petit Rhinolophe',
    'Molosse de Cestoni',
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

// ── Tranche dots ──────────────────────────────────────────────────────────────

function TrancheDots({ history, nbTranches }: { history: number[]; nbTranches: number }) {
  const set = new Set(history)
  return (
    <div className="flex flex-wrap gap-1">
      {Array.from({ length: nbTranches }, (_, i) => i + 1).map((t) => (
        <span
          key={t}
          className={`w-2 h-2 rounded-full transition-colors duration-200 ${
            set.has(t) ? 'bg-foreground' : 'bg-foreground/12'
          }`}
        />
      ))}
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
  onToggle,
  expanded,
}: {
  groupKey: GroupKey
  count: GroupCount
  nbTranches: number
  canAdd: boolean
  onAdd: () => void
  onRemove: () => void
  onMax: () => void
  onToggle: () => void
  expanded: boolean
}) {
  return (
    <div className="rounded-xl border border-foreground/8 bg-background p-3 flex flex-col gap-2.5">
      <div className="flex items-center justify-between min-h-4.5">
        <span className="text-xs font-medium text-foreground/55">
          {GROUP_LABELS[groupKey]}
        </span>
        <button
          type="button"
          onClick={onToggle}
          className="text-foreground/30 hover:text-foreground/60 cursor-pointer -mr-0.5"
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
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
          className="flex-1 h-10 rounded-lg border border-foreground/10 text-xl text-foreground/55 hover:bg-foreground/5 active:bg-foreground/10 disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          −
        </button>
        <button
          type="button"
          onClick={onAdd}
          disabled={!canAdd}
          className="flex-1 h-10 rounded-lg bg-foreground/8 text-foreground text-xl font-medium hover:bg-foreground/12 active:bg-foreground/16 disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
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

      <TrancheDots history={count.trancheHistory} nbTranches={nbTranches} />
    </div>
  )
}

// ── Species detail card ───────────────────────────────────────────────────────

function SpeciesDetailCard({
  groupKey,
  count,
  nbTranches,
  onAddSpecies,
  onRemoveSpecies,
  onSpeciesMax,
}: {
  groupKey: GroupKey
  count: GroupCount
  nbTranches: number
  onAddSpecies: (sp: string) => void
  onRemoveSpecies: (sp: string) => void
  onSpeciesMax: (sp: string) => void
}) {
  const totalSpecies = count.species.filter((s) => s.count > 0).length
  return (
    <div className="rounded-xl border border-foreground/8 bg-background p-3 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium tracking-wide text-foreground/55">
          ↳ {GROUP_LABELS[groupKey]} — détail espèces
        </span>
        <span className="text-xs text-foreground/35">sp: {totalSpecies}</span>
      </div>

      {SPECIES[groupKey].map((sp) => {
        const entry = count.species.find((s) => s.name === sp)
        const n = entry?.count ?? 0
        const history = entry?.trancheHistory ?? []
        return (
          <div key={sp} className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span
                className={`text-sm flex-1 min-w-0 ${
                  n > 0 ? 'text-foreground' : 'text-foreground/40'
                }`}
              >
                {sp}
              </span>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => onRemoveSpecies(sp)}
                  disabled={n === 0}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-foreground/10 text-foreground/55 hover:bg-foreground/5 active:bg-foreground/10 disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  −
                </button>
                <span
                  className={`w-7 text-center text-sm tabular-nums font-mono ${
                    n > 0 ? 'text-foreground font-semibold' : 'text-foreground/20'
                  }`}
                >
                  {n}
                </span>
                <button
                  type="button"
                  onClick={() => onAddSpecies(sp)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-foreground/8 text-foreground hover:bg-foreground/12 active:bg-foreground/16 transition-colors cursor-pointer"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => onSpeciesMax(sp)}
                  disabled={count.total === 0}
                  className="px-2.5 h-8 rounded-lg border border-foreground/10 text-xs font-medium text-foreground/55 hover:bg-foreground/5 active:bg-foreground/10 disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  MAX
                </button>
              </div>
            </div>
            <TrancheDots history={history} nbTranches={nbTranches} />
          </div>
        )
      })}
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
  const [expandedGroups, setExpandedGroups] = useState<Set<GroupKey>>(new Set())
  const [commentaire, setCommentaire] = useState('')

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
      if (pt.statut === 'termine') { setFinished(true); setStarted(true) }
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
          announce('Fin du point')
        } else {
          const newStart = new Date()
          currentTrancheRef.current = next
          trancheElapsedRef.current = 0
          trancheStartRef.current = newStart
          setCurrentTranche(next)
          setTrancheStartTime(newStart)
          setTrancheElapsed(0)
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
    const updated: PointData = { ...point, heureDebut: now.toISOString(), statut: 'en_cours' }
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
      const updated: PointData = { ...point, heureDebut: null, statut: 'non_demarre' }
      await updatePoint(updated)
      setPoint(updated)
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
    setCounts(defaultCounts())
    setExpandedGroups(new Set())
  }

  // ── Count handlers ────────────────────────────────────────────────────────

  function handleAdd(group: GroupKey) {
    const tranche = currentTrancheRef.current
    setCounts((prev) => {
      const g = prev[group]
      if (g.trancheHistory.includes(tranche)) return prev
      return {
        ...prev,
        [group]: {
          ...g,
          total: g.total + 1,
          trancheHistory: [...g.trancheHistory, tranche],
        },
      }
    })
    setExpandedGroups((prev) => new Set(prev).add(group))
  }

  function handleRemove(group: GroupKey) {
    setCounts((prev) => {
      const g = prev[group]
      if (g.total === 0) return prev
      return {
        ...prev,
        [group]: {
          ...g,
          total: g.total - 1,
          trancheHistory: g.trancheHistory.slice(0, -1),
        },
      }
    })
  }

  function handleGroupMax(group: GroupKey) {
    const allTranches = Array.from({ length: config.nbTranches }, (_, i) => i + 1)
    setCounts((prev) => ({
      ...prev,
      [group]: { ...prev[group], total: config.nbTranches, trancheHistory: allTranches },
    }))
    setExpandedGroups((prev) => new Set(prev).add(group))
  }

  function handleAddSpecies(group: GroupKey, sp: string) {
    const tranche = currentTrancheRef.current
    setCounts((prev) => {
      const g = prev[group]
      const existing = g.species.find((s) => s.name === sp)
      const species = existing
        ? g.species.map((s) =>
            s.name === sp
              ? {
                  ...s,
                  count: s.count + 1,
                  trancheHistory: s.trancheHistory.includes(tranche)
                    ? s.trancheHistory
                    : [...s.trancheHistory, tranche],
                }
              : s
          )
        : [...g.species, { name: sp, count: 1, trancheHistory: [tranche] }]
      return { ...prev, [group]: { ...g, species } }
    })
  }

  function handleRemoveSpecies(group: GroupKey, sp: string) {
    setCounts((prev) => {
      const g = prev[group]
      const existing = g.species.find((s) => s.name === sp)
      if (!existing || existing.count === 0) return prev
      const species = g.species.map((s) =>
        s.name === sp ? { ...s, count: s.count - 1 } : s
      )
      return { ...prev, [group]: { ...g, species } }
    })
  }

  function handleSpeciesMax(group: GroupKey, sp: string) {
    setCounts((prev) => {
      const g = prev[group]
      if (g.total === 0) return prev
      const existing = g.species.find((s) => s.name === sp)
      const species = existing
        ? g.species.map((s) =>
            s.name === sp
              ? { ...s, count: g.total, trancheHistory: [...g.trancheHistory] }
              : s
          )
        : [...g.species, { name: sp, count: g.total, trancheHistory: [...g.trancheHistory] }]
      return { ...prev, [group]: { ...g, species } }
    })
  }

  async function handleValidate() {
    if (!point) return
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
    const now = new Date()
    const groups: GroupKey[] = ['pipistrelles', 'murins', 'serotules', 'autres']
    const nbEspeces =
      groups.reduce((acc, g) => acc + counts[g].species.filter((s) => s.count > 0).length, 0) ||
      groups.filter((g) => counts[g].total > 0).length
    const updated: PointData = {
      ...point,
      heureDebut: pointStartTime?.toISOString() ?? point.heureDebut,
      heureFin: now.toISOString(),
      nbEspeces,
      statut: 'termine',
      counts,
      commentaire,
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

  const groups: GroupKey[] = ['pipistrelles', 'murins', 'serotules', 'autres']

  function toggleGroup(group: GroupKey) {
    setExpandedGroups((prev) => {
      const next = new Set(prev)
      next.has(group) ? next.delete(group) : next.add(group)
      return next
    })
  }

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
        <div className="flex flex-wrap gap-1.5">
          {Array.from({ length: config.nbTranches }, (_, i) => {
            const t = i + 1
            const done = finished || (started && t < currentTranche)
            const active = !finished && started && t === displayTranche
            return (
              <span
                key={t}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
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
        {groups.map((group) => {
          const canAdd =
            started && (finished || !counts[group].trancheHistory.includes(currentTranche))
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
              expanded={expandedGroups.has(group)}
              onToggle={() => toggleGroup(group)}
            />
          )
        })}
      </div>

      {/* ── Species detail cards ── */}
      {groups.filter((g) => expandedGroups.has(g)).map((group) => (
        <SpeciesDetailCard
          key={group}
          groupKey={group}
          count={counts[group]}
          nbTranches={config.nbTranches}
          onAddSpecies={(sp) => handleAddSpecies(group, sp)}
          onRemoveSpecies={(sp) => handleRemoveSpecies(group, sp)}
          onSpeciesMax={(sp) => handleSpeciesMax(group, sp)}
        />
      ))}

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
