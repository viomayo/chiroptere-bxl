'use client'

import { useState, useCallback } from 'react'
import { useOnlineSync } from '@/lib/hooks/use-online-sync'
import { syncAll, type SyncResult } from '@/lib/supabase/sync'
import { RefreshCw } from 'lucide-react'
import ConflictModal from './conflict-modal'

export default function SyncButton({ userId }: { userId: string | null }) {
  const [status, setStatus] = useState<'idle' | 'syncing' | 'error'>('idle')
  const [lastResult, setLastResult] = useState<SyncResult | null>(null)
  const [showConflicts, setShowConflicts] = useState(false)

  const handleSync = useCallback(async () => {
    if (!userId || status === 'syncing') return
    setStatus('syncing')
    try {
      const result = await syncAll(userId)
      setLastResult(result)
      setStatus(result.errors > 0 ? 'error' : 'idle')
      if (result.conflicts.length > 0) {
        setShowConflicts(true)
      }
    } catch {
      setStatus('error')
    }
  }, [userId, status])

  useOnlineSync(handleSync)

  const nConflicts = lastResult?.conflicts.length ?? 0

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
              ? 'Synchronisation…'
              : nConflicts > 0
                ? `${nConflicts} conflit${nConflicts > 1 ? 's' : ''}`
                : 'Synchroniser'
        }
      >
        <RefreshCw
          size={13}
          className={status === 'syncing' ? 'animate-spin' : ''}
        />
        <span>
          {status === 'syncing'
            ? 'Sync…'
            : nConflicts > 0
              ? `${nConflicts} conflit${nConflicts > 1 ? 's' : ''}`
              : 'Sync'}
        </span>
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
