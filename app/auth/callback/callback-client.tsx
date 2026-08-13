'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  AUTH_ERROR_PATH,
  completeOAuthExchange,
  destinationAfterCodeExchange,
  readCodeVerifier,
} from './callback-flow'

export default function CallbackClient() {
  const searchParams = useSearchParams()
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true

    const code = searchParams.get('code')
    const codeVerifier = readCodeVerifier()

    void destinationAfterCodeExchange(
      code,
      (exchangeCode) => completeOAuthExchange(exchangeCode, codeVerifier),
    ).then((destination) => {
      window.location.replace(destination)
    }).catch(() => {
      window.location.replace(AUTH_ERROR_PATH)
    })
  }, [searchParams])

  return <p className="text-sm text-foreground/60">Finalisation de la connexion…</p>
}
