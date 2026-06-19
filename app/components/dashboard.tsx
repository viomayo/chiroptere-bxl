'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  getSessions,
  getAllPoints,
  type SessionData,
  type PointData,
  type PointCounts,
} from '@/lib/idb'
import { MapPin, Radio, Plus, ArrowRight, ChevronRight } from 'lucide-react'

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

export default function Dashboard({ name }: { name: string }) {
  const router = useRouter()
  const firstName = name.split(' ')[0]

  const [loading, setLoading] = useState(true)
  const [sessions, setSessions] = useState<SessionData[]>([])
  const [allPoints, setAllPoints] = useState<PointData[]>([])

  useEffect(() => {
    let active = true
    Promise.all([getSessions(), getAllPoints()]).then(([s, p]) => {
      if (!active) return
      setSessions(s)
      setAllPoints(p)
      setLoading(false)
    })
    return () => { active = false }
  }, [])

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

  return (
    <div className="flex flex-col gap-6">

      {/* Greeting */}
      <div>
        <h1 className="text-lg font-semibold tracking-tight">{getGreeting(firstName)}</h1>
        <p className="text-xs text-foreground/35 capitalize mt-0.5">{formatLongDate()}</p>
      </div>

      {/* Empty state */}
      {!hasData && (
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
                      session.syncedAt ? 'bg-[#4d8c5c]' : 'bg-foreground/12'
                    }`}
                    title={session.syncedAt ? 'Synchronisé' : 'Non synchronisé'}
                  />
                  <ChevronRight size={13} className="text-foreground/20" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
