import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { CookieOptions } from '@supabase/ssr'

type PendingCookie = { name: string; value: string; options: CookieOptions }

function decodeJWT(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split('.')[1]
    if (!payload) return null
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
  } catch {
    return null
  }
}

function base64urlDecode(str: string): string {
  let b64 = str.replace(/-/g, '+').replace(/_/g, '/')
  while (b64.length % 4) b64 += '='
  return atob(b64)
}

const B64URL_PREFIX = 'base64-'

// Supabase SSR (cookieEncoding: "base64url") stocke le token JWT sous
// la forme "base64-" + base64url(jwt).  Le token peut être fragmenté en
// plusieurs cookies sb-{ref}-auth-token.0, .1, … si > 3KB.
// Cette fonction combine les fragments et décode la valeur.
function extractAuthToken(allCookies: { name: string; value: string }[]): string | null {
  const basePattern = /^sb-.+-auth-token$/
  const chunkPattern = /^(sb-.+-auth-token)\.(\d+)$/

  const baseCookie = allCookies.find((c) => basePattern.test(c.name))
  if (baseCookie) return baseCookie.value

  const chunks = allCookies
    .map((c) => ({ m: c.name.match(chunkPattern), v: c.value }))
    .filter((c): c is { m: RegExpMatchArray; v: string } => c.m !== null)
    .sort((a, b) => parseInt(a.m[2], 10) - parseInt(b.m[2], 10))

  if (chunks.length === 0) return null
  return chunks.map((c) => c.v).join('')
}

function parseTokenValue(raw: string): Record<string, unknown> | null {
  const value = raw.startsWith(B64URL_PREFIX)
    ? base64urlDecode(raw.slice(B64URL_PREFIX.length))
    : raw
  return decodeJWT(value)
}

function getSessionFromCookies(allCookies: { name: string; value: string }[]): {
  userId: string | null
  userName: string | null
  userAvatar: string | null
  userEmail: string | null
} {
  const token = extractAuthToken(allCookies)
  if (!token) return { userId: null, userName: null, userAvatar: null, userEmail: null }

  const parsed = parseTokenValue(token)
  if (!parsed) return { userId: null, userName: null, userAvatar: null, userEmail: null }

  const md = parsed.user_metadata as Record<string, unknown> | undefined
  return {
    userId: (parsed.sub as string) ?? null,
    userName: (md?.full_name as string) ?? (md?.name as string) ?? null,
    userAvatar: (md?.avatar_url as string) ?? null,
    userEmail: (parsed.email as string) ?? null,
  }
}

export async function proxy(request: NextRequest) {
  const pending: PendingCookie[] = []

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookies) => { pending.push(...cookies) },
      },
    }
  )

  const { pathname } = request.nextUrl

  function applyPending(response: NextResponse): NextResponse {
    pending.forEach(({ name, value, options }) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      response.cookies.set(name, value, options as any)
    )
    return response
  }

  const isPublic = pathname.startsWith('/login') || pathname.startsWith('/auth')

  let userId: string | null = null
  let userName: string | null = null
  let userAvatar: string | null = null
  let userEmail: string | null = null

  // Extraire la session depuis le cookie d'abord (0ms, pas de réseau)
  const cookieSession = getSessionFromCookies(request.cookies.getAll())
  userId = cookieSession.userId
  userName = cookieSession.userName
  userAvatar = cookieSession.userAvatar
  userEmail = cookieSession.userEmail

  if (!isPublic && !userId) {
    return applyPending(NextResponse.redirect(new URL('/login', request.url)))
  }

  if (userId && pathname === '/login') {
    return applyPending(NextResponse.redirect(new URL('/', request.url)))
  }

  const requestHeaders = new Headers(request.headers)
  if (userId) {
    requestHeaders.set('x-user-id', userId)
    requestHeaders.set('x-user-name', encodeURIComponent(userName ?? 'Utilisateur'))
    if (userAvatar) requestHeaders.set('x-user-avatar', userAvatar)

    // Vérifier si l'utilisateur est superviseur (best-effort, pas de fallback offline)
    if (userEmail) {
      try {
        const { count } = await supabase
          .from('supervisors')
          .select('*', { count: 'exact', head: true })
          .ilike('email', userEmail)
        if (count && count > 0) {
          requestHeaders.set('x-user-is-supervisor', 'true')
        }
      } catch {
        // offline — on ne bloque pas l'accès
      }
    }
  }

  return applyPending(NextResponse.next({ request: { headers: requestHeaders } }))
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|favicon-.*\\.png|logo\\.png|icon-.*\\.png|sw\\.js|manifest).*)',
  ],
}
