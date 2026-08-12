import { beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest, NextResponse } from 'next/server'

const createServerClient = vi.fn()

vi.mock('@supabase/ssr', () => ({ createServerClient }))

describe('Supabase server client', () => {
  beforeEach(() => {
    vi.resetModules()
    createServerClient.mockReset().mockReturnValue({ auth: {} })
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://project.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = 'publishable-key'
  })

  it('writes auth cookies and anti-cache headers on the returned response', async () => {
    const { createClient } = await import('./server')
    const request = new NextRequest('https://app.test/auth/callback', {
      headers: { cookie: 'pkce=verifier' },
    })
    const response = NextResponse.redirect('https://app.test/')

    createClient(request, response)

    const options = createServerClient.mock.calls[0][2]
    expect(options.cookies.getAll()).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: 'pkce', value: 'verifier' }),
    ]))

    options.cookies.setAll([
      { name: 'sb-project-auth-token', value: 'session', options: { path: '/', httpOnly: true } },
    ], {
      'Cache-Control': 'private, no-cache, no-store, must-revalidate, max-age=0',
      Pragma: 'no-cache',
    })

    expect(response.cookies.get('sb-project-auth-token')?.value).toBe('session')
    expect(response.headers.get('cache-control')).toContain('no-store')
    expect(response.headers.get('pragma')).toBe('no-cache')
  })
})
