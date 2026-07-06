'use client'

import { useEffect } from 'react'

export function useOnlineSync(onSync: () => void) {
  useEffect(() => {
    function handleOnline() {
      if (navigator.onLine) {
        onSync()
      }
    }

    window.addEventListener('online', handleOnline)
    return () => window.removeEventListener('online', handleOnline)
  }, [onSync])
}
