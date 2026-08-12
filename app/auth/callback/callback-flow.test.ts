import { describe, expect, it, vi } from 'vitest'
import { AUTH_ERROR_PATH, destinationAfterCodeExchange } from './callback-flow'

describe('OAuth callback flow', () => {
  it('opens the app only after the browser persisted the exchanged session', async () => {
    const exchange = vi.fn().mockResolvedValue({ error: null })

    await expect(destinationAfterCodeExchange('oauth-code', exchange)).resolves.toBe('/')
    expect(exchange).toHaveBeenCalledWith('oauth-code')
  })

  it('redirects to the error page when the code is missing or rejected', async () => {
    const exchange = vi.fn().mockResolvedValue({ error: new Error('invalid code') })

    await expect(destinationAfterCodeExchange(null, exchange)).resolves.toBe(AUTH_ERROR_PATH)
    expect(exchange).not.toHaveBeenCalled()
    await expect(destinationAfterCodeExchange('bad-code', exchange)).resolves.toBe(AUTH_ERROR_PATH)
  })
})
