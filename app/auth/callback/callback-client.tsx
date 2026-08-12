'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AUTH_ERROR_PATH, destinationAfterCodeExchange } from './callback-flow'

export default function CallbackClient() {
  const searchParams = useSearchParams()
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true

    const supabase = createClient()
    void destinationAfterCodeExchange(
      searchParams.get('code'),
      (code) => supabase.auth.exchangeCodeForSession(code),
    ).then((destination) => {
      window.location.replace(destination)
    }).catch(() => {
      window.location.replace(AUTH_ERROR_PATH)
    })
  }, [searchParams])

  return <p className="text-sm text-foreground/60">Finalisation de la connexion…</p>
}
