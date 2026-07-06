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

function getSessionFromCookies(allCookies: { name: string; value: string }[]): {
  userId: string | null
  userName: string | null
  userAvatar: string | null
} {
  const authCookie = allCookies.find((c) => c.name.startsWith('sb-') && c.name.endsWith('-auth-token'))
  if (!authCookie) return { userId: null, userName: null, userAvatar: null }

  const parsed = decodeJWT(authCookie.value)
  if (!parsed) return { userId: null, userName: null, userAvatar: null }

  const md = parsed.user_metadata as Record<string, unknown> | undefined
  return {
    userId: (parsed.sub as string) ?? null,
    userName: (md?.full_name as string) ?? (md?.name as string) ?? null,
    userAvatar: (md?.avatar_url as string) ?? null,
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

  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      userId = user.id
      userName =
        (user.user_metadata?.full_name as string | undefined) ??
        (user.user_metadata?.name as string | undefined) ??
        user.email ??
        null
      userAvatar = (user.user_metadata?.avatar_url as string | undefined) ?? null
    }
  } catch {
    // Offline: fall back to cookie
    const cookieSession = getSessionFromCookies(request.cookies.getAll())
    userId = cookieSession.userId
    userName = cookieSession.userName
    userAvatar = cookieSession.userAvatar
  }

  if (!userId && !isPublic) {
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
  }

  return applyPending(NextResponse.next({ request: { headers: requestHeaders } }))
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|favicon-.*\\.png|logo\\.png|icon-.*\\.png|sw\\.js|manifest).*)',
  ],
}
