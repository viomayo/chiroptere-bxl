import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { CookieOptions } from '@supabase/ssr'

type PendingCookie = { name: string; value: string; options: CookieOptions }

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

  const { data: { user } } = await supabase.auth.getUser()
  const { pathname } = request.nextUrl

  function applyPending(response: NextResponse): NextResponse {
    pending.forEach(({ name, value, options }) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      response.cookies.set(name, value, options as any)
    )
    return response
  }

  const isPublic = pathname.startsWith('/login') || pathname.startsWith('/auth')

  if (!user && !isPublic) {
    return applyPending(NextResponse.redirect(new URL('/login', request.url)))
  }

  if (user && pathname === '/login') {
    return applyPending(NextResponse.redirect(new URL('/', request.url)))
  }

  const requestHeaders = new Headers(request.headers)
  if (user) {
    const name =
      (user.user_metadata?.full_name as string | undefined) ??
      (user.user_metadata?.name as string | undefined) ??
      user.email ??
      'Utilisateur'
    const avatar = (user.user_metadata?.avatar_url as string | undefined) ?? null
    requestHeaders.set('x-user-name', encodeURIComponent(name))
    if (avatar) requestHeaders.set('x-user-avatar', avatar)
  }

  return applyPending(NextResponse.next({ request: { headers: requestHeaders } }))
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|logo\\.png|icon-.*\\.png|sw\\.js|manifest).*)',
  ],
}
