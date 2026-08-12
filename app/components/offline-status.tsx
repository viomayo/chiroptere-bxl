'use client'

import { useCallback, useEffect, useState } from 'react'
import { CURRENT_SHELL_VERSION, getOfflineStatus, prepareOffline, type OfflineStatus } from '@/lib/offline/readiness'
import { setOfflinePreparedVersion } from '@/lib/idb'
import { useOfflineAuth } from './offline-auth-provider'

type DisplayState = 'checking' | 'preparing' | 'ready' | 'incomplete' | 'update'

let preparationInFlight: Promise<OfflineStatus> | null = null

function prepareOnce(): Promise<OfflineStatus> {
  if (!preparationInFlight) {
    preparationInFlight = prepareOffline().finally(() => {
      preparationInFlight = null
    })
  }
  return preparationInFlight
}

export default function OfflineStatusIndicator() {
  const auth = useOfflineAuth()
  const [display, setDisplay] = useState<DisplayState>('checking')
  const [isOnline, setIsOnline] = useState(() => typeof navigator === 'undefined' || navigator.onLine)

  const check = useCallback(async () => {
    const shouldPrepare = auth.status === 'online'
    setDisplay(shouldPrepare ? 'preparing' : 'checking')

    try {
      const status = shouldPrepare ? await prepareOnce() : await getOfflineStatus()
      if (status.ready) {
        if (auth.user) {
          try {
            await setOfflinePreparedVersion(auth.user.ownerId, status.version)
          } catch {
            // La métadonnée est complémentaire : le statut technique du SW reste vrai.
          }
        }
        setDisplay('ready')
      } else {
        setDisplay(status.version !== CURRENT_SHELL_VERSION ? 'update' : 'incomplete')
      }
    } catch {
      setDisplay('incomplete')
    }
  }, [auth.status, auth.user])

  useEffect(() => {
    if (auth.status === 'loading' || auth.status === 'unauthenticated' || !auth.user) return
    const initialCheck = window.setTimeout(() => void check(), 0)

    const refresh = () => {
      setIsOnline(navigator.onLine)
      void check()
    }
    window.addEventListener('online', refresh)
    window.addEventListener('offline', refresh)
    navigator.serviceWorker?.addEventListener('controllerchange', refresh)
    return () => {
      window.clearTimeout(initialCheck)
      window.removeEventListener('online', refresh)
      window.removeEventListener('offline', refresh)
      navigator.serviceWorker?.removeEventListener('controllerchange', refresh)
    }
  }, [auth.status, auth.user, check])

  if (auth.status === 'loading' || auth.status === 'unauthenticated' || !auth.user) return null

  if (display === 'checking') return <StatusChip label="Vérification du mode hors ligne…" />
  if (display === 'preparing') return <StatusChip label="Préparation du mode hors ligne…" />
  if (display === 'ready') {
    return (
      <StatusChip
        label={isOnline ? 'En ligne — Prêt hors ligne' : 'Hors ligne — application prête'}
        ready
      />
    )
  }

  return (
    <div className="flex items-center gap-1.5 rounded-full border border-amber-500/25 px-2 py-1 text-[11px] text-amber-700 dark:text-amber-300">
      <span>{display === 'update' ? 'Mise à jour de l’application requise' : 'Mode hors ligne incomplet'}</span>
      <button type="button" onClick={() => void check()} className="font-medium underline underline-offset-2 cursor-pointer">
        Réessayer
      </button>
    </div>
  )
}

function StatusChip({ label, ready = false }: { label: string; ready?: boolean }) {
  return (
    <div className={`flex items-center gap-1.5 rounded-full border px-2 py-1 text-[11px] ${
      ready
        ? 'border-emerald-500/25 text-emerald-700 dark:text-emerald-300'
        : 'border-foreground/10 text-foreground/45'
    }`}>
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${ready ? 'bg-emerald-500' : 'bg-foreground/25'}`} />
      <span>{label}</span>
    </div>
  )
}
