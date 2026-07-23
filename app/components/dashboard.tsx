'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  getSessions,
  getAllPoints,
  getRemoteSessions,
  getAllRemotePoints,
  deleteSession,
  type SessionData,
  type PointData,
  type PointCounts,
  type RemoteSessionData,
  type RemotePointData,
} from '@/lib/idb'
import { getStoredConflicts, pullAllSessionsForSupervisor, deleteSessionFromSupabase, type SyncConflict } from '@/lib/supabase/sync'
import { MapPin, Radio, Plus, ArrowRight, ChevronRight, AlertTriangle, Download, Users, Trash2 } from 'lucide-react'

// ── helpers ───────────────────────────────────────────────────────────────────

function contactsForPoint(counts: PointCounts): number {
  return counts.pipistrelles.total + counts.murins.total + counts.serotules.total + counts.autres.total
}

function distinctSpeciesCount(points: PointData[]): number {
  const names = new Set<string>()
  for (const p of points) {
    for (const g of [p.counts.pipistrelles, p.counts.murins, p.counts.serotules, p.counts.autres]) {
      for (const sp of g.species) {
        if (sp.count > 0) names.add(sp.name)
      }
    }
  }
  return names.size
}

function formatShortDate(iso: string): string {
  return new Intl.DateTimeFormat('fr-BE', {
    day: '2-digit', month: '2-digit', year: '2-digit',
  }).format(new Date(iso))
}

function getGreeting(firstName: string): string {
  const h = new Date().getHours()
  const salut = h >= 5 && h < 12 ? 'Bonjour' : h < 17 ? 'Bon après-midi' : 'Bonsoir'
  return `${salut}, ${firstName} !`
}

function formatLongDate(): string {
  return new Intl.DateTimeFormat('fr-BE', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  }).format(new Date())
}

// ── stat chip ─────────────────────────────────────────────────────────────────

function StatChip({ label, value, sub }: { label: string; value: number; sub?: string }) {
  return (
    <div className="rounded-xl border border-foreground/8 bg-background px-4 py-3.5 flex flex-col gap-1.5">
      <span className="text-xs text-foreground/40 leading-none">{label}</span>
      <span className="text-2xl font-bold tabular-nums leading-none">{value}</span>
      {sub && <span className="text-[11px] text-foreground/30 leading-none">{sub}</span>}
    </div>
  )
}

// ── group bar ─────────────────────────────────────────────────────────────────

function GroupBar({ label, value, total }: { label: string; value: number; total: number }) {
  const pct = total > 0 ? (value / total) * 100 : 0
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-foreground/45 w-24 shrink-0 text-right leading-none">{label}</span>
      <div className="flex-1 h-1 rounded-full bg-foreground/8 overflow-hidden">
        <div
          className="h-full bg-foreground/35 rounded-full"
          style={{ width: `${pct}%`, transition: 'width 600ms ease' }}
        />
      </div>
      <span className="text-xs tabular-nums font-mono text-foreground/40 w-6 text-right leading-none">
        {value}
      </span>
    </div>
  )
}

// ── main ──────────────────────────────────────────────────────────────────────

export default function Dashboard({ name, userId, isSupervisor }: { name: string; userId: string | null; isSupervisor: boolean }) {
  const router = useRouter()
  const firstName = name.split(' ')[0]

  const [loading, setLoading] = useState(true)
  const [sessions, setSessions] = useState<SessionData[]>([])
  const [allPoints, setAllPoints] = useState<PointData[]>([])
  const [conflicts, setConflicts] = useState<SyncConflict[]>(() => getStoredConflicts())
  const [remoteSessions, setRemoteSessions] = useState<RemoteSessionData[]>([])
  const [remotePoints, setRemotePoints] = useState<RemotePointData[]>([])
  const [pulling, setPulling] = useState(false)
  const [pullError, setPullError] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function handleDelete(sessionId: string, e: React.MouseEvent) {
    e.stopPropagation()
    if (!window.confirm('Supprimer cette session et tous ses points ?')) return
    setDeletingId(sessionId)
    await deleteSession(sessionId)
    if (userId) await deleteSessionFromSupabase(sessionId)
    setSessions((prev) => prev.filter((s) => s.id !== sessionId))
    setDeletingId(null)
  }

  const loadData = useCallback(async () => {
    const [s, p, rs, rp] = await Promise.all([getSessions(), getAllPoints(), getRemoteSessions(), getAllRemotePoints()])
    setSessions(s)
    setAllPoints(p)
    setRemoteSessions(rs.filter((r) => r.userId !== userId))
    setRemotePoints(rp)
  }, [userId])

  useEffect(() => {
    let active = true
    Promise.all([getSessions(), getAllPoints(), getRemoteSessions(), getAllRemotePoints()]).then(([s, p, rs, rp]) => {
      if (!active) return
      setSessions(s)
      setAllPoints(p)
      setRemoteSessions(rs.filter((r) => r.userId !== userId))
      setRemotePoints(rp)
      setLoading(false)
    })
    const onSync = () => { loadData() }
    window.addEventListener('synced', onSync)
    return () => { active = false; window.removeEventListener('synced', onSync) }
  }, [userId, loadData])

  useEffect(() => {
    const interval = setInterval(() => {
      setConflicts(getStoredConflicts())
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const handlePullRemote = useCallback(async () => {
    if (!userId || pulling) return
    setPulling(true)
    setPullError(false)
    try {
      await pullAllSessionsForSupervisor()
      const [s, p, rs, rp] = await Promise.all([getSessions(), getAllPoints(), getRemoteSessions(), getAllRemotePoints()])
      setSessions(s)
      setAllPoints(p)
      setRemoteSessions(rs.filter((r) => r.userId !== userId))
      setRemotePoints(rp)
    } catch {
      setPullError(true)
    } finally {
      setPulling(false)
    }
  }, [userId, pulling])

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-sm text-foreground/30">Chargement...</p>
      </div>
    )
  }

  const sortedSessions = [...sessions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  // Group points by session
  const ptsBySession: Record<string, PointData[]> = {}
  for (const p of allPoints) {
    ;(ptsBySession[p.sessionId] ??= []).push(p)
  }

  // Active session: most recent with at least one non-terminated point
  const activeSession =
    sortedSessions.find((s) => {
      const pts = ptsBySession[s.id] ?? []
      return pts.length > 0 && pts.some((p) => p.statut !== 'termine')
    }) ?? null
  const activePoints = activeSession ? (ptsBySession[activeSession.id] ?? []) : []
  const activeDone = activePoints.filter((p) => p.statut === 'termine').length

  // Global stats
  const totalContactsAll = allPoints.reduce((acc, p) => acc + contactsForPoint(p.counts), 0)
  const donePointsAll = allPoints.filter((p) => p.statut === 'termine').length
  const speciesCount = distinctSpeciesCount(allPoints)

  // Group totals for breakdown
  const groupTotals = {
    pipistrelles: allPoints.reduce((acc, p) => acc + p.counts.pipistrelles.total, 0),
    murins: allPoints.reduce((acc, p) => acc + p.counts.murins.total, 0),
    serotules: allPoints.reduce((acc, p) => acc + p.counts.serotules.total, 0),
    autres: allPoints.reduce((acc, p) => acc + p.counts.autres.total, 0),
  }

  // Recent sessions enriched
  const recentSessions = sortedSessions.slice(0, 6).map((s) => {
    const pts = ptsBySession[s.id] ?? []
    const done = pts.filter((p) => p.statut === 'termine').length
    const contacts = pts.reduce((acc, p) => acc + contactsForPoint(p.counts), 0)
    const total = pts.length > 0 ? pts.length : s.nbPointsEcoute
    return { session: s, done, contacts, total }
  })

  const hasData = sessions.length > 0
  const hasRemoteData = remoteSessions.length > 0
  const showEmptyState = !hasData && !hasRemoteData
  const conflictIds = new Set(conflicts.map((c) => c.sessionId))

  return (
    <div className="flex flex-col gap-6">

      {/* Conflict banner */}
      {conflicts.length > 0 && (
        <div className="rounded-xl border border-[#b87840]/20 bg-[#b87840]/6 px-4 py-3 flex items-center gap-2.5">
          <AlertTriangle size={14} className="text-[#b87840] shrink-0" />
          <p className="text-xs text-foreground/70 flex-1">
            {conflicts.length} session{conflicts.length > 1 ? 's' : ''} en conflit — utilisez le bouton <strong>Sync</strong> dans l&apos;en-tête pour résoudre.
          </p>
        </div>
      )}

      {/* Greeting */}
      <div>
        <h1 className="text-lg font-semibold tracking-tight">{getGreeting(firstName)}</h1>
        <p className="text-xs text-foreground/35 capitalize mt-0.5">{formatLongDate()}</p>
      </div>

      {/* Empty state */}
      {showEmptyState && (
        <div className="rounded-xl border border-foreground/8 bg-background px-6 py-12 flex flex-col items-center gap-4 text-center">
          <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center">
            <Radio size={18} className="text-foreground/25" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Aucune session enregistrée</p>
            <p className="text-xs text-foreground/35">
              Créez votre première session de terrain pour commencer.
            </p>
          </div>
          <Link
            href="/site"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 active:scale-[0.99] transition-all"
          >
            <Plus size={14} />
            Nouvelle session
          </Link>
        </div>
      )}

      {/* Active session banner */}
      {activeSession && (
        <button
          type="button"
          onClick={() => router.push(`/points?sessionId=${activeSession.id}`)}
          className="w-full text-left rounded-xl border border-[#b87840]/20 bg-[#b87840]/6 px-4 py-4 flex items-center justify-between gap-3 hover:bg-[#b87840]/9 active:bg-[#b87840]/12 transition-colors cursor-pointer"
        >
          <div className="flex flex-col gap-1.5 min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b87840] shrink-0 animate-pulse" />
              <span className="text-xs font-medium text-[#b87840]">Session en cours</span>
            </div>
            <p className="text-sm font-semibold truncate">{activeSession.nomSite}</p>
            <p className="text-xs text-foreground/40">
              {activeDone}&thinsp;/&thinsp;{activePoints.length} points terminés
            </p>
            {activePoints.length > 0 && (
              <div className="h-0.5 rounded-full bg-foreground/8 overflow-hidden mt-0.5 w-40">
                <div
                  className="h-full bg-[#b87840]/50 rounded-full"
                  style={{
                    width: `${(activeDone / activePoints.length) * 100}%`,
                    transition: 'width 600ms ease',
                  }}
                />
              </div>
            )}
          </div>
          <ArrowRight size={15} className="text-foreground/25 shrink-0" />
        </button>
      )}

      {/* Stat chips */}
      {hasData && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatChip label="Sessions" value={sessions.length} />
          <StatChip
            label="Points terminés"
            value={donePointsAll}
            sub={allPoints.length > 0 ? `sur ${allPoints.length}` : undefined}
          />
          <StatChip label="Contacts" value={totalContactsAll} />
          <StatChip label="Espèces vues" value={speciesCount} />
        </div>
      )}

      {/* Group breakdown */}
      {hasData && totalContactsAll > 0 && (
        <div className="rounded-xl border border-foreground/8 bg-background px-4 py-4 flex flex-col gap-3">
          <p className="text-xs text-foreground/38 uppercase tracking-widest font-medium">
            Répartition des contacts
          </p>
          <div className="flex flex-col gap-2.5 mt-0.5">
            <GroupBar label="Pipistrelles" value={groupTotals.pipistrelles} total={totalContactsAll} />
            <GroupBar label="Murins" value={groupTotals.murins} total={totalContactsAll} />
            <GroupBar label="Sérotules" value={groupTotals.serotules} total={totalContactsAll} />
            <GroupBar label="Autres" value={groupTotals.autres} total={totalContactsAll} />
          </div>
        </div>
      )}

      {/* Recent sessions */}
      {hasData && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-foreground/38 uppercase tracking-widest font-medium">
              Sessions récentes
            </p>
            <Link
              href="/site"
              className="flex items-center gap-1 text-xs text-foreground/38 hover:text-foreground/65 transition-colors"
            >
              <Plus size={11} />
              Nouvelle
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            {recentSessions.map(({ session, done, contacts, total }) => (
              <button
                key={session.id}
                type="button"
                onClick={() => router.push(`/points?sessionId=${session.id}`)}
                className="w-full text-left rounded-xl border border-foreground/8 bg-background px-4 py-3.5 flex items-center gap-3 hover:bg-foreground/3 active:bg-foreground/6 transition-colors cursor-pointer"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-medium truncate">{session.nomSite}</span>
                    <span className="text-xs text-foreground/30 font-mono tabular-nums shrink-0">
                      {formatShortDate(session.debutSession)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-foreground/40">
                    <span className="flex items-center gap-1">
                      <MapPin size={10} className="shrink-0" />
                      {session.typeSite}
                    </span>
                    <span className="text-foreground/18">·</span>
                    <span>{done}/{total} pts</span>
                    {contacts > 0 && (
                      <>
                        <span className="text-foreground/18">·</span>
                        <span>{contacts} contacts</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      conflictIds.has(session.id)
                        ? 'bg-[#b87840]'
                        : session.syncedAt
                          ? 'bg-[#4d8c5c]'
                          : 'bg-foreground/12'
                    }`}
                    title={
                      conflictIds.has(session.id)
                        ? 'Conflit'
                        : session.syncedAt
                          ? 'Synchronisé'
                          : 'Non synchronisé'
                    }
                  />
                  <button
                    type="button"
                    onClick={(e) => handleDelete(session.id, e)}
                    disabled={deletingId === session.id}
                    className="p-1 rounded-md hover:bg-red-500/10 text-foreground/20 hover:text-red-500/70 disabled:opacity-30 transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 size={13} />
                  </button>
                  <ChevronRight size={13} className="text-foreground/20" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Supervisor: remote data */}
      {isSupervisor && (
        <div className="flex flex-col gap-3 border-t border-foreground/6 pt-4 mt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users size={14} className="text-foreground/40" />
              <p className="text-xs text-foreground/38 uppercase tracking-widest font-medium">
                Données des autres utilisateurs
              </p>
            </div>
            <button
              type="button"
              onClick={handlePullRemote}
              disabled={pulling}
              className="flex items-center gap-1 text-xs text-foreground/38 hover:text-foreground/65 transition-colors disabled:opacity-40 cursor-pointer"
            >
              <Download size={11} className={pulling ? 'animate-bounce' : ''} />
              {pulling ? 'Récupération…' : 'Récupérer'}
            </button>
          </div>

          {pullError && (
            <div className="rounded-lg border border-red/20 bg-red/6 px-3 py-2">
              <p className="text-xs text-red font-medium">
                Erreur lors de la récupération des données. Vérifie ta connexion et réessaie.
              </p>
            </div>
          )}

          {remoteSessions.length === 0 && !pulling && !pullError && (
            <p className="text-xs text-foreground/30 text-center py-4">
              Aucune donnée distante. Cliquez sur « Récupérer » pour importer les données de tous les utilisateurs.
            </p>
          )}

          {pulling && (
            <p className="text-xs text-foreground/30 text-center py-4">
              Récupération des données depuis Supabase…
            </p>
          )}

          <div className="flex flex-col gap-2">
            {remoteSessions.map((s) => {
              const pts = remotePoints.filter((p) => p.sessionId === s.id)
              const done = pts.filter((p) => p.statut === 'termine').length
              const contacts = pts.reduce((acc, p) => {
                const c = p.counts
                return acc + c.pipistrelles.total + c.murins.total + c.serotules.total + c.autres.total
              }, 0)
              const total = pts.length || s.nbPointsEcoute
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => router.push(`/points?sessionId=${s.id}`)}
                  className="w-full text-left rounded-xl border border-foreground/8 bg-background px-4 py-3.5 flex items-center gap-3 hover:bg-foreground/3 active:bg-foreground/6 transition-colors cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-sm font-medium truncate">{s.nomSite}</span>
                      <span className="text-xs text-foreground/30 font-mono tabular-nums shrink-0">
                        {formatShortDate(s.debutSession)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-foreground/40">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-foreground/8 text-foreground/45 font-medium uppercase tracking-wider">
                        {s.userId.substring(0, 8)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={10} className="shrink-0" />
                        {s.typeSite}
                      </span>
                      <span className="text-foreground/18">·</span>
                      <span>{done}/{total} pts</span>
                      {contacts > 0 && (
                        <>
                          <span className="text-foreground/18">·</span>
                          <span>{contacts} contacts</span>
                        </>
                      )}
                    </div>
                  </div>
                  <ChevronRight size={13} className="text-foreground/20" />
                </button>
              )
            })}
          </div>
        </div>
      )}

    </div>
  )
}
