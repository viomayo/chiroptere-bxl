import { createClient, SUPABASE_AUTH_STORAGE_KEY } from '@/lib/supabase/client'

export const AUTH_ERROR_PATH = '/auth/auth-code-error'

export async function destinationAfterCodeExchange(
  code: string | null,
  exchangeCodeForSession: (code: string) => Promise<{ error: unknown }>,
): Promise<string> {
  if (!code) return AUTH_ERROR_PATH
  const { error } = await exchangeCodeForSession(code)
  return error ? AUTH_ERROR_PATH : '/'
}

export function readCodeVerifier(): string | null {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(`${SUPABASE_AUTH_STORAGE_KEY}-code-verifier`)
}

export async function completeOAuthExchange(
  code: string,
  codeVerifier: string | null,
): Promise<{ error: unknown }> {
  if (!codeVerifier) return { error: new Error('pkce_code_verifier_not_found') }

  let response: Response
  try {
    response = await fetch('/api/auth/exchange', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, codeVerifier }),
    })
  } catch (error) {
    return { error }
  }

  const payload: unknown = await response.json().catch(() => null)
  const session = (payload as {
    session?: { access_token?: string; refresh_token?: string }
  } | null)?.session

  if (!response.ok || !session?.access_token || !session.refresh_token) {
    return { error: new Error(`oauth_exchange_failed:${response.status}`) }
  }

  const { error } = await createClient().auth.setSession({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
  })
  return { error }
}
