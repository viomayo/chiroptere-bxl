import { beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'

const exchangeCodeForSession = vi.fn()
const createClient = vi.fn((_request, response) => {
  response.cookies.set('sb-project-auth-token', 'session', { path: '/' })
  return { auth: { exchangeCodeForSession } }
})

vi.mock('@/lib/supabase/server', () => ({ createClient }))

describe('OAuth callback', () => {
  beforeEach(() => {
    createClient.mockClear()
    exchangeCodeForSession.mockReset().mockResolvedValue({ error: null })
  })

  it('returns the exact redirect response carrying the exchanged session cookie', async () => {
    const { GET } = await import('./route')
    const request = new NextRequest('https://app.test/auth/callback?code=oauth-code')

    const response = await GET(request)

    expect(exchangeCodeForSession).toHaveBeenCalledWith('oauth-code')
    expect(createClient).toHaveBeenCalledWith(request, response)
    expect(response.headers.get('location')).toBe('https://app.test/')
    expect(response.cookies.get('sb-project-auth-token')?.value).toBe('session')
  })

  it('does not return session cookies when the exchange fails', async () => {
    exchangeCodeForSession.mockResolvedValue({ error: new Error('invalid code') })
    const { GET } = await import('./route')

    const response = await GET(new NextRequest('https://app.test/auth/callback?code=bad-code'))

    expect(response.headers.get('location')).toBe('https://app.test/auth/auth-code-error')
    expect(response.cookies.getAll()).toEqual([])
  })
})
