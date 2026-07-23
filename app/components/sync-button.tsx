'use client'

import { useState, useCallback } from 'react'
import { useOnlineSync } from '@/lib/hooks/use-online-sync'
import { syncAll, pullMySessions, type SyncResult, type PullResult } from '@/lib/supabase/sync'
import { RefreshCw } from 'lucide-react'
import ConflictModal from './conflict-modal'

export default function SyncButton({ userId }: { userId: string | null }) {
  const [status, setStatus] = useState<'idle' | 'syncing' | 'error'>('idle')
  const [lastResult, setLastResult] = useState<SyncResult | null>(null)
  const [showConflicts, setShowConflicts] = useState(false)
  const [lastPull, setLastPull] = useState<PullResult | null>(null)

  const handleSync = useCallback(async () => {
    if (!userId || status === 'syncing') return
    setStatus('syncing')
    try {
      const result = await syncAll(userId)
      setLastResult(result)
      if (result.conflicts.length > 0) {
        setShowConflicts(true)
      } else {
        const pull = await pullMySessions(userId)
        setLastPull(pull)
        window.dispatchEvent(new CustomEvent('synced', { detail: pull }))
      }
      setStatus(result.errors > 0 ? 'error' : 'idle')
    } catch {
      setStatus('error')
    }
  }, [userId, status])

  useOnlineSync(handleSync)

  const nConflicts = lastResult?.conflicts.length ?? 0

  const label =
    status === 'syncing'
      ? 'Sync…'
      : nConflicts > 0
        ? `${nConflicts} conflit${nConflicts > 1 ? 's' : ''}`
        : lastPull && (lastPull.imported > 0 || lastPull.merged > 0)
          ? `+${lastPull.imported} / ${lastPull.merged}`
          : 'Sync'

  return (
    <>
      <button
        type="button"
        onClick={handleSync}
        disabled={status === 'syncing' || !userId}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-foreground/55 hover:bg-foreground/5 hover:text-foreground/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        title={
          !userId
            ? 'Non connecté'
            : status === 'syncing'
              ? 'Push + Pull…'
              : nConflicts > 0
                ? `${nConflicts} conflit${nConflicts > 1 ? 's' : ''} — cliquer pour résoudre`
                : 'Synchroniser (push + pull)'
        }
      >
        <RefreshCw
          size={13}
          className={status === 'syncing' ? 'animate-spin' : ''}
        />
        <span>{label}</span>
      </button>

      {showConflicts && lastResult && lastResult.conflicts.length > 0 && userId && (
        <ConflictModal
          conflicts={lastResult.conflicts}
          userId={userId}
          onResolved={() => {
            setShowConflicts(false)
            setLastResult(null)
          }}
          onClose={() => setShowConflicts(false)}
        />
      )}
    </>
  )
}
